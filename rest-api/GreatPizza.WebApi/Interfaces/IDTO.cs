namespace GreatPizza.WebApi.Interfaces
{
    public interface IDTO
    {
        public int Id { get; set; }
        public string CreatedDate { get; set; }
        public string ModifiedDate { get; set; }
    }
}