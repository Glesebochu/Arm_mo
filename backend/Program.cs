
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization;

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
                        .SetIsOriginAllowed((host) => { return host == "http://localhost:5173"; })
                        // .SetIsOriginAllowed(host => host.Equals("http://localhost:5173", StringComparison.OrdinalIgnoreCase))
                        .AllowAnyHeader());
            });

            //Adding the Arm'mo context
            builder.Services.AddDbContextPool<Arm_moContext>(option => option.
            UseSqlServer(builder.Configuration.GetConnectionString("Arm_moDbConnection")));
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

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

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowedSpecificOrigins");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();

        }
    }
}
