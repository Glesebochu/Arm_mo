using Arm_mo.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace Arm_mo.Controllers
{
    public class AdminController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IPasswordHasher<IdentityUser> _passwordHasher;

        public AdminController(UserManager<IdentityUser> userManager, IPasswordHasher<IdentityUser> passwordHasher)
        {
            _userManager = userManager;
            _passwordHasher = passwordHasher;
        }

        public IActionResult Index()
        {
            return View(_userManager.Users);
        }

        [HttpGet]
        public IActionResult SignUp()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SignUp(SignUpDTO dto)
        {
            if (ModelState.IsValid)
            {
                var user = new IdentityUser();
                user.Email = dto.Email;
                user.UserName = dto.Username;

                IdentityResult result = await _userManager.CreateAsync(user, dto.Password);

                if (result.Succeeded)
                {
                    return RedirectToAction("Meditator/Details");
                }
                else
                {
                    foreach (IdentityError error in result.Errors)
                        ModelState.AddModelError("Err Msg", error.Description);
                }
                ModelState.Clear();
            }
            return View();
        }
    }
}
