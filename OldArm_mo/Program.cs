//using Arm_mo.Context;
using Microsoft.EntityFrameworkCore;

using Arm_mo.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Register the DbContext with the necessary connection string for accessing the SQL Server database
builder.Services.AddDbContext<Arm_moContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Identity services and specify the Entity Framework implementation for storing user and role data
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<Arm_moContext>();

// Register the Mediator Repository for dependency injection to manage data operations
builder.Services.AddScoped<IMeditatorRepository, Arm_moRespository>();

// Register Arm_moContext with a scoped lifetime to align with DbContextOptions and other related Identity services.
builder.Services.AddScoped<Arm_moContext>();

// Configure options for Identity, including password policies and account lockout parameters
builder.Services.Configure<IdentityOptions>(opts =>
{
    opts.Lockout.AllowedForNewUsers = true;
    opts.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
    opts.Lockout.MaxFailedAccessAttempts = 3;

    opts.Password.RequireLowercase = true;
    opts.Password.RequiredLength = 4;
    opts.Password.RequireUppercase = true;
    opts.Password.RequireNonAlphanumeric = false;
    opts.Password.RequireDigit = false;
});

// Register AutoMapper to map between data models and view models across the application
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Add session services to enable support for user sessions in the application
builder.Services.AddSession();

// Register HTTP Context Accessor as a singleton to allow access to the current HTTP context across the application
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// Configure the path for the application login cookie to customize the login URL
builder.Services.ConfigureApplicationCookie(options =>
{
    // If the LoginPath isn't set, ASP.NET Core defaults the path to /Account/Login.
    options.LoginPath = "/Admin/SignIn"; // Set your login path here
});

// Add the policy for adding meditators
builder.Services.AddAuthorization(opts =>
{
    opts.AddPolicy("CanPromoteMeditator", policy =>
    {
        policy.RequireRole("Master");
        policy.RequireClaim("Stage", "Stage 10");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseSession();

app.UseRouting();

app.UseAuthentication(); // Ensure this is added for Identity to function properly
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
