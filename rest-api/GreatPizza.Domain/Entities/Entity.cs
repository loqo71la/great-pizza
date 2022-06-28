namespace GreatPizza.Domain.Entities;

public abstract class Entity
{
    public int Id { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
