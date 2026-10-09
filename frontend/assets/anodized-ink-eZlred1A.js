import{r as d,j as L}from"./index-CdiR0C0d.js";const ee={crimson:{deep:"#030000",ink:"#d1001c",sheen:"#c9c9c9"},cobalt:{deep:"#00020a",ink:"#1f4dff",sheen:"#d4ddff"},venom:{deep:"#000401",ink:"#1fd65f",sheen:"#dcffe8"},aurum:{deep:"#040200",ink:"#d49a12",sheen:"#fff0c4"},orchid:{deep:"#030007",ink:"#a51cff",sheen:"#ecd9ff"}};function C(r){let c=String(r).trim().replace(/^#/,"");if(c.length===3||c.length===4?c=c.slice(0,3).split("").map(l=>l+l).join(""):c.length===8&&(c=c.slice(0,6)),!/^[0-9a-f]{6}$/i.test(c))return[0,0,0];const f=parseInt(c,16);return[(f>>16&255)/255,(f>>8&255)/255,(f&255)/255]}const G=6,xe=4,we=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`,ye=`#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;        // centred, y up, in units of the canvas height
uniform float uHover;       // 0 idle drift, 1 pointer inside
uniform float uEnergy;      // smoothed pointer speed
uniform vec3 uDeep;
uniform vec3 uInk;
uniform vec3 uSheen;
uniform float uTurbulence;
uniform float uScale;
uniform float uSheenAmt;
uniform float uGrain;
uniform float uGlow;
uniform float uSwirl;
uniform float uVignette;
uniform vec4 uRipples[6];   // xy centre, z start time, w strength

out vec4 outColor;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p;
    a *= 0.5;
  }
  return v;
}

// The ink. A slow fbm drift first, so the sine folds never line up into an
// obvious tile, then the iterated warp that gives the suspended-ink banding.
float inkField(vec2 p, float t) {
  vec2 q = p + 0.45 * uTurbulence * vec2(
    fbm(p * 0.9 + vec2(t * 0.07, 0.0)),
    fbm(p * 0.9 + vec2(3.1, -t * 0.05))
  );
  float s = 0.5 * uTurbulence;
  for (float i = 1.0; i < 5.0; i++) {
    q.x += s * sin(q.y * i + t * 0.5);
    q.y += s * cos(q.x * i + t * 0.5);
    s *= 0.6;
  }
  return sin(q.x * 2.0 + q.y * 2.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime;
  vec2 m = uMouse;

  // The field leans a little away from the light — a cheap parallax.
  vec2 p = uv - m * 0.05;

  // Stir: twist the field around the pointer, harder when it moves fast.
  vec2 d = p - m;
  float twist = uSwirl * (0.45 * uHover + uEnergy) * 1.5 * exp(-dot(d, d) * 9.0);
  float cs = cos(twist);
  float sn = sin(twist);
  p = m + mat2(cs, -sn, sn, cs) * d;

  // Ink drops: a damped ring that pushes the field radially as it passes.
  float ring = 0.0;
  for (int i = 0; i < 6; i++) {
    vec4 rp = uRipples[i];
    float age = t - rp.z;
    if (rp.w <= 0.0 || age < 0.0 || age > 4.0) continue;
    vec2 dd = uv - rp.xy;
    float rr = length(dd);
    float x = rr - age * 0.42;
    float env = exp(-x * x * 55.0) * exp(-age * 1.15) * rp.w;
    p += (dd / max(rr, 1e-3)) * sin(x * 40.0) * env * 0.04;
    ring += env * (0.5 + 0.5 * sin(x * 40.0));
  }

  vec2 q = p * 2.4 * uScale + vec2(0.9, 0.5);

  // Height and its gradient, by finite differences on the same field.
  float e = 0.01;
  float h = inkField(q, t);
  float hx = inkField(q + vec2(e, 0.0), t);
  float hy = inkField(q + vec2(0.0, e), t);
  vec3 n = normalize(vec3((h - hx) / e * 0.11, (h - hy) / e * 0.11, 1.0));

  float pattern = smoothstep(0.3, 0.7, h);
  vec3 col = mix(uDeep, uInk, pattern);
  // Pools darker, crests hotter — the ink has body instead of a flat fill.
  col *= 0.6 + 0.6 * smoothstep(0.5, 1.0, h);

  // Key light up-left, swung toward the pointer.
  vec3 L = normalize(vec3((m - uv) * 1.4, 0.0) + vec3(-0.35, 0.5, 0.8));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float spec = pow(max(dot(n, H), 0.0), 56.0);
  float fres = pow(1.0 - n.z, 1.5);

  // Anodizing: a thin oxide film shifts hue with the angle of the surface.
  vec3 film = 0.5 + 0.5 * cos(6.28318 * (fres * 1.3 + h * 0.18 + vec3(0.0, 0.33, 0.67)));
  vec3 sheenCol = mix(uSheen, uSheen * film * 1.5, 0.3 * pattern);
  col += sheenCol * spec * uSheenAmt * (0.12 + 0.88 * pattern);
  col += mix(uInk, film * uInk.r + uInk * 0.5, 0.4) * fres * 0.5 * pattern * uSheenAmt;

  // The liquid light that follows the pointer.
  float dist = length(uv - m);
  col += uInk * (0.1 / (dist + 0.1)) * 0.22 * uGlow * (0.45 + 0.55 * uHover);

  // Drop rings catch the light on their crests.
  col += (uInk * 0.35 + uSheen * 0.08) * ring;

  float vig = smoothstep(1.25, 0.15, length(uv * vec2(0.85, 1.0)));
  col *= mix(1.0, vig, uVignette);

  // Film grain, re-rolled each frame, plus a dither so the blacks never band.
  float g = hash21(gl_FragCoord.xy + fract(t * 7.13) * vec2(97.3, 41.7));
  col += (g - 0.5) * 0.07 * uGrain;
  col += (hash21(gl_FragCoord.yx + 13.7) - 0.5) / 255.0;

  outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;function ke(r,c,f){const l=r.createProgram();if(!l)return null;for(const[M,T]of[[r.VERTEX_SHADER,c],[r.FRAGMENT_SHADER,f]]){const m=r.createShader(M);if(!m)return null;if(r.shaderSource(m,T),r.compileShader(m),!r.getShaderParameter(m,r.COMPILE_STATUS))return console.error("anodized-ink:",r.getShaderInfoLog(m)),null;r.attachShader(l,m),r.deleteShader(m)}return r.linkProgram(l),r.getProgramParameter(l,r.LINK_STATUS)?l:(console.error("anodized-ink:",r.getProgramInfoLog(l)),null)}function be(){const[r,c]=d.useState(!1);return d.useEffect(()=>{const f=window.matchMedia("(prefers-reduced-motion: reduce)"),l=()=>c(f.matches);return l(),f.addEventListener("change",l),()=>f.removeEventListener("change",l)},[]),r}function Ee({height:r="100svh",preset:c="crimson",colors:f,speed:l=1,turbulence:M=1,scale:T=1,sheen:m=1,grain:te=1,glow:ne=1,swirl:re=1,vignette:oe=.6,interactive:P=!0,ripples:ie=!0,maxDpr:H=1.5,children:N,className:se=""}){const j=d.useRef(null),O=d.useRef(null),F=d.useRef(()=>{}),g=be(),[ae,ce]=d.useState(0),[le,K]=d.useState(!1),x={...ee[c]??ee.crimson,...f},q={deep:C(x.deep),ink:C(x.ink),sheen:C(x.sheen),speed:l,turbulence:M,scale:T,sheenAmt:m,grain:te,glow:ne,swirl:re,vignette:oe,ripples:ie},z=d.useRef(q);z.current=q;const ue=JSON.stringify(q);return d.useEffect(()=>{F.current()},[ue]),d.useEffect(()=>{const h=j.current,i=O.current;if(!h||!i)return;const e=i.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,powerPreference:"high-performance"});if(!e){K(!0);return}const b=ke(e,we,ye);if(!b){K(!0);return}const U=e.createVertexArray(),s=t=>e.getUniformLocation(b,t),a={res:s("uRes"),time:s("uTime"),mouse:s("uMouse"),hover:s("uHover"),energy:s("uEnergy"),deep:s("uDeep"),ink:s("uInk"),sheen:s("uSheen"),turbulence:s("uTurbulence"),scale:s("uScale"),sheenAmt:s("uSheenAmt"),grain:s("uGrain"),glow:s("uGlow"),swirl:s("uSwirl"),vignette:s("uVignette"),ripples:s("uRipples")},p=new Float32Array(G*4);let fe=0;const v={x:.18,y:.08},u={x:.18,y:.08};let w=0,S=0,E=0,R=g?14:0,_=0,A=0,y=0,D=!0;const he=()=>{const t=Math.min(window.devicePixelRatio||1,Math.max(.5,H)),o=Math.max(1,Math.round(i.clientWidth*t)),n=Math.max(1,Math.round(i.clientHeight*t));(i.width!==o||i.height!==n)&&(i.width=o,i.height=n)},X=t=>{y=0;const o=A?Math.min((t-A)/1e3,.05):.016;A=t,he();const n=z.current;if(g)u.x=v.x,u.y=v.y,S=w,E=0;else{if(_+=o,R+=o*n.speed,w===0){const ge=i.width/i.height;v.x=Math.sin(_*.21)*.32*ge,v.y=Math.sin(_*.17+1.3)*.22}const me=u.x,pe=u.y,Q=1-Math.exp(-o*(w?7:1.5));u.x+=(v.x-u.x)*Q,u.y+=(v.y-u.y)*Q,S+=(w-S)*(1-Math.exp(-o*3));const ve=w?Math.hypot(u.x-me,u.y-pe)/Math.max(o,.001):0;E+=(Math.min(ve*.6,1.4)-E)*(1-Math.exp(-o*4))}e.viewport(0,0,i.width,i.height),e.useProgram(b),e.bindVertexArray(U),e.uniform2f(a.res,i.width,i.height),e.uniform1f(a.time,R),e.uniform2f(a.mouse,u.x,u.y),e.uniform1f(a.hover,S),e.uniform1f(a.energy,E),e.uniform3fv(a.deep,n.deep),e.uniform3fv(a.ink,n.ink),e.uniform3fv(a.sheen,n.sheen),e.uniform1f(a.turbulence,n.turbulence),e.uniform1f(a.scale,n.scale),e.uniform1f(a.sheenAmt,n.sheenAmt),e.uniform1f(a.grain,n.grain),e.uniform1f(a.glow,n.glow),e.uniform1f(a.swirl,n.swirl),e.uniform1f(a.vignette,n.vignette),e.uniform4fv(a.ripples,p),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),!g&&D&&(y=requestAnimationFrame(X))},k=()=>{y||(y=requestAnimationFrame(X))};F.current=k,k();const B=new ResizeObserver(k);B.observe(i);const J=new IntersectionObserver(([t])=>{D=t.isIntersecting,D&&(A=0,k())});J.observe(h);const W=t=>{const o=h.getBoundingClientRect(),n=o.height||1;return{x:(t.clientX-o.left-o.width/2)/n,y:-(t.clientY-o.top-o.height/2)/n}},V=t=>{if(!P)return;const o=W(t);v.x=o.x,v.y=o.y,w=1,g&&k()},I=()=>{w=0,g&&k()},Y=t=>{if(!P||(V(t),g||!z.current.ripples))return;const o=W(t),n=fe++%G*4;p[n]=o.x,p[n+1]=o.y,p[n+2]=R,p[n+3]=1},de=window.setInterval(()=>{for(let t=0;t<G;t++)p[t*4+3]>0&&Math.abs(R-p[t*4+2])>xe&&(p[t*4+3]=0)},1e3),Z=t=>{t.preventDefault(),cancelAnimationFrame(y),y=0},$=()=>ce(t=>t+1);return h.addEventListener("pointermove",V),h.addEventListener("pointerdown",Y),h.addEventListener("pointerleave",I),h.addEventListener("pointercancel",I),i.addEventListener("webglcontextlost",Z),i.addEventListener("webglcontextrestored",$),()=>{cancelAnimationFrame(y),F.current=()=>{},window.clearInterval(de),B.disconnect(),J.disconnect(),h.removeEventListener("pointermove",V),h.removeEventListener("pointerdown",Y),h.removeEventListener("pointerleave",I),h.removeEventListener("pointercancel",I),i.removeEventListener("webglcontextlost",Z),i.removeEventListener("webglcontextrestored",$),e.deleteProgram(b),e.deleteVertexArray(U)}},[P,g,ae,H]),L.jsxs("div",{ref:j,className:"relative w-full overflow-hidden "+se,style:{height:r,background:x.deep},children:[le?L.jsx("div",{"aria-hidden":"true",className:"absolute inset-0",style:{background:"radial-gradient(ellipse 60% 45% at 30% 35%, "+x.ink+"cc, transparent 70%), radial-gradient(ellipse 50% 40% at 75% 70%, "+x.ink+"88, transparent 70%), radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.8) 100%), "+x.deep}}):L.jsx("canvas",{ref:O,"aria-hidden":"true",className:"absolute inset-0 block h-full w-full"}),N!=null&&L.jsx("div",{className:"relative z-10 h-full w-full",children:N})]})}export{ee as A,Ee as a};
