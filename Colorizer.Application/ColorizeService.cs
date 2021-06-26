using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Colorizer.Application
{
    public class ColorizeService
    {
        public async Task ColorizeAsync(IFormFile image)
        {
            var uploads = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp\\public\\PNG");
            if (image.Length > 0)
            {
                
                string filePath = Path.Combine(uploads, image.FileName);
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }


            }
        }


        public string AddColor(string filePath)
        {
            var psi = new ProcessStartInfo();
            psi.FileName = @"C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python37_64\python.exe";

            var script = System.IO.Directory.GetCurrentDirectory() + @"\Python\Colorizer_AI_Model.py";



            psi.UseShellExecute = false;
            psi.CreateNoWindow = true;
            psi.RedirectStandardOutput = true;
            psi.RedirectStandardError = true;

            

            var erori = "";
            var rezultat = "";

            using (var process = Process.Start(psi))
            {
                erori = process.StandardError.ReadToEnd();
                rezultat = process.StandardOutput.ReadToEnd();
            }

            return rezultat;

        }

    }
}
