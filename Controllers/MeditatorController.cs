using Arm_mo.Models.Templates;
using Arm_mo.Models;
using Arm_mo.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arm_mo.Controllers
{
    public class MeditatorController : Controller
    {
        IWebHostEnvironment webHostEnvironment { get; set; }
        public MeditatorController(IWebHostEnvironment webHostEnvironment)
        {
            this.webHostEnvironment = webHostEnvironment;
        }
        // GET: MeditatorController
        public ActionResult Index()
        {
            return View();
        }

        // GET: MeditatorController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }
        
        // GET; MeditatorController/GetAllMeditators
        public ActionResult GetAllMeditators()
        {
            // With ViewData
            ViewData["Title"] = "All Meditators";
            ViewData["Meditators"] = DataSource.GetAllMeditators();
            
            // With ViewBag
            ViewBag.Title = "All Meditators";
            ViewBag.Meditators = DataSource.GetAllMeditators();

            // With TempData
            TempData["Title"] = "All Meditators";
            return View();
        }

        // GET: MeditatorController/Create
        [HttpGet]
        [ActionName("Create")]
        public ActionResult CreateFormRequest()
        {
            ViewBag.title = "Create Meditator";
            return View("Create");
        }

        // =====================================
        // Using Request.Form dictionary.

        // POST: MeditatorController/Create
        //[HttpPost]
        //public ActionResult Create()
        //{
        //    Meditator meditator = new Meditator()
        //    {
        //        MeditatorId = int.Parse(Request.Form["MeditatorId"]),
        //        FirstName = Request.Form["FirstName"],
        //        LastName = Request.Form["LastName"],
        //        Username = Request.Form["Username"],
        //        _password = Request.Form["_password"],
        //        CurrentStage = Request.Form["CurrentStage"]
        //    };

        //    return View("Details", meditator);
        //}

        // =====================================
        // Using parameters in the action method

        // POST: MeditatorController/Create
        //[HttpPost]
        //public ActionResult Create(int MeditatorId, string FirstName, string LastName, string Username, string _password, string CurrentStage)
        //{
        //    Meditator meditator = new Meditator()
        //    {
        //        MeditatorId = MeditatorId,
        //        FirstName = FirstName,
        //        LastName = LastName,
        //        Username = Username,
        //        _password = _password,
        //        CurrentStage = CurrentStage
        //    };
        //    return View("Details", meditator);
        //}

        // =====================================
        // Using model binding
        // POST: MeditatorController/Create
        [HttpPost]
        public IActionResult Create(Meditator meditator)
        {
            //// Get the single profile picture
            //ProfilePicture picture = new ProfilePicture();
            //picture.ImgPath = "ProfilePictures/" +
            //    Guid.NewGuid().ToString() +
            //    "-" +
            //    meditator.profilePictureFormFile.FileName; // +
            //                                               //Path.GetExtension(meditator.profilePictureFormFile.FileName);
            //picture.MeditatorId = meditator.MeditatorId;

            //string serverPath = Path.Combine(webHostEnvironment.WebRootPath, picture.ImgPath);

            //meditator.profilePictureFormFile.CopyTo(new FileStream(serverPath, FileMode.Create));
            //meditator.profilePicture = picture;

            // Get the list of profile pictures
            meditator.profilePictures = new List<ProfilePicture>();
            for (int i = 0; i < meditator.profilePicturesFormFile.Count; i++)
            {
                ProfilePicture pic = new ProfilePicture();
                pic.ImgPath = "ProfilePictures/" +
                    Guid.NewGuid().ToString() +
                    "-" +
                    meditator.profilePicturesFormFile[i].FileName;
                pic.MeditatorId = meditator.MeditatorId;

                string currentServerPath = Path.Combine(webHostEnvironment.WebRootPath, pic.ImgPath);
                meditator.profilePicturesFormFile[i].CopyTo(new FileStream(currentServerPath, FileMode.Create));
                meditator.profilePictures.Add(pic);
            }

            return View("Details", meditator);
        }

        //// GET: MeditatorController/Edit/5
        //public ActionResult Edit(int id)
        //{
        //    return View();
        //}

        //// POST: MeditatorController/Edit/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: MeditatorController/Delete/5
        //public ActionResult Delete(int id)
        //{
        //    return View();
        //}

        //// POST: MeditatorController/Delete/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}
    }
}
