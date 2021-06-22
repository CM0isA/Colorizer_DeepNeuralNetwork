using System.ComponentModel.DataAnnotations;

namespace Colorizer.Domain
{
    public class LoginRequest
    {
        [Required]
        [MaxLength(30)]
        public string Email { get; set; }

        [Required]
        [MaxLength(60)]
        public string Password { get; set; }
    }
}