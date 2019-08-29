FROM registry.gitlab.cc-asp.fraunhofer.de:4567/dchabrowski/distributed-analysis-network/base-node-java
MAINTAINER Dustin Chabrowskiw <dustin.chabrowski@isst.fraunhofer.de>

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
