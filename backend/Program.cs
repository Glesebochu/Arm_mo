
using backend.Data;
using Microsoft.CodeAnalysis.Options;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

using backend.Models;
using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //var AllowedSpecificOrigins = "AllowedSpecificOrigins";
            // Create a new WebApplication builder with command line arguments
            var builder = WebApplication.CreateBuilder(args);

            // Configuring CORS (Cross-Origin Resource Sharing) in the application's service collection.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowedSpecificOrigins",
                    builder => builder
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .SetIsOriginAllowed((host) => { return host == "http://localhost:5173"; })
                        .AllowAnyHeader());
            });


            // Add controller services for API endpoints

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

            // // Add service for handling cyclical references
            // .AddJsonOptions(opt =>
            // {
            //     opt.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
            //     opt.JsonSerializerOptions.MaxDepth = 30;
            // });

            // Add services for generating API documentation using Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure and add the database context service with SQL Server
            builder.Services.AddDbContext<Arm_moContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            // Add AutoMapper service with the Program class for configuration
            builder.Services.AddAutoMapper(typeof(Program));


            // Build the application
            var app = builder.Build();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                // Enable Swagger for API documentation in development environment
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                // Enforce HSTS (HTTP Strict Transport Security)
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            // Serve static files
            app.UseStaticFiles();

            // Enabling CORS middleware in the application pipeline using the "AllowedSpecificOrigins" policy.
            app.UseCors("AllowedSpecificOrigins");

            // Enable routing
            app.UseRouting();

            // Enable authorization middleware
            app.UseAuthorization();

            // Map controller endpoints to the request pipeline
            app.MapControllers();

            // Run the application
            app.Run();

        }

    }
}
