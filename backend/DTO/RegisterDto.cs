using System.ComponentModel.DataAnnotations;
public class RegisterDto
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    [EmailAddress(ErrorMessage = "Invalid Email Address")]
    public string Username { get; set; }
    

    [Required]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
    public string Password { get; set; }

    [Required]
    [Compare("Password", ErrorMessage = "Password Must Match")]
    public string ComfirmPassword {get; set;}
}