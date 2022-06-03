using System.Reflection;

namespace GreatPizza.Core.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(MemberInfo type, int id) : base($"{type.Name} with ID [{id}] was not found.")
    {
    }

    public NotFoundException(MemberInfo type, string ids) : base($"{type.Name}s with IDs [{ids}] were not found.")
    {
    }
}
