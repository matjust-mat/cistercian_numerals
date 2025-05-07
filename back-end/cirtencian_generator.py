#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageOps

"""
CirtencianGenerator

Gera imagens de numerais cistercienses para cada casa decimal (unidades, dezenas, centenas, milhares),
utilizando um único conjunto base de traços e aplicando transformações geométricas (espelhamento e inversão).

Principais funcionalidades:
- Suporta valores de 1 a 9999, organizados por casa decimal.
- Salva as imagens em pastas estruturadas: 'units', 'tens', 'hundreds', 'thousands'.
- Utiliza a biblioteca PIL para desenhar e aplicar transformações, evitando duplicação de dados.
- Sempre desenha a barra vertical central (tronco) como base da numeração.
- Permite renderizar dígitos isolados ou números completos compostos.

Exemplo de uso:
    gen = CirtencianGenerator()
    img = gen.draw_number(1583)
    img.show()
"""
class CirtencianGenerator:
    def __init__(self, output_dir=None, img_size=100, line_width=2):
        self.img_size = img_size
        self.line_width = line_width

        if output_dir:
            self.base_dir = output_dir
        else:
            base = os.path.dirname(__file__)
            self.base_dir = os.path.join(base, 'img', 'data')

        self.place_dirs = {
            0: os.path.join(self.base_dir, 'units'),
            1: os.path.join(self.base_dir, 'tens'),
            2: os.path.join(self.base_dir, 'hundreds'),
            3: os.path.join(self.base_dir, 'thousands'),
        }

        for d in self.place_dirs.values():
            os.makedirs(d, exist_ok=True)

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

        self.transforms = {
            0: lambda img: ImageOps.mirror(ImageOps.flip(img)),  # thousands
            1: lambda img: ImageOps.flip(img),                   # hundreds
            2: lambda img: ImageOps.mirror(img),                 # tens
            3: lambda img: img                                   # units
        }

    def draw_base_digit(self, digit: int):
        coords = self.unit_coords[digit - 1]
        img = Image.new("RGBA", (self.img_size, self.img_size), (255, 255, 255, 0))  # transparent
        draw = ImageDraw.Draw(img)
        draw.line(coords, fill="black", width=self.line_width, joint="curve")
        return img

    def draw_number(self, number: int):
        base = Image.new("RGBA", (self.img_size, self.img_size), (255, 255, 255, 255))  # white base
        draw = ImageDraw.Draw(base)
        draw.line([(50, 10), (50, 90)], fill="black", width=self.line_width)  # center bar

        digits = str(number).zfill(4)
        for i in range(4):
            digit = int(digits[i])
            if digit == 0:
                continue
            part = self.draw_base_digit(digit)
            transformed = self.transforms[i](part)
            base = Image.alpha_composite(base, transformed)

        return base.convert("RGB")

    def generate_all(self):
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

