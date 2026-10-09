import{r as i,j as p}from"./index-CdiR0C0d.js";const D={background:"#03030b",blue:"#2c55ff",violet:"#8a3dff",magenta:"#ff3fc8",cyan:"#86e6ff",gold:"#ffc35c"},vt=[`Fractal noise
Optical flare`,"Polar coordinates",`Sphere warp
Mesh warp`,`Radial blur
Displacement
Wave warp`,"Final"],gt='"Space Grotesk", "Sora", "Inter", "Helvetica Neue", Arial, sans-serif',xt='"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace',bt="M0-1C.07-.24.24-.07 1 0 .24.07.07.24 0 1-.07.24-.24.07-1 0-.24-.07-.07-.24 0-1Z",yt=2600,wt=3200,St=1700,Me=Math.PI*2,Xe=.1,Ye=.28,Rt=.38,We=.05,m=t=>t<=0?0:t>=1?1:t,w=(t,a,s)=>t+(a-t)*s,S=t=>t*t*(3-2*t),Re=[[0,0],[.16,.22],[.27,.26],[.55,.62],[.66,.66],[.84,.9],[1,1]];function Mt(t){if(t<=0)return 0;if(t>=1)return 1;for(let a=0;a<Re.length-1;a++){const[s,r]=Re[a],[c,d]=Re[a+1];if(t<=c)return r+(d-r)*S((t-s)/(c-s))}return 1}function Pt(t){const a=m(t);return a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2}function He(t){const a=m(t)*4,s=Math.min(3,Math.floor(a));return s+S(m((a-s-.3)/.7))}function Ue(t,a){if(a<1)return-1;const s=Math.min(4,Math.max(0,t));return Math.min(a-1,Math.round(s/4*(a-1)))}function Pe(t){const a=Math.max(1,.92/Math.max(t,.1));return{zoom:a,w:t*a,h:a}}function ke(t){const a=Pe(t),s=-Math.min(a.w*.3,.52),r=-a.h*.2,c=w(1.05,.5,m((t-.5)/1)),d=Math.min((a.w/2-s)/Math.cos(c),(a.h/2-r)/Math.sin(c));return{x:s,y:r,tail:c,room:d}}function kt(t,a){const{zoom:s,w:r,h:c}=Pe(a),d=S(m(t)),u=S(m(t-1)),v=S(m(t-2)),$=S(m(t-3));let C=Math.max(.02,d*Me);const Q=(1-d)*r/C;let K=0,L=c/2*(1-d)+Q,O=-Math.PI/2,F=w(1/c,2.6,d);O+=u*Math.PI,C=w(C,.85,u),L=w(L,-.3,u),F=w(F,1.45,u);const q=ke(a);O=w(O,q.tail,v),C=w(C,.55,v),K=w(K,q.x,v),L=w(L,q.y,v),F=w(F,Math.max(.75,.8/(q.room*.92)),v);const X=S(m((C/Me-.9)/.1));return{zoom:s,ax:K,ay:L,beta:O,phi:C,rho0:Q,kv:F,vf:w(1,.32,v),narrow:w(w(1,.55,u),.3,v),wave:v,bulge:u*(1-v),edge:m(d*4)*(1-X),closed:X,star:$,lines:$}}function At(t,a){const s=ke(a),r=m(t),c=Pt(r),d=s.x*.15+.22,u=s.y-.1,v=1-c;return{x:v*v*s.x+2*v*c*d+c*c*0,y:v*v*s.y+2*v*c*u+c*c*Xe,r:w(We,Ye,S(m((r-.08)/.8))),rot:w(0,Rt+Me,c),mode:S(m((r-.3)/.55)),comet:1-S(m((r-.05)/.5)),retract:S(m(r/.5)),lines:1-S(m((r-.4)/.4)),bloom:Math.exp(-Math.pow((r-.32)/.08,2))}}function Ke(t){const a=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(t).trim());if(!a)return null;const s=a[1].length===3?a[1].replace(/./g,r=>r+r):a[1];return[0,2,4].map(r=>parseInt(s.slice(r,r+2),16)/255)}const Et=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`,Ct=`
precision highp float;

uniform vec2 uRes;
uniform float uZoom;
uniform float uTime;

uniform vec2 uApex;
uniform float uBeta;
uniform float uPhi;
uniform float uRho0;
uniform float uKv;
uniform float uVf;
uniform float uNarrow;
uniform float uWave;
uniform float uBulge;
uniform float uEdge;
uniform float uClosed;
uniform float uComet;
uniform float uLines;
uniform float uLineDir;

uniform vec2 uStarC;
uniform float uStarR;
uniform float uStarAmt;
uniform float uStarMode;
uniform float uStarRot;
uniform float uSwirl;
uniform vec2 uTilt;
uniform float uHoleOpen;
uniform float uFlash;
uniform float uBloom;

uniform vec3 uPtr;
uniform vec3 uBg;
uniform vec3 uBlue;
uniform vec3 uViolet;
uniform vec3 uMagenta;
uniform vec3 uCyan;
uniform vec3 uGold;
uniform float uExposure;
uniform float uGrain;

#define PI 3.14159265
#define TAU 6.28318531

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// Value noise that tiles every 'per' cells across x, so the sheet closes into
// a ring without a seam.
float pnoise(vec2 p, float per) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 w = f * f * (3.0 - 2.0 * f);
  float x0 = mod(i.x, per);
  float x1 = mod(i.x + 1.0, per);
  float a = hash(vec2(x0, i.y));
  float b = hash(vec2(x1, i.y));
  float c = hash(vec2(x0, i.y + 1.0));
  float d = hash(vec2(x1, i.y + 1.0));
  return mix(mix(a, b, w.x), mix(c, d, w.x), w.y);
}

float fbm(vec2 p, float per) {
  float s = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    s += amp * pnoise(p, per);
    p = p * 2.0 + vec2(0.0, 17.3);
    per *= 2.0;
    amp *= 0.5;
  }
  return s / 0.9375;
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, s, -s, c);
}

// The one layer everything is made of: ridged fractal-noise curtains hanging
// from a flare along v = 0, in sheet space (u across 0–1, v down).
vec3 sheet(float u, float v, float t) {
  float X = u * 20.0;
  float vy = v * uVf;
  float w = fbm(vec2(X * 0.5, vy * 1.3 - t * 0.12), 10.0);
  float wave = sin(v * 9.0 - t * 2.2) * uWave * 0.9;
  float n = fbm(vec2(X + (w - 0.5) * 5.0 + wave, vy * 1.6 - t * 0.22), 20.0);
  float ridge = 1.0 - abs(n * 2.0 - 1.0);
  float ribbons = pow(ridge, mix(5.0, 2.6, uWave));
  float blob = pnoise(vec2(X * 0.25, v * 2.2 - t * 0.18), 5.0);
  float len = 0.5 + 0.42 * pnoise(vec2(X * 0.5, 3.7 + t * 0.03), 10.0);
  float body = smoothstep(len + 0.08, len - 0.42, v) * smoothstep(-0.02, 0.07, v);
  float I = ribbons * body * (0.3 + 1.25 * blob);

  float hue = pnoise(vec2(X * 0.5, v * 0.7 + t * 0.04 + 9.0), 10.0);
  vec3 c = mix(uBlue, uViolet, smoothstep(0.22, 0.58, hue));
  c = mix(c, uMagenta, smoothstep(0.6, 0.9, hue) * 0.85);
  vec3 col = c * I * 1.7;
  // chromatic fringe where a ribbon turns hot, warm on one side, cool on the other
  float fringe = smoothstep(0.42, 0.62, I) * smoothstep(1.0, 0.68, I);
  col += mix(uGold, uCyan, smoothstep(0.3, 0.7, hue)) * fringe * 0.55;
  col += vec3(1.0, 0.97, 0.93) * smoothstep(0.72, 1.25, I) * 1.4;

  // the optical flare the sheet hangs from
  float across = mix(1.0 - 0.7 * smoothstep(0.0, 0.5, abs(u - 0.5)), 1.0, uClosed);
  float flare = exp(-abs(v) * 6.5) * 0.6 + exp(-abs(v) * 30.0) * 1.3;
  col += mix(uCyan, vec3(1.0), 0.45) * flare * across;

  // sparks drifting down the curtains
  vec2 g = vec2(u * 64.0, v * 20.0 - t * 0.7);
  vec2 id = floor(g);
  id.x = mod(id.x, 64.0);
  float h = hash(id + 11.0);
  vec2 off = vec2(hash(id + 3.7), hash(id + 9.1)) - 0.5;
  float spark = step(0.93, h) * smoothstep(0.17, 0.0, length(fract(g) - 0.5 - off * 0.6));
  spark *= (0.55 + 0.45 * sin(t * 6.0 + h * 40.0)) * smoothstep(0.05, 0.2, v) * smoothstep(1.15, 0.6, v);
  col += mix(uGold, vec3(1.0), 0.35) * spark * 1.5;
  return col;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 a = p * uZoom;
  float t = uTime;

  // the pointer is a displacement pass by hand: a small eddy that drags the light
  vec2 pd = a - uPtr.xy;
  float pr = dot(pd, pd);
  vec2 aw = uPtr.xy + rot(uPtr.z * 1.5 * exp(-pr * 14.0)) * pd * (1.0 - uPtr.z * 0.22 * exp(-pr * 24.0));

  vec3 col = uBg + uBlue * 0.05 * smoothstep(1.2, 0.0, length(p));
  float alpha = 1.0;

  if (uComet > 0.001) {
    vec2 d = aw - uApex;
    float rho = length(d);
    float ang = mod(atan(d.y, d.x) - uBeta + PI, TAU) - PI;
    float v = (rho - uRho0) * uKv;
    float u = ang / uPhi * (1.0 - uBulge * 0.45 * sin(clamp(v, 0.0, 1.0) * PI)) + 0.5;
    float mask = mix(1.0, smoothstep(0.0, 0.07, u) * smoothstep(1.0, 0.93, u), uEdge);
    col += sheet(0.5 + (u - 0.5) * uNarrow, v, t) * mask * uComet;
    col += mix(uViolet, uCyan, 0.5) * exp(-pr * 70.0) * uPtr.z * 0.1;
  }

  // speed lines streaming back past the comet
  if (uLines > 0.001) {
    vec2 dir = vec2(cos(uLineDir), sin(uLineDir));
    float along = dot(a, dir);
    float across = dot(a, vec2(-dir.y, dir.x)) * 38.0;
    float h = hash(vec2(floor(across), 3.1));
    float lane = fract(across) - 0.5;
    float seg = fract(along * 0.45 - t * (0.5 + h * 1.3) + h * 9.0);
    float line = step(0.8, h) * exp(-lane * lane * 40.0) * smoothstep(0.0, 0.08, seg) * smoothstep(0.42, 0.1, seg);
    col += mix(uBlue, uViolet, hash(vec2(h, 1.0))) * line * uLines * 0.85;
  }

  if (uStarAmt > 0.001) {
    vec2 q = a - uStarC;
    float den = max(0.2, 1.0 + dot(q, uTilt));
    q /= den;
    float rr = length(q);
    float R = max(uStarR, 0.0001);
    q = rot(uStarRot + uSwirl * min(rr / R, 3.0)) * q;
    float e = mix(0.46, 0.6, uStarMode);
    vec2 qa = abs(q) / R + 0.00001;
    float S = pow(pow(qa.x, e) + pow(qa.y, e), 1.0 / e);
    float ang = atan(q.y, q.x);

    // the sparkle riding the comet's head: a crisp white star in a magenta halo
    vec3 spark = vec3(1.0) * smoothstep(1.0, 0.5, S) * 2.4;
    spark += mix(uMagenta, uViolet, 0.35) * (0.7 / (1.0 + S * S * 0.5));
    spark += uMagenta * exp(-rr / R * 0.8) * 0.5;
    col += spark * uStarAmt * (1.0 - uStarMode);

    if (uStarMode > 0.001) {
      // the portal: a star-shaped hole in a dark membrane, white-hot inside,
      // with thin-film bands running round the rim
      float aa = 2.5 * uZoom * den / (uRes.y * R);
      float inside = 1.0 - smoothstep(1.0 - aa, 1.0 + aa, S);
      float sf = S + 0.05 * sin(ang * 2.0 + t * 0.6) + 0.03 * sin(rr / R * 9.0 - t);
      vec3 ic = vec3(2.6, 2.55, 2.7);
      ic = mix(ic, mix(vec3(1.6), uMagenta * 1.9, 0.65), smoothstep(0.42, 0.66, sf));
      ic = mix(ic, uViolet * 1.7, smoothstep(0.66, 0.82, sf));
      ic = mix(ic, uCyan * 1.7, smoothstep(0.82, 0.94, sf));
      ic += vec3(0.9, 0.95, 1.0) * smoothstep(0.93, 1.0, S) * 1.3;

      float o = max(S - 1.0, 0.0);
      float fold = 0.5 + 0.5 * sin(ang * 2.0 + 0.7);
      vec3 mem = mix(uBg, uBlue, 0.1) * 1.3;
      mem += uBlue * (0.1 + 0.16 * fold) * exp(-o * 0.55);
      mem += uBlue * 0.45 * exp(-o * 4.5) + uCyan * 0.75 * exp(-o * 26.0);
      mem -= vec3(0.05) * exp(-o * 9.0) * (1.0 - exp(-o * 60.0));
      float rays = pow(0.5 + 0.5 * sin(ang * 6.0 + sin(ang * 3.0 + t * 0.2) * 1.6 + t * 0.05), 7.0);
      mem += mix(uCyan, vec3(1.0), 0.4) * rays * exp(-rr / R * 0.7) * 0.7;
      // light spilling past the rim
      mem += mix(uCyan, vec3(1.0), 0.6) * exp(-o * 7.0) * 0.32;

      vec3 portal = mix(max(mem, vec3(0.0)), ic, inside);
      col = mix(col, portal, uStarMode);
      float hole = inside * (1.0 - smoothstep(0.5, 0.88, S));
      alpha = 1.0 - uHoleOpen * hole * uStarMode;
    }
  }

  // the star catching: a bloom off the star, not a white frame
  float bd = length(a - uStarC);
  col += vec3(1.0, 0.95, 1.0) * uBloom * (exp(-bd * 18.0) * 3.0 + exp(-bd * 5.5) * 1.1 + 0.03);

  col = 1.0 - exp(-col * uExposure);
  col *= 1.0 - 0.5 * smoothstep(0.35, 1.25, length(p * vec2(0.9, 1.0)));
  col += (hash(gl_FragCoord.xy + fract(t * 7.0) * 311.0) - 0.5) * uGrain;
  col = mix(col, vec3(1.0), uFlash);
  alpha = mix(alpha, 1.0, uFlash);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0) * alpha, alpha);
}
`,Tt=["uRes","uZoom","uTime","uApex","uBeta","uPhi","uRho0","uKv","uVf","uNarrow","uWave","uBulge","uEdge","uClosed","uComet","uLines","uLineDir","uStarC","uStarR","uStarAmt","uStarMode","uStarRot","uSwirl","uTilt","uHoleOpen","uFlash","uBloom","uPtr","uBg","uBlue","uViolet","uMagenta","uCyan","uGold","uExposure","uGrain"];function Bt(t,a,s){const r=t.createProgram();if(!r)return null;for(const[c,d]of[[t.VERTEX_SHADER,a],[t.FRAGMENT_SHADER,s]]){const u=t.createShader(c);if(!u)return null;if(t.shaderSource(u,d),t.compileShader(u),!t.getShaderParameter(u,t.COMPILE_STATUS))return t.deleteShader(u),null;t.attachShader(r,u),t.deleteShader(u)}return t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)?r:null}function Lt(){const[t,a]=i.useState(!1);return i.useEffect(()=>{if(typeof matchMedia>"u")return;const s=matchMedia("(prefers-reduced-motion: reduce)"),r=()=>a(s.matches);return r(),s.addEventListener("change",r),()=>s.removeEventListener("change",r)},[]),t}const Ft=`
.pcp-root {
  position: relative;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  -webkit-tap-highlight-color: transparent;
}
.pcp-root:not([data-phase="done"]) { background: var(--pcp-bg); }
.pcp-root svg, .pcp-root canvas, .pcp-root img { max-width: none; }
.pcp-dest {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}
.pcp-root[data-phase="lift"] .pcp-dest, .pcp-dest[data-active="true"] { opacity: 1; pointer-events: auto; }
.pcp-gate {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: var(--pcp-bg);
  color: #f3f1ff;
  font-family: var(--pcp-mono);
  cursor: pointer;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.pcp-root[data-phase="lift"] .pcp-gate { pointer-events: none; }
.pcp-root[data-phase="lift"][data-hole="true"] .pcp-gate {
  background: transparent;
  opacity: 0;
  transition: opacity 0.4s ease 1.25s;
}
.pcp-root[data-phase="lift"][data-hole="true"][data-gl="false"] .pcp-gate { transition-delay: 0.3s; }
.pcp-gate:focus-visible .pcp-frame { box-shadow: inset 0 0 0 1px rgba(170, 185, 255, 0.55); }
.pcp-layer, .pcp-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}

/* ---- no WebGL: the same story in CSS, smaller ---- */
.pcp-fallback {
  background:
    radial-gradient(circle at 50% 50%, var(--pcp-magenta) 0%, transparent 28%),
    radial-gradient(ellipse 60% 45% at 50% 50%, var(--pcp-violet) 0%, transparent 70%),
    radial-gradient(ellipse 90% 70% at 50% 40%, var(--pcp-blue) 0%, transparent 75%),
    var(--pcp-bg);
  opacity: calc(0.25 + var(--pcp-p) * 0.5);
  transition: opacity 1s ease;
}
.pcp-root:not([data-phase="load"]) .pcp-fallback { opacity: 0.9; }
.pcp-fbstar {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--pcp-u) * 0.6);
  height: calc(var(--pcp-u) * 0.6);
  margin: calc(var(--pcp-u) * -0.3) 0 0 calc(var(--pcp-u) * -0.3);
  fill: #fff;
  filter: drop-shadow(0 0 calc(var(--pcp-u) * 0.03) var(--pcp-magenta)) drop-shadow(0 0 calc(var(--pcp-u) * 0.08) var(--pcp-cyan));
  transform: scale(calc(0.05 + var(--pcp-p) * 0.2));
  transition: transform 1.6s cubic-bezier(0.5, 0, 0.1, 1);
}
.pcp-root:not([data-phase="load"]) .pcp-fbstar { transform: rotate(45deg) scale(1); }

/* ---- the compositing grid ---- */
.pcp-grid {
  background-image:
    linear-gradient(rgba(150, 170, 255, 0.075) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 170, 255, 0.075) 1px, transparent 1px);
  background-size: calc(var(--pcp-u) * 0.065) calc(var(--pcp-u) * 0.065);
  background-position: 50% 50%;
  mix-blend-mode: screen;
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000 30%, transparent 85%);
  mask-image: radial-gradient(ellipse at 50% 50%, #000 30%, transparent 85%);
  transition: opacity 1.4s ease;
}
.pcp-root:not([data-phase="load"]) .pcp-grid { opacity: 0; }

/* ---- letterbox ---- */
.pcp-bar {
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--pcp-u) * 0.065);
  background: #000;
  pointer-events: none;
  transition: transform 1.1s cubic-bezier(0.7, 0, 0.2, 1);
}
.pcp-bar-top { top: 0; transform: translateY(-101%); }
.pcp-bar-bot { bottom: 0; transform: translateY(101%); }
.pcp-root[data-phase="ignite"] .pcp-bar, .pcp-root[data-phase="reveal"] .pcp-bar { transform: none; }

/* ---- HUD ---- */
.pcp-hud {
  position: absolute;
  inset: 0;
  pointer-events: none;
  font-size: clamp(9px, calc(var(--pcp-u) * 0.017), 13px);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: opacity 0.7s ease;
}
.pcp-root[data-phase="lift"] .pcp-hud { opacity: 0; }
.pcp-bl {
  position: absolute;
  left: calc(var(--pcp-u) * 0.05);
  bottom: calc(var(--pcp-u) * 0.05);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.6, 0, 0.2, 1);
}
.pcp-root:not([data-phase="load"]) .pcp-bl { opacity: 0; transform: translateY(1.2em); }
.pcp-count {
  font-family: var(--pcp-display);
  font-size: clamp(30px, calc(var(--pcp-u) * 0.13), 112px);
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  margin: 0;
  text-shadow: -1px 0 color-mix(in srgb, var(--pcp-cyan) 60%, transparent), 1px 0 color-mix(in srgb, var(--pcp-magenta) 60%, transparent);
}
.pcp-count small { font-size: 0.3em; letter-spacing: 0.1em; margin-left: 0.3em; vertical-align: top; opacity: 0.6; }
.pcp-segs { display: flex; gap: 4px; margin-top: 0.9em; width: clamp(120px, calc(var(--pcp-u) * 0.36), 300px); }
.pcp-seg { position: relative; flex: 1; height: 2px; background: rgba(200, 205, 255, 0.16); overflow: hidden; }
.pcp-seg::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--pcp-cyan), var(--pcp-violet), var(--pcp-magenta));
  transform-origin: 0 50%;
  transform: scaleX(clamp(0, calc(var(--pcp-p) * 4 - var(--k)), 1));
}


/* ---- the wordmark under the portal ---- */
.pcp-title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  pointer-events: none;
  transition: opacity 0.6s ease, transform 1.7s cubic-bezier(0.6, 0, 0.3, 1), filter 1.2s ease;
}
.pcp-root[data-phase="lift"] .pcp-title { opacity: 0; transform: scale(1.35); filter: blur(10px); }
.pcp-word {
  margin: 0;
  font-family: var(--pcp-display);
  font-size: clamp(26px, calc(var(--pcp-u) * 0.085), 110px);
  font-weight: 300;
  letter-spacing: 0.34em;
  text-indent: 0.34em;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
}
.pcp-letter {
  display: inline-block;
  opacity: 0;
  filter: blur(14px);
  transform: translateY(0.35em) scale(1.4);
  text-shadow:
    -0.04em 0 color-mix(in srgb, var(--pcp-cyan) 75%, transparent),
    0.04em 0 color-mix(in srgb, var(--pcp-magenta) 75%, transparent),
    0 0 0.5em color-mix(in srgb, var(--pcp-violet) 60%, transparent);
  transition: opacity 1s ease, filter 1.2s ease, transform 1.4s cubic-bezier(0.15, 0.8, 0.15, 1);
}
.pcp-root[data-phase="reveal"] .pcp-letter, .pcp-root[data-phase="lift"] .pcp-letter {
  opacity: 1;
  filter: blur(0);
  transform: none;
}
.pcp-caption, .pcp-hint {
  margin: 1.4em 0 0;
  font-size: clamp(9px, calc(var(--pcp-u) * 0.017), 13px);
  letter-spacing: 0.4em;
  text-indent: 0.4em;
  text-transform: uppercase;
  color: rgba(225, 228, 255, 0.72);
  opacity: 0;
  transition: opacity 1s ease 0.7s, letter-spacing 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s;
}
.pcp-hint { margin-top: 0.9em; color: rgba(225, 228, 255, 0.45); transition-delay: 1.6s; }
.pcp-root[data-phase="reveal"] .pcp-caption { opacity: 1; letter-spacing: 0.5em; }
.pcp-root[data-phase="reveal"] .pcp-hint { opacity: 1; animation: pcp-breathe 2.4s ease-in-out 2.4s infinite; }

.pcp-frame { position: absolute; inset: 0; pointer-events: none; }
.pcp-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

@keyframes pcp-breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

@media (prefers-reduced-motion: reduce) {
  .pcp-root[data-phase="reveal"] .pcp-hint { animation: none; }
  .pcp-letter { filter: none; transform: none; transition: opacity 0.4s ease; }
  .pcp-root[data-phase="lift"] .pcp-title { transform: none; filter: none; }
  .pcp-bar, .pcp-bl, .pcp-fbstar { transition-duration: 0.01s; }
  .pcp-root[data-phase="lift"][data-hole="true"] .pcp-gate { transition-delay: 0s; }
}
`;function It({children:t,loop:a=!1,progress:s,durationMs:r=6500,word:c="Prisma",caption:d="Five passes · One light",passes:u=vt,palette:v,intensity:$=1,speed:C=1,quality:Q=.6,grid:K=!0,hud:L=!0,grain:O=!0,fontFamily:F=gt,height:q="100svh",onComplete:X,className:Ze=""}){const[g,N]=i.useState("load"),[ee,Ae]=i.useState(0),[Je,$e]=i.useState(0),[Y,Qe]=i.useState(0),[me,Ee]=i.useState(!1),[Ce,et]=i.useState(0),[te,tt]=i.useState({w:1280,h:800}),x=Lt(),ae=i.useRef(null),Te=i.useRef(null),he=i.useRef(null),oe=i.useRef(!1),Be=i.useRef(0),Le=i.useRef("load"),de=i.useRef(0),at=i.useRef(0),Fe=i.useRef(Y);Fe.current=Y;const Ne=i.useRef(s);Ne.current=s;const ne=i.useRef(X);ne.current=X;const ve=!a&&t!=null,V={...D,...v},Ie={colors:V,exposure:1.25*Math.min(2,Math.max(.4,$)),speed:Math.min(3,Math.max(0,C)),quality:Math.min(1,Math.max(.35,Q)),grain:O?.035:0,hole:ve,passes:u.length},ze=i.useRef(Ie);ze.current=Ie;const re=x?600:yt,se=x?700:St;i.useEffect(()=>{Le.current=g,de.current=performance.now(),g==="load"&&(at.current=de.current)},[g,Y]),i.useEffect(()=>{const o=ae.current;if(!o)return;const e=()=>{const R=o.getBoundingClientRect();R.width>0&&R.height>0&&tt({w:Math.round(R.width),h:Math.round(R.height)})};if(e(),typeof ResizeObserver>"u")return;const f=new ResizeObserver(e);return f.observe(o),()=>f.disconnect()},[]),i.useEffect(()=>{if(g!=="load")return;const o=ae.current;let e=0,f=0,R=performance.now();const ie=R;let n=-1;oe.current=!1;const B=k=>{Be.current=k,o==null||o.style.setProperty("--pcp-p",k.toFixed(4));const M=Math.round(k*100);M!==n&&(n=M,Ae(M))},W=k=>{const M=Math.min(64,k-R);R=k;const A=Ne.current;let I=A!==void 0?m(A/100):Mt((k-ie)/Math.max(400,r));oe.current&&(I=1);const ce=oe.current?.06:A!==void 0?.08:1;if(f+=(I-f)*Math.min(1,ce*(M/16.7)),I-f<.002&&(f=I),B(f),f>=1){N("ignite");return}e=requestAnimationFrame(W)};return B(0),e=requestAnimationFrame(W),()=>cancelAnimationFrame(e)},[g,Y,r]),i.useEffect(()=>{const o=Te.current;if(!o)return;let e=null;try{e=o.getContext("webgl",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance"})}catch{e=null}if(!e){Ee(!0);return}const f=Bt(e,Et,Ct);if(!f){Ee(!0);return}const R=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,R),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);const ie=e.getAttribLocation(f,"aPos");e.enableVertexAttribArray(ie),e.vertexAttribPointer(ie,2,e.FLOAT,!1,0,0),e.useProgram(f);const n={};for(const b of Tt)n[b]=e.getUniformLocation(f,b);let B=0,W=performance.now(),k=0,M=0,A=0,I=-1,ce=!0;const l={x:0,y:0,on:0,nx:0,ny:0},G=typeof IntersectionObserver<"u"?new IntersectionObserver(b=>{ce=b[b.length-1].isIntersecting}):null;G==null||G.observe(o);const H=(b,pe)=>Ke(b)??Ke(pe)??[0,0,0],De=b=>{B=requestAnimationFrame(De);const pe=Math.min(.064,(b-W)/1e3);if(W=b,!ce||typeof document<"u"&&document.hidden||!e)return;const E=ze.current;x||(k+=pe*E.speed);const le=x?4:k%600,Ve=Math.min(2,window.devicePixelRatio||1),Z=Math.max(1,Math.round(o.clientWidth*Ve*E.quality)),J=Math.max(1,Math.round(o.clientHeight*Ve*E.quality));(o.width!==Z||o.height!==J)&&(o.width=Z,o.height=J);const ue=Z/J,z=Le.current,be=b-de.current,j=dt=>x?1:1-Math.exp(-pe*dt),Ge=z==="load"?He(Be.current):4;M+=(Ge-M)*j(z==="load"&&Ge<M?30:6),z==="load"?A=0:z==="ignite"?A=Math.max(A,m(be/re)):A+=(1-A)*j(5);const _=z==="lift"?m(be/se):0,h=kt(M,ue),P=At(A,ue),y=z==="load",ye=y?Ue(M,E.passes):E.passes-1;ye!==I&&(I=ye,$e(ye));const fe=he.current;l.on+=((fe&&!x?1:0)-l.on)*j(4),fe?(l.nx+=(fe.x-l.nx)*j(7),l.ny+=(fe.y-l.ny)*j(7)):(l.nx+=(0-l.nx)*j(1.5),l.ny+=(0-l.ny)*j(1.5)),l.x=l.nx*(ue*h.zoom)*.5,l.y=-l.ny*h.zoom*.5;const T=y?0:P.mode,pt=x?0:Math.sin(le*1.3)*.025*T,lt=x?1:Math.exp(S(_)*5.4),ut=y?h.ax:P.x+l.x*.04*T,ft=y?h.ay:P.y+l.y*.04*T,mt=(y?We:P.r)*(1+pt)*lt,we=1-_,ht=y?1:P.comet,U=E.colors;e.viewport(0,0,Z,J),e.uniform2f(n.uRes,Z,J),e.uniform1f(n.uZoom,h.zoom),e.uniform1f(n.uTime,le),e.uniform2f(n.uApex,y?h.ax:P.x,y?h.ay:P.y),e.uniform1f(n.uBeta,h.beta),e.uniform1f(n.uPhi,h.phi),e.uniform1f(n.uRho0,h.rho0),e.uniform1f(n.uKv,h.kv*(1+(y?0:P.retract)*5)),e.uniform1f(n.uVf,h.vf),e.uniform1f(n.uNarrow,h.narrow),e.uniform1f(n.uWave,h.wave),e.uniform1f(n.uBulge,h.bulge),e.uniform1f(n.uEdge,h.edge),e.uniform1f(n.uClosed,h.closed),e.uniform1f(n.uComet,ht),e.uniform1f(n.uLines,(y?h.lines:P.lines)*we),e.uniform1f(n.uLineDir,ke(ue).tail),e.uniform2f(n.uStarC,ut,ft),e.uniform1f(n.uStarR,mt),e.uniform1f(n.uStarAmt,y?h.star:1),e.uniform1f(n.uStarMode,T),e.uniform1f(n.uStarRot,(y?0:P.rot)+(x?0:Math.sin(le*.3)*.05*T)),e.uniform1f(n.uSwirl,T*(.55+(x?0:Math.sin(le*.7)*.08))),e.uniform2f(n.uTilt,(.32-l.nx*.4*l.on)*T*we,(.22+l.ny*.34*l.on)*T*we),e.uniform1f(n.uHoleOpen,E.hole?x?_:S(m(_/.4)):0),e.uniform1f(n.uBloom,y||x?0:P.bloom*(1-_));let Se=0;!E.hole&&z==="lift"&&(Se=x?_:S(m((_-.5)/.5))),y&&Fe.current>0&&!x&&(Se=Math.exp(-be/450)),e.uniform1f(n.uFlash,Se),e.uniform3f(n.uPtr,l.x,l.y,l.on*(y?1:1-T)),e.uniform3fv(n.uBg,H(U.background,D.background)),e.uniform3fv(n.uBlue,H(U.blue,D.blue)),e.uniform3fv(n.uViolet,H(U.violet,D.violet)),e.uniform3fv(n.uMagenta,H(U.magenta,D.magenta)),e.uniform3fv(n.uCyan,H(U.cyan,D.cyan)),e.uniform3fv(n.uGold,H(U.gold,D.gold)),e.uniform1f(n.uExposure,E.exposure),e.uniform1f(n.uGrain,x?0:E.grain),e.drawArrays(e.TRIANGLES,0,3)};B=requestAnimationFrame(De);const Oe=b=>{b.preventDefault(),cancelAnimationFrame(B),B=0},qe=()=>et(b=>b+1);return o.addEventListener("webglcontextlost",Oe),o.addEventListener("webglcontextrestored",qe),()=>{cancelAnimationFrame(B),G==null||G.disconnect(),o.removeEventListener("webglcontextlost",Oe),o.removeEventListener("webglcontextrestored",qe),e&&!e.isContextLost()&&(e.deleteProgram(f),e.deleteBuffer(R))}},[x,Ce,re,se]),i.useEffect(()=>{if(g==="ignite"){const o=setTimeout(()=>N("reveal"),re);return()=>clearTimeout(o)}if(g==="reveal"){const o=setTimeout(()=>N("lift"),wt);return()=>clearTimeout(o)}if(g==="lift"){const o=setTimeout(()=>{var e;a?(Ae(0),Qe(f=>f+1),N("load")):(N("done"),(e=ne.current)==null||e.call(ne))},se);return()=>clearTimeout(o)}},[g,a,re,se]);const je=()=>{g==="load"?oe.current=!0:g==="ignite"?N("reveal"):g==="reveal"&&N("lift")},_e=o=>{const e=ae.current;if(!e)return;const f=e.getBoundingClientRect();he.current={x:(o.clientX-f.left)/f.width*2-1,y:(o.clientY-f.top)/f.height*2-1}},ot=()=>{he.current=null},ge=g==="load",nt=Math.min(te.w,te.h),rt=Pe(te.w/Math.max(1,te.h)).zoom,st=(.5+(Ye*.92-Xe+.05)/rt)*100,xe=me?ge?Ue(He(ee/100),u.length):u.length-1:Je,it=xe>=0&&xe<u.length?u[xe]:"",ct=a?"Click to replay":"Click to enter";return p.jsxs("div",{ref:ae,className:"pcp-root "+Ze,"data-phase":g,"data-hole":ve,"data-gl":!me,style:{height:q,"--pcp-u":nt+"px","--pcp-p":0,"--pcp-bg":V.background,"--pcp-blue":V.blue,"--pcp-violet":V.violet,"--pcp-magenta":V.magenta,"--pcp-cyan":V.cyan,"--pcp-display":F,"--pcp-mono":xt},onPointerMove:_e,onPointerDown:_e,onPointerLeave:ot,children:[p.jsx("style",{children:Ft}),ve?p.jsx("div",{className:"pcp-dest","data-active":g==="done","aria-hidden":g!=="done"&&g!=="lift",children:t}):null,g!=="done"?p.jsxs("div",{className:"pcp-gate",role:"progressbar","aria-label":c+" is loading","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":ee,"aria-valuetext":ge?ee+"%":"Loaded. Press Enter to continue.",tabIndex:0,onClick:je,onKeyDown:o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),je())},children:[me?p.jsx("div",{className:"pcp-layer pcp-fallback","aria-hidden":"true",children:p.jsx("svg",{className:"pcp-fbstar",viewBox:"-1 -1 2 2",children:p.jsx("path",{d:bt})})}):p.jsx("canvas",{ref:Te,className:"pcp-canvas","aria-hidden":"true"},Ce),K?p.jsx("div",{className:"pcp-layer pcp-grid","aria-hidden":"true"}):null,p.jsxs("div",{className:"pcp-title",style:{top:st+"%"},"aria-hidden":"true",children:[p.jsx("p",{className:"pcp-word",children:Array.from(c).map((o,e)=>p.jsx("span",{className:"pcp-letter",style:{transitionDelay:.05+e*.08+"s"},children:o===" "?" ":o},Y+":"+e))}),d?p.jsx("p",{className:"pcp-caption",children:d}):null,p.jsx("p",{className:"pcp-hint",children:ct})]}),p.jsx("div",{className:"pcp-bar pcp-bar-top"}),p.jsx("div",{className:"pcp-bar pcp-bar-bot"}),L?p.jsx("div",{className:"pcp-hud","aria-hidden":"true",children:p.jsxs("div",{className:"pcp-bl",children:[p.jsxs("p",{className:"pcp-count",children:[String(ee).padStart(3,"0"),p.jsx("small",{children:"%"})]}),p.jsx("div",{className:"pcp-segs",children:[0,1,2,3].map(o=>p.jsx("i",{className:"pcp-seg",style:{"--k":o}},o))})]})}):null,p.jsx("div",{className:"pcp-frame"}),p.jsx("span",{className:"pcp-sr","aria-live":"polite",children:ge?it.replace(/\n/g,", "):c+(d?" — "+d:"")})]}):null]})}export{It as P};
