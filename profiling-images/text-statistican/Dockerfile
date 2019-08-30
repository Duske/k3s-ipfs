FROM registry.gitlab.cc-asp.fraunhofer.de:4567/dchabrowski/distributed-analysis-network/base-node-python
MAINTAINER Dustin Chabrowski <dustin.chabrowski@isst.fraunhofer.de>

ARG proxy
ARG sproxy
ARG noproxy

ENV http_proxy="$proxy"
ENV https_proxy="$sproxy"
ENV no_proxy="$noproxy"

RUN apk add py3-lxml
RUN pip install nltk sumy &&  python -c "import nltk; nltk.download('punkt')"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV no_proxy="*"

CMD npm run start