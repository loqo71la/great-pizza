namespace GreatPizza.WebApi.DTOs
{
    public class ToppingDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string CreatedDate { get; set; }
        public string ModifiedDate { get; set; }
    }
}