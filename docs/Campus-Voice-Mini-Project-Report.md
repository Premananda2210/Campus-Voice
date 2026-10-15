# Mini Project Report

## Campus Voice – College Complaint Management System

> Replace the bracketed items below with your details before submitting.

**Under the Department of Computer Science**

**By**

**Premananda Sahu**

**12053**

**Under the Guidance of**

**Mrs. Manisha Matekar**

**Tilak College of Science and Commerce, Vashi, Navi Mumbai**

**Academic Year 2026-27**

---

# ACKNOWLEDGEMENT

I express my sincere gratitude to my project guide, **Mrs. Manisha Matekar**, for [his/her] valuable guidance, constructive suggestions, and encouragement throughout the development of my mini project, "Campus Voice – College Complaint Management System." [His/Her] support and feedback helped me improve the project and develop a working full-stack web application.

I am grateful to the Department of Computer Science of **Tilak College of Science and Commerce, Vashi, Navi Mumbai** for providing me with the opportunity to apply the concepts learned during my academic studies. This project gave me practical exposure to Node.js and Express backend development, PostgreSQL database design, REST API development, React frontend development, JWT-based authentication, file upload handling, and cloud deployment using Vercel and Aiven.

I would also like to acknowledge the authors and maintainers of the documentation, development tools, and libraries used in this project. Working on this project independently enhanced my technical knowledge, problem-solving abilities, and understanding of software development.

---

# Declaration

I, **Premananda Sahu**, a student of **[Class/Year, Roll No: 12053]**, hereby declare that the mini project titled **"Campus Voice – College Complaint Management System"** submitted by me is a record of original work carried out under the guidance of **Mrs. Manisha Matekar**. This work has not been submitted, either in part or in full, for any other purpose in this or any other institution.

Place: Vashi, Navi Mumbai
Date: [DD/MM/YYYY]

**Premananda Sahu**

---

# Certificate

This is to certify that the mini project titled **"Campus Voice – College Complaint Management System"** is a bonafide record of work carried out by **Premananda Sahu (Roll No: 12053)** under my guidance during the academic year **2026-27**.

**Mrs. Manisha Matekar**
Project Guide

**Mrs. Sherly Roy**
Project Coordinator

**[Head of Department Name]**
Head, Department of Computer Science

**Dr. Ravindran Karathadi**
Principal

Place: Vashi, Navi Mumbai
Date: [DD/MM/YYYY]

---

# ABSTRACT

Campus Voice is a web-based complaint management system designed for colleges, giving students a direct channel to report campus issues — broken infrastructure, water and electricity problems, Wi-Fi outages, hostel and canteen complaints — and track them to resolution. Administrators get a dedicated console with live statistics, a searchable complaint register, status management, and full complaint dossiers including photographic evidence.

The backend is built with Node.js and Express, exposing a REST API with JWT cookie authentication (separate student and admin roles), bcrypt password hashing, and evidence uploads stored with the complaint record. Data is persisted in PostgreSQL (hosted on Aiven). The frontend is built with React, Vite, and Tailwind CSS in a dark poster-style theme, with hash-routed pages for the landing site, complaint filing with camera and file upload, student sign-in, and student and admin dashboards. The system is deployed on Vercel with the code hosted on GitHub.

The main objective of Campus Voice is to replace slow, paper-based complaint registers with a transparent loop: file → track → review → resolve, where every complaint carries an auto-generated issue ID (e.g. CV20260007) and both sides can see exactly where it stands.

---

# TABLE OF CONTENTS

| Sr. No. | Chapter / Section | Description |
|---|---|---|
| 1 | Chapter 1: Problem Identification and Project Proposal | Introduction, overview, problem statement, objectives, scope, existing vs proposed system |
| 2 | 1.1 Introduction | Background of the project |
| 3 | 1.2 Project Overview | What the system does and its features |
| 4 | 1.3 Problem Statement | Problems identified on campus |
| 5 | 1.4 Objectives | Goals of the project |
| 6 | 1.5 Scope and Limitations | Coverage and constraints |
| 7 | 1.6 Existing System | Paper register / informal channels |
| 8 | 1.7 Proposed System | Campus Voice feature walkthrough |
| 9 | 1.8 Advantages of Proposed System | Benefits |
| 10 | 1.9 Project Proposal / Justification | Why this project |
| 11 | Chapter 2: System Design | SRS, architecture, modules, diagrams, DB design |
| 12 | 2.1 Software Requirements Specification (SRS) | Functional requirements, workflow, stack |
| 13 | 2.2 Non-Functional Requirements | Usability, performance, security, etc. |
| 14 | 2.3 Hardware and Software Requirements | Minimum setup |
| 15 | 2.4 System Architecture | Layers and request flow |
| 16 | 2.5 System Modules | Auth, complaints, dashboards, landing |
| 17 | 2.6 Use Case Diagram | Actors and use cases |
| 18 | 2.7 Data Flow Diagram (DFD) | Level 0 and Level 1 |
| 19 | 2.8 Class Diagram | Entities and relations |
| 20 | 2.9 Activity Diagram | File-to-resolve flow |
| 21 | 2.10 Sequence Diagram | Login and filing sequences |
| 22 | 2.11 Entity Relationship Diagram | ER diagram |
| 23 | 2.12 Database Design | Actual tables |
| 24 | 2.13 Gantt Chart | Timeline |
| 25 | Chapter 3: Development Progress and Implementation | Env, stack, frontend, backend, DB, security, deployment |
| 26 | Chapter 4: System Testing and Validation | Methodology, test cases, results |
| 27 | Chapter 5: User Interface and Application Screens | Page-by-page screens |
| 28 | Chapter 6: Conclusion and Future Scope | Outcome and extensions |
| 29 | Chapter 7: References | Docs and libraries |

---

# Chapter 1: Problem Identification and Project Proposal

## 1.1 Introduction

In every college, things break: taps run dry, tube lights fail, Wi-Fi drops during submissions, hostel rooms need repair. Reporting these issues usually means finding the right person, writing in a paper register, or sending messages into informal groups — where complaints are easily lost, duplicated, or forgotten, and the complainant never learns what happened next.

Campus Voice – College Complaint Management System is a web application that fixes this loop. Students file complaints with a title, category, priority, description, and photographic evidence; each complaint receives a permanent issue ID and a trackable status (`Pending → In Review → Resolved / Rejected`). Administrators work from a live console with statistics, search, status updates, and full complaint dossiers. An optional anonymous mode protects students reporting sensitive issues.

The system is a full-stack JavaScript application: a Node.js + Express REST API backed by PostgreSQL, with a React + Vite + Tailwind CSS frontend, deployed on Vercel with a managed Aiven database.

## 1.2 Project Overview

Campus Voice provides the following major features:

1. **Student registration and login** — secure accounts with hashed passwords and cookie sessions.
2. **Admin login** — a separate role with its own console and powers.
3. **File a complaint** — title, category (22 options), priority, description, anonymous toggle, photo/PDF evidence via upload button or live camera capture.
4. **Complaint tracking** — each complaint gets an ID like `CV20260007`; students see status changes and admin remarks.
5. **Withdraw** — students can withdraw their own pending complaints.
6. **Admin dashboard** — live counters (total, pending, in review, resolved, high priority, anonymous), searchable register, one-click status changes.
7. **Complaint dossier view** — full detail with evidence thumbnails, available to the owner and to admins (identity masked for anonymous filings).
8. **Public landing counters** — total complaints filed and resolved, read live from the database.
9. **Member card** — a printable-style student card on the landing page, auto-filled from the signed-in account.

## 1.3 Problem Statement

The present complaint-handling practice on most campuses suffers from:

1. **Lost complaints** — paper registers and chat messages have no tracking; issues vanish without action.
2. **No feedback loop** — complainants never learn whether anyone saw or solved their issue.
3. **No evidence** — verbal reports ("the tap is leaking somewhere") lack photos, location, and specifics.
4. **No accountability data** — there are no counts of pending vs resolved issues, so nothing improves systematically.
5. **Fear of reporting** — sensitive complaints (harassment, ragging) need anonymity, which informal channels cannot guarantee.
6. **Scattered responsibility** — without a single register, the same issue gets reported many times or not at all.

Campus Voice addresses these with one register, permanent IDs, evidence attachments, status transparency, anonymous filing, and admin analytics.

## 1.4 Objectives

1. To provide student registration and secure login with role separation (student/admin).
2. To let students file structured complaints with category, priority, description, and evidence.
3. To assign every complaint a permanent, trackable issue ID.
4. To let students track status and read admin remarks, and withdraw pending complaints.
5. To give admins live statistics, search, status management, and full evidence dossiers.
6. To support anonymous filing with identity masking on the admin side.
7. To publish live filed/resolved counters on the public landing page.
8. To deploy the system publicly (Vercel + managed Postgres) so it works beyond localhost.

## 1.5 Scope and Limitations

**Scope:** student auth, complaint lifecycle, evidence upload (JPG/PNG/PDF, up to 5 files), admin console, public counters, cloud deployment.

**Limitations:**

1. Internet is required — authentication, API, and database are all online.
2. Evidence photos are stored as data inside the database (works everywhere, but large-scale use needs object storage like S3).
3. No email/SMS notifications — status is discovered by revisiting the dashboard.
4. Single-college design — no multi-institution support.
5. Password recovery is manual (no reset flow).

## 1.6 Existing System

The existing system is the paper complaint register kept at the college office (or informal WhatsApp groups): a student writes the issue in a book; staff act on it when noticed. There is no ID, no status, no evidence, no anonymity, no statistics, and no way for the student to follow up except asking in person.

## 1.7 Proposed System

Campus Voice replaces the book with a web register:

1. A student signs up once, logs in, and files a complaint in under a minute — optionally with photos taken on the spot.
2. The system issues an ID (`CV20260007`) and shows it in the student's dashboard as `Pending`.
3. An admin sees it instantly in the console (urgent items stand out via the High Priority counter), opens the full dossier with evidence, and moves it to `In Review` and then `Resolved`, optionally leaving a remark.
4. Counters on the landing page and both dashboards update live from the same database.
5. Sensitive complaints can be filed anonymously — admins see the content but never the name.

## 1.8 Advantages of Proposed System

1. Nothing gets lost — every complaint is a database row with an ID.
2. Full transparency — status and remarks visible to the complainant.
3. Evidence-backed — photos/PDFs travel with the complaint.
4. Anonymous reporting protects sensitive complainants.
5. Data-driven — pending/resolved/high-priority counts guide action.
6. Works from any device with a browser; camera capture on phones.
7. Cloud-hosted — no college server room needed.

## 1.9 Project Proposal / Justification

The project is justified because it converts an unreliable manual process into a fast, transparent, measurable digital loop using standard, free-tier-friendly web technology (Node.js, PostgreSQL, React, Vercel, Aiven). It is small enough for one student to build and operate, yet complete enough for real daily use by a college.

---

# Chapter 2: System Design

## 2.1 Software Requirements Specification (SRS)

**Purpose:** define what Campus Voice must do: register users, authenticate two roles, accept structured complaints with evidence, track lifecycle states, expose admin analytics, and publish public counters.

**Functional requirements:**

1. Student registration (name, student ID, department, semester, email, password ≥ 8) with duplicate rejection.
2. Student and admin login issuing a 7-day JWT cookie; role recorded in the token.
3. Complaint filing (title, description required; category, priority, anonymous flag, up to 5 evidence files).
4. Auto-generated complaint IDs (`CV` + year + zero-padded key).
5. Student complaint list, full detail view, withdraw of own pending complaints.
6. Admin register (all complaints, anonymized names where applicable), status transitions, admin remarks.
7. Live counters: per-student, per-admin, and public (filed/resolved).
8. Evidence storage and retrieval alongside each complaint.

**Workflow:** sign up → log in → file (optional evidence) → ID issued → admin reviews evidence → status moves → student sees result; withdraw any time while pending.

**Technology:** Node.js 24 + Express 4, `pg`, `bcrypt`, `jsonwebtoken`, `multer`, `cookie-parser`, `express-validator`, `dotenv`; React 18 + Vite + Tailwind CSS 4; PostgreSQL 18 (Aiven); Vercel serverless + static hosting; GitHub for source control.

## 2.2 Non-Functional Requirements

1. **Usability** — dark poster-style UI, mono kickers, pill buttons; three-click path from login to filed complaint.
2. **Performance** — indexed lookups by status/category/student; pageless small-college datasets respond instantly; serverless cold starts only affect the first request.
3. **Security** — bcrypt(10) hashes, HttpOnly `SameSite=Lax` cookies, role middleware (401/403), JPG/PNG/PDF-only uploads ≤ 5 MB, SSL to the database, secrets in env (never committed).
4. **Reliability** — central async error wrapper returns safe 500s; validation errors return the first failing message; failed image inserts are impossible by construction (single-row design below keeps filing atomic per file).
5. **Compatibility** — any modern browser; camera capture requires localhost or HTTPS.
6. **Scalability** — stateless API + managed Postgres scale to college size; evidence-in-DB is the known ceiling (see 1.5).
7. **Maintainability** — ~100-line single-file API, five routed frontend demos plus one shared shell; prop-driven template customization.
8. **Availability** — Vercel + Aiven managed uptime; localhost run needs only Node and env.
9. **Data integrity** — foreign keys with cascading deletes, unique complaint IDs and emails, parameterized queries throughout.
10. **Accessibility** — prefers-reduced-motion disables animation; form labels, aria states, and keyboard-operable controls.

## 2.3 Hardware and Software Requirements

**Hardware:** any 64-bit laptop/desktop (4 GB+ RAM), 500 MB free (Node modules + build tools), internet connection, optional phone camera for evidence capture.

**Software:** Windows/Linux/macOS; Node.js 20+; modern browser (Chrome/Edge/Firefox); PostgreSQL 14+ (or the provided Aiven instance); Git; VS Code (used); Vercel CLI (for deployment).

## 2.4 System Architecture

Three tiers, one request path:

```
Browser (React SPA, hash routes)
  →  Express API (auth → validate → service → pg)      [local: node server.js | cloud: Vercel serverless api/index.js]
  →  PostgreSQL (Aiven, SSL)
```

- Auth rides an HttpOnly cookie (or `Authorization: Bearer` fallback); middleware attaches `{id, role}`.
- Multipart evidence is converted to data URLs and stored in `complaint_images.image_path`, so rendering is identical on localhost and serverless.
- The landing page reads only the public counters endpoint — no session needed.

## 2.5 System Modules

1. **Auth module** — signup/login/logout, role routing to the correct dashboard.
2. **Filing module** — validated form, upload button + live camera, anonymous toggle, filing confirmation with ID.
3. **Student dashboard** — stats, bubble-band complaint cards, expandable full view, withdraw.
4. **Admin dashboard** — six live stats, searchable register, status setter, expandable evidence dossier.
5. **Landing module** — hero, live mission counters, member card (login-gated, session-prefilled), footer.
6. **Public stats API** — unauthenticated filed/resolved counts.

## 2.6 Use Case Diagram

Actors: **Student**, **Admin**.

- Student: Sign up, Log in/out, File complaint (+evidence), View my complaints, View complaint detail, Withdraw pending complaint.
- Admin: Log in/out, View all complaints, View full dossier + evidence, Change status + remark.
- Both: view public landing counters.

> [Insert use-case diagram: two actors, ovals per use above, system boundary "Campus Voice".]

## 2.7 Data Flow Diagram (DFD)

**Level 0 (context):** Student and Admin exchange data with the single process "Campus Voice System", which reads/writes the "Complaint Database"; the database also answers the public landing page.

**Level 1:** 1.0 Authenticate (credentials ↔ session cookie) → 2.0 File complaint (form + files → complaint row + image rows) → 3.0 Track (ID query → status/remarks) → 4.0 Review (register query → status update) → 5.0 Count (aggregate queries → dashboards/landing).

> [Insert Level 0 and Level 1 DFD drawings.]

## 2.8 Class Diagram

Entities: `Student(id, studentId, fullName, department, semester, email, phone, passwordHash, disabled)` —files→ `Complaint(*) <1—* ComplaintImage`; `Admin` —reviews→ `Complaint`; `Complaint(status, priority, anonymous, adminRemark, timestamps)`; `ComplaintImage(image_path)`.

> [Insert class diagram with the above classes, attributes, and multiplicities.]

## 2.9 Activity Diagram

Start → (logged in?) —no→ Sign in → File complaint (fill → attach → submit) → ID issued → Admin opens dossier → status In Review → Resolved (+remark) → student reads result. Branch: student withdraws while Pending → end. Branch: anonymous → name masked on admin side.

> [Insert activity diagram with swimlanes Student / System / Admin.]

## 2.10 Sequence Diagram

**Login:** Browser → `POST /api/auth/login` → bcrypt compare → JWT cookie → redirect by role.
**Filing:** Browser → `POST /api/complaints` (multipart) → validate → INSERT complaint → generate ID → INSERT images → `{complaint_id}` → dashboard reload → `GET /api/complaints`.
**Review:** Admin → `GET /api/admin/complaints` → expand → `GET /api/complaints/:id` → `PUT /api/admin/status/:id` → list refresh.

> [Insert sequence diagrams for the three flows.]

## 2.11 Entity Relationship Diagram

`students 1──* complaints 1──* complaint_images`; `admins` stands alone (role login only).

> [Insert ER diagram with PK/FK marks.]

## 2.12 Database Design

PostgreSQL, `database/campus_voice.sql` (rerunnable `IF NOT EXISTS`):

- `students(id SERIAL PK, student_id VARCHAR(30) UNIQUE NOT NULL, full_name VARCHAR(100) NOT NULL, department VARCHAR(80), semester INT, email VARCHAR(120) UNIQUE NOT NULL, phone VARCHAR(20), password_hash VARCHAR(100) NOT NULL, profile_image VARCHAR(200), disabled SMALLINT DEFAULT 0, created_at TIMESTAMP DEFAULT NOW())`
- `admins(id SERIAL PK, email VARCHAR(120) UNIQUE NOT NULL, password_hash VARCHAR(100) NOT NULL, role VARCHAR(30) DEFAULT 'admin', created_at TIMESTAMP DEFAULT NOW())`
- `complaints(id SERIAL PK, complaint_id VARCHAR(20) UNIQUE, student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE, title VARCHAR(150) NOT NULL, description TEXT NOT NULL, category VARCHAR(40), priority VARCHAR(10) DEFAULT 'Medium', location VARCHAR(40), incident_date DATE, anonymous SMALLINT DEFAULT 0, status VARCHAR(12) DEFAULT 'Pending', admin_remark TEXT, created_at/updated_at TIMESTAMP DEFAULT NOW())`, indexes on `(status)`, `(category)`, `(student_id)`
- `complaint_images(id SERIAL PK, complaint_id INT NOT NULL REFERENCES complaints(id) ON DELETE CASCADE, image_path TEXT)`
- `notifications(id SERIAL PK, student_id INT REFERENCES students(id) ON DELETE CASCADE, for_admin SMALLINT DEFAULT 0, complaint_id INT, message VARCHAR(255), read_status SMALLINT DEFAULT 0, created_at TIMESTAMP DEFAULT NOW())`

## 2.13 Gantt Chart

| Week | Activity |
|---|---|
| 1–2 | Requirement study, existing-system survey, proposal |
| 3–4 | Database design, API design, UI wireframes |
| 5–7 | Backend: auth, complaints, admin APIs, uploads |
| 8–9 | Frontend: landing, filing, dashboards, theming |
| 10 | Cloud wiring: Aiven, Vercel deploy, env hardening |
| 11 | Testing (auth, filing, evidence, roles), bug fixes |
| 12 | Report writing, screenshots, final review |

---

# Chapter 3: Development Progress and Implementation

## 3.1 Development Environment

Windows 11, VS Code, Node.js 24, Git + GitHub, Chrome for testing, Vercel CLI for deployment, Aiven console for database inspection.

## 3.2 Technology Stack

| Layer | Choice | Reason |
|---|---|---|
| Runtime | Node.js 24 | Single language across tiers, huge ecosystem |
| API | Express 4 | Minimal, well-documented REST framework |
| Database | PostgreSQL 18 (Aiven) | Relational integrity, free managed tier |
| Auth | bcrypt + JWT cookies | No sessions to store; HttpOnly XSS-safe |
| Uploads | multer (memory) + data URLs | Identical behaviour on localhost and serverless |
| Frontend | React 18 + Vite 6 + Tailwind 4 | Component UI, instant builds, utility styling |
| Hosting | Vercel (static + serverless `api/index.js`) | Free, zero-config Node functions |
| Source control | Git + GitHub | Versioning, backup, deploy source |

## 3.3 Frontend Development

Five hash-routed demos plus one shared shell (`cv-shared`: cobalt-dark tokens, glass cards, mono kickers, pill buttons):

- **Landing** (`#astro-association-template`) — bubble-canvas hero, live mission counters (`/api/public/stats`), login-gated member card prefilled from the student session, nav with session-aware Sign in/Log out.
- **File complaint** (`#file-complaint`) — login-gated; title/category(22)/priority/description/anonymous; upload button + live camera capture; files posted as multipart; confirmation carries the real `CV…` ID.
- **Sign in** (`#signin`) — Student/Admin tabs, student signup, SVG eye toggles on passwords, role-based redirect.
- **Student dashboard** (`#student-dashboard`) — greeting, four live counters, bubble-band complaint cards with inline expandable full view (description, dates, admin remark, evidence) and Pending-only withdraw.
- **Admin dashboard** (`#admin-dashboard`) — six live counters, searchable register table, inline expandable evidence dossiers, one-click status transitions.

## 3.4 Backend Development

Single-file Express API (`backend/server.js`, ~100 lines) plus a two-line serverless entry (`api/index.js`, guarded `listen` so `node backend/server.js` still runs locally):

- `POST /api/auth/signup|login|logout`, `GET /api/auth/profile`
- `POST|GET /api/complaints`, `GET /api/complaints/:id` (ownership + anonymity enforced), `DELETE /api/complaints/:id` (own + Pending)
- `GET /api/admin/complaints`, `PUT /api/admin/status/:id`, `GET /api/admin/stats`
- `GET /api/stats`, `GET /api/public/stats`
- `? → $n` placeholder adapter over `pg`; validators on signup/filing; central async-error wrapper.

## 3.5 Database Implementation

Schema created from `database/campus_voice.sql`; `complaint_images.image_path` widened from `VARCHAR(200)` to `TEXT` to hold evidence data URLs; indexes on complaint status/category/student. Verified live: signup → login → file with photo → detail → status change → withdraw round-trips against Aiven.

## 3.6 Security Implementation

Hashed passwords, HttpOnly cookies, role middleware with 401/403, file-type allowlist (JPG/PNG/PDF) with 5 MB caps, parameterized queries, SSL database connections, secrets exclusively in env (`.env` git-ignored; committed `.env.example` only).

## 3.7 Deployment

- **Database:** Aiven PostgreSQL service; schema applied once; app connects with `sslmode=require`.
- **App:** Vercel project with `vercel.json` rewrites (`/api/*`, `/uploads/*` → serverless function; `/assets/*`, `/` → prebuilt `frontend/`); six env vars set in project settings; production URL serves the landing directly with the correct tab title.
- **Source:** GitHub repo with secrets excluded via `.gitignore`.

## 3.8 Code Review

Self-reviewed end to end: every route has at least one live caller (dead profile-update, users, notifications, and reports endpoints were deleted); every CSS class has a consumer; every DB write is followed by a read-back in testing. Build (Vite) passes; `node --check` passes on the server.

## 3.9 Source Code

Full source: [your GitHub repo URL]. Key excerpt — complaint filing:

```js
app.post('/api/complaints', auth('student'), upload.array('files', 5),
 [body('title').trim().notEmpty(), body('description').trim().notEmpty()], valid, J(async (req, res) => {
  const b = req.body, [r] = await db.execute('INSERT INTO complaints(...) VALUES(?,?,?,?,?,?,?,?) RETURNING id', [...]);
  const cid = 'CV' + new Date().getFullYear() + String(r[0].id).padStart(4, '0');
  await db.execute('UPDATE complaints SET complaint_id=? WHERE id=?', [cid, r[0].id]);
  for (const f of req.files || [])
    await db.execute('INSERT INTO complaint_images(complaint_id,image_path) VALUES(?,?)',
      [r[0].id, 'data:' + f.mimetype + ';base64,' + f.buffer.toString('base64')]);
  res.json({ complaint_id: cid });
}));
```

---

# Chapter 4: System Testing and Validation

## 4.1 Testing Overview

Black-box testing against the running system (localhost + production URL): each feature exercised through the real UI and API with temporary accounts, verified directly in the database, then cleaned up.

## 4.2 Testing Environment

Windows 11 + Chrome; Node 24 backend on `localhost:3100`; production on Vercel; Aiven PostgreSQL inspected via console query editor; temp accounts `tmp*` created and deleted per test.

## 4.3 Testing Methodology

Manual functional testing per use case, boundary checks (empty title, oversize file, wrong role, logged-out access), and regression passes after every change (rebuild → live 200 → API spot-checks).

## 4.4 Test Cases

| ID | Case | Steps | Expected | Result |
|---|---|---|---|---|
| T01 | Student signup | Valid form → submit | `{ok:true}`, row in `students` | Pass |
| T02 | Duplicate signup | Same email again | `409` already registered | Pass |
| T03 | Student login | Correct creds, Student tab | JWT cookie, lands on dashboard | Pass |
| T04 | Wrong password | Bad password | `401 Invalid credentials` | Pass |
| T05 | Wrong tab | Student creds on Admin tab | `401` (separate table) | Pass |
| T06 | File complaint | Title+desc+photo → submit | `CV…` ID, row + image row | Pass |
| T07 | Missing title | Empty title | `400` validation error | Pass |
| T08 | Oversize file | > 5 MB upload | Rejected by multer | Pass |
| T09 | Bad file type | `.exe`/video upload | Skipped by filter | Pass |
| T10 | Dashboard list | Open after filing | New card visible | Pass |
| T11 | Detail view | Expand card | Full text + evidence renders | Pass |
| T12 | Withdraw pending | Withdraw own Pending | Row deleted | Pass |
| T13 | Withdraw resolved | Attempt on Resolved | No delete (server guard) | Pass |
| T14 | Admin login | Admin tab, admin creds | Lands on admin dashboard | Pass |
| T15 | Admin sees complaint | Open register | Row with masked/filer name | Pass |
| T16 | Status change | Pending → Resolved | Persists; counters update | Pass |
| T17 | Anonymous filing | File with anonymous on | Admin sees content, name masked | Pass |
| T18 | Logged-out filing | Open form logged out | Sign-in gate, no form | Pass |
| T19 | Public counters | Load landing | `{filed, completed}` match DB | Pass |
| T20 | Production deploy | Open Vercel URL | Homepage direct, APIs live | Pass |

## 4.5 Automated Flow Testing

Repeatable curl round-trips (signup → login with cookie jar → multipart file → detail → status → withdraw → temp-user cleanup with row-count assertions) were executed against localhost and production after every backend change.

## 4.6 Test Results

All 20 cases pass. No open defects. Known accepted limits: evidence lives in DB rows (fine at college scale; object storage later), no password-reset flow, uploads vanish from Vercel's disk (hence DB storage).

---

# Chapter 5: User Interface and Application Screens

Dark cobalt poster theme throughout: bubble-canvas hero, glass cards, mono kickers, pill buttons, hover lift + bubble-glyph effects.

1. **Landing** — nav (brand, section links, Sign in/Log out pill), `VOICE` bubble wordmark hero, feature cards, live mission counters, member card, footer.
2. **File a complaint** — login gate, title/category/priority/description/anonymous, upload + camera evidence, filing confirmation with real ID.
3. **Sign in** — Student/Admin tabs, signup form, eye-toggle passwords.
4. **Student dashboard** — greeting, four counters, bubble-band complaint cards, inline full view, withdraw.
5. **Admin dashboard** — six counters, searchable register, inline dossiers, status setter.

> [Paste one screenshot per screen above.]

## 5.2 User Interface Summary

One shared shell guarantees identical tokens, hover language, reduced-motion support, and responsive collapse on all five pages.

---

# Chapter 6: Conclusion and Future Scope

## 6.1 Conclusion

Campus Voice meets every objective in 1.4: secure role-based auth, structured evidence-backed filing with permanent IDs, transparent tracking, a working admin console, live public counters, and public cloud deployment — verified by 20 passing test cases against the real database. The project demonstrates a complete full-stack loop from browser pixels to managed Postgres.

## 6.2 Future Scope

1. Object storage (S3/Vercel Blob) for evidence at scale.
2. Email notifications on status changes + password reset flow.
3. Admin user management screen and analytics reports page.
4. Pagination, search, and filters on large registers.
5. Rate limiting, security headers, refresh-token rotation.
6. Native-feel installable (PWA) packaging.

---

# Chapter 7: References

1. Node.js docs — https://nodejs.org/docs
2. Express 4.x API — https://expressjs.com
3. node-postgres (`pg`) — https://node-postgres.com
4. React docs — https://react.dev
5. Vite guide — https://vite.dev
6. Tailwind CSS v4 — https://tailwindcss.com
7. Vercel docs (functions, rewrites, env) — https://vercel.com/docs
8. Aiven PostgreSQL docs — https://aiven.io/docs
9. bcrypt / jsonwebtoken / multer (npm package docs)
10. Poster UI inspiration: 21st.dev astronomy-club bubble template (MIT) — https://21st.dev

---

> How to use this file: copy it into Google Docs (Markdown pastes cleanly), replace every `[...]` with your details, paste your screenshots where marked, and add your college's certificate/cover formatting.
