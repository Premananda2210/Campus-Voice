"use client"

import * as React from "react"
import { CvPage, cvApi } from "../cv-shared"

type Row = {
  complaint_id: string
  title: string
  student_name: string
  department: string
  category: string
  priority: string
  status: string
}

const STATUSES = ["Pending", "In Review", "Resolved", "Rejected"]

export default function Demo() {
  const [stats, setStats] = React.useState<{ total: number; pending: number; review: number; resolved: number; high: number; anon: number } | null>(null)
  const [rows, setRows] = React.useState<Row[]>([])
  const [q, setQ] = React.useState("")
  const [denied, setDenied] = React.useState(false)

  const load = React.useCallback(async () => {
    try {
      setStats(await cvApi("/api/admin/stats"))
      setRows(await cvApi("/api/admin/complaints"))
    } catch {
      setDenied(true)
    }
  }, [])

  React.useEffect(() => {
    load()
  }, [load])

  const logout = async () => {
    try {
      await cvApi("/api/auth/logout", { method: "POST" })
    } catch {}
    location.hash = "signin"
  }

  const setStatus = async (id: string, status: string) => {
    if (!status) return
    try {
      await cvApi("/api/admin/status/" + id, { method: "PUT", body: JSON.stringify({ status }) })
      load()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not update")
    }
  }

  if (denied)
    return (
      <CvPage narrow kicker="Admin console" title="Hold on.">
        <div className="cv-card">
          <p>Please sign in with an admin account to see this dashboard.</p>
          <p><a className="cv-btn" href="#signin">Go to sign in</a></p>
        </div>
      </CvPage>
    )

  const cards: [string, number][] = stats
    ? [["Total", stats.total], ["Pending", stats.pending], ["In Review", stats.review], ["Resolved", stats.resolved], ["High Priority", stats.high], ["Anonymous", stats.anon]]
    : []
  const needle = q.toLowerCase()
  const shown = rows.filter((r) => JSON.stringify(r).toLowerCase().includes(needle))

  return (
    <CvPage kicker="Admin console" title="Control room.">
      <div className="cv-top">
        <span className="cv-mono">{rows.length} complaints on file</span>
        <span className="spacer" />
        <button type="button" className="cv-ghost" onClick={logout}>Log out</button>
      </div>
      <div className="cv-stats">
        {cards.map(([label, n], i) => (
          <div key={label} className="cv-card cv-stat">
            <span className="cv-mono">#0{i + 1}</span>
            <b>{n}</b>
            {label}
          </div>
        ))}
      </div>
      <div className="cv-card">
        <input className="cv-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search complaints…" aria-label="Search complaints" />
        <div className="cv-tablewrap" style={{ marginTop: 12 }}>
          <table className="cv-table">
            <thead>
              <tr><th>ID</th><th>Student</th><th>Category</th><th>Priority</th><th>Status</th><th>Set</th></tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.complaint_id}>
                  <td className="cv-mono">{r.complaint_id}</td>
                  <td>{r.student_name}</td>
                  <td>{r.category}</td>
                  <td>{r.priority}</td>
                  <td>{r.status}</td>
                  <td>
                    <select className="cv-input" style={{ padding: "8px 12px" }} value="" onChange={(e) => { setStatus(r.complaint_id, e.target.value); e.target.value = "" }} aria-label={"Set status for " + r.complaint_id}>
                      <option value="">Set…</option>
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {shown.length === 0 && <p className="cv-mono">No complaints match.</p>}
        </div>
      </div>
    </CvPage>
  )
}
