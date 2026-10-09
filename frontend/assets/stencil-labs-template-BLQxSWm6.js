import{r as x,j as e}from"./index-CdiR0C0d.js";function _(s,a,l){return Math.min(l,Math.max(a,s))}function Qe(s){return/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim())}function Ze(s){const a=_(s,0,1);return 1-Math.pow(1-a,3)}function Je(s,a){return Math.round(s*Ze(a))}function le(s){return(s<10?"0":"")+s}function Ae(s){const a=s.trim().split(/\s+/).filter(Boolean);return a.length?(a[0][0]+(a.length>1?a[a.length-1][0]:"")).toUpperCase():""}function ze(s,a=[1,.42,.1]){const l=s.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);if(!l)return a;let r=l[1];r.length===3&&(r=r[0]+r[0]+r[1]+r[1]+r[2]+r[2]);const i=parseInt(r,16);return[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]}function Re(s,a){return Math.max(0,s-Math.max(1,a))}function Me(s,a,l,r){const i=Re(l,r);if(i===0)return 0;const o=s+a;return o>i?0:o<0?i:o}function $e(s,a,l){return s.includes(a)?s.filter(r=>r!==a):l?[...s,a].sort((r,i)=>r-i):[a]}const es={A:"0,6 0,1.5 1.5,0 2.5,0 4,1.5 4,6|0,3.6 4,3.6",B:"0,0 3,0 4,1 4,2 3,3|0,3 3,3 4,4 4,5 3,6 0,6 0,0",C:"4,0 1,0 0,1 0,5 1,6 4,6",D:"0,0 0,6 3,6 4,5 4,1 3,0 0,0",E:"4,0 0,0 0,6 4,6|0,3 3,3",F:"4,0 0,0 0,6|0,3 3,3",G:"4,0 1,0 0,1 0,5 1,6 4,6 4,3 2,3",H:"0,0 0,6|4,0 4,6|0,3 4,3",I:"0.5,0 3.5,0|2,0 2,6|0.5,6 3.5,6",J:"1,0 4,0 4,5 3,6 1,6 0,5",K:"0,0 0,6|0,3 1.5,3 4,0|1.5,3 4,6",L:"0,0 0,6 4,6",M:"0,6 0,1 1,0 3,0 4,1 4,6|2,0 2,3.6",N:"0,6 0,0 4,6 4,0",O:"1,0 3,0 4,1 4,5 3,6 1,6 0,5 0,1 1,0",P:"0,6 0,0 3,0 4,1 4,2 3,3 0,3",Q:"1,0 3,0 4,1 4,5 3,6 1,6 0,5 0,1 1,0|2.6,4.6 4,6",R:"0,6 0,0 3,0 4,1 4,2 3,3 0,3|2,3 4,6",S:"4,0 1,0 0,1 0,2 1,3 3,3 4,4 4,5 3,6 0,6",T:"0,0 4,0|2,0 2,6",U:"0,0 0,5 1,6 3,6 4,5 4,0",V:"0,0 0,3.5 2,6 4,3.5 4,0",W:"0,0 0,5 1,6 3,6 4,5 4,0|2,6 2,2.4",X:"0,0 4,6|4,0 0,6",Y:"0,0 2,3 4,0|2,3 2,6",Z:"0,0 4,0 0,6 4,6",0:"1,0 3,0 4,1 4,5 3,6 1,6 0,5 0,1 1,0",1:"0.5,1.5 2,0 2,6|0.5,6 3.5,6",2:"0,1 1,0 3,0 4,1 4,2 0,6 4,6",3:"0,0 4,0 2,2.6 3,2.6 4,3.6 4,5 3,6 0,6",4:"3,6 3,0 0,4 4,4",5:"4,0 0,0 0,2.6 3,2.6 4,3.6 4,5 3,6 0,6",6:"3.5,0 1,0 0,1 0,5 1,6 3,6 4,5 4,3.6 3,2.6 0,2.6",7:"0,0 4,0 1.5,6",8:"1,0 3,0 4,1 4,2 3,3 1,3 0,2 0,1 1,0|1,3 3,3 4,4 4,5 3,6 1,6 0,5 0,4 1,3",9:"0.5,6 3,6 4,5 4,1 3,0 1,0 0,1 0,2.4 1,3.4 4,3.4",".":"1.6,5.4 2.4,5.4",",":"2,5.2 1.4,6.6","-":"0.6,3.2 3.4,3.2","/":"0.4,6 3.6,0",":":"1.6,1.8 2.4,1.8|1.6,5.4 2.4,5.4","!":"2,0 2,3.8|1.6,5.4 2.4,5.4","?":"0,1 1,0 3,0 4,1 4,2 2,3.6 2,4.2|1.6,5.4 2.4,5.4","'":"2,0 2,1.8","&":"4,6 0.6,2.4 0.6,1 1.6,0 2.6,0 3.4,1 3.4,1.8 0,4.2 0,5 1,6 2.4,6 4,3.4","+":"2,1.4 2,4.6|0.4,3 3.6,3","#":"1.3,0.5 1.3,5.5|2.7,0.5 2.7,5.5|0,2 4,2|0,4 4,4"},ss={I:4,".":2.4,",":2.4,":":2.4,"!":2.4,"'":2.4,1:4};function ts(s){return s.split("|").map(a=>a.trim().split(/\s+/).map(l=>l.split(",").map(Number)))}function fe(s,a=1.25,l=2.6){const r=[];let i=0,o=!0;for(const f of s.toUpperCase()){const c=es[f];if(o||(i+=a),o=!1,!c){i+=l;continue}const u=ss[f]??4,d=u<4?-(4-u)/2:0;for(const p of ts(c))r.push(p.map(([m,y])=>[m+i+d,y]));i+=u}return{lines:r,width:Math.max(0,i)}}function rs(s,a,l){const r=l[0]-a[0],i=l[1]-a[1],o=r*r+i*i,f=o?_(((s[0]-a[0])*r+(s[1]-a[1])*i)/o,0,1):0;return Math.hypot(s[0]-(a[0]+f*r),s[1]-(a[1]+f*i))}function ne(s,a){const l=Math.hypot(a[0]-s[0],a[1]-s[1])||1;return[(a[0]-s[0])/l,(a[1]-s[1])/l]}const xe=(s,a)=>Math.abs(s[0]-a[0])<1e-6&&Math.abs(s[1]-a[1])<1e-6;function as(s,a,l){const r=a/2,i=(c,u,d)=>{const p=ne(c,u),m=ne(u,d);return p[0]*m[0]+p[1]*m[1]<.34},o=(c,u)=>{let d="";return s.forEach((p,m)=>{if(!(m===u||d==="cut"||p.length<2)){if(xe(c,p[0])||xe(c,p[p.length-1])){d||(d=m<u?"cut":"own");return}for(let y=0;y<p.length-1;y++)rs(c,p[y],p[y+1])<.001&&(d="cut")}}),d},f=[];return s.forEach((c,u)=>{if(c.length<2)return;let d=c,p=o(c[0],u),m=o(c[c.length-1],u);if(c.length>2&&xe(c[0],c[c.length-1])){const g=c.slice(0,-1),b=g.length,M=g.findIndex((j,w)=>i(g[(w-1+b)%b],j,g[(w+1)%b]));if(M<0){f.push({pts:g,closed:!0});return}d=[...g.slice(M),...g.slice(0,M),g[M]],p="own",m="cut"}const y=[];let v=[d[0]],A=p;for(let g=1;g<d.length;g++)v.push(d[g]),g<d.length-1&&i(d[g-1],d[g],d[g+1])&&(y.push({pts:v,head:A,tail:"cut"}),v=[d[g]],A="own");y.push({pts:v,head:A,tail:m});for(const g of y){const b=g.pts.map(k=>[k[0],k[1]]),M=b.length,j=ne(b[0],b[1]),w=ne(b[M-2],b[M-1]),z=g.head==="own"?-r:g.head==="cut"?r+l:0,q=g.tail==="own"?-r:g.tail==="cut"?r+l:0;b[0]=[b[0][0]+j[0]*z,b[0][1]+j[1]*z],b[M-1]=[b[M-1][0]-w[0]*q,b[M-1][1]-w[1]*q],f.push({pts:b,closed:!1})}}),f}function Ee(s){const a=l=>Math.round(l*1e3)/1e3;return s.pts.map((l,r)=>(r?"L":"M")+a(l[0])+" "+a(l[1])).join("")+(s.closed?"Z":"")}function ls(s,a,l){let r=2166136261;for(const p of s)r=Math.imul(r^p.charCodeAt(0),16777619);const i=p=>((r>>>p*3&1023)/1023-.5)*2,o=.5+i(0)*.05,f=.37+i(1)*.02,c=.185+i(2)*.015,u=.44+i(3)*.05,d=[];for(let p=0;p<l;p++)for(let m=0;m<a;m++){const y=(m+.5)/a,v=(p+.5)/l,A=1-Math.hypot((y-o)/c,(v-f)/(c*1.22)),g=Math.abs(y-(o+.5)/2)<.1&&v>f&&v<.7?.6:-1,b=1-Math.hypot((y-.5)/u,(v-.95)/.28),M=Math.max(A*4,g,b*3),j=.42+.58*_(1-(y-.2)*.9-(v-.25)*.35,0,1),w=.06+.08*(1-v);d.push(Math.round((M>0?_(M,0,1)*j+(1-_(M,0,1))*w:w)*100)/100)}return d}const ns={lines:["Build what","comes next"],eyebrow:"Incubator · Accelerator · Est. 2021",description:"Capital, engineering hours and a network that picks up the phone — for early teams shipping open infrastructure.",cta:{label:"Apply now",href:"#subscribe"},secondary:{label:"Read the thesis",href:"#faq"},stats:[{value:64,suffix:"+",label:"Teams backed"},{value:120,prefix:"$",suffix:"M",label:"Follow-on raised"},{value:18,label:"Countries"}],shape:"rings"},is=[{name:"Ines Okoro",role:"Managing Partner",bio:"Two exits in payments infrastructure. Runs the investment committee and still reviews every first call."},{name:"Theo Brandt",role:"Head of Engineering",bio:"Ex-protocol lead. Pairs with every resident team on architecture, audits and the first production deploy."},{name:"Mara Lindqvist",role:"Venture Lead",bio:"Sources the pipeline and reads every deck. Previously in growth at two developer-tool startups."},{name:"Kenji Sato",role:"Platform & Community",bio:"Runs office hours, the founder network and demo day. Knows who to call for almost anything."}],os=[{question:"What is the incubation program?",answer:"A twelve-week residency for pre-seed teams. You get a technical partner, weekly reviews with founders who have shipped, and a standing budget for audits and infrastructure."},{question:"What is the acceleration program?",answer:"For teams with a live product. We put capital, go-to-market support and introductions to follow-on investors behind your next six months."},{question:"Which verticals are you investing in?",answer:"Developer infrastructure, payments, data availability, privacy tooling and the consumer apps that sit on top of them."},{question:"What is your investment thesis?",answer:"Open infrastructure compounds. We back small, technical teams building primitives other builders depend on — and we stay hands-on long after the cheque."},{question:"In which stages are you investing?",answer:"Our investments focus on the pre-launch stages, where we offer extensive resources and guidance to help startups achieve a successful launch and sustainable growth."},{question:"Who should apply for the acceleration and incubation programs?",answer:"Founding teams of two to six with a working prototype or a sharp technical insight. Solo founders are welcome if they are already building."},{question:"How do you differentiate from other investment firms?",answer:"Engineers on staff, not just partners. Every resident team gets weekly code review, security support and a direct line to the people who wrote the specs."}],cs=[{title:"Field notes: shipping a protocol with three engineers",author:"Lena Park",category:"Weekly",date:"September 22, 2026",cover:"bot",kicker:"Field notes"},{title:"Announcing Nullpoint Labs: backing the builders of next year",author:"Ines Okoro",category:"Announcements",date:"August 30, 2026",cover:"stack",kicker:"Backing tomorrow"},{title:"What we learned reading 400 decks this summer",author:"Mara Lindqvist",category:"Research",date:"August 12, 2026",cover:"orbs",kicker:"Research"},{title:"Open office hours are back, every Thursday",author:"Kenji Sato",category:"Community",date:"July 28, 2026",cover:"jack",kicker:"Office hours"}],ds=[{title:"Ecosystem",links:[{label:"Portfolio",href:"#"},{label:"Residency",href:"#"},{label:"Grants",href:"#"}]},{title:"Quick links",links:[{label:"Home",href:"#"},{label:"Apply now",href:"#subscribe"},{label:"Careers",href:"#"}]},{title:"Legal",links:[{label:"Privacy Policy",href:"#"},{label:"Cookie Policy",href:"#"},{label:"Terms of Service",href:"#"}]}],ps=[{label:"Telegram",href:"#"},{label:"X / Twitter",href:"#"},{label:"LinkedIn",href:"#"},{label:"Medium",href:"#"}],hs=[{label:"Team",href:"#team"},{label:"FAQ",href:"#faq"},{label:"News",href:"#news"},{label:"Contact",href:"#subscribe"}],us={title:"Subscribe to be in touch*",placeholder:"Your e-mail",note:"*Only valuable resources",cta:"Subscribe"},xs=`
.sl-root{--sl-accent:#ff6a1a;--sl-paper:var(--sl-paper-light,#e3e3e0);--sl-cell:#f4f4f2;--sl-ink:#111110;--sl-soft:#474744;--sl-muted:#7c7c77;--sl-line:rgba(17,17,16,.2);--sl-faint:rgba(17,17,16,.06);--sl-on-accent:#111110;--sl-cover:#e6e6e3;--sl-err:#c2410c;--sl-font:"JetBrains Mono","IBM Plex Mono","Roboto Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;position:relative;width:100%;box-sizing:border-box;background:var(--sl-paper);color:var(--sl-ink);font-family:var(--sl-font);font-size:13px;line-height:1.55;letter-spacing:-.01em;padding:0 clamp(14px,4vw,48px);-webkit-font-smoothing:antialiased;transition:background-color .45s ease,color .45s ease}
.sl-root[data-theme="dark"]{--sl-paper:#121211;--sl-cell:#1c1c1b;--sl-ink:#ecebe6;--sl-soft:#bdbcb6;--sl-muted:#8a8984;--sl-line:rgba(236,235,230,.14);--sl-faint:rgba(236,235,230,.05);--sl-cover:#232322;--sl-err:#fb923c}
.sl-root :where(*){box-sizing:border-box}
.sl-root ::selection{background:var(--sl-accent);color:var(--sl-on-accent)}
.sl-root :focus-visible{outline:2px solid var(--sl-accent);outline-offset:2px}
.sl-root :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-align:inherit;letter-spacing:inherit}
.sl-root :where(a){color:inherit;text-decoration:none}
.sl-root :where(svg,canvas,img){display:block;max-width:none}
.sl-root :where(h1,h2,h3,p,ul,li,figure,dl,dd,dt){margin:0;padding:0;font-size:inherit;font-weight:inherit;list-style:none}
.sl-root :where(input){font:inherit;color:inherit;margin:0;border-radius:0}
.sl-root [data-sl]{scroll-margin-top:61px}
.sl-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

.sl-frame{position:relative;max-width:var(--sl-max,1180px);margin:0 auto;border-left:1px solid var(--sl-line);border-right:1px solid var(--sl-line);container-type:inline-size}
.sl-row{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-flow:row dense;gap:1px;background:var(--sl-line);border-bottom:1px solid var(--sl-line);transition:background-color .45s}
.sl-c{position:relative;min-width:0;background:var(--sl-paper);padding:18px 20px;transition:background-color .45s}
.sl-fill{background:var(--sl-cell)}
.sl-s2{grid-column:span 2}.sl-s3{grid-column:span 3}.sl-s4{grid-column:span 4}
.sl-spacer .sl-c{height:clamp(22px,4cqw,40px);padding:0}
@container (max-width:759px){.sl-row{grid-template-columns:repeat(2,minmax(0,1fr))}.sl-s3,.sl-s4{grid-column:span 2}.sl-spacer .sl-c:nth-child(n+3){display:none}.sl-m2{grid-column:span 2}}

.sl-label{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--sl-muted)}
.sl-sq{display:inline-block;width:6px;height:6px;background:currentColor;margin-right:8px;vertical-align:.12em}

.sl-brk{--b:var(--sl-muted);background:linear-gradient(var(--b),var(--b)) top left/9px 1px no-repeat,linear-gradient(var(--b),var(--b)) top left/1px 9px no-repeat,linear-gradient(var(--b),var(--b)) top right/9px 1px no-repeat,linear-gradient(var(--b),var(--b)) top right/1px 9px no-repeat,linear-gradient(var(--b),var(--b)) bottom left/9px 1px no-repeat,linear-gradient(var(--b),var(--b)) bottom left/1px 9px no-repeat,linear-gradient(var(--b),var(--b)) bottom right/9px 1px no-repeat,linear-gradient(var(--b),var(--b)) bottom right/1px 9px no-repeat}
.sl-brk-a{--b:var(--sl-accent)}

.sl-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;height:34px;padding:0 16px;background:var(--sl-accent);color:var(--sl-on-accent);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px);transition:transform .25s cubic-bezier(.2,.8,.2,1),filter .2s}
.sl-btn:hover{transform:translateY(-2px);filter:brightness(1.06)}
.sl-btn:active{transform:none}
.sl-btn[disabled]{cursor:progress;filter:saturate(.6)}
.sl-ghost{display:inline-flex;align-items:center;gap:10px;height:34px;padding:0 14px;border:1px solid var(--sl-ink);font-size:11px;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;transition:background-color .2s,color .2s}
.sl-ghost:hover{background:var(--sl-ink);color:var(--sl-paper)}
.sl-arr{display:inline-block;transition:transform .25s cubic-bezier(.2,.8,.2,1)}
.sl-btn:hover .sl-arr,.sl-ghost:hover .sl-arr,.sl-blog:hover .sl-arr{transform:translateX(3px)}

.sl-stencil{display:block;fill:none;stroke:currentColor}
.sl-stencil path{stroke-linecap:butt;stroke-linejoin:miter}

/* nav */
.sl-nav{position:sticky;top:0;z-index:5}
.sl-nav .sl-c{display:flex;align-items:center;min-height:60px;padding-top:10px;padding-bottom:10px;background:color-mix(in oklab,var(--sl-paper) 88%,transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.sl-brand{display:flex;align-items:center;gap:10px}
.sl-brand-mark{width:26px;height:26px;color:var(--sl-ink)}
.sl-brand-name{font-size:8.5px;line-height:1;letter-spacing:.02em;margin-bottom:3px}
.sl-links{display:flex;gap:clamp(14px,2.6cqw,30px);justify-content:center}
.sl-link{position:relative;font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:4px 0}
.sl-link::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--sl-accent);transform:scaleX(0);transform-origin:right;transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.sl-link:hover::after{transform:scaleX(1);transform-origin:left}
.sl-act{justify-content:flex-end;gap:10px}
.sl-icon{display:grid;place-items:center;width:34px;height:34px;border:1px solid var(--sl-line);transition:border-color .2s,background-color .2s}
.sl-icon:hover{border-color:var(--sl-ink)}
.sl-menu-btn{display:none}
.sl-nav .sl-drawer{display:none}
@container (max-width:759px){.sl-links-c{display:none !important}.sl-menu-btn{display:grid}.sl-nav-cta{display:none}.sl-nav .sl-drawer[data-open="true"]{display:grid;grid-column:span 2;gap:0;padding:6px 20px 14px}.sl-drawer a{padding:10px 0;border-bottom:1px solid var(--sl-line);font-size:12px;letter-spacing:.1em;text-transform:uppercase}}

/* hero */
.sl-hero-type{display:flex;flex-direction:column;justify-content:center;gap:clamp(10px,1.6cqw,18px);padding:clamp(26px,5cqw,64px) clamp(20px,3.5cqw,44px);min-height:clamp(220px,34cqw,400px)}
.sl-hero-type svg{height:auto;color:var(--sl-ink)}
.sl-clay{position:relative;min-height:220px;padding:0;overflow:hidden;cursor:grab;touch-action:pan-y}
.sl-clay[data-drag="true"]{cursor:grabbing}
.sl-clay-in{position:absolute;inset:14px}
.sl-clay-gl{position:absolute;inset:0}
.sl-clay canvas{position:absolute;inset:0;width:100%;height:100%;max-width:none}
.sl-clay-hint{position:absolute;left:14px;bottom:10px;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--sl-muted);pointer-events:none;transition:opacity .4s}
.sl-clay:hover .sl-clay-hint{opacity:0}
.sl-fallback{position:absolute;inset:0;display:grid;place-items:center;color:var(--sl-muted)}
.sl-hero-desc{display:flex;flex-direction:column;gap:16px;justify-content:space-between;padding:24px clamp(20px,3cqw,32px)}
.sl-hero-desc p{max-width:52ch;color:var(--sl-soft);font-size:13.5px}
.sl-ctas{display:flex;flex-wrap:wrap;gap:10px}
.sl-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding:0}
.sl-stat{display:flex;flex-direction:column;justify-content:space-between;gap:24px;padding:24px 20px;border-left:1px solid var(--sl-line)}
.sl-stat:first-child{border-left:0}
.sl-stat-v{font-size:clamp(26px,3.6cqw,40px);line-height:1;letter-spacing:-.04em;font-variant-numeric:tabular-nums}
.sl-stat-v i{font-style:normal;color:var(--sl-accent)}

/* section heads */
.sl-head{display:flex;align-items:center;padding:clamp(20px,3cqw,30px) clamp(20px,3cqw,48px);min-height:clamp(84px,11cqw,124px)}
.sl-head svg{width:auto;height:clamp(28px,4.4cqw,48px);color:var(--sl-ink)}
.sl-intro{display:flex;flex-direction:column;justify-content:center;gap:6px;padding-left:clamp(20px,6cqw,90px)}
.sl-intro h3{font-size:14px;letter-spacing:.01em}
.sl-intro p{font-size:11px;color:var(--sl-muted);max-width:46ch}
.sl-bracket-cell{padding:12px}
.sl-bracket-cell>.sl-brk{position:absolute;inset:12px}
.sl-jack{min-height:96px}
.sl-jack .sl-clay-in{inset:12px}
.sl-mark{position:absolute;z-index:2;width:22px;height:22px;display:grid;place-items:center;background:var(--sl-paper);border:1px solid var(--sl-line);color:var(--sl-muted);transition:color .2s,border-color .2s,transform .3s}
.sl-mark:hover{color:var(--sl-ink);border-color:var(--sl-ink)}
.sl-mark-l{left:-34px;top:-12px}
.sl-mark-r{right:9px;top:9px}
@container (max-width:900px){.sl-mark-l{display:none}}

/* team */
.sl-team-c{display:flex;flex-direction:column;gap:14px;padding:16px}
.sl-portrait{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--sl-cell);border:1px solid var(--sl-line)}
.sl-portrait svg,.sl-portrait img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover}
.sl-portrait img{filter:grayscale(1) contrast(1.05);transition:filter .5s,transform .8s cubic-bezier(.2,.7,.2,1)}
.sl-team-c:hover .sl-portrait img{filter:grayscale(0);transform:scale(1.03)}
.sl-dots circle{fill:var(--sl-ink);transition:fill .5s}
.sl-team-c:hover .sl-dots circle{fill:var(--sl-accent)}
.sl-ini{position:absolute;left:10px;top:10px;padding:3px 6px;background:var(--sl-paper);font-size:10px;letter-spacing:.1em;border:1px solid var(--sl-line)}
.sl-bio{position:absolute;inset:auto 0 0 0;padding:16px;background:var(--sl-ink);color:var(--sl-paper);font-size:12px;line-height:1.55;transform:translateY(101%);transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.sl-bio[data-open="true"]{transform:none}
.sl-bio a{display:inline-block;margin-top:10px;color:var(--sl-accent);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase}
.sl-member h3{font-size:13.5px}
.sl-member p{font-size:11px;color:var(--sl-muted);letter-spacing:.04em}
.sl-biobtn{display:flex;align-items:center;justify-content:center;gap:6px;height:38px;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;transition:background-color .2s}
.sl-biobtn:hover{background:var(--sl-faint)}
.sl-biobtn b{font-weight:400;color:var(--sl-accent);font-size:14px;line-height:1;display:inline-block;transition:transform .4s cubic-bezier(.2,.8,.2,1)}
.sl-biobtn[aria-expanded="true"] b{transform:rotate(45deg)}
.sl-count{display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;text-align:right}
.sl-count strong{font-size:clamp(30px,4.4cqw,48px);font-weight:400;line-height:1;letter-spacing:-.05em}

/* faq */
.sl-q{display:flex;align-items:center;gap:20px;width:100%;padding:12px clamp(20px,2.6cqw,22px) 12px clamp(20px,2.6cqw,22px);min-height:clamp(52px,6cqw,62px);font-size:12.5px;transition:background-color .25s}
.sl-q:hover{background:var(--sl-faint)}
.sl-q>span:nth-child(2){flex:1}
.sl-qn{flex:none;width:24px;color:var(--sl-muted);font-size:10.5px}
.sl-tog{flex:none;display:grid;place-items:center;width:28px;height:28px;background:var(--sl-accent);color:var(--sl-on-accent);clip-path:polygon(5px 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%,0 5px);transition:transform .25s}
.sl-q:hover .sl-tog{transform:scale(1.08)}
.sl-tog svg{transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.sl-q[aria-expanded="true"] .sl-tog svg{transform:rotate(135deg)}
.sl-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.2,.8,.2,1)}
.sl-a[data-open="true"]{grid-template-rows:1fr}
.sl-a>div{overflow:hidden}
.sl-a p{padding:0 clamp(20px,2.6cqw,22px) 22px clamp(64px,6cqw,66px);max-width:96ch;color:var(--sl-muted);font-size:12px;line-height:1.7;opacity:0;transform:translateY(-6px);transition:opacity .35s,transform .45s cubic-bezier(.2,.8,.2,1)}
.sl-a[data-open="true"] p{opacity:1;transform:none;transition-delay:.08s}
.sl-faq .sl-c{padding:0}

/* news */
.sl-blog-wrap{display:flex;align-items:center;justify-content:center}
.sl-blog{display:inline-flex;flex-direction:column;align-items:flex-start;gap:0}
.sl-blog span:first-child{padding:6px 10px;background:var(--sl-cell);border:1px solid var(--sl-line);font-size:10.5px}
.sl-blog span:last-child{display:grid;place-items:center;width:22px;height:22px;background:var(--sl-ink);color:var(--sl-paper)}
.sl-news-c{padding:0}
.sl-vp{overflow:hidden}
.sl-track{display:flex;transition:transform .7s cubic-bezier(.2,.8,.2,1);touch-action:pan-y}
.sl-card{flex:none;width:calc(100% / var(--per,2));padding:clamp(24px,5cqw,60px) clamp(20px,6cqw,62px) clamp(28px,4.4cqw,52px);border-right:1px solid var(--sl-line);transition:opacity .5s}
.sl-card[aria-hidden="true"]{opacity:.35}
.sl-cover{position:relative;display:block;aspect-ratio:16/9;overflow:hidden;background:var(--sl-cover);border:1px solid var(--sl-line);transition:border-color .3s}
.sl-cover img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;transition:transform .9s cubic-bezier(.2,.7,.2,1),opacity .6s;opacity:0}
.sl-cover img[data-ready="true"]{opacity:1}
.sl-card:hover .sl-cover img{transform:scale(1.045)}
.sl-card:hover .sl-cover{border-color:var(--sl-ink)}
.sl-chrome{position:absolute;left:10px;top:10px;display:flex;align-items:center;gap:0;font-size:8.5px;background:var(--sl-paper);border:1px solid var(--sl-line);z-index:1}
.sl-chrome>*{display:flex;align-items:center;height:20px;padding:0 7px;border-left:1px solid var(--sl-line)}
.sl-chrome>*:first-child{border-left:0}
.sl-kicker{position:absolute;left:12px;bottom:12px;z-index:1;color:var(--sl-ink)}
.sl-kicker svg{height:clamp(12px,1.7cqw,18px);width:auto}
.sl-card h3{margin-top:18px;font-size:clamp(13px,1.35cqw,15px);line-height:1.4;min-height:2.8em}
.sl-card h3 a{background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .45s cubic-bezier(.2,.8,.2,1)}
.sl-card:hover h3 a{background-size:100% 1px}
.sl-by{display:flex;align-items:center;gap:8px;margin-top:clamp(18px,3cqw,36px);font-size:10.5px;color:var(--sl-muted)}
.sl-by b{font-weight:400;color:var(--sl-ink)}
.sl-av{display:grid;place-items:center;width:18px;height:18px;background:var(--sl-ink);color:var(--sl-paper);font-size:7.5px;letter-spacing:.02em}
.sl-meta{display:flex;justify-content:space-between;gap:12px;margin-top:10px;padding:10px 0 8px;border-top:1px solid var(--sl-line);border-bottom:1px solid var(--sl-line);font-size:10.5px}
.sl-pager{position:absolute;left:-28px;top:50%;z-index:3;display:flex;flex-direction:column;transform:translateY(-50%);background:var(--sl-paper);border:1px solid var(--sl-line)}
.sl-pager button{display:grid;place-items:center;width:40px;height:40px;transition:background-color .2s,color .2s}
.sl-pager button+button{border-top:1px solid var(--sl-line)}
.sl-pager button:hover{background:var(--sl-ink);color:var(--sl-paper)}
.sl-progress{position:absolute;right:16px;bottom:12px;display:flex;align-items:center;gap:10px;font-size:10px;color:var(--sl-muted);font-variant-numeric:tabular-nums}
.sl-progress i{display:block;width:clamp(60px,10cqw,120px);height:1px;background:var(--sl-line);position:relative;overflow:hidden}
.sl-progress i::after{content:"";position:absolute;inset:0;background:var(--sl-accent);transform-origin:left;transform:scaleX(var(--p,0));transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.sl-auto[data-on="true"] svg{animation:sl-spin 3s linear infinite}
@container (max-width:900px){.sl-pager{left:16px;top:auto;bottom:10px;flex-direction:row;transform:none}.sl-pager button+button{border-top:0;border-left:1px solid var(--sl-line)}.sl-card{padding-bottom:76px}.sl-progress{bottom:24px}}

/* subscribe */
.sl-sub{display:flex;flex-direction:column;justify-content:center;gap:16px;padding:22px clamp(20px,1.6cqw,20px)}
.sl-sub h3{font-size:12.5px}
.sl-field{display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--sl-soft);padding:4px 0 8px;transition:border-color .2s}
.sl-field:focus-within{border-color:var(--sl-accent)}
.sl-field input{flex:1;min-width:0;background:none;border:0;outline:0;font-size:12px;padding:2px 0}
.sl-field input::placeholder{color:var(--sl-muted)}
.sl-msg{min-height:1.4em;font-size:10.5px;color:var(--sl-muted)}
.sl-msg[data-tone="error"]{color:var(--sl-err)}
.sl-msg[data-tone="done"]{color:var(--sl-ink)}
.sl-sub-side{display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;gap:18px;padding:22px 20px}
.sl-sub-side .sl-label{font-size:8.5px}
.sl-spin{width:12px;height:12px;border:1.5px solid currentColor;border-right-color:transparent;border-radius:50%;animation:sl-spin .7s linear infinite}

/* footer */
.sl-col{display:flex;flex-direction:column;gap:14px;padding:30px 20px 34px}
.sl-col ul{display:flex;flex-direction:column;gap:9px}
.sl-col a{font-size:11px;transition:color .2s}
.sl-col a:hover{color:var(--sl-accent)}
.sl-soc{align-items:flex-end;text-align:right}
.sl-soc a{display:inline-flex;align-items:center;gap:6px;font-size:10px;letter-spacing:.12em;text-transform:uppercase}
.sl-soc a svg{transition:transform .25s cubic-bezier(.2,.8,.2,1)}
.sl-soc a:hover svg{transform:translate(2px,-2px)}
.sl-legal .sl-c{display:flex;align-items:center;min-height:62px;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--sl-soft)}
.sl-top{display:inline-flex;align-items:center;gap:8px;margin-left:auto;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;transition:color .2s}
.sl-top:hover{color:var(--sl-accent)}

/* wordmark */
.sl-word{grid-template-columns:repeat(var(--n,4),minmax(0,1fr)) !important;margin-bottom:clamp(20px,4cqw,40px)}
.sl-word .sl-c{display:grid;place-items:center;padding:clamp(10px,2.4cqw,26px) clamp(6px,1.6cqw,18px);cursor:default}
.sl-word svg{width:100%;height:auto;max-height:clamp(90px,24cqw,260px);color:var(--sl-ink)}
.sl-word path{stroke-linejoin:round;stroke-linecap:square;transition:stroke-width .55s cubic-bezier(.2,.8,.2,1),stroke .4s}
.sl-word .sl-c:hover path{stroke-width:var(--thin);stroke:var(--sl-accent)}
.sl-corner{position:absolute;width:7px;height:7px;background:var(--sl-accent);z-index:2;pointer-events:none}

.sl-rise{animation:sl-rise .9s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--i,0) * 80ms)}
@keyframes sl-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes sl-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.sl-rise,.sl-spin,.sl-auto[data-on="true"] svg{animation:none}.sl-root *{transition-duration:.01ms !important}}
`;function W({text:s,sw:a=1,gap:l=.34,tracking:r=1.3,label:i,className:o,style:f}){const{strokes:c,width:u}=x.useMemo(()=>{const p=fe(s,r);return{strokes:as(p.lines,a,l),width:p.width}},[s,a,l,r]),d=a/2;return e.jsx("svg",{className:"sl-stencil"+(o?" "+o:""),viewBox:[-d,-d,u+a,6+a].map(p=>Math.round(p*100)/100).join(" "),role:"img","aria-label":i??s,style:f,children:e.jsx("path",{d:c.map(Ee).join(""),strokeWidth:a})})}function ms({text:s,sw:a=1.55}){const{d:l,width:r}=x.useMemo(()=>{const o=fe(s,1.4);return{d:o.lines.map(f=>Ee({pts:f,closed:!1})).join(""),width:o.width}},[s]),i=a/2;return e.jsx("svg",{className:"sl-stencil",viewBox:[-i,-i,r+a,6+a].join(" "),"aria-hidden":"true",style:{"--thin":String(a*.42)},children:e.jsx("path",{d:l,strokeWidth:a})})}function fs({className:s}){return e.jsxs("svg",{className:s,viewBox:"0 0 26 26",fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:"M5 2h16l3 3v16l-3 3H5l-3-3V5z",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("rect",{x:"8",y:"10",width:"3.2",height:"5.5",fill:"currentColor"}),e.jsx("rect",{x:"14.8",y:"10",width:"3.2",height:"5.5",fill:"var(--sl-accent)"})]})}function Ce({name:s,word:a}){return e.jsxs("span",{className:"sl-brand",children:[e.jsx(fs,{className:"sl-brand-mark"}),e.jsxs("span",{children:[e.jsx("span",{className:"sl-brand-name",style:{display:"block"},children:s}),e.jsx(W,{text:a,sw:1.1,gap:.4,style:{height:13,width:"auto"}})]})]})}const gs=()=>e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12","aria-hidden":"true",children:e.jsx("path",{d:"M6 0v12M0 6h12",stroke:"currentColor",strokeWidth:"1.5"})}),ie=({dir:s=1})=>e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",style:{transform:s<0?"scaleX(-1)":void 0},children:e.jsx("path",{d:"M1 6h9M6.5 2.5 10 6l-3.5 3.5",stroke:"currentColor",strokeWidth:"1.5"})}),vs=()=>e.jsx("svg",{width:"8",height:"8",viewBox:"0 0 8 8",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M1.5 6.5 6.5 1.5M2.5 1.5h4v4",stroke:"currentColor",strokeWidth:"1.3"})}),bs=`#version 300 es
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.0-1.0,0.0,1.0);}`,ws=`#version 300 es
precision highp float;
uniform vec2 uRes;uniform float uTime;uniform vec2 uRot;uniform int uShape;uniform vec3 uAccent;uniform vec3 uBg;uniform float uFloor;uniform float uZoom;
out vec4 outColor;
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,s,-s,c);}
float sdBox(vec3 p,vec3 b,float r){vec3 q=abs(p)-b+r;return length(max(q,0.0))+min(max(q.x,max(q.y,q.z)),0.0)-r;}
float sdCyl(vec3 p,float h,float r,float rr){vec2 d=vec2(length(p.xz)-r+rr,abs(p.y)-h+rr);return min(max(d.x,d.y),0.0)+length(max(d,0.0))-rr;}
float sdTorus(vec3 p,vec2 t){vec2 q=vec2(length(p.xz)-t.x,p.y);return length(q)-t.y;}
float smin(float a,float b,float k){float h=clamp(0.5+0.5*(b-a)/k,0.0,1.0);return mix(b,a,h)-k*h*(1.0-h);}
vec2 U(vec2 a,vec2 b){return a.x<b.x?a:b;}
float tube(vec3 p){float o=sdCyl(p,1.0,0.33,0.09);return max(o,-(length(p.xz)-0.165));}
vec2 jack(vec3 p){float d=smin(smin(tube(p),tube(p.yxz),0.05),tube(p.xzy),0.05);d=smin(d,sdBox(p,vec3(0.37),0.12),0.05);return vec2(d,0.0);}
vec2 rings(vec3 p){
  vec2 r=vec2(sdTorus(p-vec3(-0.78,0.0,0.0),vec2(0.52,0.15)),0.0);
  vec3 q=p;q.yz=rot(1.5708)*q.yz;r=U(r,vec2(sdTorus(q,vec2(0.52,0.15)),1.0));
  vec3 w=p-vec3(0.78,0.0,0.0);r=U(r,vec2(sdTorus(w,vec2(0.52,0.15)),0.0));
  return r;}
vec2 bot(vec3 p){
  vec3 h=p-vec3(0.0,0.26,0.0);
  vec2 r=vec2(sdBox(h,vec3(0.78,0.6,0.56),0.26),0.0);
  r=U(r,vec2(sdBox(h-vec3(0.0,0.0,0.47),vec3(0.64,0.47,0.12),0.18),1.0));
  r=U(r,vec2(sdBox(h-vec3(0.0,0.0,0.53),vec3(0.54,0.38,0.1),0.15),2.0));
  vec3 e=h-vec3(0.0,0.02,0.64);e.x=abs(e.x)-0.2;
  r=U(r,vec2(sdBox(e,vec3(0.065,0.1,0.03),0.05),3.0));
  vec3 ear=h;ear.x=abs(ear.x)-0.8;r=U(r,vec2(sdCyl(ear.yxz,0.1,0.2,0.05),1.0));
  r=U(r,vec2(sdCyl(h-vec3(0.0,0.72,0.0),0.14,0.035,0.01),0.0));
  r=U(r,vec2(length(h-vec3(0.0,0.9,0.0))-0.085,1.0));
  r=U(r,vec2(sdCyl(p-vec3(0.0,-0.4,0.0),0.14,0.17,0.04),2.0));
  r=U(r,vec2(sdBox(p-vec3(0.0,-0.78,0.0),vec3(0.44,0.28,0.34),0.17),0.0));
  return r;}
vec2 stack(vec3 p){
  vec2 r=vec2(sdBox(p-vec3(0.0,-0.55,0.0),vec3(0.52),0.13),0.0);
  vec3 q=p-vec3(0.08,0.29,0.02);q.xz=rot(0.55)*q.xz;q.xy=rot(0.1)*q.xy;
  r=U(r,vec2(sdBox(q,vec3(0.35),0.1),1.0));
  vec3 w=p-vec3(-0.04,0.88,0.0);w.xz=rot(1.1)*w.xz;
  r=U(r,vec2(sdBox(w,vec3(0.23),0.08),0.0));
  return r;}
vec2 orbs(vec3 p){
  float d=length(p-vec3(0.0,-0.1,0.0))-0.55;
  d=smin(d,length(p-vec3(0.62,0.28,0.1))-0.36,0.1);
  d=smin(d,length(p-vec3(-0.6,0.35,-0.15))-0.32,0.1);
  d=smin(d,length(p-vec3(-0.25,-0.62,0.35))-0.3,0.1);
  d=smin(d,length(p-vec3(0.42,-0.6,-0.3))-0.26,0.1);
  vec2 r=vec2(d,0.0);
  r=U(r,vec2(length(p-vec3(0.18,0.74,0.36))-0.2,1.0));
  vec3 q=p;q.xy=rot(0.35)*q.xy;r=U(r,vec2(sdTorus(q,vec2(1.08,0.035)),2.0));
  return r;}
vec2 map(vec3 p){
  p.y-=sin(uTime*1.3)*0.035;
  p.xz=rot(uRot.x)*p.xz;p.yz=rot(uRot.y)*p.yz;
  if(uShape==0)return jack(p);
  if(uShape==1)return rings(p);
  if(uShape==2)return bot(p);
  if(uShape==3)return stack(p);
  return orbs(p);}
vec3 nrm(vec3 p){vec2 e=vec2(0.0015,-0.0015);return normalize(e.xyy*map(p+e.xyy).x+e.yyx*map(p+e.yyx).x+e.yxy*map(p+e.yxy).x+e.xxx*map(p+e.xxx).x);}
float shadow(vec3 ro,vec3 rd){float res=1.0,t=0.03;for(int i=0;i<40;i++){float h=map(ro+rd*t).x;res=min(res,9.0*h/t);t+=clamp(h,0.02,0.25);if(res<0.002||t>6.0)break;}return clamp(res,0.0,1.0);}
float occl(vec3 p,vec3 n){float o=0.0,s=1.0;for(int i=0;i<5;i++){float h=0.02+0.11*float(i);o+=(h-map(p+n*h).x)*s;s*=0.75;}return clamp(1.0-1.7*o,0.0,1.0);}
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*uRes)/min(uRes.x,uRes.y);
  vec3 ro=vec3(0.0,1.1*uFloor,4.9)/uZoom;
  vec3 ta=vec3(0.0,-0.12*uFloor,0.0);
  vec3 ww=normalize(ta-ro);vec3 uu=normalize(cross(ww,vec3(0.0,1.0,0.0)));vec3 vv=cross(uu,ww);
  vec3 rd=normalize(uv.x*uu+uv.y*vv+1.9*ww);
  vec3 L=normalize(vec3(-0.55,0.85,0.62));
  vec3 bg=pow(uBg,vec3(2.2));
  vec3 col=bg;float alpha=uFloor;
  float t=0.0;float m=-1.0;
  for(int i=0;i<110;i++){vec2 h=map(ro+rd*t);if(h.x<0.0008){m=h.y;break;}t+=h.x;if(t>12.0)break;}
  float tf=uFloor>0.5?(-1.1-ro.y)/rd.y:-1.0;
  if(m>-0.5&&(tf<0.0||t<tf)){
    vec3 p=ro+rd*t;vec3 n=nrm(p);
    float oc=occl(p,n);
    float dif=clamp(dot(n,L),0.0,1.0)*shadow(p+n*0.01,L);
    float sky=0.5+0.5*n.y;
    float fre=pow(clamp(1.0+dot(n,rd),0.0,1.0),3.0);
    vec3 alb=m<0.5?vec3(0.74,0.74,0.72):m<1.5?pow(uAccent,vec3(2.2)):m<2.5?vec3(0.012):vec3(1.0);
    vec3 lin=dif*vec3(1.3,1.24,1.14)+sky*oc*vec3(0.46,0.49,0.54)+(1.0-sky)*oc*vec3(0.16,0.15,0.14);
    col=alb*lin;
    bool glossy=m>1.5&&m<2.5;
    float spe=pow(clamp(dot(reflect(rd,n),L),0.0,1.0),glossy?60.0:14.0);
    col+=spe*(0.25+dif)*(glossy?0.9:0.07);
    col+=fre*oc*(glossy?0.1:0.06);
    if(m>2.5)col=vec3(1.7,1.66,1.6);
    alpha=1.0;
  }else if(tf>0.0){
    vec3 p=ro+rd*tf;
    float sh=shadow(p+vec3(0.0,0.01,0.0),L);
    float oc=0.6+0.4*clamp(map(p).x/0.6,0.0,1.0);
    col=bg*mix(0.74,1.0,sh)*oc;
    alpha=1.0;
  }
  col=col/(1.0+0.12*col);
  col=pow(clamp(col,0.0,1.0),vec3(1.0/2.2));
  outColor=vec4(col*alpha,alpha);
}`,ys={jack:0,rings:1,bot:2,stack:3,orbs:4};function Be(s,a){let l=null;try{l=s.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,preserveDrawingBuffer:a})}catch{l=null}if(!l)return null;const r=l,i=(m,y)=>{const v=r.createShader(m);return v?(r.shaderSource(v,y),r.compileShader(v),r.getShaderParameter(v,r.COMPILE_STATUS)?v:null):null},o=i(r.VERTEX_SHADER,bs),f=i(r.FRAGMENT_SHADER,ws),c=r.createProgram();if(!o||!f||!c||(r.attachShader(c,o),r.attachShader(c,f),r.linkProgram(c),!r.getProgramParameter(c,r.LINK_STATUS)))return null;const u=m=>r.getUniformLocation(c,m),d={res:u("uRes"),time:u("uTime"),rot:u("uRot"),shape:u("uShape"),accent:u("uAccent"),bg:u("uBg"),floor:u("uFloor"),zoom:u("uZoom")},p=r.createVertexArray();return{draw(m){r.viewport(0,0,s.width,s.height),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.useProgram(c),r.bindVertexArray(p),r.uniform2f(d.res,s.width,s.height),r.uniform1f(d.time,m.time),r.uniform2f(d.rot,m.yaw,m.pitch),r.uniform1i(d.shape,ys[m.shape]??0),r.uniform3fv(d.accent,ze(m.accent)),r.uniform3fv(d.bg,ze(m.bg,[.9,.9,.89])),r.uniform1f(d.floor,m.floor?1:0),r.uniform1f(d.zoom,m.zoom),r.drawArrays(r.TRIANGLES,0,3)},lose(){var m;(m=r.getExtension("WEBGL_lose_context"))==null||m.loseContext()}}}const Se=new Map;let ee=null;function ks(s,a,l,r){const i=[s,a,l,r].join("|"),o=Se.get(i);if(o)return o;if(ee===!1||typeof document>"u")return null;if(!ee){const d=document.createElement("canvas");d.width=960,d.height=540;const p=Be(d,!0);if(ee=p?{canvas:d,clay:p}:!1,!ee)return null}const{canvas:f,clay:c}=ee;c.draw({shape:s,yaw:.55-r*.37,pitch:-.12,time:0,accent:a,bg:l,floor:!0,zoom:s==="stack"?1.1:s==="rings"?1.25:1.32});let u="";try{u=f.toDataURL("image/webp",.9),u.startsWith("data:image/webp")||(u=f.toDataURL("image/png"))}catch{return null}return Se.set(i,u),u}function Pe(){const[s,a]=x.useState(!1);return x.useEffect(()=>{var i;if(typeof matchMedia!="function")return;const l=matchMedia("(prefers-reduced-motion: reduce)"),r=()=>a(l.matches);return r(),(i=l.addEventListener)==null||i.call(l,"change",r),()=>{var o;return(o=l.removeEventListener)==null?void 0:o.call(l,"change",r)}},[]),s}function qe({shape:s,accent:a,label:l,className:r,hint:i,zoom:o=1}){const f=x.useRef(null),c=x.useRef(null),[u,d]=x.useState(!1),[p,m]=x.useState(!1),y=Pe(),v=x.useRef({yaw:.6,pitch:-.32,vel:.35,tPitch:-.32,drag:!1,lastX:0,lastT:0,dirty:!0,accent:a});v.current.accent=a,v.current.dirty=!0,x.useEffect(()=>{const j=c.current,w=f.current;if(!j||!w)return;const z=document.createElement("canvas");j.appendChild(z);const q=Be(z,!1);if(!q){z.remove(),d(!0);return}const k=v.current;let L=0,E=!0,I=performance.now(),X=0;const D=()=>{const R=z.getBoundingClientRect(),N=Math.min(window.devicePixelRatio||1,2);z.width=Math.max(1,Math.round(R.width*N)),z.height=Math.max(1,Math.round(R.height*N)),k.dirty=!0};D();const F=new ResizeObserver(D);F.observe(z);const se=new IntersectionObserver(([R])=>{E=R.isIntersecting,E&&(I=performance.now(),Y())});se.observe(w);const Y=()=>{if(cancelAnimationFrame(L),!E)return;const R=performance.now(),N=Math.min(.05,(R-I)/1e3);if(I=R,y||(X+=N),!k.drag){const oe=y?0:.35;k.vel+=(oe-k.vel)*Math.min(1,N*1.6)}k.yaw+=k.vel*N,k.pitch+=(k.tPitch-k.pitch)*Math.min(1,N*5),(!y||k.drag||Math.abs(k.vel)>.001||Math.abs(k.tPitch-k.pitch)>.001||k.dirty)&&(q.draw({shape:s,yaw:k.yaw,pitch:k.pitch,time:X,accent:k.accent,bg:"#000000",floor:!1,zoom:o}),k.dirty=!1),L=requestAnimationFrame(Y)};return Y(),()=>{cancelAnimationFrame(L),F.disconnect(),se.disconnect(),q.lose(),z.remove()}},[s,y,o]);const A=j=>{var z,q;const w=v.current;w.drag=!0,w.lastX=j.clientX,w.lastT=performance.now(),w.vel=0,m(!0),(q=(z=j.currentTarget).setPointerCapture)==null||q.call(z,j.pointerId)},g=j=>{const w=v.current,z=j.currentTarget.getBoundingClientRect();if(w.tPitch=-.32+((j.clientY-z.top)/z.height-.5)*.7,!w.drag)return;const q=performance.now(),k=j.clientX-w.lastX,L=Math.max(1,q-w.lastT)/1e3;w.yaw+=k*.012,w.vel=_(k*.012/L,-9,9),w.lastX=j.clientX,w.lastT=q},b=()=>{v.current.drag=!1,m(!1)},M=j=>{(j.key==="ArrowLeft"||j.key==="ArrowRight")&&(j.preventDefault(),v.current.vel+=j.key==="ArrowLeft"?-2.5:2.5)};return e.jsxs("div",{ref:f,className:"sl-clay "+(r??""),"data-drag":p,onPointerDown:A,onPointerMove:g,onPointerUp:b,onPointerCancel:b,onPointerLeave:()=>v.current.tPitch=-.32,onKeyDown:M,tabIndex:0,role:"img","aria-label":l+". Drag, or use the arrow keys, to spin it.",children:[e.jsx("div",{className:"sl-clay-in",children:u?e.jsx("div",{className:"sl-fallback","aria-hidden":"true",children:e.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 64 64",fill:"none",children:[e.jsx("circle",{cx:"32",cy:"32",r:"22",stroke:"currentColor",strokeDasharray:"3 4"}),e.jsx("path",{d:"M32 4v56M4 32h56",stroke:"currentColor",strokeWidth:".8"})]})}):e.jsx("div",{ref:c,className:"sl-clay-gl"})}),i?e.jsx("span",{className:"sl-clay-hint",children:i}):null]})}function js({post:s,index:a,accent:l,bg:r,brand:i}){const[o,f]=x.useState(s.image??""),[c,u]=x.useState("");return x.useEffect(()=>{if(s.image){f(s.image);return}const d=window.setTimeout(()=>f(ks(s.cover??"bot",l,r,a)??""),30+a*40);return()=>window.clearTimeout(d)},[s.image,s.cover,l,r,a]),e.jsxs(e.Fragment,{children:[s.image?null:e.jsxs("span",{className:"sl-chrome","aria-hidden":"true",children:[e.jsx("span",{children:e.jsx(ie,{})}),e.jsx("span",{children:i})]}),o?e.jsx("img",{src:o,alt:"","data-ready":c===o,onLoad:()=>u(o),draggable:!1}):null,!s.image&&s.kicker?e.jsx("span",{className:"sl-kicker","aria-hidden":"true",children:e.jsx(W,{text:s.kicker,sw:1.1,gap:.4})}):null]})}function Ns({member:s}){const r=x.useMemo(()=>ls(s.name,18,22),[s.name]);return s.image?e.jsx("img",{src:s.image,alt:s.name,loading:"lazy",draggable:!1}):e.jsx("svg",{className:"sl-dots",viewBox:"0 0 180 220",preserveAspectRatio:"xMidYMid slice","aria-hidden":"true",children:r.map((i,o)=>i>.05?e.jsx("circle",{cx:o%18*10+5,cy:Math.floor(o/18)*10+5,r:Math.round(i*4.9*100)/100},o):null)})}function zs(s,a=!0){const[l,r]=x.useState(!1);return x.useEffect(()=>{const i=s.current;if(!i||typeof IntersectionObserver>"u"){r(!0);return}const o=new IntersectionObserver(([f])=>{f.isIntersecting&&(r(!0),a&&o.disconnect())},{threshold:.25});return o.observe(i),()=>o.disconnect()},[s,a]),l}function Ms({stat:s,run:a,reduced:l}){const[r,i]=x.useState(0);return x.useEffect(()=>{if(!a)return;if(l){i(1);return}let o=0;const f=performance.now(),c=()=>{const u=(performance.now()-f)/1400;i(Math.min(1,u)),u<1&&(o=requestAnimationFrame(c))};return o=requestAnimationFrame(c),()=>cancelAnimationFrame(o)},[a,l]),e.jsxs("div",{className:"sl-stat",children:[e.jsx("span",{className:"sl-label",children:s.label}),e.jsxs("span",{className:"sl-stat-v","aria-label":(s.prefix??"")+s.value+(s.suffix??""),children:[s.prefix?e.jsx("i",{children:s.prefix}):null,Je(s.value,r),s.suffix?e.jsx("i",{children:s.suffix}):null]})]})}function Cs({member:s,index:a}){const[l,r]=x.useState(!1),i=x.useId();return e.jsxs("article",{className:"sl-c sl-team-c sl-rise",style:{"--i":a},children:[e.jsxs("div",{className:"sl-portrait",children:[e.jsx(Ns,{member:s}),e.jsx("span",{className:"sl-ini","aria-hidden":"true",children:Ae(s.name)}),e.jsxs("div",{className:"sl-bio",id:i,"data-open":l,"aria-hidden":!l,children:[s.bio,s.href?e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("a",{href:s.href,tabIndex:l?0:-1,children:"Profile ↗"})]}):null]})]}),e.jsxs("div",{className:"sl-member",children:[e.jsx("h3",{children:s.name}),e.jsx("p",{children:s.role})]}),e.jsxs("button",{type:"button",className:"sl-biobtn sl-brk sl-brk-a","aria-expanded":l,"aria-controls":i,onClick:()=>r(o=>!o),children:["Bio ",e.jsx("b",{"aria-hidden":"true",children:"+"}),e.jsxs("span",{className:"sl-sr",children:[l?" — hide ":" — show ",s.name]})]})]})}function qs({brand:s={name:"Nullpoint",word:"Labs"},wordmark:a="LABS",nav:l=hs,navCta:r={label:"Apply",href:"#subscribe"},hero:i,teamTitle:o="Team",teamIntro:f="Operators, engineers and investors who have built, broken and rebuilt the stack you are working on.",team:c=is,faqTitle:u="FAQ",faqIntro:d={title:"Most Common Questions",subtitle:"No worries, here you can find all the answers"},faq:p=os,faqDefaultOpen:m=4,faqMultiple:y=!1,faqShape:v="jack",newsTitle:A="Latest News",blog:g={label:"Visit our blog",href:"#"},news:b=cs,newsAutoplay:M=!1,subscribe:j,onSubscribe:w,columns:z=ds,socials:q=ps,copyright:k,rights:L,accent:E="#ff6a1a",paper:I,font:X,defaultTheme:D="system",onThemeChange:F,maxWidth:se="1180px",height:Y="100svh",className:R}){const N={...ns,...i},U={...us,...j},oe=x.useMemo(()=>{const t=N.lines.map(h=>fe(h,1.3).width+1),n=Math.max(1,...t);return t.map(h=>Math.round(h/n*1e3)/10)},[N.lines.join(`
`)]),ce=x.useRef(null),C=x.useId().replace(/:/g,""),V=Pe(),Le=new Date().getFullYear(),[te,ge]=x.useState(D==="dark"?"dark":"light"),[ve,Te]=x.useState(!1);x.useEffect(()=>{var S;if(D!=="system"||ve)return;const t=()=>ge(document.documentElement.classList.contains("dark")||typeof matchMedia=="function"&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");t();const n=new MutationObserver(t);n.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const h=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):null;return(S=h==null?void 0:h.addEventListener)==null||S.call(h,"change",t),()=>{var $;n.disconnect(),($=h==null?void 0:h.removeEventListener)==null||$.call(h,"change",t)}},[D,ve]);const Ie=()=>{const t=te==="dark"?"light":"dark";Te(!0),ge(t),F==null||F(t)},De=te==="dark"?"#232322":"#e6e6e3",O=(t,n)=>{var S;if(!n.startsWith("#"))return;t.preventDefault(),be(!1);const h=n==="#top"?ce.current:(S=ce.current)==null?void 0:S.querySelector('[data-sl="'+n.slice(1)+'"]');h==null||h.scrollIntoView({behavior:V?"auto":"smooth",block:"start"})},[de,be]=x.useState(!1),we=x.useRef(null),Fe=zs(we),[H,ye]=x.useState(m>=0&&m<p.length?[m]:[]),Ue=p.length>0&&H.length===p.length,Oe=()=>ye(Ue||!y&&H.length?[]:y?p.map((t,n)=>n):[0]),ke=x.useRef(null),[T,We]=x.useState(2),[K,pe]=x.useState(0),[G,je]=x.useState(M),re=x.useRef({x:0,y:0,active:!1,moved:!1});x.useEffect(()=>{const t=ke.current;if(!t)return;const n=new ResizeObserver(([h])=>We(h.contentRect.width<640?1:2));return n.observe(t),()=>n.disconnect()},[]);const B=Re(b.length,T);x.useEffect(()=>pe(t=>Math.min(t,B)),[B]);const Q=(t,n=!0)=>{n&&je(!1),pe(h=>Me(h,t,b.length,T))};x.useEffect(()=>{if(!G||V||B===0)return;const t=window.setInterval(()=>pe(n=>Me(n,1,b.length,T)),4200);return()=>window.clearInterval(t)},[G,V,B,b.length,T]);const _e=t=>{re.current={x:t.clientX,y:t.clientY,active:!0,moved:!1}},Xe=t=>{const n=re.current;if(!n.active)return;n.active=!1;const h=t.clientX-n.x;Math.abs(h)>48&&Math.abs(h)>Math.abs(t.clientY-n.y)&&(n.moved=!0,Q(h<0?1:-1))},Ye=t=>{t.key==="ArrowRight"?Q(1):t.key==="ArrowLeft"&&Q(-1)},[ae,Ne]=x.useState(""),[P,Z]=x.useState("idle"),[Ve,J]=x.useState(""),He=async t=>{if(t.preventDefault(),P!=="loading"){if(!Qe(ae)){Z("error"),J("That doesn’t look like an email address.");return}Z("loading"),J("Sending…");try{w?await w(ae.trim()):await new Promise(n=>setTimeout(n,900)),Z("done"),J("You’re in. Watch "+ae.trim()+" for the next issue."),Ne("")}catch{Z("error"),J("Couldn’t subscribe just now. Try again in a moment.")}}},Ke={minHeight:Y,"--sl-accent":E,"--sl-max":se,...I?{"--sl-paper-light":I}:{},...X?{"--sl-font":X}:{}},he=(t,n,h)=>e.jsx("a",{className:n,href:t.href,onClick:S=>t.href.startsWith("#")?O(S,t.href==="#"?"#top":t.href):void 0,children:t.label},h),ue=Array.from(a.toUpperCase()).filter(t=>t.trim());return e.jsxs("div",{ref:ce,className:"sl-root"+(R?" "+R:""),"data-theme":te,style:Ke,children:[e.jsx("style",{children:xs}),e.jsxs("div",{className:"sl-frame",children:[e.jsxs("header",{className:"sl-row sl-nav",children:[e.jsx("div",{className:"sl-c",children:e.jsx("a",{href:"#top",onClick:t=>O(t,"#top"),"aria-label":s.name+" "+s.word+" — top",children:e.jsx(Ce,{name:s.name,word:s.word})})}),e.jsx("nav",{className:"sl-c sl-s2 sl-links-c","aria-label":"Sections",children:e.jsx("div",{className:"sl-links",style:{width:"100%"},children:l.map((t,n)=>he(t,"sl-link",n))})}),e.jsxs("div",{className:"sl-c sl-act",style:{display:"flex"},children:[e.jsx("button",{type:"button",className:"sl-icon",onClick:Ie,"aria-label":"Switch to "+(te==="dark"?"light":"dark")+" theme",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 14 14","aria-hidden":"true",children:[e.jsx("circle",{cx:"7",cy:"7",r:"6",fill:"none",stroke:"currentColor",strokeWidth:"1.2"}),e.jsx("path",{d:"M7 1a6 6 0 0 1 0 12z",fill:"currentColor"})]})}),e.jsx("button",{type:"button",className:"sl-icon sl-menu-btn","aria-expanded":de,"aria-controls":C+"-menu","aria-label":"Menu",onClick:()=>be(t=>!t),children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14","aria-hidden":"true",children:e.jsx("path",{d:de?"M2 2l10 10M12 2 2 12":"M1 4h12M1 10h12",stroke:"currentColor",strokeWidth:"1.3"})})}),e.jsxs("a",{className:"sl-btn sl-nav-cta",href:r.href,onClick:t=>O(t,r.href),children:[r.label," ",e.jsx("span",{className:"sl-arr",children:"→"})]})]}),e.jsx("div",{className:"sl-c sl-drawer",id:C+"-menu","data-open":de,children:[...l,r].map((t,n)=>he(t,"",n))})]}),e.jsxs("section",{className:"sl-row","aria-label":"Introduction",children:[e.jsxs("div",{className:"sl-c sl-s3 sl-fill sl-hero-type",children:[e.jsxs("span",{className:"sl-label sl-rise",children:[e.jsx("span",{className:"sl-sq",style:{color:E}}),N.eyebrow]}),e.jsx("h1",{className:"sl-sr",children:N.lines.join(" ")}),N.lines.map((t,n)=>e.jsx(W,{text:t,className:"sl-rise",style:{"--i":n+1,width:oe[n]+"%"},label:""},n))]}),e.jsx(qe,{shape:N.shape,accent:E,label:"A clay "+N.shape+" object",className:"sl-c",hint:"Drag to spin",zoom:.92}),e.jsxs("div",{className:"sl-c sl-s2 sl-hero-desc",children:[e.jsx("p",{children:N.description}),e.jsxs("div",{className:"sl-ctas",children:[e.jsxs("a",{className:"sl-btn",href:N.cta.href,onClick:t=>O(t,N.cta.href),children:[N.cta.label," ",e.jsx("span",{className:"sl-arr",children:"→"})]}),e.jsxs("a",{className:"sl-ghost",href:N.secondary.href,onClick:t=>O(t,N.secondary.href),children:[N.secondary.label," ",e.jsx("span",{className:"sl-arr",children:"→"})]})]})]}),e.jsx("div",{className:"sl-c sl-s2 sl-stats",ref:we,children:N.stats.slice(0,3).map((t,n)=>e.jsx(Ms,{stat:t,run:Fe,reduced:V},n))})]}),e.jsx(me,{}),c.length?e.jsxs("section",{"data-sl":"team","aria-labelledby":C+"-team",children:[e.jsxs("div",{className:"sl-row",children:[e.jsxs("div",{className:"sl-c sl-fill sl-head",children:[e.jsx("h2",{className:"sl-sr",id:C+"-team",children:o}),e.jsx(W,{text:o,label:""})]}),e.jsxs("div",{className:"sl-c sl-s2 sl-intro",children:[e.jsxs("h3",{children:[e.jsx("span",{className:"sl-sq"}),"The people you will work with"]}),e.jsx("p",{children:f})]}),e.jsxs("div",{className:"sl-c sl-count",children:[e.jsx("span",{className:"sl-label",children:"People"}),e.jsx("strong",{children:le(c.length)})]})]}),e.jsxs("div",{className:"sl-row",children:[c.map((t,n)=>e.jsx(Cs,{member:t,index:n},t.name+n)),c.length%4?Array.from({length:4-c.length%4},(t,n)=>e.jsx("div",{className:"sl-c","aria-hidden":"true"},"f"+n)):null]})]}):null,e.jsx(me,{}),p.length?e.jsxs("section",{"data-sl":"faq","aria-labelledby":C+"-faq",children:[e.jsxs("div",{className:"sl-row",children:[e.jsx("button",{type:"button",className:"sl-mark sl-mark-l",onClick:Oe,"aria-label":H.length?"Collapse all answers":"Expand answers",children:e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 10 10","aria-hidden":"true",children:e.jsx("path",{d:H.length?"M1 1l8 8M9 1 1 9":"M5 0v10M0 5h10",stroke:"currentColor",strokeWidth:"1.1"})})}),e.jsxs("div",{className:"sl-c sl-fill sl-head",children:[e.jsx("h2",{className:"sl-sr",id:C+"-faq",children:u}),e.jsx(W,{text:u,label:""})]}),e.jsxs("div",{className:"sl-c sl-bracket-cell",children:[e.jsx("span",{className:"sl-brk","aria-hidden":"true"}),e.jsx(qe,{shape:v,accent:E,label:"A clay "+v+" object",className:"sl-jack",zoom:1.35})]}),e.jsxs("div",{className:"sl-c sl-s2 sl-intro",children:[e.jsxs("h3",{children:[e.jsx("span",{className:"sl-sq"}),d.title]}),e.jsx("p",{children:d.subtitle})]})]}),e.jsx("div",{className:"sl-faq",children:p.map((t,n)=>{const h=H.includes(n);return e.jsx("div",{className:"sl-row",children:e.jsxs("div",{className:"sl-c sl-s4",children:[e.jsx("h3",{children:e.jsxs("button",{type:"button",className:"sl-q",id:C+"-q"+n,"aria-expanded":h,"aria-controls":C+"-a"+n,onClick:()=>ye(S=>$e(S,n,y)),children:[e.jsx("span",{className:"sl-qn","aria-hidden":"true",children:le(n+1)}),e.jsx("span",{children:t.question}),e.jsx("span",{className:"sl-tog","aria-hidden":"true",children:e.jsx(gs,{})})]})}),e.jsx("div",{className:"sl-a",id:C+"-a"+n,role:"region","aria-labelledby":C+"-q"+n,"data-open":h,children:e.jsx("div",{children:e.jsx("p",{"aria-hidden":!h,children:t.answer})})})]})},n)})})]}):null,e.jsx(me,{}),b.length?e.jsxs("section",{"data-sl":"news","aria-labelledby":C+"-news","aria-roledescription":"carousel",children:[e.jsxs("div",{className:"sl-row",children:[e.jsxs("div",{className:"sl-c sl-s2 sl-fill sl-head",children:[e.jsx("h2",{className:"sl-sr",id:C+"-news",children:A}),e.jsx(W,{text:A,label:""})]}),e.jsxs("div",{className:"sl-c sl-bracket-cell sl-blog-wrap",children:[e.jsx("span",{className:"sl-brk","aria-hidden":"true"}),e.jsxs("a",{className:"sl-blog",href:g.href,onClick:t=>g.href==="#"?t.preventDefault():void 0,children:[e.jsx("span",{children:g.label}),e.jsx("span",{children:e.jsx("span",{className:"sl-arr",children:e.jsx(ie,{})})})]})]}),e.jsx("div",{className:"sl-c",style:{minHeight:60},children:B>0&&!V?e.jsx("button",{type:"button",className:"sl-mark sl-mark-r sl-auto","data-on":G,"aria-pressed":G,"aria-label":"Autoplay the news",onClick:()=>je(t=>!t),children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"6",cy:"6",r:"4.6",stroke:"currentColor",strokeDasharray:G?"2.2 1.6":void 0}),e.jsx("circle",{cx:"6",cy:"6",r:"1.6",fill:"currentColor"})]})}):null})]}),e.jsx("div",{className:"sl-row",children:e.jsxs("div",{className:"sl-c sl-s4 sl-news-c",ref:ke,onKeyDown:Ye,children:[e.jsx("div",{className:"sl-vp",children:e.jsx("div",{className:"sl-track",style:{transform:"translateX("+-K*(100/T)+"%)","--per":T},onPointerDown:_e,onPointerUp:Xe,onClickCapture:t=>{re.current.moved&&(t.preventDefault(),t.stopPropagation(),re.current.moved=!1)},children:b.map((t,n)=>{const h=n>=K&&n<K+T,S=t.href??"#",$=Ge=>S==="#"?Ge.preventDefault():void 0;return e.jsxs("article",{className:"sl-card","aria-hidden":!h,"aria-roledescription":"slide","aria-label":n+1+" of "+b.length,children:[e.jsx("a",{className:"sl-cover",href:S,onClick:$,tabIndex:-1,"aria-hidden":"true",draggable:!1,children:e.jsx(js,{post:t,index:n,accent:E,bg:De,brand:s.name+" "+s.word})}),e.jsx("h3",{children:e.jsx("a",{href:S,onClick:$,tabIndex:h?0:-1,children:t.title})}),e.jsxs("div",{className:"sl-by",children:[e.jsx("span",{className:"sl-av","aria-hidden":"true",children:Ae(t.author)}),e.jsxs("span",{children:["by ",e.jsx("b",{children:t.author})]})]}),e.jsxs("div",{className:"sl-meta",children:[e.jsx("span",{children:t.category}),e.jsx("span",{children:t.date})]})]},n)})})}),B>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"sl-pager",children:[e.jsx("button",{type:"button",onClick:()=>Q(-1),"aria-label":"Previous posts",children:e.jsx(ie,{dir:-1})}),e.jsx("button",{type:"button",onClick:()=>Q(1),"aria-label":"Next posts",children:e.jsx(ie,{})})]}),e.jsxs("div",{className:"sl-progress","aria-live":"polite",children:[e.jsx("span",{children:le(K+1)}),e.jsx("i",{style:{"--p":(K+1)/(B+1)}}),e.jsx("span",{children:le(B+1)})]})]}):null]})})]}):null,e.jsxs("section",{className:"sl-row","data-sl":"subscribe","aria-label":"Subscribe",children:[e.jsx("div",{className:"sl-c",style:{display:"flex",alignItems:"flex-start"},children:e.jsx(Ce,{name:s.name,word:s.word})}),e.jsxs("form",{className:"sl-c sl-s2 sl-m2 sl-sub",onSubmit:He,noValidate:!0,children:[e.jsx("h3",{id:C+"-sub",children:U.title}),e.jsxs("label",{className:"sl-field",children:[e.jsx("span",{className:"sl-sr",children:"Email"}),e.jsx("input",{type:"email",inputMode:"email",autoComplete:"email",placeholder:U.placeholder,value:ae,"aria-invalid":P==="error","aria-describedby":C+"-msg",onChange:t=>{Ne(t.target.value),P==="error"&&(Z("idle"),J(""))}})]}),e.jsx("p",{className:"sl-msg",id:C+"-msg",role:"status","data-tone":P==="error"?"error":P==="done"?"done":void 0,children:Ve}),e.jsx("button",{type:"submit",className:"sl-sr",tabIndex:-1,children:U.cta})]}),e.jsxs("div",{className:"sl-c sl-sub-side",children:[e.jsx("span",{className:"sl-label",children:U.note}),e.jsxs("button",{type:"button",className:"sl-btn",disabled:P==="loading",onClick:t=>{var n,h;return(h=(n=t.currentTarget.closest(".sl-row"))==null?void 0:n.querySelector("form"))==null?void 0:h.requestSubmit()},children:[P==="loading"?e.jsx("span",{className:"sl-spin","aria-hidden":"true"}):null,P==="done"?"Subscribed ✓":U.cta]})]})]}),e.jsxs("footer",{children:[e.jsxs("div",{className:"sl-row",children:[z.slice(0,3).map((t,n)=>e.jsxs("nav",{className:"sl-c sl-col","aria-label":t.title,children:[e.jsx("span",{className:"sl-label",children:t.title}),e.jsx("ul",{children:t.links.map((h,S)=>e.jsx("li",{children:he(h,"")},S))})]},n)),e.jsx("nav",{className:"sl-c sl-col sl-soc","aria-label":"Social",children:e.jsx("ul",{children:q.map((t,n)=>e.jsx("li",{children:e.jsxs("a",{href:t.href,onClick:h=>t.href==="#"?h.preventDefault():void 0,children:[t.label," ",e.jsx(vs,{})]})},n))})})]}),e.jsxs("div",{className:"sl-row sl-legal",children:[e.jsx("div",{className:"sl-c",children:k??"© "+Le}),e.jsx("div",{className:"sl-c sl-s2 sl-m2",children:L??"All rights reserved by "+s.name+" "+s.word+"."}),e.jsx("div",{className:"sl-c",children:e.jsxs("a",{className:"sl-top",href:"#top",onClick:t=>O(t,"#top"),children:["Back to top ",e.jsx("span",{"aria-hidden":"true",children:"↑"})]})})]}),ue.length?e.jsxs("div",{className:"sl-row sl-word",style:{"--n":ue.length},"aria-label":a,role:"img",children:[[0,1,2,3].map(t=>e.jsx("span",{className:"sl-corner","aria-hidden":"true",style:{[t%2?"right":"left"]:6,[t<2?"top":"bottom"]:6}},t)),ue.map((t,n)=>e.jsx("div",{className:"sl-c",children:e.jsx(ms,{text:t})},n))]}):null]})]})]})}function me(){return e.jsxs("div",{className:"sl-row sl-spacer","aria-hidden":"true",children:[e.jsx("div",{className:"sl-c"}),e.jsx("div",{className:"sl-c"}),e.jsx("div",{className:"sl-c"}),e.jsx("div",{className:"sl-c"})]})}export{qs as S};
