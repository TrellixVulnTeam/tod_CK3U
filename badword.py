import sys,re
txt = sys.argv[1]
bwdhewan=["ajg","babi","monyet","anjing","njing"];
bwdkelamin=["kontol","memek","jembut","jembod","titit","tytyd","ngentot","ngentod","meki","titid","kntl"];
bwdpintar=["goblog","goblok","tolol","bego","idiot","idiod","autis","autid"];
bwdsumatra=["kimak","puki","pepek","pantek","bodat"];
bwdsunda=["kanjut","henceut"];
bwdsulawesi=['telaso','ceba','tedong','laso','sundala'];
bwdjawa=['asu','telek','wedus','jancok'];
bwdinggris=['dick','pussy','tits','boobs','ass']
bwdautid=['zeeb','zeeber','ainx','mhanx','mhenx','mhonx','asw','kwntwl','mwmwk','kwntwd','ngab','elitis','lort','mint','pov','sfx','hyung']


hewan = re.findall("%s"%'|'.join(bwdhewan),txt)
kelamin = re.findall("%s"%'|'.join(bwdkelamin),txt)
pintar = re.findall("%s"%'|'.join(bwdpintar),txt)
sumatra = re.findall("%s"%'|'.join(bwdsumatra),txt)
sunda = re.findall("%s"%'|'.join(bwdsunda),txt)
sulawesi = re.findall("%s"%'|'.join(bwdsulawesi),txt)
jawa = re.findall("%s"%'|'.join(bwdjawa),txt)
inggris = re.findall("%s"%'|'.join(bwdinggris),txt)
tolol = re.findall("%s"%'|'.join(bwdautid),txt)

if hewan:
    print("Si %s Kasar Banget Buset"%(','.join(hewan) if len(hewan) > 1 else hewan[0]))

if kelamin:
   print("Heh %s"%(','.join(kelamin) if len(kelamin) > 1 else kelamin[0]))

if pintar:
   print("Manusia emang %s tapi bot tidak :D"%(','.join(pintar) if len(pintar) > 1 else pintar[0]))

if tolol:
    print("Hah %s ? Autis Kah ?"%(','.join(tolol) if len(tolol) > 1 else tolol[0]))
 
if sunda:
    sunda[0] = sunda[0].replace(sunda[0][0],sunda[0][0].upper())
    print("%s sia bau terasi"%(','.join(sunda) if len(sunda) > 1 else sunda[0]))

if sulawesi:
    print("Ngana %s"%(','.join(sulawesi) if len(sulawesi) > 1 else sulawesi[0]))

if jawa:
    print("Sampeyan sing %s kon"%(','.join(jawa) if len(jawa) > 1 else jawa[0]))
    
if inggris:
    print("Suck with your %s motherfucker"%(','.join(jawa) if len(jawa) > 1 else jawa[0]))