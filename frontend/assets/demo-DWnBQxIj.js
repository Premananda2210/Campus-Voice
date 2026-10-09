import{r as _,j as f}from"./index-CdiR0C0d.js";const Ue=["#0D0A14","#FF5A1F","#FF9EC1","#2F4CFF","#FFE6B8"];function ge(n){const c=/^#?([0-9a-f]{6})$/i.exec(n.trim());if(!c)return null;const u=parseInt(c[1],16);return[(u>>16&255)/255,(u>>8&255)/255,(u&255)/255]}function De(n){return Ue.map((c,u)=>ge((n==null?void 0:n[u])??"")??ge(c))}function Pe(n){return n.trim().split(/\s+/).filter(Boolean)}function Ie(n,c){return Math.max(2,n*.075*c)}function Be(n,c){const u=Math.min(Math.max(n/c,0),1);return 1-Math.pow(1-u,3)}function Ce(n){const c=(u,p)=>"rgba("+u.map(D=>Math.round(D*255)).join(",")+","+p+")";return"radial-gradient(60% 50% at 25% 30%,"+c(n[1],.4)+",transparent 70%),radial-gradient(50% 45% at 78% 35%,"+c(n[3],.4)+",transparent 70%),radial-gradient(45% 40% at 60% 80%,"+c(n[2],.27)+",transparent 70%),"+c(n[0],1)}function pe(n,c,u,p){return c+(n-c)*Math.exp(-p*u)}function je(n){return[.5+.32*Math.sin(n*.37),.56+.16*Math.sin(n*.53+1.1)]}const ve=1100,xe=3,Ne=2.5,Xe=.05,ze=8,Ge=.15,Oe=`#version 300 es
in vec2 a_position;
out vec2 vUv;
void main() {
  vUv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,K=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
`,We=K+`uniform float u_time;
uniform float u_aspect;
uniform vec3 u_c0;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec3 u_c4;
uniform float u_octaves;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 turn = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    if (float(i) >= u_octaves) break;
    v += a * noise(p);
    p = turn * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = vec2(vUv.x * u_aspect, vUv.y) * 1.2;
  float t = u_time * 0.06;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p + 3.5 * q + vec2(8.3, 2.8) - t * 1.1));
  float f = fbm(p + 3.0 * r);

  // fbm rarely leaves 0.25..0.8, so the thresholds sit inside that range:
  // set wider, the field is mostly ground and the glass has nothing to bend.
  vec3 col = u_c0;
  col = mix(col, u_c3, smoothstep(0.25, 0.72, q.x) * 0.9);
  col = mix(col, u_c1, smoothstep(0.34, 0.74, f));
  col = mix(col, u_c2, smoothstep(0.42, 0.8, r.y) * 0.8);
  col = mix(col, u_c4, smoothstep(0.55, 0.9, f * r.x * 1.8) * 0.7);

  float bands = 0.5 + 0.5 * sin((f * 7.0 + r.x * 3.0) * 3.14159);
  col *= mix(0.86, 1.1, smoothstep(0.2, 0.8, bands));

  // A faint glow behind the headline: one focal point, and more light for
  // the glass to bend.
  vec2 g = (vUv - vec2(0.5, 0.56)) / vec2(0.5, 0.2);
  col += u_c4 * 0.07 * exp(-dot(g, g));

  // Quieter toward the foot, and a soft scrim where the description and
  // buttons sit, so body copy never lands on a busy patch.
  col *= mix(0.42, 1.0, smoothstep(0.02, 0.62, vUv.y));
  vec2 s = (vUv - vec2(0.5, 0.33)) / vec2(0.32, 0.13);
  col *= 1.0 - 0.4 * exp(-dot(s, s));
  o = vec4(col, 1.0);
}`,qe=K+`uniform sampler2D u_src;
uniform vec2 u_step;
uniform float u_radius;
uniform float u_read;
uniform float u_write;
float pick(vec4 t) {
  // 0: the raw mask, ignoring faint anti-alias debris; 1: the bevel; 2: the dome.
  return u_read < 0.5 ? smoothstep(0.06, 1.0, t.r) : u_read < 1.5 ? t.r : t.b;
}
void main() {
  float sigma = max(u_radius * 0.5, 0.5);
  float sum = 0.0;
  float weights = 0.0;
  for (int i = -24; i <= 24; i++) {
    float x = float(i) * u_radius / 24.0;
    float w = exp(-0.5 * x * x / (sigma * sigma));
    sum += pick(texture(u_src, vUv + u_step * x)) * w;
    weights += w;
  }
  vec4 here = texture(u_src, vUv);
  float blurred = sum / weights;
  o = vec4(u_write < 0.5 ? blurred : here.r, here.g, u_write < 0.5 ? here.b : blurred, 1.0);
}`,He=K+`uniform sampler2D u_field;
uniform sampler2D u_height;
uniform vec2 u_htexel;
uniform float u_bevel;
uniform float u_aspect;
uniform vec2 u_light;
uniform float u_glass;
uniform float u_form;
uniform vec2 u_res;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// A rounded bevel, steep at the letter's edge, plus a gentle dome across the
// face. Flat faces read as panes of one tint, and a stem is a rectangle, so
// every stem looked like a box; the dome makes each one a volume.
float bevel(vec2 p) {
  vec4 t = texture(u_height, p);
  float x = clamp((t.r - 0.5) * 2.0, 0.0, 1.0);
  float edge = sqrt(1.0 - (1.0 - x) * (1.0 - x));
  float dome = clamp((t.b - 0.5) * 2.0, 0.0, 1.0);
  return edge * 0.8 + dome * 0.45;
}

void main() {
  vec2 uv = vUv;
  vec2 hv = texture(u_height, uv).rg;
  // Tight tracking overlaps glyphs, and the canvas leaves faint seams (a few
  // /255) along their edges. Counted as glass, they tint every glyph's box.
  float inside = smoothstep(0.08, 0.92, hv.g) * u_glass * u_form;

  // Slope from a Sobel stencil two texels wide. A bilinear height map has a
  // constant slope inside each texel that jumps at the texel edge; a narrow
  // difference hands those steps to the highlight, which turns them into a
  // fine dot grid across every face that faces the light.
  vec2 dx = vec2(u_htexel.x * 2.0, 0.0);
  vec2 dy = vec2(0.0, u_htexel.y * 2.0);
  float tl = bevel(uv - dx + dy);
  float tc = bevel(uv + dy);
  float tr = bevel(uv + dx + dy);
  float ml = bevel(uv - dx);
  float mr = bevel(uv + dx);
  float bl = bevel(uv - dx - dy);
  float bc = bevel(uv - dy);
  float br = bevel(uv + dx - dy);
  vec2 grad = vec2((tr + 2.0 * mr + br) - (tl + 2.0 * ml + bl), (tl + 2.0 * tc + tr) - (bl + 2.0 * bc + br)) / 16.0 * u_bevel;
  vec3 n = normalize(vec3(-grad * 0.9, 1.0));

  // Light sits above the stage at the pointer.
  vec2 toLight = (u_light - uv) * vec2(u_aspect, 1.0);
  vec3 L = normalize(vec3(toLight, 0.45));
  vec3 halfway = normalize(L + vec3(0.0, 0.0, 1.0));
  float facing = max(dot(n, halfway), 0.0);
  // Two highlights: a pin of light and a soft sheen around it. One broad lobe
  // reads as plastic.
  float pin = pow(facing, 160.0);
  float sheen = pow(facing, 24.0);
  float rim = pow(1.0 - n.z, 2.0);
  // A studio light from above: upper bevels catch it, lower ones fall away.
  float studio = smoothstep(-0.7, 0.7, n.y);

  // Refraction, each channel bent a different amount: the prism fringe.
  vec2 bend = -n.xy * 0.05 * u_form * vec2(1.0 / u_aspect, 1.0);
  vec3 through = vec3(
    texture(u_field, uv + bend * 0.84).r,
    texture(u_field, uv + bend).g,
    texture(u_field, uv + bend * 1.18).b);
  // Light enters on the lit side and gathers along the far inner edge.
  vec2 ld = normalize(toLight + 1e-5);
  float gather = rim * max(dot(normalize(n.xy + 1e-5), -ld), 0.0);
  // The rim does not depend on where the pointer is: glass keeps a bright
  // edge from every angle, which keeps letters far from it legible.
  vec3 glass = through * 0.86 + 0.06
    + rim * mix(0.28, 0.72, studio)
    + sheen * 0.16 + pin * 1.3
    + gather * vec3(1.0, 0.93, 0.82) * 0.55;
  // A thin dark line where the glass meets the air defines the edge.
  float lip = smoothstep(0.42, 0.5, hv.r) * (1.0 - smoothstep(0.5, 0.6, hv.r));
  glass *= 1.0 - 0.28 * lip;

  // Behind the glass: a short contact shadow, cast away from the light. Cast
  // any further (or with a caustic ring) it reads as a second headline.
  vec2 away = normalize(toLight + 1e-5) * vec2(1.0 / u_aspect, 1.0);
  float shade = texture(u_height, uv + away * 0.012).r;
  vec3 bg = texture(u_field, uv).rgb;
  bg *= 1.0 - 0.32 * smoothstep(0.1, 0.7, shade) * u_glass;

  vec3 col = mix(bg, glass, inside);
  col += (hash(floor(uv * u_res)) - 0.5) * 0.018;
  o = vec4(col, 1.0);
}`,Ve=".ghr-root{position:relative;width:100%;overflow:hidden;color:#FFFFFF;container-type:inline-size;touch-action:pan-y}.ghr-canvas{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none;opacity:0;transition:opacity 700ms cubic-bezier(0.23,1,0.32,1)}.ghr-root[data-glass='true'] .ghr-canvas{opacity:1}.ghr-content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;height:100%;padding:72px 24px;box-sizing:border-box;text-align:center}.ghr-eyebrow,.ghr-desc,.ghr-actions{animation:ghr-in 700ms cubic-bezier(0.23,1,0.32,1) both}.ghr-desc{animation-delay:120ms}.ghr-actions{animation-delay:200ms}.ghr-eyebrow{display:inline-flex;align-items:center;height:30px;padding:0 14px;border-radius:999px;font-size:13px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.82);border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.ghr-title{margin:0;max-width:12ch;font-size:clamp(3.75rem,calc(13cqw + 1.5rem),12.5rem);font-weight:800;line-height:.95;letter-spacing:-0.025em;color:#FFFFFF;text-wrap:balance;transition:color 900ms cubic-bezier(0.23,1,0.32,1)}.ghr-root[data-glass='true'] .ghr-title{color:transparent}.ghr-word::selection{background:rgba(255,255,255,.28)}.ghr-desc{margin:0;max-width:38rem;font-size:clamp(1rem,1.7cqw,1.25rem);line-height:1.55;color:rgba(255,255,255,.8)}.ghr-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:8px}.ghr-eyebrow{margin-bottom:-8px}.ghr-arrow{margin-left:8px;transition:transform 200ms cubic-bezier(0.23,1,0.32,1)}.ghr-btn{display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 24px;border-radius:999px;font:inherit;font-size:15px;font-weight:600;text-decoration:none;cursor:pointer;transition:transform 160ms ease-out,background-color 200ms ease,border-color 200ms ease}.ghr-btn:active{transform:scale(0.97)}.ghr-btn:focus-visible{outline:2px solid #FFFFFF;outline-offset:3px}.ghr-primary{border:0;background:#FFFFFF;color:#0D0A14}.ghr-secondary{border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.07);color:#FFFFFF;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}@media (hover:hover) and (pointer:fine){.ghr-primary:hover{background:#EFEAE2}.ghr-primary:hover .ghr-arrow{transform:translateX(3px)}.ghr-secondary:hover{background:rgba(255,255,255,.13);border-color:rgba(255,255,255,.4)}}@keyframes ghr-in{from{opacity:0;transform:translateY(12px)}}@keyframes ghr-fade{from{opacity:0}}@media (prefers-reduced-motion:reduce){.ghr-eyebrow,.ghr-desc,.ghr-actions{animation-name:ghr-fade}}";function be({action:n,kind:c}){const u="ghr-btn ghr-"+c,p=f.jsxs(f.Fragment,{children:[n.label,c==="primary"?f.jsx("svg",{className:"ghr-arrow",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.4",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:f.jsx("path",{d:"M5 12h14M13 6l6 6-6 6"})}):null]});return n.href?f.jsx("a",{className:u,href:n.href,onClick:n.onClick,children:p}):f.jsx("button",{type:"button",className:u,onClick:n.onClick,children:p})}function Ye({title:n,eyebrow:c,description:u,primaryAction:p,secondaryAction:D,colors:_e,height:Ee="100svh",className:we=""}){const Q=_.useRef(null),$=_.useRef(null),J=_.useRef(null),[Te,Z]=_.useState(!1),[ye,Fe]=_.useState(0),z=De(_e),ee=Pe(n),te=_.useRef({palette:z,title:n});te.current={palette:z,title:n};const R=_.useRef({x:.5,y:.56,at:-1e9,rebuild:()=>{},kick:()=>{}});_.useEffect(()=>{var he;const v=Q.current,i=$.current;if(!v||!i)return;const e=i.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1});if(!e)return;const Ae=!!e.getExtension("EXT_color_buffer_float");let P=!1,F=0,G=0,O=0,C=!0,A=!1,W=0,re=0;const w={x:.5,y:.56};let I=-1;const j=window.matchMedia("(prefers-reduced-motion: reduce)"),ne=(r,t)=>{const o=e.createShader(r);if(!o)throw new Error("could not create shader");if(e.shaderSource(o,t),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw new Error("shader: "+e.getShaderInfoLog(o));return o},q=r=>{const t=e.createProgram();if(!t)throw new Error("could not create program");const o=ne(e.VERTEX_SHADER,Oe),a=ne(e.FRAGMENT_SHADER,r);if(e.attachShader(t,o),e.attachShader(t,a),e.bindAttribLocation(t,0,"a_position"),e.linkProgram(t),e.deleteShader(o),e.deleteShader(a),!e.getProgramParameter(t,e.LINK_STATUS))throw new Error("link: "+e.getProgramInfoLog(t));const s={},h=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let l=0;l<h;l++){const d=e.getActiveUniform(t,l);d&&(s[d.name.replace(/^u_/,"")]=e.getUniformLocation(t,d.name))}return{prog:t,u:s}},L={tex:[],fbo:[]},H=(r,t,o)=>{const a=e.createTexture(),s=e.createFramebuffer();if(!a||!s)throw new Error("could not allocate a render target");return e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),o&&Ae?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,r,t,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,r,t,0,e.RGBA,e.UNSIGNED_BYTE,null),e.bindFramebuffer(e.FRAMEBUFFER,s),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),L.tex.push(a),L.fbo.push(s),{tex:a,fbo:s,w:r,h:t}},Le=()=>{for(const r of L.tex)e.deleteTexture(r);for(const r of L.fbo)e.deleteFramebuffer(r);L.tex=[],L.fbo=[]};let T,m=null,x=null,b=null,k=null,M=4;const S=(r,t,o)=>{e.useProgram(r.prog);let a=0;for(const s in o){const h=r.u[s];if(!h)continue;const l=o[s];typeof l=="number"?e.uniform1f(h,l):Array.isArray(l)?l.length===2?e.uniform2f(h,l[0],l[1]):e.uniform3f(h,l[0],l[1],l[2]):(e.activeTexture(e.TEXTURE0+a),e.bindTexture(e.TEXTURE_2D,l),e.uniform1i(h,a++))}e.bindFramebuffer(e.FRAMEBUFFER,t?t.fbo:null),e.viewport(0,0,t?t.w:i.width,t?t.h:i.height),e.drawArrays(e.TRIANGLE_STRIP,0,4)};let oe="";const ae=()=>{const r=J.current;if(!r||!m)return;const t=v.getBoundingClientRect(),o=A?1:Math.min(window.devicePixelRatio||1,1.5),a=Math.max(1,Math.round(t.width*o)),s=Math.max(1,Math.round(t.height*o)),h=Array.from(r.querySelectorAll(".ghr-word")),l=h.map(E=>E.getBoundingClientRect()),d=getComputedStyle(r),X=[a,s,o,d.font,d.letterSpacing].concat(h.map((E,B)=>(E.textContent??"")+"@"+Math.round(l[B].left-t.left)+","+Math.round(l[B].top-t.top))).join("|");if(X===oe)return;oe=X;const U=document.createElement("canvas");U.width=a,U.height=s;const g=U.getContext("2d");if(!g)return;g.fillStyle="#000",g.fillRect(0,0,a,s);const de=parseFloat(d.fontSize)||64;g.setTransform(o,0,0,o,0,0),g.font=d.fontStyle+" "+d.fontWeight+" "+d.fontSize+" "+d.fontFamily;const Me=g;if("letterSpacing"in g&&(Me.letterSpacing=d.letterSpacing==="normal"?"0px":d.letterSpacing),g.fillStyle="#fff",g.textBaseline="alphabetic",h.forEach((E,B)=>{const me=E.textContent??"",Se=g.measureText(me).fontBoundingBoxAscent||de*.8;g.fillText(me,l[B].left-t.left,l[B].top-t.top+Se)}),k||(k=e.createTexture()),e.bindTexture(e.TEXTURE_2D,k),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,U),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),!x||x.w!==a||x.h!==s){for(const E of[x,b])E&&(e.deleteTexture(E.tex),e.deleteFramebuffer(E.fbo));x=H(a,s,!0),b=H(a,s,!0)}M=Ie(de,o),!(!x||!b)&&(S(T.blur,x,{src:k,step:[1/a,0],radius:M,read:0,write:0}),S(T.blur,b,{src:x.tex,step:[0,1/s],radius:M,read:1,write:0}),S(T.blur,x,{src:b.tex,step:[1/a,0],radius:M*xe,read:1,write:1}),S(T.blur,b,{src:x.tex,step:[0,1/s],radius:M*xe,read:2,write:1}))},V=()=>{const r=A?.65:Math.min(window.devicePixelRatio||1,2),t=Math.max(1,Math.round(i.clientWidth*r)),o=Math.max(1,Math.round(i.clientHeight*r));(i.width!==t||i.height!==o)&&(i.width=t,i.height=o);const a=A?.25:.4,s=Math.max(1,Math.round(t*a)),h=Math.max(1,Math.round(o*a));(!m||m.w!==s||m.h!==h)&&(m&&(e.deleteTexture(m.tex),e.deleteFramebuffer(m.fbo)),m=H(s,h,!1)),ae()},ke=()=>{if(!m||!b)return;const r=te.current.palette,t=i.width/i.height;S(T.field,m,{time:O,aspect:t,octaves:A?3:5,c0:r[0],c1:r[1],c2:r[2],c3:r[3],c4:r[4]}),S(T.glass,null,{field:m.tex,height:b.tex,htexel:[1/b.w,1/b.h],bevel:M,aspect:t,light:[w.x,w.y],glass:1,form:j.matches||I<0?1:Be(performance.now()-I,ve),res:[i.width,i.height]})},N=()=>C&&!document.hidden&&!j.matches,ie=r=>{if(F=0,P)return;const t=(r-G)/1e3;G=r;const o=Math.min(t,.1);!A&&W<40&&N()&&(W+=1,W>3&&t>Xe&&(re+=t>Ge?3:1),re>=ze&&(A=!0,V())),N()&&(O+=o);const a=R.current,s=(r-a.at)/1e3>Ne,[h,l]=s&&N()?je(O):[a.x,a.y];w.x=pe(w.x,h,o,s?1.2:7),w.y=pe(w.y,l,o,s?1.2:7),ke();const d=Math.abs(w.x-h)+Math.abs(w.y-l)>.0015,X=C&&!document.hidden,U=I>=0&&performance.now()-I<ve;X&&(N()||d||U)&&(F=requestAnimationFrame(ie))},y=()=>{F||P||(G=performance.now(),F=requestAnimationFrame(ie))};R.current.kick=y,R.current.rebuild=()=>{P||(ae(),y())};const se=r=>{r.preventDefault(),cancelAnimationFrame(F),F=0},ce=()=>Fe(r=>r+1);i.addEventListener("webglcontextlost",se),i.addEventListener("webglcontextrestored",ce);try{T={field:q(We),blur:q(qe),glass:q(He)};const r=e.createVertexArray();e.bindVertexArray(r);const t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),V()}catch{return}Z(!0),I=performance.now(),y();let Y=0;const le=new ResizeObserver(()=>{cancelAnimationFrame(Y),Y=requestAnimationFrame(()=>{P||(V(),y())})});le.observe(v),(he=document.fonts)==null||he.ready.then(()=>R.current.rebuild());const fe=new IntersectionObserver(([r])=>{C=r.isIntersecting,C&&y()});fe.observe(v);const ue=()=>!document.hidden&&y();return document.addEventListener("visibilitychange",ue),j.addEventListener("change",y),()=>{P=!0,cancelAnimationFrame(F),cancelAnimationFrame(Y),le.disconnect(),fe.disconnect(),document.removeEventListener("visibilitychange",ue),j.removeEventListener("change",y),i.removeEventListener("webglcontextlost",se),i.removeEventListener("webglcontextrestored",ce),Le(),k&&e.deleteTexture(k);for(const r of Object.values(T??{}))e.deleteProgram(r.prog);Z(!1)}},[ye]),_.useEffect(()=>R.current.rebuild(),[n]);const Re=v=>{const i=v.currentTarget.getBoundingClientRect(),e=R.current;e.x=(v.clientX-i.left)/i.width,e.y=1-(v.clientY-i.top)/i.height,e.at=performance.now(),e.kick()};return f.jsxs("section",{ref:Q,className:"ghr-root "+we,style:{height:Ee,background:Ce(z)},"data-glass":Te,onPointerMove:Re,children:[f.jsx("style",{children:Ve}),f.jsx("canvas",{ref:$,className:"ghr-canvas","aria-hidden":"true"}),f.jsxs("div",{className:"ghr-content",children:[c?f.jsx("span",{className:"ghr-eyebrow",children:c}):null,f.jsx("h1",{ref:J,className:"ghr-title",children:ee.map((v,i)=>f.jsxs(_.Fragment,{children:[f.jsx("span",{className:"ghr-word",children:v}),i<ee.length-1?" ":null]},i))}),u?f.jsx("p",{className:"ghr-desc",children:u}):null,p||D?f.jsxs("div",{className:"ghr-actions",children:[p?f.jsx(be,{action:p,kind:"primary"}):null,D?f.jsx(be,{action:D,kind:"secondary"}):null]}):null]})]})}function Qe(){return f.jsx(Ye,{eyebrow:"Lumen 2.0 is here",title:"Bend the light",description:"Interfaces that feel crafted, not assembled. Lumen turns your design tokens into production UI in an afternoon.",primaryAction:{label:"Start for free",href:"#"},secondaryAction:{label:"Watch the film",href:"#"}})}export{Qe as default};
