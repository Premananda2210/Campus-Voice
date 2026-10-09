import{r as f,j as o}from"./index-CdiR0C0d.js";const ae=(a,c)=>a>c?c:a<-c?-c:a>0||a<0?a:0,pe=(a,c,d)=>({ax:ae((.5-c)*2*d,d),ay:ae((a-.5)*2*d,d)}),ge=(a,c)=>{const d=a*Math.PI/180,l=c*Math.PI/180,m=Math.sin(l)*Math.cos(d),w=-Math.sin(d),b=Math.cos(l)*Math.cos(d),y=Math.hypot(m,w,b)||1;return[m/y,w/y,b/y]},ve={pearl:0,silver:1,original:2,gold:3},xe=`#version 300 es
void main() {
  // An oversized triangle, not a quad. The *2 matters: without it the three
  // vertices land on (-1,-1) (1,-1) (-1,1) and cover exactly half the
  // viewport, which renders as a card sliced corner to corner.
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) * 2.0 - 1.0;
  gl_Position = vec4(p, 0.0, 1.0);
}
`,we=`#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2 uRes;
uniform vec3 uView;
uniform float uTime;
uniform float uFoil;
uniform float uFinish;
uniform float uDepth;
uniform float uBgDepth;
uniform float uHasArt;
uniform float uPattern;
uniform float uHasBg;
uniform sampler2D tArt;
uniform sampler2D tBg;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float inside(vec2 p) { return step(0.0, p.x) * step(0.0, p.y) * step(p.x, 1.0) * step(p.y, 1.0); }

// The view vector taken into card space and divided by a bounded normal
// component. Unbounded, a glancing angle sends the layer off the card.
vec2 parallax(vec2 uv, float depth) {
  return uv + uView.xy / max(abs(uView.z), 0.4) * depth * 0.10;
}

vec3 spectrum(float phase) {
  return 0.66 + 0.25 * cos(6.28318 * (phase + vec3(0.0, 0.33, 0.67)));
}

// Real holographic foil is a diffraction grating, so the colour bands *along*
// the ruling rather than washing across the card. This is the grating
// coordinate: radial rays crossed with concentric rings.
float grating(vec2 uv) {
  vec2 p = (uv - vec2(0.5, 0.46)) * vec2(uRes.x / uRes.y, 1.0);
  // The angular coefficient must be a whole number. atan wraps by 2*pi at the
  // branch cut, so a fractional multiplier leaves a fraction of a turn of
  // phase there — a hard seam running out of the centre of the card.
  return atan(p.y, p.x) * 3.0 + length(p) * 6.0;
}

// The phase is a function of the viewing direction, not of time. Hold the card
// still and the rainbow holds still.
vec3 film(vec2 uv) {
  float phase = uv.x * 0.85 + uv.y * 0.55 + uView.x * 1.5 - uView.y * 0.9
    + grating(uv) * uPattern;
  if (uFinish > 2.5) {
    float hi = 0.5 + 0.5 * sin(phase * 6.28318);
    float glint = 0.5 + 0.5 * cos((phase + 0.25) * 6.28318);
    return mix(vec3(0.72, 0.50, 0.20), vec3(1.00, 0.90, 0.60), hi * 0.7 + glint * 0.3);
  }
  vec3 color = spectrum(phase);
  return mix(color, vec3(dot(color, vec3(0.2126, 0.7152, 0.0722))), step(0.5, uFinish));
}

// A narrow band that crosses the card as it turns. The tenth power is what
// keeps it a band rather than a wash.
float sweep(vec2 uv) {
  return pow(0.5 + 0.5 * sin((uv.x * 0.72 + uv.y * 0.45 + uView.x * 1.2 + uView.y * 0.6) * 6.283), 10.0);
}

// The generated face, for a card with no art of its own: a starburst behind
// concentric guilloche rings, which is what is actually printed under the
// picture on a real foil card.
vec3 generated(vec2 uv) {
  vec2 p = (uv - vec2(0.5, 0.46)) * vec2(uRes.x / uRes.y, 1.0) * 2.1;
  float r = length(p);
  float a = atan(p.y, p.x);

  // Deliberately dark and nearly colourless. On a card with no art the foil
  // has to be the whole show, and it cannot be if the base is already loud.
  vec3 col = mix(vec3(0.045, 0.035, 0.075), vec3(0.015, 0.012, 0.03), smoothstep(0.1, 1.4, r));

  // Fine radial ruling — the grating made visible. Thin and bright, so the
  // spectrum has something crisp to sit on.
  float rays = pow(0.5 + 0.5 * cos(a * 72.0), 8.0);
  col += vec3(0.55, 0.60, 0.80) * rays * smoothstep(1.45, 0.12, r) * 0.42;

  // Concentric rings at a different pitch, so the two cross into a moire.
  float rings = pow(0.5 + 0.5 * cos(r * 90.0), 8.0);
  col += vec3(0.45, 0.55, 0.85) * rings * smoothstep(1.5, 0.1, r) * 0.30;

  // One bright halo where the art would sit, to give the composition a centre.
  col += vec3(0.5, 0.42, 0.75) * smoothstep(0.60, 0.40, r) * 0.16;
  col += vec3(0.95, 0.90, 1.0) * (smoothstep(0.52, 0.49, r) - smoothstep(0.49, 0.46, r)) * 0.5;

  return col;
}

void main() {
  vec2 uv = vec2(gl_FragCoord.x / uRes.x, 1.0 - gl_FragCoord.y / uRes.y);

  vec2 bu = parallax(uv, uBgDepth);
  vec3 col = uHasBg > 0.5
    ? texture(tBg, clamp(bu, 0.0, 1.0)).rgb
    : generated(bu);

  if (uHasArt > 0.5) {
    // The subject is pushed forward and scaled a touch, so it reads as sitting
    // above the backdrop rather than printed on it.
    vec2 su = (parallax(uv, uDepth) - 0.5) / 1.06 + 0.5;
    vec4 art = texture(tArt, clamp(su, 0.0, 1.0));
    col = mix(col, art.rgb, art.a * inside(su));
  }

  if (uFinish > 2.5) col = col * vec3(1.02, 0.95, 0.78) + vec3(0.05, 0.012, 0.0);

  vec3 foil = film(uv);
  float amount = abs(uFinish - 2.0) < 0.05 ? 0.0 : uFoil;
  float luminance = dot(col, vec3(0.2126, 0.7152, 0.0722));
  float band = sweep(uv);
  float goldBoost = uFinish > 2.5 ? 1.7 : 1.0;

  // With no art the foil carries the card, so it is allowed to be much
  // stronger; over a picture it stays at the reference's restrained level.
  float lift = mix(1.7, 1.0, uHasArt);
  col *= 1.0 - amount * 0.21 * (1.0 - foil) * (0.2 + band * 0.8);
  col += foil * amount * band * goldBoost * (0.065 + 0.11 * (1.0 - luminance)) * lift;
  // On a card with no art, the spectrum is hung on the ruling itself — scaled
  // by how bright the base already is — so the gaps between the rays stay
  // black. Adding it flat is what turns the whole card milky.
  col += foil * amount * (1.0 - uHasArt) * foil * (0.04 + 2.4 * luminance);

  // The laminate catches hardest right at the edge of the card.
  float edge = 1.0 - smoothstep(0.015, 0.06, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
  col = mix(col, foil * 0.75 + 0.21, edge * amount * (uFinish > 2.5 ? 0.42 : 0.3));

  // Glitter: a sparse hash of cells, each winking on its own phase as the card
  // turns. This is the one place time is allowed in, and only barely.
  vec2 cell = floor(uv * vec2(480.0, 720.0));
  float flake = step(0.994, hash(cell)) *
    pow(0.5 + 0.5 * sin(hash(cell + 8.0) * 30.0 + uView.x * 20.0 + uTime * 0.6), 10.0);
  col += foil * flake * amount * 0.13;

  fragColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(1.0 / 1.6)), 1.0);
}
`,oe=(a,c,d)=>{const l=a.createShader(c);if(!l)throw new Error("no shader");if(a.shaderSource(l,d),a.compileShader(l),!a.getShaderParameter(l,a.COMPILE_STATUS)){const m=a.getShaderInfoLog(l);throw a.deleteShader(l),new Error("shader: "+m)}return l};function ye({name:a="Holo Card",subtitle:c="Foil · View-dependent",number:d="No. 001",rarity:l="RARE",art:m,background:w,finish:b="pearl",width:y="clamp(230px, 64vw, 340px)",foil:P=1,pattern:N=.22,depth:B=.28,bgDepth:M=-.2,tilt:j=16,idle:I=!0,flippable:x=!0,back:ne,className:ie=""}){const V=f.useRef(null),L=f.useRef(null),[T,U]=f.useState(!1),[se,X]=f.useState(!1),[ce,le]=f.useState(0),[H,ue]=f.useState(!1),[C,de]=f.useState({ax:0,ay:0});f.useEffect(()=>{const t=window.matchMedia("(prefers-reduced-motion: reduce)"),e=()=>ue(t.matches);return e(),t.addEventListener("change",e),()=>t.removeEventListener("change",e)},[]);const D=f.useRef({foil:P,depth:B,bgDepth:M,finish:b,tilt:j,idle:I,reduced:H,pattern:N});D.current={foil:P,depth:B,bgDepth:M,finish:b,tilt:j,idle:I,reduced:H,pattern:N};const p=f.useRef({ax:0,ay:0,active:!1});f.useEffect(()=>{const t=L.current;if(!t)return;const e=t.getContext("webgl2",{alpha:!1,antialias:!1});if(!e){X(!0);return}let n=null,g=null;const E=[];let R=0,A=!1,S=0,_=0;const me=performance.now(),q=r=>{r.preventDefault(),cancelAnimationFrame(R)},z=()=>le(r=>r+1);t.addEventListener("webglcontextlost",q),t.addEventListener("webglcontextrestored",z);const O=()=>{const r=Math.min(window.devicePixelRatio||1,2),i=Math.round(t.clientWidth*r),h=Math.round(t.clientHeight*r);i===0||h===0||(t.width!==i||t.height!==h)&&(t.width=i,t.height=h,e.viewport(0,0,i,h))},Y=new ResizeObserver(O);Y.observe(t);let u={},W=0,K=0;const J=r=>{const i=e.createTexture();return e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,i),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),i&&E.push(i),i},Q=(r,i,h,v)=>{if(!r||!h)return;const s=new Image;s.crossOrigin="anonymous",s.decoding="async",s.onload=()=>{A||(e.activeTexture(e.TEXTURE0+i),e.bindTexture(e.TEXTURE_2D,h),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,s),v(1))},s.src=r},Z=()=>{if(A)return;const r=D.current,i=p.current.active?p.current.ax:0,h=p.current.active?p.current.ay:0,v=(performance.now()-me)/1e3;let s=0,$=0;r.idle&&!r.reduced&&!p.current.active&&(s=Math.sin(v*.41)*r.tilt*.34,$=Math.cos(v*.27)*r.tilt*.46);const ee=r.reduced?1:.12;S+=(i+s-S)*ee,_+=(h+$-_)*ee;const k=ge(S,_);e.useProgram(n),e.bindVertexArray(g),e.uniform2f(u.uRes,t.width,t.height),e.uniform3f(u.uView,k[0],k[1],k[2]),e.uniform1f(u.uTime,r.reduced?0:v),e.uniform1f(u.uFoil,r.foil),e.uniform1f(u.uFinish,ve[r.finish]??0),e.uniform1f(u.uDepth,r.depth),e.uniform1f(u.uBgDepth,r.bgDepth),e.uniform1f(u.uHasArt,W),e.uniform1f(u.uHasBg,K),e.uniform1f(u.uPattern,r.pattern),e.uniform1i(u.tArt,0),e.uniform1i(u.tBg,1),e.drawArrays(e.TRIANGLES,0,3);const te=Math.round(S*10)/10,re=Math.round(_*10)/10;de(F=>F.ax===te&&F.ay===re?F:{ax:te,ay:re}),R=requestAnimationFrame(Z)};try{const r=oe(e,e.VERTEX_SHADER,xe),i=oe(e,e.FRAGMENT_SHADER,we);if(n=e.createProgram(),!n)throw new Error("no program");if(e.attachShader(n,r),e.attachShader(n,i),e.linkProgram(n),e.deleteShader(r),e.deleteShader(i),!e.getProgramParameter(n,e.LINK_STATUS))throw new Error("link: "+e.getProgramInfoLog(n));g=e.createVertexArray(),e.bindVertexArray(g);for(const s of["uRes","uView","uTime","uFoil","uFinish","uDepth","uBgDepth","uHasArt","uHasBg","uPattern","tArt","tBg"])u[s]=e.getUniformLocation(n,s);const h=J(0),v=J(1);Q(m,0,h,s=>W=s),Q(w,1,v,s=>K=s),O(),R=requestAnimationFrame(Z)}catch{A||X(!0)}return()=>{A=!0,cancelAnimationFrame(R),Y.disconnect(),t.removeEventListener("webglcontextlost",q),t.removeEventListener("webglcontextrestored",z);for(const r of E)e.deleteTexture(r);g&&e.deleteVertexArray(g),n&&e.deleteProgram(n)}},[ce,m,w]);const he=t=>{const e=V.current;if(!e)return;const n=e.getBoundingClientRect(),{ax:g,ay:E}=pe((t.clientX-n.left)/Math.max(n.width,1),(t.clientY-n.top)/Math.max(n.height,1),D.current.tilt);p.current={ax:g,ay:E,active:!0}},G=()=>{p.current={ax:0,ay:0,active:!1}},fe=x?(T?"Show the front of ":"Show the back of ")+a:void 0;return o.jsx("div",{className:"relative select-none "+ie,style:{width:y,perspective:"1100px"},children:o.jsxs("div",{ref:V,role:x?"button":void 0,tabIndex:x?0:void 0,"aria-label":fe,"aria-pressed":x?T:void 0,className:"relative w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",style:{aspectRatio:"5 / 7",transformStyle:"preserve-3d",transform:"rotateX("+C.ax+"deg) rotateY("+(C.ay+(T?180:0))+"deg)",transition:T!==void 0?"transform 120ms linear":void 0,borderRadius:"5%"},onPointerMove:he,onPointerLeave:G,onPointerCancel:G,onClick:()=>x&&U(t=>!t),onKeyDown:t=>{x&&(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),U(e=>!e))},children:[o.jsxs("div",{className:"absolute inset-0 overflow-hidden",style:{containerType:"inline-size",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",borderRadius:"5%",boxShadow:"0 24px 60px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.14) inset"},children:[se?o.jsx("div",{className:"h-full w-full",style:{background:"conic-gradient(from 210deg, #4b2a6b, #2b5f7a, #6b2a4f, #7a6a2b, #4b2a6b)"}}):o.jsx("canvas",{ref:L,className:"block h-full w-full","aria-hidden":"true"}),o.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-x-0 top-0 h-[28%]",style:{background:"linear-gradient(to bottom, rgba(4,2,10,0.72), transparent)"}}),o.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-x-0 bottom-0 h-[22%]",style:{background:"linear-gradient(to top, rgba(4,2,10,0.72), transparent)"}}),o.jsx("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-[3.5%] rounded-[3.5%]",style:{border:"1px solid rgba(255,255,255,0.22)"}}),o.jsxs("div",{className:"pointer-events-none absolute inset-0 flex flex-col justify-between p-[7%]",children:[o.jsxs("div",{children:[o.jsx("p",{className:"m-0 font-semibold leading-tight text-white",style:{fontSize:"min(6cqw, 1.35rem)",textShadow:"0 2px 10px rgba(0,0,0,0.6)"},children:a}),c&&o.jsx("p",{className:"m-0 mt-1 font-mono uppercase text-white/70",style:{fontSize:"min(3cqw, 0.62rem)",letterSpacing:"0.2em"},children:c})]}),o.jsxs("div",{className:"flex items-end justify-between gap-2",children:[o.jsx("span",{className:"font-mono text-white/70",style:{fontSize:"min(3cqw, 0.6rem)",letterSpacing:"0.16em"},children:d}),l&&o.jsx("span",{className:"rounded-full border border-white/30 bg-black/30 px-2 py-0.5 font-mono uppercase text-white backdrop-blur-sm",style:{fontSize:"min(2.8cqw, 0.56rem)",letterSpacing:"0.18em"},children:l})]})]})]}),o.jsx("div",{className:"absolute inset-0 overflow-hidden",style:{backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"rotateY(180deg)",borderRadius:"5%",background:"radial-gradient(120% 90% at 50% 20%, #2a1745 0%, #150c24 55%, #090511 100%)",boxShadow:"0 24px 60px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.12) inset"},children:ne??o.jsx("div",{className:"flex h-full w-full items-center justify-center p-[10%] text-center",children:o.jsx("div",{className:"h-full w-full rounded-[4%] border border-white/15",style:{background:"repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.055) 0deg 6deg, transparent 6deg 12deg)"}})})})]})})}export{ye as H};
