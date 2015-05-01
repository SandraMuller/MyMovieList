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
        public IQueryable<Movies> GetMovies()
        {
            return db.Movies;
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

    //    // GET: api/MoviesApi/5
    //    [ResponseType(typeof(Movies))]
    //    public IHttpActionResult GetMovies(int id)
    //    {
    //        Movies movies = db.Movies.Find(id);
    //        if (movies == null)
    //        {
    //            return NotFound();
    //        }

    //        return Ok(movies);
    //    }

    //    // PUT: api/MoviesApi/5
    //    [ResponseType(typeof(void))]
    //    public IHttpActionResult PutMovies(int id, Movies movies)
    //    {
    //        if (!ModelState.IsValid)
    //        {
    //            return BadRequest(ModelState);
    //        }

    //        if (id != movies.id)
    //        {
    //            return BadRequest();
    //        }

    //        db.Entry(movies).State = EntityState.Modified;

    //        try
    //        {
    //            db.SaveChanges();
    //        }
    //        catch (DbUpdateConcurrencyException)
    //        {
    //            if (!MoviesExists(id))
    //            {
    //                return NotFound();
    //            }
    //            else
    //            {
    //                throw;
    //            }
    //        }

    //        return StatusCode(HttpStatusCode.NoContent);
    //    }

    //    // POST: api/MoviesApi

    //    // DELETE: api/MoviesApi/5
    //    [ResponseType(typeof(Movies))]
    //    public IHttpActionResult DeleteMovies(int id)
    //    {
    //        Movies movies = db.Movies.Find(id);
    //        if (movies == null)
    //        {
    //            return NotFound();
    //        }

    //        db.Movies.Remove(movies);
    //        db.SaveChanges();

    //        return Ok(movies);
    //    }

    //    protected override void Dispose(bool disposing)
    //    {
    //        if (disposing)
    //        {
    //            db.Dispose();
    //        }
    //        base.Dispose(disposing);
    //    }

    //    private bool MoviesExists(int id)
    //    {
    //        return db.Movies.Count(e => e.id == id) > 0;
    //    }
    }
}