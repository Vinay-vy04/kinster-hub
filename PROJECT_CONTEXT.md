# Kinster Command Center - Project Context

This document contains the entire finalized architecture and build plan for the Kinster Coffee Studio maintenance tool, as discussed in the initial Antigravity chat.

## Progress So Far
- **Phase 0 Scaffolding Complete**: The project is initialized at `/Users/vinays/Projects/Kinster-Hub` using React, Vite, Tailwind CSS, and `vite-plugin-pwa`.
- **Database Initialized**: Dexie.js (IndexedDB) is configured with `tasks` and `completions` tables for offline data safety.
- **Base UI**: The main `App.jsx` router and the "Today" dashboard (with the Pulse Score) have been scaffolded.

## The Finalized Phase 0 Specification

### 1. The Frontend (PWA)
- **Storage**: IndexedDB (via Dexie.js) with a request for persistent storage.
- **Data Safety**: A 1-tap JSON Export/Import backup feature in the Settings tab to prevent browser data loss.

### 2. The Task Engine (Data Model)
- **`tasks`**: `id`, `title`, `category` (Google, Social, Ops, Web), `frequency`, `impact` (1-3), `deepLink`, `eventTag`.
- **`completions`**: `task_id`, `date` (IST adjusted), `status` (done/skipped).

### 3. Core Features
- **Impact-Weighted Pulse Score**: Completing high-impact tasks moves the needle more.
- **Review QR Generator**: A built-in tool to generate a QR code linking to the Google Review page.
- **Local-Events Calendar**: Static logic triggering tasks on specific dates (IPL match days, pay-week).

### 4. The Reminder System
- A **GitHub Actions Cron Job** triggering a free **Telegram Bot** morning digest: *"Kinster Hub: Today you have 2 high-impact tasks."*

## UI Navigation (The 5 Tabs)
1. **🏠 Today**: Pulse score and tasks due today.
2. **✅ Tasks**: Full task management engine (Daily/Weekly/Monthly) with rollover/snooze.
3. **📣 Marketing**: Static content templates, Review QR generator, Events Calendar.
4. **🔗 Vault**: Deep links to GA4, Meta Suite, Zomato, Swiggy, and GBP.
5. **⚙️ Settings**: JSON Backup/Export, Service Worker update flow.

---
**Agent Instructions:** When continuing this chat in the new project, start by building the remaining 4 tabs (Tasks, Marketing, Vault, Settings) and implementing the Telegram reminder cron.
