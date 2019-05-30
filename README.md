# K3S with IPFS

## Build image

```
docker build -t k3s-ipfs:4.0 .
```

## Alias
```
alias k="kubectl --kubeconfig kubeconfig.yaml"
```

## Dashboard
```
# http only
k apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/alternative/kubernetes-dashboard.yaml

k get pods --all-namespaces

k apply -f setup

k -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')

k create clusterrolebinding kubernetes-dashboard --clusterrole=cluster-admin --serviceaccount=kube-system:kubernetes-dashboard
```

#### Proxy
```
k --namespace=kube-system port-forward kubernetes-dashboard-57df4db6b-tcdsx 9090
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

## IPFS

### Add files to private network

1. Place them into `./ipfsdata`
2. run `docker-compose exec ipfsnode ipfs add -r /import`