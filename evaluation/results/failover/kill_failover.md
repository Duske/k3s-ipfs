# Use case - Node goes offline

## Initial status
```
NAME                   READY   STATUS    RESTARTS   AGE     IP           NODE           NOMINATED NODE   READINESS GATES
ipfs-cluster-0         2/2     Running   0          61m     10.42.1.7    92748de30084   <none>           <none>
ipfs-companion-dg6wr   2/2     Running   0          4m17s   10.42.1.49   92748de30084   <none>           <none>
ipfs-companion-x2fvd   2/2     Running   8          61m     10.42.0.52   81daec3cce85   <none>           <none>
```

## Start workflow
Running, extraction(917588994) and guess(1066029528) completed 
```
NAME                            READY   STATUS      RESTARTS   AGE     IP           NODE           NOMINATED NODE   READINESS GATES
ipfs-cluster-0                  2/2     Running     0          65m     10.42.1.7    92748de30084   <none>           <none>
ipfs-companion-dg6wr            2/2     Running     0          8m38s   10.42.1.49   92748de30084   <none>           <none>
ipfs-companion-x2fvd            2/2     Running     8          65m     10.42.0.52   81daec3cce85   <none>           <none>
text-analysisvkqtx-917588994    0/2     Completed   0          69s     10.42.0.55   81daec3cce85   <none>           <none>
text-analysisvkqtx-1066029528   0/2     Completed   0          56s     10.42.1.50   92748de30084   <none>           <none>
text-analysisvkqtx-438869613    2/2     Running     0          57s     10.42.0.56   81daec3cce85   <none>           <none>
text-analysisvkqtx-2503203658   2/2     Running     0          57s     10.42.0.57   81daec3cce85   <none>           <none>
text-analysisvkqtx-3922869358   2/2     Running     0          57s     10.42.0.58   81daec3cce85   <none>           <none>
```

## Kill node while processing workflow
Kill node 81daec3cce85 and wait for reschedule

```
NAME                            READY   STATUS            RESTARTS   AGE     IP           NODE           NOMINATED NODE   READINESS GATES
ipfs-cluster-0                  2/2     Running           0          65m     10.42.1.7    92748de30084   <none>           <none>
ipfs-companion-dg6wr            2/2     Running           0          8m49s   10.42.1.49   92748de30084   <none>           <none>
text-analysisvkqtx-1066029528   0/2     Completed         0          67s     10.42.1.50   92748de30084   <none>           <none>
ipfs-companion-x2fvd            2/2     Running           8          65m     10.42.0.52   81daec3cce85   <none>           <none>
text-analysisvkqtx-438869613    2/2     Terminating       0          68s     10.42.0.56   81daec3cce85   <none>           <none>
text-analysisvkqtx-2503203658   2/2     Terminating       0          68s     10.42.0.57   81daec3cce85   <none>           <none>
text-analysisvkqtx-3922869358   2/2     Terminating       0          68s     10.42.0.58   81daec3cce85   <none>           <none>
text-analysisvkqtx-3995768768   0/2     PodInitializing   0          7s      10.42.1.51   92748de30084   <none>           <none>
text-analysisvkqtx-3318727979   0/2     PodInitializing   0          7s      10.42.1.52   92748de30084   <none>           <none>
text-analysisvkqtx-2972829895   0/2     PodInitializing   0          7s      10.42.1.53   92748de30084   <none>           <none>
```

Argo CLI
```
Name:                text-analysisvkqtx
Namespace:           default
ServiceAccount:      default
Status:              Succeeded
Created:             Sat Jan 04 18:08:06 +0100 (6 minutes ago)
Started:             Sat Jan 04 18:08:06 +0100 (6 minutes ago)
Finished:            Sat Jan 04 18:15:04 +0100 (now)
Duration:            6 minutes 58 seconds
Parameters:          
  filename:          simplex.pdf

STEP                                          PODNAME                        DURATION  MESSAGE
 ✔ text-analysisvkqtx (extract-data)                                                
 ├-✔ extract-data(0) (extract-data-template)  text-analysisvkqtx-917588994   11s    
 ├-✔ core-phrases (core-phrases)                                                    
 | ├-⚠ core-phrases(0) (core-phrases)         text-analysisvkqtx-3922869358  4s     Node offline. Unexpected pod phase for text-analysisvkqtx-3922869358: Running
 | └-✔ core-phrases(1) (core-phrases)         text-analysisvkqtx-3318727979  40s    
 ├-✔ keywords (keywords)                                                            
 | ├-⚠ keywords(0) (keywords)                 text-analysisvkqtx-2503203658  3s     Node offline. Unexpected pod phase for text-analysisvkqtx-2503203658: Running
 | └-✔ keywords(1) (keywords)                 text-analysisvkqtx-2972829895  58s    
 ├-✔ stats (stats)                                                                    
 | ├-⚠ stats(0) (stats)                       text-analysisvkqtx-438869613   3s        Node offline. Unexpected pod phase for text-analysisvkqtx-438869613: Running
 | └-✔ stats(1) (stats)                       text-analysisvkqtx-3995768768  38s       
 ├-✔ guess-language(0) (guess-language)       text-analysisvkqtx-1066029528  41s       
 └-✔ merger(0) (merger)                       text-analysisvkqtx-4158466880  4m        
```

The node status
```
Node status
NAME           STATUS     ROLES    AGE   VERSION
81daec3cce85   NotReady   <none>   79m   v1.16.3-k3s.2
92748de30084   Ready      <none>   79m   v1.16.3-k3s.2
```