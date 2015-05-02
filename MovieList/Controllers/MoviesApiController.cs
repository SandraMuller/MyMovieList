using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MovieList.Models;
using Microsoft.AspNet.Identity;

namespace MovieList.Controllers
{
    public class MoviesApiController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET:
        [Route("api/allmovies")]
        public IEnumerable<Movies> GetMovies()
        {
            return db.Movies.GroupBy(x => x.Title).Select(y => y.FirstOrDefault()).ToList();
        }

        // POST:
        [Route("api/addmovie")]
        [ResponseType(typeof(Movies))]
        public void PostMovies(Movies movie)
        {
            string currentUserId = User.Identity.GetUserId();
            ApplicationUser currentUser = db.Users.FirstOrDefault(x => x.Id == currentUserId);
            movie.User = currentUser;
            db.Movies.Add(movie);
            db.SaveChanges();
        }
    }
}