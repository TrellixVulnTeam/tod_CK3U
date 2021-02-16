import os,requests
os.system("node bwd.js")
while true:
    requests.get("http://badworders.herokuapp.com")
    time.sleep(60*30)