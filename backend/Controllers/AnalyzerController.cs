using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyzerController : ControllerBase
    {
        private readonly Arm_moContext dbContext;

        public AnalyzerController(Arm_moContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Route("/api/Analyzer")]
        public async Task<ActionResult<IEnumerable<UserUsage>>> List()
        {
            return await dbContext.UserUsage.ToListAsync();
        }

        [EnableCors]
        [HttpGet]
        [Route("/api/Analyzer/GetSessionUsageCustom")]
        public async Task<ActionResult<IEnumerable<object>>> GetSessionUsageCustom(/*int userId,*/DateTime customDate)//uncomment the parameter after testing.
        {

            var currentDate = customDate != default ? customDate : DateTime.Now;

            var pastWeekDates = Enumerable.Range(0, 7)
                .Select(i => currentDate.AddDays(-i))
                .ToList();
            var sessionLength = new List<object>();
            foreach (var date in pastWeekDates)
            {
                var sessionEnd = await dbContext.Sessions.
                    Where(u => u.Meditator.Id == 1 && u.EndDateTime.Date == date.Date)//change the userId after testing...
                    .Select(u => u.EndDateTime.TimeOfDay.TotalMinutes)
                    .ToListAsync();
                var Endtime = sessionEnd.DefaultIfEmpty(0).Sum();

                var sessionStart = await dbContext.Sessions.
                    Where(u => u.Meditator.Id == 1 && u.StartDateTime.Date == date.Date)//change the userId after testing...
                    .Select(u => u.StartDateTime.TimeOfDay.TotalMinutes)
                    .ToListAsync();
                var startTime = sessionStart.DefaultIfEmpty(0).Sum();


                sessionLength.Add(Endtime - startTime);

            }

            return sessionLength;
        }

        [EnableCors]
        [HttpGet]
        [Route("/api/Analyzer/GetUsageDataForPastWeek")]
        public async Task<ActionResult<IEnumerable<object>>> GetUsageDataForPastWeek(/*int userId*/)//uncomment the parameter after testing.
        {
            var currentDate = DateTime.Today;
            var pastWeekDates = Enumerable.Range(0, 7)
                .Select(i => currentDate.AddDays(-i))
                .ToList();
            var usageData = new List<object>();
            var usageDate = new List<object>();
            var usagelength = new List<object>();

            foreach (var date in pastWeekDates)
            {
                var usages = await dbContext.UserUsage
                    .Where(u => u.UserId == 1 && u.Date == date.Date)//change the userId after testing...
                    .Select(u => u.UsageTime.TotalMinutes)
                    .ToListAsync();

                var totalUsageMinutes = usages.DefaultIfEmpty(0).Sum();

                string dayOfWeek = date.DayOfWeek.ToString().Substring(0, 3);
                usageDate.Add(dayOfWeek);
                usagelength.Add(totalUsageMinutes);
            }
            usageData.Add(usageDate);
            usageData.Add(usagelength);

            return usageData;
        }

        [HttpGet]
        [Route("/api/Analyzer/GetUsageDataCustom")]
        public async Task<ActionResult<IEnumerable<object>>> GetUsageDataCustom(string startDate/*,int userId*/)//uncomment the parameter after testing.
        {
            var currentDate = DateTime.Parse(startDate);
            var pastWeekDates = Enumerable.Range(0, 7)
                .Select(i => currentDate.AddDays(-i))
                .ToList();
            var usageData = new List<object>();
            var usageDate = new List<object>();
            var usagelength = new List<object>();

            foreach (var date in pastWeekDates)
            {
                var usages = await dbContext.UserUsage
                    .Where(u => u.UserId == 1 && u.Date == date.Date)//change the userId after testing...
                    .Select(u => u.UsageTime.TotalMinutes)
                    .ToListAsync();

                var totalUsageMinutes = usages.DefaultIfEmpty(0).Sum();

                string dayOfWeek = date.DayOfWeek.ToString().Substring(0, 3);
                usageDate.Add(dayOfWeek);
                usagelength.Add(totalUsageMinutes);
            }
            usageData.Add(usageDate);
            usageData.Add(usagelength);

            return usageData;
        }

        [HttpPost]
        [Route("/api/Analyzer/StartUsage")]
        public async Task<IActionResult> StartUsage(/*int userId*/)//uncomment the parameter after testing.
        {
            var userUsage = new UserUsage
            {
                UserId = /*userId*/2,//change the userId after testing...
                Date = DateTime.Today,
                UsageTime = TimeSpan.Zero,
                StartTime = DateTime.Now
            };

            await dbContext.UserUsage.AddAsync(userUsage);
            await dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("/api/Analyzer/EndUsage")]
        public async Task<IActionResult> EndUsage(/*int userId*/)//uncomment the parameter after testing.
        {
            var userUsage = await dbContext.UserUsage
                .FirstOrDefaultAsync(u => u.UserId == 2 && u.UsageTime == TimeSpan.Zero);//change the userId after testing...

            if (userUsage != null)
            {
                userUsage.UsageTime += DateTime.Now - userUsage.StartTime;
                await dbContext.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpGet("/api/Analyzer/GetUserUsageFinhas")]
        public async Task<IActionResult> GetUserUsage(int userId)
        {
            var userUsage = await dbContext.UserUsage
                .Where(u => u.UserId == userId)
                .ToListAsync();

            if (userUsage == null || userUsage.Count == 0)
                return NotFound("No usage data found for the specified user.");

            return Ok(userUsage);
        }

        [HttpGet("/api/Analyzer/GetSession")]
        public async Task<IActionResult> GetSession(int SessionId)
        {
            var session = await dbContext.Sessions
                .Where(u => u.Id == SessionId && !u.IsDeleted)
                .Include(s => s.PracticedStages)
                .Include(s => s.NewlyMasterdStages)
                .Include(s => s.AhaMoments)
                .Include(s => s.ObservableObjects)
                .Include(s => s.PreparationPhase)
                    .ThenInclude(p => p.Goals)
                        .ThenInclude(g => g.Activity)
                .Include(s => s.PreparationPhase)
                    .ThenInclude(p => p.Goals)
                        .ThenInclude(g => g.MeditationObject)
                .Include(s => s.PreparationPhase)
                    .ThenInclude(p => p.Goals)
                        .ThenInclude(g => g.ParentGoal)
                .FirstOrDefaultAsync();

            if (session == null)
                return NotFound("No usage data found for the specified user.");

            return Ok(session);
        }
        [HttpGet("/api/Analyzer/GetRemovedSession")]
        public async Task<IActionResult> GetRemovedSession(int SessionId)
        {
            var session = await dbContext.Sessions
                .Where(u => u.Id == SessionId && u.IsDeleted)
                .Include(s => s.PracticedStages)
                .Include(s => s.NewlyMasterdStages)
                .Include(s => s.AhaMoments)
                .Include(s => s.ObservableObjects)
                .Include(s => s.PreparationPhase)
                    .ThenInclude(p => p.Goals)
                        .ThenInclude(g => g.Activity)
                .Include(s => s.PreparationPhase)
                    .ThenInclude(p => p.Goals)
                        .ThenInclude(g => g.MeditationObject)
                .Include(s => s.PreparationPhase)
                    .ThenInclude(p => p.Goals)
                        .ThenInclude(g => g.ParentGoal)
                .FirstOrDefaultAsync();

            if (session == null)
                return NotFound("No usage data found for the specified user.");

            return Ok(session);
        }

        [HttpGet("/api/Analyzer/GetSessionsForMeditator")]
        public async Task<IActionResult> GetSessionsForMeditator(int meditatorId)
        {
            var sessions = await dbContext.Sessions
                .Where(u => u.Meditator.Id == meditatorId && !u.IsDeleted)
                .Include(s => s.PracticedStages)
                .Include(s => s.NewlyMasterdStages)
                .Include(s => s.AhaMoments)
                .Include(s => s.ObservableObjects)
                .ToListAsync();

            if (!sessions.Any())
                return NotFound("No sessions found for the specified user.");

            return Ok(sessions);
        }

        [HttpGet("/api/Analyzer/GetStage")]
        public async Task<IActionResult> GetStage(int stageId)
        {
            var stage = await dbContext.Stages
                .Where(s => s.Id == stageId)
                .FirstOrDefaultAsync();

            if (stage == null)
            {
                return NotFound("No Stages were found with that Id.");
            }

            stage.Skills = Stage.GetSkillsForStage(stage.Id);
            stage.Obstacles = Stage.GetObstaclesForStage(stage.Id);
            stage.Intentions = Stage.GetIntentionsForStage(stage.Id);
            stage.MasteryRequirements = Stage.GetMasteryRequirementsForStage(stage.Id);
            return Ok(stage);
        }

        [HttpGet("/api/Analyzer/GetCountOfObservableObjectForMeditator")]
        public async Task<IActionResult> GetCountOfObservableObjectForMeditator(string observableObject, int meditatorId)
        {
            var count = await dbContext.Sessions
                .Where(s => s.Meditator.Id == meditatorId && !s.IsDeleted)
                .SelectMany(s => s.ObservableObjects)
                .CountAsync(o => o.Title == observableObject);

            return Ok(count);
        }

        [HttpGet("/api/Analyzer/GetCountOfAhaMomentForMeditator")]
        public async Task<IActionResult> GetCountOfAhaMomentForMeditator(string ahaMoment, int meditatorId)
        {
            var count = await dbContext.Sessions
                .Where(s => s.Meditator.Id == meditatorId && !s.IsDeleted)
                .SelectMany(s => s.AhaMoments)
                .CountAsync(a => a.Label == ahaMoment);

            return Ok(count);
        }

        [HttpGet("/api/Analyzer/GetMeditatorForSession")]
        public async Task<IActionResult> GetMeditatorForSession(int sessionId)
        {
            var id = await dbContext.Sessions
                .Where(u => u.Id == sessionId && !u.IsDeleted)
                .Select(s => s.Meditator.Id)
                .FirstOrDefaultAsync();
            return Ok(id);
        }
        [HttpGet("/api/Analyzer/GetMeditatorForRemovedSession")]
        public async Task<IActionResult> GetMeditatorForRemovedSession(int sessionId)
        {
            var id = await dbContext.Sessions
                .Where(u => u.Id == sessionId && u.IsDeleted)
                .Select(s => s.Meditator.Id)
                .FirstOrDefaultAsync();
            return Ok(id);
        }

        [HttpGet("/api/analyzer/GetPracticedStagesForMeditator")]
        public async Task<IActionResult> GetPracticedStagesForMeditator(int meditatorId)
        {
            var meditator = await dbContext.Meditators
                .Where(m => m.Id == meditatorId)
                .Include(m => m.PracticedStages)
                .FirstOrDefaultAsync();

            if (meditator == null)
            {
                return NotFound("No meditator with that Id found.");
            }

            // Load the sessions to filter practiced stages
            var sessionIds = meditator.PracticedStages.Select(ps => ps.SessionId).Distinct().ToList();
            var validSessions = await dbContext.Sessions
                .Where(s => sessionIds.Contains(s.Id) && !s.IsDeleted)
                .Select(s => s.Id)
                .ToListAsync();

            meditator.PracticedStages = meditator.PracticedStages
                .Where(ps => validSessions.Contains(ps.SessionId))
                .ToList();

            return Ok(meditator);
        }


        [HttpGet("/api/analyzer/GetCurrentStageOfMeditator")]
        public async Task<IActionResult> GetCurrentStageOfMeditator([FromQuery] int meditatorId)
        {
            if (meditatorId <= 0)
            {
                return BadRequest("Invalid meditator ID.");
            }

            var meditator = await dbContext.Meditators
                .Where(m => m.Id == meditatorId)
                .Select(m => new { m.CurrentStage })
                .FirstOrDefaultAsync();

            if (meditator == null)
            {
                return NotFound("No meditators with that ID found.");
            }

            return Ok(meditator.CurrentStage);
        }

        [HttpGet("/api/analyzer/GetLongestSessionForMeditator")]
        public async Task<IActionResult> GetLongestSessionForMeditator([FromQuery] int meditatorId)
        {
            if (meditatorId <= 0)
            {
                return BadRequest("Invalid meditator ID.");
            }

            var meditator = await dbContext.Meditators
                .Where(m => m.Id == meditatorId)
                .FirstOrDefaultAsync();

            if (meditator == null)
            {
                return NotFound("No meditators with that ID found.");
            }

            var sessions = await dbContext.Sessions
                .Where(s => s.Meditator.Id == meditatorId && !s.IsDeleted)
                .ToListAsync();

            if (sessions == null || !sessions.Any())
            {
                return NotFound("No sessions found for this meditator.");
            }

            var sessionWithLongestDuration = sessions
                .OrderByDescending(s => (s.EndDateTime - s.StartDateTime).TotalSeconds)
                .FirstOrDefault();

            return Ok(sessionWithLongestDuration);
        }

        [HttpGet("/api/analyzer/GetTypeForAnObservableObject")]
        public async Task<IActionResult> GetTypeForAnObservableObject(int observableObjectId)
        {
            var observableObject = await dbContext.ObservableObjects
                .Where(o => o.Id == observableObjectId)
                .FirstOrDefaultAsync();

            var type = observableObject.Type();

            if (type == null)
            {
                return NotFound("No observable object with this Id exists");
            }
            else
            {
                return Ok(type);
            }
        }

        [HttpDelete("/api/Analyzer/DeleteSession")]
        public async Task<IActionResult> DeleteSession(int sessionId)
        {
            var sessionToDelete = await dbContext.Sessions
                .Where(s => s.Id == sessionId && !s.IsDeleted)
                .FirstOrDefaultAsync();

            if (sessionToDelete == null)
            {
                return NotFound("A session with that Id does not exist");
            }
            else
            {
                sessionToDelete.IsDeleted = true;
                await dbContext.SaveChangesAsync();
                return Ok("Deleted Session with Id: " + sessionToDelete.Id);
            }
        }
        [HttpGet("/api/Analyzer/GetRemovedSessionsForMeditator")]
        public async Task<IActionResult> GetRemovedSessionsForMeditator(int meditatorId)
        {
            var sessions = await dbContext.Sessions
                .Where(s => s.Meditator.Id == meditatorId && s.IsDeleted == true)
                .Include(s => s.PracticedStages)
                .Include(s => s.NewlyMasterdStages)
                .Include(s => s.AhaMoments)
                .Include(s => s.ObservableObjects)
                .Include(s => s.PreparationPhase)
                .ToListAsync();
            if (sessions != null)
            {
                return Ok(sessions);
            }
            else
            {
                return NotFound("No Deleted Sessions for meditator: " + meditatorId);
            }
        }

        [HttpPost("/api/Analyzer/RestoreSession")]
        public async Task<IActionResult> RestoreSession(int sessionId)
        {
            var sessionToDelete = await dbContext.Sessions
                .Where(s => s.Id == sessionId && s.IsDeleted)
                .FirstOrDefaultAsync();

            if (sessionToDelete == null)
            {
                return NotFound("A session with that Id does not exist");
            }
            else
            {
                sessionToDelete.IsDeleted = false;
                await dbContext.SaveChangesAsync();
                return Ok("Restored Session with Id: " + sessionToDelete.Id);
            }
        }
    }
}
