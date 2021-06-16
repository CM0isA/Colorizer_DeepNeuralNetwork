using System;

namespace Colorizer.Domain
{
    public class User
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string HashedPassword { get; set; }

        public UserRole Role { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Avatar { get; set; }

        public UserInvitationStatus InvitationStatus { get; set; }

        public string InvitationCode { get; set; }
    }
}
