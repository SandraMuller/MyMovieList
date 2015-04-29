using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieList.Models
{
    public class Movies
    {
        public int id { get; set; }
        public virtual ApplicationUser User { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
    }
}
