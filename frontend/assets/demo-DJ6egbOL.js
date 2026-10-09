import{r as b,j as S}from"./index-CdiR0C0d.js";function z(t,r){const a=Math.max(1,Math.round(t/Math.max(4,r)));return{count:a,step:t/a}}function te(t){return t>=22?1:t>=11?2:5}function H(t){return Math.min(30,Math.max(16,Math.round(t*.72)))}function Y(t){let r=t.trim().replace("#","");return r.length===3&&(r=r[0]+r[0]+r[1]+r[1]+r[2]+r[2]),/^[0-9a-fA-F]{6}$/.test(r)?[0,2,4].map(a=>Math.pow(parseInt(r.slice(a,a+2),16)/255,2.2)):[0,0,0]}function ne(t,r,a,l,g){t.setTransform(l,0,0,l,0,0),t.globalCompositeOperation="source-over",t.globalAlpha=1,t.fillStyle="#000",t.fillRect(0,0,r,a),t.globalCompositeOperation="lighter";const o=H(g),A=r-2*o,R=a-2*o;if(A<=0||R<=0)return;t.fillStyle="#0f0",t.fillRect(0,0,r,o),t.fillRect(0,a-o,r,o),t.fillRect(0,o,o,R),t.fillRect(r-o,o,o,R);const f=z(A,g),c=z(R,g),u=n=>o+n*f.step,d=n=>a-o-n*c.step,E=(n,e)=>(Math.round(n*l)+e*l%2/2)/l;t.strokeStyle="#f00",t.fillStyle="#f00";const h=(n,e,i,M)=>{t.beginPath(),t.moveTo(n,e),t.lineTo(i,M),t.stroke()};for(const n of[!1,!0]){t.lineWidth=n?2:1,t.globalAlpha=n?.92:.2;for(let e=0;e<=f.count;e++){if((e%5===0||e===f.count)!==n)continue;const i=E(u(e),t.lineWidth);h(i,o,i,a-o)}for(let e=0;e<=c.count;e++){if((e%5===0||e===c.count)!==n)continue;const i=E(d(e),t.lineWidth);h(o,i,r-o,i)}}t.save(),t.beginPath(),t.rect(o,o,A,R),t.clip(),t.lineWidth=1.25,t.globalAlpha=.85;const m=Math.max(f.count,c.count);h(u(0),d(0),u(m),d(m)),t.restore();const y=te(Math.min(f.step,c.step));t.lineWidth=1,t.font="500 "+Math.round(o*.36)+"px ui-sans-serif, system-ui, sans-serif",t.textAlign="center",t.textBaseline="middle";const T=o*.42;for(let n=0;n<=f.count;n++){const e=E(u(n),1),i=o*(n%5===0?.36:.2);t.globalAlpha=.9,h(e,o,e,o-i),h(e,a-o,e,a-o+i),n%y===0&&(t.globalAlpha=.8,t.fillText(String(n),u(n),T),t.fillText(String(n),u(n),a-T))}for(let n=0;n<=c.count;n++){const e=E(d(n),1),i=o*(n%5===0?.36:.2);t.globalAlpha=.9,h(o,e,o-i,e),h(r-o,e,r-o+i,e),n%y===0&&(t.globalAlpha=.8,t.fillText(String(n),T,d(n)),t.fillText(String(n),r-T,d(n)))}t.globalAlpha=1}const oe=`#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`,re=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform sampler2D uInk;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uMat;
uniform vec3 uSun;
uniform float uIntensity;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}

float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
  return s / 0.9375;
}

// How much sun reaches this point of the desk, 0..1.
float sunlight(vec2 p, float t) {
  // The blind hangs still but the sun direction breathes a little as the
  // blind drifts in a draught — rotation and slide, never a warp.
  float a = -0.72 + 0.03 * sin(t * 0.19) + 0.015 * sin(t * 0.47 + 1.3);
  vec2 dir = vec2(cos(a), sin(a));
  vec2 nrm = vec2(-dir.y, dir.x);
  float along = dot(p, dir);
  float across = dot(p, nrm);

  // Slats. Penumbra widens where the shadow falls further from the blind,
  // so the band edges soften unevenly along their length.
  // A second, slower term makes the slats uneven, like a blind that hangs
  // a little crooked, so the bands never read as a stripe pattern.
  float pen = 0.55 + 0.45 * noise(vec2(along * 0.9 + 4.0, t * 0.03));
  float s = across * 3.1 + 0.25 * sin(t * 0.11) + t * 0.012;
  float band = sin(6.2831853 * s) + 0.45 * sin(6.2831853 * s * 0.43 + 1.7);
  float slats = smoothstep(-pen, pen, band + 0.15);

  // Foliage outside the window: large, far away, so its shadow is blurry.
  // It drifts with a gusting wind and slowly changes shape.
  vec2 wind = vec2(t * 0.03 + 0.05 * sin(t * 0.37), 0.04 * sin(t * 0.23) + 0.02 * sin(t * 0.83));
  float f = fbm(p * 1.6 + wind) * 0.7 + fbm(p * 2.8 - wind * 1.4 + 9.0) * 0.3;
  float leaves = mix(0.3, 1.0, smoothstep(0.36, 0.6, f));

  // The window only throws a pool of light: brighter toward the top-left,
  // falling off toward the far corner.
  float pool = 0.45 + 0.55 * smoothstep(-1.1, 0.7, dot(p, vec2(-0.55, 0.83)) + 0.12 * sin(t * 0.05));

  return slats * leaves * pool;
}

void main() {
  vec2 frag = vUv * uResolution;
  float m = min(uResolution.x, uResolution.y);
  vec2 p = (frag - 0.5 * uResolution) / m;
  float t = uTime;

  vec2 texel = 1.0 / uResolution;
  vec4 ink = texture(uInk, vUv);
  // a hair of bloom around the white lines, the way printed ink glows in sun
  float glow = 0.25 * (texture(uInk, vUv + vec2(2.0, 0.0) * texel).r
                     + texture(uInk, vUv - vec2(2.0, 0.0) * texel).r
                     + texture(uInk, vUv + vec2(0.0, 2.0) * texel).r
                     + texture(uInk, vUv - vec2(0.0, 2.0) * texel).r);

  // vinyl: fine grain plus soft mottling from years of blade marks
  float grain = hash(floor(frag)) - 0.5;
  float mottle = fbm(p * 5.0 + 3.1) - 0.5;
  vec3 mat = uMat * (1.0 + grain * 0.06 + mottle * 0.14);
  mat *= mix(1.0, 0.6, ink.g);
  vec3 albedo = mat;

  float L = sunlight(p, t) * uIntensity;

  // cool skylight fills the shadows; warm sun lands in the gaps
  vec3 sky = vec3(0.5, 0.66, 0.74);
  vec3 col = albedo * (sky * 0.95 + uSun * L * 1.3);
  // the vinyl is slightly translucent: lit patches glow a richer, yellower green
  col += uMat * uSun * vec3(0.9, 1.15, 0.6) * L * 0.55;
  // printed ink stays near-white in shade, and blooms a touch in sun
  col = mix(col, vec3(0.78, 0.85, 0.82) + uSun * L * 0.5, ink.r * 0.92);
  col += vec3(0.8) * glow * (0.05 + 0.12 * L);

  // filmic-ish rolloff, vignette, back to sRGB, dither against banding
  col = 1.0 - exp(-col * 1.2);
  vec2 v = vUv - 0.5;
  col *= 1.0 - 0.35 * dot(v, v);
  col = pow(col, vec3(1.0 / 2.2));
  col += (hash(frag + fract(t) * 91.7) - 0.5) / 255.0;
  outColor = vec4(col, 1.0);
}`;function ae(){const[t,r]=b.useState(!1);return b.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)");r(a.matches);const l=g=>r(g.matches);return a.addEventListener("change",l),()=>a.removeEventListener("change",l)},[]),t}function ie({children:t,color:r="#0c7f55",sunColor:a="#fff0cf",intensity:l=1,speed:g=1,unit:o=32,height:A="100svh",className:R=""}){const f=b.useRef(null),c=ae(),[u,d]=b.useState(!1),[E,h]=b.useState(0),m=b.useRef({color:r,sunColor:a,intensity:l,speed:g,unit:o});m.current={color:r,sunColor:a,intensity:l,speed:g,unit:o};const y=b.useRef(o);b.useEffect(()=>{const n=f.current;if(!n)return;const e=n.getContext("webgl2",{antialias:!1,alpha:!1}),i=document.createElement("canvas"),M=i.getContext("2d");if(!e||!M){d(!0);return}const I=(s,p)=>{const x=e.createShader(s);return e.shaderSource(x,p),e.compileShader(x),x},F=I(e.VERTEX_SHADER,oe),D=I(e.FRAGMENT_SHADER,re),v=e.createProgram();if(e.attachShader(v,F),e.attachShader(v,D),e.linkProgram(v),e.deleteShader(F),e.deleteShader(D),!e.getProgramParameter(v,e.LINK_STATUS)){e.isContextLost()||d(!0),e.deleteProgram(v);return}e.useProgram(v);const C=e.createVertexArray(),X=e.createBuffer();e.bindVertexArray(C),e.bindBuffer(e.ARRAY_BUFFER,X),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);const G=e.getAttribLocation(v,"aPos");e.enableVertexAttribArray(G),e.vertexAttribPointer(G,2,e.FLOAT,!1,0,0);const k=e.createTexture();e.bindTexture(e.TEXTURE_2D,k),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0);const w=s=>e.getUniformLocation(v,s),q=w("uInk"),K=w("uResolution"),$=w("uTime"),J=w("uMat"),Q=w("uSun"),Z=w("uIntensity");e.uniform1i(q,0);let P=!0;const ee=()=>{const s=Math.min(window.devicePixelRatio||1,2),p=Math.max(1,n.clientWidth),x=Math.max(1,n.clientHeight);n.width=i.width=Math.round(p*s),n.height=i.height=Math.round(x*s),ne(M,p,x,s,m.current.unit),y.current=m.current.unit,e.bindTexture(e.TEXTURE_2D,k),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,i),e.viewport(0,0,n.width,n.height),P=!1},L=s=>{(P||y.current!==m.current.unit)&&ee();const p=m.current;e.uniform2f(K,n.width,n.height),e.uniform1f($,s),e.uniform3fv(J,Y(p.color)),e.uniform3fv(Q,Y(p.sunColor)),e.uniform1f(Z,p.intensity),e.drawArrays(e.TRIANGLES,0,3)},U=40;let _=0,N=U,j=performance.now();const B=s=>{N+=Math.min(.1,(s-j)/1e3)*m.current.speed,j=s,L(N),_=requestAnimationFrame(B)},W=new ResizeObserver(()=>{P=!0,c&&L(U)});W.observe(n),c?L(U):_=requestAnimationFrame(B);const O=s=>{s.preventDefault(),cancelAnimationFrame(_)},V=()=>h(s=>s+1);return n.addEventListener("webglcontextlost",O),n.addEventListener("webglcontextrestored",V),()=>{cancelAnimationFrame(_),W.disconnect(),n.removeEventListener("webglcontextlost",O),n.removeEventListener("webglcontextrestored",V),e.deleteTexture(k),e.deleteBuffer(X),e.deleteVertexArray(C),e.deleteProgram(v)}},[c,E]);const T=H(o);return S.jsxs("section",{className:"relative w-full overflow-hidden "+R,style:{height:A,backgroundColor:r,backgroundImage:u?"linear-gradient(rgba(255,255,255,0.7) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.7) 2px, transparent 2px)":void 0,backgroundSize:u?o*5+"px "+o*5+"px":void 0,backgroundPosition:T+"px "+T+"px"},children:[!u&&S.jsx("canvas",{ref:f,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",maxWidth:"none",display:"block"}}),t!=null&&S.jsx("div",{className:"absolute inset-0 flex items-center justify-center p-8 text-center",children:t})]})}function le(){return S.jsx("div",{className:"relative w-full",children:S.jsx(ie,{})})}export{le as default};
