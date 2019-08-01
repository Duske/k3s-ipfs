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

## IPFS

### Add files to private network

1. Place them into `./ipfsdata`
2. run `docker-compose exec ipfsnode ipfs add -r /import`

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

### Setup self signed certificate

openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
openssl rsa -passin pass:x -in server.pass.key -out server.key 
rm server.pass.key
openssl req -new -key server.key -out server.csr
# CN has to match host
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt

cp server.crt /etc/ssl/certs/server.pem
cat server.crt >> /etc/ssl/certs/ca-certificates.crt 

 k create secret generic tls-registry --from-file=tls-registry-key=server.key --from-file=tls-registry-crt=server.crt