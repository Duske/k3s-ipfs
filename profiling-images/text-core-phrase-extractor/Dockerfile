FROM node:10.15.0-alpine
MAINTAINER Dustin Chabrowski <dustin.chabrowski@isst.fraunhofer.de>

RUN apk upgrade --update && \
    apk add --no-cache ca-certificates \
            gcc \
            g++ \
            gnupg \
            libffi-dev \
            make \
            python3-dev && \
            python3 -m ensurepip && \
            rm -r /usr/lib/python*/ensurepip && \
            pip3 install --upgrade pip setuptools wheel && \
            if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
            if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
            rm -r /root/.cache

RUN CFLAGS="-Wno-narrowing" pip install cld2-cffi && pip install multi-rake

RUN apk add py3-lxml
RUN pip install nltk sumy &&  python -c "import nltk; nltk.download('punkt')"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV no_proxy="*"
EXPOSE 3000

CMD npm run start
