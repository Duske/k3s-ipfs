#!/bin/bash

# turn on bash's job control
set -m
set -x

ipfs init
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/9001
# Run ipfs with Fuse mount background
ipfs daemon --mount &

# Start k3s
k3s "$@"