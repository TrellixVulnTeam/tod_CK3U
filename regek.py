import re,sys
id = sys.argv[1]
rum = re.findall("({}\|\d.+|\d.+\|{})".format(id,id),open("room.txt","r").read())
if len(rum) > 1:
    ram = open("room.txt","r").read().split('\n')
    ram.remove(rum[1])
    open("room.txt","w").write("\n".join(ram))
cekteman = rum[0].split("|")
if id == cekteman[0]:
   teman = cekteman[1]
else:
   teman = cekteman[0]            
print(teman) 
                    
