# Campus Voice — College Complaint Management System

> *Your Voice. Your Campus. Your Change.*

Students file and track campus complaints (with photo/PDF evidence); admins review, update status, and resolve — all in a bubble-poster UI, persisted to Postgres.

Live pages (hash routes off `/`): landing, `#file-complaint`, `#signin`, `#student-dashboard`, `#admin-dashboard`.

## Run it

```powershell
python run.py            # -> http://localhost:3100
# or: $env:PORT=3100; node backend/server.js
```

Needs `.env` (never committed — see `.env.example`):
`PORT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, JWT_SECRET`.

```powershell
node backend/server.js --seed-admin admin@college.edu YourPassword
```

## Stack & layout

- **Backend** `backend/server.js` — Node + Express 4, `pg`, `bcrypt`, JWT in HttpOnly cookie (7d), `multer` disk uploads (`backend/uploads/`, JPG/PNG/PDF ≤5MB ×5). SSL on automatically for non-local DB hosts.
- **Frontend** — React 18 + Vite + Tailwind (bubble-poster template, MIT). Source: `template-src/` (5 routed demos + shared shell). Served prebuilt from `frontend/` (committed build output).
- **Database** — PostgreSQL (Aiven). Schema: `database/campus_voice.sql` (rerunnable `IF NOT EXISTS`). Tables: `students, admins, complaints, complaint_images, notifications`.

### API (all live routes)

| Method | Route | Auth | Notes |
|---|---|---|---|
| POST | `/api/auth/signup` | public | email + password≥8 + full_name + student_id |
| POST | `/api/auth/login` | public | `{email,password,admin?}` → `{token,role}` + cookie |
| POST | `/api/auth/logout` | — | clears cookie |
| GET | `/api/auth/profile` | student | own profile |
| POST | `/api/complaints` | student | multipart + `files[5]` → `{complaint_id}` (`CVYYYYNNNN`) |
| GET | `/api/complaints` | student | own complaints |
| GET | `/api/complaints/:id` | login | full detail + images; anonymous masked for admin |
| DELETE | `/api/complaints/:id` | student | own + `Pending` only |
| GET | `/api/admin/complaints` | admin | all + masked names |
| PUT | `/api/admin/status/:id` | admin | `{status,remark?}` |
| GET | `/api/admin/stats` | admin | totals by status/priority/anonymity |
| GET | `/api/stats` | student | own totals |
| GET | `/api/public/stats` | public | `{filed, completed}` landing counters |

## Rebuild the frontend

```powershell
cd template-src; npm ci; npm run build; cd ..
Get-ChildItem frontend | Remove-Item -Recurse -Force
Copy-Item 'template-src/dist/*' frontend -Recurse
# then re-add the ?dark + #astro-association-template loader snippet in frontend/index.html
```

## Deploy (Vercel)

`vercel.json` rewrites `/api/*` + `/uploads/*` → serverless `api/index.js`, static from `frontend/`. Set the six `.env` vars in project settings, then `vercel --prod`.
`ponytail:` uploads use ephemeral `/tmp` on Vercel, so evidence files vanish between deploys — plug in real storage (S3/Blob) when evidence must persist.
