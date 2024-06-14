using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly Arm_moContext _context;
    private readonly string _storagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
    public UserService(Arm_moContext context)
    {
        _context = context;
    }

    public async Task<bool> RegisterUserAsync(Meditator user)
    {
        if (await _context.Meditators.AnyAsync(u => u.Email == user.Email))
        {
            return false; // Email already exists
        }

        user._password = BCrypt.Net.BCrypt.HashPassword(user._password);
        _context.Meditators.Add(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Meditator> AuthenticateAsync(string email, string password)
    {
        var user = await _context.Meditators.SingleOrDefaultAsync(u => u.Email == email);
        if (user != null && BCrypt.Net.BCrypt.Verify(password, user._password))
        {
            return user;
        }

        return null;
    }

    public async Task<Meditator> GetUserByUsernameAsync(string username)
    {
        return await _context.Meditators.SingleOrDefaultAsync(u => u.Username == username);
    }

    public async Task<ServiceResult<Meditator>> UpdateUserAsync(UpdateUserAccountDTO updateUserAccountDto)
    {
        var user = await _context.Meditators.FindAsync(updateUserAccountDto.Id);
        if (user == null)
        {
            return new ServiceResult<Meditator>
            {
                Success = false,
                Message = "User not found."
            };
        }

        if (updateUserAccountDto.ProfilePicture != null)
        {
            user.ProfilePicture = await SaveFileAsync(updateUserAccountDto.ProfilePicture);
        }

        user.FirstName = updateUserAccountDto.FirstName;
        user.LastName = updateUserAccountDto.LastName;
        user.Username = updateUserAccountDto.Username;

        _context.Meditators.Update(user);
        await _context.SaveChangesAsync();
        
        user = _context.Meditators.Where(u => u.Id == updateUserAccountDto.Id )
        .Include(u => u.CurrentStage)
        .Include(u => u.CurrentStage)
        .FirstOrDefault();

        return new ServiceResult<Meditator>
        {
            Success = true,
            Data = user!
        };
    }

    private async Task<string> SaveFileAsync(IFormFile file)
    {
        if (!Directory.Exists(_storagePath))
        {
            Directory.CreateDirectory(_storagePath);
        }

        var fileName = Path.GetRandomFileName() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(_storagePath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return $"/uploads/{fileName}";
    }
}
