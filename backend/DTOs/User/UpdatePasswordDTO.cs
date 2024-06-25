using System.ComponentModel.DataAnnotations;
public class UpdatePasswordDTO{

    [Required]
    public int Id { get; set; }

    [Required(ErrorMessage = "Current password is required")]
    public string CurrentPassword {get; set; }

    [Required(ErrorMessage = "New password is required")]
    public string NewPassword {get; set; }
}