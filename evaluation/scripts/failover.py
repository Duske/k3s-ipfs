import os
import subprocess
import time
directory = '/home/dustin/testdata/sample-1'

def shutdownHost(host):
  subprocess.run([
    "ssh",
    "pi@"+host,
    "sudo shutdown now"
  ])

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

for filename in os.listdir(directory):
    runWorkflow(filename)
    print(filename + " done")

nodes = ["raspberrypi2","raspberrypi3",]
timeout = 60 * 5


with open('shutdown_time.csv','w') as file:  
  begin = time.time()  
  file.write(f'{begin}, "start" \n')  
  for node in nodes:    
    time.sleep(timeout)
    shutdownHost(node)
    start = time.time()
    file.write(f'{start}, {node} \n')
