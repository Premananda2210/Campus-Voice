import{r as c,j as n}from"./index-CdiR0C0d.js";const D=24,R=6,k=180;function Y(e=D,p=R){const t=[];for(let u=0;u<p;u++)for(let r=0;r<e;r++){const o=Math.sin(r*12.9898+u*78.233)*43758.5453,g=o-Math.floor(o);t.push(r/(e-1)*.7+g*.3)}return t}const A=Y(),H=`
.dsn-root {
  /* The bar is sized in a fluid unit, re-based at each breakpoint, so the whole
     header scales with the viewport instead of reflowing. It lands on 10px at
     1728 / 834 / 393 wide. Kept in the stylesheet, not inline, or the inline
     value would outrank the breakpoints below. */
  --dsn-u: calc(0.5787407vw * var(--dsn-scale, 1));
  --dsn-b: max(1px, calc(var(--dsn-u) * 0.1));
  /* In flow by default, so an unpinned bar occupies its own space and whatever
     follows it starts below rather than underneath. The inset is a margin here
     and an offset when fixed, so both modes sit the same 0.8u off the edge. */
  position: relative;
  margin: calc(var(--dsn-u) * 0.8);
  z-index: 60;
  pointer-events: none;
  font-family: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  -webkit-font-smoothing: antialiased;
}
.dsn-root.dsn-sticky {
  position: fixed;
  margin: 0;
  top: calc(var(--dsn-u) * 0.8);
  left: calc(var(--dsn-u) * 0.8);
  right: calc(var(--dsn-u) * 0.8);
}

.dsn-bar {
  position: relative;
  transition: transform 0.4s ease;
  background-color: var(--dsn-paper);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23g)' opacity='0.045'/%3E%3C/svg%3E");
}
.dsn-root.dsn-hidden .dsn-bar { transform: translateY(-101%); }

/* Hairlines. The bar draws its own bottom rule and one left rule per cell, so
   adjacent cells never double up into a 2px line. */
.dsn-rule { position: absolute; z-index: 2; background-color: var(--dsn-rule); pointer-events: none; }
.dsn-rule-b { left: 0; right: 0; bottom: 0; height: var(--dsn-b); }
.dsn-rule-l { left: 0; top: 0; width: var(--dsn-b); height: 100%; }

.dsn-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(1px, 1fr));
  column-gap: calc(var(--dsn-u) * 2);
}

/* ---- logo ---------------------------------------------------------------- */
.dsn-logo {
  grid-column: 1 / 7;
  display: flex;
  padding: calc(var(--dsn-u) * 1.2) 0 calc(var(--dsn-u) * 1.2) calc(var(--dsn-u) * 3.2);
}
.dsn-logo-in {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  pointer-events: auto;
}
.dsn-mark {
  position: relative;
  z-index: 2;
  display: block;
  flex: none;
  width: calc(var(--dsn-u) * 3.8);
  color: var(--dsn-ink);
  background-color: var(--dsn-paper);
  text-decoration: none;
}
.dsn-mark svg { display: block; width: 100%; height: auto; }
.dsn-word {
  display: block;
  flex: none;
  padding-left: var(--dsn-u);
  color: var(--dsn-ink);
  font-family: "Inter Tight", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: calc(var(--dsn-u) * 2.4);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  white-space: nowrap;
  text-decoration: none;
  text-transform: uppercase;
  transition: transform 0.4s ease;
}
.dsn-root.dsn-scrolled .dsn-word { transform: translateX(-100%); pointer-events: none; }
.dsn-logo-in:hover .dsn-word { transform: translateX(0); pointer-events: auto; }

/* ---- nav ----------------------------------------------------------------- */
.dsn-nav {
  grid-column: 7 / 13;
  display: flex;
  margin-left: calc(var(--dsn-u) * -1);
  pointer-events: auto;
}
.dsn-menu { display: flex; width: 100%; }
.dsn-item-wrap { position: relative; flex: 1; }

/* ---- a cell -------------------------------------------------------------- */
.dsn-fill {
  position: relative;
  z-index: 0;
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: calc(var(--dsn-u) * 1.2);
  border: 0;
  border-radius: 0;
  background: none;
  color: var(--dsn-dim);
  font: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.3s cubic-bezier(0.625, 0.05, 0, 1);
}
.dsn-fill:hover, .dsn-fill:focus-visible { color: var(--dsn-paper); }
.dsn-fill:focus-visible { outline: var(--dsn-b) solid var(--dsn-accent); outline-offset: calc(var(--dsn-u) * -0.4); }

/* The dissolve. Oversized to 24:6 so the cells stay square whatever the cell's
   own aspect ratio is, then clipped by the button's overflow. */
.dsn-px {
  position: absolute;
  z-index: 0;
  top: calc(var(--dsn-b) * -1);
  left: calc(var(--dsn-b) * -1);
  height: calc(100% + var(--dsn-b) * 2);
  aspect-ratio: 24 / 6;
  min-width: calc(100% + var(--dsn-b) * 2);
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(6, 1fr);
  pointer-events: none;
}
.dsn-px i {
  display: block;
  background-color: var(--dsn-fill-color);
  opacity: 0;
  transition: opacity var(--dsn-cell) linear var(--dsn-d);
}
.dsn-fill:hover .dsn-px i,
.dsn-fill:focus-visible .dsn-px i,
.dsn-open > .dsn-fill .dsn-px i { opacity: 1; }

/* ---- rolling label ------------------------------------------------------- */
.dsn-label { position: relative; z-index: 3; flex: 1; align-self: flex-start; display: grid; overflow: hidden; }
.dsn-label span {
  grid-area: 1 / 1;
  font-size: calc(var(--dsn-u) * 1.4);
  line-height: 1.4;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: uppercase;
  white-space: nowrap;
  transition: transform 0.48s cubic-bezier(0.625, 0.05, 0, 1);
}
.dsn-label span + span { transform: translateY(100%); }
.dsn-fill:hover .dsn-label span,
.dsn-fill:focus-visible .dsn-label span,
.dsn-open > .dsn-fill .dsn-label span { transform: translateY(-100%); }
.dsn-fill:hover .dsn-label span + span,
.dsn-fill:focus-visible .dsn-label span + span,
.dsn-open > .dsn-fill .dsn-label span + span { transform: translateY(0); }

/* ---- corner ticks on submenu cells --------------------------------------- */
.dsn-tick {
  position: absolute;
  z-index: 2;
  width: calc(var(--dsn-u) * 0.6);
  right: calc(var(--dsn-u) * 0.6);
  color: currentColor;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
.dsn-tick svg { display: block; width: 100%; height: auto; }
.dsn-tick-t { top: calc(var(--dsn-u) * 0.6); transform: translate(calc(100% + var(--dsn-u) * 1.2), calc(-100% - var(--dsn-u) * 1.2)); }
.dsn-tick-b { bottom: calc(var(--dsn-u) * 0.6); }
.dsn-open .dsn-tick-t { transform: translate(0, 0); }
.dsn-open .dsn-tick-b { transform: translate(calc(100% + var(--dsn-u) * 1.2), calc(100% + var(--dsn-u) * 1.2)); }

/* ---- dropdown ------------------------------------------------------------ */
.dsn-drop {
  position: absolute;
  top: calc(100% - var(--dsn-b));
  left: 0;
  display: grid;
  grid-template-rows: 0fr;
  grid-template-columns: 1fr;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease, grid-template-rows 0.4s ease;
}
.dsn-drop-in {
  min-width: calc(var(--dsn-u) * 26.4);
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: var(--dsn-b) solid var(--dsn-rule);
  background-color: var(--dsn-paper);
}
.dsn-drop-item { border-bottom: var(--dsn-b) solid var(--dsn-rule); }
.dsn-drop-item:last-child { border-bottom: 0; }

/* ---- CTA ----------------------------------------------------------------- */
.dsn-cta {
  position: relative;
  flex: none;
  width: calc(var(--dsn-u) * 20);
  --dsn-fill-color: var(--dsn-accent);
}
.dsn-cta .dsn-fill {
  flex-direction: row;
  color: var(--dsn-accent);
  padding: calc(var(--dsn-u) * 1.2) calc(var(--dsn-u) * 0.4) calc(var(--dsn-u) * 0.4) calc(var(--dsn-u) * 1.2);
}
.dsn-cta .dsn-fill:hover, .dsn-cta .dsn-fill:focus-visible { color: var(--dsn-paper); }
.dsn-arrow { position: relative; z-index: 3; align-self: flex-end; flex: none; width: calc(var(--dsn-u) * 2); overflow: hidden; }
.dsn-arrow svg { display: block; width: 100%; height: auto; }
.dsn-arrow span { display: block; transition: transform 0.48s cubic-bezier(0.625, 0.05, 0, 1); }
.dsn-arrow span + span { position: absolute; inset: 0; transform: translateX(-100%); }
.dsn-fill:hover .dsn-arrow span,
.dsn-fill:focus-visible .dsn-arrow span { transform: translateX(100%); }
.dsn-fill:hover .dsn-arrow span + span,
.dsn-fill:focus-visible .dsn-arrow span + span { transform: translateX(0); }

/* ---- burger -------------------------------------------------------------- */
.dsn-burger { display: none; }
.dsn-burger-ic { position: absolute; right: calc(var(--dsn-u) * 1.6); display: flex; flex-direction: column; gap: calc(var(--dsn-u) * 0.2); width: calc(var(--dsn-u) * 1.5); }
.dsn-burger-ic b { display: block; width: 100%; height: var(--dsn-b); background-color: var(--dsn-ink); transform-origin: 50%; transition: transform 0.4s ease; }

/* ---- desktop: hover opens the drop panel --------------------------------- */
@media (min-width: 992px) {
  .dsn-item-wrap:hover .dsn-drop,
  .dsn-item-wrap:focus-within .dsn-drop {
    grid-template-rows: 1fr;
    opacity: 1;
    pointer-events: auto;
  }
  .dsn-item-wrap:hover .dsn-tick-t,
  .dsn-item-wrap:focus-within .dsn-tick-t { transform: translate(0, 0); }
  .dsn-item-wrap:hover .dsn-tick-b,
  .dsn-item-wrap:focus-within .dsn-tick-b { transform: translate(calc(100% + var(--dsn-u) * 1.2), calc(100% + var(--dsn-u) * 1.2)); }
}

/* ---- mobile: the menu is a panel that clips open -------------------------- */
@media (max-width: 991px) {
  .dsn-root { --dsn-u: calc(1.1990408vw * var(--dsn-scale, 1)); }
  .dsn-logo { padding-left: calc(var(--dsn-u) * 2.4); }
  .dsn-nav { margin-left: calc(var(--dsn-u) * -0.8); position: relative; }
  .dsn-burger {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: calc(var(--dsn-u) * 1.2);
    border: 0;
    background: none;
    color: var(--dsn-dim);
    font: inherit;
    font-size: calc(var(--dsn-u) * 1.4);
    line-height: 1.4;
    font-weight: 500;
    text-transform: uppercase;
    cursor: pointer;
  }
  .dsn-burger.dsn-on .dsn-burger-ic b:first-child,
  .dsn-burger.dsn-on .dsn-burger-ic b:last-child { transform: scaleX(0); }
  .dsn-menu {
    position: absolute;
    top: 100%;
    left: 0;
    flex-direction: column;
    width: calc(100% + 1px);
    border-left: var(--dsn-b) solid var(--dsn-rule);
    border-right: var(--dsn-b) solid var(--dsn-rule);
    background-color: var(--dsn-paper);
    clip-path: inset(0 0 100%);
    pointer-events: none;
    transition: clip-path 0.4s ease;
  }
  .dsn-menu.dsn-on { clip-path: inset(0); pointer-events: auto; }
  .dsn-item-wrap { flex: 0 auto; }
  .dsn-item-wrap > .dsn-rule-l { display: none; }
  .dsn-fill { border-bottom: var(--dsn-b) solid var(--dsn-rule); }
  .dsn-tick { display: none; }
  .dsn-drop {
    position: static;
    opacity: 1;
    pointer-events: auto;
    grid-template-rows: 0fr;
    background-color: rgba(0, 0, 0, 0.04);
    transition: grid-template-rows 0.4s ease;
  }
  .dsn-open > .dsn-drop { grid-template-rows: 1fr; }
  .dsn-drop-in { min-width: auto; border: 0; background: none; }
  .dsn-cta { width: 100%; }
}

@media (max-width: 767px) {
  .dsn-root { --dsn-u: calc(2.5445293vw * var(--dsn-scale, 1)); }
  .dsn-logo { padding: var(--dsn-u) 0 var(--dsn-u) calc(var(--dsn-u) * 1.2); }
  .dsn-mark { width: calc(var(--dsn-u) * 2.8); }
  .dsn-word { padding-left: calc(var(--dsn-u) * 0.8); font-size: calc(var(--dsn-u) * 2); }
}

@media (prefers-reduced-motion: reduce) {
  .dsn-px i { transition-delay: 0s; transition-duration: 0.12s; }
  .dsn-bar, .dsn-word, .dsn-tick, .dsn-drop, .dsn-menu, .dsn-label span, .dsn-arrow span {
    transition-duration: 0.01ms;
  }
}
`;function B(){return n.jsxs("svg",{viewBox:"0 0 34 39",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[n.jsx("rect",{x:"1",y:"1",width:"32",height:"37",stroke:"currentColor",strokeWidth:"2"}),n.jsx("rect",{x:"7",y:"7",width:"8",height:"9",fill:"currentColor"}),n.jsx("rect",{x:"19",y:"7",width:"8",height:"9",fill:"currentColor",opacity:"0.35"}),n.jsx("rect",{x:"7",y:"23",width:"8",height:"9",fill:"currentColor",opacity:"0.35"}),n.jsx("rect",{x:"19",y:"23",width:"8",height:"9",fill:"currentColor"})]})}function N({variant:e}){return n.jsx("span",{className:"dsn-tick dsn-tick-"+e,"aria-hidden":"true",children:n.jsx("svg",{viewBox:"0 0 7 7",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:n.jsx("path",{d:"M6 6.5V0.5H0",stroke:"currentColor",strokeLinejoin:"round"})})})}function C(){return n.jsx("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:n.jsx("path",{d:"M11.875 14.375L16.25 9.93818L11.875 5.625M16.25 9.93818H2.5",stroke:"currentColor",strokeWidth:"1.5"})})}function b({sweepMs:e}){return n.jsx("span",{className:"dsn-px","aria-hidden":"true",children:A.map((p,t)=>n.jsx("i",{style:{"--dsn-d":Math.round(p*e)+"ms"}},t))})}function m({children:e}){return n.jsxs("span",{className:"dsn-label",children:[n.jsx("span",{children:e}),n.jsx("span",{"aria-hidden":"true",children:e})]})}const F=[{label:"Product",children:[{label:"Overview",href:"#overview"},{label:"Integrations",href:"#integrations"}]},{label:"Pricing",href:"#pricing"},{label:"Resources",children:[{label:"Insights",href:"#insights"},{label:"Changelog",href:"#changelog"},{label:"Docs",href:"#docs"}]},{label:"About",href:"#about"}];function W({brand:e="Northmark",logo:p,logoHref:t="#",items:u=F,cta:r={label:"Contact us",href:"#contact"},ink:o="#282828",paper:g="#f5f5ed",rule:E="#b3b3af",accent:z="#fa3600",scale:M=1,durationMs:S=500,sticky:x=!0,className:L}){const[T,O]=c.useState(!1),[X,I]=c.useState(!1),[l,j]=c.useState(!1),[f,y]=c.useState(null);c.useEffect(()=>{if(!x)return;let s=window.scrollY;const a=h=>{const i=h&&h.target,d=i&&i!==document?i.scrollTop:window.scrollY;O(d>8),I(d>120&&d>s&&!l),s=d};return a(),window.addEventListener("scroll",a,{passive:!0,capture:!0}),()=>window.removeEventListener("scroll",a,{capture:!0})},[x,l]),c.useEffect(()=>{if(f===null&&!l)return;const s=a=>{a.key==="Escape"&&(f!==null?y(null):j(!1))};return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[f,l]);const v=Math.max(0,S-k),P={"--dsn-scale":M,"--dsn-ink":o,"--dsn-paper":g,"--dsn-rule":E,"--dsn-accent":z,"--dsn-dim":"color-mix(in srgb, "+o+" 72%, transparent)","--dsn-fill-color":o,"--dsn-cell":k+"ms"},_=["dsn-root",x?"dsn-sticky":"",T?"dsn-scrolled":"",X?"dsn-hidden":"",L||""].filter(Boolean).join(" ");return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:H}),n.jsx("header",{className:_,style:P,children:n.jsxs("div",{className:"dsn-bar",children:[n.jsx("span",{className:"dsn-rule dsn-rule-b"}),n.jsxs("div",{className:"dsn-grid",children:[n.jsx("div",{className:"dsn-logo",children:n.jsxs("div",{className:"dsn-logo-in",children:[n.jsx("a",{className:"dsn-mark",href:t,"aria-label":e,children:p??n.jsx(B,{})}),n.jsx("a",{className:"dsn-word",href:t,tabIndex:-1,"aria-hidden":"true",children:e})]})}),n.jsxs("div",{className:"dsn-nav",children:[n.jsxs("button",{type:"button",className:"dsn-burger"+(l?" dsn-on":""),"aria-expanded":l,onClick:()=>j(s=>!s),children:[n.jsx("span",{className:"dsn-rule dsn-rule-l"}),"Menu",n.jsxs("span",{className:"dsn-burger-ic","aria-hidden":"true",children:[n.jsx("b",{}),n.jsx("b",{}),n.jsx("b",{})]})]}),n.jsxs("div",{className:"dsn-menu"+(l?" dsn-on":""),children:[u.map((s,a)=>{var d;const h=!!((d=s.children)!=null&&d.length),i=f===a;return n.jsxs("div",{className:"dsn-item-wrap"+(i?" dsn-open":""),children:[n.jsx("span",{className:"dsn-rule dsn-rule-l"}),h?n.jsxs("button",{type:"button",className:"dsn-fill","aria-expanded":i,onClick:()=>y(i?null:a),children:[n.jsx(b,{sweepMs:v}),n.jsx(m,{children:s.label}),n.jsx(N,{variant:"t"}),n.jsx(N,{variant:"b"})]}):n.jsxs("a",{className:"dsn-fill",href:s.href,children:[n.jsx(b,{sweepMs:v}),n.jsx(m,{children:s.label})]}),h&&n.jsx("div",{className:"dsn-drop",children:n.jsx("div",{className:"dsn-drop-in",children:s.children.map(w=>n.jsxs("a",{className:"dsn-fill dsn-drop-item",href:w.href,children:[n.jsx(b,{sweepMs:v}),n.jsx(m,{children:w.label})]},w.label))})})]},s.label)}),r&&n.jsxs("div",{className:"dsn-cta",children:[n.jsx("span",{className:"dsn-rule dsn-rule-l"}),n.jsxs("a",{className:"dsn-fill",href:r.href,children:[n.jsx(b,{sweepMs:v}),n.jsx(m,{children:r.label}),n.jsxs("span",{className:"dsn-arrow","aria-hidden":"true",children:[n.jsx("span",{children:n.jsx(C,{})}),n.jsx("span",{children:n.jsx(C,{})})]})]})]})]})]})]})]})})]})}export{W as D};
