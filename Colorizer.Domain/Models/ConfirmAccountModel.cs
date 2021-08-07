namespace Colorizer.Domain.Models
{
    public class ConfirmAccountModel
    {
        public string Avatar { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Id { get; set; }

         public UserRole Role { get; set; } 
    }

}
