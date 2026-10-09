import{r as g,j as f}from"./index-CdiR0C0d.js";function L(n){const t=Math.min(1,Math.max(0,n));return t<.5?2*t*t:1-Math.pow(-2*t+2,2.2)/2}function se(n,t,o){const c=t*2+o*2,r=(n%c+c)%c;return r<t?{progress:L(r/t),stage:"peeling"}:r<t+o?{progress:1,stage:"gone"}:r<t*2+o?{progress:1-L((r-t-o)/t),stage:"returning"}:{progress:0,stage:"settled"}}function ne(n){let t=String(n).trim().replace("#","");return t.length===3&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),/^[0-9a-fA-F]{6}$/.test(t)?[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]:[0,0,0]}function oe(n,t){const o=new Float32Array((n+1)*(t+1)*2);let c=0;for(let l=0;l<=t;l++)for(let h=0;h<=n;h++)o[c++]=h/n,o[c++]=l/t;const r=new Uint16Array(n*t*6);let i=0;for(let l=0;l<t;l++)for(let h=0;h<n;h++){const p=l*(n+1)+h,_=p+1,E=p+(n+1),T=E+1;r[i++]=p,r[i++]=E,r[i++]=_,r[i++]=_,r[i++]=E,r[i++]=T}return{uvs:o,indices:r,vertexCount:(n+1)*(t+1),indexCount:r.length}}const ie=`#version 300 es
in vec2 a_uv;

uniform float u_progress;
uniform vec2 u_dir;
uniform float u_amp;
uniform float u_freq;
uniform float u_tilt;

out vec2 v_uv;
out float v_shade;
out float v_wave;

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 34.5);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  v_uv = a_uv;

  // 1.3x oversized, so the torn edge starts off screen
  vec3 P = vec3((a_uv - 0.5) * 2.6, 0.0);

  float along  = dot(a_uv - 0.5, u_dir);
  float across = dot(a_uv - 0.5, vec2(-u_dir.y, u_dir.x));

  // slack builds as the sheet lets go; the trailing half crumples hardest
  float slack = smoothstep(0.0, 0.4, u_progress) * (0.4 + 0.6 * smoothstep(-0.5, 0.5, -along));

  // Evenly spaced sines read as corrugated metal. Warping the phase with
  // noise varies the fold spacing, which is what makes cloth look like cloth.
  float warp = noise(a_uv * 2.4) * 2.6;
  float ph = along * u_freq * 6.2831853 + warp - u_progress * 6.0;
  float w = sin(ph) * 0.55
          + sin(ph * 2.17 + 1.3) * 0.28
          + sin(across * u_freq * 2.6 + warp * 1.7) * 0.3
          + (noise(a_uv * 7.0) - 0.5) * 0.5;
  w *= u_amp * slack;
  P.z = w;
  v_wave = w;

  // droop, strongest where the cloth has already let go
  P.y -= slack * 0.55 * (0.45 + 0.55 * smoothstep(-0.6, 0.6, across));

  // The sheet swings out of the screen plane. Without this it stays a flat
  // screen-aligned rectangle; with it the far edge foreshortens and the
  // silhouette curves, which is most of what reads as real cloth.
  float yaw = u_progress * u_tilt;
  float cy = cos(yaw), sy = sin(yaw);
  P = vec3(P.x * cy + P.z * sy, P.y, -P.x * sy + P.z * cy);

  float roll = -u_progress * 0.18;
  float cr = cos(roll), sr = sin(roll);
  P = vec3(P.x * cr - P.y * sr, P.x * sr + P.y * cr, P.z);

  P.xy += u_dir * u_progress * 2.9;

  // analytic fold slope lights the creases
  float dw = (cos(ph) * 0.55 + 0.608 * cos(ph * 2.17 + 1.3)) * u_freq * 6.2831853 * u_amp * slack;
  vec3 n = normalize(vec3(-dw * 0.16, 0.28, 1.0));
  vec3 L = normalize(vec3(-0.4, 0.45, 0.8));
  // cloth stays bright; creases are soft grey, not black banding
  v_shade = 0.70 + 0.30 * max(dot(n, L), 0.0);

  float camZ = 3.2;
  float wd = max(camZ - P.z, 0.2);
  gl_Position = vec4(P.xy * (camZ / wd), clamp(-P.z * 0.2, -0.99, 0.99), 1.0);
}`,ce=`#version 300 es
precision highp float;

in vec2 v_uv;
in float v_shade;
in float v_wave;

uniform vec3 u_color;
uniform vec2 u_dir;
uniform float u_edge;
uniform sampler2D u_tex;
uniform int u_hasTex;

out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 34.5);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float s = 0.0, a = 0.5, n = 0.0;
  for (int i = 0; i < 4; i++) { s += a * noise(p); n += a; p *= 2.07; a *= 0.5; }
  return s / n;
}

void main() {
  // The sheet carries its own torn edge, cut per fragment so the raggedness
  // is crisp no matter how coarse the mesh is.
  float trail = dot(v_uv - 0.5, -u_dir);
  float rag = (fbm(v_uv * 6.0) - 0.5) * u_edge;
  // The furthest on-screen corner of a 1.3x sheet sits at trail 0.545, so the
  // cut has to clear that plus the ragged swing, or the tear shows at rest.
  if (trail + rag + v_wave * 0.45 > 0.56 + u_edge * 0.5) discard;

  vec3 base = u_color;
  if (u_hasTex == 1) {
    // The sheet is 1.3x oversized so its torn edge starts off screen; the
    // artwork must still land on the viewport, not be blown up across it.
    vec2 tuv = (v_uv - 0.11538) / 0.76923;
    if (tuv.x >= 0.0 && tuv.x <= 1.0 && tuv.y >= 0.0 && tuv.y <= 1.0) {
      vec4 t = texture(u_tex, vec2(tuv.x, 1.0 - tuv.y));
      base = mix(base, t.rgb, t.a);
    }
  }
  fragColor = vec4(base * v_shade, 1.0);
}`,le=`
.cpr-root, .cpr-root * { box-sizing: border-box; }
.cpr-root { position: relative; width: 100%; overflow: hidden; }

.cpr-content { position: absolute; inset: 0; width: 100%; height: 100%; }

/* Tailwind Preflight sets height:auto and max-width:100% on canvas, which
   collapses it to nothing inside an absolutely-positioned parent. */
.cpr-root canvas {
  position: absolute; inset: 0; width: 100%; height: 100%;
  max-width: none; display: block; pointer-events: none; z-index: 10;
}

/* Stands in until the mesh is live, and replaces it entirely when WebGL2 is
   unavailable or motion is reduced. */
.cpr-sheet {
  position: absolute; inset: 0; z-index: 10; pointer-events: none;
  background: var(--cpr-color);
  display: flex; align-items: center; justify-content: center;
  color: var(--cpr-text);
  font-weight: 900; text-transform: uppercase; line-height: 0.9;
  font-size: clamp(3rem, 12vw, 10rem); letter-spacing: -0.03em;
  white-space: pre-line; text-align: center;
  transition: transform 0.6s cubic-bezier(0.7, 0, 0.3, 1), opacity 0.6s ease;
}
.cpr-sheet[data-gone="true"] { transform: translateX(-100%); opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .cpr-sheet { transition: opacity 0.2s linear; }
  .cpr-sheet[data-gone="true"] { transform: none; }
}
`;function ue(n,t,o,c){const r=document.createElement("canvas");r.width=o,r.height=c;const i=r.getContext("2d");if(!i)return null;i.clearRect(0,0,o,c);const l=n.split(`
`),h=Math.max(...l.map(T=>T.length),1),p=Math.min(c/(l.length*1.5),o*1.35/h);i.fillStyle=t,i.textAlign="center",i.textBaseline="middle",i.font="900 "+Math.round(p)+"px ui-sans-serif, system-ui, Impact, sans-serif";const _=p*.95,E=c/2-(l.length-1)*_/2;return l.forEach((T,P)=>i.fillText(T.toUpperCase(),o/2,E+P*_)),r}function fe({children:n,sheetColor:t="#ffffff",sheetText:o,textColor:c="#111111",durationMs:r=1500,delayMs:i=700,loop:l=!1,holdMs:h=900,angleDeg:p=196,tilt:_=.85,foldAmplitude:E=.13,foldFrequency:T=4.2,edgeRoughness:P=.09,height:Z="100svh",onReveal:N,className:K=""}){const I=g.useRef(null),[b,C]=g.useState(!1),[Q,z]=g.useState(!1),[$,J]=g.useState(!1),w=g.useRef(N);w.current=N;const y=g.useRef({sheetColor:t,sheetText:o,textColor:c,durationMs:r,delayMs:i,loop:l,holdMs:h,angleDeg:p,foldAmplitude:E,foldFrequency:T,edgeRoughness:P,tilt:_});return y.current={sheetColor:t,sheetText:o,textColor:c,durationMs:r,delayMs:i,loop:l,holdMs:h,angleDeg:p,foldAmplitude:E,foldFrequency:T,edgeRoughness:P,tilt:_},g.useEffect(()=>{const s=window.matchMedia("(prefers-reduced-motion: reduce)");C(s.matches);const e=S=>C(S.matches);return s.addEventListener("change",e),()=>s.removeEventListener("change",e)},[]),g.useEffect(()=>{const s=I.current;if(!s||b)return;const e=s.getContext("webgl2",{alpha:!0,antialias:!0,depth:!0});if(!e)return;const S=(a,d)=>{const u=e.createShader(a);return u?(e.shaderSource(u,d),e.compileShader(u),e.getShaderParameter(u,e.COMPILE_STATUS)?u:(e.deleteShader(u),null)):null},M=S(e.VERTEX_SHADER,ie),F=S(e.FRAGMENT_SHADER,ce),m=e.createProgram();if(!M||!F||!m||(e.attachShader(m,M),e.attachShader(m,F),e.linkProgram(m),!e.getProgramParameter(m,e.LINK_STATUS)))return;z(!0);const U=oe(120,80),k=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,k),e.bufferData(e.ARRAY_BUFFER,U.uvs,e.STATIC_DRAW);const B=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,B),e.bufferData(e.ELEMENT_ARRAY_BUFFER,U.indices,e.STATIC_DRAW);const j=e.getAttribLocation(m,"a_uv"),v=a=>e.getUniformLocation(m,a),x={progress:v("u_progress"),dir:v("u_dir"),amp:v("u_amp"),freq:v("u_freq"),edge:v("u_edge"),tilt:v("u_tilt"),color:v("u_color"),tex:v("u_tex"),hasTex:v("u_hasTex")};let R=null,G=0;if(y.current.sheetText){const a=s.clientWidth/Math.max(s.clientHeight,1),d=1024,u=Math.max(64,Math.round(1024/Math.max(a,.2))),A=ue(y.current.sheetText,y.current.textColor,d,u);A&&(R=e.createTexture(),e.bindTexture(e.TEXTURE_2D,R),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,A),G=1)}e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL);const X=Math.min(window.devicePixelRatio||1,2),q=()=>{const a=Math.max(1,Math.round(s.clientWidth*X)),d=Math.max(1,Math.round(s.clientHeight*X));(s.width!==a||s.height!==d)&&(s.width=a,s.height=d),e.viewport(0,0,s.width,s.height)},W=new ResizeObserver(q);W.observe(s),q();const ee=Date.now();let D=0,H=!1,O=!1;const Y=()=>{var V;if(H)return;const a=y.current,d=Date.now()-ee-a.delayMs;let u;d<=0?u=0:a.loop?u=se(d,a.durationMs,a.holdMs).progress:u=L(d/Math.max(a.durationMs,1)),!O&&u>=1&&(O=!0,(V=w.current)==null||V.call(w));const A=a.angleDeg*Math.PI/180,[te,re,ae]=ne(a.sheetColor);e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.useProgram(m),e.bindBuffer(e.ARRAY_BUFFER,k),e.enableVertexAttribArray(j),e.vertexAttribPointer(j,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,B),e.uniform1f(x.progress,u),e.uniform2f(x.dir,Math.cos(A),Math.sin(A)),e.uniform1f(x.amp,a.foldAmplitude),e.uniform1f(x.freq,a.foldFrequency),e.uniform1f(x.edge,a.edgeRoughness),e.uniform1f(x.tilt,a.tilt),e.uniform3f(x.color,te,re,ae),e.uniform1i(x.hasTex,G),R&&(e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R),e.uniform1i(x.tex,0)),e.drawElements(e.TRIANGLES,U.indexCount,e.UNSIGNED_SHORT,0),!(!a.loop&&u>=1)&&(D=requestAnimationFrame(Y))};return D=requestAnimationFrame(Y),()=>{H=!0,z(!1),cancelAnimationFrame(D),W.disconnect(),e.deleteProgram(m),e.deleteShader(M),e.deleteShader(F),e.deleteBuffer(k),e.deleteBuffer(B),R&&e.deleteTexture(R)}},[b]),g.useEffect(()=>{if(!b)return;const s=setTimeout(()=>{var e;J(!0),(e=w.current)==null||e.call(w)},250);return()=>clearTimeout(s)},[b]),f.jsxs("div",{className:"cpr-root "+K,style:{height:Z,"--cpr-color":t,"--cpr-text":c},children:[f.jsx("style",{children:le}),f.jsx("div",{className:"cpr-content",children:n}),!b&&f.jsx("canvas",{ref:I,"aria-hidden":"true"}),!Q&&f.jsx("div",{className:"cpr-sheet","data-gone":$,"aria-hidden":"true",children:o})]})}function de(){return f.jsx(fe,{loop:!0,sheetText:`Make
Something`,sheetColor:"#f4f2ee",textColor:"#111111",children:f.jsxs("div",{className:"flex h-full w-full flex-col justify-between bg-[#0b0b0c] px-[5vw] py-[5vh] text-white",children:[f.jsx("div",{className:"font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500",children:"Works 01 / 30"}),f.jsxs("div",{children:[f.jsxs("h2",{className:"text-[clamp(2.5rem,8vw,7rem)] font-black uppercase leading-[0.88] tracking-tight",children:["Signal",f.jsx("br",{}),"Garden"]}),f.jsx("p",{className:"mt-6 max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-neutral-400",children:"Interactive installation — the sheet is a mesh, the folds are lit per vertex"})]}),f.jsx("div",{className:"font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-600",children:"Scroll"})]})})}export{de as default};
