import os
import glob
import re
import json

files = glob.glob('ref_pages/*.html')
print(f"Found {len(files)} files in ref_pages/")

data = {}
for fpath in sorted(files):
    name = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    title_m = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
    title = title_m.group(1).strip() if title_m else ''
    
    cmsbody_m = re.search(r'<div id=["\']cmsbody["\'][^>]*>(.*?)</div>\s*</div>', content, re.DOTALL | re.IGNORECASE)
    body_raw = cmsbody_m.group(1) if cmsbody_m else content
    
    # Clean HTML tags
    clean_text = re.sub(r'<[^>]+>', ' ', body_raw)
    clean_text = ' '.join(clean_text.split())
    
    hrefs = re.findall(r'href=["\'](.*?)["\']', content, re.IGNORECASE)
    imgs = re.findall(r'src=["\'](.*?)["\']', content, re.IGNORECASE)
    
    data[name] = {
        'file': name,
        'title': title,
        'full_text': clean_text,
        'text_snippet': clean_text[:400],
        'raw_body': body_raw,
        'hrefs': sorted(list(set(hrefs))),
        'imgs': sorted(list(set(imgs)))
    }
    print(f"=== {name} ===")
    print(f"Title: {title}")
    print(f"Snippet: {clean_text[:250]}")
    print()

with open('extracted_pages_overview.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("Saved extracted_pages_overview.json")
