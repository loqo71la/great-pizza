using System.Collections.Generic;
using GreatPizza.WebApi.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace GreatPizza.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PizzaController
    {
        [HttpGet]
        public PageDTO<PizzaDTO> GetAll()
        {
            return new() {CurrentPage = 1, Items = new List<PizzaDTO>()};
        }
    }
}