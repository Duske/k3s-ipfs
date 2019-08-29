FROM node:10.15.0-alpine

ARG proxy
ARG sproxy
ARG noproxy

ENV http_proxy="$proxy"
ENV https_proxy="$sproxy"
ENV no_proxy="$noproxy"

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
            pip3 install --upgrade pip setuptools && \
            if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
            if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
            rm -r /root/.cache

RUN CFLAGS="-Wno-narrowing" pip install cld2-cffi && pip install multi-rake

