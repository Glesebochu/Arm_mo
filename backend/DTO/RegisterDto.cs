using System.ComponentModel.DataAnnotations;
public class RegisterDto
{

    [Required(ErrorMessage = "FirstName field is required")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "LastName field is required")]
    public string LastName { get; set; }

    [Required] 
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
    public string Password { get; set; }
}