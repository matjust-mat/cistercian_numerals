# Cistercian Numeral Converter

This project provides a Flask-based web service to **generate** and **recognize** Cistercian numeral images. It consists of three components:

* **app.py**: Flask application exposing REST endpoints
* **generator/cistercian\_generator.py**: Generates Cistercian numeral images for any number between 1 and 9999
* **recognizer/cistercian\_recognizer.py**: Recognizes and converts uploaded Cistercian numeral images back to integers

---

## 📦 Prerequisites

* **Python 3.8+**
* **pip** (Python package manager)

---

## 🛠 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/cistercian-numerals.git
   cd cistercian-numerals
   ```

2. **Create a virtual environment** (recommended)

   ```bash
   python3 -m venv venv
   source venv/bin/activate      # macOS/Linux
   venv\\Scripts\\activate     # Windows
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

---

## 🚀 Running the App

1. **Generate the dataset** (optional — runs automatically on startup)

   ```bash
   python app.py
   ```

2. **Start the Flask server**

   ```bash
   python app.py
   ```

   By default, the service runs in debug mode at `http://localhost:5000/`.

---

## 📁 Project Structure

```
project_root/
├── app.py                    # Flask entrypoint
├── generator/
│   └── cistercian_generator.py
├── recognizer/
│   └── cistercian_recognizer.py
├── shared/
│   └── transforms.py         # shared mirror/flip transforms
├── img/
│   └── data/                 # generated numeral templates
├── requirements.txt
└── README.md
```

---

## 🔧 Configuration

* **UPLOAD\_FOLDER**: `./img` by default. Stores generated images and user uploads.
* **BASE\_URL**: configure via `BASE_URL` environment variable for constructing image URLs.
* **SSIM threshold**: adjust in `CistercianRecognizer(ssim_threshold=0.8)` to tune recognition sensitivity.

---

## 🎯 API Endpoints

### 1. Generate Cistercian Image from Number

```
GET /converter/to-numerical/<num>
```

* **Parameters:**

  * `num` (int, 1–9999)
* **Response (JSON):**

  ```json
  {
    "message": "Número convertido com sucesso",
    "filename": "<num>.png",
    "image_url": "http://localhost:5000/images/<num>.png"
  }
  ```

### 2. Recognize Number from Uploaded Image

```
POST /converter/to-number
Content-Type: multipart/form-data
```

* **Form Data:**

  * `file`: PNG image of a Cistercian numeral
* **Response (JSON):**

  ```json
  {
    "message": "Arquivo analisado com sucesso",
    "number": 9933
  }
  ```
* **Errors:**

  * `400`: missing file or invalid extension
  * `422`: unrecognized numeral
  * `500`: processing error

### 3. Serve Generated or Uploaded Images

```
GET /images/<path:filename>
```

* **Serves** the image file as an attachment.

---

