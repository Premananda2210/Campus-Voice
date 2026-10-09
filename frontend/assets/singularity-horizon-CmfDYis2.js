import{r as w,j as a}from"./index-CdiR0C0d.js";const he=[{title:"Stable Singularity",status:"Topology: Nominal",accent:"#00f3ff",velocity:"0.45c",morph:.1,compression:1,intensity:1,orbit:1,spin:.08,camDistance:85,camHeight:25},{title:"Accretion Turbulence",status:"Topology: Fluctuating",accent:"#ffaa00",velocity:"0.78c",morph:4.5,compression:1.15,intensity:1.4,orbit:1.8,spin:.3,camDistance:95,camHeight:45},{title:"Relativistic Collapse",status:"Topology: Critical",accent:"#ff0044",velocity:"0.99c",morph:.8,compression:.38,intensity:3.5,orbit:4.5,spin:.9,camDistance:55,camHeight:12}],ye=["@keyframes sg-hud-in { from { opacity: 0 } to { opacity: 1 } }",".sg-hud-in { animation: sg-hud-in 1.2s ease both }","@media (prefers-reduced-motion: reduce) { .sg-hud-in { animation: none } }"].join(`
`),Re=4,Ce=5.6,Ee=`#version 300 es
precision highp float;

in vec2 aCorner;
in vec3 aSeed;            // x: radius, y: start angle, z: height in the disk

uniform mat4 uProj;
uniform mat4 uView;
uniform vec3 uCam;
uniform float uTime;
uniform float uMorph;
uniform float uCompression;
uniform float uIntensity;
uniform float uOrbit;

out vec3 vColor;
out float vAlpha;
out vec2 vCorner;

// ponytail: three sines instead of simplex noise. On a disk this dense the
// difference is invisible; swap in snoise if you ever light it from the side.
float turbulence(vec2 p, float t) {
  return sin(p.x * 0.9 + t) * 0.5
       + sin(p.y * 1.1 - t * 0.8) * 0.3
       + sin((p.x + p.y) * 0.7 + t * 1.3) * 0.2;
}

void main() {
  float r0 = aSeed.x;
  float r = r0 * uCompression;
  float angle = aSeed.y + uTime * (1.5 / sqrt(r0)) * uOrbit;

  vec3 pos = vec3(cos(angle) * r, aSeed.z, sin(angle) * r);
  pos.y += turbulence(pos.xz * 0.08, uTime * 0.3) * uMorph * 4.0;

  vec3 viewDir = normalize(uCam - pos);
  vec3 tangent = vec3(-sin(angle), 0.0, cos(angle));

  // Matter swinging toward the camera blueshifts and brightens.
  float doppler = dot(tangent, viewDir);

  vec3 hot = vec3(1.0, 0.95, 0.9);
  vec3 warm = vec3(1.0, 0.45, 0.1);
  vec3 cool = vec3(0.1, 0.35, 1.0);
  vec3 color = mix(cool, warm, smoothstep(45.0, 12.0, r));
  color = mix(color, hot, smoothstep(10.0, 4.0, r));

  vColor = color * (1.3 + doppler * 0.7) * uIntensity;
  vAlpha = smoothstep(3.8, 5.5, r) * (1.0 - smoothstep(38.0, 48.0, r)) * 0.8;
  vCorner = aCorner;

  // Billboard the streak: long along the orbit, thin across the view.
  vec3 side = cross(tangent, viewDir);
  side = length(side) > 0.001 ? normalize(side) : vec3(0.0, 1.0, 0.0);
  vec3 offset = tangent * aCorner.x * 1.1 + side * aCorner.y * 0.13;

  gl_Position = uProj * uView * vec4(pos + offset, 1.0);
}
`,Se=`#version 300 es
precision highp float;

in vec3 vColor;
in float vAlpha;
in vec2 vCorner;
out vec4 outColor;

void main() {
  float across = 1.0 - vCorner.y * vCorner.y;
  float along = 1.0 - vCorner.x * vCorner.x * 0.35;
  outColor = vec4(vColor, vAlpha * across * along);
}
`,Te=`#version 300 es
precision highp float;

in vec2 aCorner;

uniform mat4 uProj;
uniform mat4 uView;
uniform vec3 uRight;
uniform vec3 uUp;
uniform float uSize;

out vec2 vCorner;

void main() {
  vCorner = aCorner;
  vec3 pos = uRight * aCorner.x * uSize + uUp * aCorner.y * uSize;
  gl_Position = uProj * uView * vec4(pos, 1.0);
}
`,Me=`#version 300 es
precision highp float;

in vec2 vCorner;

uniform mat4 uProj;
uniform mat4 uView;
uniform vec3 uRight;
uniform vec3 uUp;
uniform vec3 uForward;    // origin toward the camera
uniform float uSize;
uniform float uHorizon;
uniform float uIntensity;
uniform bool uGlow;

out vec4 outColor;

void main() {
  float d = length(vCorner) * uSize;
  if (uGlow) {
    if (d < uHorizon) discard;
    float rim = pow(smoothstep(uSize, uHorizon, d), 3.0);
    gl_FragDepth = gl_FragCoord.z;
    outColor = vec4(vec3(1.0, 0.45, 0.1) * rim * uIntensity * 1.6, rim);
  } else {
    if (d > uHorizon) discard;
    // The quad is flat but the horizon is a sphere, and the near side of the
    // disk has to pass in front of it. Bulge the depth per fragment — on the
    // vertices it would interpolate straight back to zero.
    float bulge = sqrt(max(uHorizon * uHorizon - d * d, 0.0));
    vec3 pos = uRight * vCorner.x * uSize + uUp * vCorner.y * uSize + uForward * bulge;
    vec4 clip = uProj * uView * vec4(pos, 1.0);
    gl_FragDepth = (clip.z / clip.w) * 0.5 + 0.5;
    outColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}
`;function pe(o,i,f){const c=o.createProgram();if(!c)return null;for(const[g,b]of[[o.VERTEX_SHADER,i],[o.FRAGMENT_SHADER,f]]){const n=o.createShader(g);if(!n)return null;if(o.shaderSource(n,b),o.compileShader(n),!o.getShaderParameter(n,o.COMPILE_STATUS))return console.error("singularity-horizon:",o.getShaderInfoLog(n)),null;o.attachShader(c,n),o.deleteShader(n)}return o.linkProgram(c),o.getProgramParameter(c,o.LINK_STATUS)?c:(console.error("singularity-horizon:",o.getProgramInfoLog(c)),null)}function Ie(o,i,f,c,g){const b=1/Math.tan(i/2);o.fill(0),o[0]=b/f,o[5]=b,o[10]=(g+c)/(c-g),o[11]=-1,o[14]=2*g*c/(c-g)}function Pe(o,i,f,c,g){const b=Math.hypot(i[0],i[1],i[2])||1,n=[i[0]/b,i[1]/b,i[2]/b],T=Math.hypot(n[2],n[0]),l=T>1e-5?[n[2]/T,0,-n[0]/T]:[1,0,0],A=[n[1]*l[2]-n[2]*l[1],n[2]*l[0]-n[0]*l[2],n[0]*l[1]-n[1]*l[0]];o.set([l[0],A[0],n[0],0,l[1],A[1],n[1],0,l[2],A[2],n[2],0,-(l[0]*i[0]+l[1]*i[1]+l[2]*i[2]),-(A[0]*i[0]+A[1]*i[1]+A[2]*i[2]),-(n[0]*i[0]+n[1]*i[1]+n[2]*i[2]),1]);for(let p=0;p<3;p++)f[p]=l[p],c[p]=A[p],g[p]=n[p]}function Fe(){const[o,i]=w.useState(!1);return w.useEffect(()=>{const f=window.matchMedia("(prefers-reduced-motion: reduce)"),c=()=>i(f.matches);return c(),f.addEventListener("change",c),()=>f.removeEventListener("change",c)},[]),o}function je({height:o="100svh",states:i=he,interval:f=1e4,hud:c=!0,mass:g="4.2M SOL",lensing:b="SCHWARZSCHILD",radiation:n="DETECTION ON",particles:T=5e3,interactive:l=!0,className:A=""}){const p=w.useRef(null),M=Fe(),[Q,ve]=w.useState(0),[ge,be]=w.useState(0),[xe,J]=w.useState(!1),P=i.length?i:he,h=P[Q%P.length],N=w.useRef(h);return N.current=h,w.useEffect(()=>{if(M||P.length<2||f<=0)return;const t=window.setInterval(()=>ve(e=>(e+1)%P.length),f);return()=>window.clearInterval(t)},[M,P.length,f]),w.useEffect(()=>{const t=p.current;if(!t)return;const e=t.getContext("webgl2",{antialias:!0,alpha:!1,powerPreference:"high-performance"});if(!e){J(!0);return}const m=pe(e,Ee,Se),d=pe(e,Te,Me);if(!m||!d){J(!0);return}const V=Math.max(1,Math.round(T)),F=new Float32Array(V*3);for(let r=0;r<V;r++){const v=5+Math.pow(Math.random(),1.3)*40;F[r*3]=v,F[r*3+1]=Math.random()*Math.PI*2,F[r*3+2]=(Math.random()-.5)*(8/v)}const Ae=new Float32Array([-1,-1,1,-1,-1,1,1,1]),L=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,L),e.bufferData(e.ARRAY_BUFFER,Ae,e.STATIC_DRAW);const k=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,k),e.bufferData(e.ARRAY_BUFFER,F,e.STATIC_DRAW);const B=e.createVertexArray();e.bindVertexArray(B);const $=e.getAttribLocation(m,"aCorner");e.bindBuffer(e.ARRAY_BUFFER,L),e.enableVertexAttribArray($),e.vertexAttribPointer($,2,e.FLOAT,!1,0,0);const H=e.getAttribLocation(m,"aSeed");e.bindBuffer(e.ARRAY_BUFFER,k),e.enableVertexAttribArray(H),e.vertexAttribPointer(H,3,e.FLOAT,!1,0,0),e.vertexAttribDivisor(H,1);const j=e.createVertexArray();e.bindVertexArray(j);const ee=e.getAttribLocation(d,"aCorner");e.bindBuffer(e.ARRAY_BUFFER,L),e.enableVertexAttribArray(ee),e.vertexAttribPointer(ee,2,e.FLOAT,!1,0,0),e.bindVertexArray(null);const u=(r,v)=>e.getUniformLocation(r,v),y={proj:u(m,"uProj"),view:u(m,"uView"),cam:u(m,"uCam"),time:u(m,"uTime"),morph:u(m,"uMorph"),compression:u(m,"uCompression"),intensity:u(m,"uIntensity"),orbit:u(m,"uOrbit")},x={proj:u(d,"uProj"),view:u(d,"uView"),right:u(d,"uRight"),up:u(d,"uUp"),forward:u(d,"uForward"),size:u(d,"uSize"),horizon:u(d,"uHorizon"),intensity:u(d,"uIntensity"),glow:u(d,"uGlow")},O=new Float32Array(16),U=new Float32Array(16),te=[1,0,0],re=[0,1,0],oe=[0,0,1],R=N.current,s={morph:R.morph,compression:R.compression,intensity:R.intensity,orbit:R.orbit,spin:R.spin,distance:R.camDistance,height:R.camHeight};let z=Math.PI*.25,Y=0,ne=M?9:0,G=0,C=0;const we=()=>{const r=Math.min(window.devicePixelRatio||1,2),v=Math.max(1,Math.round(t.clientWidth*r)),I=Math.max(1,Math.round(t.clientHeight*r));(t.width!==v||t.height!==I)&&(t.width=v,t.height=I)},ie=r=>{C=0;const v=G?Math.min((r-G)/1e3,.05):.016;if(G=r,we(),!M){const E=1-Math.exp(-v/1.2),S=N.current;s.morph+=(S.morph-s.morph)*E,s.compression+=(S.compression-s.compression)*E,s.intensity+=(S.intensity-s.intensity)*E,s.orbit+=(S.orbit-s.orbit)*E,s.spin+=(S.spin-s.spin)*E,s.distance+=(S.camDistance-s.distance)*E,s.height+=(S.camHeight-s.height)*E,ne+=v,z+=s.spin*v}const I=t.width/t.height,de=I<1?Math.min(1/I,1.6):1,D=s.distance*de,Z=Math.max(-D*.9,Math.min(D*.9,s.height*de+Y)),fe=Math.sqrt(Math.max(D*D-Z*Z,16)),me=[Math.cos(z)*fe,Z,Math.sin(z)*fe];Ie(O,40*Math.PI/180,I,.1,1e3),Pe(U,me,te,re,oe),e.viewport(0,0,t.width,t.height),e.clearColor(.004,.004,.012,1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.disable(e.BLEND),e.depthMask(!0),e.useProgram(d),e.bindVertexArray(j),e.uniformMatrix4fv(x.proj,!1,O),e.uniformMatrix4fv(x.view,!1,U),e.uniform3fv(x.right,te),e.uniform3fv(x.up,re),e.uniform3fv(x.forward,oe),e.uniform1f(x.size,Ce),e.uniform1f(x.horizon,Re),e.uniform1f(x.intensity,s.intensity),e.uniform1i(x.glow,0),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE),e.depthMask(!1),e.useProgram(m),e.bindVertexArray(B),e.uniformMatrix4fv(y.proj,!1,O),e.uniformMatrix4fv(y.view,!1,U),e.uniform3fv(y.cam,me),e.uniform1f(y.time,ne),e.uniform1f(y.morph,s.morph),e.uniform1f(y.compression,s.compression),e.uniform1f(y.intensity,s.intensity),e.uniform1f(y.orbit,s.orbit),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,V),e.disable(e.DEPTH_TEST),e.useProgram(d),e.bindVertexArray(j),e.uniform1i(x.glow,1),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindVertexArray(null),M||(C=requestAnimationFrame(ie))},q=()=>{C||(C=requestAnimationFrame(ie))};q();const se=new ResizeObserver(q);se.observe(t);let X=!1,W=0,K=0;const ae=r=>{l&&(X=!0,W=r.clientX,K=r.clientY,t.setPointerCapture(r.pointerId))},ce=r=>{X&&(z-=(r.clientX-W)*.005,Y=Math.max(-30,Math.min(30,Y+(r.clientY-K)*.15)),W=r.clientX,K=r.clientY,q())},_=r=>{X=!1,t.hasPointerCapture(r.pointerId)&&t.releasePointerCapture(r.pointerId)},le=r=>{r.preventDefault(),cancelAnimationFrame(C),C=0},ue=()=>be(r=>r+1);return t.addEventListener("pointerdown",ae),t.addEventListener("pointermove",ce),t.addEventListener("pointerup",_),t.addEventListener("pointercancel",_),t.addEventListener("webglcontextlost",le),t.addEventListener("webglcontextrestored",ue),()=>{cancelAnimationFrame(C),se.disconnect(),t.removeEventListener("pointerdown",ae),t.removeEventListener("pointermove",ce),t.removeEventListener("pointerup",_),t.removeEventListener("pointercancel",_),t.removeEventListener("webglcontextlost",le),t.removeEventListener("webglcontextrestored",ue),e.deleteProgram(m),e.deleteProgram(d),e.deleteBuffer(L),e.deleteBuffer(k),e.deleteVertexArray(B),e.deleteVertexArray(j)}},[T,l,M,ge]),a.jsxs("section",{className:"relative w-full overflow-hidden bg-[#010103] text-white "+A,style:{height:o},"aria-label":h.title,children:[a.jsx("style",{children:ye}),xe?a.jsx("div",{className:"absolute inset-0",style:{background:"radial-gradient(circle at 50% 50%, #000 12%, rgba(255,120,20,0.55) 13%, rgba(255,70,10,0.18) 22%, rgba(20,60,180,0.16) 45%, #010103 70%)"}}):a.jsx("canvas",{ref:p,"aria-hidden":"true",className:"absolute inset-0 block h-full w-full "+(l?"cursor-grab touch-none active:cursor-grabbing":"")}),a.jsx("div",{className:"pointer-events-none absolute inset-0 z-10",style:{background:"radial-gradient(circle at 50% 50%, transparent 35%, rgba(0,0,0,0.72) 100%)"}}),c&&a.jsxs("div",{className:"pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10",children:[a.jsxs("div",{className:"sg-hud-in text-center",children:[a.jsx("div",{className:"mb-3 text-[0.8rem] font-light uppercase tracking-[0.5em] opacity-90 sm:text-[1.2rem] sm:tracking-[0.8em]",children:h.title}),a.jsx("div",{className:"inline-block rounded-full border px-5 py-1.5 text-[0.6rem] uppercase tracking-[0.25em]",style:{color:h.accent,borderColor:h.accent,background:"rgba(255,255,255,0.03)"},children:h.status})]},Q),a.jsxs("div",{className:"flex items-end justify-between gap-4 font-mono text-[0.6rem] uppercase tracking-wider opacity-60 sm:text-[0.7rem]",children:[a.jsxs("div",{children:[a.jsxs("div",{className:"mb-1.5",children:["MASS_INDEX: ",a.jsx("span",{style:{color:h.accent},children:g})]}),a.jsxs("div",{children:["LENSING: ",a.jsx("span",{style:{color:h.accent},children:b})]})]}),a.jsxs("div",{className:"text-right",children:[a.jsxs("div",{className:"mb-1.5",children:["RELATIVITY: ",a.jsx("span",{style:{color:h.accent},children:h.velocity})]}),a.jsxs("div",{children:["RADIATION: ",a.jsx("span",{style:{color:h.accent},children:n})]})]})]})]})]})}export{he as D,je as S};
