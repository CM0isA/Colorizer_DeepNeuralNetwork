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

        public User GetUserByEmail(string email)
        {
            return _dbContext.Users.FirstOrDefault(user => user.Email == email);
        }

        public UserProfileModel GetUserInfo(Guid id)
        {
            var user = GetUser(id);
            if (user == null) return null;
            UserProfileModel info = new(user);
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

        public void ConfirmAccount(ConfirmAccountModel user)
        {
            var updatedUser = _dbContext.Users.FirstOrDefault(u => u.Id.ToString() == user.Id);
            updatedUser.FirstName = user.FirstName;
            updatedUser.LastName = user.LastName;
            updatedUser.AccountStatus = UserAccountStatus.Confirmed;

            _dbContext.Update(updatedUser);
            _dbContext.SaveChanges();
        }


        public User IsCodeValid(string code)
        {
            var user = _dbContext.Users.FirstOrDefault<User>(u => u.AccountCode == code);
            if (user == null ||
                user.AccountStatus == UserAccountStatus.Confirmed) return null;
            return user;
        }

        public string CreateAccount(CreateAccountModel accountModel)
        {

            User find = GetUserByEmail(accountModel.Email);

            if (find == null)
                try
                {


                    User user = new()
                    {
                        Id = new Guid(),
                        AccountCode = CodeGenerator.RandomString(),
                        FirstName = "",
                        LastName = "",
                        HashedPassword = BCrypt.Net.BCrypt.HashPassword(accountModel.Password),
                        Role = UserRole.User,
                        AccountStatus = UserAccountStatus.Created,
                        Email = accountModel.Email,
                        Avatar = "",
                    };

                    _dbContext.Users.Add(user);
                    _dbContext.SaveChanges();



                    return user.AccountCode;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return "";
                }
            else return "";


        }
    }
}
