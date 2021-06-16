using System;
using System.Collections.Generic;
using System.Text;

namespace Colorizer.Application
{
    public interface IEmailSender
    {
        void SendEmail(string emailAddress, string code);
        void SendEmailV2(string emailAddress, string program);
    }
}
