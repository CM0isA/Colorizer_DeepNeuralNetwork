using System;
using System.ComponentModel.DataAnnotations;

namespace Colorizer.Domain
{
    public class User
    {
        [Required]
        public Guid Id { get; set; }

        [MaxLength(30)]
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [MaxLength(60)]
        [Required]
        public string HashedPassword { get; set; }

        [MaxLength(15)]
        [Required]
        public UserRole Role { get; set; }

        [MaxLength(30)]
        public string FirstName { get; set; }

        [MaxLength(30)]
        public string LastName { get; set; }

        [MaxLength(50)]
        public string Avatar { get; set; }

        [MaxLength(10)]
        [Required]
        public UserAccountStatus AccountStatus { get; set; }

        [MaxLength(15)]
        [Required]
        public string AccountCode { get; set; }
    }
}
