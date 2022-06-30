FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

WORKDIR /source
COPY ["GreatPizza.sln", "./"]
COPY ["*.WebApi/*.csproj", "GreatPizza.WebApi/"]
COPY ["*.Domain/*.csproj", "GreatPizza.Domain/"]
COPY ["*.Core/*.csproj", "GreatPizza.Core/"]
COPY ["*.Test/*.csproj", "GreatPizza.WebApi.Test/"]
COPY ["*.Infrastructure/*.csproj", "GreatPizza.Infrastructure/"]
COPY ["*.Migration/*.csproj", "GreatPizza.Infrastructure.Migration/"]
RUN dotnet restore "GreatPizza.sln"

COPY . .
WORKDIR /source/GreatPizza.WebApi
RUN dotnet publish -c Release -o /gp-rest-api

FROM mcr.microsoft.com/dotnet/aspnet:6.0
EXPOSE 443
EXPOSE 80

WORKDIR /gp-rest-api
COPY --from=build-env /gp-rest-api .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet GreatPizza.WebApi.dll
