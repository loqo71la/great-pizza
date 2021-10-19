FROM node:14-alpine
ARG RestApiUrl

WORKDIR /source
COPY package.json .
RUN npm install

COPY . .
RUN [ -z "$RestApiUrl" ] || sed -i -E "s/url: '.+'/url: '${RestApiUrl//\//\\/}'/" src/environments/environment.ts
RUN npm run build
RUN mv /source/dist/* /gp-web-client