using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Colorizer.Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Colorizer.Application
{
    public static class ServiceCollectionExtensions
    {
        public static void RegisterApplicationLayer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<UserService>();
            services.AddScoped<IEmailSender, EmailService>();
            services.AddScoped<LoginService>();
            services.AddScoped<ColorizeService>();
            services.AddScoped<ReportService>();

            string storageConnectionString = configuration.GetConnectionString("StorageAccount");
            //services.AddScoped<IFileStorage, BlobStorageProvider>((serviceProvider) => new BlobStorageProvider(storageConnectionString));
        }
    }
}
