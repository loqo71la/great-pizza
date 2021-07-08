using System.Collections.Generic;

namespace GreatPizza.WebApi.DTOs
{
    public class PizzaDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public decimal Price { get; set; }
        public string CreatedDate { get; set; }
        public string ModifiedDate { get; set; }
        public IEnumerable<ToppingDTO> Toppings { get; set; }
    }
}