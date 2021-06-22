using System;
using System.ComponentModel.DataAnnotations;


namespace Colorizer.Domain
{
    public class Reports
    {
        public Guid Id { get; set; }

        [MaxLength(30)]
        public string Title { get; set; }

        public string Description { get; set; }

        public Guid UserId { get; set; }

        public User User { get; set; }

    }
}
