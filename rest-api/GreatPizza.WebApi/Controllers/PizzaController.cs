using System.Net.Mime;
using GreatPizza.Core.Interfaces;
using GreatPizza.Domain.Entities;
using GreatPizza.WebApi.DTOs;
using GreatPizza.WebApi.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace GreatPizza.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PizzaController : RESTController<PizzaDTO, Pizza>
{
    public PizzaController(IPizzaService pizzaService, PizzaMapper pizzaMapper) :
        base(pizzaService, pizzaMapper)
    {
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PageDTO<PizzaDTO>))]
    public override Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int limit = 15)
    {
        return base.GetAll(page, limit);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PizzaDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public override Task<IActionResult> Get(int id)
    {
        return base.Get(id);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ResponseDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public override Task<IActionResult> Post([FromBody] PizzaDTO pizzaDto)
    {
        return base.Post(pizzaDto);
    }

    [HttpPut("{id}")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public override Task<IActionResult> Update(int id, [FromBody] PizzaDTO pizzaDto)
    {
        return base.Update(id, pizzaDto);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDTO))]
    public override Task<IActionResult> Delete(int id)
    {
        return base.Delete(id);
    }

    [HttpPost("{id}/topping/assign")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AssignTopping(int id, [FromBody] AssignedToppingDTO assignedtoppingDto)
    {
        var pizzaService = (IPizzaService)_service;
        await pizzaService.AssignTopping(id, assignedtoppingDto.Ids);
        var responseDto = new ResponseDTO
        {
            Status = "Success",
            Message = $"Toppings with IDs [{string.Join(",", assignedtoppingDto.Ids ?? new List<int>())}] were successfully assigned."
        };
        return Ok(responseDto);
    }
}
