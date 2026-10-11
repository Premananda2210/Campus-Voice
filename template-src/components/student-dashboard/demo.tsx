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

  type Detail = {
    description: string
    location: string | null
    incident_date: string | null
    created_at: string
    admin_remark: string | null
    images: { image_path: string }[]
  }
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
            <b className="cv-bubtext">{n}</b>
            {label}
          </div>
        ))}
      </div>
      <h2 className="cv-mono" style={{ margin: "6px 0 12px" }}>My complaints</h2>
      <div className="cv-list">
        {list.length === 0 && <div className="cv-card">No complaints yet — file your first one above.</div>}
        {list.map((x) => (
          <div key={x.complaint_id} className="cv-card">
            <div className="cv-band"><span className="cv-id cv-bubtext">{x.complaint_id}</span></div>
            <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>{x.title}</div>
            <div className="cv-top" style={{ margin: "8px 0 0" }}>
              <span className="cv-mono">{x.category} · {x.priority} · {x.status} · {new Date(x.created_at).toLocaleDateString()}</span>
              <span style={{ display: "inline-flex", gap: 8 }}>
                <button type="button" className="cv-ghost" style={{ padding: "6px 16px" }} onClick={() => toggle(x.complaint_id)} aria-expanded={openId === x.complaint_id}>
                  {openId === x.complaint_id ? "Hide" : "View"}
                </button>
                {x.status === "Pending" && (
                  <button type="button" className="cv-ghost" style={{ padding: "6px 16px" }} onClick={() => withdraw(x.complaint_id)}>
                    Withdraw
                  </button>
                )}
              </span>
            </div>
            {openId === x.complaint_id && (
              <div style={{ marginTop: 12, borderTop: "1px solid rgba(140,149,255,.2)", paddingTop: 12 }}>
                {!details[x.complaint_id] && <span className="cv-mono">Loading…</span>}
                {details[x.complaint_id] && (() => { const c = details[x.complaint_id]; return (
                  <div>
                    <p style={{ margin: "0 0 8px", whiteSpace: "pre-wrap" }}>{c.description}</p>
                    <div className="cv-mono">
                      {c.location ?? "—"} · {c.incident_date ? c.incident_date.slice(0, 10) : "no date"} · filed {new Date(c.created_at).toLocaleString()}
                    </div>
                    <div style={{ marginTop: 8 }}><b>Admin remark: </b>{c.admin_remark || "—"}</div>
                    {c.images.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                        {c.images.map((im, i) => (
                          /\.pdf$/i.test(im.image_path)
                            ? <a key={i} className="cv-ghost" style={{ padding: "6px 16px" }} href={im.image_path} target="_blank" rel="noreferrer">PDF {i + 1}</a>
                            : <a key={i} href={im.image_path} target="_blank" rel="noreferrer"><img src={im.image_path} alt="" style={{ width: 110, borderRadius: 10, cursor: "zoom-in" }} /></a>
                        ))}
                      </div>
                    )}
                  </div>
                ) })()}
              </div>
            )}
          </div>
        ))}
      </div>
    </CvPage>
  )
}
