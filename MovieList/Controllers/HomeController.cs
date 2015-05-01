using MovieList.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MovieList.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        private ApplicationDbContext db = new ApplicationDbContext();

        [Route("api/allmovies")]
        public IEnumerable<Movies> GetAllMovies()
        {
            return db.Movies.ToList();
        }
    }
}