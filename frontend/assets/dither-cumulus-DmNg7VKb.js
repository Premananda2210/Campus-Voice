import{r as f,j as Y}from"./index-CdiR0C0d.js";const Pe={pixel:3,dither:4,contrast:1.05,coverage:.4,scale:1,billow:1,layers:3,edge:.025,morph:.012,wind:.018,windAngle:.5,sunElevation:.62,relief:1.2,shadow:1,ambient:.25,rim:.55,shadeTone:.42,orb:.045,glow:.35,skyLow:.06,skyHigh:.4,haze:.55,parallax:1,gust:1,friction:2.4,speed:1,seed:7,nightColor:"#0a1626",deepColor:"#15314a",duskColor:"#2d5872",mistColor:"#7c99a7",shadeColor:"#d2d6ca",cloudColor:"#fbfaef"},Ue={nocturne:{},daybreak:{nightColor:"#1c3768",deepColor:"#3a68a8",duskColor:"#77a8da",mistColor:"#e8a993",shadeColor:"#fbd9bd",cloudColor:"#fffaf0",coverage:.34,skyLow:.1,skyHigh:.38,shadeTone:.55,sunElevation:.45,rim:.8,glow:.5,seed:8},ember:{nightColor:"#1a0a10",deepColor:"#4a1325",duskColor:"#9a2e2c",mistColor:"#de6c38",shadeColor:"#f5bf76",cloudColor:"#fff0d4",skyHigh:.36,sunElevation:.32,rim:.9,coverage:.3,windAngle:.1,seed:21},lilac:{nightColor:"#181230",deepColor:"#372964",duskColor:"#6a56a6",mistColor:"#b199d6",shadeColor:"#e9d8f1",cloudColor:"#fff8fd",dither:8,skyHigh:.46,morph:.02,seed:41},storm:{nightColor:"#0a0c0f",deepColor:"#1b2026",duskColor:"#343c45",mistColor:"#5b6670",shadeColor:"#959ea4",cloudColor:"#d5d9da",coverage:.78,ambient:.18,shadow:1.6,shadeTone:.28,orb:0,glow:.15,wind:.05,windAngle:-.25,morph:.03,seed:13},gameboy:{nightColor:"#0f380f",deepColor:"#0f380f",duskColor:"#306230",mistColor:"#306230",shadeColor:"#8bac0f",cloudColor:"#9bbc0f",pixel:4,dither:2,contrast:1.15,seed:29}},_=4,Ie=9e5,Me=[["dither","i"],["contrast","f"],["coverage","f"],["scale","f"],["billow","f"],["layers","i"],["edge","f"],["morph","f"],["sunElevation","f"],["relief","f"],["shadow","f"],["ambient","f"],["rim","f"],["shadeTone","f"],["orb","f"],["glow","f"],["skyLow","f"],["skyHigh","f"],["haze","f"],["parallax","f"],["gust","f"],["seed","f"],["nightColor","c"],["deepColor","c"],["duskColor","c"],["mistColor","c"],["shadeColor","c"],["cloudColor","c"]],Se=n=>"u"+n[0].toUpperCase()+n.slice(1),Ne=n=>n==="c"?"vec3":n==="i"?"int":"float",Ye=n=>n.map(([s,i])=>"uniform "+Ne(i)+" "+Se(s)+";").join(`
`),_e=`#version 300 es
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,He=`#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uSun;
uniform vec2 uLook;
uniform vec2 uTravel;
uniform vec4 uGusts[${_}];
${Ye(Me)}
out vec4 frag;

float hash12(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec2 hash22(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash12(i), b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0)), d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float s = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) { s += a * vnoise(p); p = r * p * 2.02 + 11.3; a *= 0.5; }
  return s / 0.9375;
}

// The tallest of the hemispheres seeded in the 3x3 cells around p. Centres sit
// in [0.15, 0.85] of their cell and radii stay under 1.1, so nothing outside
// the 3x3 can reach p. Height is in the same units as p: a real dome.
float domes(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float m = 0.0;
  for (int y = -1; y <= 1; y++)
  for (int x = -1; x <= 1; x++) {
    vec2 o = vec2(float(x), float(y));
    vec2 g = i + o;
    vec2 c = o + 0.15 + 0.7 * hash22(g) - f;
    float r = 0.6 + 0.45 * hash12(g + 3.7);
    float q = dot(c, c) / (r * r);
    m = max(m, r * sqrt(max(1.0 - q, 0.0)));
  }
  return m;
}

// Deck k at p: x = height (negative is clear sky), y = the billows alone.
// The mass decides where cloud is; only the domes shape the surface, so a
// rising mass never reads as one long slope shadowing itself.
vec2 cloud(vec2 p, float k){
  vec2 o = vec2(k * 11.7 + uSeed * 1.37, k * 5.3 - uSeed * 0.71);
  float m = fbm(p * 0.4 + o * 0.61 + vec2(uTime * uMorph, -uTime * uMorph * 0.6));
  float cov = (m - 0.5) * 3.2 + (uCoverage - 0.5) * 1.6 - (1.0 - k / 2.0) * 0.18;
  if (cov < -0.75) return vec2(-1.0, 0.0);
  float b = domes(p + o) * 0.75
          + domes(p * 2.13 + o * 1.3 + 4.1) * 0.22 * uBillow
          + domes(p * 4.37 + o * 1.7 + 9.2) * 0.08 * uBillow;
  return vec2(cov * 0.45 + b - 0.8, b);
}

vec3 pal(int i){
  if (i <= 0) return uNightColor;
  if (i == 1) return uDeepColor;
  if (i == 2) return uDuskColor;
  if (i == 3) return uMistColor;
  if (i == 4) return uShadeColor;
  return uCloudColor;
}

float bayer2(vec2 a){ a = floor(a); return fract(a.x * 0.5 + a.y * a.y * 0.75); }
float bayer4(vec2 a){ return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a){ return bayer4(0.5 * a) * 0.25 + bayer2(a); }
float threshold(vec2 c){
  if (uDither >= 8) return bayer8(c) + 0.5 / 64.0;
  if (uDither >= 4) return bayer4(c) + 0.5 / 16.0;
  if (uDither >= 2) return bayer2(c) + 0.125;
  return 0.5;
}

void main(){
  vec2 cell = floor(gl_FragCoord.xy);
  float minSide = min(uRes.x, uRes.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / minSide;
  vec2 sun = (uSun * uRes - 0.5 * uRes) / minSide;

  // ---- sky: darkest far from the light, a dithered halo around it -----------
  vec2 toSun = sun - uv;
  float sunDist = length(toSun);
  float tone = mix(uSkyLow, uSkyHigh, exp(-sunDist * 1.1));
  tone += uGlow * 0.5 * exp(-sunDist * sunDist / max(uOrb * uOrb * 30.0, 0.004));
  if (uOrb > 0.0) {
    float disc = 1.0 - smoothstep(uOrb - 0.004, uOrb + 0.004, sunDist);
    tone = mix(tone, 1.02, disc);
  }

  float sky = tone;

  // ---- gusts: a ring that shoves the decks outward and puffs them up --------
  vec2 shove = vec2(0.0);
  float puff = 0.0;
  for (int i = 0; i < ${_}; i++) {
    vec4 g = uGusts[i];
    float age = uTime - g.z;
    if (g.w <= 0.0 || age < 0.0 || age > 2.6) continue;
    vec2 at = (g.xy * uRes - 0.5 * uRes) / minSide;
    vec2 dv = uv - at;
    float dist = length(dv);
    float front = age * 0.55;
    float w = 0.06 + age * 0.1;
    float k = exp(-pow((dist - front) / w, 2.0)) * (1.0 - age / 2.6) * g.w * uGust;
    shove += dv / max(dist, 1e-3) * k * 0.09;
    puff += k * 0.1;
  }

  // ---- the decks, far to near ---------------------------------------------
  float elev = clamp(uSunElevation, 0.05, 1.5);
  float slope = tan(elev);
  int decks = clamp(uLayers, 1, 3);
  for (int L = 0; L < 3; L++) {
    if (L < 3 - decks) continue;
    float depth = (float(L) + 1.0) / 3.0;               // 1 = nearest
    float sc = uScale * 1.5 * mix(2.0, 1.0, depth);     // far decks are smaller
    vec2 q = uv - uTravel * mix(0.3, 1.0, depth) - uLook * uParallax * 0.035 * depth - shove * depth;
    vec2 p = q * sc;
    float k = float(L);
    vec2 here = cloud(p, k);
    float h = here.x + puff * depth;
    if (h < -uEdge) continue;
    float alpha = smoothstep(-uEdge, uEdge, h);

    // surface normal from the billows
    float eps = 0.02;
    float b = here.y;
    vec2 grad = vec2(cloud(p + vec2(eps, 0.0), k).y - b, cloud(p + vec2(0.0, eps), k).y - b) / eps;
    vec3 n = normalize(vec3(-grad * uRelief, 1.0));

    // the light sits over the moon; nearby billows are lit from the side
    vec2 dir = normalize(sun - q + vec2(1e-4));
    vec3 Lv = normalize(vec3(dir * cos(elev), sin(elev)));
    float dif = max(dot(n, Lv), 0.0);

    // billows shadow billows: walk toward the light, see what stands taller
    float occ = 0.0;
    for (int s = 1; s <= 4; s++) {
      float d = float(s) * 0.09;
      vec2 there = cloud(p + dir * d, k);
      if (there.x > 0.0) occ += max(there.y - (b + d * slope), 0.0);
    }
    float lit = dif * exp(-occ * uShadow * 4.0);

    // silver lining on thin edges that face the light
    float thin = 1.0 - smoothstep(0.0, 0.22, h);
    float facing = max(dot(-normalize(grad + vec2(1e-5)), dir), 0.0);
    float rim = thin * facing * uRim;

    float light = clamp(uAmbient + (1.0 - uAmbient) * lit + rim, 0.0, 1.2);
    float c = mix(uShadeTone, 1.0, light);
    c = mix(c, sky + 0.2, (1.0 - depth) * uHaze);     // aerial perspective
    tone = mix(tone, c, alpha);
  }

  // ---- print: one tone, dithered between two palette steps ------------------
  tone = clamp((tone - 0.5) * uContrast + 0.5, 0.0, 1.0);
  float x = tone * 5.0;
  float lo = floor(x);
  int idx = int(lo) + ((x - lo) > threshold(cell) ? 1 : 0);
  frag = vec4(pal(clamp(idx, 0, 5)), 1.0);
}`;function Ge(n){let s=n.trim().replace(/^#/,"");if(s.length===3&&(s=s.split("").map(u=>u+u).join("")),!/^[0-9a-fA-F]{6}$/.test(s))return[0,0,0];const i=parseInt(s,16);return[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]}function qe(n,s,i,u){const S=Math.max(n,1),k=Math.max(s,1);let g=Math.max(Number.isFinite(i)?i:1,1);const M=S/g*(k/g);return M>u&&(g*=Math.sqrt(M/u)),[Math.max(Math.round(S/g),1),Math.max(Math.round(k/g),1),g]}function Oe(n){const s=.5+.34*Math.sin(n*.13+2.4)+.08*Math.sin(n*.051),i=.8+.1*Math.cos(n*.11)+.04*Math.cos(n*.037+1.1);return[Math.min(Math.max(s,.06),.94),Math.min(Math.max(i,.55),.95)]}function ke(n,s,i){const u=n*Math.exp(-Math.max(s,0)*Math.max(i,0));return Math.abs(u)<1e-4?0:u}function je(n,s,i){return Math.hypot(n,s)<6&&i<450}function Be({height:n="100svh",preset:s="nocturne",params:i,interactive:u=!0,touch:S="scroll",children:k,className:g=""}){const M=f.useRef(null),Q=f.useRef(null),[Le,H]=f.useState(!1),[Ee,Re]=f.useState(0),[h,Te]=f.useState(!1),[Ae,ee]=f.useState(!1);f.useEffect(()=>{const l=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>Te(l.matches);return a(),l.addEventListener("change",a),()=>l.removeEventListener("change",a)},[]);const d=f.useMemo(()=>({...Pe,...Ue[s]??{},...i??{}}),[s,i]),L=f.useRef(d);L.current=d;const G=f.useRef(()=>{});return f.useEffect(()=>G.current(),[d]),f.useEffect(()=>{const l=M.current,a=Q.current;if(!l||!a)return;const t=a.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,powerPreference:"high-performance"});if(!t){H(!0);return}const te=(e,o)=>{const r=t.createShader(e);return r?(t.shaderSource(r,o),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("dither-cumulus:",t.getShaderInfoLog(r)),t.deleteShader(r),null)):null},E=te(t.VERTEX_SHADER,_e),R=te(t.FRAGMENT_SHADER,He),m=E&&R?t.createProgram():null;if(!m||!E||!R){H(!0);return}if(t.attachShader(m,E),t.attachShader(m,R),t.linkProgram(m),t.deleteShader(E),t.deleteShader(R),!t.getProgramParameter(m,t.LINK_STATUS)){console.error("dither-cumulus:",t.getProgramInfoLog(m)),t.deleteProgram(m),H(!0);return}const b=e=>t.getUniformLocation(m,e),De=Me.map(([e,o])=>[b(Se(e)),e,o]),y={res:b("uRes"),time:b("uTime"),sun:b("uSun"),look:b("uLook"),travel:b("uTravel"),gusts:b("uGusts")},oe=t.createVertexArray();let q=1,O=1;const re=()=>{q=Math.max(a.clientWidth,1),O=Math.max(a.clientHeight,1);const[e,o]=qe(q,O,L.current.pixel,Ie);(a.width!==e||a.height!==o)&&(a.width=e,a.height=o)},ne=()=>{re(),h&&C()},Fe=40,Xe=performance.now(),T=()=>h?Fe:(performance.now()-Xe)/1e3*L.current.speed;let j=T(),A=.22,D=.82,ae=A,se=D,V=0,B=0,$=!1,ie=-1e9,F=0,X=0,p=0,v=0;const le=new Float32Array(_*4);let W=0,c=null;const ce=e=>{const o=a.getBoundingClientRect();return[Math.min(Math.max((e.clientX-o.left)/Math.max(o.width,1),0),1),Math.min(Math.max(1-(e.clientY-o.top)/Math.max(o.height,1),0),1)]},ue=()=>{$=!0,ie=performance.now()/1e3},fe=e=>{if(u){if(ue(),c&&e.pointerId===c.id){const o=Math.min(q,O),r=(e.clientX-c.lastX)/o,x=-(e.clientY-c.lastY)/o,U=performance.now(),I=Math.max((U-c.last)/1e3,1/240);F+=r,X+=x,p=p*.6+r/I*.4,v=v*.6+x/I*.4,c.lastX=e.clientX,c.lastY=e.clientY,c.last=U}else[ae,se]=ce(e);h&&C()}},de=()=>{$=!1},he=e=>{var r;if(!u||e.button>0||(r=e.target)!=null&&r.closest("a,button,input,textarea,select,label,[role=button]"))return;ue();const o=performance.now();c={id:e.pointerId,x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,at:o,last:o},p=0,v=0;try{l.setPointerCapture(e.pointerId)}catch{}ee(!0)},z=e=>{if(!c||e.pointerId!==c.id)return;const o=je(e.clientX-c.x,e.clientY-c.y,performance.now()-c.at);if(performance.now()-c.last>80&&(p=0,v=0),c=null,ee(!1),o&&!h){const[r,x]=ce(e);le.set([r,x,T(),1],W*4),W=(W+1)%_,p=0,v=0}h&&(p=0,v=0,C())};l.addEventListener("pointermove",fe),l.addEventListener("pointerdown",he),l.addEventListener("pointerup",z),l.addEventListener("pointercancel",z),l.addEventListener("pointerleave",de);const me=e=>{e.preventDefault(),cancelAnimationFrame(w),w=0},pe=()=>Re(e=>e+1);a.addEventListener("webglcontextlost",me),a.addEventListener("webglcontextrestored",pe);const C=()=>{const e=L.current;re();const o=T(),r=Math.min(Math.max(o-j,0),.1);j=o,h||(F+=Math.cos(e.windAngle)*e.wind*r,X+=Math.sin(e.windAngle)*e.wind*r,c||(F+=p*r,X+=v*r,p=ke(p,r,e.friction),v=ke(v,r,e.friction)));const x=!u||!$||performance.now()/1e3-ie>6,[U,I]=Oe(o),be=x?U:ae,we=x?I:se,N=h?1:1-Math.exp(-r*(x?.8:6));A+=(be-A)*N,D+=(we-D)*N;const ye=u?1:0;V+=((be-.5)*2*ye-V)*N,B+=((we-.5)*2*ye-B)*N,t.useProgram(m),t.bindVertexArray(oe),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,a.width,a.height);for(const[Z,ze,Ce]of De){const J=e[ze];Ce==="c"?t.uniform3fv(Z,Ge(J)):Ce==="i"?t.uniform1i(Z,Number(J)|0):t.uniform1f(Z,J)}t.uniform2f(y.res,a.width,a.height),t.uniform1f(y.time,o),t.uniform2f(y.sun,A,D),t.uniform2f(y.look,V,B),t.uniform2f(y.travel,F,X),t.uniform4fv(y.gusts,le),t.drawArrays(t.TRIANGLES,0,3)};G.current=()=>{h&&C()};let w=0,K=!0;const ve=()=>{w=0,C(),K&&!document.hidden&&(w=requestAnimationFrame(ve))},P=()=>{!h&&!w&&K&&!document.hidden&&(j=T(),w=requestAnimationFrame(ve))},ge=new IntersectionObserver(e=>{K=e.some(o=>o.isIntersecting),P()});ge.observe(l),document.addEventListener("visibilitychange",P),ne();const xe=new ResizeObserver(ne);return xe.observe(a),C(),P(),()=>{cancelAnimationFrame(w),G.current=()=>{},xe.disconnect(),ge.disconnect(),document.removeEventListener("visibilitychange",P),l.removeEventListener("pointermove",fe),l.removeEventListener("pointerdown",he),l.removeEventListener("pointerup",z),l.removeEventListener("pointercancel",z),l.removeEventListener("pointerleave",de),a.removeEventListener("webglcontextlost",me),a.removeEventListener("webglcontextrestored",pe),t.deleteVertexArray(oe),t.deleteProgram(m)}},[u,h,Ee]),Y.jsxs("section",{ref:M,className:"relative w-full select-none overflow-hidden "+(u?Ae?"cursor-grabbing ":"cursor-grab ":"")+(S==="draw"?"touch-none ":"touch-pan-y ")+g,style:{height:n,background:d.nightColor},"aria-label":"Pixel-art cumulus clouds printed with an ordered dither",children:[Le?Y.jsx("div",{className:"absolute inset-0",style:{background:"radial-gradient(38% 30% at 22% 18%, "+d.cloudColor+" 0%, "+d.shadeColor+" 45%, transparent 72%),radial-gradient(45% 34% at 78% 78%, "+d.shadeColor+" 0%, "+d.mistColor+" 50%, transparent 75%),radial-gradient(70% 60% at 30% 30%, "+d.duskColor+" 0%, "+d.deepColor+" 60%, "+d.nightColor+" 100%)"}}):Y.jsx("canvas",{ref:Q,"aria-hidden":"true",className:"absolute inset-0 block h-full w-full",style:{imageRendering:"pixelated",maxWidth:"none"}}),k?Y.jsx("div",{className:"pointer-events-none relative z-10 flex h-full w-full flex-col",children:k}):null]})}export{Ue as C,Be as D};
