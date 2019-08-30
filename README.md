# k3s with IPFS

## Build image

```
docker-compose build
```

## Alias
```
alias k="kubectl --kubeconfig kubeconfig.yaml"
```

## Generic
```
k get pods --all-namespaces

```

## Dashboard
```
# http only
k apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/alternative/kubernetes-dashboard.yaml

k -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')

k create clusterrolebinding kubernetes-dashboard --clusterrole=cluster-admin --serviceaccount=kube-system:kubernetes-dashboard
```

#### Proxy
```
k -n kube-system port-forward deployment/kubernetes-dashboard 9090:9090
```
[http://localhost:9090/#!/overview?namespace=default](http://localhost:9090/#!/overview?namespace=default)

#### Metrics
```
k top pods
k top nodes
```

## Node Token
```
docker exec -it k3s-ipfs_server_1 cat /var/lib/rancher/k3s/server/node-token
```

## Argo
```
# UI
k -n argo port-forward deployment/argo-ui 8001:8001

# Publish workflow hello-world
argo submit --kubeconfig kubeconfig.yaml --watch workflows/hello-world.yaml
```

## k3s

You can list the running containers with:

`k3s crictl ps`

And list the downloaded images with

`k3s crictl images`


### IPFS Cluster
ipfs-cluster-ctl --host /dns4/ipfs-cluster-0.ipfs-cluster/tcp/9094/  status

read annotation metadata 
```
k get pod ipfs-workflowc7j7x-2807610159 -o jsonpath='{.metadata.annotations}'
```

/Users/dchabrowski/Dev/Go/src/github.com/argoproj/argo/dist/argo submit --kubeconfig /Users/dchabrowski/Dev/Uni/MA/k3s-ipfs/kubeconfig.yaml --watch workflows/csv_host_data.yaml --receipt

## IPDR 

Push image to IPDR
`ipdr push --ipfs-host 127.0.0.1:5001 csv-meta`


```
ipdr push --ipfs-host 127.0.0.1:5001 registry.gitlab.cc-asp.fraunhofer.de:4567/dchabrowski/distributed-analysis-network/text-core-phrase-extractor

ipdr push --ipfs-host 127.0.0.1:5001 registry.gitlab.cc-asp.fraunhofer.de:4567/dchabrowski/distributed-analysis-network/text-language-guesser

ipdr push --ipfs-host 127.0.0.1:5001 registry.gitlab.cc-asp.fraunhofer.de:4567/dchabrowski/distributed-analysis-network/text-metadata-extractor:latest

ipdr push --ipfs-host 127.0.0.1:5001 registry.gitlab.cc-asp.fraunhofer.de:4567/dchabrowski/distributed-analysis-network/text-statistican
```