# 🌐 Personal Link Hub

A minimal “link in bio” application built with **Next.js** and **TypeScript**, where users can manage and share curated links through a public profile page. Inspired by platforms like Linktree, this project focuses on simplicity, privacy, and customization.

---

## ✨ Features

- ✅ User authentication (NextAuth)
- ✅ Public profile page (`/username`)
- ✅ Link management: create, edit, delete
- ✅ Optional link privacy (public/private toggle)
- ✅ Link ordering (drag-and-drop)
- ✅ Responsive and accessible UI

---

## 📌 Scope Decisions & Trade-offs

### Included:

- Auth (email-based via NextAuth)
- Link CRUD (with privacy flag)
- Dynamic profile routing (`/username`)
- Clean UI using TailwindCSS
- Local DB via Prisma + SQLite

### Not Included:

- Analytics (out of scope for time constraints)
- Advanced theming (basic dark/light support only)
- OAuth login providers (used email to simplify)

These decisions were made to deliver the core experience while keeping development within the 5–8 hour guideline.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, React Hook Form
- **Backend**: Next.js API Routes, Prisma ORM, SQLite
- **Auth**: NextAuth.js
- **Hosting**: Vercel (production link below)

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/personal-link-hub.git
cd personal-link-hub

# 2. Install dependencies
npm install

# 3. Generate DB & run dev server
npm run start:dev
```
