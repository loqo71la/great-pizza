using System;
using System.Reflection;
using GreatPizza.Domain.Entities;

namespace GreatPizza.Program.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(MemberInfo type, int id) : base(LoadMessage(type, id))
        {
        }

        private static string LoadMessage(MemberInfo type, int id)
        {
            return $"{type.Name} with ID [{id}] was not found.";
        }
    }
}