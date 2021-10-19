# Great Pizza
This is an example application to manage a menu of pizzas and toppings.

## Prerequisites
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Run the App
To run the app execute the following command:
```
docker-compose up -d
```
At this time, you have a service running at [http://localhost:4200](http://localhost:4200)
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