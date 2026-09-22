# 🌌 ＴΞNCHI-DATA

**An ultra-fast, seamless online clipboard and file-sharing platform.**  

Whether you need to paste a quick text snippet or drop a batch of files, **ＴΞNCHI-DATA** generates a short, unique code so you can share it with anyone—instantly. Inspired by minimalist tools like *online-clipboard.online*, but elevated with a modern tech stack and an immersive UI.

🚀 **[Experience the Live App Here](https://tenchi-data.vercel.app)**

---

## 📋 Table of Contents
- [✨ Features]
- [🛠 Tech Stack]
- [📜 License]

---

## ✨ Features

### 🔗 Frictionless Sharing
* **Universal Support:** Share plain text, high-res images, videos, or complex file types in seconds.
* **Batch Uploads:** Drop a single file or a massive batch into a single, unified "clip."
* **Instant Retrieval:** Pull up any clip on any device simply by entering its unique share code.

### ⏳ Ephemeral Storage
* **Custom Expiry:** You control the lifespan. Set clips to self-destruct anywhere from 1 minute to 48 hours.
* **Automated Cleanup:** A scheduled background worker automatically purges expired clips every minute to keep the ecosystem clean and fast.

### 👤 Smart Accounts
* **Flexible Authentication:** Sign up securely via Email/Password or jump right in using **Google OAuth2**.
* **Personalized History:** Logged-in users gain access to a saved ledger of their past clips for easy reference and retrieval.

### 🎨 Immersive UI
* **Dynamic Theming:** Seamless light and dark mode toggling.
* **Stellar Visuals:** Features a stunning, interactive WebGL animated galaxy background with buttery-smooth theme transitions.

---

## 🛠 Tech Stack

### 💻 Frontend
| Role | Technology |
| :--- | :--- |
| **Core** | React 19 + Vite |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Framer Motion (`motion`), `ogl` (WebGL galaxy background) |
| **Hosting** | Vercel |

### ⚙️ Backend
| Role | Technology |
| :--- | :--- |
| **Core** | Java 21 + Spring Boot |
| **Auth** | Spring Security (JWT) + Google OAuth2 |
| **Database** | MySQL + Spring Data JPA |
| **Storage** | Local Filesystem (Paths referenced in the database) |
| **Cron Jobs** | Scheduled Spring tasks for per-minute expiry cleanup |
| **Ops** | Dockerized for seamless, reliable deployment |
