import{r as a,j as o}from"./index-CdiR0C0d.js";const K={cinema:{chroma:.8,grain:.15,scanlines:.8,contrast:1.4,monochrome:!1},chroma:{chroma:2.8,grain:.22,scanlines:1,contrast:1.6,monochrome:!1},highcontrast:{chroma:.5,grain:.2,scanlines:.6,contrast:2.2,monochrome:!0},subtle:{chroma:.1,grain:.05,scanlines:0,contrast:1.1,monochrome:!1}},J=["tcp-firstChar","tcp-fromBottomOutRight","tcp-fromLeftOutTop","tcp-fromBottomOutLeft","tcp-fromRightOutTop"],O=600,it=1200;function st(_){const i=Math.min(1,Math.max(0,_));if(i<.35)return Math.round(42*(1-Math.pow(1-i/.35,2.2)));if(i<.75)return Math.round(42+6*((i-.35)/.4));const d=(i-.75)/.25;return Math.round(48+52*(d*d*(3-2*d)))}function ct(_,i=1){return Math.max(3200,_*O+O)/i}const ut=`#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,lt=`#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_video;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_videoSize;
uniform float u_chroma;
uniform float u_grain;
uniform float u_scanlines;
uniform float u_contrast;
uniform int u_mono;
uniform int u_hasVideo;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233) + fract(u_time))) * 43758.5453123);
}

// Stand-in plate for when no reel is supplied, or the reel has not arrived yet.
// Slow drifting luma, so the grain and scanlines have something to bite on.
vec3 plate(vec2 uv) {
  float a = sin(uv.x * 3.0 + u_time * 0.15) * cos(uv.y * 4.0 - u_time * 0.11);
  float b = sin(length(uv - vec2(0.5 + 0.2 * sin(u_time * 0.07), 0.5)) * 9.0 - u_time * 0.5);
  return vec3(0.22 + 0.18 * a + 0.12 * b);
}

vec3 sampleSource(vec2 uv) {
  if (u_hasVideo == 1) return texture(u_video, uv).rgb;
  return plate(uv);
}

void main() {
  vec2 uv = v_uv;

  // object-fit: cover, so the reel is never stretched
  float screenAspect = u_resolution.x / max(u_resolution.y, 1.0);
  float videoAspect = u_videoSize.x / max(u_videoSize.y, 1.0);
  vec2 uvCover = uv;
  if (screenAspect > videoAspect) {
    uvCover.y = (uv.y - 0.5) * (videoAspect / screenAspect) + 0.5;
  } else {
    uvCover.x = (uv.x - 0.5) * (screenAspect / videoAspect) + 0.5;
  }

  vec2 distFromCenter = uvCover - 0.5;
  float dist = dot(distFromCenter, distFromCenter);
  vec2 chromaOffset = distFromCenter * (u_chroma * (0.015 + dist * 0.035));

  vec3 color = vec3(
    sampleSource(uvCover + chromaOffset).r,
    sampleSource(uvCover).g,
    sampleSource(uvCover - chromaOffset).b
  );

  if (u_mono == 1) {
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    color = vec3(clamp((lum - 0.5) * u_contrast + 0.5, 0.0, 1.0));
  } else {
    color = (color - 0.5) * u_contrast + 0.5;
  }

  if (u_scanlines > 0.0) {
    float scan = sin(uv.y * u_resolution.y * 0.75) * 0.5 + 0.5;
    color *= (1.0 - u_scanlines * 0.25 * scan);
  }

  color += (hash(uv * u_resolution.xy) - 0.5) * u_grain;
  color *= 1.0 - smoothstep(0.4, 1.4, length(distFromCenter) * 1.5);

  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`,mt=`
.tcp-root, .tcp-root * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
.tcp-root { user-select: none; }

.tcp-dest {
  position: absolute; inset: 0; width: 100%; height: 100%;
  opacity: 0; transform: scale(0.96); pointer-events: none;
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.tcp-dest[data-active="true"] { opacity: 1; transform: scale(1); pointer-events: auto; }

.tcp-clipper {
  position: absolute; inset: 0; z-index: 100;
  background: #000; overflow: hidden; opacity: 1;
  transition: opacity 0.75s cubic-bezier(0.87, 0, 0.13, 1);
}
.tcp-clipper[data-exited="true"] { opacity: 0; pointer-events: none; }

/* Tailwind Preflight sets height:auto and max-width:100% on video and canvas,
   which collapses them to nothing inside an absolutely-positioned parent. */
.tcp-root video, .tcp-root canvas {
  position: absolute; inset: 0; width: 100%; height: 100%;
  max-width: none; object-fit: cover; display: block;
}
.tcp-root video { z-index: 5; }
.tcp-root canvas { z-index: 10; pointer-events: none; }
.tcp-root video[data-textured="true"] { opacity: 0; pointer-events: none; }

.tcp-wrapper { position: absolute; inset: 0; z-index: 30; mix-blend-mode: difference; pointer-events: none; }

.tcp-scene {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: var(--tcp-cube); height: var(--tcp-cube);
  perspective: 800px; display: flex; align-items: center; justify-content: center; z-index: 35;
}
.tcp-cube {
  position: relative; width: 100%; height: 100%;
  font-family: "Saira Extra Condensed", "Sofia Sans Extra Condensed", "Oswald", "Archivo Narrow", Impact, Haettenschweiler, sans-serif;
  font-size: var(--tcp-cube); font-weight: 900; font-stretch: extra-condensed;
  color: #f6f6f6; transform-style: preserve-3d; transform: scaleY(1.3); transform-origin: center;
}
.tcp-char {
  position: absolute; inset: 0; width: 100%; height: 100%; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; backface-visibility: hidden;
}
.tcp-char span {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  display: block; line-height: 0.8; font-stretch: extra-condensed;
}

@keyframes tcpFirstChar {
  0% { opacity: 0; transform: translateX(100%) rotateY(90deg) rotateX(0deg); }
  50% { opacity: 1; transform: translateX(0) rotateY(0deg) rotateX(0deg); }
  100% { opacity: 0.5; transform: translateY(-100%) rotateY(0deg) rotateX(90deg); }
}
@keyframes tcpFromBottomOutRight {
  0% { opacity: 0; transform: translateY(100%) rotateY(0deg) rotateX(-90deg); }
  50% { opacity: 1; transform: translateY(0) rotateY(0deg) rotateX(0deg); }
  100% { opacity: 0.5; transform: translateX(100%) rotateY(90deg) rotateX(0deg); }
}
@keyframes tcpFromLeftOutTop {
  0% { opacity: 0; transform: translateX(-100%) rotateY(-90deg) rotateX(0deg); }
  50% { opacity: 1; transform: translateX(0) rotateY(0deg) rotateX(0deg); }
  100% { opacity: 0.5; transform: translateY(-100%) rotateY(0deg) rotateX(90deg); }
}
@keyframes tcpFromBottomOutLeft {
  0% { opacity: 0; transform: translateY(100%) rotateY(0deg) rotateX(-90deg); }
  50% { opacity: 1; transform: translateY(0) rotateY(0deg) rotateX(0deg); }
  100% { opacity: 0.5; transform: translateX(-100%) rotateY(-90deg) rotateX(0deg); }
}
@keyframes tcpFromRightOutTop {
  0% { opacity: 0; transform: translateX(100%) rotateY(90deg) rotateX(0deg); }
  50% { opacity: 1; transform: translateX(0) rotateY(0deg) rotateX(0deg); }
  100% { opacity: 0.5; transform: translateY(-100%) rotateY(0deg) rotateX(90deg); }
}

.tcp-firstChar { animation-name: tcpFirstChar; transform-origin: left bottom; }
.tcp-fromBottomOutRight { animation-name: tcpFromBottomOutRight; transform-origin: left top; }
.tcp-fromLeftOutTop { animation-name: tcpFromLeftOutTop; transform-origin: right bottom; }
.tcp-fromBottomOutLeft { animation-name: tcpFromBottomOutLeft; transform-origin: right top; }
.tcp-fromRightOutTop { animation-name: tcpFromRightOutTop; transform-origin: left bottom; }

.tcp-perc {
  position: absolute; top: calc(50% + 72px); left: 0; width: 100%;
  display: flex; justify-content: center; align-items: center;
  font-size: 13px; font-weight: 700; letter-spacing: 0.06em; color: #f6f6f6; z-index: 40;
  /* Slow on the way out, quick on the way back: the exit is the beat, but a
     matching 0.8s return left the screen empty while the first letter tumbled. */
  transition: opacity 0.25s ease;
}
.tcp-perc[data-exiting="true"] {
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.87, 0, 0.13, 1);
}
/* The slide has to happen on an inner span inside a clipped box. On the
   container, translateY(100%) resolves against one line of text and the
   counter just nudges 20px instead of leaving the frame. */
.tcp-perc-mask { display: inline-flex; overflow: hidden; }
.tcp-perc-inner {
  display: inline-block;
  transition: transform 0.25s ease;
}
.tcp-perc[data-exiting="true"] .tcp-perc-inner {
  transform: translate3d(0, 110%, 0);
  transition: transform 0.8s cubic-bezier(0.87, 0, 0.13, 1);
}
.tcp-perc-value { min-width: 26px; text-align: right; }

@media (max-width: 840px) {
  .tcp-scene { --tcp-cube: 64px; }
}

@media (prefers-reduced-motion: reduce) {
  .tcp-root .tcp-char { animation: none !important; opacity: 0 !important; transform: none !important; }
  .tcp-root .tcp-char:first-child { opacity: 1 !important; }
  .tcp-root .tcp-dest, .tcp-root .tcp-clipper, .tcp-root .tcp-perc { transition: none !important; }
}
`;function dt({children:_,word:i="GLITCH",videoSrc:d="https://mdn.github.io/shared-assets/videos/flower.mp4",shaderPreset:T="chroma",grade:Y,loop:y=!1,durationMs:Q,speed:p=1,cubeSize:Z="88px",height:$="100svh",onComplete:L,className:tt=""}){const[D,E]=a.useState(0),[R,S]=a.useState("loading"),[P,et]=a.useState(0),[m,j]=a.useState(!1),[ot,z]=a.useState(!1),w=a.useRef(null),N=a.useRef(null),f=a.useRef(L);f.current=L;const k=a.useMemo(()=>({...T==="off"?K.subtle:K[T],...Y}),[T,Y]),B=a.useRef(k);B.current=k;const A=a.useMemo(()=>i.toUpperCase().split(""),[i]),U=Q??ct(A.length,p),F=T!=="off";a.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)");j(e.matches);const t=l=>j(l.matches);return e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]),a.useEffect(()=>{const e=N.current;if(!e||!F||m)return;const t=e.getContext("webgl2",{alpha:!1,antialias:!0});if(!t)return;const l=(r,u)=>{const x=t.createShader(r);return x?(t.shaderSource(x,u),t.compileShader(x),t.getShaderParameter(x,t.COMPILE_STATUS)?x:(t.deleteShader(x),null)):null},v=l(t.VERTEX_SHADER,ut),g=l(t.FRAGMENT_SHADER,lt),n=t.createProgram();if(!v||!g||!n||(t.attachShader(n,v),t.attachShader(n,g),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS)))return;z(!0);const h=t.getAttribLocation(n,"a_position"),X=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,X),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);const s=r=>t.getUniformLocation(n,r),c={video:s("u_video"),time:s("u_time"),res:s("u_resolution"),videoSize:s("u_videoSize"),chroma:s("u_chroma"),grain:s("u_grain"),scanlines:s("u_scanlines"),contrast:s("u_contrast"),mono:s("u_mono"),hasVideo:s("u_hasVideo")},M=t.createTexture();t.bindTexture(t.TEXTURE_2D,M),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR);const I=Math.min(window.devicePixelRatio||1,2),G=()=>{const r=Math.max(1,Math.round(e.clientWidth*I)),u=Math.max(1,Math.round(e.clientHeight*I));(e.width!==r||e.height!==u)&&(e.width=r,e.height=u),t.viewport(0,0,e.width,e.height)},V=new ResizeObserver(G);V.observe(e),G();let C=0,H=!1,b=!1,q=0;const W=()=>{if(H)return;q+=.016;const r=w.current;if(r&&r.readyState>=2&&r.videoWidth>0)try{t.bindTexture(t.TEXTURE_2D,M),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r),b=!0}catch{b=!1}const u=B.current;t.useProgram(n),t.bindBuffer(t.ARRAY_BUFFER,X),t.enableVertexAttribArray(h),t.vertexAttribPointer(h,2,t.FLOAT,!1,0,0),t.uniform1i(c.video,0),t.uniform1f(c.time,q),t.uniform2f(c.res,e.width,e.height),t.uniform2f(c.videoSize,b&&r?r.videoWidth:e.width,b&&r?r.videoHeight:e.height),t.uniform1f(c.chroma,u.chroma),t.uniform1f(c.grain,u.grain),t.uniform1f(c.scanlines,u.scanlines),t.uniform1f(c.contrast,u.contrast),t.uniform1i(c.mono,u.monochrome?1:0),t.uniform1i(c.hasVideo,b?1:0),t.drawArrays(t.TRIANGLES,0,6),C=requestAnimationFrame(W)};return C=requestAnimationFrame(W),()=>{H=!0,z(!1),cancelAnimationFrame(C),V.disconnect(),t.deleteProgram(n),t.deleteShader(v),t.deleteShader(g),t.deleteTexture(M),t.deleteBuffer(X)}},[F,m]),a.useEffect(()=>{var e;m||(e=w.current)==null||e.play().catch(()=>{})},[d,m]),a.useEffect(()=>{var g;if(m){E(100),y||(S("unlocked"),(g=f.current)==null||g.call(f));return}E(0),S("loading");const e=Date.now();let t=0;const l=[],v=()=>{const n=Math.min(1,(Date.now()-e)/U);if(E(st(n)),n<1){t=requestAnimationFrame(v);return}if(E(100),l.push(setTimeout(()=>S("exiting"),250/p)),y){l.push(setTimeout(()=>et(h=>h+1),250/p+900));return}l.push(setTimeout(()=>{var h;S("unlocked"),(h=f.current)==null||h.call(f)},550/p+750))};return t=requestAnimationFrame(v),()=>{cancelAnimationFrame(t),l.forEach(clearTimeout)}},[U,p,m,y,P]);const rt=it/p/1e3,at=O/p/1e3,nt=R!=="loading";return o.jsxs("div",{className:"tcp-root relative w-full overflow-hidden bg-black text-[#f6f6f6] "+tt,style:{height:$,fontFamily:"'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace","--tcp-cube":Z},children:[o.jsx("style",{children:mt}),!y&&o.jsx("div",{className:"tcp-dest","data-active":R==="unlocked",children:_}),R!=="unlocked"&&o.jsxs("div",{className:"tcp-clipper","data-exited":!y&&R==="exiting",children:[d?o.jsx("video",{ref:w,src:d,width:1920,height:1080,autoPlay:!m,loop:!0,muted:!0,playsInline:!0,crossOrigin:"anonymous","data-textured":ot}):null,F&&!m&&o.jsx("canvas",{ref:N,"aria-hidden":"true"}),o.jsxs("div",{className:"tcp-wrapper",role:"progressbar","aria-label":"Loading","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":D,children:[o.jsx("div",{className:"tcp-scene",children:o.jsx("div",{className:"tcp-cube",children:A.map((e,t)=>o.jsx("div",{className:"tcp-char "+J[t%J.length],style:{animationDuration:rt.toFixed(2)+"s",animationDelay:(t*at).toFixed(2)+"s",animationTimingFunction:"cubic-bezier(0.83, 0, 0.17, 1)",animationFillMode:t===A.length-1?"forwards":"both"},children:o.jsx("span",{children:e})},String(t)+e))},P)}),o.jsxs("div",{className:"tcp-perc","data-exiting":nt,children:[o.jsx("span",{className:"tcp-perc-mask",children:o.jsx("span",{className:"tcp-perc-inner tcp-perc-value",children:D})}),o.jsx("span",{className:"tcp-perc-mask",children:o.jsx("span",{className:"tcp-perc-inner",children:"%"})})]})]})]})]})}function ft(){return o.jsx(dt,{loop:!0})}export{ft as default};
