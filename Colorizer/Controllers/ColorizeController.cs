using Colorizer.Application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Colorizer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorizeController : ControllerBase
    {
        private readonly ColorizeService _colorizeService;

        public ColorizeController(ColorizeService colorizeService)
        {
            _colorizeService = colorizeService;
        }

        [HttpGet("{image}")]
        public IActionResult DownloadImge([FromRoute] string image)
        {
            return _colorizeService.DownloadImage(image);
        }



        [HttpPost]
        public string Colorize(IFormFile image)
        {
            var file = _colorizeService.ColorizeAsync(image);

            return file;
        }
    }
}
