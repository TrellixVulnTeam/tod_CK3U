import sys,re
id = sys.argv[1]
while True:
    if id in open("room.txt","r").read():
        rum = re.findall("({}\|\d.+|\d.+\|{})".format(id,id),open("room.txt","r").read())
        if rum:
            if len(rum) == 1:
                ram = open("room.txt","r").read().split('\n')
                ram.remove(rum[0])
                open("room.txt","w").write("\n".join(ram))
            elif len(rum) == 2:
                ram = open("room.txt","r").read().split('\n')
                ram.remove(rum[0])
                ram.remove(rum[1])
                open("room.txt","w").write("\n".join(ram))
            cekteman = rum[0].split("|")
            if id == cekteman[0]:
                teman = cekteman[1]
            else:
                teman = cekteman[0]            
            if id not in open("antre.txt","r").read():
                open("antre.txt","a").write(id+"\n")
            print(teman) 
            break
    else:
        print("Kamu Sedang Tidak Terhubung Dengan Teman Ketik _*!find*_ Untuk Mencari Teman")
        break