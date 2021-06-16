using Colorizer.Domain.Models;

namespace Colorizer.Domain
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public UserProfileModel UserProfile { get; set; }

        public LoginResponse(User user, string token)
        {
            UserProfile = new UserProfileModel(user);
            Token = token;
        }
    }
}