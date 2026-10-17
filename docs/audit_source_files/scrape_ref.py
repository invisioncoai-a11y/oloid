import subprocess
import urllib.parse
import os
import re
import json

BASE_URL = "https://www.taqamideast.com"

visited = set()
to_visit = [
    "https://www.taqamideast.com/index_html.html",
    "https://www.taqamideast.com/aboutus.html",
    "https://www.taqamideast.com/mission.html",
    "https://www.taqamideast.com/partners.html",
    "https://www.taqamideast.com/products.html",
    "https://www.taqamideast.com/news.html",
    "https://www.taqamideast.com/joinus.html",
    "https://www.taqamideast.com/contactus.html",
    "https://www.taqamideast.com/sitemap.html"
]

pages_data = {}
all_discovered_links = set(to_visit)

def fetch_url(url):
    try:
        res = subprocess.run(
            ["curl.exe", "-k", "-s", "-L", "-m", "15", url],
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='ignore'
        )
        return res.stdout
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""

def clean_url(url, current_url):
    url = urllib.parse.urljoin(current_url, url)
    url = url.split('#')[0]
    return url

os.makedirs("ref_pages", exist_ok=True)

print("Starting deep crawl via curl...")

while to_visit:
    url = to_visit.pop(0)
    if url in visited:
        continue
    visited.add(url)
    
    parsed = urllib.parse.urlparse(url)
    if parsed.netloc and "taqamideast.com" not in parsed.netloc:
        continue
    
    print(f"Fetching [{len(visited)}/{len(all_discovered_links)}]: {url}")
    html = fetch_url(url)
    if not html or "<html" not in html.lower():
        print(f"  Empty or non-html response for {url}")
        continue
    
    # Save local copy
    filename = parsed.path.strip("/").replace("/", "_") or "index_root.html"
    if not filename.endswith(".html") and not filename.endswith(".htm"):
        filename += ".html"
    local_path = os.path.join("ref_pages", filename)
    with open(local_path, "w", encoding="utf-8") as f:
        f.write(html)
    
    # Extract title
    title_m = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
    title = title_m.group(1).strip() if title_m else ""
    
    # Extract meta description
    desc_m = re.search(r'<meta\s+name=[\"\']description[\"\']\s+content=[\"\'](.*?)[\"\']', html, re.IGNORECASE)
    desc = desc_m.group(1).strip() if desc_m else ""
    
    # Extract meta keywords
    kw_m = re.search(r'<meta\s+name=[\"\']keywords[\"\']\s+content=[\"\'](.*?)[\"\']', html, re.IGNORECASE)
    keywords = kw_m.group(1).strip() if kw_m else ""
    
    # Extract links
    hrefs = re.findall(r'href=[\"\'](.*?)[\"\']', html, re.IGNORECASE)
    new_found = []
    for h in hrefs:
        if h.startswith(('javascript:', '#', 'mailto:', 'tel:', 'whatsapp:')):
            continue
        full_h = clean_url(h, url)
        p = urllib.parse.urlparse(full_h)
        if "taqamideast.com" in p.netloc:
            # check extension
            ext = os.path.splitext(p.path)[1].lower()
            if ext in ['', '.html', '.htm', '.php', '.asp', '.aspx']:
                all_discovered_links.add(full_h)
                if full_h not in visited and full_h not in to_visit:
                    to_visit.append(full_h)
                    new_found.append(full_h)
    
    # Extract images
    imgs = re.findall(r'<img[^>]+src=[\"\'](.*?)[\"\']', html, re.IGNORECASE)
    imgs_full = [clean_url(img, url) for img in imgs]
    
    pages_data[url] = {
        'url': url,
        'path': parsed.path,
        'local_file': local_path,
        'title': title,
        'description': desc,
        'keywords': keywords,
        'images': imgs_full
    }
    if new_found:
        print(f"  Discovered {len(new_found)} new internal links")

print(f"\nCrawling complete! Visited {len(visited)} pages. Saved to ref_pages/.")
with open("crawled_summary.json", "w", encoding="utf-8") as f:
    json.dump(pages_data, f, indent=2)
