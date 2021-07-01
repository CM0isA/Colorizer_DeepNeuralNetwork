using System.ComponentModel.DataAnnotations;

namespace Colorizer.Domain.Models
{
    public class CreateAccountModel
    {
        [Required]
        [MinLength(2)]
        [MaxLength(40)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        [MaxLength(40)]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{2,26}\S$")]
        public string Password { get; set; }
    }

}
