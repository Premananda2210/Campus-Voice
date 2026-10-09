import{r as f,j as v}from"./index-CdiR0C0d.js";const Se=4,ke=`
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,Me=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
// Seven packed vectors + eight colour vectors = 15 fragment uniform vectors,
// one below WebGL1's guaranteed minimum. Macros preserve the public u_* API.
uniform vec4 u_scene;      // resolution.xy, time, colour count
uniform vec4 u_shape;      // scale, intensity, paramA, warp
uniform vec4 u_surface;    // detail, contrast, brightness, saturation
uniform vec4 u_finish;     // hue, vignette, blur, grain
uniform vec4 u_transform;  // seed, rotation, drift, OKLab toggle
uniform vec4 u_space;      // offset.xy, pointer.xy
uniform vec4 u_cursor;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
// Keep hash inputs inside mediump's guaranteed ±2^14 range.
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w

float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

// Even, un-structured white noise for film grain (Dave Hoskins hash12). The
// multiply hash above is fine for value noise but shows a faint axis-aligned
// mesh at integer fragment coords, which reads as a net over flat areas.
float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  float n = sin(dot(p, vec2(41.0, 289.0)));
  return fract(vec2(15731.743, 7892.321) * n);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

// --- OKLab colour mixing (perceptual), gated by u_oklab -----------------------
vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)),
    step(0.04045, c));
}
vec3 linearToSrgb(vec3 c) {
  // max() guards the sRGB branch: out-of-gamut OKLab interpolations can send a
  // channel negative, and pow(negative, …) is NaN which mix()/step() would
  // then propagate. The linear branch clips such channels to 0 downstream.
  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, c));
}
vec3 linToOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
  l = pow(max(l, 0.0), 1.0 / 3.0);
  m = pow(max(m, 0.0), 1.0 / 3.0);
  s = pow(max(s, 0.0), 1.0 / 3.0);
  return vec3(
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);
}
vec3 oklabToLin(vec3 c) {
  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l; m = m * m * m; s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);
}
vec3 mixColour(vec3 a, vec3 b, float t) {
  if (u_oklab > 0.5) {
    vec3 la = linToOklab(srgbToLinear(a));
    vec3 lb = linToOklab(srgbToLinear(b));
    return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);
  }
  return mix(a, b, t);
}

// Mix through the recipe colours; x is clamped to 0..1. WebGL1 forbids
// dynamic uniform indexing in fragment shaders, hence the constant loop.
vec3 palette(float x) {
  float n = max(u_colorCount - 1.0, 1.0);
  float f = clamp(x, 0.0, 1.0) * n;
  vec3 col = u_colors[0];
  for (int i = 0; i < 7; i++) {
    if (float(i) < n)
      col = mixColour(col, u_colors[i + 1],
        smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
  }
  return col;
}

vec3 hueRotate(vec3 col, float a) {
  const mat3 toYIQ = mat3(0.299, 0.596, 0.211,
                          0.587, -0.274, -0.523,
                          0.114, -0.322, 0.312);
  const mat3 toRGB = mat3(1.0, 1.0, 1.0,
                          0.956, -0.272, -1.106,
                          0.621, -0.647, 1.703);
  vec3 yiq = toYIQ * col;
  float ca = cos(a), sa = sin(a);
  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);
  return toRGB * yiq;
}

vec3 shade(vec2 uv, vec2 p, float t) {
  vec3 acc = u_colors[0] * 0.15;
  float total = 0.15;
  for (int i = 0; i < 8; i++) {
    if (float(i) >= u_colorCount) break;
    float fi = float(i);
    vec2 c = vec2(
      sin(t * (0.21 + fi * 0.071) + fi * 2.4 + u_seed),
      cos(t * (0.17 + fi * 0.093) + fi * 1.7)) * (0.45 + u_intensity * 0.35);
    float w = exp(-dot(p - c, p - c) * 6.0);
    acc += u_colors[i] * w;
    total += w;
  }
  return acc / total;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 screenUv = uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)
    / min(u_resolution.x, u_resolution.y);
  float cursorMask = 0.0;

  // Cursor modes 1–3 are local distortions. Push shifts the same screen-space
  // coordinates before field transforms, so Zoom/Rotate don't change its feel.
  if (u_cursorPresence > 0.001) {
    // u_mouse is normalized to -1..1 in canvas space. Convert it to the same
    // aspect-corrected screen space as p so effects stay under the cursor.
    vec2 cursor = (0.5 * u_mouse * u_resolution.xy)
      / min(u_resolution.x, u_resolution.y);
    vec2 cursorDelta = p - cursor;
    if (u_cursorEffect < 0.5) {
      p += cursor * u_cursorPresence * u_cursorStrength * 0.55;
    } else {
      float cursorDistance = length(cursorDelta);
      vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);
      cursorMask = u_cursorPresence
        * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));
      if (u_cursorEffect < 1.5) {
        p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;
      } else if (u_cursorEffect < 2.5) {
        float cursorAngle = cursorMask * u_cursorStrength * 2.2;
        float cc = cos(cursorAngle), cs = sin(cursorAngle);
        p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;
      } else if (u_cursorEffect < 3.5) {
        float ripple = sin(
          cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);
        p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;
      }
    }
  }

  // Keep presets that read uv (rather than p) in the same warped space.
  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;
  // Field transform: rotate, pan, pointer push, slow drift.
  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }
  p += u_offset;
  if (u_drift > 0.0001)
    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));
  // Organic domain warp.
  if (u_warp > 0.0) {
    p += u_warp * (vec2(
      fbm(p * u_detail + u_seed),
      fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }
  // Shade, with an optional soft 5-tap blur.
  vec3 col;
  if (u_blur > 0.0) {
    float e = u_blur;
    float pe = e * u_scale;
    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;
    col  = shade(uv, p, u_time) * 0.36;
    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;
    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;
  } else {
    col = shade(uv, p, u_time);
  }
  // Post: contrast, saturation, hue, brightness, vignette, grain.
  if (abs(u_contrast - 1.0) > 0.0001)
    col = (col - 0.5) * u_contrast + 0.5;
  if (abs(u_saturation - 1.0) > 0.0001) {
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);
  }
  if (abs(u_hue) > 0.0001)
    col = hueRotate(col, u_hue);
  if (abs(u_brightness) > 0.0001)
    col += u_brightness;
  if (u_vignette > 0.0001) {
    float vd = length(screenUv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }
  if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5)
    col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;
  if (u_grain > 0.0001)
    col += (grainHash(
      gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;function Fe(e){let c=e.trim().replace(/^#/,"");c.length===3&&(c=c.replace(/./g,"$&$&"));const i=/^[0-9a-f]{6}$/i.test(c)?parseInt(c,16):0;return[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]}const Te=[1,.84375,.5,.15625,0];function Ie(e,c,i,s,_){const b=Te.map((u,S)=>"rgba(0,0,0,"+(_+(1-_)*u*s).toFixed(3)+") "+S*25+"%");return"radial-gradient(circle "+Math.max(i,1).toFixed(1)+"px at "+e.toFixed(1)+"px "+c.toFixed(1)+"px, "+b.join(", ")+")"}function Pe(e){return[.62*Math.sin(e*.37),.5*Math.sin(e*.53+1.3)]}function Ge(e,c,i){const s=e.createProgram();if(!s)return null;for(const[_,b]of[[e.VERTEX_SHADER,c],[e.FRAGMENT_SHADER,i]]){const u=e.createShader(_);if(!u)return null;if(e.shaderSource(u,b),e.compileShader(u),!e.getShaderParameter(u,e.COMPILE_STATUS))return console.warn(e.getShaderInfoLog(u)),e.deleteShader(u),e.deleteProgram(s),null;e.attachShader(s,u),e.deleteShader(u)}return e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?s:(console.warn(e.getProgramInfoLog(s)),e.deleteProgram(s),null)}function Ne(){const[e,c]=f.useState(!1);return f.useEffect(()=>{const i=window.matchMedia("(prefers-reduced-motion: reduce)"),s=()=>c(i.matches);return s(),i.addEventListener("change",s),()=>i.removeEventListener("change",s)},[]),e}function Ce({text:e=`WHAT YOU
SEEK IS
SEEKING
YOU`,textColor:c="#ececec",ghost:i=.03,fontFamily:s='"Anton", "Bebas Neue", "Oswald", Impact, "Arial Narrow Bold", sans-serif',fontSize:_="clamp(4rem, 15vw, 13rem)",wander:b=!0,radius:u=.35,strength:S=1,colors:P=["#101010","#3A3A3A"],speed:ne=.86,scale:se=2.5,intensity:ae=.59,warp:ie=0,detail:ce=2.4,contrast:ue=.91,brightness:le=-.1,saturation:fe=1,hue:de=6.28,vignette:me=0,blur:pe=.016,grain:he=.16,drift:ve=.03,seed:_e=1,rotation:ge=0,oklab:xe=!1,paused:be=!1,height:ye="100svh",className:we="",children:G}){const N=f.useRef(null),C=f.useRef(null),E=Ne(),[Ee,Re]=f.useState(0),[D,O]=f.useState(!1),g=P.length?P.slice(0,8):["#101010"],z={palette:g,ghost:i,wander:b,radius:u,strength:S,speed:ne,scale:se,intensity:ae,warp:ie,detail:ce,contrast:ue,brightness:le,saturation:fe,hue:de,vignette:me,blur:pe,grain:he,drift:ve,seed:_e,rotation:ge,oklab:xe,paused:be},H=f.useRef(z);H.current=z;const k=f.useRef(()=>{});f.useEffect(()=>{const o=N.current;if(!o)return;const r=o.getContext("webgl",{antialias:!1,alpha:!1});if(!r){O(!0);return}const y=Ge(r,ke,Me);if(!y){O(!0);return}const B=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,B),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),r.STATIC_DRAW);const q=r.getAttribLocation(y,"a_position");r.enableVertexAttribArray(q),r.vertexAttribPointer(q,2,r.FLOAT,!1,0,0),r.useProgram(y);const p=n=>r.getUniformLocation(y,n),h={colors:p("u_colors"),scene:p("u_scene"),shape:p("u_shape"),surface:p("u_surface"),finish:p("u_finish"),transform:p("u_transform"),space:p("u_space"),cursor:p("u_cursor")},F=new Float32Array(24),d={x:0,y:0,inside:!1},l={x:0,y:0};let w=0,U=0,Y=0,R=0,m=0;const Ae=()=>{const n=Math.min(window.devicePixelRatio||1,2),a=Math.max(1,Math.round(o.clientWidth*n)),t=Math.max(1,Math.round(o.clientHeight*n));(o.width!==a||o.height!==t)&&(o.width=a,o.height=t)},K=n=>{m=0;const a=R?Math.min((n-R)/1e3,.05):.016;R=n,Ae();const t=H.current,T=!E&&!t.paused;T&&(U+=a*t.speed,Y+=a);const[J,ee]=d.inside?[d.x,d.y]:t.wander&&T?Pe(Y):[0,0],te=d.inside||t.wander?1:0,re=E?1:1-Math.exp(-a/(d.inside?.08:.6));l.x+=(J-l.x)*re,l.y+=(ee-l.y)*re,w+=(te-w)*(E?1:1-Math.exp(-a/.25)),F.fill(0),t.palette.forEach((A,L)=>F.set(Fe(A),L*3)),r.viewport(0,0,o.width,o.height),r.uniform3fv(h.colors,F),r.uniform4f(h.scene,o.width,o.height,U,t.palette.length),r.uniform4f(h.shape,t.scale,t.intensity,.5,t.warp),r.uniform4f(h.surface,t.detail,t.contrast,t.brightness,t.saturation),r.uniform4f(h.finish,t.hue,t.vignette,t.blur,t.grain),r.uniform4f(h.transform,t.seed,t.rotation,t.drift,t.oklab?1:0),r.uniform4f(h.space,0,0,l.x,l.y),r.uniform4f(h.cursor,w,Se,t.strength,t.radius),r.drawArrays(r.TRIANGLES,0,3);const I=C.current;if(I){const A=o.clientWidth,L=o.clientHeight,oe=Ie((l.x+1)/2*A,(1-l.y)/2*L,t.radius*Math.min(A,L),w,t.ghost);I.style.maskImage=oe,I.style.webkitMaskImage=oe}const Le=Math.abs(te-w)>.001||Math.abs(J-l.x)>5e-4||Math.abs(ee-l.y)>5e-4;(T||Le)&&!document.hidden&&(m=requestAnimationFrame(K))},x=()=>{!m&&!document.hidden&&(m=requestAnimationFrame(K))};x(),k.current=x;const W=new ResizeObserver(x);W.observe(o);const V=n=>{const a=o.getBoundingClientRect();d.inside=n.clientX>=a.left&&n.clientX<=a.right&&n.clientY>=a.top&&n.clientY<=a.bottom,d.x=(n.clientX-a.left)/a.width*2-1,d.y=1-(n.clientY-a.top)/a.height*2,x()},X=()=>{d.inside=!1,x()},$=()=>{document.hidden?(cancelAnimationFrame(m),m=0):(R=0,x())},Q=n=>{n.preventDefault(),cancelAnimationFrame(m),m=0},Z=()=>Re(n=>n+1);return window.addEventListener("pointermove",V,{passive:!0}),document.documentElement.addEventListener("pointerleave",X),document.addEventListener("visibilitychange",$),o.addEventListener("webglcontextlost",Q),o.addEventListener("webglcontextrestored",Z),()=>{k.current=()=>{},cancelAnimationFrame(m),W.disconnect(),window.removeEventListener("pointermove",V),document.documentElement.removeEventListener("pointerleave",X),document.removeEventListener("visibilitychange",$),o.removeEventListener("webglcontextlost",Q),o.removeEventListener("webglcontextrestored",Z),r.deleteBuffer(B),r.deleteProgram(y)}},[E,Ee]),f.useEffect(()=>k.current());const M="rgba(0,0,0,"+i+")",j=D?"radial-gradient(circle at 50% 50%, #000 0%, "+M+" 45%)":"linear-gradient("+M+", "+M+")";return v.jsxs("section",{className:"relative w-full overflow-hidden "+we,style:{height:ye,background:g[0]},children:[D?v.jsx("div",{"aria-hidden":"true",className:"absolute inset-0",style:{background:"radial-gradient(circle at 50% 50%, "+(g[g.length-1]??g[0])+" 0%, "+g[0]+" 45%)"}}):v.jsx("canvas",{ref:N,"aria-hidden":"true",className:"pointer-events-none absolute inset-0 block h-full w-full"}),v.jsx("div",{ref:C,className:"absolute inset-0 flex items-center justify-center px-6 text-center",style:{color:c,fontFamily:s,fontSize:_,lineHeight:.88,letterSpacing:"0.01em",whiteSpace:"pre-line",maskImage:j,WebkitMaskImage:j},children:v.jsx("p",{className:"m-0 font-normal uppercase",children:e})}),G&&v.jsx("div",{className:"relative z-10 h-full w-full",children:G})]})}function Oe(){return v.jsx("div",{className:"w-full",children:v.jsx(Ce,{})})}export{Oe as default};
