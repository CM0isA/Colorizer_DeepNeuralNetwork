using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Colorizer.Data;
using Colorizer.Domain;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Colorizer.Application
{
    public class LoginService
    {
        private readonly AuthenticationOptions _authenticationOptions;
        private readonly ColorizerContext _dbContext;

        public LoginService(ColorizerContext dbContext, IOptions<AuthenticationOptions> appSettings)
        {
            _dbContext = dbContext;
            _authenticationOptions = appSettings.Value;
        }

        public LoginResponse Login(LoginRequest model)
        {
            User user = _dbContext.Users.SingleOrDefault(x => x.Email == model.Email);

            // return null if user not found
            if (user == null) return null;

            var isPasswordValid = BCrypt.Net.BCrypt.Verify(model.Password, user.HashedPassword);
            if (!isPasswordValid)
                return null;

            // authentication successful so generate jwt token
            string token = generateJwtToken(user);

            return new LoginResponse(user, token);
        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 5 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_authenticationOptions.JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString("G"))
                }),
                Expires = DateTime.UtcNow.AddDays(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}