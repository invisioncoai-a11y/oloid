import os
import shutil
from PIL import Image

src_logo = r"C:\Users\seyas\.gemini\antigravity\brain\29779385-3d62-4f94-ac42-c39bc2b67785\.user_uploaded\media_1792200740151_a07274ad.jpg"

os.makedirs("public/assets/brand", exist_ok=True)
os.makedirs("public/assets/partners", exist_ok=True)
os.makedirs("public/assets/images", exist_ok=True)

# 1. Copy original
shutil.copy(src_logo, "public/assets/brand/oloid-logo-original.jpg")

img = Image.open(src_logo).convert("RGBA")
w, h = img.size
pix = img.load()

# Create transparent full logo
# Replace white background with transparency using soft anti-aliased threshold
trans_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
trans_pix = trans_img.load()

white_threshold = 248
feather = 15

for y in range(h):
    for x in range(w):
        r, g, b, a = pix[x, y]
        # measure whiteness
        whiteness = min(r, g, b)
        if whiteness >= white_threshold:
            trans_pix[x, y] = (r, g, b, 0)
        elif whiteness > (white_threshold - feather):
            alpha = int((white_threshold - whiteness) / feather * 255)
            trans_pix[x, y] = (r, g, b, alpha)
        else:
            trans_pix[x, y] = (r, g, b, 255)

trans_img.save("public/assets/brand/oloid-logo.png")

# 2. White text version for dark backgrounds
# Emblem is on left (x <= 165). Text 'OLOID' is on right (x >= 180).
# For text pixels, convert their color to pure white (preserving alpha).
white_text_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
wt_pix = white_text_img.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = trans_pix[x, y]
        if a == 0:
            wt_pix[x, y] = (0, 0, 0, 0)
        elif x >= 170:
            # Text area -> turn to white while preserving alpha
            wt_pix[x, y] = (255, 255, 255, a)
        else:
            # Emblem area -> keep vibrant blue colors
            wt_pix[x, y] = (r, g, b, a)

white_text_img.save("public/assets/brand/oloid-logo-white.png")

# 3. Emblem Symbol Only
# Crop bounding box of emblem (x: 0 to 162)
emblem_crop = trans_img.crop((0, 0, 162, h))
# tightly crop transparent borders
bbox = emblem_crop.getbbox()
if bbox:
    emblem_tight = emblem_crop.crop(bbox)
    # add small 5% padding
    ew, eh = emblem_tight.size
    pad = int(max(ew, eh) * 0.08)
    sq_size = max(ew, eh) + pad * 2
    emblem_sq = Image.new("RGBA", (sq_size, sq_size), (0, 0, 0, 0))
    emblem_sq.paste(emblem_tight, ((sq_size - ew) // 2, (sq_size - eh) // 2))
    emblem_sq.save("public/assets/brand/oloid-symbol.png")
    
    # Generate favicon.ico in standard multi-sizes
    emblem_sq.resize((64, 64), Image.Resampling.LANCZOS).save(
        "public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
    )

print("Brand assets generated successfully!")

# Copy partner images from ref_assets to public/assets/partners/
partner_files = [
    'ATMOS Logo png.png', 'CG.gif', 'CameronJiskoot .jpg', 'Compair.jpg',
    'FH.gif', 'cook.png', 'pibiviesse.jpg'
]
for pf in partner_files:
    src_pf = os.path.join("ref_assets", pf)
    if os.path.exists(src_pf):
        # clean filename
        clean_name = pf.lower().replace(" ", "-").replace(".gif", ".png")
        shutil.copy(src_pf, os.path.join("public/assets/partners", clean_name))

# Copy other reference photos
for photo in ['Oil_Field_Saudi.jpg', 'p11-b.jpg', 'mission.jpg', 'pic4.jpg']:
    src_p = os.path.join("ref_assets", photo)
    if os.path.exists(src_p):
        shutil.copy(src_p, os.path.join("public/assets/images", photo.lower()))

print("Partner and photo assets copied to public/!")
