using backend.Data;
using backend.Models;
using dotenv.net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IConfiguration _configuration;
    private readonly Arm_moContext _context;
    public AuthController(IUserService userService, IConfiguration configuration, Arm_moContext context)
    {
        _userService = userService;
        _configuration = configuration;
        _context = context;
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        var currentStage = _context.Stages.Find(1);

        var user = new Meditator
        {
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            Email = registerDto.Email,
            _password = registerDto.Password,
            CurrentStage = currentStage
        };

        var result = await _userService.RegisterUserAsync(user);

        if (result)
        {
            return Ok("User registered successfully.");
        }

        return BadRequest("User already exists.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var user = await _userService.AuthenticateAsync(loginDto.Email, loginDto.Password);
        if (user != null)
        {
            var token = GenerateJwtToken(user.Email);

            Console.WriteLine(user.Email);
            // Set the httpOnly cookie with SameSite=None and Secure=false for development
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None, // Allowing cross-origin requests
                Expires = DateTime.UtcNow.AddDays(1)
            };

            HttpContext.Response.Cookies.Append("token", token, cookieOptions);
            return Ok();
        }

        return Unauthorized();
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        HttpContext.Response.Cookies.Delete("token");

        return Ok(new { message = "Logged out successfully" });
    }

    [Authorize]
    [HttpGet("Me")]
    public IActionResult Me()
    {
        Console.WriteLine("Hello world");
        var email = User.FindFirstValue(ClaimTypes.Email);

        // Materialize the query
        var meditator = _context.Meditators
            .Where(m => m.Email == email)
            .Include(m => m.CurrentStage)
            .Include(m => m.PracticedStages)
            .FirstOrDefault();

        // Return the materialized list as the response
        return Ok(meditator);
    }


    [HttpPost("google")]
    public async Task<IActionResult> Google([FromBody] GoogleAuthRequest request)
    {
        var payload = await ValidateGoogleTokenAsync(request.IdToken);
        if (payload == null)
        {
            return Unauthorized();
        }

        // Create and return the JWT token
        var token = GenerateJwtToken(payload.Email);

        Console.WriteLine($"the token {token}");
        // Set the httpOnly cookie with SameSite=None and Secure=false for development
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None, // Allowing cross-origin requests
            Expires = DateTime.UtcNow.AddDays(1)
        };

        HttpContext.Response.Cookies.Append("token", token, cookieOptions);
        var currentStage = _context.Stages.Find(1);

        var user = new Meditator
        {
            FirstName = payload.GivenName,
            LastName = payload.FamilyName,
            Email = payload.Email,
            ProfilePicture = payload.Picture,
            CurrentStage = currentStage
        };

        var result = await _userService.RegisterUserAsync(user);
        if (result)
        {
            return Ok("User registered successfully.");
        }

        return BadRequest("User already exists.");
    }

    private async Task<GoogleJsonWebSignature.Payload> ValidateGoogleTokenAsync(string idToken)
    {
        try
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string> { _configuration["Authentication:Google:ClientId"] }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
            return payload;
        }
        catch (InvalidJwtException)
        {
            return null;
        }
    }
    private string GenerateJwtToken(string email)
    {
        DotEnv.Load();

        var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
        var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
        var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

        if (string.IsNullOrEmpty(jwtKey) || string.IsNullOrEmpty(jwtIssuer) || string.IsNullOrEmpty(jwtAudience))
        {
            throw new ArgumentNullException("One of the JWT environment variables is null or empty");
        }

        var keyBytes = Convert.FromBase64String(jwtKey);
        var signingKey = new SymmetricSecurityKey(keyBytes);
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Email, email)
            }),
            Expires = DateTime.UtcNow.AddMinutes(5),
            Issuer = jwtIssuer,
            Audience = jwtAudience,
            SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
