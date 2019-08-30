FROM node:10.15.0-alpine
MAINTAINER Dustin Chabrowski <dustin.chabrowski@isst.fraunhofer.de>

ARG proxy
ARG sproxy
ARG noproxy

ENV http_proxy="$proxy"
ENV https_proxy="$sproxy"
ENV no_proxy="$noproxy"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV no_proxy="*"

CMD npm run start
