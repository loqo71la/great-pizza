FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

WORKDIR /source
COPY ["GreatPizza.sln", "./"]
COPY ["*.WebApi/*.csproj", "GreatPizza.WebApi/"]
COPY ["*.Domain/*.csproj", "GreatPizza.Domain/"]
COPY ["*.Core/*.csproj", "GreatPizza.Core/"]
COPY ["*.Test/*.csproj", "GreatPizza.WebApi.Test/"]
COPY ["*.Infrastructure/*.csproj", "GreatPizza.Infrastructure/"]
COPY ["*.Migration/*.csproj", "GreatPizza.Infrastructure.Migration/"]
RUN dotnet restore "GreatPizza.sln" --runtime linux-x64

COPY . .
WORKDIR /source/GreatPizza.WebApi
RUN dotnet publish "GreatPizza.WebApi.csproj" -c Release \
    -o /gp-rest-api \
    --no-restore \
    --runtime linux-x64 \
    --self-contained true \
    /p:PublishTrimmed=true \
    /p:PublishSingleFile=true

COPY ["*.Infrastructure/*.json", "/gp-rest-api/GreatPizza.Infrastructure/"]

FROM mcr.microsoft.com/dotnet/aspnet:6.0
EXPOSE 443
EXPOSE 80

WORKDIR /gp-rest-api
COPY --from=build-env /gp-rest-api .

CMD ASPNETCORE_URLS=http://*:$PORT ./GreatPizza.WebApi
