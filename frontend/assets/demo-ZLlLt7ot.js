import{r as i,j as n}from"./index-CdiR0C0d.js";function A(u){const t=Math.min(1,Math.max(0,u));return t<.5?4*t*t*t:1-Math.pow(-2*t+2,2.4)/2}function $(u,t,d){const p=t*2+d*2,c=(u%p+p)%p;return c<t?{progress:A(c/t),stage:"opening"}:c<t+d?{progress:1,stage:"open"}:c<t*2+d?{progress:1-A((c-t-d)/t),stage:"sealing"}:{progress:0,stage:"sealed"}}function J(u){let t=u.trim().replace("#","");return t.length===3&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),/^[0-9a-fA-F]{6}$/.test(t)?[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]:[0,0,0]}const Q=`#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,Z=`#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_progress;
uniform float u_scale;
uniform float u_soft;
uniform float u_bias;
uniform float u_seed;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21) + u_seed);
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// value noise with a smooth interpolant, so the islands have soft shoulders
// and the threshold cuts them into ragged edges rather than clean circles
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

// fractal brownian motion: the high octaves are what make the tear look torn
// instead of blobby
float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 5; i++) {
    sum += amp * noise(p);
    norm += amp;
    p *= 2.03;
    amp *= 0.5;
  }
  return sum / norm;
}

void main() {
  // aspect-correct, so blobs stay round on any viewport
  float m = min(u_resolution.x, u_resolution.y);
  vec2 p = (v_uv * u_resolution) / m;

  // fbm clusters around 0.5, which makes the threshold sweep through the bulk
  // all at once and reads as fog. Stretching the mid-range apart gives the cut
  // defined islands with fibrous edges instead.
  float n = fbm(p * u_scale);
  n = smoothstep(0.28, 0.72, n);

  // distance from centre, 0 at the middle and 1 at the corners
  vec2 d2 = (v_uv - 0.5) * vec2(max(u_resolution.x / max(u_resolution.y, 1.0), 1.0),
                                max(u_resolution.y / max(u_resolution.x, 1.0), 1.0));
  float d = clamp(length(d2) * 1.41421, 0.0, 1.0);

  // sweep the threshold past both ends, so the veil is solid at 0 and gone at 1
  float t = mix(-u_soft - 0.02, 1.0 + u_soft + 0.02, u_progress);
  float thr = t * (1.0 + u_bias) - u_bias * d;

  // opaque where the noise still sits above the threshold
  float alpha = smoothstep(thr - u_soft, thr + u_soft, n);

  fragColor = vec4(u_color, clamp(alpha, 0.0, 1.0));
}`,ee=`
.ndr-root, .ndr-root * { box-sizing: border-box; }
.ndr-root { position: relative; width: 100%; overflow: hidden; }

.ndr-content { position: absolute; inset: 0; width: 100%; height: 100%; }

/* Tailwind Preflight sets height:auto and max-width:100% on canvas, which
   collapses it to nothing inside an absolutely-positioned parent. */
.ndr-root canvas {
  position: absolute; inset: 0; width: 100%; height: 100%;
  max-width: none; display: block; pointer-events: none; z-index: 10;
}

/* Fallback veil for browsers without WebGL2, and for reduced motion. */
.ndr-veil {
  position: absolute; inset: 0; z-index: 10;
  background: var(--ndr-color); pointer-events: none;
  transition: opacity 0.4s ease;
}
.ndr-veil[data-gone="true"] { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .ndr-veil { transition: none; }
}
`;function te({children:u,veilColor:t="#000000",durationMs:d=1100,delayMs:p=600,loop:c=!1,holdMs:R=900,noiseScale:S=7,softness:E=.015,centerBias:y=.16,height:H="100svh",onReveal:M,className:O=""}){const F=i.useRef(null),[v,T]=i.useState(!1),[z,N]=i.useState(!1),f=i.useRef(M);f.current=M;const P=i.useRef({veilColor:t,durationMs:d,delayMs:p,loop:c,holdMs:R,noiseScale:S,softness:E,centerBias:y});P.current={veilColor:t,durationMs:d,delayMs:p,loop:c,holdMs:R,noiseScale:S,softness:E,centerBias:y},i.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)");T(r.matches);const e=g=>T(g.matches);return r.addEventListener("change",e),()=>r.removeEventListener("change",e)},[]),i.useEffect(()=>{const r=F.current;if(!r||v)return;const e=r.getContext("webgl2",{alpha:!0,premultipliedAlpha:!1,antialias:!0});if(!e)return;const g=(o,l)=>{const s=e.createShader(o);return s?(e.shaderSource(s,l),e.compileShader(s),e.getShaderParameter(s,e.COMPILE_STATUS)?s:(e.deleteShader(s),null)):null},_=g(e.VERTEX_SHADER,Q),x=g(e.FRAGMENT_SHADER,Z),a=e.createProgram();if(!_||!x||!a||(e.attachShader(a,_),e.attachShader(a,x),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)))return;N(!0);const j=e.getAttribLocation(a,"a_position"),b=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,b),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);const h=o=>e.getUniformLocation(a,o),m={res:h("u_resolution"),color:h("u_color"),progress:h("u_progress"),scale:h("u_scale"),soft:h("u_soft"),bias:h("u_bias"),seed:h("u_seed")};e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA);const k=Math.min(window.devicePixelRatio||1,2),L=()=>{const o=Math.max(1,Math.round(r.clientWidth*k)),l=Math.max(1,Math.round(r.clientHeight*k));(r.width!==o||r.height!==l)&&(r.width=o,r.height=l),e.viewport(0,0,r.width,r.height)},C=new ResizeObserver(L);C.observe(r),L();const V=Math.random()*100,W=Date.now();let w=0,D=!1,B=!1;const I=()=>{var U;if(D)return;const o=P.current,l=Date.now()-W-o.delayMs;let s;l<=0?s=0:o.loop?s=$(l,o.durationMs,o.holdMs).progress:s=A(l/Math.max(o.durationMs,1)),!B&&s>=1&&(B=!0,(U=f.current)==null||U.call(f));const[Y,X,K]=J(o.veilColor);e.useProgram(a),e.bindBuffer(e.ARRAY_BUFFER,b),e.enableVertexAttribArray(j),e.vertexAttribPointer(j,2,e.FLOAT,!1,0,0),e.uniform2f(m.res,r.width,r.height),e.uniform3f(m.color,Y,X,K),e.uniform1f(m.progress,s),e.uniform1f(m.scale,o.noiseScale),e.uniform1f(m.soft,Math.max(o.softness,.001)),e.uniform1f(m.bias,o.centerBias),e.uniform1f(m.seed,V),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,6),!(!o.loop&&s>=1)&&(w=requestAnimationFrame(I))};return w=requestAnimationFrame(I),()=>{D=!0,N(!1),cancelAnimationFrame(w),C.disconnect(),e.deleteProgram(a),e.deleteShader(_),e.deleteShader(x),e.deleteBuffer(b)}},[v]);const[G,q]=i.useState(!1);return i.useEffect(()=>{if(!v)return;const r=setTimeout(()=>{var e;q(!0),(e=f.current)==null||e.call(f)},200);return()=>clearTimeout(r)},[v]),n.jsxs("div",{className:"ndr-root "+O,style:{height:H,"--ndr-color":t},children:[n.jsx("style",{children:ee}),n.jsx("div",{className:"ndr-content",children:u}),!v&&n.jsx("canvas",{ref:F,"aria-hidden":"true"}),!z&&n.jsx("div",{className:"ndr-veil","data-gone":v&&G,"aria-hidden":"true"})]})}function oe(){return n.jsx(te,{loop:!0,veilColor:"#000000",children:n.jsxs("div",{className:"flex h-full w-full flex-col justify-center bg-white px-[6vw] text-black",children:[n.jsxs("h1",{className:"text-[clamp(3rem,13vw,11rem)] font-black uppercase leading-[0.82] tracking-[-0.03em]",children:["Make",n.jsx("br",{}),n.jsx("span",{className:"italic",children:"Something"})]}),n.jsx("p",{className:"mt-8 max-w-md font-mono text-xs uppercase tracking-[0.2em] text-neutral-500",children:"The veil dissolves along a noise threshold"})]})})}export{oe as default};
