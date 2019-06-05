#!/bin/sh
docker-compose down
docker volume rm k3s-ipfs_k3s-server
rm kubeconfig.yaml