using System.Reflection;

namespace GreatPizza.Core.Exceptions;

public class AlreadyExistException : Exception
{
    public AlreadyExistException(MemberInfo type, string value, string property = "name") :
        base(LoadMessage(type, value, property))
    {
    }

    private static string LoadMessage(MemberInfo type, string value, string property)
    {
        return $"{type.Name} with {property} [{value}] already exist.";
    }
}
