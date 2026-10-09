import{r as p,j as x}from"./index-CdiR0C0d.js";const xe=.35,Oe=.8,_t=2.4,yt=1.6,gt=3.4,Et=9;function oe(r,c,_){return c<=0?0:_?(r%c+c)%c:Math.min(Math.max(r,0),c-1)}function Xe(r,c,_){const y=Math.min(Math.max((_-r)/(c-r),0),1);return y*y*(3-2*y)}function bt(r){return Xe(Oe,1,r)}function Rt(r){return r>=xe?0:1-r/xe}function Tt(r){return Xe(.04,Oe+.06,r)}const wt=160,kt=512,At=20,pe={sim:96,dye:256,iterations:8},Lt=.05,Ut=12,St=16,Dt=1500,It=4.5,Mt=.0026,Ft=14e3,Be=900,Pt=6500,Bt=1800,Nt=240,jt=`#version 300 es
in vec2 a_position;
uniform vec2 u_texel;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
void main() {
  vUv = a_position * 0.5 + 0.5;
  vL = vUv - vec2(u_texel.x, 0.0);
  vR = vUv + vec2(u_texel.x, 0.0);
  vT = vUv + vec2(0.0, u_texel.y);
  vB = vUv - vec2(0.0, u_texel.y);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,k=`#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
out vec4 o;
`,G=`in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
`,Ne={splat:k+`uniform sampler2D u_target;
uniform float u_aspect;
uniform vec3 u_value;
uniform vec2 u_point;
uniform float u_radius;
uniform float u_raise;
uniform float u_edge;
uniform float u_seed;
void main() {
  vec2 p = vUv - u_point;
  p.x *= u_aspect;
  vec3 dab;
  if (u_edge > 0.0) {
    // A disc with a narrow rim that wobbles around its circumference, so the
    // bloom's edge is never a clean circle even before the flow tears at it.
    float ang = atan(p.y, p.x);
    float r = u_radius * (1.0 + 0.07 * sin(3.0 * ang + u_seed) + 0.04 * sin(7.0 * ang - 1.7 * u_seed));
    dab = (1.0 - smoothstep(r - u_edge, r, length(p))) * u_value;
  } else {
    dab = exp(-dot(p, p) / u_radius) * u_value;
  }
  vec3 base = texture(u_target, vUv).xyz;
  o = vec4(u_raise > 0.5 ? min(base + dab, vec3(1.0)) : base + dab, 1.0);
}`,advect:k+`uniform sampler2D u_velocity;
uniform sampler2D u_source;
uniform vec2 u_simTexel;
uniform float u_dt;
uniform float u_dissipation;
void main() {
  vec2 back = vUv - u_dt * texture(u_velocity, vUv).xy * u_simTexel;
  o = texture(u_source, back) / (1.0 + u_dissipation * u_dt);
}`,relax:k+G+`uniform sampler2D u_velocity;
uniform sampler2D u_source;
uniform vec2 u_simTexel;
uniform float u_dt;
uniform float u_relax;
uniform float u_viscosity;
void main() {
  vec2 back = vUv - u_dt * texture(u_velocity, vUv).xy * u_simTexel;
  // How far this pixel's paint has come, and the same for its neighbours,
  // each measured from its own position (upstream points shift by the same offset).
  vec2 d = texture(u_source, back).xy - vUv;
  vec2 around = 0.25 * (
    texture(u_source, back + vL - vUv).xy - vL +
    texture(u_source, back + vR - vUv).xy - vR +
    texture(u_source, back + vT - vUv).xy - vT +
    texture(u_source, back + vB - vUv).xy - vB);
  d = mix(d, around, 1.0 - exp(-u_viscosity * u_dt));
  o = vec4(vUv + d * exp(-u_relax * u_dt), 0.0, 1.0);
}`,identity:k+"void main() { o = vec4(vUv, 0.0, 1.0); }",floor:k+`uniform sampler2D u_source;
uniform float u_level;
void main() { o = vec4(max(texture(u_source, vUv).xyz, vec3(u_level)), 1.0); }`,scale:k+`uniform sampler2D u_source;
uniform float u_value;
void main() { o = texture(u_source, vUv) * u_value; }`,curl:k+G+`uniform sampler2D u_velocity;
void main() {
  float L = texture(u_velocity, vL).y;
  float R = texture(u_velocity, vR).y;
  float T = texture(u_velocity, vT).x;
  float B = texture(u_velocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,vorticity:k+G+`uniform sampler2D u_velocity;
uniform sampler2D u_curl;
uniform float u_strength;
uniform float u_dt;
void main() {
  float L = texture(u_curl, vL).x;
  float R = texture(u_curl, vR).x;
  float T = texture(u_curl, vT).x;
  float B = texture(u_curl, vB).x;
  float C = texture(u_curl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= u_strength * C;
  force.y *= -1.0;
  vec2 vel = texture(u_velocity, vUv).xy + force * u_dt;
  o = vec4(clamp(vel, -1000.0, 1000.0), 0.0, 1.0);
}`,divergence:k+G+`uniform sampler2D u_velocity;
void main() {
  vec2 C = texture(u_velocity, vUv).xy;
  float L = vL.x < 0.0 ? -C.x : texture(u_velocity, vL).x;
  float R = vR.x > 1.0 ? -C.x : texture(u_velocity, vR).x;
  float T = vT.y > 1.0 ? -C.y : texture(u_velocity, vT).y;
  float B = vB.y < 0.0 ? -C.y : texture(u_velocity, vB).y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,pressure:k+G+`uniform sampler2D u_pressure;
uniform sampler2D u_divergence;
void main() {
  float L = texture(u_pressure, vL).x;
  float R = texture(u_pressure, vR).x;
  float T = texture(u_pressure, vT).x;
  float B = texture(u_pressure, vB).x;
  float div = texture(u_divergence, vUv).x;
  o = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`,gradient:k+G+`uniform sampler2D u_pressure;
uniform sampler2D u_velocity;
void main() {
  float L = texture(u_pressure, vL).x;
  float R = texture(u_pressure, vR).x;
  float T = texture(u_pressure, vT).x;
  float B = texture(u_pressure, vB).x;
  o = vec4(texture(u_velocity, vUv).xy - vec2(R - L, T - B), 0.0, 1.0);
}`,display:k+`uniform sampler2D u_map;
uniform sampler2D u_mask;
uniform sampler2D u_from;
uniform sampler2D u_to;
uniform float u_fromAspect;
uniform float u_toAspect;
uniform vec2 u_res;
uniform vec2 u_dyeTexel;
uniform float u_wet;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// object-fit: cover, at a point of the coordinate map. The mip level comes
// from the undistorted coordinate: taken from the smeared one, it jumps
// between neighbouring pixels wherever the paint is torn up, and the tears
// turn into blocky patches of blur.
vec3 cover(sampler2D tex, float imgAspect, vec2 uv) {
  float a = u_res.x / u_res.y;
  vec2 s = a > imgAspect ? vec2(1.0, imgAspect / a) : vec2(a / imgAspect, 1.0);
  vec2 plain = (vUv - 0.5) * s;
  return textureGrad(tex, (uv - 0.5) * s + 0.5, dFdx(plain), dFdy(plain)).rgb;
}

float ink(vec2 p) { return texture(u_mask, p).x; }

void main() {
  vec2 uv = texture(u_map, vUv).xy;
  float m = ink(vUv);
  // A narrow front: the edge is wherever the flow has carried the ink's
  // halfway line, so its shape is the fluid's, not the bloom's soft gradient.
  float e = smoothstep(0.45, 0.55, m);
  vec3 col = mix(cover(u_from, u_fromAspect, uv), cover(u_to, u_toAspect, uv), e);

  vec2 dx = vec2(u_dyeTexel.x, 0.0);
  vec2 dy = vec2(0.0, u_dyeTexel.y);
  vec3 light = normalize(vec3(-0.35, 0.5, 0.8));

  // Pigment piles up at the front of a spreading drop: a darker, glossy rim,
  // only as wide as the front itself.
  float front = 4.0 * e * (1.0 - e);
  vec3 nInk = normalize(vec3(ink(vUv - dx) - ink(vUv + dx), ink(vUv - dy) - ink(vUv + dy), 0.12));
  float gloss = pow(max(dot(nInk, light), 0.0), 24.0);
  col = col * (1.0 - 0.18 * front * u_wet) + gloss * 0.22 * front * u_wet;

  col += (hash(floor(vUv * u_res)) - 0.5) * 0.02;
  o = vec4(col, 1.0);
}`},Ct=r=>new Promise((c,_)=>{const y=new Image;y.crossOrigin="anonymous",y.decoding="async",y.onload=()=>c(y),y.onerror=()=>_(new Error("could not load "+r)),y.src=r}),je=r=>String(r).padStart(2,"0"),Ot=".ifc-root{position:relative;display:flex;flex-direction:column;width:100%;overflow:hidden;background:var(--color-background,#FFFFFF);color:var(--color-foreground,#111111)}.ifc-stage{position:relative;flex:1 1 auto;min-height:0;overflow:hidden;cursor:pointer;touch-action:pan-y;user-select:none;-webkit-user-select:none;outline:none;background:#111111}.ifc-stage:focus-visible{box-shadow:inset 0 0 0 2px var(--color-primary,#111111)}.ifc-canvas,.ifc-fallback{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none}.ifc-canvas{transition:opacity 400ms ease}.ifc-fallback{object-fit:cover;transition:opacity 400ms ease}.ifc-rail{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px;flex-shrink:0;padding:0 16px 0 24px;border-top:1px solid var(--color-border,#E4E4E4)}.ifc-caption{display:flex;align-items:baseline;gap:20px;min-width:0;font-size:15px;line-height:20px}.ifc-caption>*{animation:ifc-in 260ms cubic-bezier(0.23,1,0.32,1) both}.ifc-caption>:nth-child(2){animation-delay:40ms}.ifc-caption>:nth-child(3){animation-delay:80ms}.ifc-count{flex-shrink:0;width:56px;font-size:13px;letter-spacing:.04em;font-variant-numeric:tabular-nums;color:var(--color-muted-foreground,#767676)}.ifc-count b{font-weight:700;color:var(--color-foreground,#111111)}.ifc-title{flex-shrink:0;font-weight:700}.ifc-sub{min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--color-muted-foreground,#6B6B6B)}.ifc-controls{display:flex;gap:8px;flex-shrink:0}.ifc-btn{position:relative;display:flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;border-radius:50%;border:1px solid var(--color-border,#D4D4D4);background:transparent;color:inherit;cursor:pointer;transition:transform 160ms ease-out,border-color 200ms ease}.ifc-btn:active{transform:scale(0.97)}.ifc-btn:disabled{opacity:.35;cursor:default}.ifc-btn:focus-visible{outline:2px solid var(--color-primary,#111111);outline-offset:2px}@media (hover:hover) and (pointer:fine){.ifc-btn:hover:not(:disabled){border-color:var(--color-muted-foreground,#8A8A8A)}}.ifc-ring{position:absolute;inset:-1px;width:40px;height:40px;pointer-events:none;transform:rotate(-90deg)}.ifc-ring circle{fill:none;stroke:currentColor;stroke-width:1.5;stroke-dasharray:121;stroke-dashoffset:121;animation:ifc-ring linear forwards}.ifc-clock{position:absolute;width:0;height:0;animation:ifc-clock linear forwards}.ifc-root[data-paused='true'] .ifc-ring circle,.ifc-root[data-paused='true'] .ifc-clock{animation-play-state:paused}.ifc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@keyframes ifc-in{from{opacity:0;transform:translateY(6px)}}@keyframes ifc-fade{from{opacity:0}}@keyframes ifc-ring{to{stroke-dashoffset:0}}@keyframes ifc-clock{from{opacity:0}to{opacity:0}}@media (prefers-reduced-motion:reduce){.ifc-caption>*{animation-name:ifc-fade}}@media (max-width:560px){.ifc-sub{display:none}.ifc-rail{padding:0 12px 0 16px}}";function Xt({items:r,height:c="100svh",autoplay:_=0,duration:y=Bt,stir:D=1,loop:A=!0,rail:Ge=!0,index:K,defaultIndex:We=0,onIndexChange:q,className:He=""}){const g=r.length,he=p.useRef(null),_e=p.useRef(null),[Ve,ze]=p.useState(()=>oe(We,g,A)),f=oe(K===void 0?Ve:K,g,A),[Ye,ne]=p.useState(!1),[ae,Ke]=p.useState(!1),[qe,Je]=p.useState(0),[J,Ze]=p.useState(!1),[Qe,$e]=p.useState(!1),[et,tt]=p.useState(!0),[rt,ye]=p.useState(!1),[ot,ge]=p.useState(!1),[it,Z]=p.useState(!1);p.useEffect(()=>{const o=window.matchMedia("(prefers-reduced-motion: reduce)"),e=()=>Ze(o.matches);e(),o.addEventListener("change",e);const h=()=>$e(document.hidden);return h(),document.addEventListener("visibilitychange",h),()=>{o.removeEventListener("change",e),document.removeEventListener("visibilitychange",h)}},[]),p.useEffect(()=>{const o=he.current;if(!o||typeof IntersectionObserver>"u")return;const e=new IntersectionObserver(([h])=>tt(h.isIntersecting),{threshold:.25});return e.observe(o),()=>e.disconnect()},[]);const j=p.useCallback(o=>{const e=oe(o,g,A);K===void 0&&ze(e),q==null||q(e)},[K,g,A,q]),Q=p.useRef({reduced:J,loop:A,n:g,duration:y,stir:D});Q.current={reduced:J,loop:A,n:g,duration:y,stir:D};const s=p.useRef({cur:f,pour:null,stirs:[],origin:null,clearInk:!1,energy:0,aspect:1.6,kick:()=>{}}).current,Ee=p.useRef(f);p.useEffect(()=>{if(Ee.current===f)return;if(Ee.current=f,s.pour&&(s.cur=s.pour.to,s.pour=null,s.clearInk=!0),f===s.cur)return s.kick();const{n:o,loop:e,reduced:h,duration:b}=Q.current,F=e?(f-s.cur+o)%o*2<=o:f>s.cur,w=s.origin;s.origin=null;const I=Math.random()-.5;s.pour={from:s.cur,to:f,t:0,duration:(h?Nt:Math.max(b,300))/1e3,x:w?w.x:F?.985:.015,y:w?w.y:.5+I*.3,dx:w?0:F?-1:1,dy:w?0:I*.5,drop:!!w,kicked:!1,seed:Math.random()*100},s.kick()},[f]);const nt=r.map(o=>o.src).join(`
`);p.useEffect(()=>{const o=_e.current;if(!o||g===0)return;const e=o.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1});if(!e||!(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float"))){ne(!0);return}let h=!1,b=0,F=0,w=!1,I=!1,ce=0,Re=0;const le=r.map(()=>null),ue=r.map(()=>1),R={},P={textures:[],fbos:[]};let m,U,S,E,fe,de;const Te=t=>{t.preventDefault(),cancelAnimationFrame(b),b=0},we=()=>Je(t=>t+1);o.addEventListener("webglcontextlost",Te),o.addEventListener("webglcontextrestored",we);const ke=(t,i)=>{const n=e.createShader(t);if(!n)throw new Error("could not create shader");if(e.shaderSource(n,i),e.compileShader(n),!e.getShaderParameter(n,e.COMPILE_STATUS))throw new Error("shader: "+e.getShaderInfoLog(n));return n},pt=t=>{const i=e.createProgram();if(!i)throw new Error("could not create program");const n=ke(e.VERTEX_SHADER,jt),a=ke(e.FRAGMENT_SHADER,t);if(e.attachShader(i,n),e.attachShader(i,a),e.bindAttribLocation(i,0,"a_position"),e.linkProgram(i),e.deleteShader(n),e.deleteShader(a),!e.getProgramParameter(i,e.LINK_STATUS))throw new Error("link: "+e.getProgramInfoLog(i));const l={},d=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let u=0;u<d;u++){const v=e.getActiveUniform(i,u);v&&(l[v.name.replace(/^u_/,"")]=e.getUniformLocation(i,v.name))}return{prog:i,u:l}},mt=!!e.getExtension("EXT_color_buffer_float")&&!!e.getExtension("OES_texture_float_linear"),ee=(t,i,n=!1)=>{const a=e.createTexture(),l=e.createFramebuffer();if(!a||!l)throw new Error("could not allocate a render target");e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const d=n&&mt;if(e.texImage2D(e.TEXTURE_2D,0,d?e.RGBA32F:e.RGBA16F,t,i,0,e.RGBA,d?e.FLOAT:e.HALF_FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)throw new Error("half-float target incomplete");return P.textures.push(a),P.fbos.push(l),{tex:a,fbo:l,w:t,h:i}},te=(t,i,n=!1)=>{const a={read:ee(t,i,n),write:ee(t,i,n),swap:()=>{}};return a.swap=()=>{const l=a.read;a.read=a.write,a.write=l},a},Ae=()=>{for(const t of P.textures)e.deleteTexture(t);for(const t of P.fbos)e.deleteFramebuffer(t);P.textures=[],P.fbos=[]},T=(t,i,n)=>{e.useProgram(t.prog);let a=0;for(const l in n){const d=t.u[l];if(!d)continue;const u=n[l];typeof u=="number"?e.uniform1f(d,u):Array.isArray(u)?u.length===2?e.uniform2f(d,u[0],u[1]):e.uniform3f(d,u[0],u[1],u[2]):(e.activeTexture(e.TEXTURE0+a),e.bindTexture(e.TEXTURE_2D,u.tex),e.uniform1i(d,a++))}e.bindFramebuffer(e.FRAMEBUFFER,i?i.fbo:null),e.viewport(0,0,i?i.w:o.width,i?i.h:o.height),e.drawArrays(e.TRIANGLE_STRIP,0,4)},C=t=>{e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT)},B=t=>[1/t.w,1/t.h],O=(t,i,n,a,l,d,u=0,v=0)=>{T(R.splat,t.write,{target:t.read,point:[i,n],value:a,radius:l,aspect:s.aspect,raise:d?1:0,edge:u,seed:v,texel:B(t.write)}),t.swap()},Le=()=>{for(const t of[m.read,m.write,U.read,U.write])C(t);T(R.identity,S.read,{}),T(R.identity,S.write,{})},Ue=t=>s.aspect>=1?[Math.round(t*s.aspect),t]:[t,Math.round(t/s.aspect)],Se=()=>{Ae();const[t,i]=Ue(I?pe.sim:wt),[n,a]=Ue(I?pe.dye:kt);m=te(t,i),U=te(t,i),fe=ee(t,i),de=ee(t,i),S=te(n,a,!0),E=te(n,a),Le();for(const l of[E.read,E.write])C(l)},xt=(t,i)=>{const n=B(m.read);T(R.curl,de,{velocity:m.read,texel:n}),T(R.vorticity,m.write,{velocity:m.read,curl:de,strength:St,dt:t,texel:n}),m.swap(),T(R.divergence,fe,{velocity:m.read,texel:n}),T(R.scale,U.write,{source:U.read,value:.8,texel:n}),U.swap();for(let a=0,l=I?pe.iterations:At;a<l;a++)T(R.pressure,U.write,{pressure:U.read,divergence:fe,texel:n}),U.swap();T(R.gradient,m.write,{pressure:U.read,velocity:m.read,texel:n}),m.swap(),T(R.advect,m.write,{velocity:m.read,source:m.read,simTexel:n,dt:t,dissipation:yt,texel:n}),m.swap(),T(R.relax,S.write,{velocity:m.read,source:S.read,simTexel:n,dt:t,relax:_t,viscosity:Et,texel:B(S.read)}),S.swap(),i&&(T(R.advect,E.write,{velocity:m.read,source:E.read,simTexel:n,dt:t,dissipation:0,texel:B(E.read)}),E.swap())},ht=(t,i,n)=>{if(t.drop){if(!t.kicked){t.kicked=!0;for(let u=0;u<8;u++){const v=u/8*Math.PI*2,M=Math.cos(v),X=Math.sin(v);O(m,t.x+M*.035/s.aspect,t.y+X*.035,[M*Be,X*Be,0],.0012,!1)}}}else{const u=Rt(i)*Ft*n;u>0&&O(m,t.x,t.y,[t.dx*u,t.dy*u,0],.0022,!1)}i<xe&&O(E,t.x,t.y,[1,1,1],.0032,!0);const a=t.x*s.aspect,l=Math.max(Math.hypot(a,t.y),Math.hypot(s.aspect-a,t.y),Math.hypot(a,1-t.y),Math.hypot(s.aspect-a,1-t.y)),d=Tt(i)*l*1.1;d>.01&&O(E,t.x,t.y,[1,1,1],d,!0,.03,t.seed+i*2);for(let u=0;u<3;u++){const v=Math.random()*Math.PI*2,M=t.x+Math.cos(v)*d/s.aspect,X=t.y+Math.sin(v)*d;if(M<0||M>1||X<0||X>1)continue;const Pe=(Math.random()<.5?-1:1)*Pt*n;O(m,M,X,[-Math.sin(v)*Pe,Math.cos(v)*Pe,0],.0035,!1)}},De=t=>le[t]??le.find(i=>i)??null,re=()=>{const t=s.pour,i=t?t.from:s.cur,n=t?t.to:s.cur,a=De(i),l=De(n);!a||!l||T(R.display,null,{map:S.read,mask:E.read,from:a,to:l,fromAspect:ue[i]??1,toAspect:ue[n]??1,res:[o.width,o.height],dyeTexel:B(S.read),wet:Q.current.reduced?0:1,texel:B(S.read)})},Ie=t=>{if(b=0,h||!w)return;const i=(t-F)/1e3;F=t;const n=Math.min(i,.25),a=Math.min(n,1/30),l=Q.current.reduced;!I&&ce<40&&(ce+=1,ce>6&&i>Lt&&(Re+=1),Re>=Ut&&(I=!0,ve(!0))),s.clearInk&&(C(E.read),C(E.write),s.clearInk=!1);for(const v of s.stirs.splice(0))l||(O(m,v.x,v.y,[v.dx*v.force,v.dy*v.force,0],Mt,!1),s.energy=t);const d=s.pour;let u=!1;if(d){d.t+=n;const v=Math.min(d.t/d.duration,1);l||ht(d,v,a);const M=l?v:bt(v);M>0&&(T(R.floor,E.write,{source:E.read,level:M,texel:B(E.read)}),E.swap()),u=v>=1,s.energy=t}l||xt(a,!!d),re(),d&&u&&(s.cur=d.to,s.pour=null,C(E.read),C(E.write)),s.pour||!l&&t-s.energy<gt*1e3?b=requestAnimationFrame(Ie):(Le(),re())};s.kick=()=>{b||h||!w||(F=performance.now(),b=requestAnimationFrame(Ie))};const ve=(t=!1)=>{const i=I?1:Math.min(window.devicePixelRatio||1,2),n=Math.round(o.clientWidth*i),a=Math.round(o.clientHeight*i);if(n===0||a===0)return;const l=n/a;(o.width!==n||o.height!==a)&&(o.width=n,o.height=a),(t||!m||Math.abs(l-s.aspect)/s.aspect>.02)&&(s.aspect=l,Se()),re()};try{for(const n of Object.keys(Ne))R[n]=pt(Ne[n]);const t=e.createVertexArray();e.bindVertexArray(t);const i=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),s.aspect=Math.max(o.clientWidth,1)/Math.max(o.clientHeight,1),Se()}catch{h||ne(!0);return}const Me=new ResizeObserver(()=>w&&ve());Me.observe(o);let Fe=0;return r.forEach((t,i)=>{Ct(t.src).then(n=>{if(h)return;const a=e.createTexture();a&&(e.bindTexture(e.TEXTURE_2D,a),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),P.textures.push(a),le[i]={tex:a},ue[i]=n.naturalWidth/Math.max(n.naturalHeight,1),w?re():(w=!0,Ke(!0),ve()))},()=>{Fe+=1,Fe===r.length&&!h&&ne(!0)})}),()=>{h=!0,cancelAnimationFrame(b),s.kick=()=>{},Me.disconnect(),o.removeEventListener("webglcontextlost",Te),o.removeEventListener("webglcontextrestored",we),Ae();for(const t of Object.values(R))e.deleteProgram(t.prog)}},[nt,qe,g]);const $=p.useRef(null),V=p.useRef(null),se=o=>{const e=o.currentTarget.getBoundingClientRect();return{x:(o.clientX-e.left)/e.width,y:1-(o.clientY-e.top)/e.height}},at=o=>{const e=se(o),h=$.current;$.current=e;const b=V.current;if(b&&o.pointerId===b.id&&Math.hypot(o.clientX-b.x,o.clientY-b.y)>6&&(b.moved=!0),!h||J||D<=0||!ae)return;const F=Dt*D*(b?It:1);s.stirs.push({x:e.x,y:e.y,dx:e.x-h.x,dy:e.y-h.y,force:F}),s.kick()},st=o=>{var e,h;o.button===0&&(Z(!0),$.current=se(o),V.current={id:o.pointerId,x:o.clientX,y:o.clientY,moved:!1},(h=(e=o.currentTarget).setPointerCapture)==null||h.call(e,o.pointerId))},ct=o=>{const e=V.current;V.current=null,!(!e||o.pointerId!==e.id||e.moved||g<2)&&(!A&&s.cur>=g-1||(s.origin=se(o),j(f+1)))},lt=o=>{(o.key==="ArrowRight"||o.key==="ArrowLeft")&&Z(!0),o.key==="ArrowRight"?(o.preventDefault(),j(f+1)):o.key==="ArrowLeft"&&(o.preventDefault(),j(f-1))},be=_>0&&!J&&g>1&&ae&&!it&&(A||f<g-1),ut=ot||rt||Qe||!et,L=r[f],ft=!A&&f===0,dt=!A&&f===g-1,vt=L?(L.title??L.alt??"Slide")+", "+(f+1)+" of "+g:"";return x.jsxs("section",{ref:he,className:"ifc-root "+He,style:{height:c},role:"region","aria-roledescription":"carousel","aria-label":"Carousel","data-paused":ut,onFocus:()=>ye(!0),onBlur:o=>{o.currentTarget.contains(o.relatedTarget)||ye(!1)},children:[x.jsx("style",{children:Ot}),x.jsx("div",{className:"ifc-stage",tabIndex:0,"aria-label":"Slides. Click to pour in the next one, or use the arrow keys.",onKeyDown:lt,onPointerDown:st,onPointerMove:at,onPointerUp:ct,onPointerCancel:()=>{V.current=null},onPointerLeave:()=>{$.current=null},children:Ye?r.map((o,e)=>x.jsx("img",{className:"ifc-fallback",src:o.src,alt:e===f?o.alt??"":"","aria-hidden":e!==f,draggable:!1,style:{opacity:e===f?1:0}},o.src)):x.jsx("canvas",{ref:_e,className:"ifc-canvas",style:{opacity:ae?1:0},"aria-hidden":"true"})}),Ge&&g>0?x.jsxs("div",{className:"ifc-rail",onPointerEnter:()=>ge(!0),onPointerLeave:()=>ge(!1),children:[x.jsxs("div",{className:"ifc-caption",children:[x.jsxs("span",{className:"ifc-count",children:[x.jsx("b",{children:je(f+1)})," / ",je(g)]}),L!=null&&L.title?x.jsx("span",{className:"ifc-title",children:L.title}):null,L!=null&&L.caption?x.jsx("span",{className:"ifc-sub",children:L.caption}):null]},f),x.jsxs("div",{className:"ifc-controls",children:[x.jsx("button",{type:"button",className:"ifc-btn",onClick:()=>{Z(!0),j(f-1)},disabled:ft||g<2,"aria-label":"Previous slide",children:x.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:x.jsx("polyline",{points:"15 18 9 12 15 6"})})}),x.jsxs("button",{type:"button",className:"ifc-btn",onClick:()=>{Z(!0),j(f+1)},disabled:dt||g<2,"aria-label":"Next slide",children:[be?x.jsx("svg",{className:"ifc-ring",viewBox:"0 0 40 40","aria-hidden":"true",children:x.jsx("circle",{cx:"20",cy:"20",r:"19.25",style:{animationDuration:_+"ms"}})},"ring-"+f):null,x.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:x.jsx("polyline",{points:"9 18 15 12 9 6"})})]})]})]}):null,be?x.jsx("span",{className:"ifc-clock",style:{animationDuration:_+"ms"},onAnimationEnd:()=>j(f+1),"aria-hidden":"true"},"clock-"+f):null,x.jsx("p",{className:"ifc-sr","aria-live":"polite",children:vt})]})}const W=1600,H=1200,N="#F2EEE6",Gt="#1B2A6B",me="#B3261E",Ce="#E8B516",Wt="#2F7F79",z="#141414",ie=(r,c,_,y,D)=>{r.fillStyle=D,r.beginPath(),r.arc(c,_,y,0,Math.PI*2),r.fill()};function Y(r,c,_,y){const D=r;r.fillStyle=y,r.textBaseline="alphabetic",r.font='italic 400 26px Georgia, "Times New Roman", serif',r.fillText("Dye Works — No. 0"+c,96,196),r.font='900 180px "Arial Black", "Helvetica Neue", Arial, sans-serif',D.letterSpacing="-5.4px",r.fillText(_,88,1010),D.letterSpacing="0px"}const Ht=[{item:{title:"Indigo",caption:"Shibori resist, twelve dips",alt:"White concentric rings on deep indigo"},paint:r=>{r.fillStyle=Gt,r.fillRect(0,0,W,H),r.strokeStyle=N,r.lineWidth=16;for(let c=70;c<=470;c+=50)r.beginPath(),r.arc(1080,600,c,0,Math.PI*2),r.stroke();Y(r,1,"Indigo",N)}},{item:{title:"Madder",caption:"Root dye on raw cotton",alt:"A madder-red disc above red stripes on chalk"},paint:r=>{r.fillStyle=N,r.fillRect(0,0,W,H),ie(r,1060,540,300,me),r.fillStyle=me;for(let c=0;c<6;c++)r.fillRect(880,900+c*26,600,12);Y(r,2,"Madder",z)}},{item:{title:"Weld",caption:"The dyer's rocket, mordanted with alum",alt:"A black diagonal band across saturated yellow"},paint:r=>{r.fillStyle=Ce,r.fillRect(0,0,W,H),r.fillStyle=z,r.fill(new Path2D("M520 1200 L760 1200 L1600 360 L1600 120 Z")),ie(r,430,440,92,z),Y(r,3,"Weld",z)}},{item:{title:"Verdigris",caption:"Copper green, left to weather",alt:"A grid of chalk dots on copper green, one dot red"},paint:r=>{r.fillStyle=Wt,r.fillRect(0,0,W,H);for(let c=0;c<5;c++)for(let _=0;_<7;_++)ie(r,860+_*96,330+c*96,18,c===2&&_===4?me:N);Y(r,4,"Verdigris",N)}},{item:{title:"Lamp Black",caption:"Soot and gum, the oldest ink",alt:"A chalk arch over a yellow sun on black"},paint:r=>{r.fillStyle=z,r.fillRect(0,0,W,H),r.fillStyle=N,r.beginPath(),r.arc(1060,800,380,Math.PI,0),r.arc(1060,800,250,0,Math.PI,!0),r.closePath(),r.fill(),ie(r,1060,720,70,Ce),Y(r,5,"Lamp Black",N)}}];function Vt(){const r=document.createElement("canvas");r.width=W*2,r.height=H*2;const c=r.getContext("2d");return c?Ht.map(({item:_,paint:y})=>(c.setTransform(2,0,0,2,0,0),y(c),{..._,src:r.toDataURL("image/png")})):[]}function Kt(){const[r,c]=p.useState([]);return p.useEffect(()=>c(Vt()),[]),x.jsx(Xt,{items:r,autoplay:3e3})}export{Kt as default};
