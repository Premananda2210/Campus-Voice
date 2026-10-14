import{j as r}from"./index-qJeYMfGm.js";const i=`
.cv-page{min-height:100svh;background:#060821;color:#f2f4ff;font-family:"Poppins","Montserrat",Archivo,Inter,system-ui,sans-serif;padding:32px 20px 80px;position:relative;overflow-x:hidden}
.cv-page::before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(700px 420px at 88% -4%,rgba(47,71,255,.3),transparent 60%),radial-gradient(620px 420px at -8% 100%,rgba(31,227,192,.12),transparent 60%)}
.cv-wrap{max-width:860px;margin:0 auto;position:relative;z-index:1}
.cv-wrap.narrow{max-width:520px}
.cv-mono{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;color:#8a90bd}
.cv-mono::before{content:"● ";color:#8c95ff}
.cv-h1{font-weight:900;text-transform:uppercase;letter-spacing:-.03em;font-size:clamp(2rem,7vw,3.2rem);margin:.3em 0 .4em;line-height:1;text-wrap:balance}
.cv-card{background:rgba(140,149,255,.07);border:1px solid rgba(140,149,255,.25);border-radius:24px;padding:clamp(20px,3vw,30px);-webkit-backdrop-filter:blur(30px);backdrop-filter:blur(30px);box-shadow:0 8px 32px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.12);transition:transform .25s ease,box-shadow .25s ease}
.cv-card:hover{transform:translateY(-4px);box-shadow:0 16px 44px rgba(0,0,0,.4),0 0 28px rgba(140,149,255,.25),inset 0 1px 0 rgba(255,255,255,.2)}
.cv-stat{position:relative;overflow:hidden}
.cv-stat::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s ease;background:radial-gradient(circle at 82% 12%,rgba(224,231,255,.5) 0 8px,transparent 9px),radial-gradient(circle at 68% 30%,rgba(56,189,248,.5) 0 13px,transparent 14px),radial-gradient(circle at 90% 44%,rgba(31,227,192,.45) 0 10px,transparent 11px),radial-gradient(circle at 76% 62%,rgba(140,149,255,.5) 0 15px,transparent 16px),radial-gradient(circle at 92% 78%,rgba(224,231,255,.4) 0 7px,transparent 8px),radial-gradient(circle at 60% 88%,rgba(56,189,248,.4) 0 9px,transparent 10px)}
.cv-stat:hover::before{opacity:1}
.cv-stat b{transition:transform .25s ease,color .25s ease}
.cv-stat:hover b{transform:scale(1.1);color:#8c95ff}
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
.cv-table tbody tr{transition:background .2s ease,box-shadow .2s ease}
.cv-table tbody tr:hover{background:rgba(140,149,255,.12);box-shadow:inset 3px 0 0 #8c95ff}
.cv-back{display:inline-block;color:#f2f4ff;text-decoration:none;font-size:.8rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px}
@media(prefers-reduced-motion:reduce){.cv-card,.cv-stat b,.cv-table tbody tr,.cv-stat::before{transition:none!important}}
.cv-band{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 360'%3E%3Crect width='900' height='360' fill='%232f47ff'/%3E%3Cg%3E%3Ccircle cx='60' cy='60' r='52' fill='%2338bdf8'/%3E%3Ccircle cx='170' cy='140' r='80' fill='%231fe3c0'/%3E%3Ccircle cx='300' cy='60' r='44' fill='%23e0e7ff'/%3E%3Ccircle cx='420' cy='150' r='95' fill='%2338bdf8'/%3E%3Ccircle cx='560' cy='60' r='55' fill='%238c95ff'/%3E%3Ccircle cx='700' cy='140' r='85' fill='%231fe3c0'/%3E%3Ccircle cx='830' cy='60' r='50' fill='%23e0e7ff'/%3E%3Ccircle cx='110' cy='280' r='70' fill='%238c95ff'/%3E%3Ccircle cx='260' cy='300' r='48' fill='%231e2a8a'/%3E%3Ccircle cx='380' cy='280' r='72' fill='%23e0e7ff'/%3E%3Ccircle cx='520' cy='300' r='50' fill='%231fe3c0'/%3E%3Ccircle cx='650' cy='280' r='75' fill='%2338bdf8'/%3E%3Ccircle cx='800' cy='300' r='55' fill='%231e2a8a'/%3E%3Ccircle cx='230' cy='200' r='30' fill='%23e0e7ff'/%3E%3Ccircle cx='480' cy='220' r='34' fill='%231e2a8a'/%3E%3Ccircle cx='760' cy='210' r='32' fill='%23e0e7ff'/%3E%3C/g%3E%3C/svg%3E");background-size:cover;background-position:center;border-radius:16px;padding:20px;margin-bottom:12px}
.cv-band .cv-id{font-weight:900;font-size:clamp(1.5rem,5vw,2.2rem);letter-spacing:-.02em;line-height:1;color:#f2f4ff;text-shadow:0 2px 14px rgba(6,8,33,.65);display:inline-block;transition:transform .3s ease}
.cv-card:hover .cv-band{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 120'%3E%3Crect width='400' height='120' fill='%232f47ff'/%3E%3Cg%3E%3Ccircle cx='40' cy='28' r='78' fill='%2335b6f2'/%3E%3Ccircle cx='300' cy='22' r='82' fill='%232fe6a6'/%3E%3Ccircle cx='140' cy='104' r='22' fill='%231e2a8a'/%3E%3Ccircle cx='200' cy='126' r='26' fill='%2335b6f2'/%3E%3Ccircle cx='55' cy='132' r='46' fill='%23ffffff'/%3E%3Ccircle cx='366' cy='90' r='32' fill='%23eef1ff'/%3E%3Ccircle cx='0' cy='62' r='10' fill='%23ffffff'/%3E%3C/g%3E%3C/svg%3E");background-size:cover;background-position:center}
.cv-card:hover .cv-band .cv-id{transform:scale(1.04)}
.cv-pass{position:relative;display:grid}
.cv-pass .cv-input{padding-right:52px}
.cv-eye{position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:0;cursor:pointer;font-size:1.15rem;color:#8a90bd;padding:6px;line-height:1}
`;async function n(c,a={}){const e=await fetch(c,{...a,headers:{"Content-Type":"application/json",...a.headers||{}}}),t=await e.json().catch(()=>({}));if(!e.ok)throw new Error(t.error||"Request failed ("+e.status+")");return t}function l({kicker:c,title:a,children:e,narrow:t}){return r.jsxs("div",{className:"cv-page",children:[r.jsx("style",{children:i}),r.jsxs("div",{className:"cv-wrap"+(t?" narrow":""),children:[r.jsx("a",{className:"cv-back",href:"#astro-association-template",children:"← Campus Voice home"}),r.jsx("p",{className:"cv-mono",children:c}),r.jsx("h1",{className:"cv-h1",children:a}),e]})]})}export{l as C,n as c};
