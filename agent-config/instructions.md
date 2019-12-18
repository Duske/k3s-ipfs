# K3S Agent config

## Install k3s

` K3S_URL=https://192.168.0.143:6443 K3S_TOKEN=test curl -sfL https://get.k3s.io | sh -`

### Known issues

* the k3s master does not advertise its IP correctly, which makes agent connect to a non responding IP-address

### Custom registry

* Place `setup/registries.yaml` in `/etc/rancher/k3s/registries.yaml`
* Edit `/etc/systemd/system/k3s-agent.service` to match `./k3s-agent.service`