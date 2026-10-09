import{r as i,j as e}from"./index-CdiR0C0d.js";const I=[{title:"Meridian",links:[{label:"Dining",href:"#dining"},{label:"Travel",href:"#travel"},{label:"Card",href:"#card"},{label:"App",href:"#app"},{label:"Concierge",href:"#concierge"}]},{title:"Benefits",links:[{label:"Member Benefits",href:"#benefits"},{label:"Lounge Access",href:"#lounges"}]},{title:"Contact",links:[{label:"Email",href:"#email"},{label:"Twitter",href:"#twitter"},{label:"Instagram",href:"#instagram"}]}];function q(t){const o=t.match(/^\s*rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*[\d.]+%?\s*)?\)\s*$/i);return o?"rgb("+o[1]+", "+o[2]+", "+o[3]+")":t}function G(t){return/^\s*rgba\(/i.test(t)?t.replace(/,\s*[\d.]+\s*\)\s*$/,", 0.32)"):t}const H=`
.fgm-root {
  position: relative;
  z-index: 50;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  font-family: "IBM Plex Mono", "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  -webkit-font-smoothing: antialiased;
  color: var(--fgm-ink);
  pointer-events: none;
}
.fgm-root.fgm-fixed { position: fixed; top: 0; left: 0; right: 0; }
/* The root keeps only the bar's height in flow; the panel unfolds over the page. */
.fgm-slot { position: relative; height: 64px; margin: 0 auto; max-width: var(--fgm-max); }

.fgm-card {
  position: absolute;
  top: 0; left: 0; right: 0;
  pointer-events: auto;
  container-type: inline-size;
  border-radius: 14px;
  background-color: var(--fgm-glass);
  -webkit-backdrop-filter: blur(var(--fgm-blur)) saturate(1.15);
  backdrop-filter: blur(var(--fgm-blur)) saturate(1.15);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.18),
    0 1px 2px rgba(20, 16, 12, 0.06),
    0 18px 50px -18px rgba(20, 16, 12, 0.28);
  overflow: hidden;
  transition: box-shadow 0.5s ease;
}
.fgm-open .fgm-card {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.18),
    0 2px 4px rgba(20, 16, 12, 0.06),
    0 40px 90px -30px rgba(20, 16, 12, 0.45);
}
/* A faint film grain so the glass reads as frosted rather than as a flat tint. */
.fgm-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E");
}

/* ---- head row ------------------------------------------------------------ */
.fgm-head {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 14px 0 20px;
}
.fgm-head::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: var(--fgm-rule);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.fgm-open .fgm-head::after { transform: scaleX(1); }

.fgm-logo {
  display: inline-flex;
  width: 36px;
  height: 36px;
  color: var(--fgm-ink);
  border-radius: 999px;
  outline-offset: 4px;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.fgm-logo svg { width: 100%; height: 100%; display: block; max-width: none; }
.fgm-logo:hover { transform: rotate(90deg); }

.fgm-toggle {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--fgm-ink);
  font: inherit;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 44px;
  padding: 0 10px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background-color 0.25s ease;
}
.fgm-toggle:hover { background-color: color-mix(in srgb, var(--fgm-ink) 7%, transparent); }
.fgm-toggle-word { position: relative; display: inline-block; height: 1.3em; overflow: hidden; line-height: 1.3; }
.fgm-toggle-word span { display: block; transition: transform 0.45s cubic-bezier(0.7, 0, 0.2, 1); }
.fgm-open .fgm-toggle-word span { transform: translateY(-100%); }
.fgm-icon { position: relative; width: 24px; height: 24px; flex: none; }
.fgm-icon i {
  position: absolute;
  left: 2px; right: 2px; top: 50%;
  height: 1.75px;
  margin-top: -0.875px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.45s cubic-bezier(0.7, 0, 0.2, 1);
}
.fgm-icon i:nth-child(1) { transform: translateY(-4px); }
.fgm-icon i:nth-child(2) { transform: translateY(4px); }
.fgm-open .fgm-icon i:nth-child(1) { transform: rotate(45deg); }
.fgm-open .fgm-icon i:nth-child(2) { transform: rotate(-45deg); }

/* ---- body: unfolds with the 0fr -> 1fr grid trick, so no measured heights ---- */
.fgm-fold {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.fgm-open .fgm-fold { grid-template-rows: 1fr; }
/* Never taller than the screen: a long index scrolls inside the glass. */
.fgm-fold-inner {
  min-height: 0;
  max-height: calc(100svh - 96px);
  overflow: hidden auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
}
.fgm-closed .fgm-fold-inner { visibility: hidden; transition: visibility 0s linear 0.6s; }

.fgm-body {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--fgm-cols), max-content) minmax(0, 1fr);
  column-gap: clamp(28px, 7cqi, 76px);
  padding: 40px 30px 0;
  min-height: 330px;
}
.fgm-col { display: flex; flex-direction: column; min-width: 0; }
.fgm-col-title {
  margin: 0 0 22px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fgm-muted);
}
.fgm-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }

.fgm-reveal {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fgm-open .fgm-reveal {
  opacity: 1;
  transform: none;
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: calc(120ms + var(--i, 0) * 40ms);
}

.fgm-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  color: var(--fgm-ink);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
  outline: none;
  transition: opacity 0.3s ease, color 0.3s ease;
}
/* The label is set twice and rolled up a line on hover. */
.fgm-roll { position: relative; display: inline-block; height: 1.3em; line-height: 1.3; overflow: hidden; }
.fgm-roll span { display: block; transition: transform 0.45s cubic-bezier(0.7, 0, 0.2, 1); }
.fgm-roll span + span { position: absolute; left: 0; top: 100%; }
.fgm-link:hover .fgm-roll span,
.fgm-link:focus-visible .fgm-roll span { transform: translateY(-100%); }
.fgm-link::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 6px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.45s cubic-bezier(0.7, 0, 0.2, 1);
}
.fgm-link:hover::after,
.fgm-link:focus-visible::after { transform: scaleX(1); transform-origin: left center; }
.fgm-dot {
  width: 5px; height: 5px;
  border-radius: 999px;
  background: currentColor;
  margin-left: -13px;
  opacity: 0;
  transform: scale(0);
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease, margin 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.fgm-link:hover .fgm-dot,
.fgm-link:focus-visible .fgm-dot { opacity: 1; transform: scale(1); margin-left: 0; }
/* Hovering one link quiets the rest of the index. */
.fgm-body:has(.fgm-link:hover) .fgm-link:not(:hover) { opacity: 0.38; }

/* ---- call-to-action ------------------------------------------------------- */
.fgm-aside { justify-self: end; display: flex; flex-direction: column; align-items: flex-end; }
.fgm-cta {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 46px;
  padding: 0 22px 0 24px;
  border-radius: 999px;
  border: 1.5px solid var(--fgm-cta-rule);
  color: var(--fgm-ink);
  background: rgba(255, 255, 255, 0.18);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  outline-offset: 3px;
  transition: color 0.45s cubic-bezier(0.7, 0, 0.2, 1), border-color 0.45s ease;
}
.fgm-cta::before {
  content: "";
  position: absolute;
  inset: -2px;
  z-index: -1;
  border-radius: inherit;
  background: var(--fgm-ink);
  clip-path: circle(0% at 12% 50%);
  transition: clip-path 0.55s cubic-bezier(0.7, 0, 0.2, 1);
}
.fgm-cta:hover, .fgm-cta:focus-visible { color: var(--fgm-glass-solid); border-color: var(--fgm-ink); }
.fgm-cta:hover::before, .fgm-cta:focus-visible::before { clip-path: circle(150% at 12% 50%); }
.fgm-arrow { width: 16px; height: 16px; flex: none; overflow: hidden; position: relative; }
.fgm-arrow svg {
  position: absolute; inset: 0;
  width: 16px; height: 16px; max-width: none;
  transition: transform 0.45s cubic-bezier(0.7, 0, 0.2, 1);
}
.fgm-arrow svg + svg { transform: translateX(-140%); }
.fgm-cta:hover .fgm-arrow svg, .fgm-cta:focus-visible .fgm-arrow svg { transform: translateX(140%); }
.fgm-cta:hover .fgm-arrow svg + svg, .fgm-cta:focus-visible .fgm-arrow svg + svg { transform: none; }

/* ---- the traveller --------------------------------------------------------- */
.fgm-mascot {
  position: absolute;
  right: 26px;
  bottom: -1px;
  width: 156px;
  height: 143px;
  color: var(--fgm-ink);
  pointer-events: none;
}
.fgm-mascot > svg { width: 156px; height: 143px; max-width: none; display: block; overflow: visible; }
.fgm-open .fgm-mascot.fgm-reveal { transform: none; }
.fgm-closed .fgm-mascot.fgm-reveal { transform: translateX(26px); }
.fgm-trav * { transform-box: view-box; }
.fgm-trav-body { transform-origin: 48px 60px; }
.fgm-trav-leg-f { transform-origin: 46px 60px; }
.fgm-trav-leg-b { transform-origin: 48px 60px; }
.fgm-trav-arm { transform-origin: 34px 34px; }
.fgm-trav-case { transform-origin: 86px 100px; }
.fgm-trav-wheel { transform-origin: 86px 99px; }
.fgm-open .fgm-trav-body { animation: fgm-bob var(--fgm-step) ease-in-out infinite; }
.fgm-open .fgm-trav-leg-f { animation: fgm-swing var(--fgm-stride) ease-in-out infinite; }
.fgm-open .fgm-trav-leg-b { animation: fgm-swing var(--fgm-stride) ease-in-out infinite reverse; }
.fgm-open .fgm-trav-arm { animation: fgm-arm var(--fgm-stride) ease-in-out infinite; }
.fgm-open .fgm-trav-case { animation: fgm-rattle var(--fgm-step) ease-in-out infinite; }
.fgm-open .fgm-trav-wheel { animation: fgm-spin var(--fgm-step) linear infinite; }
.fgm-root { --fgm-stride: 1.4s; --fgm-step: 0.7s; }
.fgm-root.fgm-rush { --fgm-stride: 0.5s; --fgm-step: 0.25s; }
.fgm-rush .fgm-trav { transform: rotate(-5deg) translateX(-6px); }
.fgm-trav { transform-origin: 50% 100%; transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
.fgm-dust { opacity: 0; transition: opacity 0.3s ease; }
.fgm-rush .fgm-dust { opacity: 1; }
.fgm-rush .fgm-dust path { animation: fgm-puff 0.5s linear infinite; }
.fgm-rush .fgm-dust path + path { animation-delay: 0.25s; }

@keyframes fgm-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.6px); } }
@keyframes fgm-swing { 0%, 100% { transform: rotate(-9deg); } 50% { transform: rotate(9deg); } }
@keyframes fgm-arm { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-14deg); } }
@keyframes fgm-rattle { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-2.5deg); } }
@keyframes fgm-spin { to { transform: rotate(-360deg); } }
@keyframes fgm-puff { from { transform: translateX(0); opacity: 1; } to { transform: translateX(10px); opacity: 0; } }

/* ---- footer ---------------------------------------------------------------- */
.fgm-foot {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 52px;
  padding: 0 30px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fgm-muted);
}
.fgm-foot::before {
  content: "";
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 1px;
  background: var(--fgm-rule);
}
.fgm-nofoot { height: 26px; }

/* ---- narrow panels ---------------------------------------------------------- */
/* Too tight for the pill beside the index: it moves to a row of its own. */
@container (max-width: 820px) {
  .fgm-body { row-gap: 30px; }
  .fgm-aside { grid-column: 1 / -1; grid-row: 1; justify-self: start; align-items: flex-start; }
}
@container (max-width: 640px) {
  .fgm-body { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 32px; padding: 28px 22px 156px; min-height: 0; }
  .fgm-aside { grid-column: 1 / -1; grid-row: 1; justify-self: stretch; align-items: stretch; }
  .fgm-cta { justify-content: space-between; }
  .fgm-foot { padding: 0 22px; }
}
@container (max-width: 330px) {
  .fgm-body { grid-template-columns: minmax(0, 1fr); }
  .fgm-mascot { right: 14px; }
}

@media (prefers-reduced-motion: reduce) {
  .fgm-root *, .fgm-root *::before, .fgm-root *::after {
    animation: none !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0s !important;
  }
}
`;function D(){return e.jsx("svg",{viewBox:"0 0 36 36","aria-hidden":"true",children:e.jsx("path",{fill:"currentColor",d:"M16.4 2.1v14.3H2.1A16 16 0 0 1 16.4 2.1Zm3.2 0a16 16 0 0 1 14.3 14.3H19.6V2.1ZM2.1 19.6h14.3v14.3A16 16 0 0 1 2.1 19.6Zm17.5 0h14.3a16 16 0 0 1-14.3 14.3V19.6Z"})})}function E(){return e.jsx("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:e.jsx("path",{d:"M2.5 8h11M9 3.5 13.5 8 9 12.5"})})}function V(){const t={fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"},o=g=>e.jsxs(e.Fragment,{children:[e.jsx("path",{d:g,...t,strokeWidth:9}),e.jsx("path",{d:g,...t,stroke:"var(--fgm-glass-solid)",strokeWidth:6})]});return e.jsx("svg",{viewBox:"0 0 120 110","aria-hidden":"true",children:e.jsxs("g",{className:"fgm-trav",children:[e.jsxs("g",{className:"fgm-dust",...t,strokeWidth:1.4,children:[e.jsx("path",{d:"M4 96h7"}),e.jsx("path",{d:"M8 90h5"})]}),e.jsx("g",{className:"fgm-trav-case",children:e.jsxs("g",{transform:"rotate(-22 86 100)",children:[e.jsx("path",{d:"M80 64V50h8v14",...t,strokeWidth:1.8}),e.jsx("rect",{x:74,y:64,width:20,height:32,rx:3.5,fill:"var(--fgm-glass-solid)",stroke:"currentColor",strokeWidth:1.8}),e.jsx("path",{d:"M80 69v22M88 69v22",...t,strokeWidth:1.4})]})}),e.jsxs("g",{className:"fgm-trav-wheel",children:[e.jsx("circle",{cx:86,cy:99,r:3,fill:"var(--fgm-glass-solid)",stroke:"currentColor",strokeWidth:1.6}),e.jsx("path",{d:"M86 97v4",...t,strokeWidth:1.2})]}),e.jsxs("g",{className:"fgm-trav-body",children:[e.jsxs("g",{className:"fgm-trav-leg-b",children:[o("M49 60 59 73 66 87"),e.jsx("path",{d:"M63 86.5c2.6-1.6 6.2-.9 7.4 1.4.9 1.8-.7 3.2-3 3.2h-5.2c-1.2 0-1.5-3.4.8-4.6Z",fill:"currentColor"})]}),e.jsxs("g",{className:"fgm-trav-leg-f",children:[o("M45 60 37 77 31 95"),e.jsx("path",{d:"M33.5 93.4c-2.2-.9-6.6-.6-9.2 1.4-1.4 1.1-1 3.2 1 3.2h8.6c1.4 0 1.8-3.8-.4-4.6Z",fill:"currentColor"})]}),e.jsx("path",{d:"M44 35 55 46 64.5 53.5",...t,strokeWidth:4.6}),e.jsx("circle",{cx:65.2,cy:54,r:2.6,fill:"currentColor"}),e.jsx("ellipse",{cx:37.6,cy:26.4,rx:5.8,ry:6.6,fill:"var(--fgm-glass-solid)",stroke:"currentColor",strokeWidth:1.6}),e.jsx("path",{d:"M42.6 25.2c1.8-.6 2.8.8 2.2 2.4-.4 1-1.4 1.4-2.4 1.2",fill:"var(--fgm-glass-solid)",stroke:"currentColor",strokeWidth:1.3,strokeLinejoin:"round"}),e.jsx("path",{d:"M31 33.5c4.6-3.6 11.4-4.1 16-1.1l4.6 26.2c-4.4 2.6-10 2.9-14.2 1.2L31 33.5Z",fill:"currentColor",stroke:"currentColor",strokeWidth:1.6,strokeLinejoin:"round"}),e.jsx("path",{d:"M46.6 33.8 32 53.5",...t,stroke:"var(--fgm-glass-solid)",strokeWidth:1.6}),e.jsx("rect",{x:23,y:49,width:13,height:10,rx:2,fill:"var(--fgm-glass-solid)",stroke:"currentColor",strokeWidth:1.7,transform:"rotate(-14 29.5 54)"}),e.jsxs("g",{className:"fgm-trav-arm",children:[e.jsx("path",{d:"M35 35 25.5 43.5 17 40",...t,strokeWidth:4.6}),e.jsx("circle",{cx:16,cy:39.6,r:2.5,fill:"currentColor"})]}),e.jsx("path",{d:"M31.2 14.6c.4-5.6 4.2-8.6 8.6-8.4 4.6.2 7.4 3.8 7.2 9.2",fill:"var(--fgm-glass-solid)",stroke:"currentColor",strokeWidth:1.7,strokeLinejoin:"round"}),e.jsx("path",{d:"M27 21.4c2.2-5.6 7.6-7 13.4-6.8 5.6.2 9.6 2 10.6 6.2.4 1.4-.8 2.4-2.6 1.8-6-2-12.4-2.2-18.8-.4-1.8.6-3.2.4-2.6-.8Z",fill:"var(--fgm-glass-solid)",stroke:"currentColor",strokeWidth:1.7,strokeLinejoin:"round"})]})]})})}function U({logo:t,logoLabel:o="Home",logoHref:g="#",columns:b=I,cta:d={label:"Become a Founding Member",href:"#join"},footer:k="2026 © Meridian Exploration, Inc.",mascot:w,open:p,defaultOpen:L=!1,onOpenChange:m,ink:W="#141210",glass:h="rgba(238, 235, 231, 0.74)",muted:R="rgba(20, 18, 16, 0.5)",rule:j="rgba(20, 18, 16, 0.14)",blur:S=28,maxWidth:x=880,fixed:X=!1,closeOnNavigate:F=!0,className:y}){const[T,A]=i.useState(L),s=p??T,[B,n]=i.useState(!1),u=i.useRef(null),M=i.useRef(null),N=i.useRef(null),C=i.useId(),l=i.useCallback(r=>{p===void 0&&A(r),m==null||m(r)},[p,m]);i.useEffect(()=>{if(!s)return;const r=v=>{var f;v.key==="Escape"&&(l(!1),(f=M.current)==null||f.focus())},a=v=>{var f;u.current&&!((f=u.current.querySelector(".fgm-card"))!=null&&f.contains(v.target))&&l(!1)};return document.addEventListener("keydown",r),document.addEventListener("pointerdown",a),()=>{document.removeEventListener("keydown",r),document.removeEventListener("pointerdown",a)}},[s,l]),i.useEffect(()=>{var r;s||n(!1),(r=N.current)==null||r.toggleAttribute("inert",!s)},[s]);const Z=i.useMemo(()=>q(h),[h]),Y={"--fgm-ink":W,"--fgm-glass":h,"--fgm-glass-solid":Z,"--fgm-muted":R,"--fgm-rule":j,"--fgm-cta-rule":G(j),"--fgm-blur":S+"px","--fgm-max":typeof x=="number"?x+"px":x,"--fgm-cols":b.length};let c=0;const z=()=>{F&&l(!1)};return e.jsxs("div",{ref:u,className:"fgm-root "+(s?"fgm-open":"fgm-closed")+(B?" fgm-rush":"")+(X?" fgm-fixed":"")+(y?" "+y:""),style:Y,children:[e.jsx("style",{children:H}),e.jsx("div",{className:"fgm-slot",children:e.jsxs("nav",{className:"fgm-card","aria-label":"Main",children:[e.jsxs("div",{className:"fgm-head",children:[e.jsx("a",{className:"fgm-logo",href:g,"aria-label":o,children:t??e.jsx(D,{})}),e.jsxs("button",{ref:M,type:"button",className:"fgm-toggle","aria-expanded":s,"aria-controls":C,onClick:()=>l(!s),children:[e.jsxs("span",{className:"fgm-toggle-word","aria-hidden":"true",children:[e.jsx("span",{children:"Menu"}),e.jsx("span",{children:"Close"})]}),e.jsxs("span",{className:"fgm-icon","aria-hidden":"true",children:[e.jsx("i",{}),e.jsx("i",{})]}),e.jsx("span",{style:{position:"absolute",width:1,height:1,overflow:"hidden",clip:"rect(0 0 0 0)"},children:s?"Close menu":"Open menu"})]})]}),e.jsx("div",{className:"fgm-fold",children:e.jsxs("div",{className:"fgm-fold-inner",id:C,ref:N,children:[e.jsxs("div",{className:"fgm-body",children:[b.map(r=>e.jsxs("div",{className:"fgm-col",children:[e.jsx("h2",{className:"fgm-col-title fgm-reveal",style:{"--i":c++},children:r.title}),e.jsx("ul",{className:"fgm-list",children:r.links.map(a=>e.jsx("li",{className:"fgm-reveal",style:{"--i":c++},children:e.jsxs("a",{className:"fgm-link",href:a.href??"#",onClick:z,...a.external?{target:"_blank",rel:"noreferrer"}:null,children:[e.jsx("span",{className:"fgm-dot","aria-hidden":"true"}),e.jsxs("span",{className:"fgm-roll",children:[e.jsx("span",{children:a.label}),e.jsx("span",{"aria-hidden":"true",children:a.label})]})]})},a.label))})]},r.title)),e.jsx("div",{className:"fgm-aside",children:d&&e.jsxs("a",{className:"fgm-cta fgm-reveal",style:{"--i":2},href:d.href,onClick:z,onPointerEnter:()=>n(!0),onPointerLeave:()=>n(!1),onFocus:()=>n(!0),onBlur:()=>n(!1),children:[e.jsx("span",{children:d.label}),e.jsxs("span",{className:"fgm-arrow","aria-hidden":"true",children:[e.jsx(E,{}),e.jsx(E,{})]})]})}),w!==null&&e.jsx("div",{className:"fgm-mascot fgm-reveal",style:{"--i":c+2},children:w??e.jsx(V,{})})]}),k!==null?e.jsx("div",{className:"fgm-foot fgm-reveal",style:{"--i":c},children:k}):e.jsx("div",{className:"fgm-nofoot"})]})})]})})]})}export{U as F};
