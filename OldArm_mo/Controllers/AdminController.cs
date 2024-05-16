using Arm_mo.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace Arm_mo.Controllers
{
    public class AdminController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IPasswordHasher<IdentityUser> _passwordHasher;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AdminController(UserManager<IdentityUser> userManager, IPasswordHasher<IdentityUser> passwordHasher, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _passwordHasher = passwordHasher;
            _signInManager = signInManager;
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

                string hashedPassword = _passwordHasher.HashPassword(user, dto.Password);

                IdentityResult result = await _userManager.CreateAsync(user, dto.Password);

                if (result.Succeeded)
                {
                    return RedirectToAction("GetAllMeditators");
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
        
        
        [HttpGet]
        [AllowAnonymous]
        public IActionResult SignIn() { return View(); }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn(SignInDTO dto, string? returnURL)
        {
            var result = await _signInManager.PasswordSignInAsync(
                dto.UserName, dto.Password,
                isPersistent: dto.RememberMe,
                lockoutOnFailure: true
            );
            if (string.IsNullOrEmpty(returnURL))
            {

                if (result.Succeeded)
                    return RedirectToAction("GetAllMeditators", "Admin");
                else if (result.IsLockedOut)
                    ModelState.AddModelError("", "Your account is locked out.Try again in 10 minutes.");
                else
                    ModelState.AddModelError(String.Empty,"Invalid Credential");
            }
            else if (ModelState.IsValid)
            {
                if (result.IsLockedOut)
                    ModelState.AddModelError("", "Your account is locked out.Try again in 10 minutes.");
                else if (result.Succeeded)
                {
                    if (!string.IsNullOrEmpty(returnURL))
                        return Redirect(returnURL);
                }
                else
                    ModelState.AddModelError(String.Empty, "Invalid Credential");
            }
            return View();
        }


        [HttpGet]
        public async Task<IActionResult> SignOut()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public IActionResult GetAllMeditators()
        {
            return View(_userManager.Users);
        }

        [HttpGet]
        public async Task<IActionResult> Update(string id)
        {
            IdentityUser user = await _userManager.FindByIdAsync(id);
            return View(user);
        }

        [HttpPost]
        // With Parameter binding
        public async Task<IActionResult> Update(string id, string UserName, string Email, string Password)
        {
            IdentityUser user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                if (!string.IsNullOrEmpty(UserName))
                    user.UserName = UserName;
                else
                    ModelState.AddModelError("User Name : ", "User Name cannot be empty");

                if (!string.IsNullOrEmpty(Email))
                    user.Email = Email;
                else
                    ModelState.AddModelError("Email : ", "Email cannot be empty");

                if (!string.IsNullOrEmpty(Password))
                    user.PasswordHash = _passwordHasher.HashPassword(user, Password);
                else
                    ModelState.AddModelError("Password : ", "Password cannot be empty");

                if (!string.IsNullOrEmpty(Email) && !string.IsNullOrEmpty(Password) &&
                    !string.IsNullOrEmpty(UserName))
                {
                    IdentityResult result = await _userManager.UpdateAsync(user);
                    if (result.Succeeded)
                        return RedirectToAction("GetAllMeditators");
                    else
                    {
                        foreach (IdentityError error in result.Errors)
                            ModelState.AddModelError("", error.Description);
                    }
                }
            }
            else
                ModelState.AddModelError("", "User Not Found");

            return View("GetAllMeditators");
        }
        // With model binding
        //[HttpPost] 
        //public async Task<IActionResult> Update(string id, SignUpDTO dto){
        //    IdentityUser user = await _userManager.FindByIdAsync(id);
            
        //    if(dto != null)
        //    {
        //        var config = new MapperConfiguration(config =>
        //        {
        //            config.CreateMap<SignUpDTO, IdentityUser>().ForMember(dest => dest.UserName, src => src.MapFrom(src => src.Username));
        //        });
                
        //    }
        //    else
        //    {
        //        ModelState.AddModelError("", "User Not Found");
        //    }

        //    return View("GetAllMeditators");
        //}

        public async Task<IActionResult> Delete(string id)
        {
            IdentityUser user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                IdentityResult result = await _userManager.DeleteAsync(user);
                if (result.Succeeded)
                    return RedirectToAction("Index");
                else
                {
                    foreach (IdentityError error in result.Errors)
                        ModelState.AddModelError("", error.Description);
                }
            }
            else
                ModelState.AddModelError("", "User not found.");
            return RedirectToAction("Index");
        }
    }
}
