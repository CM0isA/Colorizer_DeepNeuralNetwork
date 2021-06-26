using Colorizer.Application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Colorizer.Controllers
{
    [Route("api/colorize")]
    [ApiController]
    public class ColorizeController : ControllerBase
    {
        private readonly ColorizeService _colorizeService;

        public ColorizeController(ColorizeService colorizeService)
        {
            _colorizeService = colorizeService;
        }

        [HttpPost]
        public async Task<IActionResult> Colorize(IFormFile image)
        {
            await _colorizeService.ColorizeAsync(image);
            return Ok();
        }
    }
}
