import re

with open('ref_pages/products.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

cmsbody_m = re.search(r'<div id=["\']cmsbody["\'][^>]*>(.*?)</div>\s*</div>', text, re.DOTALL | re.IGNORECASE)
body = cmsbody_m.group(1) if cmsbody_m else text

print("--- FULL PRODUCTS BODY ---")
print(body)
