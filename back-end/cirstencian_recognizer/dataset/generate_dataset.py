from PIL import Image
import os
import cairosvg

def main():
  # Step 1: Convert SVG to PNG
  cairosvg.svg2png(
      url="Cistercian_digits_(vertical).svg",
      write_to="all_digits.png",
      output_width=900,  # adjust resolution as needed
      output_height=400
  )

  # Step 2: Load PNG
  img = Image.open("all_digits.png")
  img_width, img_height = img.size

  cols = 9
  rows = 4
  cell_width = img_width // cols
  cell_height = img_height // rows

  labels = ['units', 'tens', 'hundreds', 'thousands']

  os.makedirs("digits", exist_ok=True)

  # Step 3: Crop & Save
  for row in range(rows):
      label = labels[row]
      os.makedirs(f"digits/{label}", exist_ok=True)
      for col in range(cols):
          left = col * cell_width
          upper = row * cell_height
          right = left + cell_width
          lower = upper + cell_height

          digit = row * cols + col + 1
          cropped = img.crop((left, upper, right, lower))
          cropped.save(f"digits/{label}/{digit}.png")

if __name__ == "__main__":
    main()
