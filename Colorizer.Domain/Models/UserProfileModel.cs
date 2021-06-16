using System;

namespace Colorizer.Domain.Models
{
    public class UserProfileModel
    {
        public UserProfileModel(User user)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Avatar = user.Avatar;
            Email = user.Email;
            Role = user.Role;

        }

        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
        public string Avatar { get; set; }
    }
}
