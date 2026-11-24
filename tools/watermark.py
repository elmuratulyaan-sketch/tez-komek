#!/usr/bin/env python3
"""
Tez Kömek — суретке су таңбасын салу.

Қолдану:
  python3 tools/watermark.py INPUT OUTPUT [--fragment 0.6] [--blur x1,y1,x2,y2 ...] [--width 1100]

  --fragment 0.6  суреттің жоғарғы 60%-ын ғана қалдырып, төменгі жағын біртіндеп ағартады (үзінді)
  --blur ...      көрсетілген аймақтарды бұлдырлатады (аты-жөні, телефон нөмірі, аватар үшін);
                  координаталар 0..1 үлесімен: 0,0,1,0.1 — жоғарғы 10% жолақ
  --width         нәтиженің ең үлкен ені (сапасы әдейі төмендетіледі — ұрлауға жарамсыз)
"""
import argparse, math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONT = "/usr/share/fonts/truetype/google-fonts/ofl/montserrat/Montserrat[wght].ttf"
TEXT = "Tez Kömek · tez-komek.vercel.app"


def font(size):
    try:
        f = ImageFont.truetype(FONT, size)
        try: f.set_variation_by_axes([800])
        except Exception: pass
        return f
    except Exception:
        return ImageFont.load_default()


def tile_watermark(img, opacity=46):
    w, h = img.size
    size = max(18, int(w / 26))
    f = font(size)
    layer = Image.new("RGBA", (int(w * 2), int(h * 2)), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    tw = d.textlength(TEXT, font=f)
    step_x, step_y = int(tw + size * 3), int(size * 4.2)
    for row, y in enumerate(range(0, layer.size[1], step_y)):
        off = (row % 2) * step_x // 2
        for x in range(-step_x, layer.size[0], step_x):
            d.text((x + off + 1, y + 1), TEXT, font=f, fill=(0, 0, 0, opacity // 2))
            d.text((x + off, y), TEXT, font=f, fill=(255, 255, 255, opacity + 30))
    layer = layer.rotate(28, resample=Image.BICUBIC)
    lw, lh = layer.size
    layer = layer.crop(((lw - w) // 2, (lh - h) // 2, (lw - w) // 2 + w, (lh - h) // 2 + h))
    return Image.alpha_composite(img, layer)


def badge(img):
    w, h = img.size
    s = max(14, int(w / 42))
    f = font(s)
    d = ImageDraw.Draw(img)
    label = "Tez Kömek"
    tw = d.textlength(label, font=f)
    pad = int(s * .6)
    box = (w - tw - pad * 3 - s, h - s - pad * 3, w - pad, h - pad)
    d.rounded_rectangle(box, radius=s, fill=(10, 159, 191, 220))
    d.ellipse((box[0] + pad, box[1] + pad * 0.9, box[0] + pad + s * .8, box[1] + pad * .9 + s * .8), fill=(246, 181, 30, 255))
    d.text((box[0] + pad * 1.6 + s * .8, box[1] + pad * .55), label, font=f, fill=(255, 255, 255, 255))
    return img


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("inp"); ap.add_argument("out")
    ap.add_argument("--fragment", type=float, default=0)
    ap.add_argument("--blur", nargs="*", default=[])
    ap.add_argument("--width", type=int, default=1100)
    a = ap.parse_args()

    img = Image.open(a.inp).convert("RGBA")
    if img.width > a.width:
        img = img.resize((a.width, int(img.height * a.width / img.width)), Image.LANCZOS)
    w, h = img.size

    for b in a.blur:
        x1, y1, x2, y2 = [float(v) for v in b.split(",")]
        box = (int(x1 * w), int(y1 * h), int(x2 * w), int(y2 * h))
        region = img.crop(box).filter(ImageFilter.GaussianBlur(max(8, w // 60)))
        img.paste(region, box)

    if a.fragment and 0 < a.fragment < 1:
        keep = int(h * a.fragment)
        img = img.crop((0, 0, w, keep))
        h = keep
        fade_h = int(h * .35)
        fade = Image.new("L", (1, fade_h))
        for i in range(fade_h):
            fade.putpixel((0, i), int(255 * (i / fade_h) ** 1.6))
        fade = fade.resize((w, fade_h))
        white = Image.new("RGBA", (w, fade_h), (251, 250, 246, 255))
        img.paste(white, (0, h - fade_h), fade)

    img = tile_watermark(img)
    img = badge(img)
    img.convert("RGB").save(a.out, "JPEG", quality=72, optimize=True, progressive=True)
    print(a.out, img.size)


if __name__ == "__main__":
    main()
