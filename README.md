# Great Pizza
This is a pizza menu application providing a REST API

## Prerequisites

- [Net Core](https://dotnet.microsoft.com/download)
- [Nodejs](https://nodejs.org/en/download)

## REST API
Move to **rest-api** directory:
```
cd rest-api
```
Restore dependencies:
```
dotnet restore
```
To run the API
```
dotnet run --project GreatPizza.WebApi\GreatPizza.WebApi.csproj
```
To run the integration tests
```
dotnet test
```