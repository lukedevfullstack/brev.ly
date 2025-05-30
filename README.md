# 🏆 brev.ly – URL Shortener Challenge

**Brev.ly** is a full-stack application challenge focused on developing a modern URL shortening service.
The goal is to develop an application that allows users to create, list, and delete shortened links, track link visit counts, export link data in CSV format, and properly redirect shortened URLs to their original destinations.

## 🛠️ Backend – Description & Requirements

You will build a REST API to manage shortened URLs using **PostgreSQL** as the database.

### 🔗 Required Features & Rules

- [x] Users must be able to **create a shortened URL**
  - [x] Invalid formats must be rejected
  - [x] Duplicated short codes must be disallowed
- [x] Users must be able to **delete a shortened URL**
- [x] Users must be able to **retrieve the original URL** via its shortened version
- [x] Users must be able to **list all URLs**
- [x] Access count should be **incremented** every time a shortened URL is visited
- [x] Users must be able to **export all shortened links as a CSV**
  - [x] The CSV must be publicly available via CDN (e.g., AWS S3, Cloudflare R2)
  - [x] The file name must be randomly generated and unique
  - [x] The list must be paginated or fetched performantly
  - [x] The CSV must include: original URL, shortened URL, access count, and creation date

### 🐳 Docker Requirement

You must provide a `Dockerfile` for the backend, following best practices, which can build and serve the application image.

## 💻 Frontend – Description & Requirements

You will develop a SPA (Single Page Application) using **React** and **Vite** that interacts with the backend.

### 🔗 Required Features & Rules

- [x] Users must be able to **create a shortened link**
  - [x] Invalid formats must be rejected
  - [x] Duplicated short codes must be disallowed
- [x] Users must be able to **redirect** to the original URL from a short URL
- [x] Users must be able to **list all shortened links**
- [x] Users must be able to **track access counts**
- [x] Users must be able to **download a CSV report** of all shortened links
- [x] Users must be able to **delete** links

### 🧠 UX & Development Rules

- [x] The application **must be built with React (SPA)** using **Vite** as the bundler
- [x] The UI **must follow the official Figma design** closely
- [x] UX considerations are expected: empty states, loading indicators, action blocking, etc.
- [x] The application **must be responsive**, providing a good experience on both desktop and mobile devices

## 📄 Required Pages

- [x] `/` → Home page with form to shorten links + list of shortened links
- [x] `/:short-url` → Redirection page that fetches the original link and redirects
- [x] `*` → Not found page (shown if URL doesn't exist or is invalid)

