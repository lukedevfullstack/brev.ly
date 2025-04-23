# 💻 Brev.ly Web – Frontend SPA

This is the frontend interface for the **Brev.ly** URL shortener challenge.

It is a single-page application built with **React**, **TypeScript**, and **TailwindCSS**, designed to communicate with the backend API and deliver a smooth, responsive user experience.

---

## ⚙️ Tech Stack

- **[React](https://react.dev)** – declarative UI library  
- **[TypeScript](https://www.typescriptlang.org)** – static typing for JavaScript  
- **[TailwindCSS](https://tailwindcss.com)** – utility-first CSS framework  
- **[React Router](https://reactrouter.com)** – client-side routing for React  
- **[Vite](https://vitejs.dev)** – fast development bundler  

---

## 🚀 Getting Started

Follow the steps below to run the frontend locally:

### 1. 📦 Install dependencies

```bash
npm install
```

### 2. 🧪 Start the development server

```bash
npm run dev
```

### 3. 🌐 Access the app

The app should now be running and accessible at:

```bash
http://localhost:5173
```

You can update the port or proxy config in `vite.config.ts` as needed.

---

## 📂 Available Scripts

This project provides the following common scripts:

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the app for production         |
| `npm run preview` | Preview the built app locally        |
| `npm run lint`    | Run the linter (if configured)       |

---

## 📄 Environment Variables

Create a `.env` file in the `web/` directory. Example:

```env
VITE_API_URL=http://localhost:3333
```

This variable allows the frontend to communicate with the backend API.  
You can add additional public environment variables prefixed with `VITE_` as needed.

---

## 🎨 Figma Design

You can view the official design layout here:  
[🔗 Figma File – URL Shortener](https://www.figma.com/community/file/1477335071553579816/encurtador-de-links)