using System.ComponentModel.DataAnnotations;

namespace Colorizer.Domain.Models
{
    public class EditUserProfileModel
    {
        [Required]
        [MinLength(2)]
        [MaxLength(40)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(40)]
        public string LastName { get; set; }
        public string Avatar { get; set; }
    }
}
