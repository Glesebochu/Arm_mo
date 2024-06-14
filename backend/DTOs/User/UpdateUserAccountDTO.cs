public class UpdateUserAccountDTO
{
    public int Id { get; set; }
    public IFormFile ProfilePicture { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
}
