import os
from flask import Flask, request, jsonify, abort, send_from_directory
from flask_cors import CORS
from PIL import Image
from cirtecian_generator import CistercianGenerator
from cirtencian_recognizer import CistercianRecognizer

app = Flask(__name__)
CORS(app)
recognizer = CistercianRecognizer()

UPLOAD_FOLDER = os.path.join(os.getcwd(), "img")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {"png"}
BASE_URL = os.environ.get("BASE_URL", "http://localhost:5000")

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/converter/to-number", methods=["POST"])
def convert_to_number():
    if "file" not in request.files:
        abort(400, description="Nenhuma parte do arquivo na solicitação")

    file = request.files["file"]
    if file.filename == "":
        abort(400, description="Nenhum arquivo selecionado")

    if not allowed_file(file.filename):
        abort(400, description="Apenas arquivos .png são permitidos")

    try:
        image = Image.open(file.stream)
        number = recognizer.recognize(image)
    except Exception as e:
        abort(500, description=f"Erro ao processar a imagem: {str(e)}")

    return jsonify({
        "message": "Arquivo analisado com sucesso",
        "number": number,
    }), 200

@app.route("/converter/to-numerical/<int:num>", methods=["GET"])
def convert_to_numerical(num):
    if not (1 <= num <= 9999):
        abort(400, description="O número deve estar entre 1 e 9999")

    gen = CistercianGenerator(output_dir=app.config["UPLOAD_FOLDER"])
    existing = gen.get_existing_image_path(num)
    if existing:
        relative_path, full_path = existing
    else:
        img = gen.draw_number(num)
        relative_path = f"{num}.png"
        full_path = os.path.join(gen.base_dir, relative_path)
        img.save(full_path, "PNG")

    image_url = f"{BASE_URL}/images/{relative_path.replace(os.sep, '/')}"
    return jsonify({
        "message": "Número convertido com sucesso",
        "filename": os.path.basename(relative_path),
        "image_url": image_url
    }), 200

@app.route("/images/<path:filename>")
def serve_image(filename):
    full_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    directory = os.path.dirname(full_path)
    file = os.path.basename(filename)
    return send_from_directory(directory, file, as_attachment=True)

if __name__ == "__main__":
    gen = CistercianGenerator()
    os.makedirs(gen.base_dir, exist_ok=True)
    gen.generate_dataset()
    app.run(debug=True)