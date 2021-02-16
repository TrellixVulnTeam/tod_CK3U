import sys
text = sys.argv[1]
telist = list(text)
if ":" in text:
    telist[text.find(":")] = "/"
print(eval("".join(telist)))