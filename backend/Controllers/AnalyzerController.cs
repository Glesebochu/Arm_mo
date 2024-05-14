using Arm_mo.Context;
using Arm_mo.Models;
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
        [Route("api/Analyzer")]
        public async Task<ActionResult<IEnumerable<UserUsage>>> List()
        {
            return await dbContext.UserUsage.ToListAsync();

        }


        [HttpGet]
        [Route("api/Analyzer/GetUsageDataForPastWeek")]
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
                     .Where(u => u.UserId == 2 && u.Date == date.Date)//change the userId after testing...
                    .Select(u => u.UsageTime.TotalMinutes)
                    .ToListAsync();

                var totalUsageMinutes = usages.DefaultIfEmpty(0).Sum();
                //if (totalUsageMinutes == null)
                //{
                //    totalUsageMinutes = 0;
                //}

                string dayOfWeek = date.DayOfWeek.ToString().Substring(0, 3);
                usageDate.Add(dayOfWeek);
                usagelength.Add(totalUsageMinutes);
            }
            usageData.Add(usageDate);
            usageData.Add(usagelength);

            return usageData;
        }

        [HttpGet]
        [Route("api/Analyzer/GetUsageDataCustom")]
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
                    .Where(u => u.UserId == 2 && u.Date == date.Date)//change the userId after testing...
                    .Select(u => u.UsageTime.TotalMinutes)
                    .ToListAsync();

                var totalUsageMinutes = usages.DefaultIfEmpty(0).Sum();
                //if (totalUsageMinutes == null)
                //{
                //    totalUsageMinutes = 0;
                //}

                string dayOfWeek = date.DayOfWeek.ToString().Substring(0, 3);
                usageDate.Add(dayOfWeek);
                usagelength.Add(totalUsageMinutes);
            }
            usageData.Add(usageDate);
            usageData.Add(usagelength);

            return usageData;
        }


        [HttpPost]
        [Route("api/Analyzer/StartUsage")]
        public async Task<IActionResult> StartUsage(/*int userId*/)//uncomment the parameter after testing.
        {
            var userUsage = new UserUsage
            {
                UserId = /*userId*/2,//change the userId after testing...
                Date = DateTime.Today,
                UsageTime = TimeSpan.Zero,
                StartTime = DateTime.Now
                //Id = /*GetNextUsageID()
            };

            dbContext.UserUsage.AddAsync(userUsage);
            await dbContext.SaveChangesAsync();

            return Ok();
        }

        

        [HttpPost]
        [Route("api/Analyzer/EndUsage")]
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

        //private int GetNextUsageID()
        //{
        //    var maxUsageID = dbContext.UserUsage.Select(u => (int?)u.Id).DefaultIfEmpty().Max();
        //    return maxUsageID.HasValue ? maxUsageID.Value + 1 : 1;
        //}
    }
}
