using System;
using System.Collections.Generic;
using System.Linq;
using GreatPizza.Domain.Entities;
using GreatPizza.WebApi.DTOs;
using GreatPizza.WebApi.Interfaces;

namespace GreatPizza.WebApi.Mappers;

public abstract class Mapper<TD, TE> : IMapper<TD, TE> where TD : IDTO, new() where TE : IEntity, new()
{
    private const string DateFormat = "yyyy-MM-ddTHH:mm:ss.fffZ";

    public virtual TE ToEntity(TD dto)
    {
        var entity = new TE { Id = dto.Id, Type = dto.Type };
        if (!string.IsNullOrEmpty(dto.CreatedDate))
        {
            entity.CreatedDate = DateTime.Parse(dto.CreatedDate);
        }
        if (!string.IsNullOrEmpty(dto.ModifiedDate))
        {
            entity.CreatedDate = DateTime.Parse(dto.ModifiedDate);
        }
        return entity;
    }

    public virtual TD ToDTO(TE entity)
    {
        var dto = new TD { Id = entity.Id, Type = entity.Type };
        if (entity.CreatedDate != DateTime.MinValue)
        {
            dto.CreatedDate = entity.CreatedDate.ToUniversalTime().ToString(DateFormat);
        }
        if (entity.ModifiedDate != DateTime.MinValue)
        {
            dto.CreatedDate = entity.ModifiedDate.ToUniversalTime().ToString(DateFormat);
        }
        return dto;
    }

    public virtual PageDTO<TD> ToPageDTO(IEnumerable<TE> entities, string baseUrl, int page, int limit,
        int totalItem)
    {
        var totalPages = totalItem / limit;
        if (totalPages == 0 || totalItem % limit != 0)
        {
            totalPages++;
        }
        var pageDto = new PageDTO<TD>
        {
            CurrentPage = page,
            TotalItems = totalItem,
            TotalPages = totalPages,
            Items = entities.Select(ToDTO)
        };
        if (page > 1 && page <= totalPages)
        {
            pageDto.Previous = $"{baseUrl}?page={page - 1}&limit={limit}";
        }
        if (page < totalPages && page > 0)
        {
            pageDto.Next = $"{baseUrl}?page={page + 1}&limit={limit}";
        }
        return pageDto;
    }
}
