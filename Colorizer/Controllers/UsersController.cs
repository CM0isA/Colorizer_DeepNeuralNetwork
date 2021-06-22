﻿using Microsoft.AspNetCore.Mvc;
using Colorizer.Application;
using Colorizer.Domain;
using Colorizer.Domain.Models;
using System;
using Colorizer.Application.Helpers;

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

        [HttpPost("createAccount/")]
        public IActionResult CreateAccount([FromBody]CreateAccountModel accountModel)
        {
            if (!ModelState.IsValid) return BadRequest();
            try
            {

                var code =  _userService.CreateAccount(accountModel);
                if (code != "")
                {
                    _emailSender.SendEmail(accountModel.Email, code);
                    return Ok();
                }
                return NoContent();
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

        [HttpGet("getUserInfo/{code}")]
        public IActionResult CheckInvitationCode([FromRoute] string Code)
        {
            var user = _userService.IsCodeValid(Code);
            if (user == null) return BadRequest();
            return Ok(user);
        }

        [HttpPut("confirmAccount")]
        public IActionResult ConfirmAccount([FromBody]User user)
        {
            _userService.ConfirmAccount(user);

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
