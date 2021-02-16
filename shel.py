import sys
stres = sys.argv[1]
open("scriptshell.py","w").write("%s"%stres)
import subprocess
with open("out.txt", "w+") as output:
    subprocess.call(["python", "scriptshell.py"], stdout=output);
output = open("out.txt","r").read()
print(output[:-1])