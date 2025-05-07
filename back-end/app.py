import os
from flask import Flask, request, jsonify, abort
from werkzeug.utils import secure_filename
from cirtencian_generator import CirtencianGenerator

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(os.getcwd(), "img")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {"png"}

def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )

@app.route("/converter/to-number", methods=["POST"])
def convertToNumber():
    if "file" not in request.files:
        abort(400, description="Nenhuma parte do arquivo na solicitação")

    file = request.files["file"]
    if file.filename == "":
        abort(400, description="Nenhum arquivo selecionado")

    if not allowed_file(file.filename):
        abort(400, description="Apenas arquivos .png são permitidos")

    filename = secure_filename(file.filename)
    save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(save_path)

    return jsonify({
        "message": "Upload successful",
        "filename": filename,
        "saved_to": save_path
    }), 201

@app.route("/converter/to-numerical/<int:num>", methods=["GET"])
def convertToNumerical(num):
    if not (1 <= num <= 9999):
        abort(400, description="O número deve estar entre 1 e 9999")
      
    return jsonify({"number": num})

if __name__ == "__main__":
    gen = CirtencianGenerator()
    os.makedirs(gen.base_dir, exist_ok=True)
    gen.generate_dataset()
    app.run(debug=True)