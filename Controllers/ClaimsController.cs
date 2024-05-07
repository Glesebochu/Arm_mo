using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Arm_mo.Controllers
{
    public class ClaimsController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        public ClaimsController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public ViewResult Index() => View();

        [HttpGet]
        public ViewResult Create() => View();

        [HttpPost]
        public async Task<IActionResult> Create(string claimType, string claimValue)
        {
            IdentityUser user = await _userManager.GetUserAsync(HttpContext.User);
            Claim claim = new Claim(claimType, claimValue);

            IdentityResult result = await _userManager.AddClaimAsync(user, claim);
            if (result.Succeeded)
                return RedirectToAction("Index");
            else
                foreach (IdentityError error in result.Errors)
                    ModelState.AddModelError("", error.Description);
            return View();
        }
    }
}
