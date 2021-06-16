using Colorizer.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;

namespace Colorizer.Application.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly UserRole[] _authorizedRoles;

        public AuthorizeAttribute(params UserRole[] authorizedRoles)
        {
            _authorizedRoles = authorizedRoles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            User user = (User)context.HttpContext.Items["User"];

            if (user == null)
            {
                context.Result = new StatusCodeResult(401);
                return;
            }

            if (!_authorizedRoles.Any())
                return;

            UserRole role = (UserRole)Enum.Parse(typeof(UserRole), context.HttpContext.Items["UserRole"].ToString());

            if (!_authorizedRoles.Contains(role) || role != user.Role)
            {
                context.Result = new StatusCodeResult(403);
            }
        }
    }
}
