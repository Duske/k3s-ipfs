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
# https://github.com/argoproj/argo/issues/1410
kubectl create rolebinding default-admin --clusterrole=admin --serviceaccount=default:default