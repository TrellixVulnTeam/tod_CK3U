import sys
a = int(sys.argv[1])
b = int(sys.argv[2])
c = int(sys.argv[3])
d = int(sys.argv[4])
e = int(sys.argv[5])
f = int(sys.argv[6])
g = int(sys.argv[7])
h = int(sys.argv[8])
i = int(sys.argv[9])
# Mencari Determinan
detA = (a * e * i) + (b * f * g) + (c * d * h) - (g * e * c) - (h * f * a) - (i * d * b)
resdet = """Matriks ordo 3x3\n\n| %s %s %s |\n| %s %s %s |\n| %s %s %s |\nDet(A) = %s"""%(a,b,c,d,e,f,g,h,i,detA)
print(resdet)
# Mencari Adjoin
a11 = (e * i) - (h * f)
a12 = (d * i) - (g * f)
a13 = (d * h) - (g * e)
a21 = (b * i) - (h * c)
a22 = (a * i) - (g * c)
a23 = (a * h) - (g * b)
a31 = (b * f) - (e * c)
a32 = (a * f) - (d * c)
a33 = (a * e) - (d * b)

minor = """\nMinor
M11[+] | %s %s | = %s
       | %s %s |
M12[-] | %s %s | = %s
       | %s %s |
M13[+] | %s %s | = %s
       | %s %s |
M21[-] | %s %s | = %s
       | %s %s |
M22[+] | %s %s | = %s
       | %s %s |
M23[-] | %s %s | = %s
       | %s %s |
M31[+] | %s %s | = %s
       | %s %s |
M32[-] | %s %s | = %s
       | %s %s |
M33[+] | %s %s | = %s
       | %s %s |
"""%(e,f,a11,h,i,d,f,a12,g,i,d,e,a13,g,h,b,c,a21,h,i,a,c,a22,g,i,a,b,a23,g,h,b,c,a31,e,f,a,c,a32,d,f,a,b,a33,d,e)
print(minor)
print("Kofaktor")
print("Kof(A) = | ", a11 * (1), "", a12 * (-1), "", a13 * (1), " |")
print("         | ", a21 * (-1), "", a22 * (1), "", a23 * (-1), " |")
print("         | ", a31 * (1), "", a32 * (-1), "", a33 * (1), " |")
print("\nAdjoin")
print("Adj(A) = | ", a11 * (1), '', a21 * (-1), '', a31 * (1), ' |')
print('         | ', a12 * (-1), '', a22 * (1), '', a32 * (-1), ' |')
print('         | ', a13 * (1), '', a23 * (-1), '', a33 * (1), ' |')