using System;
using System.Collections.Generic;
using System.Linq;
using Colorizer.Data;
using Colorizer.Domain;
using Colorizer.Domain.Models;

namespace Colorizer.Application
{
    public class ReportService
    {
        private readonly UserService _userService;
        private readonly IEmailSender _emailSender;
        private readonly ColorizerContext _dbContext;
        

        public ReportService(ColorizerContext dbContext, UserService userService, IEmailSender emailSender)
        {
            _dbContext = dbContext;
            _userService = userService;
            _emailSender = emailSender;
        }

        public List<Report> GetReports()
        {
            return _dbContext.Reports.ToList();
        }

        public bool SubmitReport(ReportModel report)
        {
            var user = _userService.GetUserByEmail(report.Email);

            Report newReport = new()
            {
                Id = new Guid(),
                Title = report.Title,
                Description = report.Description,
                Type = (ReportType)Enum.Parse(typeof(ReportType), report.ReportType),
                User = user,
                UserId = user.Id,
                Status = ReportStatus.Created,
            };

            _dbContext.Reports.Add(newReport);
            _dbContext.SaveChanges();
            return true;
        }




    }
}
