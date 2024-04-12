using System.ComponentModel.DataAnnotations;

namespace Arm_mo.DTO
{
    public class SignUpDTO
    {
        [Required(ErrorMessage = "Username is required.")]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Password confirmation is required.")]
        [Display(Name = "Confirm Password")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The two passwords must match.")]
        public string ConfirmPassword { get; set; }
    }
}
