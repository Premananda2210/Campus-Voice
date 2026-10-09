import{r as u,j as x}from"./index-CdiR0C0d.js";const Se={lightX:.34,lightY:.2,exposure:1,bloom:1,ember:.7,shadow:1,fold:.5,softness:1,flow:1,speed:1,grain:.085,grainSize:1,grainFps:24,jitter:.6,vignette:.5,lens:.6,drag:1,reach:.42,inkColor:"#111112",shadowColor:"#060506",emberColor:"#86705f",violetColor:"#9a4fb0",lavenderColor:"#b6acd6",silverColor:"#d2d1d6"},ye={velvet:{},chrome:{bloom:.15,ember:.2,lavenderColor:"#c4c7cf",violetColor:"#7d8796",emberColor:"#6f6f72",grain:.07},rose:{violetColor:"#c4507e",lavenderColor:"#d8b4c4",emberColor:"#8a5a4a",silverColor:"#ddd3d3",lightX:.42},aqua:{violetColor:"#2f8fa8",lavenderColor:"#a8c6d4",emberColor:"#4f6a64",silverColor:"#cfd8da",inkColor:"#0b0e10",shadowColor:"#040607"},ember:{violetColor:"#c8582a",lavenderColor:"#d6b9a0",emberColor:"#8a4a2a",silverColor:"#dcd4cb",inkColor:"#100c0a",bloom:1.2,ember:1}},k=4,de=[["lightX","f"],["lightY","f"],["exposure","f"],["bloom","f"],["ember","f"],["shadow","f"],["fold","f"],["softness","f"],["flow","f"],["grain","f"],["grainSize","f"],["jitter","f"],["vignette","f"],["lens","f"],["drag","f"],["reach","f"],["inkColor","c"],["shadowColor","c"],["emberColor","c"],["violetColor","c"],["lavenderColor","c"],["silverColor","c"]],ve=n=>"u"+n[0].toUpperCase()+n.slice(1),ke=n=>n.map(([l,c])=>"uniform "+(c==="c"?"vec3":"float")+" "+ve(l)+";").join(`
`),qe=`#version 300 es
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Fe=`#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uDpr;
uniform float uTime;
uniform float uFrame;
uniform vec2 uLamp;
uniform float uLampOn;
uniform vec2 uSmear;
uniform vec4 uRipple[${k}];
${ke(de)}
out vec4 frag;

float hash12(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x),
             mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++){
    v += a * noise(p);
    p = r * p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v;
}
// An axis-aligned gaussian lobe: 1 at c, falling off over s.
float lobe(vec2 q, vec2 c, vec2 s){
  vec2 d = (q - c) / s;
  return exp(-dot(d, d));
}

void main(){
  vec2 px = gl_FragCoord.xy / max(uDpr, 1.0);
  vec2 cssRes = uRes / max(uDpr, 1.0);
  float aspect = uRes.x / uRes.y;
  vec2 asp = vec2(aspect, 1.0);
  float t = uTime;

  // Gate weave: the whole frame shivers a fraction of a pixel per grain frame.
  vec2 weave = (vec2(hash12(vec2(uFrame, 3.1)), hash12(vec2(7.7, uFrame))) - 0.5) * uJitter / cssRes;
  vec2 uv = gl_FragCoord.xy / uRes + weave;
  uv.y = 1.0 - uv.y;

  // ---- the pointer drags the silk ------------------------------------------
  vec2 q = uv;
  vec2 dm = (q - uLamp) * asp;
  float reach = max(uReach, 0.02);
  float fall = exp(-dot(dm, dm) / (reach * reach));
  q += (uLamp - q) * fall * uLens * 0.32 * uLampOn;
  q -= uSmear * fall * uDrag;

  // A click: a refractive ring, gone in a second and a half.
  float ring = 0.0;
  for (int i = 0; i < ${k}; i++){
    vec4 r = uRipple[i];
    if (r.w <= 0.0) continue;
    float age = t - r.z;
    if (age < 0.0 || age > 2.0) continue;
    vec2 rd = (q - r.xy) * asp;
    float dist = length(rd);
    float w = exp(-pow((dist - age * 0.55) / 0.06, 2.0)) * exp(-age * 1.8) * r.w;
    q += (rd / max(dist, 1e-4)) / asp * w * 0.03;
    ring += w;
  }

  // ---- slow silk flow ------------------------------------------------------
  float ts = t * 0.06;
  vec2 warp = vec2(fbm(q * 1.4 + vec2(0.0, ts)), fbm(q * 1.4 + vec2(5.2, 1.3 - ts * 0.8))) - 0.5;
  q += warp * 0.2 * uFlow;
  float sway = sin(q.x * 3.3 + t * 0.21) * 0.025 + sin(q.x * 7.1 - t * 0.13) * 0.01;

  // ---- light ---------------------------------------------------------------
  vec2 lc = vec2(uLightX, uLightY);
  // The fold: where the silk turns away from the light. Low on the left, dips
  // under the light, rides back up into the shadow on the right.
  float edge = uFold - 0.05 + 0.2 * smoothstep(0.02, 0.5, q.x) - 0.1 * smoothstep(0.45, 1.0, q.x) + sway;
  float soft = mix(0.03, 0.12, smoothstep(0.0, 0.8, q.x)) * uSoftness + 0.004;
  float folded = smoothstep(edge + soft, edge - soft, q.y);

  float haze = lobe(q, lc, vec2(0.75, 0.52));
  // The silk underneath the fold catches a little light of its own.
  float under = lobe(q, lc + vec2(0.1, 0.36), vec2(0.24, 0.1)) * 0.34;
  float silver = (min(haze * 1.18, 1.0) * folded + under) * uExposure;

  float violet = lobe(q, vec2(0.7, 0.0), vec2(0.27, 0.24)) * uBloom;
  float lavender = lobe(q, vec2(0.5, 0.02), vec2(0.3, 0.24));
  float ember = lobe(q, vec2(0.66, 0.28), vec2(0.18, 0.09)) * uEmber;

  vec3 col = uInkColor;
  vec3 lightCol = mix(uSilverColor, uLavenderColor, lavender * 0.8);
  col = mix(col, lightCol, clamp(silver, 0.0, 1.0));
  col = mix(col, uVioletColor, clamp(violet, 0.0, 1.0) * 0.72);
  col = mix(col, uEmberColor, clamp(ember, 0.0, 1.0) * 0.75);

  // ---- shadow --------------------------------------------------------------
  // A dark mass curls in from the right along a diagonal that climbs toward
  // the violet; the lamp pushes it back.
  float push = 1.0 - fall * 0.55 * uLampOn;
  vec2 sn = vec2(0.874, 0.486);
  float sd = dot(q - vec2(0.6, 0.37), sn) + sway * 0.8;
  float mass = smoothstep(-0.14, 0.26, sd);
  float shade = clamp(mass * uShadow * push, 0.0, 1.0);
  col = mix(col, uShadowColor, shade * 0.97);
  // Where the silk turns back into the shadow it catches a thin sheen.
  col += uSilverColor * lobe(q, vec2(0.67, 0.53), vec2(0.13, 0.05)) * 0.14 * uExposure;

  // The bottom of the frame is unlit film.
  col = mix(col, uInkColor, smoothstep(0.62, 0.92, uv.y) * 0.8);

  // ---- lamp, ring, vignette ------------------------------------------------
  col += uSilverColor * (fall * 0.08 * uLampOn + ring * 0.07);
  vec2 v = (uv - vec2(0.36, 0.3)) * vec2(1.0, 1.1);
  col = mix(col, uInkColor * 0.85, uVignette * smoothstep(0.45, 1.1, length(v)));

  // ---- film grain: re-rolled at its own rate, not the display's --------------
  vec2 gp = floor(px / max(uGrainSize, 0.5));
  float g = hash12(gp + uFrame * vec2(17.13, 31.71)) - 0.5;
  float g2 = hash12(floor(gp * 0.5) + uFrame * vec2(5.3, 9.7)) - 0.5;
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col += (g * 0.8 + g2 * 0.35) * uGrain * (0.55 + 0.9 * sqrt(lum));

  frag = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;function Ae(n){let l=n.trim().replace(/^#/,"");if(l.length===3&&(l=l.split("").map(d=>d+d).join("")),!/^[0-9a-fA-F]{6}$/.test(l))return[0,0,0];const c=parseInt(l,16);return[(c>>16&255)/255,(c>>8&255)/255,(c&255)/255]}function Te(n,l){return!(l>0)||!Number.isFinite(n)?0:Math.floor(n*Math.min(l,120))%4096}function Pe(n){const l=.42+.22*Math.sin(n*.19)+.08*Math.sin(n*.071+1.3),c=.38+.16*Math.cos(n*.15)+.06*Math.cos(n*.047+4.2);return[Math.min(Math.max(l,.08),.92),Math.min(Math.max(c,.08),.92)]}function Ie({height:n="100svh",preset:l="velvet",params:c,interactive:d=!0,maxDpr:V=2,children:U,className:he=""}){const Y=u.useRef(null),G=u.useRef(null),[pe,q]=u.useState(!1),[ge,xe]=u.useState(0),[i,we]=u.useState(!1);u.useEffect(()=>{const s=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>we(s.matches);return o(),s.addEventListener("change",o),()=>s.removeEventListener("change",o)},[]);const v=u.useMemo(()=>({...Se,...ye[l]??{},...c??{}}),[l,c]),F=u.useRef(v);return F.current=v,u.useEffect(()=>{const s=Y.current,o=G.current;if(!s||!o)return;const e=o.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,powerPreference:"high-performance"});if(!e){q(!0);return}const H=(t,r)=>{const a=e.createShader(t);return a?(e.shaderSource(a,r),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS)?a:(console.error("velvet-haze:",e.getShaderInfoLog(a)),e.deleteShader(a),null)):null},C=H(e.VERTEX_SHADER,qe),E=H(e.FRAGMENT_SHADER,Fe),f=C&&E?e.createProgram():null;if(!f||!C||!E){q(!0);return}if(e.attachShader(f,C),e.attachShader(f,E),e.linkProgram(f),e.deleteShader(C),e.deleteShader(E),!e.getProgramParameter(f,e.LINK_STATUS)){console.error("velvet-haze:",e.getProgramInfoLog(f)),e.deleteProgram(f),q(!0);return}const m=t=>e.getUniformLocation(f,t),be=de.map(([t,r])=>[m(ve(t)),t,r]),h={res:m("uRes"),dpr:m("uDpr"),time:m("uTime"),frame:m("uFrame"),lamp:m("uLamp"),lampOn:m("uLampOn"),smear:m("uSmear"),ripple:m("uRipple")},$=e.createVertexArray();let A=1,B=1;const W=()=>{const t=Math.min(window.devicePixelRatio||1,Math.max(V,.5));A=Math.max(o.clientWidth,1),B=Math.max(o.clientHeight,1);const r=Math.floor(A*t),a=Math.floor(B*t);(o.width!==r||o.height!==a)&&(o.width=r,o.height=a),i&&D()},Z=9,J=performance.now(),K=()=>i?Z:(performance.now()-J)/1e3*F.current.speed,Ce=()=>i?Z:(performance.now()-J)/1e3;let Q=0,T=.5,P=.4,w=.5,b=.4,I=0,z=0,N=0,L=!1,O=-1e9;const ee=new Float32Array(k*4);let j=0;const te=t=>{const r=o.getBoundingClientRect();return[Math.min(Math.max((t.clientX-r.left)/Math.max(r.width,1),0),1),Math.min(Math.max((t.clientY-r.top)/Math.max(r.height,1),0),1)]},oe=t=>{d&&([T,P]=te(t),L=!0,O=performance.now()/1e3)},M=()=>{L=!1},re=t=>{var g;if(!d||t.button>0||(g=t.target)!=null&&g.closest("a,button,input,textarea,select,label,[role=button]"))return;const[r,a]=te(t);T=r,P=a,L=!0,O=performance.now()/1e3,!i&&(ee.set([r,a,K(),1],j*4),j=(j+1)%k)};s.addEventListener("pointermove",oe),s.addEventListener("pointerdown",re),s.addEventListener("pointerleave",M),s.addEventListener("pointercancel",M);const ae=t=>{t.preventDefault(),cancelAnimationFrame(p),p=0},ne=()=>xe(t=>t+1);o.addEventListener("webglcontextlost",ae),o.addEventListener("webglcontextrestored",ne);const D=()=>{const t=F.current,r=K(),a=Math.min(Math.max(r-Q,0),.1);Q=r;const g=!L||performance.now()/1e3-O>5,[Ee,Le]=Pe(r),Me=g?Ee:T,Re=g?Le:P,ce=i?1:1-Math.exp(-a*(g?1.2:6)),fe=w+(Me-w)*ce,me=b+(Re-b)*ce;if(!i&&a>0){const S=Math.max(Math.min((fe-w)/a,3),-3),X=Math.max(Math.min((me-b)/a,3),-3),y=1-Math.exp(-a*5);I+=(S*.06-I)*y,z+=(X*.06-z)*y}w=fe,b=me,N+=((d&&!i?g?.5:1:0)-N)*(i?1:1-Math.exp(-a*3)),e.useProgram(f),e.bindVertexArray($),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,o.width,o.height);for(const[S,X,y]of be){const ue=t[X];y==="c"?e.uniform3fv(S,Ae(ue)):e.uniform1f(S,ue)}e.uniform2f(h.res,o.width,o.height),e.uniform1f(h.dpr,o.width/A),e.uniform1f(h.time,r),e.uniform1f(h.frame,Te(Ce(),t.grainFps)),e.uniform2f(h.lamp,w,b),e.uniform1f(h.lampOn,N),e.uniform2f(h.smear,I,z),e.uniform4fv(h.ripple,ee),e.drawArrays(e.TRIANGLES,0,3)};let p=0,_=!0;const le=()=>{p=0,D(),_&&!document.hidden&&(p=requestAnimationFrame(le))},R=()=>{!i&&!p&&_&&!document.hidden&&(p=requestAnimationFrame(le))},se=new IntersectionObserver(t=>{_=t.some(r=>r.isIntersecting),R()});se.observe(s),document.addEventListener("visibilitychange",R),W();const ie=new ResizeObserver(W);return ie.observe(o),D(),i||R(),()=>{cancelAnimationFrame(p),ie.disconnect(),se.disconnect(),document.removeEventListener("visibilitychange",R),s.removeEventListener("pointermove",oe),s.removeEventListener("pointerdown",re),s.removeEventListener("pointerleave",M),s.removeEventListener("pointercancel",M),o.removeEventListener("webglcontextlost",ae),o.removeEventListener("webglcontextrestored",ne),e.deleteVertexArray($),e.deleteProgram(f)}},[d,i,ge,V]),x.jsxs("section",{ref:Y,className:"relative w-full overflow-hidden "+(d?"cursor-crosshair touch-pan-y ":"")+he,style:{height:n,background:v.inkColor},"aria-label":"A soft silver and violet light leak on grainy black film",children:[pe?x.jsx("div",{className:"absolute inset-0",style:{background:"radial-gradient(40% 30% at 74% 0%, "+v.violetColor+" 0%, transparent 70%),linear-gradient(160deg, transparent 52%, "+v.shadowColor+" 70%),radial-gradient(60% 50% at 34% 26%, "+v.silverColor+" 0%, "+v.lavenderColor+" 30%, transparent 72%),"+v.inkColor}}):x.jsx("canvas",{ref:G,"aria-hidden":"true",className:"absolute inset-0 block h-full w-full"}),U?x.jsx("div",{className:"pointer-events-none relative z-10 flex h-full w-full flex-col",children:U}):null]})}function Oe(){return x.jsx("div",{className:"relative w-full",children:x.jsx(Ie,{})})}export{Oe as default};
