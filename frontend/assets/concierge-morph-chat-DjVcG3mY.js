import{r as c,j as e}from"./index-CdiR0C0d.js";const Ne=5,f=60,Be=30,A=36,ce=48,_e=24,Ve=22;function Se(r){return r<0?0:r>1?1:r}function qe(r,o,s){const i=r,d=r<=0?r:Math.pow(r,1.35),v=Math.max(f/o+(1-f/o)*i,.01),g=Math.max(f/s+(1-f/s)*d,.01),b=f/2+(Be-f/2)*Se(r),x=o-f/2-ce/2,k=s-f/2-ce/2,w=ce/A;return{sx:v,sy:g,rx:b/v,ry:b/g,ax:x+(_e-x)*i,ay:k+(Ve-k)*d,as:w+(1-w)*r}}function Ke(r,o){const s=.45+o*.09;return Se((r-s)/(1-s))}const se=[{name:"Relaxed linen shirt",price:"$78",color:"#ebe4d6",kind:"shirt",tags:"linen shirt summer new relaxed"},{name:"Camp-collar shirt",price:"$64",color:"#a9bba8",kind:"shirt",tags:"shirt summer under weekend"},{name:"Pleated linen trouser",price:"$92",color:"#cbb99d",kind:"trousers",tags:"linen trouser pants new"},{name:"Bias slip dress",price:"$110",color:"#34333a",kind:"dress",tags:"dress evening wedding new"},{name:"Cotton gauze sundress",price:"$84",color:"#e8cbb6",kind:"dress",tags:"dress summer linen weekend"},{name:"Market tote",price:"$38",color:"#d9c4a4",kind:"tote",tags:"bag tote under accessories"}];function R(r){return se.filter(o=>o.tags.split(" ").indexOf(r)>-1).map(o=>({name:o.name,price:o.price,color:o.color,kind:o.kind}))}function Je(r){const o=" "+r.toLowerCase().replace(/[^a-z0-9$ ]+/g," ")+" ",s=i=>i.test(o);return s(/ (hi|hey|hello|hiya|morning|evening) /)&&o.trim().split(/\s+/).length<=3?{text:"Hi! Lovely to see you. Are you shopping for something particular, or just browsing today?",suggestions:["Let me explore","What's new?","Help with sizing"]}:s(/ (human|person|someone|agent|staff|call) /)?{text:"Of course. I've let the studio team know — someone will join this chat in a few minutes. I'll stay here in the meantime.",suggestions:["Shipping & returns","What's new?"]}:s(/ (ship|shipping|deliver|delivery|return|returns|refund|exchange) /)?{text:"Shipping is free over $75 and usually takes 2–4 days. Returns are free within 30 days — unworn, with tags. Exchanges for a different size ship out the same day.",suggestions:["Help with sizing","What's new?"]}:s(/ (size|sizing|fit|fits|measure|tall|petite|small|large) /)?{text:"Our linen runs relaxed, so most people stay true to size — size down if you like it close. Tell me your usual size and how you like things to sit, and I'll check each piece for you.",suggestions:["I'm usually a medium","Relaxed, not boxy","Shipping & returns"]}:s(/ (try on|try|live|camera|mirror) /)?{text:"Try on live uses your camera to drape a piece over you before it ships — nothing is recorded. Pick something and I'll set it up.",products:R("linen").slice(0,3),suggestions:["Start with the linen shirt","What's new?"]}:s(/ (new|arrived|arrivals|latest|just in|drop) /)?{text:"Just arrived this week — washed linen in sand and oat, and a slip dress cut on the bias that's already moving fast.",products:R("new"),suggestions:["Help with sizing","Try on live","Under $80"]}:s(/ (under|cheap|budget|less|\$\d+) /)?{text:"Here's what's under $80 right now — all of it pairs with what's already in most wardrobes.",products:se.filter(i=>parseInt(i.price.slice(1),10)<80).map(i=>({name:i.name,price:i.price,color:i.color,kind:i.kind})),suggestions:["What's new?","Shipping & returns"]}:s(/ (dress|evening|wedding|party|dinner) /)?{text:"For evenings I'd reach for the bias slip — it moves beautifully. The gauze sundress is the easier daytime cousin.",products:R("dress"),suggestions:["Help with sizing","Try on live"]}:s(/ (linen|shirt|summer|beach|holiday|vacation|relaxed|warm|hot) /)?{text:"Good choice for the heat. These breathe well and soften with every wash — the relaxed shirt is the one people come back for.",products:R("summer").concat(R("linen")).filter((i,d,v)=>v.findIndex(g=>g.name===i.name)===d),suggestions:["Help with sizing","Try on live","Under $80"]}:s(/ (explore|browse|looking|show|anything|surprise) /)?{text:"Happy to wander with you. A little of everything we love right now:",products:se.map(i=>({name:i.name,price:i.price,color:i.color,kind:i.kind})),suggestions:["What's new?","Under $80","Something for evenings"]}:s(/ (thanks|thank|cheers|perfect|great|love) /)?{text:"My pleasure. I'm here whenever you need me — just tap my picture in the corner.",suggestions:["What's new?","Let me explore"]}:{text:"I can help with that. Tell me a little more — what's it for, and how do you like things to fit?",suggestions:["Let me explore","What's new?","Help with sizing"]}}const Xe=["Discover new products and what just arrived.","Get recommendations matched to your needs.","Ask about details, fit, availability, or materials."],Qe=["Let me explore","What's new?","Try on live"],et=["A relaxed linen shirt for summer","Something to wear to a garden wedding","Does the trouser run long?","What arrived this week?"],tt=[{label:"Copy transcript"},{label:"Shipping & returns",send:"What's your shipping and returns policy?"},{label:"Talk to a person",send:"Can I talk to a person?"}],rt='"Tiempos Headline", "Newsreader", "Source Serif 4", "Iowan Old Style", "Palatino Linotype", Georgia, serif';function mt({name:r="Lana",role:o="Assistant manager",avatar:s,online:i=!0,greeting:d="Hi, I'm Lana — looking for something?",title:v,intro:g=Xe,suggestions:b=Qe,placeholders:x=et,onSend:k,onNewSession:w,menuItems:Le=tt,brand:D={name:"atelier"},mark:Ie,open:F,defaultOpen:E=!1,onOpenChange:W,placement:Re="fixed",offset:ie=24,width:Ae="min(420px, calc(100vw - 32px))",height:Ee="min(680px, calc(100svh - 48px))",accent:oe,accentInk:ae,surface:le,serif:We=rt,className:de}){const Z=c.useId().replace(/[^a-zA-Z0-9_-]/g,""),me="cmc-panel-"+Z,pe="cmc-name-"+Z,[Te,He]=c.useState(E),l=F??Te,T=c.useCallback(t=>{F===void 0&&He(t),W==null||W(t)},[F,W]),P=c.useRef(null),G=c.useRef(null),he=c.useRef(null),ue=c.useRef(null),xe=c.useRef(null),U=c.useRef(null),fe=c.useRef(null),$=c.useRef({p:E?1:0,v:0,target:E?1:0,raf:0,last:0}),O=c.useRef(!1),[j,Y]=c.useState(E?"open":"closed"),M=c.useCallback(t=>{const n=P.current,a=G.current,u=he.current,y=ue.current;if(!n||!a||!u||!y)return;const p=n.offsetWidth||400,h=n.offsetHeight||640,m=qe(t,p,h);a.style.transform="scale("+m.sx+", "+m.sy+")",a.style.borderRadius=m.rx+"px / "+m.ry+"px",u.style.transform="scale("+1/m.sx+", "+1/m.sy+")",y.style.transform="translate("+m.ax+"px, "+m.ay+"px) scale("+m.as+")",n.querySelectorAll("[data-cmc-stage]").forEach(I=>{const re=I,ne=Ke(t,Number(re.dataset.cmcStage));re.style.opacity=String(ne),re.style.transform=ne>=1?"":"translateY("+(1-ne)*14+"px)"})},[]);c.useLayoutEffect(()=>{const t=$.current,n=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,a=l?1:0;if(t.target=a,n||t.p===a){cancelAnimationFrame(t.raf),t.raf=0,t.p=a,t.v=0,M(a),Y(l?"open":"closed");return}Y("moving");const u=l?210:260,y=2*Math.sqrt(u)*(l?.74:1),p=h=>{let m=Math.min((h-t.last)/1e3,.03333333333333333);for(t.last=h;m>0;){const I=Math.min(m,.004166666666666667);t.v+=(-u*(t.p-t.target)-y*t.v)*I,t.p+=t.v*I,m-=I}if(Math.abs(t.p-t.target)<6e-4&&Math.abs(t.v)<.006){t.p=t.target,t.v=0,t.raf=0,M(t.p),Y(t.target?"open":"closed");return}M(t.p),t.raf=requestAnimationFrame(p)};cancelAnimationFrame(t.raf),t.last=performance.now(),t.raf=requestAnimationFrame(p)},[l,M]),c.useEffect(()=>()=>cancelAnimationFrame($.current.raf),[]),c.useEffect(()=>{const t=P.current;if(!t||typeof ResizeObserver>"u")return;const n=new ResizeObserver(()=>M($.current.p));return n.observe(t),()=>n.disconnect()},[M]),c.useEffect(()=>{var t,n;j==="open"&&((t=U.current)==null||t.focus({preventScroll:!0})),j==="closed"&&O.current&&(O.current=!1,(n=xe.current)==null||n.focus({preventScroll:!0}))},[j]),c.useEffect(()=>{var t;(t=G.current)==null||t.toggleAttribute("inert",!l)},[l]);const ge=c.useCallback(()=>{O.current=!0,T(!1)},[T]),[B,be]=c.useState(!1),[ye,De]=c.useState(!1);c.useEffect(()=>{if(!d||ye||l){be(!1);return}const t=window.setTimeout(()=>be(!0),1400);return()=>window.clearTimeout(t)},[d,ye,l]);const[z,_]=c.useState([]),[V,q]=c.useState(b),[C,K]=c.useState(""),[S,J]=c.useState(!1),X=c.useRef(z);X.current=z;const ve=c.useRef(1),Q=c.useRef(0),ee=c.useRef(!0);c.useEffect(()=>(ee.current=!0,()=>{ee.current=!1}),[]),c.useEffect(()=>q(b),[b]);const H=async t=>{const n=t.trim();if(!n||S)return;const a=Q.current,u={id:ve.current++,role:"user",text:n},y=X.current.concat(u);_(y),K(""),J(!0);let p;try{const h=k?await k(n,y):Je(n);p=typeof h=="string"?{text:h}:h}catch{p={text:"Sorry — I lost the thread for a second. Could you say that again?"}}k||await new Promise(h=>setTimeout(h,700+Math.min(n.length*14,700))),!(!ee.current||Q.current!==a)&&(_(h=>h.concat({id:ve.current++,role:"assistant",text:p.text,products:p.products})),p.suggestions&&p.suggestions.length&&q(p.suggestions),J(!1))},Fe=()=>{var t;Q.current++,_([]),J(!1),K(""),q(b),L(!1),w==null||w(),(t=U.current)==null||t.focus()};c.useEffect(()=>{const t=fe.current;!t||!z.length||t.scrollTo({top:t.scrollHeight,behavior:"smooth"})},[z,S]);const[ke,Ze]=c.useState(0),[Pe,we]=c.useState(!1);c.useEffect(()=>{if(!l||C||x.length<2)return;const t=window.setInterval(()=>Ze(n=>(n+1)%x.length),3400);return()=>window.clearInterval(t)},[l,C,x.length]);const te=x.length?x[ke%x.length]:"",[N,L]=c.useState(!1),[Ge,je]=c.useState(!1),Me=c.useRef(null);c.useEffect(()=>{if(!N)return;const t=n=>{var a;(a=Me.current)!=null&&a.contains(n.target)||L(!1)};return document.addEventListener("pointerdown",t),()=>document.removeEventListener("pointerdown",t)},[N]);const Ue=t=>{var n;if(t.onSelect)t.onSelect();else if(t.send)H(t.send);else if(t.label==="Copy transcript"){const a=X.current.map(u=>(u.role==="user"?"You: ":r+": ")+u.text);(n=navigator.clipboard)==null||n.writeText(a.join(`
`)||"(empty conversation)").catch(()=>{}),je(!0),window.setTimeout(()=>je(!1),1400)}L(!1)},$e=t=>{if(t.key==="Escape"){if(N){t.stopPropagation(),L(!1);return}l&&ge()}},Oe={position:Re,right:ie,bottom:ie,width:Ae,height:Ee,"--cmc-serif":We,...oe?{"--cmc-accent":oe}:null,...ae?{"--cmc-accent-ink":ae}:null,...le?{"--cmc-bg":le}:null},Ye=typeof s=="string"?e.jsx("img",{src:s,alt:"",width:A,height:A,className:"cmc-avatar-img"}):s||e.jsx(nt,{id:Z});return e.jsxs("div",{ref:P,className:"cmc-root"+(de?" "+de:""),"data-state":j==="moving"?l?"opening":"closing":j,style:Oe,onKeyDown:$e,children:[e.jsx("style",{children:lt}),e.jsx("span",{className:"cmc-halo","aria-hidden":"true"}),d?e.jsxs("div",{className:"cmc-greet"+(B&&j==="closed"?" is-shown":""),role:"status",children:[e.jsxs("button",{type:"button",className:"cmc-greet-body",tabIndex:B?0:-1,onClick:()=>T(!0),children:[e.jsx("span",{className:"cmc-greet-name",children:r}),d]}),e.jsx("button",{type:"button",className:"cmc-greet-x","aria-label":"Dismiss",tabIndex:B?0:-1,onClick:()=>De(!0),children:e.jsx(Ce,{size:10})})]}):null,e.jsx("div",{ref:G,id:me,className:"cmc-surface",role:"dialog","aria-labelledby":pe,"aria-hidden":!l,children:e.jsxs("div",{ref:he,className:"cmc-inner",children:[e.jsxs("header",{className:"cmc-head",children:[e.jsx("span",{className:"cmc-av-slot","aria-hidden":"true"}),e.jsxs("div",{className:"cmc-who","data-cmc-stage":Ne-1,children:[e.jsx("span",{id:pe,className:"cmc-name",children:r}),e.jsx("span",{className:"cmc-role",children:o})]}),e.jsxs("div",{className:"cmc-actions","data-cmc-stage":Ne-1,children:[e.jsxs("button",{type:"button",className:"cmc-btn cmc-btn-new",onClick:Fe,children:[e.jsx(it,{}),e.jsx("span",{className:"cmc-new-label",children:"New session"})]}),e.jsxs("div",{className:"cmc-menu-wrap",ref:Me,children:[e.jsx("button",{type:"button",className:"cmc-btn cmc-btn-round","aria-label":"More options","aria-haspopup":"menu","aria-expanded":N,onClick:()=>L(t=>!t),children:e.jsx(ot,{})}),e.jsx("div",{className:"cmc-menu"+(N?" is-open":""),role:"menu",children:Le.map(t=>e.jsx("button",{type:"button",role:"menuitem",className:"cmc-menu-item",tabIndex:N?0:-1,onClick:()=>Ue(t),children:t.label==="Copy transcript"&&Ge?"Copied":t.label},t.label))})]}),e.jsx("button",{type:"button",className:"cmc-btn cmc-btn-round","aria-label":"Close chat",onClick:ge,children:e.jsx(Ce,{size:12})})]})]}),e.jsxs("div",{ref:fe,className:"cmc-thread","aria-live":"polite",children:[e.jsxs("div",{className:"cmc-intro","data-cmc-stage":3,children:[e.jsx("span",{className:"cmc-mark",children:Ie??e.jsx(ze,{size:24})}),e.jsx("h2",{className:"cmc-title",children:v??e.jsxs(e.Fragment,{children:["I can help you",e.jsx("br",{}),"find what you need."]})}),g.length?e.jsx("p",{className:"cmc-lede",children:g.map((t,n)=>e.jsxs(c.Fragment,{children:[n?e.jsx("br",{}):null,t]},n))}):null]}),z.map(t=>t.role==="user"?e.jsx("div",{className:"cmc-msg cmc-msg-user",children:e.jsx("p",{className:"cmc-bubble",children:t.text})},t.id):e.jsxs("div",{className:"cmc-msg cmc-msg-bot",children:[e.jsx("p",{className:"cmc-said",children:t.text.split(" ").map((n,a)=>e.jsxs(c.Fragment,{children:[e.jsx("span",{className:"cmc-w",style:{animationDelay:Math.min(a*26,1100)+"ms"},children:n})," "]},a))}),t.products&&t.products.length?e.jsx("div",{className:"cmc-shelf",children:t.products.map((n,a)=>e.jsxs("button",{type:"button",className:"cmc-card",style:{animationDelay:240+a*70+"ms"},onClick:()=>H("Tell me more about the "+n.name.toLowerCase()),children:[e.jsx("span",{className:"cmc-card-pic",style:{background:st(n.color)},children:n.image?e.jsx("img",{src:n.image,alt:"",width:132,height:112,className:"cmc-card-img"}):e.jsx(ct,{kind:n.kind??"shirt",color:n.color??"#e9e2d3"})}),e.jsx("span",{className:"cmc-card-name",children:n.name}),n.price?e.jsx("span",{className:"cmc-card-price",children:n.price}):null]},n.name))}):null]},t.id)),S?e.jsx("div",{className:"cmc-msg cmc-msg-bot","aria-label":r+" is typing",children:e.jsxs("span",{className:"cmc-typing",children:[e.jsx("i",{}),e.jsx("i",{}),e.jsx("i",{})]})}):null]}),e.jsxs("div",{className:"cmc-foot",children:[V.length?e.jsx("div",{className:"cmc-chips","data-cmc-stage":2,children:V.slice(0,3).map((t,n)=>e.jsx("button",{type:"button",className:"cmc-chip",style:{animationDelay:n*60+"ms"},disabled:S,onClick:()=>H(t),children:t},t))},V.join("|")):null,e.jsxs("form",{className:"cmc-field"+(Pe?" is-focused":""),"data-cmc-stage":1,onSubmit:t=>{t.preventDefault(),H(C||te)},children:[e.jsx("input",{ref:U,className:"cmc-input",value:C,onChange:t=>K(t.target.value),onFocus:()=>we(!0),onBlur:()=>we(!1),"aria-label":"Message "+r,autoComplete:"off",enterKeyHint:"send"}),!C&&te?e.jsx("span",{className:"cmc-ph","aria-hidden":"true",children:e.jsx("span",{className:"cmc-ph-line",children:te},ke)}):null,e.jsx("button",{type:"submit",className:"cmc-send","aria-label":"Send",disabled:S,children:e.jsx(at,{})})]}),D?e.jsxs("div",{className:"cmc-brand","data-cmc-stage":0,children:["Powered by",e.jsx("span",{className:"cmc-brand-mark",children:D.mark??e.jsx(ze,{size:15})}),e.jsx("span",{className:"cmc-brand-name",children:D.name})]}):null]})]})}),e.jsxs("div",{ref:ue,className:"cmc-avatar","aria-hidden":"true",children:[e.jsx("span",{className:"cmc-avatar-face",children:Ye}),i?e.jsx("span",{className:"cmc-dot"}):null]}),e.jsx("button",{ref:xe,type:"button",className:"cmc-launcher","aria-label":"Chat with "+r,"aria-expanded":l,"aria-controls":me,tabIndex:l?-1:0,onClick:()=>T(!0)})]})}function nt({id:r}){const o="cmc-pc-"+r,s="cmc-pbg-"+r,i="cmc-psk-"+r,d="cmc-phr-"+r;return e.jsxs("svg",{viewBox:"0 0 64 64",width:A,height:A,className:"cmc-portrait",children:[e.jsxs("defs",{children:[e.jsx("clipPath",{id:o,children:e.jsx("circle",{cx:"32",cy:"32",r:"32"})}),e.jsxs("radialGradient",{id:s,cx:"0.35",cy:"0.25",r:"0.9",children:[e.jsx("stop",{offset:"0",stopColor:"#f6eee6"}),e.jsx("stop",{offset:"1",stopColor:"#d6c3b0"})]}),e.jsxs("radialGradient",{id:i,cx:"0.42",cy:"0.38",r:"0.7",children:[e.jsx("stop",{offset:"0",stopColor:"#f3c9ab"}),e.jsx("stop",{offset:"1",stopColor:"#dca283"})]}),e.jsxs("linearGradient",{id:d,x1:"0",y1:"0",x2:"1",y2:"1",children:[e.jsx("stop",{offset:"0",stopColor:"#6b4130"}),e.jsx("stop",{offset:"0.6",stopColor:"#4a2b1f"}),e.jsx("stop",{offset:"1",stopColor:"#331d15"})]})]}),e.jsxs("g",{clipPath:"url(#"+o+")",children:[e.jsx("rect",{width:"64",height:"64",fill:"url(#"+s+")"}),e.jsx("path",{d:"M15 31C13 15 22 6.5 33 6.5S53 15 51 31c-1 10 1.5 20 6 33H8c4.5-13 8-23 7-33Z",fill:"url(#"+d+")"}),e.jsx("path",{d:"M4 64c2.5-11 13-16.5 28-16.5S57.5 53 60 64Z",fill:"#f2ece4"}),e.jsx("path",{d:"M24 48.5c2.5 4 13.5 4 16 0",fill:"none",stroke:"#ddd3c7",strokeWidth:"1"}),e.jsx("path",{d:"M26.5 39h11v9.5c-2.5 3-8.5 3-11 0Z",fill:"#d49778"}),e.jsx("path",{d:"M26.5 42.5c3.5 2.2 7.5 2.2 11 0v-3h-11Z",fill:"#c4866a",opacity:"0.6"}),e.jsx("ellipse",{cx:"32",cy:"29",rx:"10.6",ry:"13",fill:"url(#"+i+")"}),e.jsx("ellipse",{cx:"26.2",cy:"33.2",rx:"2.4",ry:"1.4",fill:"#ee9c86",opacity:"0.32"}),e.jsx("ellipse",{cx:"37.8",cy:"33.2",rx:"2.4",ry:"1.4",fill:"#ee9c86",opacity:"0.32"}),e.jsx("path",{d:"M25.4 25.6c1.6-1 3.4-1.1 5-.3M33.6 25.3c1.6-.8 3.4-.7 5 .3",fill:"none",stroke:"#4a2b1f",strokeWidth:"0.9",strokeLinecap:"round"}),e.jsx("ellipse",{cx:"28.2",cy:"28.6",rx:"1.35",ry:"0.95",fill:"#2a1913"}),e.jsx("ellipse",{cx:"35.8",cy:"28.6",rx:"1.35",ry:"0.95",fill:"#2a1913"}),e.jsx("circle",{cx:"28.6",cy:"28.3",r:"0.32",fill:"#fff"}),e.jsx("circle",{cx:"36.2",cy:"28.3",r:"0.32",fill:"#fff"}),e.jsx("path",{d:"M32.1 29.6c-.5 2-1 3.4-.2 4 .5.3 1.2.2 1.6-.1",fill:"none",stroke:"#bf8164",strokeWidth:"0.7",strokeLinecap:"round"}),e.jsx("path",{d:"M28.9 37.1c1.9 1.5 4.3 1.5 6.2 0-1-.5-2-.6-3.1-.3-1.1-.3-2.1-.2-3.1.3Z",fill:"#c4675f"}),e.jsx("path",{d:"M29.2 37.2c1.8.7 3.8.7 5.6 0",fill:"none",stroke:"#a5524c",strokeWidth:"0.4"}),e.jsx("path",{d:"M20.6 30c-.7-11 5-17.2 13.2-17.2 6.8 0 11.2 5.3 10.7 13-3.8-5.6-9.4-8.6-15.4-7.1-4.3 1.1-7.3 5.4-8.5 11.3Z",fill:"url(#"+d+")"}),e.jsx("path",{d:"M21.2 26.5c-2.6 8.2-1.6 17.6-4.8 26.5h7.2c-1.2-8.6-.6-17.6-.8-25.4Z",fill:"#3b2219"}),e.jsx("path",{d:"M43.4 24.5c2.8 9 1 18.7 4.4 28.5h-7c1-8.8 1.4-18 1.2-26.5Z",fill:"#3b2219"}),e.jsx("path",{d:"M27 14.6c4-1.6 9.4-1.2 12.6 2",fill:"none",stroke:"#8a5a43",strokeWidth:"0.8",strokeLinecap:"round",opacity:"0.7"})]})]})}function ze({size:r}){return e.jsx("svg",{viewBox:"0 0 24 24",width:r,height:r,className:"cmc-knot",fill:"none","aria-hidden":"true",children:e.jsxs("g",{stroke:"currentColor",strokeWidth:"1.35",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 12C9.2 8.6 9.4 3.4 12 3.4s2.8 5.2 0 8.6Z"}),e.jsx("path",{d:"M12 12C9.2 8.6 9.4 3.4 12 3.4s2.8 5.2 0 8.6Z",transform:"rotate(120 12 12)"}),e.jsx("path",{d:"M12 12C9.2 8.6 9.4 3.4 12 3.4s2.8 5.2 0 8.6Z",transform:"rotate(240 12 12)"}),e.jsx("circle",{cx:"12",cy:"12",r:"5.2"})]})})}function ct({kind:r,color:o}){const s="rgba(20, 16, 12, 0.22)",i=r==="trousers"?"M19 9h22l3.4 42H34.6L30 22.5 25.4 51H15.6Z":r==="dress"?"M24.5 8.5h11L34.8 18c4.6 6 8.2 17 11.2 33H14c3-16 6.6-27 11.2-33Z":r==="tote"?"M13 23h34l-3 29H16Z":"M21 10.5 26.5 8.5c1 2.6 2 3.6 3.5 3.6s2.5-1 3.5-3.6L39 10.5 50 18.6 45.4 26.4 41 23.5V51H19V23.5l-4.4 2.9L10 18.6Z";return e.jsxs("svg",{viewBox:"0 0 60 60",width:"80",height:"80",className:"cmc-garment","aria-hidden":"true",children:[e.jsx("path",{d:i,fill:o,stroke:s,strokeWidth:"0.9",strokeLinejoin:"round"}),r==="shirt"?e.jsx("path",{d:"M30 12v39M26.5 8.5 30 14l3.5-5.5M29 20h2M29 28h2M29 36h2M29 44h2",fill:"none",stroke:s,strokeWidth:"0.9",strokeLinecap:"round"}):r==="trousers"?e.jsx("path",{d:"M19 14h22M30 14v8.5M23 14l1 6M37 14l-1 6",fill:"none",stroke:s,strokeWidth:"0.9",strokeLinecap:"round"}):r==="dress"?e.jsx("path",{d:"M25.2 18c3 1.6 6.6 1.6 9.6 0M24.5 8.5 23 4M35.5 8.5 37 4M27 24c-1.5 9-3 18-4.4 27M33 24c1.5 9 3 18 4.4 27",fill:"none",stroke:s,strokeWidth:"0.9",strokeLinecap:"round"}):e.jsx("path",{d:"M22 23c0-9 3.6-14 8-14s8 5 8 14M16.6 30h26.8",fill:"none",stroke:s,strokeWidth:"1.1",strokeLinecap:"round"}),e.jsx("path",{d:"M20 31h4M33 38h5M23 45h3M36 27h3",fill:"none",stroke:"#fff",strokeOpacity:"0.28",strokeWidth:"0.7",strokeLinecap:"round"})]})}function st(r){return"color-mix(in oklab, "+(r??"#e9e2d3")+" 26%, #f5f2ee)"}function it(){return e.jsxs("svg",{viewBox:"0 0 16 16",width:"14",height:"14",fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:"M7 2.5H4A1.5 1.5 0 0 0 2.5 4v8A1.5 1.5 0 0 0 4 13.5h8a1.5 1.5 0 0 0 1.5-1.5V9",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"}),e.jsx("path",{d:"M12.2 2.3a1.3 1.3 0 0 1 1.8 1.8L8.6 9.5 6.3 10l.5-2.3Z",stroke:"currentColor",strokeWidth:"1.4",strokeLinejoin:"round"})]})}function ot(){return e.jsxs("svg",{viewBox:"0 0 16 16",width:"14",height:"14",fill:"currentColor","aria-hidden":"true",children:[e.jsx("circle",{cx:"3.2",cy:"8",r:"1.25"}),e.jsx("circle",{cx:"8",cy:"8",r:"1.25"}),e.jsx("circle",{cx:"12.8",cy:"8",r:"1.25"})]})}function Ce({size:r}){return e.jsx("svg",{viewBox:"0 0 12 12",width:r,height:r,fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M2.5 2.5l7 7M9.5 2.5l-7 7",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function at(){return e.jsx("svg",{viewBox:"0 0 16 16",width:"16",height:"16",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M8 13V3.2M3.6 7.4 8 3l4.4 4.4",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})}const lt=`
.cmc-root {
  --cmc-bg: var(--color-background, #ffffff);
  --cmc-ink: var(--color-foreground, #121212);
  --cmc-muted: var(--color-muted-foreground, #6f6f6f);
  --cmc-line: var(--color-border, #e7e5e2);
  --cmc-accent: var(--color-primary, #0f0f0f);
  --cmc-accent-ink: var(--color-background, #ffffff);
  z-index: 60;
  pointer-events: none;
  box-sizing: border-box;
  font-family: "Inter", "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--cmc-ink);
  -webkit-font-smoothing: antialiased;
}
.cmc-root *, .cmc-root *::before, .cmc-root *::after { box-sizing: border-box; }

.cmc-surface {
  position: absolute;
  inset: 0;
  overflow: hidden;
  transform-origin: 100% 100%;
  background: var(--cmc-bg);
  box-shadow:
    0 0 0 1px color-mix(in oklab, var(--cmc-ink) 6%, transparent),
    0 2px 6px -2px rgba(20, 16, 10, 0.08),
    0 28px 64px -18px rgba(20, 16, 10, 0.32);
  will-change: transform;
  pointer-events: auto;
}
.cmc-root[data-state="closed"] .cmc-surface,
.cmc-root[data-state="closing"] .cmc-surface { pointer-events: none; }

.cmc-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  transform-origin: 100% 100%;
  container: cmc / inline-size;
  will-change: transform;
}

/* ---- header ---- */
.cmc-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 22px 24px 8px;
  flex: none;
}
.cmc-av-slot { width: 36px; height: 36px; flex: none; }
.cmc-who { display: flex; flex-direction: column; min-width: 0; flex: 1; line-height: 1.2; }
.cmc-name { font-size: 15px; font-weight: 650; letter-spacing: -0.01em; }
.cmc-role {
  font-size: 13px;
  font-weight: 500;
  color: var(--cmc-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}
.cmc-actions { display: flex; align-items: center; gap: 8px; flex: none; }
.cmc-btn {
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border-radius: 999px;
  border: 1px solid var(--cmc-line);
  background: var(--cmc-bg);
  color: var(--cmc-ink);
  font: inherit;
  font-size: 13.5px;
  font-weight: 550;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.3, 1.4, 0.5, 1), border-color 0.2s, background-color 0.2s;
}
.cmc-btn:hover { border-color: color-mix(in oklab, var(--cmc-ink) 22%, transparent); background: color-mix(in oklab, var(--cmc-ink) 3%, var(--cmc-bg)); }
.cmc-btn:active { transform: scale(0.94); }
.cmc-btn-new { padding: 0 14px 0 12px; }
.cmc-btn-round { width: 34px; padding: 0; }
.cmc-btn svg { display: block; max-width: none; flex: none; }

@container cmc (max-width: 350px) {
  .cmc-new-label { display: none; }
  .cmc-btn-new { width: 34px; padding: 0; }
}

/* ---- menu ---- */
.cmc-menu-wrap { position: relative; }
.cmc-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 3;
  min-width: 188px;
  padding: 6px;
  border-radius: 16px;
  background: var(--cmc-bg);
  border: 1px solid var(--cmc-line);
  box-shadow: 0 18px 40px -16px rgba(20, 16, 10, 0.3);
  transform-origin: 100% 0;
  transform: scale(0.9) translateY(-4px);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.3s cubic-bezier(0.3, 1.3, 0.5, 1), opacity 0.18s, visibility 0s 0.3s;
}
.cmc-menu.is-open { transform: none; opacity: 1; visibility: visible; transition-delay: 0s; }
.cmc-menu-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 9px 12px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--cmc-ink);
  font: inherit;
  font-size: 13.5px;
  cursor: pointer;
}
.cmc-menu-item:hover { background: color-mix(in oklab, var(--cmc-ink) 6%, transparent); }

/* ---- thread ---- */
.cmc-thread {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 8px 24px 18px;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 22px, #000 calc(100% - 10px), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 22px, #000 calc(100% - 10px), transparent 100%);
  scrollbar-width: thin;
  scrollbar-color: color-mix(in oklab, var(--cmc-ink) 16%, transparent) transparent;
}
.cmc-intro { margin-top: auto; padding-bottom: 10px; }
.cmc-mark { display: inline-flex; color: var(--cmc-ink); margin-bottom: 14px; }
.cmc-knot { display: block; max-width: none; }
.cmc-title {
  margin: 0;
  font-family: var(--cmc-serif);
  font-weight: 400;
  font-size: 31px;
  line-height: 1.12;
  letter-spacing: -0.035em;
  color: var(--cmc-ink);
}
.cmc-lede {
  margin: 18px 0 0;
  font-size: 13.5px;
  line-height: 1.75;
  color: color-mix(in oklab, var(--cmc-ink) 82%, var(--cmc-bg));
}

.cmc-msg { display: flex; flex-direction: column; }
.cmc-msg-user { align-items: flex-end; }
.cmc-bubble {
  margin: 0;
  max-width: 82%;
  padding: 10px 15px;
  border-radius: 20px 20px 6px 20px;
  background: var(--cmc-accent);
  color: var(--cmc-accent-ink);
  font-size: 14px;
  line-height: 1.45;
  transform-origin: 100% 100%;
  animation: cmc-pop 0.42s cubic-bezier(0.3, 1.35, 0.5, 1) both;
}
.cmc-msg-bot { align-items: flex-start; }
.cmc-said { margin: 0; font-size: 14px; line-height: 1.6; color: var(--cmc-ink); max-width: 94%; }
.cmc-w { display: inline-block; animation: cmc-word 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; }

.cmc-typing {
  display: inline-flex;
  gap: 5px;
  padding: 12px 14px;
  border-radius: 18px 18px 18px 6px;
  background: color-mix(in oklab, var(--cmc-ink) 6%, var(--cmc-bg));
  transform-origin: 0 100%;
  animation: cmc-pop 0.36s cubic-bezier(0.3, 1.35, 0.5, 1) both;
}
.cmc-typing i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cmc-muted);
  animation: cmc-bob 1.1s ease-in-out infinite;
}
.cmc-typing i:nth-child(2) { animation-delay: 0.14s; }
.cmc-typing i:nth-child(3) { animation-delay: 0.28s; }

.cmc-shelf {
  display: flex;
  gap: 10px;
  margin: 12px -24px 0;
  padding: 2px 24px 6px;
  width: calc(100% + 48px);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 24px;
  scrollbar-width: none;
}
.cmc-shelf::-webkit-scrollbar { display: none; }
.cmc-card {
  flex: none;
  width: 132px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 0 0 4px;
  border: 0;
  background: transparent;
  color: var(--cmc-ink);
  font: inherit;
  text-align: left;
  cursor: pointer;
  scroll-snap-align: start;
  animation: cmc-rise 0.55s cubic-bezier(0.25, 1.2, 0.45, 1) both;
}
.cmc-card-pic {
  width: 132px;
  height: 112px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  margin-bottom: 6px;
  overflow: hidden;
  border: 1px solid color-mix(in oklab, var(--cmc-ink) 6%, transparent);
  transition: transform 0.35s cubic-bezier(0.3, 1.3, 0.5, 1);
}
.cmc-card:hover .cmc-card-pic { transform: translateY(-3px) scale(1.02); }
.cmc-card-img { width: 132px; height: 112px; max-width: none; object-fit: cover; display: block; }
.cmc-garment { display: block; width: 80px; height: 80px; max-width: none; transition: transform 0.45s cubic-bezier(0.3, 1.3, 0.5, 1); }
.cmc-card:hover .cmc-garment { transform: rotate(-4deg) scale(1.06); }
.cmc-card-name { font-size: 12.5px; font-weight: 550; line-height: 1.3; }
.cmc-card-price { font-size: 12.5px; color: var(--cmc-muted); }

/* ---- footer: chips, field, brand ---- */
.cmc-foot { flex: none; padding: 0 24px 14px; display: flex; flex-direction: column; gap: 12px; }
.cmc-chips { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 8px; }
.cmc-chip {
  height: 38px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1.25px solid var(--cmc-ink);
  background: var(--cmc-bg);
  color: var(--cmc-ink);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  animation: cmc-rise 0.5s cubic-bezier(0.25, 1.3, 0.45, 1) both;
  transition: transform 0.25s cubic-bezier(0.3, 1.4, 0.5, 1), background-color 0.2s, color 0.2s;
}
.cmc-chip:hover:not(:disabled) { background: var(--cmc-ink); color: var(--cmc-bg); }
.cmc-chip:active:not(:disabled) { transform: scale(0.95); }
.cmc-chip:disabled { opacity: 0.45; cursor: default; }

.cmc-field {
  position: relative;
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 7px 0 20px;
  border-radius: 999px;
  border: 1.25px solid var(--cmc-ink);
  background: var(--cmc-bg);
  transition: box-shadow 0.25s;
}
.cmc-field.is-focused { box-shadow: 0 0 0 4px color-mix(in oklab, var(--cmc-ink) 8%, transparent); }
.cmc-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--cmc-ink);
  font: inherit;
  font-size: 15px;
  padding: 0 10px 0 0;
}
.cmc-ph {
  position: absolute;
  left: 20px;
  right: 56px;
  top: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  display: flex;
  align-items: center;
}
.cmc-ph-line {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  color: var(--cmc-muted);
  animation: cmc-roll 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
}
.cmc-send {
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 0;
  display: grid;
  place-items: center;
  background: var(--cmc-accent);
  color: var(--cmc-accent-ink);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.3, 1.5, 0.5, 1), opacity 0.2s;
}
.cmc-send svg { display: block; max-width: none; transition: transform 0.3s cubic-bezier(0.3, 1.5, 0.5, 1); }
.cmc-send:hover:not(:disabled) svg { transform: translateY(-2px); }
.cmc-send:active:not(:disabled) { transform: scale(0.88); }
.cmc-send:disabled { opacity: 0.4; cursor: default; }

.cmc-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 11.5px;
  color: color-mix(in oklab, var(--cmc-ink) 72%, var(--cmc-bg));
  letter-spacing: -0.01em;
}
.cmc-brand-mark { display: inline-flex; margin-left: 3px; color: var(--cmc-ink); }
.cmc-brand-name { font-family: var(--cmc-serif); font-size: 17px; line-height: 1; letter-spacing: -0.03em; color: var(--cmc-ink); }

/* ---- the travelling portrait ---- */
.cmc-avatar {
  position: absolute;
  left: 0;
  top: 0;
  width: 36px;
  height: 36px;
  transform-origin: 0 0;
  will-change: transform;
  pointer-events: none;
  z-index: 2;
}
.cmc-avatar-face {
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background: color-mix(in oklab, var(--cmc-ink) 8%, var(--cmc-bg));
}
.cmc-avatar-face > * { width: 36px; height: 36px; }
.cmc-portrait, .cmc-avatar-img { display: block; width: 36px; height: 36px; max-width: none; object-fit: cover; }
.cmc-dot {
  position: absolute;
  top: 0;
  right: -1px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3fb76b;
  box-shadow: 0 0 0 2px var(--cmc-bg);
}

/* ---- closed: launcher, halo, greeting ---- */
.cmc-launcher {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60px;
  height: 60px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  pointer-events: auto;
  z-index: 3;
  -webkit-tap-highlight-color: transparent;
}
.cmc-root:not([data-state="closed"]) .cmc-launcher { pointer-events: none; }
.cmc-launcher:focus-visible { outline: 2px solid var(--cmc-ink); outline-offset: 3px; }

.cmc-halo {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1.5px solid var(--cmc-ink);
  opacity: 0;
  pointer-events: none;
}
.cmc-root[data-state="closed"] .cmc-halo { animation: cmc-breathe 3.6s cubic-bezier(0.2, 0.7, 0.3, 1) 1.2s infinite; }
.cmc-root[data-state="closed"]:has(.cmc-launcher:hover) .cmc-halo { animation-duration: 1.6s; }

.cmc-greet {
  position: absolute;
  right: 0;
  bottom: 74px;
  display: flex;
  align-items: flex-start;
  gap: 2px;
  max-width: 250px;
  padding: 12px 10px 12px 16px;
  border-radius: 20px 20px 6px 20px;
  background: var(--cmc-bg);
  border: 1px solid var(--cmc-line);
  box-shadow: 0 18px 40px -18px rgba(20, 16, 10, 0.35);
  transform-origin: 100% 100%;
  transform: scale(0.4) translateY(20px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: transform 0.5s cubic-bezier(0.3, 1.35, 0.5, 1), opacity 0.2s, visibility 0s 0.5s;
}
.cmc-greet.is-shown { transform: none; opacity: 1; visibility: visible; pointer-events: auto; transition-delay: 0s; }
.cmc-greet-body {
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--cmc-ink);
  font: inherit;
  font-size: 13.5px;
  line-height: 1.45;
  text-align: left;
  cursor: pointer;
}
.cmc-greet-name { display: block; font-size: 12px; font-weight: 650; color: var(--cmc-muted); margin-bottom: 2px; }
.cmc-greet-x {
  flex: none;
  width: 22px;
  height: 22px;
  margin-top: -4px;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: transparent;
  color: var(--cmc-muted);
  cursor: pointer;
}
.cmc-greet-x:hover { background: color-mix(in oklab, var(--cmc-ink) 6%, transparent); color: var(--cmc-ink); }
.cmc-greet-x svg { display: block; max-width: none; }

.cmc-root button:focus-visible { outline: 2px solid var(--cmc-ink); outline-offset: 2px; }

@keyframes cmc-pop { from { transform: scale(0.6); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes cmc-word { from { transform: translateY(6px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes cmc-rise { from { transform: translateY(10px) scale(0.96); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes cmc-roll { from { transform: translateY(110%); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes cmc-bob { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-4px); } }
@keyframes cmc-breathe { 0% { transform: scale(1); opacity: 0.35; } 70%, 100% { transform: scale(1.45); opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .cmc-root *, .cmc-root *::before, .cmc-root *::after { animation: none !important; transition: none !important; }
}
`;export{mt as C};
