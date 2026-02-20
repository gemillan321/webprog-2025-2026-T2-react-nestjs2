# webprog-2025-2026-T2-react-nestjs2


# 🚀 CTF Writeup Vault

**Your cyberpunk-themed CTF writeup archive** – add, view, and manage all your captured flags in a hacker-style interface.

---

## 🛠 Tech Stack

| Layer       | Technology                                       |
| ----------- | ------------------------------------------------ |
| ⚛️ Frontend | React 18 + Vite                                  |
| 🗄 Backend  | NestJS (TypeScript)                              |
| 💾 Database | Supabase (PostgreSQL)                            |
| 🎨 Styling  | CSS3 + Google Fonts (Orbitron & Source Code Pro) |
| 🌐 Hosting  | Vercel                                           |
| 🖼 Icons    | FontAwesome / Flaticon / custom favicon          |

---

## 📁 Folder Structure

```text
my-profile/
├─ backend/
│  ├─ src/
│  │  ├─ guestbook.controller.ts
│  │  ├─ guestbook.service.ts
│  │  └─ ...other NestJS files
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ App.jsx       # main component
│  │  ├─ index.css     # cyberpunk styling
│  │  └─ assets/       # images & icons
│  ├─ public/
│  │  ├─ favicon.ico
│  │  └─ background.jpg
│  └─ package.json
└─ package.json
```

---

## 📝 Features

* ✨ Add, view, edit, delete CTF writeups
* 💻 Fake terminal panel for hacker vibes
* 🌌 Neon glow & cyberpunk theme
* 📦 Responsive grid layout
* 🔒 Optional Supabase auth support

---

## ⚡ Supabase Table (`guestbook`)

| Column     | Type      |
| ---------- | --------- |
| id         | bigint    |
| name       | text      |
| message    | text      |
| created_at | timestamp |

---

## ⚡ Quick Start

### Backend

```bash
cd my-profile/backend
npm install
# create .env with SUPABASE_URL and SUPABASE_KEY
npm run start:dev
```

### Frontend

```bash
cd my-profile/frontend
npm install
# create .env with VITE_SUPABASE_URL and VITE_SUPABASE_KEY
npm run dev
```

* Open in browser: `http://localhost:5173`

---




