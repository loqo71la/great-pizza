using System.Net.Mime;
using System.Threading.Tasks;
using GreatPizza.Domain.Entities;
using GreatPizza.Program.Interfaces;
using GreatPizza.WebApi.DTOs;
using GreatPizza.WebApi.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GreatPizza.WebApi.Controllers
{
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

        [HttpPost("{id}/topping:assign")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> AssignTopping(int id, [FromBody] ToppingDTO toppingDto)
        {
            var pizzaService = (IPizzaService) _service;
            await pizzaService.AssignTopping(id, toppingDto.Id);
            var responseDto = new ResponseDTO
            {
                Status = "Success",
                Message = $"Topping with ID [{toppingDto.Id}] was successfully assigned."
            };
            return Ok(responseDto);
        }
        
        [HttpDelete("{pizzaId}/topping/{toppingId}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> AssignTopping(int pizzaId, int toppingId)
        {
            var pizzaService = (IPizzaService) _service;
            await pizzaService.RemoveAssignedTopping(pizzaId, toppingId);
            var responseDto = new ResponseDTO
            {
                Status = "Success",
                Message = $"Topping with ID [{toppingId}] was successfully unassigned."
            };
            return Ok(responseDto);
        }
    }
}