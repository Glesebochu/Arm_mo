using backend.Models;

public interface IUserService
{
    Task<bool> RegisterUserAsync(Meditator user);
    Task<Meditator> AuthenticateAsync(string username, string password);
    Task<Meditator> GetUserByUsernameAsync(string username);
    Task<ServiceResult<Meditator>> UpdateUserAsync(UpdateUserAccountDTO updateUserAccountDto);
}
