#!/bin/sh
docker-compose up -d
sleep 10
export KUBECONFIG=kubeconfig.yaml

# Dashboard
kubectl apply -f setup/dashboard

# Metrics
kubectl apply -f setup/metrics-server

## Argo
kubectl create namespace argo
kubectl -n argo apply -f setup/argo