using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using backend.Models;
using backend.DTOs;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateAccount(string id, [FromForm] UpdateUserAccountDTO updateUserAccountDto)
    {
        if (id != updateUserAccountDto.Id.ToString())
        {
            return BadRequest("User ID mismatch.");
        }

        var result = await _userService.UpdateAccountAsync(updateUserAccountDto);
        if (!result.Success)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, result.Message);
        }

        return Ok(result.Data);
    }

    [HttpPatch("{id}/password")]
    public async Task<IActionResult> UpdatePassword(int id, [FromBody] UpdatePasswordDTO updatePasswordDTO){
        Console.WriteLine($"{User.Claims.ToList()} is user's claim");
        if (id != updatePasswordDTO.Id)
        {
            return BadRequest("User ID mismatch.");
        }

        Console.WriteLine(updatePasswordDTO.CurrentPassword);
        Console.WriteLine(updatePasswordDTO.NewPassword);
        Console.WriteLine(updatePasswordDTO.Id);
        var result = await _userService.UpdatePasswordAsync(updatePasswordDTO);
        Console.WriteLine(result.Message);
        Console.WriteLine(result.Success);
        return Ok(result);
    }
}
