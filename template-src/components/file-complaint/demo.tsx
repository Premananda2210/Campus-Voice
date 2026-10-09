"use client"

import * as React from "react"

const CATEGORIES = ["Infrastructure", "Classroom", "Washroom", "Water Facility", "Electricity", "Wi-Fi", "Library", "Faculty", "Hostel", "Canteen", "Cleanliness", "Other"]

const CSS = `
.cf-page{min-height:100svh;background:#060821;color:#f2f4ff;font-family:"Poppins","Montserrat",Archivo,Inter,system-ui,sans-serif;padding:32px 20px 80px;position:relative;overflow-x:hidden}
.cf-page::before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(700px 420px at 88% -4%,rgba(47,71,255,.3),transparent 60%),radial-gradient(620px 420px at -8% 100%,rgba(31,227,192,.12),transparent 60%)}
.cf-page::after{content:"";position:fixed;width:110vmax;height:110vmax;left:30vw;top:-55vmax;z-index:0;border-radius:50%;border:1px solid rgba(140,149,255,.18);pointer-events:none}
.cf-wrap{max-width:680px;margin:0 auto;position:relative;z-index:1;background:rgba(140,149,255,.07);border:1px solid rgba(140,149,255,.25);border-radius:28px;padding:clamp(22px,4vw,40px);box-shadow:0 8px 32px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.15);-webkit-backdrop-filter:blur(30px);backdrop-filter:blur(30px)}
.cf-mono{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;color:#8a90bd}
.cf-mono::before{content:"● ";color:#8c95ff}
.cf-h1{font-weight:900;text-transform:uppercase;letter-spacing:-.03em;font-size:clamp(2.4rem,8vw,4rem);margin:.3em 0 .2em;line-height:.95;text-wrap:balance}
.cf-h1 .accent{color:#8c95ff}
.cf-lede{color:#c8cdf2;margin:0 0 26px}
.cf-form{display:grid;gap:14px}
.cf-field{display:grid;gap:6px}
.cf-input{padding:13px 18px;border-radius:16px;border:1px solid rgba(140,149,255,.36);background:rgba(140,149,255,.07);color:#f2f4ff;font-size:1rem;width:100%;box-sizing:border-box;font-family:inherit}
.cf-input:focus{outline:2px solid #8c95ff}
.cf-row{display:grid;gap:14px;grid-template-columns:1fr 1fr}
@media(max-width:560px){.cf-row{grid-template-columns:1fr}}
.cf-check{display:flex;align-items:center;gap:10px;font-size:.95rem}
.cf-check input{width:18px;height:18px;accent-color:#8c95ff}
.cf-btn{border:0;border-radius:999px;padding:13px 30px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;font-size:.85rem;color:#060821;cursor:pointer;background:#8c95ff;box-shadow:0 10px 24px -14px #8c95ff;justify-self:start;font-family:inherit}
.cf-msg{margin:6px 0 0;font-size:.95rem}
.cf-msg.ok{color:#41ef96}.cf-msg.err{color:#fda4af}
.cf-list{margin-top:30px;display:grid;gap:12px}
.cf-card{border:1px solid rgba(140,149,255,.28);border-radius:20px;padding:16px 20px;background:rgba(12,16,51,.5);box-shadow:inset 0 1px 0 rgba(255,255,255,.1)}
.cf-card-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.cf-card-top button{background:none;border:0;color:#8c95ff;cursor:pointer;text-decoration:underline;font-size:.8rem;font-family:inherit}
.cf-title{font-weight:700;margin-top:6px}
.cf-back{display:inline-block;color:#f2f4ff;text-decoration:none;font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px}
.cf-thumbs{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.cf-thumbs img{width:64px;height:64px;object-fit:cover;border-radius:12px;cursor:pointer;border:1px solid rgba(140,149,255,.3)}
.cf-ev{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.cf-ev img{width:52px;height:52px;object-fit:cover;border-radius:10px;cursor:zoom-in}
.cf-ghost{border:1.5px solid #8c95ff;background:transparent;color:#8c95ff;border-radius:999px;padding:11px 24px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;font-size:.8rem;cursor:pointer;font-family:inherit}
.cf-cam{position:fixed;inset:0;z-index:50;background:rgba(4,4,20,.92);display:grid;place-items:center;padding:20px;box-sizing:border-box}
.cf-cam-box{width:min(560px,94vw);background:#0c1033;border:1px solid rgba(140,149,255,.3);border-radius:20px;padding:18px;box-sizing:border-box}
.cf-cam-box video{width:100%;border-radius:12px;background:#000;display:block}
.cf-cam-row{display:flex;gap:10px;margin-top:12px}
`

export default function Demo() {
  const [allowed, setAllowed] = React.useState<boolean | null>(null)
  const [title, setTitle] = React.useState("")
  const [category, setCategory] = React.useState(CATEGORIES[0])
  const [priority, setPriority] = React.useState("Medium")
  const [description, setDescription] = React.useState("")
  const [anon, setAnon] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const [camOn, setCamOn] = React.useState(false)
  const fileInput = React.useRef<HTMLInputElement | null>(null)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const streamRef = React.useRef<MediaStream | null>(null)
  const [msg, setMsg] = React.useState("")
  const [ok, setOk] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  React.useEffect(() => {
    fetch("/api/auth/profile").then((r) => setAllowed(r.ok)).catch(() => setAllowed(false))
  }, [])
  const stopCam = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setCamOn(false)
  }
  const openCam = async () => {
    if (files.length >= 5) return
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("no camera API")
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      streamRef.current = stream
      setCamOn(true)
    } catch {
      fileInput.current?.click()
    }
  }
  const snap = async () => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return
    const scale = Math.min(1, 960 / Math.max(video.videoWidth, video.videoHeight))
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(video.videoWidth * scale)
    canvas.height = Math.round(video.videoHeight * scale)
    canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height)
    const blob = await (await fetch(canvas.toDataURL("image/jpeg", 0.8))).blob()
    setFiles([...files, new File([blob], "photo-" + Date.now() + ".jpg", { type: "image/jpeg" })])
    stopCam()
  }
  React.useEffect(() => {
    if (camOn && videoRef.current && streamRef.current) videoRef.current.srcObject = streamRef.current
  }, [camOn])
  React.useEffect(() => () => stopCam(), [])
  const rmFile = (i: number) => {
    const u = thumbs[i]
    if (u) URL.revokeObjectURL(u)
    setFiles(files.filter((_, j) => j !== i))
  }
  const thumbs = files.map((f) => URL.createObjectURL(f))
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg("")
    if (!title.trim() || !description.trim()) {
      setOk(false)
      setMsg("Give your complaint a title and a short description.")
      return
    }
    setBusy(true)
    try {
      const d = new FormData()
      d.append("title", title.trim())
      d.append("description", description.trim())
      d.append("category", category)
      d.append("priority", priority)
      d.append("anonymous", anon ? "true" : "false")
      files.slice(0, 5).forEach((f) => d.append("files", f))
      const r = await fetch("/api/complaints", { method: "POST", body: d })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error((j as { error?: string }).error || "Filing failed")
      setOk(true)
      setMsg("Complaint " + (j as { complaint_id: string }).complaint_id + " filed — visible on your dashboard.")
      setTitle("")
      setDescription("")
      setFiles([])
    } catch (err) {
      setOk(false)
      setMsg(err instanceof Error ? err.message : "Filing failed")
    } finally {
      setBusy(false)
    }
  }
  return (
    <div className="cf-page">
      <style>{CSS}</style>
      <div className="cf-wrap">
        <a className="cf-back" href="#astro-association-template">← Back to Campus Voice</a>
        <p className="cf-mono">File a complaint · Campus Voice report</p>
        <h1 className="cf-h1">Speak up. <span className="accent">Get it fixed.</span></h1>
        {allowed === null && <p className="cf-lede">Checking sign-in…</p>}
        {allowed === false && (
          <div>
            <p className="cf-lede">Please sign in first — complaints are filed under your student account.</p>
            <p><a className="cf-btn" href="#signin">Go to sign in</a></p>
          </div>
        )}
        {allowed === true && (
        <div>
        <p className="cf-lede">Filed under your account, straight into the database.</p>
        <form className="cf-form" onSubmit={submit} noValidate>
          <label className="cf-field">
            <span className="cf-mono">Complaint title</span>
            <input className="cf-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. No water on the 3rd floor" />
          </label>
          <div className="cf-row">
            <label className="cf-field">
              <span className="cf-mono">Category</span>
              <select className="cf-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="cf-field">
              <span className="cf-mono">Priority</span>
              <select className="cf-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
                {["Low", "Medium", "High", "Urgent"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="cf-field">
            <span className="cf-mono">Describe the issue</span>
            <textarea className="cf-input" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="What happened, where, and when?" style={{ minHeight: 110, borderRadius: 22 }} />
          </label>
          <div className="cf-field">
            <span className="cf-mono">Evidence (JPG/PNG/PDF, max 5)</span>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="button" className="cf-btn" onClick={() => fileInput.current?.click()}>Upload files</button>
              <button type="button" className="cf-ghost" onClick={openCam}>Take photo</button>
            </div>
            <input ref={fileInput} type="file" accept=".jpg,.jpeg,.png,.pdf" multiple hidden onChange={(e) => { if (e.target.files) setFiles([...files, ...e.target.files].slice(0, 5)); e.target.value = "" }} />
            {files.length > 0 && (
              <div className="cf-thumbs">
                {files.map((f, i) => (
                  <img key={i} src={thumbs[i]} alt={f.name} title={f.name + " — click to remove"} onClick={() => rmFile(i)} />
                ))}
              </div>
            )}
          </div>
          <label className="cf-check">
            <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} />
            File anonymously
          </label>
          <div>
            <button type="submit" className="cf-btn" disabled={busy}>{busy ? "Filing…" : "File complaint"}</button>
          </div>
        </form>
        {camOn && (
          <div className="cf-cam">
            <div className="cf-cam-box">
              <video ref={videoRef} autoPlay playsInline muted />
              <div className="cf-cam-row">
                <button type="button" className="cf-btn" onClick={snap}>Capture</button>
                <button type="button" className="cf-ghost" onClick={stopCam}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {msg && (
          <p className={`cf-msg ${ok ? "ok" : "err"}`} role="status" aria-live="polite">{msg}</p>
        )}
        {ok && (
          <p style={{ marginTop: 10 }}><a className="cf-ghost" href="#student-dashboard">View my dashboard →</a></p>
        )}
        </div>
        )}
      </div>
    </div>
  )
}
