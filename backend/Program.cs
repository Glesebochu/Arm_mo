using dotenv.net;
using Arm_mo.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using AutoMapper.Internal.Mappers;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Load environment variables from .env file
            DotEnv.Load();

            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowedSpecificOrigins",
                    builder => builder
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .SetIsOriginAllowed((host) => { return host == "http://localhost:5173"; })
                        .AllowAnyHeader());
            });

            // builder.Services.AddCors(options =>
            // {
            //     options.AddPolicy("AllowedSpecificOrigins",
            //         builder => builder
            //             .WithOrigins("http://localhost:5173")
            //             .AllowAnyMethod()
            //             .AllowCredentials()
            //             .AllowAnyHeader());
            // });

            builder.Services.AddControllers()
            .ConfigureApiBehaviorOptions(options =>
            {
                options.InvalidModelStateResponseFactory = CustomModelStateResponseFactory.InvalidModelStateResponse;
            });
            
            // Configure JWT authentication
            var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
            var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
            var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

            if (string.IsNullOrEmpty(jwtKey) || string.IsNullOrEmpty(jwtIssuer) || string.IsNullOrEmpty(jwtAudience))
            {
                Console.WriteLine($"JWT_KEY: {jwtKey}");
                Console.WriteLine($"JWT_ISSUER: {jwtIssuer}");
                Console.WriteLine($"JWT_AUDIENCE: {jwtAudience}");
                throw new ArgumentNullException("One of the JWT environment variables is null or empty");
            }

            // Decode the base64 key and check its length
            var keyBytes = Convert.FromBase64String(jwtKey);
            Console.WriteLine($"Key Length: {keyBytes.Length * 8} bits");

            if (keyBytes.Length < 16) // 128 bits
            {
                throw new ArgumentException("The key is too short. It must be at least 128 bits.");
            }

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Events = new JwtBearerEvents(){
                 OnMessageReceived = context => {
                    var token = context.Request.Cookies["token"];
                    if(!string.IsNullOrEmpty(token)){
                        context.Token = token;
                    }
                    
                    return Task.CompletedTask;
                 }   
                };
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtIssuer,
                    ValidAudience = jwtAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
                };
            });

            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddDbContextPool<Arm_moContext>(option => option.
            UseSqlServer(builder.Configuration.GetConnectionString("Arm_moDbConnection")));
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();
            app.UseCors("AllowedSpecificOrigins");
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
