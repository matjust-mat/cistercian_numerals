import os
from PIL import Image, ImageDraw
from transforms import TRANSFORMS

class CistercianGenerator:
    def __init__(self, output_dir=None, img_size=100, line_width=2):
        self.img_size = img_size
        self.line_width = line_width

        if output_dir:
            self.base_dir = output_dir
        else:
            base = os.path.dirname(__file__)
            self.base_dir = os.path.join(base, '..', 'img', 'data')

        self.place_dirs = {
            0: os.path.join(self.base_dir, 'units'),
            1: os.path.join(self.base_dir, 'tens'),
            2: os.path.join(self.base_dir, 'hundreds'),
            3: os.path.join(self.base_dir, 'thousands'),
        }

        for d in self.place_dirs.values():
            os.makedirs(d, exist_ok=True)

        self.transforms = TRANSFORMS

        self.unit_coords = [ 
            [(50,10),(70,10)],
            [(50,30),(70,30)],
            [(50,10),(70,30)],
            [(50,30),(70,10)],
            [(50,10),(70,10),(50,30)],
            [(70,10),(70,30)],
            [(50,10),(70,10),(70,30)],
            [(50,30),(70,30),(70,10)],
            [(50,10),(70,10),(70,30),(50,30)]
        ]

    def draw_base_digit(self, digit: int):
        coords = self.unit_coords[digit - 1]
        img = Image.new("RGBA", (self.img_size, self.img_size), (255, 255, 255, 0))
        draw = ImageDraw.Draw(img)
        draw.line(coords, fill="black", width=self.line_width, joint="curve")
        return img

    def draw_number(self, number: int):
        base = Image.new("RGBA", (self.img_size, self.img_size), (255, 255, 255, 255))
        draw = ImageDraw.Draw(base)
        draw.line([(50, 10), (50, 90)], fill="black", width=self.line_width)

        digits = str(number).zfill(4)
        for i in range(4):
            digit = int(digits[i])
            if digit == 0:
                continue
            part = self.draw_base_digit(digit)
            transformed = self.transforms[i](part)
            base = Image.alpha_composite(base, transformed)

        return base.convert("RGB")

    def generate_dataset(self):
        values_by_place = {
            0: list(range(1, 10)),
            1: list(range(10, 100, 10)),
            2: list(range(100, 1000, 100)),
            3: list(range(1000, 10000, 1000)),
        }

        for place, values in values_by_place.items():
            folder = self.place_dirs[place]
            for v in values:
                filename = f"{v}.png"
                path = os.path.join(folder, filename)
                if os.path.exists(path):
                    print(f"Skipping {v}, already exists")
                    continue
                img = self.draw_number(v)
                img.save(path)
                print(f"Generated {path}")

    def get_existing_image_path(self, number: int):
        if not (1 <= number <= 9999):
            return None
        magnitude = len(str(number)) - 1
        folder = self.place_dirs.get(magnitude)
        if not folder:
            return None

        filename = f"{number}.png"
        full_path = os.path.join(folder, filename)
        if os.path.exists(full_path):
            return os.path.relpath(full_path, self.base_dir), full_path

        return None
