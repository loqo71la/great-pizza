using System.Collections.Generic;
using GreatPizza.WebApi.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace GreatPizza.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToppingController
    {
        [HttpGet]
        public IEnumerable<ToppingDTO> GetAll()
        {
            return new List<ToppingDTO>();
        }
    }
}