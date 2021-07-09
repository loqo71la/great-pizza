using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using GreatPizza.Program.Exceptions;
using GreatPizza.WebApi.DTOs;
using Microsoft.AspNetCore.Http;

namespace GreatPizza.WebApi.Middlewares
{
    public class ExceptionHandler
    {
        private const string ErrorMessage =
            "The server encountered an internal error and was unable to complete your request.";

        private readonly RequestDelegate _next;

        public ExceptionHandler(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                var (statusCode, message) = exception switch
                {
                    AlreadyExistException badRequest => (HttpStatusCode.BadRequest, badRequest.Message),
                    NotFoundException notFound => (HttpStatusCode.NotFound, notFound.Message),
                    _ => (HttpStatusCode.InternalServerError, ErrorMessage)
                };
                var response = context.Response;
                response.ContentType = "application/json";
                response.StatusCode = (int) statusCode;
                var responseDto = new ResponseDTO
                {
                    Status = "Error",
                    Message = message
                };
                await response.WriteAsync(JsonSerializer.Serialize(responseDto));
            }
        }
    }
}