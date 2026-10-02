from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageDraw, ImageFont
from rembg import remove, new_session
import numpy as np
src = Image.open("assets/raw/waleed.jpg").convert("RGB")
sess = new_session("u2net_human_seg")
m = remove(src, session=sess, only_mask=True)
m = m.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.6))
cut = src.convert("RGBA"); cut.putalpha(m)
cut.save("assets/work/cutout_raw.png")
# light grade on RGB only: warm-neutral, small contrast, sharpen
def grade(im):
    rgb = im.convert("RGB")
    rgb = ImageEnhance.Brightness(rgb).enhance(1.03)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.03)
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.0, percent=25, threshold=4))
    out = rgb.convert("RGBA"); out.putalpha(im.getchannel("A") if im.mode=="RGBA" else 255)
    return out
g = grade(cut)
# crop to subject bbox
a = np.array(g.getchannel("A")); ys,xs = np.where(a>128)
print("bbox", xs.min(), ys.min(), xs.max(), ys.max())
# hero: head to hips (y from top of head to ~1300), pad
top = max(0, ys.min()-40); x0 = max(0, xs.min()-30); x1 = min(g.width, xs.max()+30)
hero = g.crop((x0, top, x1, 1350))
# rim light: mint glow edge behind subject
def rim(im, col=(46,230,166), r=10):
    al = im.getchannel("A")
    glow = al.filter(ImageFilter.GaussianBlur(r)).point(lambda v: int(v*0.55))
    layer = Image.new("RGBA", im.size, col+(0,)); layer.putalpha(glow)
    base = Image.new("RGBA", im.size, (0,0,0,0)); base.alpha_composite(layer); base.alpha_composite(im)
    return base
pad = 30
canvas = Image.new("RGBA", (hero.width+2*pad, hero.height+2*pad), (0,0,0,0)); canvas.paste(hero,(pad,pad))
rim(canvas).save("public/images/profile/waleed-hero.webp", quality=90)
# card 800x800: head+shoulders on dark gradient
cx = (xs.min()+xs.max())//2
s = 560; box = (cx-s//2-40, ys.min()-70, cx+s//2+40, ys.min()-70+s+80)
sub = g.crop((int(box[0]),int(box[1]),int(box[2]),int(box[3])))
W=800
bg = Image.new("RGB",(W,W)); px=bg.load()
for y in range(W):
    for x in range(W):
        d = ((x-W*0.5)**2+(y-W*0.4)**2)**0.5/W
        t = min(1,d*1.4)
        px[x,y] = (int(21-14*t),int(24-16*t),int(35-23*t))
bg = bg.convert("RGBA")
sh = sub.resize((int(sub.width*W/sub.height*0.98), int(W*0.98)), Image.LANCZOS)
bg.alpha_composite(sh, ((W-sh.width)//2, W-sh.height))
v = Image.new("L",(W,W),0); ImageDraw.Draw(v).ellipse((-W*0.2,-W*0.2,W*1.2,W*1.2),fill=255)
v = v.filter(ImageFilter.GaussianBlur(120))
dark = Image.new("RGB",(W,W),(7,8,12)); card = Image.composite(bg.convert("RGB"),dark,v)
card.save("public/images/profile/waleed-card.webp", quality=90)
# avatar 256 circle
av = card.crop((150,60,650,560)).resize((256,256), Image.LANCZOS).convert("RGBA")
m = Image.new("L",(256,256),0); ImageDraw.Draw(m).ellipse((0,0,255,255),fill=255); av.putalpha(m)
av.save("public/images/profile/waleed-avatar.webp", quality=90)
# og 1200x630
og = Image.new("RGB",(1200,630),(7,8,12)); d = ImageDraw.Draw(og)
for x in range(1200):
    t=x/1200; d.line([(x,0),(x,630)], fill=(int(7+10*t),int(8+8*t),int(12+22*t)))
c = card.resize((630,630), Image.LANCZOS); og.paste(c,(570,0))
mask = Image.linear_gradient("L").rotate(90).resize((260,630)); # fade left edge of photo
edge = Image.new("RGB",(260,630),(14,17,32)); og.paste(edge,(570,0),mask.transpose(Image.FLIP_LEFT_RIGHT))
def font(n,s):
    for p in (f"C:/Windows/Fonts/{n}",):
        try: return ImageFont.truetype(p,s)
        except: pass
    return ImageFont.load_default()
d = ImageDraw.Draw(og)
d.text((70,210),"Waleed Ilyas",font=font("georgiai.ttf",82),fill=(244,245,247))
d.text((72,325),"Full Stack Engineer",font=font("segoeui.ttf",36),fill=(244,245,247))
d.text((72,375),"MERN · Next.js · Solana",font=font("consola.ttf",30),fill=(46,230,166))
d.text((72,540),"Available for remote roles",font=font("segoeui.ttf",24),fill=(163,168,184))
og.save("public/images/profile/waleed-og.jpg", quality=90)
# before/after board
b = src.crop((250,330,900,1450)).resize((455,784)); 
ba = Image.new("RGB",(455*2+ 40 + 0, 784),(20,20,20)); ba.paste(b,(0,0))
ba.paste(Image.open("public/images/profile/waleed-hero.webp").convert("RGBA").resize((455,int(455*hero.height/hero.width))).convert("RGB") if False else card.resize((455,455)),(495,0))
ba.save("assets/work/before_after.png")
