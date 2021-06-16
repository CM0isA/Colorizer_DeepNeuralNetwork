using MimeKit;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

namespace Colorizer.Application
{
    public class EmailService : IEmailSender
    {
        private Message message;
        private readonly EmailConfiguration _emailConfiguration;
        public EmailService(EmailConfiguration emailConfiguration)
        {
            _emailConfiguration = emailConfiguration;
            message = new Message("Confirm invitation", _emailConfiguration.URL);
        }

        public void SendEmail(string emailAddress, string code)
        {
            var emailMessage = CreateEmailMessage(emailAddress, code);
            Send(emailMessage);
        }

        private MimeMessage CreateMessage(string emailAddress, string program)
        {
            var message = new Message("New enrollment", "You have been assigned to program " + program) ;
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfiguration.From));
            var to = new MailboxAddress(emailAddress);
            emailMessage.To.Add(to);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Body };
            return emailMessage;
        }

        private MimeMessage CreateEmailMessage(string emailAddress, string code)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfiguration.From));
            var to = new MailboxAddress(emailAddress);
            emailMessage.To.Add(to);
            emailMessage.Subject = message.Subject;
            message.Body += code;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Body };
            return emailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
#if DEBUG
                ServicePointManager.ServerCertificateValidationCallback =
    new RemoteCertificateValidationCallback((object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) => true);
#endif

                client.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(_emailConfiguration.SenderEmail, _emailConfiguration.Password);

                client.Send(mailMessage);


                client.Disconnect(true);
                client.Dispose();
            }
        }

        public void SendEmailV2(string emailAddress, string program)
        {
            var emailMessage = CreateMessage(emailAddress, program);
            Send(emailMessage);
        }
    }
}
