from PIL import ImageOps

TRANSFORMS = {
    0: lambda img: ImageOps.mirror(ImageOps.flip(img)),  # thousands
    1: lambda img: ImageOps.flip(img),                   # hundreds
    2: lambda img: ImageOps.mirror(img),                 # tens
    3: lambda img: img                                   # units
}