﻿using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{

    [Authorize]
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
        [Route("GetSessionUsageCustom")]
        public async Task<ActionResult<IEnumerable<object>>> GetSessionUsageCustom(int userId, DateTime customDate)//uncomment the parameter after testing.
        {

            var currentDate = customDate != default ? customDate : DateTime.Now;

            var pastWeekDates = Enumerable.Range(0, 7)
                .Select(i => currentDate.AddDays(-i))
                .ToList();
            var sessionLength = new List<object>();
            foreach (var date in pastWeekDates)
            {
                var sessionEnd = await dbContext.Sessions.
                    Where(u => u.Meditator.Id == userId && !u.IsDeleted && u.EndDateTime.Date == date.Date)//change the userId after testing...
                    .Select(u => u.EndDateTime.TimeOfDay.TotalMinutes)
                    .ToListAsync();
                var Endtime = sessionEnd.DefaultIfEmpty(0).Sum();

                var sessionStart = await dbContext.Sessions.
                    Where(u => u.Meditator.Id == userId && !u.IsDeleted && u.StartDateTime.Date == date.Date)//change the userId after testing...
                    .Select(u => u.StartDateTime.TimeOfDay.TotalMinutes)
                    .ToListAsync();
                var startTime = sessionStart.DefaultIfEmpty(0).Sum();


                sessionLength.Add(Endtime - startTime);

            }

            return sessionLength;
        }

        [EnableCors]
        [HttpGet]
        [Route("GetUsageDataForPastWeek")]
        public async Task<ActionResult<IEnumerable<object>>> GetUsageDataForPastWeek(int userId)//uncomment the parameter after testing.
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
                    .Where(u => u.UserId == userId && u.Date == date.Date)//change the userId after testing...
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
        [Route("GetUsageDataCustom")]
        public async Task<ActionResult<IEnumerable<object>>> GetUsageDataCustom(string startDate, int userId)//uncomment the parameter after testing.
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
                    .Where(u => u.UserId == userId && u.Date == date.Date)//change the userId after testing...
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
        [Route("StartUsage")]
       public async Task<IActionResult> StartUsage(int userId)//uncomment the parameter after testing.
        {
            var zerousage = await dbContext.UserUsage
                .Where(u => u.UserId == userId && u.UsageTime == TimeSpan.Zero)//change the userId after testing...
                .ToListAsync();
            if (zerousage.Any())
            {
                
                return Ok(new { result = "usage already started" });
                
            }
            else
            {
                var userUsage = new UserUsage
                {
                    UserId = userId,//change the userId after testing...
                    Date = DateTime.Today,
                    UsageTime = TimeSpan.Zero,
                    StartTime = DateTime.Now
                };

                await dbContext.UserUsage.AddAsync(userUsage);
                await dbContext.SaveChangesAsync();
                return Ok(new { Id = userId });
            }
        }

        [HttpPost]
        [Route("UpdateUsage")]
        public async Task<IActionResult> UpdateUsage(int userId)//uncomment the parameter after testing.
        {
            var userUsage = await dbContext.UserUsage
                .Where(u => u.UserId == userId)
                .OrderByDescending(u => u.StartTime)
                .FirstOrDefaultAsync();
            if (userUsage != null)
            {
                userUsage.UsageTime = DateTime.Now - userUsage.StartTime;
                await dbContext.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpPost]
        [Route("EndUsage")]
        public async Task<IActionResult> EndUsage(int userId)//uncomment the parameter after testing.
        {
            var userUsage = await dbContext.UserUsage
                .FirstOrDefaultAsync(u => u.UserId == userId && u.UsageTime == TimeSpan.Zero && (u.StartTime.Date == DateTime.Now.Date || u.StartTime.Date == DateTime.Now.Date.AddDays(-1)));//change the userId after testing...

            if (userUsage != null)
            {
                userUsage.UsageTime += DateTime.Now - userUsage.StartTime;
                await dbContext.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpGet("GetSession")]
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
        [HttpGet("GetRemovedSession")]
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

        [HttpGet("GetSessionsForMeditator")]
        public async Task<IActionResult> GetSessionsForMeditator(int meditatorId)
        {
            var sessions = await dbContext.Sessions
                .Where(u => u.Meditator.Id == meditatorId && !u.IsDeleted)
                .Include(s => s.PracticedStages)
                .Include(s => s.NewlyMasterdStages)
                .Include(s => s.AhaMoments)
                .Include(s => s.ObservableObjects)
                .Include(s => s.PreparationPhase)
                    .ThenInclude(p => p.Goals)
                        .ThenInclude(g => g.ParentGoal)
                            .ThenInclude(pa => pa.Activity)
                .Include(s => s.PreparationPhase)
                    .ThenInclude(p => p.Goals)
                        .ThenInclude(g => g.Activity)
                .ToListAsync();

            if (!sessions.Any())
                return NotFound("No sessions found for the specified user.");

            return Ok(sessions);
        }

        [HttpGet("GetStage")]
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

        [HttpGet("GetCountOfObservableObjectForMeditator")]
        public async Task<IActionResult> GetCountOfObservableObjectForMeditator(string observableObject, int meditatorId)
        {
            var count = await dbContext.Sessions
                .Where(s => s.Meditator.Id == meditatorId && !s.IsDeleted)
                .SelectMany(s => s.ObservableObjects)
                .CountAsync(o => o.Title == observableObject);

            return Ok(count);
        }

        [HttpGet("GetCountOfAhaMomentForMeditator")]
        public async Task<IActionResult> GetCountOfAhaMomentForMeditator(string ahaMoment, int meditatorId)
        {
            var count = await dbContext.Sessions
                .Where(s => s.Meditator.Id == meditatorId && !s.IsDeleted)
                .SelectMany(s => s.AhaMoments)
                .CountAsync(a => a.Label == ahaMoment);

            return Ok(count);
        }

        [HttpGet("GetMeditatorForSession")]
        public async Task<IActionResult> GetMeditatorForSession(int sessionId)
        {
            var id = await dbContext.Sessions
                .Where(u => u.Id == sessionId && !u.IsDeleted)
                .Select(s => s.Meditator.Id)
                .FirstOrDefaultAsync();
            return Ok(id);
        }
        [HttpGet("GetMeditatorForRemovedSession")]
        public async Task<IActionResult> GetMeditatorForRemovedSession(int sessionId)
        {
            var id = await dbContext.Sessions
                .Where(u => u.Id == sessionId && u.IsDeleted)
                .Select(s => s.Meditator.Id)
                .FirstOrDefaultAsync();
            return Ok(id);
        }

        [HttpGet("GetPracticedStagesForMeditator")]
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


        [HttpGet("GetCurrentStageOfMeditator")]
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

        [HttpGet("GetLongestSessionForMeditator")]
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

        [HttpGet("GetTypeForAnObservableObject")]
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

        [HttpDelete("DeleteSession")]
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
        [HttpGet("GetRemovedSessionsForMeditator")]
        public async Task<IActionResult> GetRemovedSessionsForMeditator(int meditatorId)
        {
            var sessions = await dbContext.Sessions
                .Where(s => s.Meditator.Id == meditatorId && s.IsDeleted == true)
                .Include(s => s.PracticedStages)
                .Include(s => s.NewlyMasterdStages)
                .Include(s => s.AhaMoments)
                .Include(s => s.ObservableObjects)
                .Include(s => s.PreparationPhase)
                    .ThenInclude(p => p.Goals)
                        .ThenInclude(g => g.ParentGoal)
                            .ThenInclude(pa => pa.Activity)
                .Include(s => s.PreparationPhase)
                    .ThenInclude(p => p.Goals)
                        .ThenInclude(g => g.Activity)
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

        [HttpPost("RestoreSession")]
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
        [HttpGet("GetMostFrequentedActivity")]
        public async Task<IActionResult> GetMostFrequentedActivity(int meditatorId)
        {
            if (dbContext == null)
            {
                return StatusCode(500, "Database context is not initialized.");
            }

            try
            {
                // Step 1: Filter sessions for the meditator
                var sessions = await dbContext.Sessions
                    .Where(u => u.Meditator.Id == meditatorId && !u.IsDeleted)
                    .Include(s => s.PreparationPhase)
                        .ThenInclude(pp => pp.Goals)
                            .ThenInclude(g => g.Activity)
                    .ToListAsync();

                if (!sessions.Any())
                {
                    return NotFound("No sessions found for the specified meditator.");
                }

                // Step 2: Extract activities from goals in preparation phases
                var activities = sessions
                    .SelectMany(s => s.PreparationPhase.Goals)
                    .Select(g => g.Activity)
                    .Where(a => a != null) // Ensure we only take non-null activities
                    .ToList();

                if (!activities.Any())
                {
                    return NotFound("No activities found for the specified meditator.");
                }

                // Step 3: Group by activity title and count occurrences
                var mostFrequentedActivity = activities
                    .GroupBy(a => a.Title)
                    .OrderByDescending(g => g.Count())
                    .Select(g => new
                    {
                        Activity = g.Key,
                        Count = g.Count()
                    })
                    .FirstOrDefault();

                if (mostFrequentedActivity == null)
                {
                    return NotFound("No frequent activity found.");
                }

                // Step 4: Return the most frequented activity
                return Ok(mostFrequentedActivity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetActivitesWithTheirAhaMoments")]
        public async Task<IActionResult> GetActivitesWithTheirAhaMoments(int meditatorId)
        {
            if (dbContext == null)
            {
                return StatusCode(500, "Database context is not initialized.");
            }

            try
            {
                // Step 1: Filter sessions for the meditator
                var sessions = await dbContext.Sessions
                    .Where(u => u.Meditator.Id == meditatorId && !u.IsDeleted)
                    .Include(s => s.PreparationPhase)
                        .ThenInclude(pp => pp.Goals)
                            .ThenInclude(g => g.Activity)
                    .Include(s => s.AhaMoments)
                    .ToListAsync();

                if (!sessions.Any())
                {
                    return NotFound("No sessions found for the specified meditator.");
                }

                // Step 2: Extract the first activity from the preparation phase goals for each session
                var activitiesWithAhaMomentsCount = sessions
                    .Where(s => s.PreparationPhase != null && s.PreparationPhase.Goals != null && s.PreparationPhase.Goals.Any())
                    .Select(s => new
                    {
                        Activity = s.PreparationPhase.Goals.First().Activity,
                        AhaMomentCount = s.AhaMoments.Count
                    })
                    .Where(a => a.Activity != null) // Ensure we only take non-null activities
                    .ToList();

                if (!activitiesWithAhaMomentsCount.Any())
                {
                    return NotFound("No activities found for the specified meditator.");
                }

                // Step 3: Group by activity title and sum the count of Aha Moments
                var result = activitiesWithAhaMomentsCount
                    .GroupBy(a => a.Activity.Title)
                    .Select(g => new
                    {
                        Activity = g.Key,
                        AhaMomentCount = g.Sum(a => a.AhaMomentCount)
                    })
                    .OrderByDescending(g => g.AhaMomentCount)
                    .ToList();

                if (result == null || !result.Any())
                {
                    return NotFound("No frequent activity found.");
                }

                // Step 4: Return the activities with their Aha Moments count
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




    }
}
