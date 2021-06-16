using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Colorizer.Application
{
    public class Message
    { 
        public MailboxAddress To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public Message(string subject, string body)
        {
            Subject = subject;
            Body = body;
        }
    }
}
