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

type Detail = {
  title: string
  description: string
  category: string
  priority: string
  status: string
  location: string | null
  incident_date: string | null
  anonymous: number
  full_name: string
  department: string | null
  created_at: string
  admin_remark: string | null
  images: { image_path: string }[]
}

export default function Demo() {
  const [stats, setStats] = React.useState<{ total: number; pending: number; review: number; resolved: number; high: number; anon: number } | null>(null)
  const [rows, setRows] = React.useState<Row[]>([])
  const [q, setQ] = React.useState("")
  const [denied, setDenied] = React.useState(false)
  const [openId, setOpenId] = React.useState<string | null>(null)
  const [details, setDetails] = React.useState<Record<string, Detail>>({})

  const toggle = async (id: string) => {
    if (openId === id) {
      setOpenId(null)
      return
    }
    setOpenId(id)
    if (!details[id]) {
      try {
        const c = await cvApi("/api/complaints/" + id)
        setDetails((d) => ({ ...d, [id]: c as Detail }))
      } catch {}
    }
  }

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
                <React.Fragment key={r.complaint_id}>
                <tr>
                  <td><button type="button" className="cv-mono" onClick={() => toggle(r.complaint_id)} aria-expanded={openId === r.complaint_id} style={{ background: "none", border: 0, color: "#8c95ff", cursor: "pointer", font: "inherit", padding: 0, textDecoration: "underline" }}>{r.complaint_id}</button></td>
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
                {openId === r.complaint_id && (
                  <tr>
                    <td colSpan={6} style={{ background: "rgba(140,149,255,.05)" }}>
                      {!details[r.complaint_id] && <span className="cv-mono">Loading…</span>}
                      {details[r.complaint_id] && (() => { const c = details[r.complaint_id]; return (
                        <div>
                          <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>{c.title}</div>
                          <p style={{ margin: "8px 0", whiteSpace: "pre-wrap" }}>{c.description}</p>
                          <div className="cv-mono">
                            Filed by {c.full_name}{c.department && !c.anonymous ? " · " + c.department : ""} · {new Date(c.created_at).toLocaleString()}
                          </div>
                          <div className="cv-mono" style={{ marginTop: 4 }}>
                            {c.category} · {c.location ?? "—"} · {c.incident_date ? c.incident_date.slice(0, 10) : "no date"} · {c.anonymous ? "anonymous" : "named"}
                          </div>
                          <div style={{ marginTop: 8 }}><b>Admin remark: </b>{c.admin_remark || "—"}</div>
                          {c.images.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                              {c.images.map((x, i) => (
                                /\.pdf$/i.test(x.image_path)
                                  ? <a key={i} className="cv-ghost" style={{ padding: "6px 16px" }} href={x.image_path} target="_blank" rel="noreferrer">PDF {i + 1}</a>
                                  : <a key={i} href={x.image_path} target="_blank" rel="noreferrer"><img src={x.image_path} alt="" style={{ width: 110, borderRadius: 10, cursor: "zoom-in" }} /></a>
                              ))}
                            </div>
                          )}
                        </div>
                      ) })()}
                    </td>
                  </tr>
                )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {shown.length === 0 && <p className="cv-mono">No complaints match.</p>}
        </div>
      </div>
    </CvPage>
  )
}
