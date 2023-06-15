FROM node:18-alpine
RUN apk update && apk add --no-cache tzdata bash git openssh curl

ENV TZ Europe/Vienna

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build