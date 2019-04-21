#!/bin/bash

# turn on bash's job control
set -m
set -x

ipfs init
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/9001
if [ -z "$IPFS_BOOTSTRAP" ]; 
then echo "Use default bootstrap"; 
else ipfs bootstrap rm --all && ipfs bootstrap add $IPFS_BOOTSTRAP && echo "Use custom bootstrap peer"; 
fi
# Run ipfs with Fuse mount background
ipfs daemon --mount &

# Start k3s
k3s "$@"