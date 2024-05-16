using Arm_mo.Context;
using Arm_mo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography.Xml;

namespace Arm_mo_analytics.Controllers
{
    public class AnalyzerController : Controller
    {
        private readonly Arm_moContext dbContext;
      
        public AnalyzerController(Arm_moContext dbContext)
        {
            this.dbContext = dbContext;
        }
 
        public ActionResult DailyUsage()
        {
            return View();
        }

        public async Task<IActionResult> StartUsage(int userId)
        {
            var userUsage = new UserUsage
            {
                UserId = userId,
                Date = DateTime.Today,
                UsageTime = TimeSpan.Zero,
                StartTime = DateTime.Now,
                Id = GetNextUsageID(),
            };

            dbContext.UserUsage.Add(userUsage);
            await dbContext.SaveChangesAsync();

            return Ok();
        }

        private int GetNextUsageID()
        {
            var maxUsageID = dbContext.UserUsage.Select(u => (int?)u.Id).DefaultIfEmpty().Max();
            return maxUsageID.HasValue ? maxUsageID.Value + 1 : 1;
        }

        public async Task<IActionResult> EndUsage(int userId)
        {
            var userUsage = await dbContext.UserUsage
                .FirstOrDefaultAsync(u => u.UserId == userId && u.UsageTime == TimeSpan.Zero);

            if (userUsage != null)
            {
                userUsage.UsageTime += DateTime.Now - userUsage.StartTime;
                await dbContext.SaveChangesAsync();
            }

            return Ok();
        }


        [HttpGet]
        public async Task<List<object>> GetUsageDataForPastWeek(/*int userId*/)//uncomment the parameter after testing.
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
        public async Task<IActionResult> List()
        {
            var usages = await dbContext.UserUsage.ToListAsync();



            return View(usages);
        }


        [HttpPost]
        public IActionResult AjaxTest()
        {
            // Create the usage data
            var usageData = new List<object>
                {
                new object[] { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" },
                new object[] { 139, 180, 240, 150, 210, 300, 180 }
                };
            // Return the usage data as JSON
            return Json(usageData);
        }


    }
}
