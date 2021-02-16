import sys
import random,time,re
timeout = time.time() + 60
id = sys.argv[1]
a = open("antre.txt","r").read()
if id not in a:
    open("antre.txt","a").write(id+"\n")
b = open("user.txt","r").read()
if id not in b:
    open("user.txt","a").write(id+"\n")
while True:
    if len(open("antre.txt","r").read().split("\n")) > 2:
        for friend in open("antre.txt","r").read().split("\n"):
            if friend != id:
                antre = open("antre.txt","r").read().split("\n")
                teman = friend
                antre.remove(teman)
                antre.remove(id)
                open("antre.txt","w").write("\n".join(antre))
                break
        for cek in open("room.txt","r").read().split("\n") :
            if id in cek:
                rum = re.findall("({}\|\d.+|\d.+\|{})".format(id,id),open("room.txt","r").read())
                if rum:
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
                    break
            else:
                open("room.txt","a").write(id+"|"+teman+"\n")
                print(teman) 
                break
        break        
    elif time.time() > timeout:
        if id in open("antre.txt","r").read():
            print("Teman Belum Ditemukan Dan Bot Akan Tetapi Mencarikan Teman \n Atau Ketik *!stop* Untuk Berhenti Mencari Teman")
            break
        break