FROM node:10.15.0-alpine
MAINTAINER Dustin Chabrowski <dustin.chabrowski@isst.fraunhofer.de>

# See https://github.com/docker-library/openjdk/blob/b4f29ba829765552239bd18f272fcdaf09eca259/8-jre/alpine/Dockerfile
RUN apk upgrade --update && \
    apk add openjdk8-jre


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV no_proxy="*"

CMD npm run start
