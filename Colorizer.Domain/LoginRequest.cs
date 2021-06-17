using System.ComponentModel.DataAnnotations;

namespace Colorizer.Domain
{
    public class LoginRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}