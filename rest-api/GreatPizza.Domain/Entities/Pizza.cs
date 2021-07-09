using System;
using System.Collections.Generic;

namespace GreatPizza.Domain.Entities
{
    public class Pizza : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public ICollection<Topping> Toppings { get; set; }
    }
}