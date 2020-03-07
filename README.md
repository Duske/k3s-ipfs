# K3S with IPFS

This project aims to evaluate a data analytics network based on K3S and IPFS.
It allows to run analytics workflows in a scalable and reproducible way while utilizing 
the resources of a K3S cluster.
For example, idle resources of edge devices can be harnessed that way.

## Evaluation
Performance graphs, sample data, scripts, and failover tests are stored in `evaluation`.


## Setup

## K3S Agent config

### Install k3s

` K3S_URL=<Host-IP of master> K3S_TOKEN=test curl -sfL https://get.k3s.io | sh -`

#### Custom registry

* Place `setup/registries.yaml` in `/etc/rancher/k3s/registries.yaml`
* Edit `/etc/systemd/system/k3s-agent.service` to match `./k3s-agent.service`

## Local development
If Docker and Docker Compose are installed, you can run this system locally.
Simply use the `scripts/setup.sh` script to create the system.

### IPDR 
IPDR is used to serve container images from IPFS. This enables a reproducible workflows later on by utilizing the content-addressed 
CIDs.
Please see [this fork](https://github.com/Duske/ipdr) for ipdr.

```
  ipdr push-oci <path to image file>.tar
```

## Submit a workflow

```
argo submit --kubeconfig <path to kubeconfig.yaml> --watch <path to workflow.yaml> 
```