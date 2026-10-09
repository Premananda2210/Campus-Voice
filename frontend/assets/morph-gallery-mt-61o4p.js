import{r as c,j as l}from"./index-CdiR0C0d.js";const X=(t,i,f)=>i<=0?0:f?(t%i+i)%i:Math.min(Math.max(t,0),i-1),be=t=>{const i=Math.min(Math.max(t,0),1);return i<.5?16*i**5:1-(-2*i+2)**5/2},we=`
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,_e=`
precision highp float;

uniform sampler2D u_from;
uniform sampler2D u_to;
uniform float u_progress;
uniform vec2 u_resolution;
uniform float u_fromAspect;
uniform float u_toAspect;
uniform float u_scale;
uniform float u_direction;
uniform float u_edge;
uniform float u_drift;

varying vec2 v_uv;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
   -0.577350269189626,
    0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0)
  );
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 v) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * snoise(v);
    v *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// The drift below pushes UVs past the edge of the image, and CLAMP_TO_EDGE
// answers that by smearing the last row of pixels into long vertical streaks.
// Reflecting instead keeps real picture there. Done in the shader because
// MIRRORED_REPEAT is illegal on the non-power-of-two textures photos produce.
vec2 mirror(vec2 uv) {
  return 1.0 - abs(1.0 - mod(uv, 2.0));
}

vec2 coverUV(vec2 uv, float imgAspect) {
  float canvasAspect = u_resolution.x / u_resolution.y;
  vec2 scale = (canvasAspect > imgAspect)
    ? vec2(1.0, imgAspect / canvasAspect)
    : vec2(canvasAspect / imgAspect, 1.0);
  return mirror((uv - 0.5) * scale + 0.5);
}

void main() {
  // Widen the sweep by one edge at each end, so progress 0 and 1 are fully
  // one image or the other rather than already half-dissolved.
  float adjusted = u_progress * (1.0 + 2.0 * u_edge) - u_edge;

  float noise = fbm(v_uv * u_scale + vec2(0.0, u_progress * u_direction)) * 0.5 + 0.5;
  // Bias the threshold by how bright the incoming frame is here: its lit areas
  // cross the front first, so the new image appears to burn through the old.
  noise = smoothstep(
    0.0,
    2.0,
    length(texture2D(u_to, coverUV(v_uv, u_toAspect)).rgb) + noise
  );

  float mixFactor = 1.0 - smoothstep(adjusted - u_edge, adjusted + u_edge, noise);

  // Both frames slide, by different amounts and in opposite directions, so the
  // tatters have parallax against each other instead of sitting in one plane.
  vec2 fromUV = coverUV(
    v_uv + vec2(0.0, noise * u_progress * u_drift * u_direction),
    u_fromAspect
  );
  vec2 toUV = coverUV(
    v_uv + vec2(0.0, noise * (1.0 - u_progress) * -0.5 * u_drift * u_direction),
    u_toAspect
  );

  gl_FragColor = mix(texture2D(u_from, fromUV), texture2D(u_to, toUV), mixFactor);
}
`,$=(t,i,f)=>{const n=t.createShader(i);if(!n)throw new Error("could not create shader");if(t.shaderSource(n,f),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS)){const g=t.getShaderInfoLog(n);throw t.deleteShader(n),new Error("shader compile failed: "+g)}return n},Ee=(t,i,f)=>{const n=$(t,t.VERTEX_SHADER,i),g=$(t,t.FRAGMENT_SHADER,f),u=t.createProgram();if(!u)throw new Error("could not create program");if(t.attachShader(u,n),t.attachShader(u,g),t.linkProgram(u),t.deleteShader(n),t.deleteShader(g),!t.getProgramParameter(u,t.LINK_STATUS)){const h=t.getProgramInfoLog(u);throw t.deleteProgram(u),new Error("program link failed: "+h)}return u},ye=t=>new Promise((i,f)=>{const n=new Image;n.crossOrigin="anonymous",n.decoding="async",n.onload=()=>i(n),n.onerror=()=>f(new Error("could not load "+t)),n.src=t});function Re({items:t,height:i="100svh",duration:f=1500,noiseScale:n=3.5,edge:g=.15,drift:u=.5,loop:h=!0,autoplay:U=0,arrows:ee=!0,thumbnails:te=!0,index:T,defaultIndex:re=0,onIndexChange:A,className:oe=""}){const C=c.useRef(null),[ne,ae]=c.useState(()=>X(re,t.length,h)),o=T===void 0?ne:X(T,t.length,h),[se,S]=c.useState(!1),[ie,ce]=c.useState(!1),[le,ue]=c.useState(0),[R,de]=c.useState(!1),[z,_]=c.useState(!1);c.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)"),e=()=>de(r.matches);return e(),r.addEventListener("change",e),()=>r.removeEventListener("change",e)},[]);const x=c.useCallback(r=>{const e=X(r,t.length,h);T===void 0&&ae(e),A==null||A(e)},[T,t.length,h,A]),B=c.useRef({duration:f,noiseScale:n,edge:g,drift:u,reduced:R});B.current={duration:f,noiseScale:n,edge:g,drift:u,reduced:R};const D=c.useRef(null),j=c.useRef(o);c.useEffect(()=>{j.current!==o&&(D.current={from:j.current,to:o},j.current=o)},[o]);const fe=t.map(r=>r.src).join(`
`);c.useEffect(()=>{const r=C.current;if(!r||t.length===0)return;const e=r.getContext("webgl",{alpha:!1,antialias:!1})??r.getContext("experimental-webgl");if(!e){S(!0);return}let v=null,k=null;const E=t.map(()=>null),F=t.map(()=>1);let L=0,y=!1,N=o,I=o,P=1,W=0,O=1;const q=a=>{a.preventDefault(),cancelAnimationFrame(L)},H=()=>ue(a=>a+1);r.addEventListener("webglcontextlost",q),r.addEventListener("webglcontextrestored",H);const Y=()=>{const a=Math.min(window.devicePixelRatio||1,2),s=Math.round(r.clientWidth*a),m=Math.round(r.clientHeight*a);s===0||m===0||r.width===s&&r.height===m||(r.width=s,r.height=m,e.viewport(0,0,s,m))},K=new ResizeObserver(Y);K.observe(r);let d={};const Q=a=>E[a]??E.find(s=>s)??null,ge=()=>{if(y)return;const a=B.current,s=D.current;if(s&&(D.current=null,s.from!==s.to)){N=s.from,I=s.to,P=0,W=performance.now();const p=t.length;O=(h?(s.to-s.from+p)%p*2<=p:s.to>s.from)?1:-1}if(P<1){const p=a.reduced?0:Math.max(a.duration,1),w=performance.now()-W;P=p===0?1:be(Math.min(w/p,1))}const m=Q(N),b=Q(I);!m||!b||(e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,m),e.uniform1i(d.from,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,b),e.uniform1i(d.to,1),e.uniform1f(d.progress,P),e.uniform2f(d.resolution,r.width,r.height),e.uniform1f(d.fromAspect,F[N]??1),e.uniform1f(d.toAspect,F[I]??1),e.uniform1f(d.scale,a.noiseScale),e.uniform1f(d.direction,O),e.uniform1f(d.edge,Math.max(a.edge,.001)),e.uniform1f(d.drift,a.drift),e.drawArrays(e.TRIANGLE_STRIP,0,4))},J=()=>{ge(),L=requestAnimationFrame(J)};return(async()=>{try{v=Ee(e,we,_e),e.useProgram(v),k=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,k),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const a=e.getAttribLocation(v,"a_position");e.enableVertexAttribArray(a),e.vertexAttribPointer(a,2,e.FLOAT,!1,0,0);for(const b of["from","to","progress","resolution","fromAspect","toAspect","scale","direction","edge","drift"])d[b]=e.getUniformLocation(v,"u_"+b);e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0);let s=!1,m=0;await Promise.all(t.map((b,p)=>ye(b.src).then(w=>{if(y)return;const Z=e.createTexture();e.bindTexture(e.TEXTURE_2D,Z),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,w),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),E[p]=Z,F[p]=w.naturalWidth/Math.max(w.naturalHeight,1),s||(s=!0,Y(),ce(!0),L=requestAnimationFrame(J))},()=>{m+=1,m===t.length&&!y&&S(!0)})))}catch{y||S(!0)}})(),()=>{y=!0,cancelAnimationFrame(L),K.disconnect(),r.removeEventListener("webglcontextlost",q),r.removeEventListener("webglcontextrestored",H);for(const a of E)a&&e.deleteTexture(a);k&&e.deleteBuffer(k),v&&e.deleteProgram(v),E.fill(null)}},[fe,le,t.length,h]),c.useEffect(()=>{if(!U||R||z||t.length<2)return;const r=window.setInterval(()=>x(o+1),Math.max(U,600));return()=>window.clearInterval(r)},[U,R,z,o,x,t.length]),c.useEffect(()=>{const r=()=>_(document.hidden);return document.addEventListener("visibilitychange",r),()=>document.removeEventListener("visibilitychange",r)},[]);const M=c.useRef(null),he=r=>{M.current=r.clientX},me=r=>{const e=M.current;if(M.current=null,e===null)return;const v=r.clientX-e;Math.abs(v)>48&&x(o+(v<0?1:-1))},ve=r=>{r.key==="ArrowLeft"?(r.preventDefault(),x(o-1)):r.key==="ArrowRight"&&(r.preventDefault(),x(o+1))},pe=!h&&o===0,xe=!h&&o===t.length-1,G=t[o],V="absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-25";return l.jsxs("section",{className:"relative w-full overflow-hidden bg-black "+oe,style:{height:i},role:"region","aria-roledescription":"carousel","aria-label":"Image gallery",tabIndex:0,onKeyDown:ve,onPointerDown:he,onPointerUp:me,onMouseEnter:()=>_(!0),onMouseLeave:()=>_(!1),onFocus:()=>_(!0),onBlur:()=>_(!1),children:[se?t.map((r,e)=>l.jsx("img",{src:r.src,alt:r.alt??"",className:"absolute inset-0 block h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none",style:{maxWidth:"none",opacity:e===o?1:0},"aria-hidden":e!==o},r.src)):l.jsx("canvas",{ref:C,className:"absolute inset-0 block h-full w-full",style:{opacity:ie?1:0,transition:"opacity 400ms ease"},"aria-hidden":"true"}),l.jsx("div",{className:"pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-56 bg-gradient-to-b from-transparent to-black/65","aria-hidden":"true"}),ee&&t.length>1&&l.jsxs(l.Fragment,{children:[l.jsx("button",{type:"button",className:V+" left-4 sm:left-8",onClick:()=>x(o-1),disabled:pe,"aria-label":"Previous image",children:l.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:l.jsx("polyline",{points:"15 18 9 12 15 6"})})}),l.jsx("button",{type:"button",className:V+" right-4 sm:right-8",onClick:()=>x(o+1),disabled:xe,"aria-label":"Next image",children:l.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:l.jsx("polyline",{points:"9 18 15 12 9 6"})})})]}),te&&t.length>1&&l.jsx("ul",{className:"absolute inset-x-0 bottom-8 z-10 mx-auto flex w-max max-w-[calc(100%-2rem)] gap-2 list-none overflow-x-auto scroll-smooth p-0 pb-2.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-white/30 max-sm:hidden",children:t.map((r,e)=>l.jsx("li",{className:"shrink-0 list-none",children:l.jsx("button",{type:"button",onClick:()=>x(e),"aria-current":e===o,"aria-label":r.alt?"Show "+r.alt:"Show image "+(e+1),className:"block cursor-pointer overflow-hidden rounded border-2 bg-transparent p-0 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white "+(e===o?"border-white opacity-100":"border-transparent opacity-55 hover:opacity-85"),children:l.jsx("img",{src:r.thumb??r.src,alt:"",width:80,height:50,loading:"lazy",decoding:"async",className:"block object-cover",style:{maxWidth:"none",width:80,height:50}})})},r.src))}),l.jsxs("span",{className:"sr-only","aria-live":"polite",children:[G?G.alt??"Image "+(o+1):""," — ",o+1," of ",t.length]})]})}export{Re as M};
