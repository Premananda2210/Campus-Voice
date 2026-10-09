# Campus Voice — Base Backend Architecture (Proposal)

> Goal: keep the current Express + PostgreSQL stack, but move from single-file `backend/server.js` to a testable layered base. No framework switch, no frontend rewrite. Incremental migration.

## 1. Target Layout

```
backend/
├── src/
│   ├── app.js                 # express app assembly (middleware + routes + error handler), no listen()
│   ├── server.js              # only: dotenv, db check, app.listen(), --seed-admin CLI
│   ├── config/
│   │   ├── env.js             # validated env (PORT, DB_*, JWT_SECRET) — fail fast if missing
│   │   └── db.js              # pg Pool singleton + query() helper (native $n, no ? hack)
│   ├── middlewares/
│   │   ├── auth.js            # requireAuth(role?) — cookie + Bearer, attaches req.user {id, role}
│   │   ├── validate.js        # zod/express-validator wrapper → 400 {error}
│   │   ├── upload.js          # multer config (JPG/PNG/PDF, 5×5MB) + fileFilter
│   │   ├── errorHandler.js    # final (err,req,res,next) → 500 JSON + console/pino log
│   │   └── asyncHandler.js    # J() replacement: fn => (req,res,next) => fn(...).catch(next)
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.js      # POST signup/login/logout, GET/PUT profile
│   │   │   ├── auth.service.js     # hash, compare, sign, profile logic
│   │   │   ├── auth.validators.js  # signup/login/profile schemas
│   │   │   └── auth.repo.js        # students/admins queries
│   │   ├── complaints/
│   │   │   ├── complaints.routes.js
│   │   │   ├── complaints.service.js  # CV-id gen, notify rules, ownership checks
│   │   │   ├── complaints.validators.js
│   │   │   └── complaints.repo.js     # complaints + complaint_images queries
│   │   ├── admin/
│   │   │   ├── admin.routes.js        # complaints list, status, stats, users, reports
│   │   │   ├── admin.service.js
│   │   │   └── admin.repo.js
│   │   └── notifications/
│   │       ├── notifications.routes.js
│   │       ├── notifications.service.js
│   │       └── notifications.repo.js
│   └── utils/
│       ├── jwt.js             # sign/verify
│       ├── ids.js             # makeComplaintId(year, pk)
│       └── http.js            # ApiError class {status, message}
├── uploads/                   # (later: move to S3-compatible storage; keep local for dev)
└── tests/                     # supertest: auth.test.js, complaints.test.js
```

Migration path: extract one module at a time from current `server.js` (auth → complaints → admin → notifications), keeping route paths identical so frontend needs zero changes.

## 2. Request Flow

```
Client (cookie `token` / Bearer)
  → cors, json, cookie, static
  → routes (validators → auth → upload)
  → controller (req/res only, no SQL)
  → service (business rules: ownership, anonymous masking, CV-id, notify-on-high-priority)
  → repo (SQL only, parameterized $1..$n)
  → PostgreSQL
  → service → controller → JSON
  → errorHandler on throw
```

Example: `POST /api/complaints`
`auth('student') → upload.array('files',5) → validate(title, description) → complaints.service.create(userId, body, files) → repo.insert + CV-id update + images insert + notifications.service.notify(...) → {complaint_id}`.

## 3. API Contract (keep stable, v1 prefix later)

Keep all current paths. Additions for base completeness:

- `GET /health` → `{ok:true}` (for deploys/CI)
- Paginate lists: `GET /api/admin/complaints?page=&limit=&status=&category=` → `{data, page, total}` (backward-compat: default returns array if no query — or version as `/api/v1/...`)
- Central error shape: `{error: "message"}` always; validation: `{error, details[]}`.

Auth: keep JWT HttpOnly `SameSite=Lax` 7d cookie. Base hardening (cheap, high-value): `helmet`, `express-rate-limit` on `/api/auth/*`, `cors({origin: frontendUrl, credentials:true})` instead of open, re-check `disabled` inside `auth()` (one lightweight query or cache), refresh-token rotation as follow-up.

## 4. Data & Config

- `config/db.js`: single `Pool`, export `query(text, params)`; repos use native `$1` placeholders — drop the `? → $n` replacer.
- `config/env.js`: required `DB_HOST, DB_USER, DB_PASS, DB_NAME, JWT_SECRET`; fail-fast with clear message; `PORT` default 3000.
- Migrations: add `database/migrations/001_init.sql` (copy of current schema) + `npm run migrate` via `node-pg-migrate` or plain `psql` runner; keep `campus_voice.sql` as baseline. Seed: `npm run seed:admin -- email pass` (move CLI out of request path).
- Uploads: keep `multer` disk for dev; service deletes files on complaint/user delete (fix current orphan-file leak); interface `storage.save(file) → path` so S3 can replace it later.

## 5. Minimal Dependencies to Add

```
helmet, express-rate-limit, zod (or keep express-validator), pino (or morgan), supertest+vitest (dev)
```

No ORM yet — raw `pg` + repo layer is enough for this size; adopt Prisma/Drizzle only if models grow past ~10 tables.

## 6. Definition of Done (base)

1. `src/app.js` + `src/server.js` split; all routes moved to `modules/*/*.routes.js` with identical paths.
2. No SQL outside `*.repo.js`; no `req/res` inside services.
3. `GET /health`, centralized error handler, env validation, helmet + rate-limit + locked CORS.
4. `npm test` passes (auth + one complaint happy-path), `npm run migrate` works on fresh DB.
5. Frontend works unchanged against new backend.

## 7. What NOT to build yet

Microservices, Redis/queues, real-time sockets, full RBAC beyond student/admin, S3, Docker/K8s prod setup — defer until complaint volume or multi-instance deploys demand it. Current monolith + layered modules handles a single-college workload.
