"""
generate-portfolio-assets.py

Generates all required portfolio assets from public/assets/SEPle-R-icon.png:
1. public/assets/name-cutout.webp          (Section 03 transparent bust cutout)
2. public/assets/avatar.webp               (Floating contact card headshot avatar)
3. public/assets/hero-face.png             (Hero PORTFOLIO letter 'O' ink illustration)
4. public/assets/frame-artwork.webp        (Section 02 144:335 portrait plate)
5. public/assets/videos/frame-artwork-poster.jpg (Section 02 poster image)
"""

import os
import cv2
import numpy as np
from PIL import Image

SRC_PATH = 'public/assets/SEPle-R-icon.png'

def main():
    if not os.path.exists(SRC_PATH):
        raise FileNotFoundError(f"Source image not found: {SRC_PATH}")

    src = Image.open(SRC_PATH).convert('RGBA')
    w, h = src.size
    print(f"Loaded source image: {SRC_PATH} ({w}x{h})")

    # 1. NAME CUTOUT (Section 03)
    bbox = src.split()[3].getbbox()
    cropped = src.crop(bbox) # 405 x 435
    target_w, target_h = 1080, 1160
    cutout_hi = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    arr = np.array(cutout_hi)
    arr[:, :, 3] = np.where(arr[:, :, 3] < 8, 0, arr[:, :, 3])
    cutout_out = Image.fromarray(arr, 'RGBA')
    cutout_path = 'public/assets/name-cutout.webp'
    cutout_out.save(cutout_path, 'WEBP', quality=95, method=6)
    print(f"Saved {cutout_path}: {cutout_out.size} ({os.path.getsize(cutout_path) // 1024} KB)")

    # 2. AVATAR (Contact Note)
    avatar_box = (95, 35, 395, 335)
    avatar_crop = src.crop(avatar_box)
    bg_w, bg_h = 320, 320
    avatar_res = avatar_crop.resize((bg_w, bg_h), Image.Resampling.LANCZOS)

    y_g, x_g = np.ogrid[:bg_h, :bg_w]
    dist = np.sqrt((x_g - bg_w / 2) ** 2 + (y_g - bg_h / 2.2) ** 2)
    max_d = np.sqrt((bg_w / 2) ** 2 + (bg_h / 2) ** 2)
    t = np.clip(dist / max_d, 0, 1)

    center_col = np.array([242.0, 238.0, 232.0])
    edge_col = np.array([226.0, 220.0, 212.0])
    bg_arr = (1 - t)[:, :, None] * center_col + t[:, :, None] * edge_col
    bg_img = Image.fromarray(bg_arr.astype(np.uint8), 'RGB').convert('RGBA')

    avatar_final = Image.alpha_composite(bg_img, avatar_res).convert('RGB')
    avatar_path = 'public/assets/avatar.webp'
    avatar_final.save(avatar_path, 'WEBP', quality=95, method=6)
    print(f"Saved {avatar_path}: {avatar_final.size} ({os.path.getsize(avatar_path) // 1024} KB)")

    # 3. HERO FACE ILLUSTRATION (Hero Section)
    SCALE = 3
    src_hi = src.resize((w * SCALE, h * SCALE), Image.Resampling.LANCZOS)
    box_hi = (125 * SCALE, 45 * SCALE, 365 * SCALE, 285 * SCALE)
    crop_hi = src_hi.crop(box_hi)

    img_np = np.array(crop_hi)
    rgb = img_np[:, :, :3]
    alpha = img_np[:, :, 3]
    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    y_coords, x_coords = np.ogrid[:720, :720]

    hair = (gray < 65) & (y_coords < 215 * SCALE // 2) & (alpha > 120)
    hair = cv2.morphologyEx(hair.astype(np.uint8), cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13)))

    brows = (gray < 75) & (y_coords >= 170 * SCALE // 2) & (y_coords <= 220 * SCALE // 2) & (alpha > 120)
    brows = cv2.morphologyEx(brows.astype(np.uint8), cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)))

    glasses_raw = (gray < 85) & (y_coords >= 195 * SCALE // 2) & (y_coords <= 285 * SCALE // 2) & (x_coords >= 105 * SCALE // 2) & (x_coords <= 375 * SCALE // 2) & (alpha > 120)
    glasses = cv2.morphologyEx(glasses_raw.astype(np.uint8), cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))

    nostrils = (gray < 100) & (y_coords >= 270 * SCALE // 2) & (y_coords <= 305 * SCALE // 2) & (x_coords >= 205 * SCALE // 2) & (x_coords <= 275 * SCALE // 2) & (alpha > 120)

    beard_raw = (gray < 85) & (y_coords >= 295 * SCALE // 2) & (alpha > 120)
    beard = cv2.morphologyEx(beard_raw.astype(np.uint8), cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)))

    suit = (gray < 85) & (y_coords >= 380 * SCALE // 2) & (alpha > 120)

    canny_face = cv2.Canny(cv2.bilateralFilter(gray, 9, 75, 75), 50, 120)
    jaw_lines = (canny_face > 0) & (y_coords >= 230 * SCALE // 2) & (y_coords <= 360 * SCALE // 2) & ((x_coords <= 135 * SCALE // 2) | (x_coords >= 345 * SCALE // 2)) & (alpha > 120)
    jaw_lines = cv2.dilate(jaw_lines.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))

    ink = (hair > 0) | (brows > 0) | (glasses > 0) | (nostrils > 0) | (beard > 0) | suit | (jaw_lines > 0)
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(ink.astype(np.uint8))
    for i in range(1, num_labels):
        if stats[i, cv2.CC_STAT_AREA] < 45:
            ink[labels == i] = False

    ink_float = cv2.GaussianBlur(ink.astype(np.float32), (5, 5), 1.2)
    ink_rgb = np.array([18.0, 18.0, 17.0])
    paper_rgb = np.array([243.0, 241.0, 235.0])
    out_rgb = (ink_float[:, :, None] * ink_rgb + (1.0 - ink_float[:, :, None]) * paper_rgb).clip(0, 255).astype(np.uint8)

    head_mask = cv2.GaussianBlur((alpha > 100).astype(np.float32), (5, 5), 1.0)
    out_alpha = (head_mask * 255.0).clip(0, 255).astype(np.uint8)

    hero_img = Image.fromarray(np.dstack([out_rgb, out_alpha]), 'RGBA').resize((512, 512), Image.Resampling.LANCZOS)
    hero_path = 'public/assets/hero-face.png'
    hero_img.save(hero_path, 'PNG')
    print(f"Saved {hero_path}: {hero_img.size} ({os.path.getsize(hero_path) // 1024} KB)")

    # 4. FRAME ARTWORK & POSTER (Section 02)
    frame_w, frame_h = 550, 1280
    bust_w = 550
    bust_h = int(cropped.height * (bust_w / cropped.width))
    bust = cropped.resize((bust_w, bust_h), Image.Resampling.LANCZOS)

    b_arr = np.array(bust).astype(np.float32)
    fade_start = int(bust_h * 0.72)
    fade_len = bust_h - fade_start
    for y in range(fade_start, bust_h):
        frac = 1.0 - (y - fade_start) / fade_len
        frac = 0.5 * (1.0 + np.cos(np.pi * (1.0 - frac)))
        b_arr[y, :, 3] *= frac

    bust_faded = Image.fromarray(b_arr.clip(0, 255).astype(np.uint8), 'RGBA')
    plate_trans = Image.new('RGBA', (frame_w, frame_h), (0, 0, 0, 0))
    plate_trans.paste(bust_faded, (0, 180), bust_faded)
    frame_path = 'public/assets/frame-artwork.webp'
    plate_trans.save(frame_path, 'WEBP', quality=95, method=6)
    print(f"Saved {frame_path}: {plate_trans.size} ({os.path.getsize(frame_path) // 1024} KB)")

    paper_bg = Image.new('RGB', (frame_w, frame_h), (243, 241, 235))
    plate_rgb = Image.alpha_composite(paper_bg.convert('RGBA'), plate_trans).convert('RGB')
    poster_path = 'public/assets/videos/frame-artwork-poster.jpg'
    plate_rgb.save(poster_path, 'JPEG', quality=92)
    print(f"Saved {poster_path}: {plate_rgb.size} ({os.path.getsize(poster_path) // 1024} KB)")

if __name__ == '__main__':
    main()
