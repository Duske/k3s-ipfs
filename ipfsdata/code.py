import sys
filename = "/data/" + sys.argv[1]
num_lines = len(list(open(filename)))
print(num_lines)
exit(0)