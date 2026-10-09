import{r as p,j as m}from"./index-CdiR0C0d.js";const T=.09,ze=.11;function I(r,l,d){return l<=0?0:d?(r%l+l)%l:Math.min(Math.max(r,0),l-1)}function Ze(r){const l=Math.hypot(1,r);return[1/l,r/l]}function $e(r,l,d){const n=[0,l*r[0],r[1],l*r[0]+r[1]],g=Math.min(...n),P=Math.max(...n);return{rest:P+.001,gone:g-d*1.6,mid:(g+P)/2,lo:g}}function Je(r,l,d){const n=Math.max(l,0),g=Math.PI*d;return n<g?r-n:r-n/2-g/2}function Qe(r,l,d){const n=Math.max(r-l,0),g=Math.PI*d;return n<g?n:2*n-g}function et(r,l,d){return Math.abs(d)>ze?d>0:r>l}function tt(r,l,d){return Math.min(Math.max((r+d-l)/(d*.6),0),1)}const K=4.5,rt=.3,ot=.2;function nt(r,l,d,n,g){const P=-n*n*(r-d)-2*n*l,y=l+P*g;return[r+y*g,y]}const ve=-.4,at=.22,st=.07,it=16,ct=`
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,lt=`
precision highp float;

uniform sampler2D u_from;
uniform sampler2D u_to;
uniform vec2 u_res;
uniform float u_fromAspect;
uniform float u_toAspect;
uniform vec2 u_dir;
uniform float u_fold;
uniform float u_r;
uniform float u_shade;
uniform float u_turning;
uniform vec3 u_paper;

varying vec2 v_uv;

const float PI = 3.14159265;
// Light from above and slightly toward the free edge, so the roll catches a
// highlight band just short of its top instead of shading evenly.
const vec2 LIGHT = vec2(0.33, 0.944);

float stageAspect() { return u_res.x / u_res.y; }

// object-fit: cover, for a point in page units ([0, aspect] x [0, 1]).
vec3 sampleCover(sampler2D tex, float imgAspect, vec2 P) {
  float a = stageAspect();
  vec2 uv = vec2(P.x / a, P.y);
  vec2 s = a > imgAspect ? vec2(1.0, imgAspect / a) : vec2(a / imgAspect, 1.0);
  return texture2D(tex, (uv - 0.5) * s + 0.5).rgb;
}

float sdPage(vec2 P) {
  vec2 h = vec2(stageAspect(), 1.0) * 0.5;
  vec2 q = abs(P - h) - h;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
}

// Antialiased "is there paper at this point of the sheet".
float onSheet(vec2 P, float aa) { return clamp(0.5 - sdPage(P) / aa, 0.0, 1.0); }

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// The outer face of the roll and the flipped-over back. theta runs from PI/2
// at the roll's silhouette to PI on top, where the back lies flat.
float backLight(float theta) {
  vec2 n = vec2(sin(theta), -cos(theta));
  float diff = dot(n, LIGHT);
  return 0.64 + 0.34 * clamp(diff, 0.0, 1.0) + pow(max(diff, 0.0), 14.0) * 0.07;
}

// Paper stock with the print ghosting through it, mirrored, like a sheet held
// to the light. Grain is keyed to the sheet, so it travels with the paper.
vec3 paperBack(vec2 P, float light) {
  vec3 ink = sampleCover(u_from, u_fromAspect, P);
  float lum = dot(ink, vec3(0.299, 0.587, 0.114));
  vec3 c = u_paper * mix(1.0, 0.72 + 0.28 * lum, 0.35);
  float tooth = hash(floor(P * u_res.y * 0.7)) - 0.5;
  float fibre = hash(vec2(floor(P.x * 9.0), floor(P.y * u_res.y * 0.25))) - 0.5;
  return (c + tooth * 0.03 + fibre * 0.012) * light;
}

void main() {
  vec2 p = vec2(v_uv.x * stageAspect(), v_uv.y);
  float aa = 1.2 / u_res.y;
  float grain = (hash(floor(v_uv * u_res)) - 0.5) * 0.024;

  if (u_turning < 0.5) {
    gl_FragColor = vec4(sampleCover(u_from, u_fromAspect, p) + grain, 1.0);
    return;
  }

  float d = dot(p, u_dir);
  float f = u_fold;
  float R = u_r;

  // 1. The next sheet, under the roll's shadow. The shadow only falls where
  //    the sheet exists at this point along the fold, so a lifted corner
  //    shades a corner rather than a whole band.
  vec3 col = sampleCover(u_to, u_toAspect, p) + grain;
  vec2 rollTop = p + u_dir * (f + R * PI * 0.5 - d);
  float along = 1.0 - smoothstep(0.0, R * 0.8, sdPage(rollTop));
  float beyond = max(d - f - R, 0.0);
  col *= 1.0 - 0.42 * u_shade * along * exp(-beyond / (R * 0.8)) * step(f, d);

  // 2. The unlifted front of this sheet, darkened in the gutter by the fold
  //    and just outside the flipped-over back that lies on top of it.
  vec2 laid = p + u_dir * (2.0 * f + PI * R - 2.0 * d);
  if (d < f) {
    float occl = 0.3 * exp(-max(sdPage(laid), 0.0) / (R * 0.28));
    float gutter = 0.1 * exp(-(f - d) / (R * 0.4));
    col = (sampleCover(u_from, u_fromAspect, p) + grain) * (1.0 - occl - gutter);
  }

  // 3. The roll: the underside first, then the back coming over the top.
  float inRoll = step(f, d) * (1.0 - smoothstep(f + R - aa, f + R, d));
  if (inRoll > 0.0) {
    float a = asin(clamp((d - f) / R, 0.0, 1.0));

    vec2 under = p + u_dir * (f + R * a - d);
    float lightIn = 0.42 + 0.6 * clamp(dot(vec2(-sin(a), cos(a)), LIGHT), 0.0, 1.0);
    col = mix(col, (sampleCover(u_from, u_fromAspect, under) + grain) * lightIn, onSheet(under, aa) * inRoll);

    float theta = PI - a;
    vec2 over = p + u_dir * (f + R * theta - d);
    col = mix(col, paperBack(over, backLight(theta)), onSheet(over, aa) * inRoll);
  }

  // 4. The flipped-over back, lying flat on top.
  if (d < f) {
    col = mix(col, paperBack(laid, backLight(PI)), onSheet(laid, aa));
  }

  gl_FragColor = vec4(col, 1.0);
}
`,xe=(r,l,d)=>{const n=r.createShader(l);if(!n)throw new Error("could not create shader");if(r.shaderSource(n,d),r.compileShader(n),!r.getShaderParameter(n,r.COMPILE_STATUS)){const g=r.getShaderInfoLog(n);throw r.deleteShader(n),new Error("shader compile failed: "+g)}return n},dt=r=>{const l=xe(r,r.VERTEX_SHADER,ct),d=xe(r,r.FRAGMENT_SHADER,lt),n=r.createProgram();if(!n)throw new Error("could not create program");if(r.attachShader(n,l),r.attachShader(n,d),r.linkProgram(n),r.deleteShader(l),r.deleteShader(d),!r.getProgramParameter(n,r.LINK_STATUS)){const g=r.getProgramInfoLog(n);throw r.deleteProgram(n),new Error("program link failed: "+g)}return n},ut=r=>new Promise((l,d)=>{const n=new Image;n.crossOrigin="anonymous",n.decoding="async",n.onload=()=>l(n),n.onerror=()=>d(new Error("could not load "+r)),n.src=r}),ft=r=>{const l=/^#?([0-9a-f]{6})$/i.exec(r.trim()),d=parseInt(l?l[1]:"EDEEE9",16);return[(d>>16&255)/255,(d>>8&255)/255,(d&255)/255]},be=r=>String(r).padStart(2,"0"),pt=".pcc-root{position:relative;display:flex;flex-direction:column;width:100%;overflow:hidden;background:var(--color-background,#FFFFFF);color:var(--color-foreground,#111111)}.pcc-stage{position:relative;flex:1 1 auto;min-height:0;overflow:hidden;cursor:grab;touch-action:pan-y;user-select:none;-webkit-user-select:none;outline:none}.pcc-stage[data-holding='true']{cursor:grabbing}.pcc-stage:focus-visible{box-shadow:inset 0 0 0 2px var(--color-primary,#111111)}.pcc-canvas,.pcc-fallback{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none}.pcc-canvas{transition:opacity 400ms ease}.pcc-fallback{object-fit:cover}.pcc-rail{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px;flex-shrink:0;padding:0 16px 0 24px;border-top:1px solid var(--color-border,#E4E4E4)}.pcc-caption{display:flex;align-items:baseline;gap:20px;min-width:0;font-size:15px;line-height:20px}.pcc-caption>*{animation:pcc-in 260ms cubic-bezier(0.23,1,0.32,1) both}.pcc-caption>:nth-child(2){animation-delay:40ms}.pcc-caption>:nth-child(3){animation-delay:80ms}.pcc-count{flex-shrink:0;width:56px;font-size:13px;letter-spacing:.04em;font-variant-numeric:tabular-nums;color:var(--color-muted-foreground,#767676)}.pcc-count b{font-weight:700;color:var(--color-foreground,#111111)}.pcc-title{flex-shrink:0;font-weight:700}.pcc-sub{min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--color-muted-foreground,#6B6B6B)}.pcc-controls{display:flex;gap:8px;flex-shrink:0}.pcc-btn{position:relative;display:flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;border-radius:50%;border:1px solid var(--color-border,#D4D4D4);background:transparent;color:inherit;cursor:pointer;transition:transform 160ms ease-out,border-color 200ms ease}.pcc-btn:active{transform:scale(0.97)}.pcc-btn:disabled{opacity:.35;cursor:default}.pcc-btn:focus-visible{outline:2px solid var(--color-primary,#111111);outline-offset:2px}@media (hover:hover) and (pointer:fine){.pcc-btn:hover:not(:disabled){border-color:var(--color-muted-foreground,#8A8A8A)}}.pcc-ring{position:absolute;inset:-1px;width:40px;height:40px;pointer-events:none;transform:rotate(-90deg)}.pcc-ring circle{fill:none;stroke:currentColor;stroke-width:1.5;stroke-dasharray:121;stroke-dashoffset:121;animation:pcc-ring linear forwards}.pcc-clock{position:absolute;width:0;height:0;animation:pcc-clock linear forwards}.pcc-root[data-paused='true'] .pcc-ring circle,.pcc-root[data-paused='true'] .pcc-clock{animation-play-state:paused}.pcc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@keyframes pcc-in{from{opacity:0;transform:translateY(6px)}}@keyframes pcc-fade{from{opacity:0}}@keyframes pcc-ring{to{stroke-dashoffset:0}}@keyframes pcc-clock{from{opacity:0}to{opacity:0}}@media (prefers-reduced-motion:reduce){.pcc-caption>*{animation-name:pcc-fade}}@media (max-width:560px){.pcc-sub{display:none}.pcc-rail{padding:0 12px 0 16px}}";function gt({items:r,height:l="100svh",autoplay:d=0,loop:n=!0,paper:g="#EDEEE9",rail:P=!0,index:y,defaultIndex:ke=0,onIndexChange:F,className:Ee=""}){const v=r.length,V=p.useRef(null),z=p.useRef(null),[we,_e]=p.useState(()=>I(ke,v,n)),f=I(y===void 0?we:y,v,n),[Te,Y]=p.useState(!1),[N,Re]=p.useState(!1),[ye,Pe]=p.useState(0),[L,Ae]=p.useState(!1),[Se,Ie]=p.useState(!1),[Le,Me]=p.useState(!1),[De,je]=p.useState(!0),[Fe,Z]=p.useState(!1),[$,J]=p.useState(!1),[Ne,Q]=p.useState(0),[Ue,ee]=p.useState(!1),[Xe,U]=p.useState(!1);p.useEffect(()=>{const e=(h,b)=>{const u=window.matchMedia(h);b(u.matches);const x=w=>b(w.matches);return u.addEventListener("change",x),()=>u.removeEventListener("change",x)},t=e("(prefers-reduced-motion: reduce)",Ae),o=e("(hover: hover) and (pointer: fine)",Ie),a=()=>Me(document.hidden);return a(),document.addEventListener("visibilitychange",a),()=>{t(),o(),document.removeEventListener("visibilitychange",a)}},[]),p.useEffect(()=>{const e=V.current;if(!e||typeof IntersectionObserver>"u")return;const t=new IntersectionObserver(([o])=>je(o.isIntersecting),{threshold:.25});return t.observe(e),()=>t.disconnect()},[]);const A=p.useCallback(e=>{const t=I(e,v,n);y===void 0&&_e(t),F==null||F(t)},[y,v,n,F]),M=p.useRef({reduced:L,loop:n,n:v,paper:g});M.current={reduced:L,loop:n,n:v,paper:g};const i=p.useRef({cur:f,turn:null,aspect:1.6,kick:()=>{}}).current,X=(e,t,o,a,h)=>{const b=Ze(t),u=$e(b,i.aspect,T),x=e===1?u.rest:u.gone;return{kind:e,from:o,to:a,dir:b,ends:u,fold:x,v:0,target:x,omega:h?it:K,peek:h,dragging:!1}},H=e=>e.kind===1?e.ends.rest:e.ends.gone,O=e=>e.kind===1?e.ends.gone:e.ends.rest,te=e=>e.kind===1?e.to:e.from,C=(e,t)=>{i.cur=t===e.ends.gone?e.to:e.from,i.turn=null},re=()=>{const e=i.turn;e&&C(e,e.target===e.ends.gone||e.target===e.ends.rest?e.target:H(e))},W=p.useRef(f),Ce=e=>{W.current=e,A(e)};p.useEffect(()=>{if(W.current===f)return;W.current=f;const e=i.turn;if(e&&te(e)===f){e.peek=!1,e.dragging=!1,e.omega=K,e.target=O(e),M.current.reduced&&C(e,e.target),i.kick();return}if(re(),f!==i.cur)if(M.current.reduced)i.cur=f;else{const{n:t,loop:o}=M.current,h=(o?(f-i.cur+t)%t*2<=t:f>i.cur)?X(1,ve,i.cur,f,!1):X(-1,ve,f,i.cur,!1);h.target=O(h),i.turn=h}i.kick()},[f]);const Be=r.map(e=>e.src).join(`
`);p.useEffect(()=>{const e=z.current;if(!e||v===0)return;const t=e.getContext("webgl",{alpha:!1,antialias:!1})??e.getContext("experimental-webgl");if(!t){Y(!0);return}let o=null,a=null;const h=r.map(()=>null),b=r.map(()=>1),u={};let x=0,w=0,_=!1,S=!1;const B=s=>{s.preventDefault(),cancelAnimationFrame(x),x=0},j=()=>Pe(s=>s+1);e.addEventListener("webglcontextlost",B),e.addEventListener("webglcontextrestored",j);const le=s=>h[s]??h.find(k=>k)??null,q=()=>{if(_||!S)return;const s=i.turn,k=s?s.from:i.cur,c=s?s.to:i.cur,R=le(k),G=le(c);!R||!G||(t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,R),t.uniform1i(u.from,0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,G),t.uniform1i(u.to,1),t.uniform2f(u.res,e.width,e.height),t.uniform1f(u.fromAspect,b[k]??1),t.uniform1f(u.toAspect,b[c]??1),t.uniform3fv(u.paper,ft(M.current.paper)),t.uniform1f(u.turning,s?1:0),s&&(t.uniform2f(u.dir,s.dir[0],s.dir[1]),t.uniform1f(u.fold,s.fold),t.uniform1f(u.r,T),t.uniform1f(u.shade,tt(s.fold,s.ends.lo,T))),t.drawArrays(t.TRIANGLE_STRIP,0,4))},de=s=>s.target===s.ends.gone||s.target===s.ends.rest,ue=s=>!!s&&!s.dragging&&(de(s)||Math.abs(s.fold-s.target)>.0015||Math.abs(s.v)>.02),fe=s=>{x=0;const k=Math.min((s-w)/1e3,1/20);w=s;const c=i.turn;if(c&&!c.dragging){const R=de(c),G=R?c.target===c.ends.gone?c.target-rt:c.target+ot:c.target,[ge,Ve]=nt(c.fold,c.v,G,c.omega,k);c.fold=Math.min(Math.max(ge,c.ends.gone),c.ends.rest),c.v=c.fold===ge?Ve:0,R&&c.fold===c.target?C(c,c.target):!R&&!ue(c)&&(c.fold=c.target,c.v=0)}q(),ue(i.turn)&&(x=requestAnimationFrame(fe))};i.kick=()=>{x||_||(w=performance.now(),x=requestAnimationFrame(fe))};const pe=()=>{const s=Math.min(window.devicePixelRatio||1,2),k=Math.round(e.clientWidth*s),c=Math.round(e.clientHeight*s);k===0||c===0||(i.aspect=k/c,(e.width!==k||e.height!==c)&&(e.width=k,e.height=c,t.viewport(0,0,k,c)),q())},he=new ResizeObserver(pe);he.observe(e);try{o=dt(t),t.useProgram(o),a=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW);const s=t.getAttribLocation(o,"a_position");t.enableVertexAttribArray(s),t.vertexAttribPointer(s,2,t.FLOAT,!1,0,0);for(const k of["from","to","res","fromAspect","toAspect","dir","fold","r","shade","turning","paper"])u[k]=t.getUniformLocation(o,"u_"+k);t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0)}catch{Y(!0);return}let me=0;return r.forEach((s,k)=>{ut(s.src).then(c=>{if(_)return;const R=t.createTexture();t.bindTexture(t.TEXTURE_2D,R),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),h[k]=R,b[k]=c.naturalWidth/Math.max(c.naturalHeight,1),S?q():(S=!0,Re(!0),pe())},()=>{me+=1,me===r.length&&!_&&Y(!0)})}),()=>{_=!0,cancelAnimationFrame(x),i.kick=()=>{},he.disconnect(),e.removeEventListener("webglcontextlost",B),e.removeEventListener("webglcontextrestored",j);for(const s of h)s&&t.deleteTexture(s);a&&t.deleteBuffer(a),o&&t.deleteProgram(o)}},[Be,ye,v]),p.useEffect(()=>i.kick(),[g,i]);const D=p.useRef(null),oe=e=>v>1&&(n||(e===1?i.cur<v-1:i.cur>0)),ne=(e,t)=>(.5-(e-t.top)/t.height)*.9,ae=e=>e===1?[i.cur,I(i.cur+1,v,n)]:[I(i.cur-1,v,n),i.cur],se=(e,t)=>{let o=i.turn;if(!(o&&!o.peek)){if(e===0||!oe(e)){o&&(o.target=H(o),i.kick());return}if(o&&o.kind!==e&&(i.turn=null,o=null),!o){const[a,h]=ae(e);o=i.turn=X(e,t,a,h,!0)}o.target=e===1?o.ends.rest-at:o.ends.lo-T+st,i.kick()}},Ge=e=>{var b,u;if(e.button!==0||!N)return;U(!0);const t=e.currentTarget.getBoundingClientRect(),o=e.clientX-t.left>t.width/2?1:-1;if(!oe(o))return;let a=i.turn;if(a&&!(a.peek&&a.kind===o)&&(re(),a=null),!a){const[x,w]=ae(o);a=i.turn=X(o,ne(e.clientY,t),x,w,!1),o===-1&&(a.fold=a.ends.lo-T)}a.dragging=!0,a.peek=!1,a.v=0;const h=o===1?Qe(a.ends.rest,a.fold,T):Math.max(a.fold-(a.ends.lo-T),0);(u=(b=e.currentTarget).setPointerCapture)==null||u.call(b,e.pointerId),D.current={id:e.pointerId,x0:e.clientX,y0:e.clientY,lastX:e.clientX,lastY:e.clientY,lastT:e.timeStamp,h:t.height,grab:h,vel:0,moved:!1},J(!0),i.kick()},Ye=e=>{const t=D.current,o=i.turn;if(!t||e.pointerId!==t.id||!o){if(!t&&Se&&!L&&N){const _=e.currentTarget.getBoundingClientRect(),S=(e.clientX-_.left)/_.width,B=Math.min(Math.max(ne(e.clientY,_)*1.8,-.75),.75),j=S>.86?1:S<.14?-1:0;Q(j),se(j,B)}return}const a=o.kind===1?-1:1,h=((e.clientX-t.x0)*o.dir[0]-(e.clientY-t.y0)*o.dir[1])/t.h,b=t.grab+a*h,u=o.kind===1?Je(o.ends.rest,b,T):o.ends.lo-T+Math.max(b,0);o.fold=Math.min(Math.max(u,o.ends.gone),o.ends.rest);const x=Math.max(e.timeStamp-t.lastT,1),w=((e.clientX-t.lastX)*o.dir[0]-(e.clientY-t.lastY)*o.dir[1])*a;t.vel=t.vel*.6+w/x*.4,t.lastX=e.clientX,t.lastY=e.clientY,t.lastT=e.timeStamp,Math.hypot(e.clientX-t.x0,e.clientY-t.y0)>6&&(t.moved=!0),i.kick()},ie=(e,t)=>{const o=D.current;if(!o||e.pointerId!==o.id)return;D.current=null,J(!1);const a=i.turn;if(!a)return;a.dragging=!1,a.omega=K;const{rest:h,gone:b,mid:u}=a.ends;let x=!1;t||(x=o.moved?et(a.kind===1?h-a.fold:a.fold-b,a.kind===1?h-u:u-b,o.vel):!0),a.target=x?O(a):H(a);const w=o.vel*1e3/o.h,_=a.kind===1&&h-a.fold>=Math.PI*T?.5:1;a.v=o.moved?(a.kind===1?-w:w)*_:0,x&&Ce(te(a)),L&&C(a,a.target),i.kick()},He=e=>{(e.key==="ArrowRight"||e.key==="ArrowLeft")&&U(!0),e.key==="ArrowRight"?(e.preventDefault(),A(f+1)):e.key==="ArrowLeft"&&(e.preventDefault(),A(f-1))},ce=d>0&&!L&&v>1&&N&&!Xe&&(n||f<v-1),Oe=Ne!==0||Ue||Fe||$||Le||!De,E=r[f],We=!n&&f===0,qe=!n&&f===v-1,Ke=E?(E.title??E.alt??"Slide")+", "+(f+1)+" of "+v:"";return m.jsxs("section",{ref:V,className:"pcc-root "+Ee,style:{height:l},role:"region","aria-roledescription":"carousel","aria-label":"Carousel","data-paused":Oe,onFocus:()=>Z(!0),onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||Z(!1)},children:[m.jsx("style",{children:pt}),m.jsx("div",{className:"pcc-stage",style:{background:g},tabIndex:0,"aria-label":"Slides. Drag a sheet or use the arrow keys to turn it.","data-holding":$,onKeyDown:He,onPointerDown:Ge,onPointerMove:Ye,onPointerUp:e=>ie(e,!1),onPointerCancel:e=>ie(e,!0),onPointerLeave:()=>{Q(0),D.current||se(0,0)},children:Te?E?m.jsx("img",{className:"pcc-fallback",src:E.src,alt:E.alt??"",draggable:!1}):null:m.jsx("canvas",{ref:z,className:"pcc-canvas",style:{opacity:N?1:0},"aria-hidden":"true"})}),P&&v>0?m.jsxs("div",{className:"pcc-rail",onPointerEnter:()=>ee(!0),onPointerLeave:()=>ee(!1),children:[m.jsxs("div",{className:"pcc-caption",children:[m.jsxs("span",{className:"pcc-count",children:[m.jsx("b",{children:be(f+1)})," / ",be(v)]}),E!=null&&E.title?m.jsx("span",{className:"pcc-title",children:E.title}):null,E!=null&&E.caption?m.jsx("span",{className:"pcc-sub",children:E.caption}):null]},f),m.jsxs("div",{className:"pcc-controls",children:[m.jsx("button",{type:"button",className:"pcc-btn",onClick:()=>{U(!0),A(f-1)},disabled:We||v<2,"aria-label":"Previous slide",children:m.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:m.jsx("polyline",{points:"15 18 9 12 15 6"})})}),m.jsxs("button",{type:"button",className:"pcc-btn",onClick:()=>{U(!0),A(f+1)},disabled:qe||v<2,"aria-label":"Next slide",children:[ce?m.jsx("svg",{className:"pcc-ring",viewBox:"0 0 40 40","aria-hidden":"true",children:m.jsx("circle",{cx:"20",cy:"20",r:"19.25",style:{animationDuration:d+"ms"}})},"ring-"+f):null,m.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:m.jsx("polyline",{points:"9 18 15 12 9 6"})})]})]})]}):null,ce?m.jsx("span",{className:"pcc-clock",style:{animationDuration:d+"ms"},onAnimationEnd:()=>A(f+1),"aria-hidden":"true"},"clock-"+f):null,m.jsx("p",{className:"pcc-sr","aria-live":"polite",children:Ke})]})}export{gt as P};
