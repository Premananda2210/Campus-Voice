# Campus Voice — College Complaint Management System

> *Your Voice. Your Campus. Your Change.*

Campus Voice is a full-stack web app for college students to file, track, and manage campus complaints, and for admins to review, update status, manage users, and view analytics/reports.

## 1. Project Summary

**What it does:**
- Students sign up / log in, file complaints (with category, priority, location, date, anonymous option, up to 5 evidence files: JPG/PNG/PDF, 5MB each), track status (`Pending → In Review → Resolved / Rejected`), view details, delete pending complaints, edit profile, receive notifications.
- Admins log in separately, view all complaints dashboard with stats, search/filter, update status + remark, review single complaint with evidence, manage students (disable/delete), view reports/analytics (by category, department, priority, status, monthly), receive high-priority alerts.

**Current state:**
- Frontend: 13 static HTML pages + `css/style.css` (glassmorphism + light/dark theme) + `js/theme.js` (theme, blobs, `api()`, `toast()`, `count()`) + `js/auth.js` (signup/login).
- Backend: single-file Express server `backend/server.js` (~97 lines). Serves frontend statically + JSON APIs. JWT in HttpOnly cookie (`token`, 7-day expiry) + `Authorization: Bearer` fallback. `bcrypt` password hashing. `multer` disk uploads to `backend/uploads/`, served at `/uploads`. `pg` Pool with `? → $n` adapter to mimic mysql2.
- Database: PostgreSQL, schema in `database/campus_voice.sql`. 5 tables: `students`, `admins`, `complaints`, `complaint_images`, `notifications`.
- No build step, no framework, no tests, no validation layer beyond `express-validator` on 2 routes, no migrations, no layered structure.

**Stack:** Node.js + Express 4 + PostgreSQL (`pg`) + `bcrypt`, `jsonwebtoken`, `cookie-parser`, `cors`, `multer`, `dotenv`, `express-validator`. Vanilla HTML/CSS/JS frontend.

### Project Structure (actual)

```
Campus-Voice/
├── backend/
│   ├── server.js          # all routes, auth, upload, DB — monolith
│   └── uploads/           # runtime evidence files (empty in repo)
├── database/
│   └── campus_voice.sql   # CREATE TABLEs + indexes
├── frontend/
│   ├── index.html, login.html, signup.html, admin-login.html
│   ├── student-dashboard.html, admin-dashboard.html
│   ├── complaint.html, my-complaints.html, complaint-details.html
│   ├── review-complaint.html, profile.html, users.html, reports.html
│   ├── css/style.css
│   └── js/theme.js, js/auth.js
├── .env.example
├── package.json           # start: node backend/server.js
└── README.md
```

### Database Schema

- `students(id, student_id UNIQUE, full_name, department, semester, email UNIQUE, phone, password_hash, profile_image, disabled, created_at)`
- `admins(id, email UNIQUE, password_hash, role, created_at)`
- `complaints(id, complaint_id UNIQUE e.g. CV20260001, student_id FK CASCADE, title, description, category, priority Low/Medium/High/Urgent, location, incident_date, anonymous 0/1, status Pending/In Review/Resolved/Rejected, admin_remark, created_at, updated_at)` + indexes on `status, category, student_id`
- `complaint_images(id, complaint_id FK CASCADE, image_path)`
- `notifications(id, student_id FK NULLABLE, for_admin 0/1, complaint_id, message, read_status, created_at)`

Complaint ID is generated post-insert: `CV + YEAR + zero-padded pk (4 digits)`.

### API Reference (actual)

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | public | Create student. Validates email, password ≥8, full_name, student_id |
| POST | `/api/auth/login` | public | `{email,password,admin?}` → `{token,role}` + HttpOnly cookie |
| POST | `/api/auth/logout` | — | Clear cookie |
| GET | `/api/auth/profile` | student | Own profile |
| PUT | `/api/auth/profile` | student | Update full_name, department, semester, phone |
| POST | `/api/complaints` | student | Multipart `files[5]` + fields. Returns `{complaint_id}`. Creates notifications; High/Urgent also creates admin notification |
| GET | `/api/complaints` | student | Own complaints DESC |
| GET | `/api/complaints/:id` | any logged in | Detail by `CV...` id + images. Students only own; admins see `Anonymous` masked |
| DELETE | `/api/complaints/:id` | student | Only if own + `Pending` |
| GET | `/api/admin/complaints` | admin | All complaints + student_name (masked if anonymous) |
| PUT | `/api/admin/status/:id` | admin | `{status,remark}` + notify student |
| GET | `/api/admin/stats` | admin | total, pending, review, resolved, high, anon counts |
| GET | `/api/admin/users` | admin | Students + complaint count |
| PUT | `/api/admin/users/:id` | admin | `{disabled}` toggle |
| DELETE | `/api/admin/users/:id` | admin | Delete student (cascades complaints) |
| GET | `/api/stats` | student | Own total/pending/review/resolved |
| GET | `/api/notifications` | any | Last 30 (admin: `for_admin=1`, student: own) |
| PUT | `/api/notifications/read` | any | Mark all read |
| GET | `/api/admin/reports` | admin | Grouped `{category, department, priority, status, monthly}` |

## 2. Quickstart

```bash
# 1. DB
createdb -U postgres campus_voice
psql -U postgres -d campus_voice -f database/campus_voice.sql

# 2. Env
cp .env.example .env
# fill DB_PASS + JWT_SECRET

# 3. Install + seed admin + run
npm install
node backend/server.js --seed-admin admin@college.edu YourStrongPassword
npm start
# -> http://localhost:3000
```

`.env` keys: `PORT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, JWT_SECRET`.

## 3. Auth & Core Flows

- Signup hashes with `bcrypt(10)`, duplicate `student_id/email` → 409.
- Login checks `disabled` flag, `bcrypt.compare`, signs JWT `{id,role}` 7d, sets `token` HttpOnly `SameSite=Lax` cookie.
- Middleware `auth(role?)`: reads cookie or `Bearer`, verifies, optionally enforces role → 401/403.
- File complaint: `auth('student')` → `multer` (JPG/PNG/PDF, 5×5MB) → validate title/description → INSERT → generate `CV...` → save image rows → notifications.
- Admin status change writes `status, admin_remark, updated_at=NOW()` + student notification.
- Anonymous: stored `student_id` intact, but admin list/detail masks `full_name='Anonymous'`.

## 4. Known Limitations (why a re-architecture is needed)

1. **Single-file monolith** (`server.js`): routes, DB, auth, upload, business logic all mixed — hard to test/extend.
2. **SQL + validation gaps:** `SELECT * FROM ${tbl}` string interpolation (controlled but fragile), no validation on most PUT/POST bodies, no centralized error handler (only `J()` wrapper), `? → $n` hack instead of native `$n`.
3. **Security gaps:** no rate-limit, no helmet, CORS fully open, no refresh-token rotation, `disabled` check only at login (not per-request), no file-content verification, uploads on local disk (no cleanup on complaint delete beyond DB cascade — orphan files remain).
4. **No pagination/filtering** on list endpoints; reports do full table scans; `DELETE user` is hard-delete.
5. **No tests, lint, migrations, logging, or API docs.**

See `docs/ARCHITECTURE.md` for the proposed base backend architecture to fix this incrementally.

## 5. Roadmap

> **2026-10-08: `frontend/` was replaced** with the production build of the
> Astro Association bubble-poster template (React 18 + Vite + Tailwind,
> MIT-licensed, source: `github.com/Kedhareswer/21stdev-my-components`,
> demo chunk `astro-association-template`). The previous vanilla Campus Voice
> UI is backed up at `backup-frontend-*.zip`. Source for rebuilds lives in
> `template-src/` (`npm ci && npm run build`, then copy `dist/*` to
> `frontend/` and re-add the `?dark` + `#astro-association-template`
> default-loader snippet in `index.html`). Root `/` now opens the template
> in dark mode. Backend APIs + DB are untouched but currently have no UI.

- [ ] Layered backend (`src/`): routes → controllers → services → repositories + middlewares + utils (see architecture doc)
- [ ] Postgres migrations, seed script, pagination, helmet/rate-limit, zod validation
- [ ] Object storage for uploads, background jobs for notifications, audit log
- [ ] Tests (vitest/supertest), ESLint/Prettier, CI, Dockerfile, OpenAPI docs
