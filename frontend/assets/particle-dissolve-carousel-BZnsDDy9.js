import{r as u,j as c}from"./index-CdiR0C0d.js";const ht=.5,mt=.08,vt=.42,gt=.9,bt=.86,xt=6;function J(l,v,p){return v<=0?0:p?(l%v+v)%v:Math.min(Math.max(l,0),v-1)}function Ie(l,v,p){return Math.max(1e3,Math.min(Math.round(p),Math.round(l*v/xt)))}function _t(l,v){const p=Math.max(1,Math.round(Math.sqrt(l*v)));return[p,Math.max(1,Math.round(l/p))]}function wt(l,v=[.03,.03,.04]){const p=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(l.trim());if(!p)return v;const b=p[1].length===3?p[1].replace(/./g,k=>k+k):p[1];return[0,2,4].map(k=>parseInt(b.slice(k,k+2),16)/255)}function yt(l,v,p,b){const k=[[0,0],[p,0],[0,1],[p,1]];let j=0;for(const[Y,q]of k){const ee=b?(Y-l)*b[0]+(q-v)*b[1]:Math.hypot(Y-l,q-v);j=Math.max(j,ee)}return Math.max(j,.001)}const Et=2600,At=420,Rt=.05,Ft=12,Tt=2.5,kt=2.6,Z=l=>Number.isInteger(l)?l.toFixed(1):String(l),je="const float STAGGER = "+Z(ht)+`;
const float RELEASE = `+Z(mt)+`;
const float RETURN_START = `+Z(vt)+`;
const float RETURN_END = `+Z(gt)+`;
const float LAND_START = `+Z(bt)+`;
uniform float u_aspect;
uniform float u_p;
uniform vec2 u_origin;
uniform vec2 u_dir;
uniform float u_radial;
uniform float u_reach;
uniform float u_grain;
uniform float u_seed;
uniform vec2 u_cells;

float hash12(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 g = fract(p);
  vec2 u = g * g * (3.0 - 2.0 * g);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x),
             mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    s += a * vnoise(p);
    p = p * 2.03 + 17.1;
    a *= 0.5;
  }
  return s / 0.9375;
}
float order(vec2 uv) {
  vec2 s = vec2(uv.x * u_aspect, uv.y);
  float d = u_radial > 0.5 ? length(s - u_origin) : dot(s - u_origin, u_dir);
  d = clamp(d / u_reach, 0.0, 1.0);
  // Contrast-stretched so a pure-noise wave still uses the whole timeline.
  float n = clamp((fbm(s * 3.5 + u_seed) - 0.5) * 2.2 + 0.5, 0.0, 1.0);
  // Even a clean sweep gets a ragged front: noise pushed in along the edge,
  // and a little per grain so it frays like sand. Per grid cell, and every
  // grain's home lies inside its own cell, so the picture and the grains
  // draw the same number for the same place.
  float speck = hash12(floor(uv * u_cells) + u_seed) - 0.5;
  return clamp(mix(d, n, u_grain) + (n - 0.5) * 0.1 * (1.0 - u_grain) + speck * 0.07, 0.0, 1.0);
}
float phase(vec2 uv) {
  return clamp((u_p - order(uv) * STAGGER) / (1.0 - STAGGER), 0.0, 1.0);
}
`,Ce=`vec2 coverUv(vec2 uv, float ia) {
  vec2 s = u_aspect > ia ? vec2(1.0, ia / u_aspect) : vec2(u_aspect / ia, 1.0);
  return (uv - 0.5) * s + 0.5;
}
`,St=`#version 300 es
layout(location = 0) in vec2 a_position;
out vec2 vUv;
void main() {
  vUv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,Nt=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D u_from;
uniform sampler2D u_to;
uniform float u_fromAspect;
uniform float u_toAspect;
uniform vec3 u_backdrop;
uniform float u_glow;
uniform float u_still;
uniform vec2 u_res;
`+je+Ce+`void main() {
  vec3 a = texture(u_from, coverUv(vUv, u_fromAspect)).rgb;
  vec3 b = texture(u_to, coverUv(vUv, u_toAspect)).rgb;
  vec3 col;
  if (u_still > 0.5) {
    col = mix(a, b, smoothstep(0.0, 1.0, u_p));
  } else {
    float l = phase(vUv);
    // The grain is fully drawn by RELEASE / 2; only then does its place go dark.
    float showA = 1.0 - smoothstep(RELEASE * 0.5, RELEASE, l);
    float showB = smoothstep(LAND_START, 1.0, l);
    // The gap is not a hole: the backdrop, faintly lit by whichever picture
    // the grains overhead are carrying.
    vec3 gap = u_backdrop + mix(a, b, smoothstep(0.3, 0.75, l)) * 0.07;
    col = a * showA + b * showB + gap * (1.0 - showA - showB);
    // Embers: the old picture flares just as it lets go.
    float burn = smoothstep(0.0, 0.012, l) * (1.0 - smoothstep(0.012, 0.05, l));
    col += (a * 0.45 + vec3(0.05, 0.03, 0.015)) * burn * u_glow;
  }
  vec2 px = floor(vUv * u_res);
  col += (hash12(px) - 0.5) * 0.018;
  o = vec4(col, 1.0);
}
`,Mt=`#version 300 es
precision highp float;
layout(location = 0) in vec2 a_home;
layout(location = 1) in vec4 a_seed;
layout(location = 2) in vec4 a_state;
layout(location = 3) in vec2 a_life;
out vec4 v_state;
out vec2 v_life;
out vec4 v_color;
out float v_burn;
uniform sampler2D u_from;
uniform sampler2D u_to;
uniform float u_fromAspect;
uniform float u_toAspect;
uniform float u_fromLod;
uniform float u_toLod;
uniform float u_dt;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_mouseVel;
uniform float u_push;
uniform float u_turb;
uniform float u_scatter;
uniform float u_glow;
uniform float u_dust;
uniform float u_point;
`+je+Ce+`vec3 hash33(vec3 p) {
  p = fract(p * vec3(0.1031, 0.11369, 0.13787));
  p += dot(p, p.yxz + 19.19);
  return -1.0 + 2.0 * fract(vec3((p.x + p.y) * p.z, (p.x + p.z) * p.y, (p.y + p.z) * p.x));
}
float snoise(vec3 p) {
  const float K1 = 0.333333333;
  const float K2 = 0.166666667;
  vec3 i = floor(p + (p.x + p.y + p.z) * K1);
  vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
  vec3 e = step(vec3(0.0), d0 - d0.yzx);
  vec3 i1 = e * (1.0 - e.zxy);
  vec3 i2 = 1.0 - e.zxy * (1.0 - e);
  vec3 d1 = d0 - (i1 - K2);
  vec3 d2 = d0 - (i2 - 2.0 * K2);
  vec3 d3 = d0 - (1.0 - 3.0 * K2);
  vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
  vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));
  return dot(vec4(31.316), n);
}

void main() {
  vec2 home = vec2(a_home.x * u_aspect, a_home.y);
  vec2 d = a_state.xy;
  vec2 v = a_state.zw;
  float age = a_life.x;
  float maxLife = mix(2.4, 6.0, a_seed.y);
  float dt = u_dt;
  vec2 pos = home + d;

  // The flow field every loose grain rides.
  float ang = snoise(vec3(pos * 2.4, u_time * 0.11 + a_seed.z * 0.35)) * 6.2831;
  vec2 flow = vec2(cos(ang), sin(ang));

  // Pointer momentum: grains near the pointer are dragged the way it moves.
  vec2 tm = pos - u_mouse;
  float near = 0.004 / (dot(tm, tm) + 0.004);
  vec2 drag = u_mouseVel * near * near * u_push;

  float l = phase(a_home);
  float alpha = 0.0;
  float burn = 0.0;
  float toB = 0.0;

  if (l > 0.0) {
    // In the dissolve: lift off, ride the flow and the wave's wind, come home.
    float fly = smoothstep(RELEASE * 0.5, RELEASE, l) * (1.0 - smoothstep(RETURN_START, RETURN_END, l));
    vec2 wind = u_radial > 0.5 ? normalize(home - u_origin + vec2(0.0001)) : u_dir;
    vec2 acc = (flow * 1.5 * u_turb + wind * (0.7 + a_seed.w * 0.9) + vec2(0.0, 0.3)) * u_scatter * fly;
    v = v * exp(-1.1 * dt) + (acc + drag) * dt;
    d += v * dt;
    float back = smoothstep(RETURN_START, RETURN_END, l);
    pos = home + d * (1.0 - back);
    if (back >= 1.0) {
      // Home: drop the flight so the grain rests exactly where it landed.
      d = vec2(0.0);
      v = vec2(0.0);
    }
    alpha = smoothstep(0.0, RELEASE * 0.5, l) * (1.0 - smoothstep(LAND_START + 0.04, 1.0, l));
    burn = fly;
    toB = smoothstep(0.3, 0.75, l);
    age = maxLife * a_seed.w;
  } else if (a_seed.x < u_dust * 0.14) {
    // Dust: a share of the grains keeps lifting off the resting picture,
    // drifting a while and fading, then starting over from home.
    age += dt;
    if (age > maxLife) {
      age = 0.0;
      d = vec2(0.0);
      v = (a_seed.zw - 0.5) * 0.02;
    }
    float t = age / maxLife;
    v = v * exp(-0.7 * dt) + (flow * 0.32 * u_turb + vec2(0.0, 0.035) + drag) * dt;
    d += v * dt;
    pos = home + d;
    alpha = smoothstep(0.0, 0.12, t) * (1.0 - smoothstep(0.55, 1.0, t)) * smoothstep(0.0015, 0.01, length(d)) * 0.75;
    burn = alpha * 0.25;
  } else {
    // Pinned: a critically damped spring home. Only visible once something
    // has knocked it loose, and swirled a little while it is.
    float loose = length(d);
    v += (-d * 10.0 - v * 6.3 + drag + flow * min(loose, 0.08) * 5.0 * u_turb) * dt;
    d += v * dt;
    pos = home + d;
    alpha = smoothstep(0.002, 0.014, loose);
    burn = alpha * 0.4;
  }

  v_state = vec4(d, v);
  v_life = vec2(age, 0.0);

  vec3 c = alpha > 0.002
    ? mix(textureLod(u_from, coverUv(a_home, u_fromAspect), u_fromLod).rgb,
          textureLod(u_to, coverUv(a_home, u_toAspect), u_toLod).rgb, toB)
    : vec3(0.0);
  float g = burn * u_glow;
  v_color = vec4(c * (1.0 + 0.35 * g) + vec3(0.06, 0.035, 0.015) * g, alpha);
  v_burn = g;
  gl_Position = vec4(pos.x / u_aspect * 2.0 - 1.0, pos.y * 2.0 - 1.0, 0.0, 1.0);
  gl_PointSize = alpha > 0.002 ? u_point * (1.0 + 0.5 * g) : 0.0;
}
`,Lt=`#version 300 es
precision highp float;
in vec4 v_color;
in float v_burn;
out vec4 o;
void main() {
  float r = length(gl_PointCoord - 0.5);
  float a = v_color.a * (1.0 - smoothstep(0.18, 0.5, r));
  o = vec4(v_color.rgb * a, a * (1.0 - 0.4 * v_burn));
}
`,Pt=l=>new Promise((v,p)=>{const b=new Image;b.crossOrigin="anonymous",b.decoding="async",b.onload=()=>v(b),b.onerror=()=>p(new Error("could not load "+l)),b.src=l}),Be=l=>String(l).padStart(2,"0"),Ut=".pdc-root{position:relative;display:block;width:100%;overflow:hidden;isolation:isolate;background:var(--color-background,#0A0A0B);color:#FFFFFF;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif}.pdc-stage{position:absolute;inset:0;overflow:hidden;cursor:pointer;touch-action:pan-y;user-select:none;-webkit-user-select:none;outline:none;-webkit-tap-highlight-color:transparent}.pdc-stage:focus-visible{box-shadow:inset 0 0 0 2px var(--color-primary,#FFFFFF)}.pdc-canvas,.pdc-fallback{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none}.pdc-canvas{transition:opacity 500ms ease}.pdc-fallback{object-fit:cover;transition:opacity 700ms ease}.pdc-overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(16px,3.2vw,40px);pointer-events:none}.pdc-overlay:before,.pdc-overlay:after{content:'';position:absolute;left:0;right:0;z-index:-1;pointer-events:none}.pdc-overlay:before{top:0;height:160px;background:linear-gradient(to bottom,rgba(0,0,0,.42),rgba(0,0,0,0))}.pdc-overlay:after{bottom:0;height:min(62%,420px);background:linear-gradient(to top,rgba(0,0,0,.66),rgba(0,0,0,.28) 45%,rgba(0,0,0,0))}.pdc-top{display:flex;align-items:center;gap:20px}.pdc-count{flex-shrink:0;font:500 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;font-variant-numeric:tabular-nums;color:rgba(255,255,255,.62)}.pdc-count b{font-weight:600;color:#FFFFFF}.pdc-bars{display:flex;flex:1 1 auto;gap:6px;max-width:420px;margin-left:auto}.pdc-bar{position:relative;flex:1 1 0;height:22px;padding:0;border:0;background:transparent;cursor:pointer;pointer-events:auto}.pdc-bar:before{content:'';position:absolute;left:0;right:0;top:10px;height:2px;border-radius:2px;background:rgba(255,255,255,.24)}.pdc-fill{position:absolute;left:0;right:0;top:10px;height:2px;border-radius:2px;background:#FFFFFF;transform-origin:left center;transform:scaleX(0);transition:transform 500ms cubic-bezier(0.23,1,0.32,1)}.pdc-bar[data-state='past'] .pdc-fill,.pdc-bar[data-state='now'] .pdc-fill{transform:scaleX(1)}.pdc-bar[data-state='timed'] .pdc-fill{transition:none;animation:pdc-grow linear forwards}.pdc-bar:focus-visible{outline:2px solid #FFFFFF;outline-offset:2px;border-radius:2px}.pdc-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:24px}.pdc-text{min-width:0;max-width:min(720px,100%)}.pdc-eyebrow{display:flex;align-items:center;gap:10px;margin:0 0 14px;font:500 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.72)}.pdc-eyebrow:before{content:'';width:22px;height:1px;background:currentColor}.pdc-title{margin:0;font-family:ui-serif,'Iowan Old Style','Palatino Linotype',Georgia,serif;font-weight:400;font-size:clamp(40px,7.4vw,112px);line-height:.92;letter-spacing:-.025em;text-wrap:balance;text-shadow:0 2px 30px rgba(0,0,0,.25)}.pdc-ch{display:inline-block;white-space:pre;animation:pdc-gather 900ms cubic-bezier(0.23,1,0.32,1) both}.pdc-caption{margin:16px 0 0;max-width:46ch;font-size:15px;line-height:1.5;color:rgba(255,255,255,.78);animation:pdc-in 700ms 260ms cubic-bezier(0.23,1,0.32,1) both}.pdc-eyebrow{animation:pdc-in 600ms cubic-bezier(0.23,1,0.32,1) both}.pdc-nav{display:flex;align-items:center;gap:10px;flex-shrink:0;pointer-events:auto}.pdc-btn{display:flex;align-items:center;justify-content:center;width:44px;height:44px;padding:0;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:rgba(10,10,12,.28);color:#FFFFFF;cursor:pointer;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:transform 160ms ease-out,background-color 200ms ease,border-color 200ms ease}.pdc-next{position:relative;display:flex;align-items:center;gap:14px;padding:8px 18px 8px 8px;border-radius:18px;border:1px solid rgba(255,255,255,.26);background:rgba(10,10,12,.32);color:#FFFFFF;cursor:pointer;text-align:left;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);overflow:hidden;transition:transform 160ms ease-out,background-color 200ms ease,border-color 200ms ease}.pdc-thumb{position:relative;flex-shrink:0;width:96px;height:64px;border-radius:11px;overflow:hidden;background:rgba(255,255,255,.08)}.pdc-thumb img{position:absolute;inset:0;display:block;width:96px;height:64px;max-width:none;object-fit:cover;transition:transform 700ms cubic-bezier(0.23,1,0.32,1),filter 400ms ease}.pdc-thumb:after{content:'';position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}.pdc-nextText{display:flex;flex-direction:column;gap:6px;min-width:0}.pdc-nextLabel{display:flex;align-items:center;gap:8px;font:500 10px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.62)}.pdc-nextTitle{max-width:180px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-family:ui-serif,'Iowan Old Style','Palatino Linotype',Georgia,serif;font-size:19px;line-height:1.1}.pdc-timer{position:absolute;left:0;bottom:0;height:2px;width:100%;background:#FFFFFF;transform-origin:left center;transform:scaleX(0);animation:pdc-grow linear forwards;opacity:.85}.pdc-btn:active,.pdc-next:active{transform:scale(0.97)}.pdc-btn:disabled,.pdc-next:disabled{opacity:.4;cursor:default}.pdc-btn:focus-visible,.pdc-next:focus-visible{outline:2px solid #FFFFFF;outline-offset:3px}@media (hover:hover) and (pointer:fine){.pdc-btn:hover:not(:disabled),.pdc-next:hover:not(:disabled){background:rgba(10,10,12,.5);border-color:rgba(255,255,255,.55)}.pdc-next:hover:not(:disabled) .pdc-thumb img{transform:scale(1.08);filter:saturate(1.15)}.pdc-next:hover:not(:disabled) .pdc-arrow{transform:translateX(3px)}}.pdc-arrow{transition:transform 200ms ease-out}.pdc-root[data-paused='true'] .pdc-fill,.pdc-root[data-paused='true'] .pdc-timer,.pdc-root[data-paused='true'] .pdc-clock{animation-play-state:paused}.pdc-clock{position:absolute;width:0;height:0;animation:pdc-clock linear forwards}.pdc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@keyframes pdc-gather{from{opacity:0;filter:blur(10px);transform:translateY(.18em) scale(1.08)}}@keyframes pdc-in{from{opacity:0;transform:translateY(8px)}}@keyframes pdc-fade{from{opacity:0}}@keyframes pdc-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes pdc-clock{from{opacity:0}to{opacity:0}}@media (prefers-reduced-motion:reduce){.pdc-ch,.pdc-caption,.pdc-eyebrow{animation-name:pdc-fade}.pdc-thumb img,.pdc-fill{transition:none}}@media (max-width:640px){.pdc-nextText,.pdc-prev{display:none}.pdc-next{padding:6px;border-radius:14px}.pdc-thumb{width:72px;height:52px}.pdc-thumb img{width:72px;height:52px}.pdc-caption{font-size:14px}.pdc-bars{max-width:none}}";function Bt({items:l,height:v="100svh",particles:p=16e4,duration:b=Et,pattern:k="sweep",scatter:j=1,turbulence:Y=1,glow:q=.6,dust:ee=.35,push:ue=1,backdrop:ve="#08080A",autoplay:te=0,loop:R=!0,overlay:Oe=!0,index:oe,defaultIndex:ze=0,onIndexChange:re,className:Ge=""}){const h=l.length,ge=u.useRef(null),be=u.useRef(null),[Ve,Xe]=u.useState(()=>J(ze,h,R)),d=J(oe===void 0?Ve:oe,h,R),[Ye,pe]=u.useState(!1),[fe,qe]=u.useState(!1),[We,Ke]=u.useState(0),[ae,He]=u.useState(!1),[ne,Qe]=u.useState(!1),[se,$e]=u.useState(!0),[Je,xe]=u.useState(!1),[Ze,ie]=u.useState(!1),[et,ce]=u.useState(!1);u.useEffect(()=>{const t=window.matchMedia("(prefers-reduced-motion: reduce)"),e=()=>He(t.matches);e(),t.addEventListener("change",e);const y=()=>Qe(document.hidden);return y(),document.addEventListener("visibilitychange",y),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",y)}},[]),u.useEffect(()=>{const t=ge.current;if(!t||typeof IntersectionObserver>"u")return;const e=new IntersectionObserver(([y])=>$e(y.isIntersecting),{threshold:.15});return e.observe(t),()=>e.disconnect()},[]);const W=u.useCallback(t=>{const e=J(t,h,R);oe===void 0&&Xe(e),re==null||re(e)},[oe,h,R,re]),C=u.useRef({reduced:ae,duration:b,pattern:k,scatter:j,turbulence:Y,glow:q,dust:ee,push:ue,backdrop:ve,particles:p,awake:!0});C.current={reduced:ae,duration:b,pattern:k,scatter:j,turbulence:Y,glow:q,dust:ee,push:ue,backdrop:ve,particles:p,awake:se&&!ne};const r=u.useRef({cur:d,wave:null,queued:null,origin:null,aspect:1.6,mouse:null,energy:0,kick:()=>{},refit:()=>{},start:t=>{}}).current;r.start=t=>{if(t===r.cur)return;const{reduced:e,duration:y,pattern:E}=C.current,D=l.length,Q=R?(t-r.cur+D)%D*2<=D:t>r.cur,F=r.aspect,L=r.origin;r.origin=null;const O=Math.random()-.5;let N,A=[0,0],P=!0;if(L&&E!=="scatter")N=L;else if(E==="radial")N=[F*(.5+O*.3),.5+(Math.random()-.5)*.3];else if(E==="scatter")N=[F/2,.5];else{P=!1;const z=O*.45,I=Math.hypot(1,z);A=[(Q?-1:1)/I,z/I],N=[Q?F:0,.5]}r.wave={from:r.cur,to:t,t:0,duration:(e?At:Math.max(y,600))/1e3,origin:N,dir:A,radial:P,grain:E==="scatter"?1:.2,reach:yt(N[0],N[1],F,P?null:A),seed:Math.random()*100},r.kick()};const _e=u.useRef(d);u.useEffect(()=>{if(_e.current!==d){if(_e.current=d,r.wave){r.queued=d;return}r.start(d)}},[d]),u.useEffect(()=>{se&&!ne&&r.kick()},[se,ne,r]);const tt=l.map(t=>t.src).join(`
`);u.useEffect(()=>{const t=be.current;if(!t||h===0)return;const e=t.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!1});if(!e){pe(!0);return}let y=!1,E=0,D=0,Q=0,F=!1,L=!1,O=0,N=0,A=[0,0],P=null;const z=l.map(()=>null);let I,le,$=null,x=null;const G={textures:[],buffers:[]},Ee=n=>{n.preventDefault(),cancelAnimationFrame(E),E=0},Ae=()=>Ke(n=>n+1);t.addEventListener("webglcontextlost",Ee),t.addEventListener("webglcontextrestored",Ae);const Re=(n,i)=>{const o=e.createShader(n);if(!o)throw new Error("could not create shader");if(e.shaderSource(o,i),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw new Error("shader: "+e.getShaderInfoLog(o));return o},Fe=(n,i,o)=>{const a=e.createProgram();if(!a)throw new Error("could not create program");const s=Re(e.VERTEX_SHADER,n),f=Re(e.FRAGMENT_SHADER,i);if(e.attachShader(a,s),e.attachShader(a,f),o&&e.transformFeedbackVaryings(a,o,e.SEPARATE_ATTRIBS),e.linkProgram(a),e.deleteShader(s),e.deleteShader(f),!e.getProgramParameter(a,e.LINK_STATUS))throw new Error("link: "+e.getProgramInfoLog(a));const _={},m=e.getProgramParameter(a,e.ACTIVE_UNIFORMS);for(let T=0;T<m;T++){const g=e.getActiveUniform(a,T);g&&(_[g.name.replace(/^u_/,"")]=e.getUniformLocation(a,g.name))}return{prog:a,u:_}},Te=(n,i)=>{e.useProgram(n.prog);for(const o in i){const a=n.u[o];if(!a)continue;const s=i[o];typeof s=="number"?e.uniform1f(a,s):Array.isArray(s)?s.length===2?e.uniform2f(a,s[0],s[1]):e.uniform3f(a,s[0],s[1],s[2]):(e.activeTexture(e.TEXTURE0+s.unit),e.bindTexture(e.TEXTURE_2D,s.tex),e.uniform1i(a,s.unit))}},B=(n,i)=>{const o=e.createBuffer();if(!o)throw new Error("could not allocate a buffer");return e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,n,i),G.buffers.push(o),o},ke=()=>{if(x){for(const n of x.vao)e.deleteVertexArray(n);for(const n of[...x.state,...x.life,...x.statics])e.deleteBuffer(n),G.buffers=G.buffers.filter(i=>i!==n);x=null}},dt=()=>{ke();const n=C.current.particles*(L?.5:1),i=Ie(t.clientWidth,t.clientHeight,n),[o,a]=_t(i,r.aspect),s=o*a,f=new Float32Array(s*2),_=new Float32Array(s*4),m=new Float32Array(s*2);for(let V=0,M=0;V<a;V++)for(let U=0;U<o;U++,M++){f[M*2]=(U+.5+(Math.random()-.5)*.7)/o,f[M*2+1]=(V+.5+(Math.random()-.5)*.7)/a;for(let X=0;X<4;X++)_[M*4+X]=Math.random();m[M*2]=Math.random()*6}const T=new Float32Array(s*4),g=[B(f,e.STATIC_DRAW),B(_,e.STATIC_DRAW)],Ue=[B(T,e.DYNAMIC_COPY),B(T,e.DYNAMIC_COPY)],De=[B(m,e.DYNAMIC_COPY),B(m,e.DYNAMIC_COPY)],ut=[0,1].map(V=>{const M=e.createVertexArray();if(!M)throw new Error("could not create a vertex array");e.bindVertexArray(M);const U=(X,pt,ft)=>{e.bindBuffer(e.ARRAY_BUFFER,pt),e.enableVertexAttribArray(X),e.vertexAttribPointer(X,ft,e.FLOAT,!1,0,0)};return U(0,g[0],2),U(1,g[1],4),U(2,Ue[V],4),U(3,De[V],2),M});e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null),x={n:s,cols:o,rows:a,vao:ut,state:Ue,life:De,statics:g,side:0}},Se=(n,i)=>{const o=r.aspect,a=o>n.aspect?n.w:n.w*(o/n.aspect);return Math.max(0,Math.log2(a/i))},Ne=n=>z[n]??z.find(i=>i)??null,me=n=>{const i=C.current,o=r.wave,a=Ne(o?o.from:r.cur),s=Ne(o?o.to:r.cur);if(!a||!s)return;const f=o?Math.min(o.t/o.duration,1):0,_={aspect:r.aspect,p:f,origin:o?o.origin:[0,0],dir:o?o.dir:[1,0],radial:o&&o.radial?1:0,reach:o?o.reach:1,grain:o?o.grain:0,seed:o?o.seed:0,from:{unit:0,tex:a.tex},to:{unit:1,tex:s.tex},fromAspect:a.aspect,toAspect:s.aspect,glow:i.glow,cells:x?[x.cols,x.rows]:[1,1]};if(e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,t.width,t.height),e.disable(e.BLEND),Te(I,{..._,backdrop:wt(i.backdrop),still:i.reduced?1:0,res:[t.width,t.height]}),e.bindVertexArray($),e.drawArrays(e.TRIANGLE_STRIP,0,4),i.reduced||!x)return;const m=x,T=r.mouse;Te(le,{..._,fromLod:Se(a,m.cols),toLod:Se(s,m.cols),dt:n,time:Q,mouse:T??[-10,-10],mouseVel:T?A:[0,0],push:i.push*kt,turb:i.turbulence,scatter:i.scatter,dust:i.dust,point:t.width/m.cols*1.45}),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA);const g=1-m.side;e.bindVertexArray(m.vao[m.side]),e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,0,m.state[g]),e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,1,m.life[g]),e.beginTransformFeedback(e.POINTS),e.drawArrays(e.POINTS,0,m.n),e.endTransformFeedback(),e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,0,null),e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,1,null),e.bindVertexArray(null),m.side=g},Me=n=>{if(E=0,y||!F)return;const i=(n-D)/1e3;D=n;const o=Math.min(i,.25),a=Math.min(o,1/30);Q+=a;const s=C.current;!L&&O<40&&!s.reduced&&(O+=1,O>6&&i>Rt&&(N+=1),N>=Ft&&(L=!0,de(!0)));const f=r.mouse;if(f&&P&&a>0){const g=1-Math.exp(-a*9);A=[A[0]+((f[0]-P[0])/a-A[0])*g,A[1]+((f[1]-P[1])/a-A[1])*g],Math.hypot(A[0],A[1])>.05&&(r.energy=n)}else A=[0,0];P=f?[f[0],f[1]]:null;const _=r.wave;let m=!1;if(_&&(_.t+=o,m=_.t>=_.duration,r.energy=n),me(a),_&&m){r.cur=_.to,r.wave=null;const g=r.queued;r.queued=null,g!==null&&g!==r.cur&&r.start(g)}const T=s.dust>0&&!s.reduced;(r.wave||s.awake&&(T||n-r.energy<Tt*1e3))&&(E=requestAnimationFrame(Me))};r.refit=()=>{F&&de(!0)},r.kick=()=>{E||y||!F||(D=performance.now(),E=requestAnimationFrame(Me))};const de=(n=!1)=>{const i=L?1:Math.min(window.devicePixelRatio||1,2),o=Math.round(t.clientWidth*i),a=Math.round(t.clientHeight*i);if(o===0||a===0)return;const s=o/a;(t.width!==o||t.height!==a)&&(t.width=o,t.height=a);const f=Ie(t.clientWidth,t.clientHeight,C.current.particles*(L?.5:1));(n||!x||Math.abs(s-r.aspect)/r.aspect>.02||Math.abs(f-x.n)/x.n>.12)&&(r.aspect=s,dt()),me(0),r.kick()};try{I=Fe(St,Nt),le=Fe(Mt,Lt,["v_state","v_life"]),$=e.createVertexArray(),e.bindVertexArray($),B(new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),r.aspect=Math.max(t.clientWidth,1)/Math.max(t.clientHeight,1)}catch{y||pe(!0);return}const Le=new ResizeObserver(()=>F&&de());Le.observe(t);let Pe=0;return l.forEach((n,i)=>{Pt(n.src).then(o=>{if(y)return;const a=e.createTexture();if(!a)return;e.bindTexture(e.TEXTURE_2D,a),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,o),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),G.textures.push(a);const s=o.naturalWidth||1,f=o.naturalHeight||1;z[i]={tex:a,aspect:s/f,w:s,h:f},F?E||me(0):(F=!0,qe(!0),de(!0))},()=>{Pe+=1,Pe===l.length&&!y&&pe(!0)})}),()=>{y=!0,cancelAnimationFrame(E),r.kick=()=>{},r.refit=()=>{},Le.disconnect(),t.removeEventListener("webglcontextlost",Ee),t.removeEventListener("webglcontextrestored",Ae),ke(),$&&e.deleteVertexArray($);for(const n of G.textures)e.deleteTexture(n);for(const n of G.buffers)e.deleteBuffer(n);I&&e.deleteProgram(I.prog),le&&e.deleteProgram(le.prog)}},[tt,We,h]),u.useEffect(()=>{r.refit()},[p,r]);const K=u.useRef(null),we=t=>{const e=t.currentTarget.getBoundingClientRect();return[(t.clientX-e.left)/e.width*r.aspect,1-(t.clientY-e.top)/e.height]},ot=t=>{const e=K.current;e&&t.pointerId===e.id&&Math.hypot(t.clientX-e.x,t.clientY-e.y)>8&&(e.moved=!0),!(ae||ue<=0||!fe)&&(r.mouse=we(t),r.kick())},rt=t=>{t.button===0&&(K.current={id:t.pointerId,x:t.clientX,y:t.clientY,moved:!1})},at=t=>{const e=K.current;K.current=null,!(!e||t.pointerId!==e.id||e.moved||h<2)&&(!R&&d>=h-1||(ce(!0),r.origin=we(t),W(d+1)))},nt=t=>{(t.key==="ArrowRight"||t.key==="ArrowLeft")&&(t.preventDefault(),ce(!0),W(d+(t.key==="ArrowRight"?1:-1)))},H=te>0&&!ae&&h>1&&fe&&!et&&(R||d<h-1),st=Ze||Je||ne||!se,w=l[d],it=!R&&d===0,ct=!R&&d===h-1,S=h>1&&!ct?l[J(d+1,h,R)]:void 0,lt=w?(w.title??w.alt??"Slide")+", "+(d+1)+" of "+h:"",he=(w==null?void 0:w.title)??"",ye=t=>{ce(!0),W(d+t)};return c.jsxs("section",{ref:ge,className:"pdc-root "+Ge,style:{height:v},role:"region","aria-roledescription":"carousel","aria-label":"Carousel","data-paused":st,onFocus:()=>xe(!0),onBlur:t=>{t.currentTarget.contains(t.relatedTarget)||xe(!1)},children:[c.jsx("style",{children:Ut}),c.jsx("div",{className:"pdc-stage",tabIndex:0,"aria-label":"Slides. Click to dissolve into the next one, or use the arrow keys.",onKeyDown:nt,onPointerDown:rt,onPointerMove:ot,onPointerUp:at,onPointerCancel:()=>{K.current=null},onPointerLeave:()=>{r.mouse=null},children:Ye?l.map((t,e)=>c.jsx("img",{className:"pdc-fallback",src:t.src,alt:e===d?t.alt??"":"","aria-hidden":e!==d,draggable:!1,style:{opacity:e===d?1:0}},t.src)):c.jsx("canvas",{ref:be,className:"pdc-canvas",style:{opacity:fe?1:0},"aria-hidden":"true"})}),Oe&&h>0?c.jsxs("div",{className:"pdc-overlay",children:[c.jsxs("div",{className:"pdc-top",children:[c.jsxs("span",{className:"pdc-count",children:[c.jsx("b",{children:Be(d+1)})," / ",Be(h)]}),h>1?c.jsx("div",{className:"pdc-bars",onPointerEnter:()=>ie(!0),onPointerLeave:()=>ie(!1),children:l.map((t,e)=>c.jsx("button",{type:"button",className:"pdc-bar","data-state":e<d?"past":e===d?H?"timed":"now":"next","aria-label":"Go to slide "+(e+1)+(t.title?": "+t.title:""),"aria-current":e===d?"true":void 0,onClick:()=>{ce(!0),W(e)},children:c.jsx("span",{className:"pdc-fill",style:e===d&&H?{animationDuration:te+"ms"}:void 0},e===d&&H?"timed-"+d:"fill")},t.src+e))}):null]}),c.jsxs("div",{className:"pdc-bottom",children:[c.jsxs("div",{className:"pdc-text",children:[w!=null&&w.eyebrow?c.jsx("p",{className:"pdc-eyebrow",children:w.eyebrow}):null,he?c.jsx("h2",{className:"pdc-title","aria-label":he,children:Array.from(he).map((t,e)=>c.jsx("span",{className:"pdc-ch","aria-hidden":"true",style:{animationDelay:Math.round(120+e*28+e*7919%11*14)+"ms"},children:t},e))}):null,w!=null&&w.caption?c.jsx("p",{className:"pdc-caption",children:w.caption}):null]},d),h>1?c.jsxs("div",{className:"pdc-nav",onPointerEnter:()=>ie(!0),onPointerLeave:()=>ie(!1),children:[c.jsx("button",{type:"button",className:"pdc-btn pdc-prev",onClick:()=>ye(-1),disabled:it,"aria-label":"Previous slide",children:c.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.75",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:c.jsx("path",{d:"M19 12H5M11 18l-6-6 6-6"})})}),c.jsxs("button",{type:"button",className:"pdc-next",onClick:()=>ye(1),disabled:!S,"aria-label":"Next slide"+(S!=null&&S.title?": "+S.title:""),children:[c.jsx("span",{className:"pdc-thumb",children:S?c.jsx("img",{src:S.src,alt:"",width:96,height:64,draggable:!1}):null}),c.jsxs("span",{className:"pdc-nextText",children:[c.jsxs("span",{className:"pdc-nextLabel",children:["Up next",c.jsx("svg",{className:"pdc-arrow",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:c.jsx("path",{d:"M5 12h14M13 6l6 6-6 6"})})]}),c.jsx("span",{className:"pdc-nextTitle",children:(S==null?void 0:S.title)??"Next"})]}),H?c.jsx("span",{className:"pdc-timer",style:{animationDuration:te+"ms"}},"timer-"+d):null]})]}):null]})]}):null,H?c.jsx("span",{className:"pdc-clock",style:{animationDuration:te+"ms"},onAnimationEnd:()=>W(d+1),"aria-hidden":"true"},"clock-"+d):null,c.jsx("p",{className:"pdc-sr","aria-live":"polite",children:lt})]})}export{Bt as P};
