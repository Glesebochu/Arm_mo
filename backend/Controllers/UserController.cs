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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(string id, [FromForm] UpdateUserAccountDTO updateUserAccountDto)
    {
        if (id != updateUserAccountDto.Id.ToString())
        {
            return BadRequest("User ID mismatch.");
        }

        var result = await _userService.UpdateUserAsync(updateUserAccountDto);

        if (!result.Success)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, result.Message);
        }

        return Ok(result.Data);
    }
}
