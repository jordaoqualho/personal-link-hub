# 🌐 Personal Link Hub → LinkHub AI

A minimal “link in bio” application built with **Next.js** and **TypeScript**, where users can manage and share curated links through a public profile page.

Although the name includes “AI”, it actually stands for **Almost Intelligent**. The original idea was to use a real AI chatbot to onboard users and help personalize their LinkHub. However, due to time and cost constraints, I decided to implement a lightweight, almost-intelligent assistant that guides the user through creating their profile in a fun and simple way.

🔗 **Live demo**: [personal-link-hub.vercel.app](https://personal-link-hub.vercel.app)

---

## ✨ Features

- ✅ Google login via NextAuth
- ✅ Alternative lightweight auth flow (email/name/username)
- ✅ Public profile page at `/username`
- ✅ Add, edit, delete links with icon preview
- ✅ Optional link visibility (public/private)
- ✅ Responsive design and theme switching
- ✅ Friendly chatbot-like onboarding experience

---

## 📌 Scope Decisions & Trade-offs

- I chose not to set up a database or backend to keep things simple and within the time limit. Instead, I simulated persistence using `localStorage` and cookies.  
  👉 **Trade-off**: Public pages like `/username` aren’t truly persistent or shareable across devices.
- I skipped analytics to avoid backend setup and keep the scope lean.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Auth**: NextAuth.js (with Google OAuth)
- **Hosting**: Vercel

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/personal-link-hub.git
cd personal-link-hub
npm install
npm run start:dev
```
