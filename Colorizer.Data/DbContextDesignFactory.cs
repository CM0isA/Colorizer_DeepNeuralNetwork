using System.IO;
using Colorizer.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace CegekaAcademy1.Data
{
    public class DbContextDesignFactory : IDesignTimeDbContextFactory<ColorizerContext>
    {
        public DbContextDesignFactory()
        {

        }
        public ColorizerContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration =  new ConfigurationBuilder()
              .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.Development.json")
              .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<ColorizerContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new ColorizerContext(optionsBuilder.Options);
        }
    }
}
