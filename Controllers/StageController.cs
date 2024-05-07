using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arm_mo.Controllers
{
    public class StageController : Controller
    {
        IWebHostEnvironment webHostEnvironment { get; set; }

        public StageController(IWebHostEnvironment webHostEnvironment)
        {
            this.webHostEnvironment = webHostEnvironment;
        }
        // GET: StageController
        public ActionResult Index()
        {
            return View();
        }

        // GET: StageController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: StageController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: StageController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: StageController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: StageController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: StageController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: StageController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
