using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Colorizer.Application
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly AuthenticationOptions _appSettings;

        public JwtMiddleware(RequestDelegate next, IOptions<AuthenticationOptions> authSettings)
        {
            _next = next;
            _appSettings = authSettings.Value;
        }

        public async Task Invoke(HttpContext context, UserService userService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                AttachUserToContext(context, userService, token);

            await _next(context);
        }

        private void AttachUserToContext(HttpContext context, UserService userService, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.JwtSecret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);
                var userRole = jwtToken.Claims.First(x => x.Type == "role").Value;

                // attach user to context on successful jwt validation
                context.Items["User"] = userService.GetUser(userId);
                context.Items["UserRole"] = userRole;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }
        }
    }
}