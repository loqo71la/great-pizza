using System.Collections.Generic;
using GreatPizza.Domain.Entities;
using GreatPizza.WebApi.DTOs;

namespace GreatPizza.WebApi.Interfaces
{
    public interface IMapper<TD, TE> where TD : IDTO where TE : IEntity
    {
        TE ToEntity(TD dto);

        TD ToDTO(TE entity);

        PageDTO<TD> ToPageDTO(IEnumerable<TE> entities, string baseUrl, int page, int limit, int totalItem);
    }
}