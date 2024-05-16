
using Arm_mo.Context;
using Arm_mo.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //var AllowedSpecificOrigins = "AllowedSpecificOrigins";
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.


            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy(name: AllowedSpecificOrigins,
            //                      policy =>
            //                      {
            //                          policy.WithOrigins("http://localhost:5173/");
            //                      });
            //});
            //builder.Services.AddCors(options =>
            //{
            //    options.AddDefaultPolicy(
            //        policy =>
            //        {
            //            policy.WithOrigins("http://localhost:5173/").AllowAnyHeader()
            //                    .AllowAnyMethod(); ;
            //        });
            //});

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowedSpecificOrigins",
                    builder => builder
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .SetIsOriginAllowed((host) =>{ return host == "http://localhost:5173"; })
                        .AllowAnyHeader());
            });

            //Adding the Arm'mo context
            builder.Services.AddDbContextPool<Arm_moContext>(option => option.
            UseSqlServer(builder.Configuration.GetConnectionString("Arm_moDbConnection")));

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowedSpecificOrigins");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
