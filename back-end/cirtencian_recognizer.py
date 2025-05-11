import os
import numpy as np
from PIL import Image
from transforms import TRANSFORMS

class CistercianRecognizer:
    def __init__(self, template_dir='img/data', img_size=100):
        self.img_size = img_size
        self.template_dir = template_dir
        self.transforms = TRANSFORMS
        self.templates = self.load_templates()

    def load_templates(self):
        templates = {}
        for place, folder in enumerate(['thousands', 'hundreds', 'tens', 'units']):
            path = os.path.join(self.template_dir, folder)
            templates[place] = []
            for digit in range(1, 10):
                filename = f"{digit * (10**place)}.png"
                full_path = os.path.join(path, filename)
                if os.path.exists(full_path):
                    img = Image.open(full_path).convert("L").resize((self.img_size, self.img_size))
                    templates[place].append((digit, np.array(img)))
        return templates

    def mse(self, imageA, imageB):
        return np.mean((imageA - imageB) ** 2)

    def recognize(self, input_img: Image.Image):
        input_img = input_img.convert("L").resize((self.img_size, self.img_size))
        input_array = np.array(input_img)

        detected_digits = [0, 0, 0, 0]
        for place in range(4):
            min_mse = float('inf')
            best_digit = 0
            for digit, template in self.templates[place]:
                score = self.mse(input_array, template)
                if score < min_mse:
                    min_mse = score
                    best_digit = digit
            detected_digits[place] = best_digit

        number = int("".join(str(d) for d in detected_digits))
        return number
