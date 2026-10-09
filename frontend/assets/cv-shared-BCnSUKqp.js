import{j as e}from"./index-Ca4HqrX4.js";const i=`
.cv-page{min-height:100svh;background:#060821;color:#f2f4ff;font-family:"Poppins","Montserrat",Archivo,Inter,system-ui,sans-serif;padding:32px 20px 80px;position:relative;overflow-x:hidden}
.cv-page::before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(700px 420px at 88% -4%,rgba(47,71,255,.3),transparent 60%),radial-gradient(620px 420px at -8% 100%,rgba(31,227,192,.12),transparent 60%)}
.cv-wrap{max-width:860px;margin:0 auto;position:relative;z-index:1}
.cv-wrap.narrow{max-width:520px}
.cv-mono{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;color:#8a90bd}
.cv-mono::before{content:"● ";color:#8c95ff}
.cv-h1{font-weight:900;text-transform:uppercase;letter-spacing:-.03em;font-size:clamp(2rem,7vw,3.2rem);margin:.3em 0 .4em;line-height:1;text-wrap:balance}
.cv-card{background:rgba(140,149,255,.07);border:1px solid rgba(140,149,255,.25);border-radius:24px;padding:clamp(20px,3vw,30px);-webkit-backdrop-filter:blur(30px);backdrop-filter:blur(30px);box-shadow:0 8px 32px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.12)}
.cv-form{display:grid;gap:14px}
.cv-label{display:grid;gap:6px}
.cv-input{padding:13px 18px;border-radius:16px;border:1px solid rgba(140,149,255,.36);background:rgba(140,149,255,.07);color:#f2f4ff;font-size:1rem;width:100%;box-sizing:border-box;font-family:inherit}
.cv-input:focus{outline:2px solid #8c95ff}
select.cv-input option{background:#0c1033}
.cv-row{display:grid;gap:14px;grid-template-columns:1fr 1fr}
@media(max-width:560px){.cv-row{grid-template-columns:1fr}}
.cv-btn{border:0;border-radius:999px;padding:13px 30px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;font-size:.85rem;color:#060821;cursor:pointer;background:#8c95ff;box-shadow:0 10px 24px -14px #8c95ff;font-family:inherit;text-decoration:none;display:inline-block;text-align:center}
.cv-ghost{border:1.5px solid #8c95ff;background:transparent;color:#8c95ff;border-radius:999px;padding:12px 26px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;font-size:.8rem;cursor:pointer;font-family:inherit;text-decoration:none;display:inline-block;text-align:center}
.cv-tabs{display:flex;gap:10px;margin:0 0 20px}
.cv-tab{flex:1;border-radius:999px;padding:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;font-size:.8rem;cursor:pointer;background:transparent;color:#8a90bd;border:1.5px solid rgba(140,149,255,.3);font-family:inherit}
.cv-tab[aria-pressed="true"]{background:#8c95ff;color:#060821;border-color:#8c95ff}
.cv-msg{margin:4px 0 0;font-size:.95rem}
.cv-msg.ok{color:#41ef96}.cv-msg.err{color:#fda4af}
.cv-top{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:18px}
.cv-top .spacer{flex:1}
.cv-stats{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));margin:0 0 22px}
.cv-stat b{font-size:2rem;display:block}
.cv-list{display:grid;gap:12px}
.cv-tablewrap{overflow-x:auto}
.cv-table{width:100%;border-collapse:collapse;font-size:.88rem}
.cv-table th{font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:#8a90bd;text-align:left;padding:8px}
.cv-table td{padding:10px 8px;border-top:1px solid rgba(140,149,255,.2);vertical-align:middle}
.cv-back{display:inline-block;color:#f2f4ff;text-decoration:none;font-size:.8rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px}
.cv-pass{position:relative;display:grid}
.cv-pass .cv-input{padding-right:52px}
.cv-eye{position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:0;cursor:pointer;font-size:1.15rem;color:#8a90bd;padding:6px;line-height:1}
`;async function p(o,a={}){const r=await fetch(o,{...a,headers:{"Content-Type":"application/json",...a.headers||{}}}),t=await r.json().catch(()=>({}));if(!r.ok)throw new Error(t.error||"Request failed ("+r.status+")");return t}function s({kicker:o,title:a,children:r,narrow:t}){return e.jsxs("div",{className:"cv-page",children:[e.jsx("style",{children:i}),e.jsxs("div",{className:"cv-wrap"+(t?" narrow":""),children:[e.jsx("a",{className:"cv-back",href:"#astro-association-template",children:"← Campus Voice home"}),e.jsx("p",{className:"cv-mono",children:o}),e.jsx("h1",{className:"cv-h1",children:a}),r]})]})}export{s as C,p as c};
