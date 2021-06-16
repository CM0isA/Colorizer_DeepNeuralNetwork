using System;
using System.Collections.Generic;
using System.Text;

namespace Colorizer.Application
{
    public class EmailConfiguration
    {
        public string From { get; set; }
        public string SmtpServer { get; set; }
        public int Port { get; set; }
        public string SenderEmail { get; set; }
        public string Password { get; set; }
        public string URL { get; set; }
    }
}
