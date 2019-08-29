# Use Case - Resource limits

We want to make sure that containers running on edge computing nodes do not slow down the whole system critically.

1. Define an eviction limit with various parameters on the node's kubelet 
```
k3s agent --kubelet-arg='eviction-hard=imagefs.available<5%,nodefs.available<5%,memory.available<6000Mi'
```
2. Place a label on this node: `k label nodes <node-hash> worker=limited`
3. Create a pod which surpasses the defined resource limits
```
apiVersion: v1
kind: Pod
metadata:
  name: memory-test
spec:
  containers:
  - name: memory-test-ctr
    image: polinux/stress
    command: ["stress"]
    args: ["--vm", "1", "--vm-bytes", "4000M", "--vm-hang", "1"] # 4gb ram
  nodeSelector:
    worker: limited
```