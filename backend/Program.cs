using backend.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using backend.Models;
using backend.Services;
using System.Text.Json.Serialization;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
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

            // Adding the Arm'mo context
            builder.Services.AddDbContextPool<Arm_moContext>(option => option.
            UseSqlServer(builder.Configuration.GetConnectionString("Arm_moDbConnection")));
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

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
            // Register the SessionService
            builder.Services.AddScoped<SessionService>();

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

            // //app.UseHttpsRedirection();

            // Serve static files
            app.UseStaticFiles();

            // Enable routing
            app.UseRouting();

            // Enabling CORS middleware in the application pipeline using the "AllowedSpecificOrigins" policy.
            app.UseCors("AllowedSpecificOrigins");

            // Enable authorization middleware
            app.UseAuthorization();

            // Map controller endpoints to the request pipeline
            app.MapControllers();

            // Run the application
            app.Run();
        }
    }
}
