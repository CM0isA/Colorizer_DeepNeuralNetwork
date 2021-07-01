using Microsoft.AspNetCore.Mvc;
using Colorizer.Application;
using Colorizer.Domain;
using Colorizer.Domain.Models;
using Colorizer.Application.Helpers;

namespace Colorizer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly ReportService _reportService;

        public ReportController(ReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        [Authorize(UserRole.Administrator)]
        public IActionResult Get()
        {
            return Ok(_reportService.GetReports());
        }

        [HttpPost]
        public IActionResult SubmitReport(ReportModel report)
        {
            return Ok(_reportService.SubmitReport(report));
        }

    }
}
