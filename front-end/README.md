# Aviadador 2000 Frontend

This is the **Aviadador 2000** Next.js + React frontend for converting numbers to Cistercian numerals and back via the Flask API.

---

## 📦 Prerequisites

* **Node.js** v16+
* **npm** or **yarn**
* Backend API running at `http://localhost:5000` (or configure via env)

---

## 🚀 Installation

1. **Clone the repo** (or navigate into your frontend folder)

   ```bash
   git clone https://github.com/yourusername/aviadador-2000.git
   cd aviadador-2000/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment variables**

   Create a `.env.local` in the project root:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

   * `NEXT_PUBLIC_API_URL` — Base URL of the backend service.

---

## 🏃 Running

* **Development** (Hot reload)

  ```bash
  npm run dev
  # or
  yarn dev
  ```

  Runs at `http://localhost:3000`

* **Production build**

  ```bash
  npm run build
  npm start
  # or
  yarn build
  yarn start
  ```

---

## 📁 Project Structure

```
frontend/
├── components/
│   ├── Header.tsx
│   ├── ThemeToggle.tsx
│   ├── Switcher.tsx
│   ├── Converter.tsx
│   ├── Numbers.tsx
│   └── Cirtecian.tsx
├── context/
│   └── index.tsx        # provides loading state & fetched results
├── pages/
│   └── index.tsx            # Home component
├── styles/
│   └── globals.css
├── public/                   # static assets
├── .env.local                # API base URL
├── next.config.js            # Next.js config
├── package.json
├── tsconfig.json
└── README_FRONTEND.md
```

---

## 🛠 Key Components

* **Home (`pages/index.tsx`)** — wraps `Header`, `Switcher` and `Converter` within `Theme` and `ContextProvider`.
* **Header (`components/Header.tsx`)** — site title and theme toggle button.
* **ThemeToggle (`components/ThemeToggle.tsx`)** — toggles light/dark mode via `next-themes`.
* **Switcher (`components/Switcher.tsx`)** — switches between “aviadar” (number → image) and “desaviadar” (image → number).
* **Converter (`components/Converter.tsx`)** — container that conditionally renders `Numbers` and `Cirtecian` based on the selected mode.
* **Numbers (`components/Numbers.tsx`)** — handles input of numeric value, calls `/converter/to-numerical/:num`, and displays the returned image URL.
* **Cirtecian (`components/Cirtecian.tsx`)** — handles file input, preview, calls `/converter/to-number`, and displays the recognized number or image.

---

## 🎨 Styling

* **Tailwind CSS** via the default Next.js setup.
* Dark/light mode classes (e.g. `dark:bg-shade-black`).
* Buttons from `@heroui/button` and inputs from `@heroui/input`.

---

## ⚙️ Context & State

* `AppContext` provides:

  * `isLoading`: boolean flag for fetch states.
  * `fetchedImage` / `fetchedNumber`: API responses.
  * `setFetchedImage` / `setFetchedNumber`, `resetStates`.

---

## 🔧 Customization

* **API URL** — change `NEXT_PUBLIC_API_URL` in `.env.local`.
* **Loading text** — modify in `Loading` component props.
* **Button labels** — update in `Numbers` and `Cirtecian`.

---

## 🤝 Contribution

Feel free to open issues or pull requests!

---

