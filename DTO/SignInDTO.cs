using System.ComponentModel.DataAnnotations;

namespace Arm_mo.DTO
{
    public class SignInDTO
    {
        [Required]
        public string UserName { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        
        [Display(Name = "Remember Me")]
        public bool RememberMe { get; set; } = false;
        
    }
}
