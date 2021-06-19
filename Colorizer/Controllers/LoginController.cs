using Colorizer.Application;
using Colorizer.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Colorizer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController: ControllerBase
    {
        private readonly LoginService _loginService;

        public LoginController(LoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        public IActionResult Login(LoginRequest model)
        {
            LoginResponse response = _loginService.Login(model);

            if (response == null)
                return NoContent();

            return Ok(response);
        }
    }
}
