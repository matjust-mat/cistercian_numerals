# Aviadador 2000: Cistercian Numeral Converter

**Aviadador 2000** is a full-stack application designed to bridge historical numeral notation and modern interfaces. It lets you **generate** Cistercian numeral images from standard base-10 numbers and **recognize** Cistercian numeral images back into their numeric form.

---

## 🎯 Mission & Context

Cistercian numerals date back to medieval Europe, offering a compact way to write any number from 1 to 9,999 using a single graphical symbol. This system is both elegant and intriguing, yet largely forgotten today.

Aviadador 2000 revives this ancient notation for modern audiences, providing:

- A **creative educational tool** for history enthusiasts and students
- A **novel input method** for designers and hobbyists working with unconventional numeric systems
- A playful **programming challenge** showcasing image generation and recognition techniques

By combining Python, computer vision, Flask, Next.js, and React, the project demonstrates how to seamlessly integrate image processing and web technologies.

---

## 🌟 Key Features

- **Generate Cistercian Images**: Enter any number (1–9,999) and receive a high-quality PNG of its Cistercian numeral.
- **Recognize Uploaded Images**: Upload your own Cistercian numeral (hand‑drawn or machine‑generated) and get the corresponding numeric value.
- **Bi-directional Conversion**: Switch effortlessly between “number → image” and “image → number” modes.
- **Light/Dark Theme**: Frontend supports theme toggling for comfortable usage in any environment.
- **Responsive Design**: Mobile‑friendly layout ensures a smooth experience across devices.

---

## 🔄 How It Works (High‑Level)

1. **Frontend (Next.js + React)**

   - Provides a neat UI: input fields for numbers, file upload for images, and results display.
   - Manages application state (loading, results) and theme preferences.
   - Communicates with the backend via a simple REST API.

2. **Backend (Flask + PIL + NumPy + scikit‑image)**

   - **Generator**: Draws the four defining strokes for each digit, composites them along a central trunk, and saves templates.
   - **Recognizer**: Pre‑loads templates, binarizes input images, splits them into quadrants, and uses SSIM (structural similarity) to match against known patterns.
   - Ensures fast, reliable conversion in both directions.

---

## 🚀 Getting Started

1. **Install & Run Backend**
   See [README.md](./back-end/README.md) for Python setup and API details.
2. **Install & Run Frontend**
   See [README_FRONTEND.md](./front-end/README.md) for Node.js setup and UI instructions.

---

## 🤝 Why Use Aviadador 2000?

- **Educational Value**: Visualize and interact with a piece of medieval mathematics.
- **Creative Applications**: Integrate Cistercian numerals into art, games, or design projects.
- **Technical Showcase**: Explore image composition, template matching, and modern web stacks in one cohesive project.

Dive in, experiment with numbers old and new, and let Aviadador 2000 be your gateway to an ancient yet timeless numeral system!
