using System.Collections.Generic;

namespace GreatPizza.WebApi.DTOs
{
    public class PageDTO<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
        public string Next { get; set; }
        public string Previous { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}