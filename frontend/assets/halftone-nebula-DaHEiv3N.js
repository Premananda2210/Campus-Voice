import{r as b,j as Y}from"./index-CdiR0C0d.js";const Be={pixel:6,dotMin:.12,dotMax:.56,levels:7,scale:1.7,warp:1.5,drift:.035,density:.5,threshold:.54,softness:.5,band:.5,bandAngle:1.05,bandOffset:.42,bandWidth:.34,haze:.8,stars:1,twinkle:1.4,starDrift:1.2,sparkles:9,seed:11,spikeWidth:1,planet:!0,planetX:.26,planetY:.36,planetRadius:.075,parallax:1,lens:.55,lensRadius:170,lensPush:.3,rippleSpeed:420,speed:1,vignette:.5,grain:.035,voidColor:"#050309",hazeColor:"#161a38",duskColor:"#3b1646",wineColor:"#5c0d31",crimsonColor:"#c01245",hotColor:"#ff1f5a",starColor:"#f6e2e8"},Oe={crimson:{},ultraviolet:{hazeColor:"#10183f",duskColor:"#2a1a5e",wineColor:"#3d1478",crimsonColor:"#7b2cf0",hotColor:"#c77dff",starColor:"#eef0ff",bandAngle:2.2,bandOffset:.3,planetX:.74,planetY:.3,seed:4},abyssal:{voidColor:"#02060a",hazeColor:"#0a1f2e",duskColor:"#0d2f3f",wineColor:"#0a4453",crimsonColor:"#0f8f9f",hotColor:"#3ff2e0",starColor:"#e4fffb",band:.5,bandAngle:-.4,bandOffset:-.2,planetX:.7,planetY:.66,seed:23},solar:{voidColor:"#070403",hazeColor:"#231208",duskColor:"#3d1a07",wineColor:"#6e2406",crimsonColor:"#d8520c",hotColor:"#ffb020",starColor:"#fff3d6",warp:1.9,band:.72,bandAngle:.4,planetRadius:.1,seed:5},phosphor:{voidColor:"#020502",hazeColor:"#08170c",duskColor:"#0c2412",wineColor:"#0e3d18",crimsonColor:"#1f9d3a",hotColor:"#6dff7a",starColor:"#e6ffe8",pixel:5,levels:5,planet:!1,sparkles:6,seed:31}},m=16,j=4,Ae=[["pixel","f"],["dotMin","f"],["dotMax","f"],["levels","f"],["scale","f"],["warp","f"],["drift","f"],["density","f"],["threshold","f"],["softness","f"],["band","f"],["bandAngle","f"],["bandOffset","f"],["bandWidth","f"],["haze","f"],["stars","f"],["twinkle","f"],["starDrift","f"],["spikeWidth","f"],["parallax","f"],["lens","f"],["lensRadius","f"],["lensPush","f"],["rippleSpeed","f"],["vignette","f"],["grain","f"],["voidColor","c"],["hazeColor","c"],["duskColor","c"],["wineColor","c"],["crimsonColor","c"],["hotColor","c"],["starColor","c"]],Le=r=>"u"+r[0].toUpperCase()+r.slice(1),Ne=r=>r==="c"?"vec3":r==="i"||r==="b"?"int":"float",Ie=r=>r.map(([n,o])=>"uniform "+Ne(o)+" "+Le(n)+";").join(`
`),We=`#version 300 es
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,_e=`#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uDpr;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerOn;
uniform vec2 uLook;
uniform int uSparkCount;
uniform vec4 uSpark[${m}];
uniform vec4 uSparkB[${m}];
uniform vec4 uRipple[${j}];
uniform vec4 uPlanet;
${Ie(Ae)}
out vec4 frag;

float hash12(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
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
  for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = r * p * 2.03 + 17.1; a *= 0.5; }
  return s / 0.96875;
}
float bayer4(vec2 c){
  vec2 m = mod(c, 4.0);
  int i = int(m.x) + int(m.y) * 4;
  int b[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(b[i]) + 0.5) / 16.0;
}
vec3 ramp(float d, vec3 haze){
  vec3 c = mix(uVoidColor, haze, smoothstep(0.0, 0.22, d));
  c = mix(c, uWineColor, smoothstep(0.18, 0.44, d));
  c = mix(c, uCrimsonColor, smoothstep(0.42, 0.72, d));
  return mix(c, uHotColor, smoothstep(0.7, 0.96, d));
}
vec2 shift(float depth){
  return floor(uLook * uParallax * depth * 28.0);
}

// Density of the gas at a CSS-pixel position: x = density, y = haze, z = tone.
vec3 field(vec2 pos, vec2 resCss){
  float minSide = min(resCss.x, resCss.y);
  vec2 uv = (pos - 0.5 * resCss) / minSide;
  vec2 p = uv * uScale + uLook * uParallax * 0.05;

  vec2 toP = pos - uPointer;
  float lamp = exp(-dot(toP, toP) / (uLensRadius * uLensRadius)) * uPointerOn;
  p += toP / minSide * lamp * uLensPush * uScale;

  float ring = 0.0;
  for (int i = 0; i < ${j}; i++) {
    vec4 r = uRipple[i];
    float age = uTime - r.z;
    if (r.w <= 0.0 || age < 0.0 || age > 2.4) continue;
    vec2 dv = pos - r.xy;
    float dist = length(dv);
    float w = 14.0 + age * 26.0;
    float k = exp(-pow((dist - age * uRippleSpeed) / w, 2.0)) * (1.0 - age / 2.4) * r.w;
    ring += k;
    p += dv / max(dist, 1.0) * k * 0.12;
  }

  float t = uTime * uDrift;
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.7)), fbm(p + vec2(5.2, 1.3) - t * 0.5));
  float n = fbm(p + uWarp * q + vec2(t * 0.4, -t * 0.25));

  vec2 dir = vec2(cos(uBandAngle), sin(uBandAngle));
  float along = dot(uv, dir);
  float across = dot(uv, vec2(-dir.y, dir.x)) - uBandOffset - 0.22 * sin(along * 2.3 + t * 3.0) - (q.x - 0.5) * 0.35;
  float river = exp(-across * across / (uBandWidth * uBandWidth));

  float raw = n + river * uBand * 0.5 + (uDensity - 0.5) * 0.5;
  float d = smoothstep(uThreshold, uThreshold + uSoftness, raw);
  d = clamp(d + lamp * uLens * 0.45 + ring * 0.55, 0.0, 1.0);

  for (int i = 0; i < ${m}; i++) {
    if (i >= uSparkCount) break;
    vec4 s = uSpark[i];
    vec4 b = uSparkB[i];
    float grow = smoothstep(0.0, 0.6, uTime - s.w);
    float dist = length(pos - s.xy - shift(1.2));
    d += exp(-dist / max(b.w * 2.2 * (1.0 + b.z * 0.6), 1.0)) * 0.55 * grow;
  }

  float hz = smoothstep(0.25, 0.75, n + river * 0.25) * uHaze;
  float tone = fbm(p * 0.45 + vec2(11.0, -3.0) + t * 0.2);
  return vec3(clamp(d, 0.0, 1.0), hz, tone);
}

void main(){
  vec2 resCss = uRes / uDpr;
  vec2 css = gl_FragCoord.xy / uDpr;
  float px = max(uPixel, 1.0);
  vec2 cell = floor(css / px);
  vec2 cellC = (cell + 0.5) * px;
  vec2 f = fract(css / px) - 0.5;
  float L = max(uLevels, 2.0);
  float dith = bayer4(cell);

  // ---- the gas, printed as a halftone ---------------------------------------
  vec3 g = field(cellC, resCss);
  vec3 hazeCol = mix(uHazeColor, uDuskColor, smoothstep(0.38, 0.62, g.z));
  float dq = clamp(floor(g.x * L + dith) / L, 0.0, 1.0);
  float hq = floor(g.y * 3.0 + dith) / 3.0;
  vec3 bg = mix(uVoidColor, hazeCol, hq * 0.7);
  bg = mix(bg, ramp(dq * 0.7, hazeCol) * 0.42, smoothstep(0.0, 0.3, dq));
  float r = mix(uDotMin, uDotMax, sqrt(dq));
  float dotMask = step(length(f), r);
  vec3 dotCol = dq < 0.01 ? mix(uVoidColor, hazeCol, 0.35 + hq * 0.5) : ramp(min(dq + 0.1, 1.0), hazeCol);
  vec3 col = mix(bg, dotCol, dotMask);

  // ---- pixel stars, three parallax depths ------------------------------------
  vec3 starAcc = vec3(0.0);
  float starA = 0.0;
  for (int l = 0; l < 3; l++) {
    float fl = float(l);
    float depth = 0.3 + fl * 0.4;
    float gpx = px * (l == 2 ? 2.0 : 1.0);
    vec2 sp = css + shift(depth) + vec2(0.0, floor(uTime * uStarDrift * depth));
    vec2 id = floor(sp / gpx);
    vec2 fr = fract(sp / gpx) - 0.5;
    float prob = uStars * (l == 0 ? 0.009 : l == 1 ? 0.014 : 0.01);
    float h = hash12(id + fl * 71.3);
    if (h > 1.0 - prob) {
      float h2 = hash12(id * 1.7 + 3.1 + fl);
      float tw = 0.45 + 0.55 * (0.5 + 0.5 * sin(uTime * uTwinkle * (0.6 + h2 * 2.5) + h2 * 40.0));
      float rad = l == 2 ? 0.42 : 0.26 + h2 * 0.22;
      float m = step(length(fr), rad);
      vec3 c = (l == 0 || h2 > 0.82) ? uStarColor : uHotColor;
      starAcc = max(starAcc, c * m * tw);
      starA = max(starA, m * tw);
    }
  }
  col = mix(col, starAcc / max(starA, 1e-3), starA * (1.0 - g.x * 0.55));

  // ---- the planet, same halftone, lit from the upper left --------------------
  if (uPlanet.w > 0.5) {
    vec2 pc = uPlanet.xy + shift(0.8);
    float R = uPlanet.z;
    vec2 dc = cellC - pc;
    if (length(dc) < R) {
      vec2 n2 = dc / R;
      float z = sqrt(max(1.0 - dot(n2, n2), 0.0));
      float lit = clamp(dot(vec3(n2, z), normalize(vec3(-0.45, 0.55, 0.7))), 0.0, 1.0);
      float surf = fbm(vec2(n2.x * 1.4 + uTime * 0.015, n2.y * 4.2) * 1.6 + 9.0);
      float pd = clamp(lit * 1.05 - smoothstep(0.55, 0.75, surf) * 0.45 * (1.0 - lit * 0.5) + 0.05, 0.0, 1.0);
      float pq = floor(pd * L + dith) / L;
      vec3 pbg = mix(mix(uVoidColor, uWineColor, 0.35), uWineColor, pq);
      float pr = mix(0.2, 0.62, sqrt(pq));
      vec3 pdot = ramp(min(pq * 0.85 + 0.25, 1.0), hazeCol);
      col = mix(pbg, pdot, step(length(f), pr));
    }
  }

  // ---- sparkle stars: chunky core, needle spikes -----------------------------
  vec2 sh = shift(1.2);
  for (int i = 0; i < ${m}; i++) {
    if (i >= uSparkCount) break;
    vec4 s = uSpark[i];
    vec4 b = uSparkB[i];
    float age = uTime - s.w;
    if (age < 0.0) continue;
    float grow = smoothstep(0.0, 0.55, age) * (1.0 + 0.3 * exp(-age * 3.0) * sin(age * 13.0));
    float tw = 0.84 + 0.16 * sin(uTime * uTwinkle * 1.7 + b.y);
    float flare = 1.0 + b.z * 0.6;
    float reach = s.z * grow * tw * flare;
    float core = b.w * grow * flare;
    vec3 tint = mix(uHotColor, uStarColor, b.x);
    vec2 c = s.xy + sh;
    vec2 d = css - c;
    float th = uSpikeWidth * 0.5 + 0.25;
    float hx = step(abs(d.y), th) * pow(max(1.0 - abs(d.x) / max(reach, 1.0), 0.0), 1.1);
    float vy = step(abs(d.x), th) * pow(max(1.0 - abs(d.y) / max(reach, 1.0), 0.0), 1.1);
    // A short second pair of spikes, turned 45deg, only on the big ones.
    vec2 rd = vec2(d.x + d.y, d.x - d.y) * 0.7071;
    float diag = step(0.5, core / px - 1.5) * 0.45 * max(
      step(abs(rd.y), th) * pow(max(1.0 - abs(rd.x) / max(reach * 0.22, 1.0), 0.0), 2.0),
      step(abs(rd.x), th) * pow(max(1.0 - abs(rd.y) / max(reach * 0.22, 1.0), 0.0), 2.0));
    col = mix(col, tint, clamp(max(max(hx, vy), diag), 0.0, 1.0));
    // The core snaps to the cell grid, so it reads as a pixel-art disc.
    float hp = px * 0.5;
    vec2 dcell = (floor(css / hp) + 0.5) * hp - (floor(c / hp) + 0.5) * hp;
    float disc = step(length(dcell), core);
    float glow = exp(-length(d) / max(core * 1.4, 1.0)) * (1.0 - disc);
    col += tint * glow * 0.35;
    col = mix(col, tint, disc);
    float cross = max(step(abs(d.y), th) * step(abs(d.x), core * 0.85),
                      step(abs(d.x), th) * step(abs(d.y), core * 0.85));
    col = mix(col, uStarColor, cross * disc * 0.9);
  }

  // ---- post -----------------------------------------------------------------
  vec2 vu = gl_FragCoord.xy / uRes - 0.5;
  col *= 1.0 - uVignette * smoothstep(0.35, 0.95, length(vu * vec2(uRes.x / uRes.y, 1.0) * 1.1));
  col += (hash12(floor(css) + fract(uTime) * 91.0) - 0.5) * uGrain;
  frag = vec4(max(col, vec3(0.0)), 1.0);
}`;function Ve(r){let n=r>>>0;return()=>{n=n+1831565813>>>0;let o=n;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}}function Re(r,n){const o=Ve(r),l=[],z=Math.max(0,Math.min(Math.floor(n),m));for(let C=0;C<z;C++){const w=C===0,T=C===1;let A=.5,L=.5;for(let q=0;q<40&&(A=.08+.84*o(),L=w?.58+.28*o():.08+.84*o(),!l.every(D=>Math.hypot(D.x-A,D.y-L)>(w?.2:.13)));q++);l.push({x:A,y:L,reach:w?.2+.05*o():T?.08+.03*o():.025+.055*o(),core:w?.024:T?.011:.004+.006*o(),tint:T?1:0,phase:o()*6.283,born:-10,user:!1})}return l}function Xe(r,n,o=m){if(r.length<o)return[...r,n];const l=r.findIndex(z=>z.user);return l===-1?r:[...r.slice(0,l),...r.slice(l+1),n]}function He(r){let n=r.trim().replace(/^#/,"");if(n.length===3&&(n=n.split("").map(l=>l+l).join("")),!/^[0-9a-fA-F]{6}$/.test(n))return[0,0,0];const o=parseInt(n,16);return[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255]}function Ue(r){const n=.5+.32*Math.sin(r*.21)+.1*Math.sin(r*.077+1.3),o=.5+.26*Math.cos(r*.17)+.12*Math.cos(r*.053+4.2);return[Math.min(Math.max(n,.05),.95),Math.min(Math.max(o,.05),.95)]}function $e({height:r="100svh",preset:n="crimson",params:o,interactive:l=!0,touch:z="scroll",maxDpr:C=2,children:w,className:T=""}){const A=b.useRef(null),L=b.useRef(null),[q,F]=b.useState(!1),[D,Pe]=b.useState(0),[d,Ee]=b.useState(!1);b.useEffect(()=>{const c=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>Ee(c.matches);return a(),c.addEventListener("change",a),()=>c.removeEventListener("change",a)},[]);const ne=b.useMemo(()=>({...Be,...Oe[n]??{},...o??{}}),[n,o]),k=b.useRef(ne);return k.current=ne,b.useEffect(()=>{const c=A.current,a=L.current;if(!c||!a)return;const e=a.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,powerPreference:"high-performance"});if(!e){F(!0);return}const se=(t,s)=>{const i=e.createShader(t);return i?(e.shaderSource(i,s),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS)?i:(console.error("halftone-nebula:",e.getShaderInfoLog(i)),e.deleteShader(i),null)):null},B=se(e.VERTEX_SHADER,We),O=se(e.FRAGMENT_SHADER,_e),v=B&&O?e.createProgram():null;if(!v||!B||!O){F(!0);return}if(e.attachShader(v,B),e.attachShader(v,O),e.linkProgram(v),e.deleteShader(B),e.deleteShader(O),!e.getProgramParameter(v,e.LINK_STATUS)){console.error("halftone-nebula:",e.getProgramInfoLog(v)),e.deleteProgram(v),F(!0);return}const p=t=>e.getUniformLocation(v,t),ze=Ae.map(([t,s])=>[p(Le(t)),t,s]),u={res:p("uRes"),dpr:p("uDpr"),time:p("uTime"),pointer:p("uPointer"),pointerOn:p("uPointerOn"),look:p("uLook"),sparkCount:p("uSparkCount"),spark:p("uSpark"),sparkB:p("uSparkB"),ripple:p("uRipple"),planet:p("uPlanet")},le=e.createVertexArray();let x=1,g=1,$=1;const ie=()=>{$=Math.min(window.devicePixelRatio||1,Math.max(C,.5)),x=Math.max(a.clientWidth,1),g=Math.max(a.clientHeight,1);const t=Math.floor(x*$),s=Math.floor(g*$);(a.width!==t||a.height!==s)&&(a.width=t,a.height=s),d&&V()};let P=Re(k.current.seed,k.current.sparkles),ce=k.current.seed+":"+k.current.sparkles;const G=new Float32Array(m),fe=new Float32Array(m*4),de=new Float32Array(m*4),pe=new Float32Array(j*4);let K=0;const Te=14,qe=performance.now(),ue=()=>d?Te:(performance.now()-qe)/1e3*k.current.speed;let he=0,Z=.5,J=.5,N=.5,I=.5,Q=0,ee=0,te=0,W=!1,oe=-1e9;const me=t=>{const s=a.getBoundingClientRect();return[Math.min(Math.max((t.clientX-s.left)/Math.max(s.width,1),0),1),Math.min(Math.max(1-(t.clientY-s.top)/Math.max(s.height,1),0),1)]},ve=t=>{l&&([Z,J]=me(t),W=!0,oe=performance.now()/1e3)},_=()=>{W=!1},xe=t=>{var H;if(!l||t.button>0||(H=t.target)!=null&&H.closest("a,button,input,textarea,select,label,[role=button]"))return;const[s,i]=me(t);Z=s,J=i,W=!0,oe=performance.now()/1e3;const S=ue(),M=Math.random();P=Xe(P,{x:s,y:i,reach:.045+.08*M,core:.006+.008*M,tint:Math.random()<.2?1:0,phase:Math.random()*6.283,born:d?S-10:S,user:!0}),pe.set([s*x,i*g,S,d?0:1],K*4),K=(K+1)%j,d&&V()};c.addEventListener("pointermove",ve),c.addEventListener("pointerdown",xe),c.addEventListener("pointerleave",_),c.addEventListener("pointercancel",_);const ge=t=>{t.preventDefault(),cancelAnimationFrame(y),y=0},be=()=>Pe(t=>t+1);a.addEventListener("webglcontextlost",ge),a.addEventListener("webglcontextrestored",be);const V=()=>{const t=k.current,s=t.seed+":"+t.sparkles;s!==ce&&(P=[...Re(t.seed,t.sparkles),...P.filter(f=>f.user)].slice(0,m),ce=s);const i=ue(),S=Math.min(Math.max(i-he,0),.1);he=i;const M=!W||performance.now()/1e3-oe>6,[H,Fe]=Ue(i*.6),ye=M?H:Z,Se=M?Fe:J,U=d?1:1-Math.exp(-S*(M?1.5:7));N+=(ye-N)*U,I+=(Se-I)*U,Q+=((ye-.5)*2-Q)*U,ee+=((Se-.5)*2-ee)*U,te+=((l&&!d?M?.55:1:0)-te)*(d?1:1-Math.exp(-S*3));const ae=Math.min(x,g),Me=Math.min(P.length,m);for(let f=0;f<Me;f++){const h=P[f],R=h.reach*ae,E=Math.hypot(h.x*x-N*x,h.y*g-I*g),De=l&&!d?Math.exp(-(E*E)/Math.max(R*R*.6,400)):0;G[f]+=(De-G[f])*(d?1:1-Math.exp(-S*6)),fe.set([h.x*x,h.y*g,R,h.born],f*4),de.set([h.tint,h.phase,G[f],Math.max(h.core*ae,1.5)],f*4)}e.useProgram(v),e.bindVertexArray(le),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,a.width,a.height);for(const[f,h,R]of ze){const E=t[h];R==="c"?e.uniform3fv(f,He(E)):R==="i"||R==="b"?e.uniform1i(f,Number(E)|0):e.uniform1f(f,E)}e.uniform2f(u.res,a.width,a.height),e.uniform1f(u.dpr,a.width/x),e.uniform1f(u.time,i),e.uniform2f(u.pointer,N*x,I*g),e.uniform1f(u.pointerOn,te),e.uniform2f(u.look,Q,ee),e.uniform1i(u.sparkCount,Me),e.uniform4fv(u.spark,fe),e.uniform4fv(u.sparkB,de),e.uniform4fv(u.ripple,pe),e.uniform4f(u.planet,t.planetX*x,t.planetY*g,t.planetRadius*ae,t.planet?1:0),e.drawArrays(e.TRIANGLES,0,3)};let y=0,re=!0;const Ce=()=>{y=0,V(),re&&!document.hidden&&(y=requestAnimationFrame(Ce))},X=()=>{!d&&!y&&re&&!document.hidden&&(y=requestAnimationFrame(Ce))},we=new IntersectionObserver(t=>{re=t.some(s=>s.isIntersecting),X()});we.observe(c),document.addEventListener("visibilitychange",X),ie();const ke=new ResizeObserver(ie);return ke.observe(a),V(),d||X(),()=>{cancelAnimationFrame(y),ke.disconnect(),we.disconnect(),document.removeEventListener("visibilitychange",X),c.removeEventListener("pointermove",ve),c.removeEventListener("pointerdown",xe),c.removeEventListener("pointerleave",_),c.removeEventListener("pointercancel",_),a.removeEventListener("webglcontextlost",ge),a.removeEventListener("webglcontextrestored",be),e.deleteVertexArray(le),e.deleteProgram(v)}},[l,d,D,C]),Y.jsxs("section",{ref:A,className:"relative w-full overflow-hidden bg-[#050309] "+(l?"cursor-crosshair ":"")+(z==="draw"?"touch-none ":"touch-pan-y ")+T,style:{height:r},"aria-label":"A pixel-art nebula printed in halftone dots",children:[q?Y.jsx("div",{className:"absolute inset-0",style:{background:"radial-gradient(60% 45% at 12% 88%, #ff1f5a 0%, #c01245 22%, #5c0d31 50%, transparent 75%),radial-gradient(45% 30% at 22% 22%, #5c0d31 0%, transparent 70%),radial-gradient(40% 30% at 80% 30%, #3b1646 0%, transparent 70%),#050309"}}):Y.jsx("canvas",{ref:L,"aria-hidden":"true",className:"absolute inset-0 block h-full w-full"}),w?Y.jsx("div",{className:"pointer-events-none relative z-10 flex h-full w-full flex-col",children:w}):null]})}export{$e as H,Oe as N};
