using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Arm_mo.Controllers
{
    public class RolesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        // Create a role
        [HttpGet]
        public IActionResult Create() => View();
        
        
        [HttpPost]
        public IActionResult Create(string roleName)
        {
            return View();
        }
        // Update a role
        // Delete a role
        // Add user to a role
    }
}
