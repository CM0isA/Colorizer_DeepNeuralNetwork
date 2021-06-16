using System;
using System.Collections.Generic;
using System.Linq;
using Colorizer.Data;
using Colorizer.Domain;
using Colorizer.Domain.Models;

namespace Colorizer.Application
{
    public class UserService
    {
        private readonly ColorizerContext _dbContext;

        public UserService(ColorizerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<User> GetUsers()
        {
            return _dbContext.Users.ToList();
        }

        public User GetUser(Guid id)
        {
            return _dbContext.Users.Find(id);
        }

        public UserProfileModel GetUserInfo(Guid id)
        {
            var user = GetUser(id);
            if (user == null) return null;
            UserProfileModel info = new UserProfileModel(user);
            return info;
        }

        public void UpdateUserProfile(EditUserProfileModel model, Guid id)
        {
            var user = GetUser(id);
            if (user == null) return;
            user.Avatar = model.Avatar;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;


            _dbContext.Update(user);
            _dbContext.SaveChanges();
        }

        public void DeleteUser(Guid id)
        {
            var user = GetUser(id);

            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
        }
        public void AddUser(User user)
        {
            user.InvitationCode = CodeGenerator.RandomString();
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }


        public Boolean IsInvitationCodeValid(string invitationCode)
        {
            var user = _dbContext.Users.FirstOrDefault<User>(u => u.InvitationCode == invitationCode);
            if (user == null ||
                user.InvitationStatus == UserInvitationStatus.Accepted) return false;
            return true;
        }

        public void CreateAccount(string invitationCode, CreateAccountModel accountModel)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.InvitationCode == invitationCode);
            user.FirstName = accountModel.FirstName;
            user.LastName = accountModel.LastName;
            user.HashedPassword = BCrypt.Net.BCrypt.HashPassword(accountModel.Password);
            user.InvitationStatus = UserInvitationStatus.Accepted;

            _dbContext.SaveChanges();
        }
    }
}
