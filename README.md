# GreatPizza
[![codecov](
https://img.shields.io/badge/GreatPizza-4E69C8?labelColor=4E69C8&amp;logo=Firefox&amp;)](https://great-pizza.loqo71la.dev)
![Unit Test](https://github.com/loqo71la/great-pizza/actions/workflows/coverage-analysis.yml/badge.svg)
[![codecov](https://codecov.io/gh/loqo71la/great-pizza/branch/main/graph/badge.svg?token=23X64UH813)](https://codecov.io/gh/loqo71la/great-pizza)


It is an application that allows you to create personalized pizza menus, register new toppings and share them among other users.

# For Developers
## Prerequisites
- [Net Core](https://dotnet.microsoft.com/download)
- [Nodejs](https://nodejs.org/en/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

## Database
Set the host and credentials of the database at `/rest-api/GreatPizza.Infrastructure/appsettings.json`
```
{
    "ConnectionStrings": {
        "DefaultConnection": "server=localhost;user id=SA;password=Password123!;database=GP"
    }
}
```

## Rest Api
Move to **/rest-api** directory:
```
cd rest-api
```
Restore dependencies:
```
dotnet restore
```
To run the EF Migrations
```
dotnet run --project GreatPizza.Infrastructure.Migration
```
To run the API
```
dotnet run --project GreatPizza.WebApi
```
To see the API endpoints structure go to [https://localhost:5001/swagger](https://localhost:5001/swagger)

**NOTE**: To run the integration tests
```
dotnet test
```

## Web Client
Move to **/web-client** directory:
```
cd web-client
```
Install packages:
```
npm install
```
To run the Web client
```
npm start
```
At this time, you have a service running at [http://localhost:4200](http://localhost:4200)
