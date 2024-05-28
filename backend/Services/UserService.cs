using Arm_mo.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly Arm_moContext _context;

    public UserService(Arm_moContext context)
    {
        _context = context;
    }

    public async Task<bool> RegisterUserAsync(Meditator user)
    {
        if (await _context.Meditators.AnyAsync(u => u.Username == user.Username))
        {
            return false; // Username already exists
        }

        user._password = BCrypt.Net.BCrypt.HashPassword(user._password);
        _context.Meditators.Add(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Meditator> AuthenticateAsync(string username, string password)
    {
        var user = await _context.Meditators.SingleOrDefaultAsync(u => u.Username == username);
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
}