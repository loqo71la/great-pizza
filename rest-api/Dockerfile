FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
ARG DefaultConnection

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

COPY ["*.Infrastructure/*.json", "/gp-rest-api/GreatPizza.Infrastructure/"]
RUN [ -z "$DefaultConnection" ] || sed -i -E "s/DefaultConnection\": \".+\"/DefaultConnection\": \"${DefaultConnection}\"/" /gp-rest-api/GreatPizza.Infrastructure/appsettings.json

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /gp-rest-api
COPY --from=build-env /gp-rest-api .

ENTRYPOINT ["dotnet", "GreatPizza.WebApi.dll"]
