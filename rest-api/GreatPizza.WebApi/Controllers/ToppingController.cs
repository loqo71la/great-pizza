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
    public class ToppingController : RESTController<ToppingDTO, Topping>
    {
        public ToppingController(IToppingService toppingService, ToppingMapper toppingMapper)
            : base(toppingService, toppingMapper)
        {
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PageDTO<ToppingDTO>))]
        public override Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int limit = 15)
        {
            return base.GetAll(page, limit);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ToppingDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public override Task<IActionResult> Get(int id)
        {
            return base.Get(id);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ToppingDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public override Task<IActionResult> Post([FromBody] ToppingDTO dto)
        {
            return base.Post(dto);
        }

        [HttpPut("{id}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public override Task<IActionResult> Update(int id, [FromBody] ToppingDTO dto)
        {
            return base.Update(id, dto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseDTO))]
        public override Task<IActionResult> Delete(int id)
        {
            return base.Delete(id);
        }
    }
}