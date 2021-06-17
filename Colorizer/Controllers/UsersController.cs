using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Colorizer.Application;
using Colorizer.Domain;
using Colorizer.Domain.Models;
using System;
using Colorizer.Application.Helpers;
using System.IdentityModel.Tokens.Jwt;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CegekaAcademy1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IEmailSender _emailSender;

        public UsersController(UserService userService, IEmailSender emailSender)
        {
            _userService = userService;
            _emailSender = emailSender;
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        [Authorize(UserRole.Administrator)]
        public IActionResult Get(Guid id)
        {
            return Ok(_userService.GetUser(id));
        }

       
        // POST api/<UsersController>
        [HttpPost]
        [Authorize(UserRole.Administrator)]
        public void Post(User user)
        {
            _userService.AddUser(user);
            _emailSender.SendEmail(user.Email, user.AccountCode);
        }

        // PUT api/<UsersController>/5
        [HttpPut("createAccount/{invitationCode}")]
        public IActionResult CreateAccount([FromRoute]string invitationCode, [FromBody]CreateAccountModel accountModel)
        {
            if (!ModelState.IsValid) return BadRequest();
            try
            {
                _userService.CreateAccount(invitationCode, accountModel);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("getUserProfile")]
        [Authorize]
        public IActionResult GetUserProfile()
        {
            var user = (User)HttpContext.Items["User"];
            var profile = _userService.GetUserInfo(user.Id);
            return Ok(profile);
        }

        [HttpPost("updateUserProfile")]
        [Authorize]
        public IActionResult UpdateUserProfile([FromBody]EditUserProfileModel model)
        {
            var user = (User)HttpContext.Items["User"];
            if (!ModelState.IsValid) return BadRequest();
            _userService.UpdateUserProfile(model, user.Id);
            return Ok();
        }

        [HttpGet("invitationCodeStatus/{invitationCode}")]
        public IActionResult CheckInvitationCode([FromRoute] string invitationCode)
        {
            if (!_userService.IsInvitationCodeValid(invitationCode)) return BadRequest();
            return Ok();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        [Authorize(UserRole.Administrator)]
        public void Delete(Guid id)
        {
            _userService.DeleteUser(id);
        }
    }
}
