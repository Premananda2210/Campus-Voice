"use client"

import * as React from "react"
import { CvPage, cvApi } from "../cv-shared"

export default function Demo() {
  const [role, setRole] = React.useState<"student" | "admin">("student")
  const [mode, setMode] = React.useState<"login" | "signup">("login")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [fullName, setFullName] = React.useState("")
  const [studentId, setStudentId] = React.useState("")
  const [department, setDepartment] = React.useState("")
  const [semester, setSemester] = React.useState("")
  const [msg, setMsg] = React.useState("")
  const [ok, setOk] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [showPw, setShowPw] = React.useState(false)

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg("")
    setBusy(true)
    try {
      const r = await cvApi("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password, admin: role === "admin" }),
      })
      location.hash = r.role === "admin" ? "admin-dashboard" : "student-dashboard"
    } catch (err) {
      setOk(false)
      setMsg(err instanceof Error ? err.message : "Login failed")
    } finally {
      setBusy(false)
    }
  }

  const signup = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg("")
    setBusy(true)
    try {
      await cvApi("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          full_name: fullName.trim(),
          student_id: studentId.trim(),
          department: department.trim() || undefined,
          semester: semester ? Number(semester) : undefined,
          email: email.trim(),
          password,
        }),
      })
      setOk(true)
      setMsg("Account created — log in with your new credentials.")
      setMode("login")
      setPassword("")
    } catch (err) {
      setOk(false)
      setMsg(err instanceof Error ? err.message : "Sign up failed")
    } finally {
      setBusy(false)
    }
  }

  return (
    <CvPage narrow kicker="Sign in · Campus Voice" title={role === "admin" ? "Control room." : "Welcome back."}>
      <div className="cv-tabs" role="group" aria-label="Account type">
        {(["student", "admin"] as const).map((r) => (
          <button key={r} type="button" className="cv-tab" aria-pressed={role === r} onClick={() => { setRole(r); setMode("login"); setMsg("") }}>
            {r === "student" ? "Student" : "Admin"}
          </button>
        ))}
      </div>
      <div className="cv-card">
        {role === "student" && (
          <div className="cv-tabs" role="group" aria-label="Student action">
            {(["login", "signup"] as const).map((m) => (
              <button key={m} type="button" className="cv-tab" aria-pressed={mode === m} onClick={() => { setMode(m); setMsg("") }}>
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>
        )}
        {mode === "login" || role === "admin" ? (
          <form className="cv-form" onSubmit={login}>
            <label className="cv-label">
              <span className="cv-mono">Email</span>
              <input className="cv-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@college.edu" autoComplete="email" />
            </label>
            <label className="cv-label">
              <span className="cv-mono">Password</span>
              <span className="cv-pass">
                <input className="cv-input" type={showPw ? "text" : "password"} required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
                <button type="button" className="cv-eye" aria-pressed={showPw} aria-label={showPw ? "Hide password" : "Show password"} onClick={() => setShowPw((s) => !s)}>
                  {showPw ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </span>
            </label>
            <button type="submit" className="cv-btn" disabled={busy}>{busy ? "Checking…" : role === "admin" ? "Admin log in" : "Log in"}</button>
          </form>
        ) : (
          <form className="cv-form" onSubmit={signup}>
            <div className="cv-row">
              <label className="cv-label">
                <span className="cv-mono">Full name</span>
                <input className="cv-input" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" autoComplete="name" />
              </label>
              <label className="cv-label">
                <span className="cv-mono">Student ID</span>
                <input className="cv-input" required value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="e.g. STU2024001" />
              </label>
            </div>
            <div className="cv-row">
              <label className="cv-label">
                <span className="cv-mono">Department</span>
                <input className="cv-input" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. CSE" />
              </label>
              <label className="cv-label">
                <span className="cv-mono">Semester</span>
                <input className="cv-input" type="number" min={1} max={12} value={semester} onChange={(e) => setSemester(e.target.value)} placeholder="e.g. 4" />
              </label>
            </div>
            <label className="cv-label">
              <span className="cv-mono">Email</span>
              <input className="cv-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@college.edu" autoComplete="email" />
            </label>
            <label className="cv-label">
              <span className="cv-mono">Password (min 8)</span>
              <span className="cv-pass">
                <input className="cv-input" type={showPw ? "text" : "password"} required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
                <button type="button" className="cv-eye" aria-pressed={showPw} aria-label={showPw ? "Hide password" : "Show password"} onClick={() => setShowPw((s) => !s)}>
                  {showPw ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </span>
            </label>
            <button type="submit" className="cv-btn" disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
          </form>
        )}
        {msg && (
          <p className={`cv-msg ${ok ? "ok" : "err"}`} role="status" aria-live="polite" style={{ marginTop: 14 }}>{msg}</p>
        )}
      </div>
    </CvPage>
  )
}
