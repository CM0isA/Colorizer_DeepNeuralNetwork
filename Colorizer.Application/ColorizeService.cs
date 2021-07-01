using Microsoft.AspNetCore.Http;
using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;

namespace Colorizer.Application
{
    public class ColorizeService
    {
        public async Task<string> ColorizeAsync(IFormFile image)
        {
            var uploads = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp\\public\\PNG");
            if (image.Length > 0)
            {

                string filePath = Path.Combine(uploads, image.FileName);
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                return AddColor(filePath);
            }
            return "The image could not be processed";
        }


        public string AddColor(string filePath)
        {
            ProcessStartInfo psi = new ProcessStartInfo();
            psi.FileName = @"C:\Program Files\Python38\python.exe";
            Guid newFileName = Guid.NewGuid();
            string script = @"E:\Licenta\Colorizer\Colorizer.Application\Python\Colorizer_AI_Model.py";
            psi.Arguments = string.Format("{0} {1} {2}", script, filePath, newFileName);
            psi.UseShellExecute = false;
            psi.WorkingDirectory = @"E:\Licenta\Colorizer\Colorizer.Application\Python\";
            psi.CreateNoWindow = true;
            psi.RedirectStandardOutput = true;
            psi.RedirectStandardError = true;

            using (System.Diagnostics.Process process1 = System.Diagnostics.Process.Start(psi))
            {
                using (StreamReader reader = process1.StandardOutput)
                {
                    string stderr = process1.StandardError.ReadToEnd();
                    string result = reader.ReadToEnd();

                    return result;
                }
            }
        }
    }
}
