using GreatPizza.Domain.Entities;
using GreatPizza.Core.Interfaces;
using GreatPizza.WebApi.DTOs;
using GreatPizza.WebApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GreatPizza.WebApi.Controllers;

public abstract class RESTController<TD, TE> : ControllerBase where TD : IDTO where TE : IEntity
{
    protected readonly ICRUDService<TE> _service;
    private readonly IMapper<TD, TE> _mapper;

    protected RESTController(ICRUDService<TE> service, IMapper<TD, TE> mapper)
    {
        _service = service;
        _mapper = mapper;
    }

    public virtual async Task<IActionResult> GetAll(int page = 1, int limit = 15)
    {
        var totalItems = await _service.Count();
        var entities = await _service.GetAll(page, limit);
        var pageDto = _mapper.ToPageDTO(entities, GetBaseUrl(), page, limit, totalItems);
        return Ok(pageDto);
    }

    public virtual async Task<IActionResult> Get(int id)
    {
        var entity = await _service.Get(id);
        var dto = _mapper.ToDTO(entity);
        return Ok(dto);
    }

    public virtual async Task<IActionResult> Post(TD dto)
    {
        var entity = _mapper.ToEntity(dto);
        await _service.Add(entity);
        var responseDto = new ResponseDTO
        {
            Status = "Success",
            Message = $"{GetBaseUrl()}/{entity.Id}"
        };
        return Created("", responseDto);
    }

    public virtual async Task<IActionResult> Update(int id, TD dto)
    {
        var entity = _mapper.ToEntity(dto);
        await _service.Update(id, entity);
        var responseDto = new ResponseDTO
        {
            Status = "Success",
            Message = $"{typeof(TE).Name} with ID [{id}] was successfully updated."
        };
        return Ok(responseDto);
    }

    public virtual async Task<IActionResult> Delete(int id)
    {
        await _service.Remove(id);
        var responseDto = new ResponseDTO
        {
            Status = "Success",
            Message = $"{typeof(TE).Name} with ID [{id}] was successfully removed."
        };
        return Ok(responseDto);
    }

    private string GetBaseUrl()
    {
        return $"{Request.Scheme}://{Request.Host}{Request.Path}";
    }
}
