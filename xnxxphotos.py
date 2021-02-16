from requests import get
import sys,re
def jpeg(jpg):
    g = []
    for a,i in enumerate(jpg):
        open("%s[%s].jpg"%(name,a),"wb").write(get(i).content)
        g.append("%s[%s].jpg"%(name,a))
    print(g)
url = sys.argv[1]
name = url.split("/")[-1]
urls = []
a = get(url).text
paging = re.findall("%s/\d+"%url,a)[:-1]
jpg = re.findall('href="(.*?_1000.jpg)',a)
urls.extend(jpg)
if paging:
    for page in paging:
        a=get(page).text
        jpg = re.findall('href="(.*?_1000.jpg)',a)
        urls.extend(jpg)
    jpeg(urls)
else:
    jpeg(urls)