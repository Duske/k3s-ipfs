import os
import subprocess
import time
import time
directory = '/home/dustin/testdata/sample'

def runWorkflow(filename):
  subprocess.run([
    "./argo-linux-amd64",
    "--kubeconfig",
    "/etc/rancher/k3s/k3s.yaml",
    "submit",
    #"--wait",
    "k3s-ipfs/workflows/text-analysis-pi-desktop-test.yaml",
    "-p",
    "filename="+filename
  ])

nodes = ["raspberrypi2","raspberrypi3","raspberrypi4-4cbfcde5", "raspberrypi5"]
timeout = 60 * 15

for node in nodes:
  subprocess.run([
    "kubectl",
    "cordon",
    node
  ])

for filename in os.listdir(directory):
    runWorkflow(filename)
    print(filename + " done")

with open('cordon_time.csv','w') as file:  
  for node in nodes:
    
    time.sleep(timeout)
    subprocess.run([
        "kubectl",
        "uncordon",
        node
      ])
    start = time.time()
    file.write(f'{start}, {node} \n')

# k get wf  -o custom-columns=NAME:.metadata.name,START:.status.startedAt,END:.status.finishedAt
# cp `ls | head -100` ../../pdf
# curl -sfL https://get.k3s.io | K3S_URL=https://192.168.2.26:6443 K3S_TOKEN=test sh -

# wget https://raw.githubusercontent.com/rancher/k3s/293e996de7eae458ecd4490c22f1bed0699effa9/contrib/util/check-config.sh
# sudo update-alternatives --set iptables /usr/sbin/iptables-legacy

