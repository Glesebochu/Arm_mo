using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class HomeController : Controller
{
    private readonly Arm_moContext dbContext;
    public HomeController(Arm_moContext dbContext)
    {
        this.dbContext = dbContext;
    }
    [HttpGet("GetMeditatorById")]
    public async Task<IActionResult> GetMeditatiorByID(int meditatorId)
    {
        var meditator = await dbContext.Meditators
            .Where(m => m.Id == meditatorId)
            .Include(m=>m.CurrentStage)
            .Include(m=>m.PracticedStages)
            .Include(m=>m.Address)
            .FirstOrDefaultAsync();
        if (meditator == null)
        {
            return NotFound("No Meditators exist with the id: " + meditatorId);
        }
        return Ok(meditator);
    }
}