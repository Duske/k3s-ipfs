FROM alpine:3.9

RUN apk update && apk add wget fuse tar bash ca-certificates
RUN wget \
    https://dist.ipfs.io/go-ipfs/v0.4.21/go-ipfs_v0.4.21_linux-386.tar.gz \
    https://github.com/rancher/k3s/releases/download/0.6.0/k3s
RUN tar -xzf go-ipfs_v0.4.21_linux-386.tar.gz && rm go-ipfs_v0.4.21_linux-386.tar.gz
RUN chmod a+x \
    go-ipfs/ipfs \
    k3s
RUN mkdir /ipfs && mkdir /ipns && mv k3s go-ipfs/ipfs /bin/
RUN chmod 1777 /tmp

# IPFS Ports
EXPOSE 4001 
# Daemon API
EXPOSE 5001
# Web Gateway
EXPOSE 8080
# Swarm Websockets
EXPOSE 8081
# k3s
EXPOSE 6443

VOLUME /var/lib/rancher/k3s 
VOLUME /var/lib/cni
VOLUME /var/log

RUN mkdir /opt/local-path-provisioner

COPY ./run.sh /
RUN chmod +x run.sh
ENTRYPOINT ["./run.sh"]
CMD ["agent"]

#https://github.com/rancher/k3s/releases/download/v0.3.0/k3s

#docker run -it --tmpfs /run --tmpfs /var/run --network=k3s_default  --privileged ipfs-alpine "agent --server https://server:6443 --token K1014b49d9d35cc18b3bb9e13cff0775cbbf5ee3889636ad8d4093207fe55f96ab6::node:somethingtotallyrandom"
# -e K3S_URL=https://server:6443 -e K3S_TOKEN=K1014b49d9d35cc18b3bb9e13cff0775cbbf5ee3889636ad8d4093207fe55f96ab6::node:somethingtotallyrandom
# 