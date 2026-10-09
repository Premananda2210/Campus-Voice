import{r as m,j as E}from"./index-CdiR0C0d.js";const me={scale:.5,centerX:.5,centerY:.5,lobes:3,lobeDepth:.24,wobble:.35,twist:.55,warp:.035,morph:.18,spin:.012,rings:11,lineWidth:1.6,glow:7,glowGain:.42,flow:.22,falloff:1.6,hollow:.08,hueAngle:3.4,hueDrift:.02,heat:.4,coreGlow:.55,exposure:1.35,pull:.18,lens:.07,lensRadius:.16,lensGlow:.9,energy:1,pulseSpeed:.9,pulseGain:1,speed:1,vignette:.55,grain:.03,backgroundColor:"#000000",coreColor:"#1b0b7a",leftColor:"#7a3cff",midColor:"#ff3fc4",rightColor:"#ff2448",hotColor:"#ffd6f6"},Te={ultraviolet:{},"solar-flare":{coreColor:"#4a0d00",leftColor:"#ff2a00",midColor:"#ff8a1f",rightColor:"#ffd23f",hotColor:"#fff3cf",backgroundColor:"#050100",lobes:5,lobeDepth:.12,wobble:.5,twist:1.1,rings:14,flow:.35,hueAngle:1.2},abyss:{coreColor:"#00264d",leftColor:"#00c2ff",midColor:"#2bffd5",rightColor:"#3a6bff",hotColor:"#e0fffb",backgroundColor:"#00040a",lobes:4,lobeDepth:.16,twist:-.6,warp:.09,rings:12,flow:.15,spin:-.01},aurora:{coreColor:"#06331f",leftColor:"#3cff8f",midColor:"#38e1ff",rightColor:"#b06bff",hotColor:"#efffee",backgroundColor:"#010604",lobes:2,lobeDepth:.26,wobble:.6,twist:1.4,warp:.1,rings:16,lineWidth:1.2,flow:.18},ghost:{coreColor:"#202024",leftColor:"#d9d9e3",midColor:"#ffffff",rightColor:"#9a9aa8",hotColor:"#ffffff",backgroundColor:"#000000",glowGain:.35,heat:.1,rings:18,lineWidth:1,lobeDepth:.14,hueDrift:0}},z=6,pe=[["lobes","f"],["lobeDepth","f"],["wobble","f"],["twist","f"],["warp","f"],["rings","f"],["lineWidth","f"],["glow","f"],["glowGain","f"],["falloff","f"],["hollow","f"],["heat","f"],["coreGlow","f"],["exposure","f"],["lens","f"],["lensRadius","f"],["lensGlow","f"],["pulseGain","f"],["vignette","f"],["grain","f"],["backgroundColor","c"],["coreColor","c"],["leftColor","c"],["midColor","c"],["rightColor","c"],["hotColor","c"]],ge=a=>"u"+a[0].toUpperCase()+a.slice(1),Fe=a=>a.map(([i,f])=>"uniform "+(f==="c"?"vec3":"float")+" "+ge(i)+";").join(`
`),De=`#version 300 es
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Ge=`#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uDpr;
uniform float uTime;
uniform float uMorphT;
uniform float uFlowPhase;
uniform float uSpinA;
uniform float uHueA;
uniform vec2 uCenter;
uniform float uRadius;
uniform vec2 uPointer;
uniform float uPointerOn;
uniform vec4 uPulse[${z}];
${Fe(pe)}
out vec4 frag;

float hash12(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash12(i), b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0)), d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float s = 0.0, a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++){ s += a * vnoise(p); p = r * p * 2.03 + 11.7; a *= 0.5; }
  return s;
}

// The normalised radius: 0 at the core, 1 on the outer edge of the shape.
float field(vec2 px, out vec2 dir){
  vec2 p = (px - uCenter) / uRadius;
  float m = uMorphT;
  vec2 w = vec2(fbm(p * 1.1 + vec2(m * 0.7, -m * 0.4)), fbm(p * 1.1 + vec2(-m * 0.5, m * 0.6) + 7.3)) - 0.5;
  vec2 q = p + w * uWarp * 4.0;
  float r = length(q);
  float a = atan(q.y, q.x) + uSpinA - uTwist * r;
  float L = max(uLobes, 1.0);
  float shape =
      uLobeDepth * sin(L * a + 0.6 * sin(m * 0.9))
    + uLobeDepth * uWobble * sin((L - 1.0) * a - m * 1.3 + 1.7)
    + uLobeDepth * uWobble * 0.45 * sin((L + 2.0) * a + m * 0.8 + 4.1);
  // Lobes grow in with radius, so the core stays a soft knot rather than a star.
  shape *= 0.55 + 0.45 * smoothstep(0.0, 0.5, r);
  dir = r > 1e-4 ? q / r : vec2(1.0, 0.0);
  return r / (1.0 + shape);
}

vec3 tone(vec3 c){ return 1.0 - exp(-c * uExposure); }

void main(){
  vec2 px = gl_FragCoord.xy / uDpr;
  vec2 dir;
  float f = field(px, dir);
  float minSide = min(uRes.x, uRes.y) / uDpr;

  // The lens: lines bulge outward around the pointer.
  vec2 dp = (px - uPointer) / max(minSide * uLensRadius, 1.0);
  float bump = exp(-dot(dp, dp)) * uPointerOn;
  f -= uLens * bump;

  // Click pulses: a travelling shock front that kicks the lines and lights them.
  float shock = 0.0;
  for (int i = 0; i < ${z}; i++){
    vec4 pu = uPulse[i];
    if (pu.w <= 0.0) continue;
    float age = uTime - pu.z;
    if (age < 0.0) continue;
    float d = length(px - pu.xy) / uRadius;
    float front = age * pu.w;
    float k = (d - front) / 0.09;
    shock += exp(-k * k) * exp(-age * 1.4) * uPulseGain;
  }
  f += shock * 0.035;

  // Isolines, measured in screen pixels so they stay hairlines at any size.
  float v = f * uRings - uFlowPhase;
  float dv = max(fwidth(v), 1e-4);
  float dist = abs(v - floor(v + 0.5)) / dv / uDpr;
  float core = 1.0 - smoothstep(uLineWidth * 0.5 - 0.5, uLineWidth * 0.5 + 0.6, dist);
  float halo = exp(-dist / max(uGlow, 0.1)) * uGlowGain;

  // Bright inside, fading to nothing at the edge; the very core is left hollow.
  float env = smoothstep(uHollow * 0.4, uHollow * 1.4 + 0.02, f)
            * pow(clamp(1.0 - f, 0.0, 1.0), uFalloff);

  // Colour off the direction from the centre.
  float side = dot(dir, vec2(cos(uHueA), sin(uHueA)));
  vec3 col = side > 0.0 ? mix(uMidColor, uLeftColor, side) : mix(uMidColor, uRightColor, -side);
  col = mix(col, uHotColor, uHeat * exp(-f * 5.0));

  float lit = env * (1.0 + bump * uLensGlow + shock * 1.5);
  vec3 c = uBackgroundColor;
  // Indigo pooled in the core, under the lines.
  c += uCoreColor * uCoreGlow * exp(-f * f * 11.0) * (1.0 + 0.35 * bump);
  c += col * (core * 1.25 + halo) * lit;

  c = tone(c);
  vec2 uv = gl_FragCoord.xy / uRes;
  float vig = 1.0 - uVignette * smoothstep(0.35, 1.05, length((uv - 0.5) * vec2(uRes.x / uRes.y, 1.0)));
  c = mix(uBackgroundColor, c, clamp(vig, 0.0, 1.0));
  c += (hash12(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) * uGrain;
  frag = vec4(max(c, 0.0), 1.0);
}`;function Ie(a){let i=a.trim().replace(/^#/,"");if(i.length===3&&(i=i.split("").map(s=>s+s).join("")),!/^[0-9a-fA-F]{6}$/.test(i))return[0,0,0];const f=parseInt(i,16);return[(f>>16&255)/255,(f>>8&255)/255,(f&255)/255]}function Ne(a){const i=.5+.28*Math.sin(a*.23)+.1*Math.sin(a*.071+1.9),f=.5+.24*Math.cos(a*.19)+.11*Math.cos(a*.057+3.4);return[Math.min(Math.max(i,.08),.92),Math.min(Math.max(f,.08),.92)]}function Oe(a,i){return!Number.isFinite(a)||a<=0||i<=0?0:Math.min(a*1.6*i,4)}function _e(a,i,f){const s=Math.floor(a.length/4),A=(i%s+s)%s;return a.set(f,A*4),(A+1)%s}function He({height:a="100svh",preset:i="ultraviolet",params:f,interactive:s=!0,touch:A="scroll",maxDpr:B=2,className:ve=""}){const $=m.useRef(null),K=m.useRef(null),[we,I]=m.useState(!1),[xe,be]=m.useState(0),[h,Ce]=m.useState(!1);m.useEffect(()=>{const l=window.matchMedia("(prefers-reduced-motion: reduce)"),n=()=>Ce(l.matches);return n(),l.addEventListener("change",n),()=>l.removeEventListener("change",n)},[]);const b=m.useMemo(()=>({...me,...Te[i]??{},...f??{}}),[i,f]),C=m.useRef(b);return C.current=b,m.useEffect(()=>{const l=$.current,n=K.current;if(!l||!n)return;const e=n.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,powerPreference:"high-performance"});if(!e){I(!0);return}const Z=(o,t)=>{const r=e.createShader(o);return r?(e.shaderSource(r,t),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error("isoline-bloom:",e.getShaderInfoLog(r)),e.deleteShader(r),null)):null},S=Z(e.VERTEX_SHADER,De),P=Z(e.FRAGMENT_SHADER,Ge),d=S&&P?e.createProgram():null;if(!d||!S||!P){I(!0);return}if(e.attachShader(d,S),e.attachShader(d,P),e.linkProgram(d),e.deleteShader(S),e.deleteShader(P),!e.getProgramParameter(d,e.LINK_STATUS)){console.error("isoline-bloom:",e.getProgramInfoLog(d)),e.deleteProgram(d),I(!0);return}const c=o=>e.getUniformLocation(d,o),Me=pe.map(([o,t])=>[c(ge(o)),o,t]),u={res:c("uRes"),dpr:c("uDpr"),time:c("uTime"),morphT:c("uMorphT"),flowPhase:c("uFlowPhase"),spinA:c("uSpinA"),hueA:c("uHueA"),center:c("uCenter"),radius:c("uRadius"),pointer:c("uPointer"),pointerOn:c("uPointerOn"),pulse:c("uPulse")},J=e.createVertexArray();let p=1,v=1;const Q=()=>{const o=Math.min(window.devicePixelRatio||1,Math.max(B,.5));p=Math.max(n.clientWidth,1),v=Math.max(n.clientHeight,1);const t=Math.floor(p*o),r=Math.floor(v*o);(n.width!==t||n.height!==r)&&(n.width=t,n.height=r),h&&q()},N=9,ye=performance.now(),O=()=>h?N:(performance.now()-ye)/1e3*C.current.speed;let ee=O(),_=N*me.morph,H=0,W=0,U=0,j=.5,X=.5,k=.5,T=.5,M=0,y=!1,F=-1e9,L={x:.5,y:.5,t:0},w=0;const oe=new Float32Array(z*4);let te=0;const re=o=>{const t=n.getBoundingClientRect();return[Math.min(Math.max((o.clientX-t.left)/Math.max(t.width,1),0),1),Math.min(Math.max(1-(o.clientY-t.top)/Math.max(t.height,1),0),1)]},ne=o=>{if(!s)return;const[t,r]=re(o),g=performance.now()/1e3,R=g-L.t;if(y&&R>0&&R<.25){const Y=Oe(Math.hypot(t-L.x,(r-L.y)*(v/p))/R,C.current.energy);w=Math.max(w,Y)}L={x:t,y:r,t:g},j=t,X=r,y=!0,F=g},D=()=>{y=!1},ae=o=>{if(!s||o.button>0)return;const[t,r]=re(o);j=t,X=r,y=!0,F=performance.now()/1e3,L={x:t,y:r,t:F},te=_e(oe,te,[t*p,r*v,O(),h?0:Math.max(C.current.pulseSpeed,.05)]),h||(w=Math.max(w,1.5*C.current.energy))};l.addEventListener("pointermove",ne),l.addEventListener("pointerdown",ae),l.addEventListener("pointerleave",D),l.addEventListener("pointercancel",D);const ie=o=>{o.preventDefault(),cancelAnimationFrame(x),x=0},le=()=>be(o=>o+1);n.addEventListener("webglcontextlost",ie),n.addEventListener("webglcontextrestored",le);const q=()=>{const o=C.current,t=O(),r=Math.min(Math.max(t-ee,0),.1);ee=t,w*=Math.exp(-r*1.8),_+=r*o.morph*(1+w*.5),H+=r*o.flow*(1+w),W+=r*o.spin*Math.PI*2,U+=r*o.hueDrift,h&&(_=N*o.morph,H=.35,W=0,U=0);const g=!y||performance.now()/1e3-F>5,[R,Y]=Ne(t*.5),Le=g?R:j,Re=g?Y:X,ue=h?1:1-Math.exp(-r*(g?1.2:8));k+=(Le-k)*ue,T+=(Re-T)*ue,M+=((s&&!h?g?.45:1:0)-M)*(h?1:1-Math.exp(-r*3));const Ee=Math.min(p,v),Ae=(o.centerX+(k-o.centerX)*o.pull*M)*p,Se=(o.centerY+(T-o.centerY)*o.pull*M)*v;e.useProgram(d),e.bindVertexArray(J),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,n.width,n.height);for(const[he,Pe,ke]of Me){const de=o[Pe];ke==="c"?e.uniform3fv(he,Ie(de)):e.uniform1f(he,de)}e.uniform2f(u.res,n.width,n.height),e.uniform1f(u.dpr,n.width/p),e.uniform1f(u.time,t),e.uniform1f(u.morphT,_),e.uniform1f(u.flowPhase,H),e.uniform1f(u.spinA,W),e.uniform1f(u.hueA,o.hueAngle+U),e.uniform2f(u.center,Ae,Se),e.uniform1f(u.radius,Math.max(o.scale*Ee,1)),e.uniform2f(u.pointer,k*p,T*v),e.uniform1f(u.pointerOn,M),e.uniform4fv(u.pulse,oe),e.drawArrays(e.TRIANGLES,0,3)};let x=0,V=!0;const se=()=>{x=0,q(),V&&!document.hidden&&(x=requestAnimationFrame(se))},G=()=>{!h&&!x&&V&&!document.hidden&&(x=requestAnimationFrame(se))},ce=new IntersectionObserver(o=>{V=o.some(t=>t.isIntersecting),G()});ce.observe(l),document.addEventListener("visibilitychange",G),Q();const fe=new ResizeObserver(Q);return fe.observe(n),q(),h||G(),()=>{cancelAnimationFrame(x),fe.disconnect(),ce.disconnect(),document.removeEventListener("visibilitychange",G),l.removeEventListener("pointermove",ne),l.removeEventListener("pointerdown",ae),l.removeEventListener("pointerleave",D),l.removeEventListener("pointercancel",D),n.removeEventListener("webglcontextlost",ie),n.removeEventListener("webglcontextrestored",le),e.deleteVertexArray(J),e.deleteProgram(d)}},[s,h,xe,B]),E.jsx("section",{ref:$,className:"relative w-full overflow-hidden "+(s?"cursor-crosshair ":"")+(A==="draw"?"touch-none ":"touch-pan-y ")+ve,style:{height:a,backgroundColor:b.backgroundColor},"aria-label":"Glowing contour lines of a slowly morphing shape",children:we?E.jsx("div",{className:"absolute inset-0",style:{background:"repeating-radial-gradient(circle at 50% 50%, transparent 0 22px, "+b.midColor+"55 23px, transparent 25px),radial-gradient(38% 38% at 50% 50%, "+b.coreColor+" 0%, transparent 70%),"+b.backgroundColor,maskImage:"radial-gradient(closest-side, #000 40%, transparent 100%)"}}):E.jsx("canvas",{ref:K,"aria-hidden":"true",className:"absolute inset-0 block h-full w-full"})})}function je(){return E.jsx("div",{className:"relative w-full",children:E.jsx(He,{})})}export{je as default};
