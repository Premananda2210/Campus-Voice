"use client"

import * as React from "react"
import { CvPage, cvApi } from "../cv-shared"

type Complaint = {
  complaint_id: string
  title: string
  category: string
  priority: string
  status: string
  created_at: string
}

export default function Demo() {
  const [name, setName] = React.useState("")
  const [stats, setStats] = React.useState<{ total: number; pending: number; review: number; resolved: number } | null>(null)
  const [list, setList] = React.useState<Complaint[]>([])
  const [denied, setDenied] = React.useState(false)

  const load = React.useCallback(async () => {
    try {
      const p = await cvApi("/api/auth/profile")
      setName(p.full_name)
      setStats(await cvApi("/api/stats"))
      setList(await cvApi("/api/complaints"))
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

  const withdraw = async (id: string) => {
    if (!confirm("Withdraw complaint " + id + "? Only pending complaints can be withdrawn.")) return
    try {
      await cvApi("/api/complaints/" + id, { method: "DELETE" })
      load()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not withdraw")
    }
  }

  if (denied)
    return (
      <CvPage narrow kicker="Student console" title="Hold on.">
        <div className="cv-card">
          <p>Please sign in with a student account to see your dashboard.</p>
          <p><a className="cv-btn" href="#signin">Go to sign in</a></p>
        </div>
      </CvPage>
    )

  const cards: [string, number][] = stats
    ? [["Total", stats.total], ["Pending", stats.pending], ["Under Review", stats.review], ["Resolved", stats.resolved]]
    : []

  return (
    <CvPage kicker="Student console" title={name ? "Welcome, " + name + "." : "Your dashboard."}>
      <div className="cv-top">
        <a className="cv-btn" href="#file-complaint">File a complaint</a>
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
      <h2 className="cv-mono" style={{ margin: "6px 0 12px" }}>My complaints</h2>
      <div className="cv-list">
        {list.length === 0 && <div className="cv-card">No complaints yet — file your first one above.</div>}
        {list.map((x) => (
          <div key={x.complaint_id} className="cv-card">
            <div className="cv-top" style={{ marginBottom: 8 }}>
              <span className="cv-mono">{x.complaint_id}</span>
              {x.status === "Pending" && (
                <button type="button" className="cv-ghost" style={{ padding: "6px 16px" }} onClick={() => withdraw(x.complaint_id)}>
                  Withdraw
                </button>
              )}
            </div>
            <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>{x.title}</div>
            <div className="cv-mono" style={{ marginTop: 8 }}>
              {x.category} · {x.priority} · {x.status} · {new Date(x.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </CvPage>
  )
}
