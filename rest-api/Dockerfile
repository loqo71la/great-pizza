FROM mcr.microsoft.com/dotnet/sdk:5.0
ARG DefaultConnection

WORKDIR /source
COPY ["GreatPizza.sln", "./"]
COPY ["*.WebApi/*.csproj", "GreatPizza.WebApi/"]
COPY ["*.Domain/*.csproj", "GreatPizza.Domain/"]
COPY ["*.Program/*.csproj", "GreatPizza.Program/"]
COPY ["*.Test/*.csproj", "GreatPizza.WebApi.Test/"]
COPY ["*.Infrastructure/*.csproj", "GreatPizza.Infrastructure/"]
COPY ["*.Migration/*.csproj", "GreatPizza.Infrastructure.Migration/"]
RUN dotnet restore "GreatPizza.sln" --runtime linux-x64

COPY . .
WORKDIR /source/GreatPizza.WebApi
RUN dotnet publish "GreatPizza.WebApi.csproj" -c Release -o /gp-rest-api \
    --no-restore \
    --runtime linux-x64 \
    --self-contained true \
    /p:PublishTrimmed=true \
    /p:PublishSingleFile=true

COPY ["*.Infrastructure/*.json", "/gp-rest-api/GreatPizza.Infrastructure/"]
RUN [ -z "$DefaultConnection" ] || sed -i -E "s/DefaultConnection\": \".+\"/DefaultConnection\": \"${DefaultConnection}\"/" /gp-rest-api/GreatPizza.Infrastructure/appsettings.json

WORKDIR /source/GreatPizza.Infrastructure.Migration
RUN dotnet publish "GreatPizza.Infrastructure.Migration.csproj" -c Release -o /gp-migration \
    --no-restore \
    --runtime linux-x64 \
    --self-contained true \
    /p:PublishTrimmed=true \
    /p:PublishSingleFile=true

COPY ["*.Infrastructure/*.json", "/gp-migration"]
RUN [ -z "$DefaultConnection" ] || sed -i -E "s/DefaultConnection\": \".+\"/DefaultConnection\": \"${DefaultConnection}\"/" /gp-migration/appsettings.json