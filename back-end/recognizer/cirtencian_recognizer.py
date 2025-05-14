import os
import numpy as np
from PIL import Image
from skimage.metrics import structural_similarity as ssim

class CistercianRecognizer:
    """
    Recognizer using per-quadrant SSIM-based matching on binarized, padded images.
    """
    def __init__(self,
                 template_dir='img/data',
                 img_size=100,
                 ssim_threshold: float = 0.8,
                 min_region_pixels: int = 20):
        self.img_size = img_size
        self.template_dir = template_dir
        self.ssim_threshold = ssim_threshold
        self.min_region_pixels = min_region_pixels

        # Place-value exponents
        self.exponents = {
            'units': 0,
            'tens': 1,
            'hundreds': 2,
            'thousands': 3
        }

        # Load templates once
        self.templates = self.load_templates()

    def binarize(self, img: Image.Image) -> np.ndarray:
        """
        Convert to binary (values 0 or 255) and return as numpy array.
        """
        bw = img.convert('L').point(lambda p: 0 if p < 128 else 255, mode='1')
        return np.array(bw, dtype=np.uint8)

    def load_templates(self):
        templates = {place: [] for place in self.exponents}
        for place, exp in self.exponents.items():
            folder = os.path.join(self.template_dir, place)
            if not os.path.isdir(folder):
                continue
            for digit in range(1, 10):
                filename = f"{digit * (10 ** exp)}.png"
                path = os.path.join(folder, filename)
                if os.path.isfile(path):
                    img = Image.open(path).resize((self.img_size, self.img_size), Image.NEAREST)
                    arr = self.binarize(img)
                    templates[place].append((digit, arr))
        return templates

    def recognize(self, input_img: Image.Image) -> int:
        """
        Recognize a Cistercian numeral image and return its integer value.
        Uses padding to maintain aspect ratio, then fixed quadrant splits.
        Raises ValueError if no valid digit is found.
        """
        from PIL import ImageOps
        gray = input_img.convert('L')
        padded = ImageOps.pad(
            gray,
            (self.img_size, self.img_size),
            color=255,
            method=Image.NEAREST,
            centering=(0.5, 0.5)
        )
        bw_arr = self.binarize(padded)

        ink_ratio = np.count_nonzero(bw_arr == 0) / (self.img_size * self.img_size)
        if ink_ratio < 0.01 or ink_ratio > 0.2:
            raise ValueError(f'Imagem fora do perfil visual de numeral cisterciense (ink ratio: {ink_ratio:.2f})')

        half = self.img_size // 2
        coords = {
            'tens':      (0, 0, half, half),
            'units':     (half, 0, self.img_size, half),
            'thousands': (0, half, half, self.img_size),
            'hundreds':  (half, half, self.img_size, self.img_size)
        }

        total = 0
        matched_quadrants = 0

        for place, (x1, y1, x2, y2) in coords.items():
            region = bw_arr[y1:y2, x1:x2].copy()

            if place in ('units', 'hundreds'):
                region[:, :2] = 255

            if np.count_nonzero(region == 0) < self.min_region_pixels:
                continue

            best_score = -1.0
            best_digit = 0
            for digit, tmpl_arr in self.templates.get(place, []):
                tmpl_region = tmpl_arr[y1:y2, x1:x2]
                if place in ('units', 'hundreds'):
                    tmpl_region = tmpl_region.copy()
                    tmpl_region[:, :2] = 255

                score = ssim(region, tmpl_region)
                if score > best_score:
                    best_score = score
                    best_digit = digit

            if best_score >= self.ssim_threshold:
                total += best_digit * (10 ** self.exponents[place])
                matched_quadrants += 1

        if matched_quadrants < 2:
            raise ValueError('Imagem inválida: quadrantes insuficientes para ser considerado um numeral cisterciense')

        return total
