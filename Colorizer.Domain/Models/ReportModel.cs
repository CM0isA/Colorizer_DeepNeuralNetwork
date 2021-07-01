using System.ComponentModel.DataAnnotations;

namespace Colorizer.Domain.Models
{
    public class ReportModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Email { get; set; }

        public string ReportType { get; set; }
    }
}
