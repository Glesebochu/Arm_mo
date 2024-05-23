
using backend.Data;
using Microsoft.CodeAnalysis.Options;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Create a new WebApplication builder with command line arguments
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the dependency injection container

            // Add controller services for API endpoints
            builder.Services.AddControllers()
            // Add service for handling cyclical references
                .AddJsonOptions(opt => {
                    opt.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                    opt.JsonSerializerOptions.MaxDepth = 30;
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


            // Build the application
            var app = builder.Build();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                // Enable Swagger for API documentation in development environment
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Enforce HTTPS redirection
            app.UseHttpsRedirection();

            // Enable authorization middleware
            app.UseAuthorization();

            // Map controller endpoints to the request pipeline
            app.MapControllers();

            // Run the application
            app.Run();
        }

    }
}
