import{r as L,j as O}from"./index-CdiR0C0d.js";const Et=[{label:"Iconography",shape:"asterisk",colors:["#9b5cf6","#f3b4ef"],tile:"disc"},{label:"Color",shape:"sphere",colors:["#3b74ff","#d6e4ff"],tile:"square"},{label:"Typography",shape:"halves",colors:["#ea4fd3","#fbd3f1"],tile:"square"},{label:"Spacing",shape:"hourglass",colors:["#ec7a35","#f8c29a"],tile:"square"},{label:"Grid",shape:"sphere",colors:["#a15cf7","#ecc6fc"],tile:"none"}],z=6,At={sphere:0,asterisk:1,halves:2,hourglass:3,torus:4,pill:5,cube:6},V=2.75,oe=1.75,rt=2.75,st=18;function it(o,a){const i=Math.max(0,Math.min(o,z)),n=Math.max(a,.2),c=i>3&&n<1.9?2:1,m=[];if(c===1)for(let l=0;l<i;l++)m.push([(l-(i-1)/2)*V,0]);else{const l=Math.ceil(i/2),S=i-l;for(let k=0;k<l;k++)m.push([(k-(l-1)/2)*V,rt/2]);for(let k=0;k<S;k++)m.push([(k-(S-1)/2)*V,-rt/2])}let w=oe,v=oe;for(const[l,S]of m)w=Math.max(w,Math.abs(l)+oe),v=Math.max(v,Math.abs(S)+oe);return{rows:c,pts:m,fit:Math.max(v,w/n)}}function Ft(o,a){const i=[];let n=null;for(let c=0;c<a.length;c++){const m=o[c]==="square",[w,v]=a[c];if(m&&n&&n[2]===v){n[1]=w+1.12;continue}n&&i.push(n),n=m?[w-1.12,w+1.12,v]:null}return n&&i.push(n),i.slice(0,4)}function G(o,a,i){return Math.min(Math.max(o,a),i)}function zt(o,a,i,n){return a+(o-a)*Math.exp(-5.5*n)}function It(o){const a=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(o.trim());if(!a)return null;let i=a[1];i.length===3&&(i=i[0]+i[0]+i[1]+i[1]+i[2]+i[2]);const n=parseInt(i,16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}function Dt(o,a,i,n=new Float32Array(9),c=0){const m=Math.cos(o),w=Math.sin(o),v=Math.cos(a),l=Math.sin(a),S=Math.cos(i),k=Math.sin(i),j=[m,0,-w,w*l,v,m*l,w*v,-l,m*v];for(let P=0;P<3;P++){const R=j[P*3],I=j[P*3+1],ne=j[P*3+2];n[c+P*3]=S*R-k*I,n[c+P*3+1]=k*R+S*I,n[c+P*3+2]=ne}return n}function Tt(o,a,i){const n=[Math.sin(o)*Math.cos(a),Math.sin(a),Math.cos(o)*Math.cos(a)],c=n.map(k=>k*st),m=n[2],w=-n[0],v=Math.hypot(m,w)||1,l=[m/v,0,w/v],S=[n[1]*l[2]-n[2]*l[1],n[2]*l[0]-n[0]*l[2],n[0]*l[1]-n[1]*l[0]];return{eye:c,right:l,up:S,back:n,fov:i/st}}function _t(o,a,i,n){const c=[a[0]-o.eye[0],a[1]-o.eye[1],a[2]-o.eye[2]],m=c[0]*o.right[0]+c[1]*o.right[1]+c[2]*o.right[2],w=c[0]*o.up[0]+c[1]*o.up[1]+c[2]*o.up[2],v=-(c[0]*o.back[0]+c[1]*o.back[1]+c[2]*o.back[2]),l=n/2/(Math.max(v,.001)*o.fov);return[i/2+m*l,n/2-w*l,l]}function Yt(o,a,i,n,c,m){const w=(a-n/2)/(c/2)*o.fov,v=(c/2-i)/(c/2)*o.fov,l=[0,1,2].map(k=>o.right[k]*w+o.up[k]*v-o.back[k]),S=(m-o.eye[2])/(Math.abs(l[2])<1e-6?-1e-6:l[2]);return[o.eye[0]+l[0]*S,o.eye[1]+l[1]*S]}const Nt=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Ut=`#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 uRes;
uniform int uCount;
uniform vec4 uPos[6];
uniform mat3 uRot[6];
uniform vec4 uInfo[6];
uniform vec3 uSquash[6];
uniform vec3 uCore[6];
uniform vec3 uRim[6];
uniform vec4 uStrip[4];
uniform int uStripCount;
uniform vec3 uDisc[6];
uniform int uDiscCount;
uniform vec3 uEye;
uniform vec3 uRight;
uniform vec3 uUp;
uniform vec3 uBack;
uniform float uFov;
uniform vec3 uLight;
uniform vec4 uLens;
uniform vec3 uFg;
uniform float uShadow;
uniform float uGlow;

const float PLANE_Z = -1.32;
const float TILE_Z = -1.24;
const float LENS_Z = 1.9;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
float smax(float a, float b, float k) { return -smin(-a, -b, k); }
float sdBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}
mat2 rot2(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float halfCentre(int k, float spread) { return (float(k) - 1.0) * 0.55 * spread + 0.5; }

// Distance to one shape in its own frame (unit size), and the nearest sub-part.
vec2 shapeDist(int kind, vec3 q, float spread, int skipSub) {
  if (kind == 1) {
    float d = 1e9;
    for (int k = 0; k < 4; k++) {
      vec3 r = q;
      r.xy = rot2(float(k) * 0.7853982) * r.xy;
      d = smin(d, sdBox(r, vec3(1.0, 0.2, 0.2), 0.1), 0.05);
    }
    return vec2(d, 0.0);
  }
  if (kind == 2) {
    float d = 1e9;
    float sub = 0.0;
    for (int k = 0; k < 3; k++) {
      if (k == skipSub) continue;
      float cx = halfCentre(k, spread);
      vec3 c = q - vec3(cx, 0.0, 0.0);
      float h = smax(length(c) - 1.0, c.x, 0.05);
      if (h < d) { d = h; sub = float(k); }
    }
    return vec2(d, sub);
  }
  if (kind == 3) {
    vec3 s = q * vec3(0.9, 1.0, 0.9);
    float top = smax(length(s - vec3(0.0, 1.0, 0.0)) - 1.0, s.y - 1.0, 0.05);
    float bot = smax(length(s + vec3(0.0, 1.0, 0.0)) - 1.0, -1.0 - s.y, 0.05);
    return vec2(smin(top, bot, 0.1) * 0.9, 0.0);
  }
  if (kind == 4) {
    vec2 t = vec2(length(q.xy) - 0.68, q.z);
    return vec2(length(t) - 0.32, 0.0);
  }
  if (kind == 5) {
    vec3 c = q;
    c.x -= clamp(c.x, -0.55, 0.55);
    return vec2(length(c) - 0.5, 0.0);
  }
  if (kind == 6) return vec2(sdBox(q, vec3(0.74), 0.2), 0.0);
  return vec2(length(q) - 1.0, 0.0);
}

// The plates are flat: a 2D distance on the plate plane, negative inside.
float tileDist2(vec2 p) {
  float d = 1e9;
  for (int i = 0; i < 4; i++) {
    if (i >= uStripCount) break;
    vec4 s = uStrip[i];
    vec2 c = vec2((s.x + s.y) * 0.5, s.z);
    vec2 b = vec2((s.y - s.x) * 0.5, 1.04);
    vec2 q = abs(p - c) - b + 0.34;
    d = min(d, length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - 0.34);
  }
  for (int i = 0; i < 6; i++) {
    if (i >= uDiscCount) break;
    d = min(d, length(p - uDisc[i].xy) - uDisc[i].z);
  }
  return d;
}

vec2 map(vec3 p, int skip) {
  vec2 res = vec2(1e9, -1.0);
  for (int i = 0; i < 6; i++) {
    if (i >= uCount) break;
    vec3 q = p - uPos[i].xyz;
    float s = uPos[i].w;
    float bound = length(q) - 1.9 * s;
    if (bound > 0.35) {
      if (bound < res.x) res = vec2(bound, float(i * 4));
      continue;
    }
    int kind = int(uInfo[i].x + 0.5);
    int skipSub = -1;
    if (skip >= 0 && skip / 4 == i) {
      if (kind != 2) continue;
      skipSub = skip - i * 4;
    }
    vec3 sq = uSquash[i];
    vec3 lq = (transpose(uRot[i]) * q) / (s * sq);
    vec2 h = shapeDist(kind, lq, uInfo[i].w, skipSub);
    float d = h.x * s * min(sq.x, min(sq.y, sq.z));
    if (d < res.x) res = vec2(d, float(i * 4) + h.y);
  }
  return res;
}

vec3 calcNormal(vec3 p, int skip) {
  const vec2 e = vec2(1.0, -1.0) * 0.0015;
  return normalize(
    e.xyy * map(p + e.xyy, skip).x +
    e.yyx * map(p + e.yyx, skip).x +
    e.yxy * map(p + e.yxy, skip).x +
    e.xxx * map(p + e.xxx, skip).x);
}

// Soft shadows from a sphere stand-in per shape: smooth, cheap, and free of the
// banding a marched shadow shows on a flat card.
float sphShadow(vec3 ro, vec3 rd, vec4 sph) {
  vec3 oc = ro - sph.xyz;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - sph.w * sph.w;
  float h = b * b - c;
  float d = sqrt(max(0.0, sph.w * sph.w - h)) - sph.w;
  float t = -b - sqrt(max(h, 0.0));
  return t < 0.0 ? 1.0 : smoothstep(0.0, 1.0, 1.6 * d / t);
}

float softShadow(vec3 ro, vec3 rd, int self) {
  float res = 1.0;
  for (int i = 0; i < 6; i++) {
    if (i >= uCount) break;
    if (i == self) continue;
    res = min(res, sphShadow(ro, rd, vec4(uPos[i].xyz, 0.92 * uPos[i].w)));
  }
  return res;
}

vec4 over(vec4 top, vec4 under) { return top + (1.0 - top.a) * under; }

// The coloured light each shape throws on the card behind it.
vec4 glowAt(vec2 xy) {
  vec3 g = vec3(0.0);
  float sum = 0.0;
  for (int i = 0; i < 6; i++) {
    if (i >= uCount) break;
    vec2 d = xy - uPos[i].xy;
    float w = exp(-dot(d, d) * 0.55) * uGlow * (0.7 + 0.5 * uInfo[i].z);
    g += uCore[i] * w;
    sum += w;
  }
  float a = min(sum, 0.6);
  return vec4(g * (a / max(sum, 1e-4)), a) * 0.45;
}

// What a ray that misses every shape sees: a plate, or the bare card, with
// shadows and glow on both.
vec4 behind(vec3 ro, vec3 rd, vec3 L) {
  float tt = (TILE_Z - ro.z) / min(rd.z, -1e-4);
  vec3 p = ro + rd * tt;
  float d = tileDist2(p.xy);
  float px = 1.5 * uFov * tt / uRes.y;
  float cover = 1.0 - smoothstep(-px, px, d);
  float tp = (PLANE_Z - ro.z) / min(rd.z, -1e-4);
  vec3 q = ro + rd * tp;
  vec4 card = over(vec4(0.0, 0.0, 0.0, (1.0 - softShadow(q, L, -1)) * uShadow), glowAt(q.xy));
  if (cover <= 0.0) return card;
  // plate: flat face, a lit bevel along the edge facing the lamp, shade on the other side
  vec2 e = vec2(0.01, 0.0);
  vec2 g = normalize(vec2(tileDist2(p.xy + e.xy) - tileDist2(p.xy - e.xy), tileDist2(p.xy + e.yx) - tileDist2(p.xy - e.yx)) + 1e-5);
  float bevel = smoothstep(-0.07, 0.0, d);
  float lit = dot(g, normalize(L.xy + 1e-5));
  vec4 c = vec4(uFg * 0.055, 0.055);
  c = over(vec4(vec3(1.0), 1.0) * bevel * max(lit, 0.0) * 0.5, c);
  c = over(vec4(0.0, 0.0, 0.0, bevel * max(-lit, 0.0) * 0.06), c);
  c = over(vec4(0.0, 0.0, 0.0, (1.0 - softShadow(p, L, -1)) * uShadow * 0.55), c);
  c = over(c, glowAt(p.xy) * 0.6);
  return mix(card, c, cover);
}

vec4 shapeShade(vec3 p, vec3 rd, int id, int skip, vec3 L) {
  int i = id / 4;
  int sub = id - i * 4;
  int kind = int(uInfo[i].x + 0.5);
  float hover = uInfo[i].z;
  vec3 n = calcNormal(p, skip);
  vec3 lq = (transpose(uRot[i]) * (p - uPos[i].xyz)) / (uPos[i].w * uSquash[i]);

  float facing = clamp(dot(n, -rd), 0.0, 1.0);
  float radial;
  float cx = 0.0;
  if (kind == 2) {
    cx = halfCentre(sub, uInfo[i].w);
    radial = clamp(1.0 - length(lq - vec3(cx - 0.55, 0.0, 0.0)) / 1.4, 0.0, 1.0);
  } else if (kind == 3) {
    radial = clamp(1.0 - length(lq * vec3(0.8, 1.1, 1.0)) / 1.85, 0.0, 1.0);
  } else {
    radial = clamp(1.0 - length(lq.xy) / 1.3, 0.0, 1.0);
  }
  float core = clamp(0.45 * pow(facing, 1.6) + 0.7 * radial, 0.0, 1.0);
  vec3 base = mix(uRim[i], uCore[i], smoothstep(0.06, 0.9, core));

  float sh = softShadow(p, L, i);
  float dif = clamp(dot(n, L) * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = base * (0.8 + 0.3 * dif) * mix(0.8, 1.0, sh);
  float fres = pow(1.0 - facing, 2.4);
  col = mix(col, mix(uRim[i], vec3(1.0), 0.55), fres * 0.6);
  // light seeping through the gel on the side away from the lamp
  col += uRim[i] * pow(clamp(dot(n, -L) * 0.5 + 0.5, 0.0, 1.0), 3.0) * 0.18;
  vec3 hv = normalize(L - rd);
  col += vec3(1.0) * pow(max(dot(n, hv), 0.0), 56.0) * 0.42 * sh;
  col = mix(col, col * 1.06 + 0.015, hover);

  float soft = kind == 0 ? 0.32 : kind == 2 ? 0.1 : 0.16;
  float a = smoothstep(0.0, soft, facing);
  if (kind == 2) {
    // each half-dome fades out toward its flat face
    float f = smoothstep(-0.95, 0.02, lq.x - cx);
    a *= mix(1.0, 0.55, f);
    col = mix(col, mix(uRim[i], vec3(1.0), 0.2), f * 0.18);
  }
  return vec4(clamp(col, 0.0, 1.0) * a, a);
}

vec2 march(vec3 ro, vec3 rd, float t, float tMax, int skip) {
  for (int i = 0; i < 80; i++) {
    vec2 h = map(ro + rd * t, skip);
    if (h.x < 0.0025) return vec2(t, h.y);
    t += h.x;
    if (t > tMax) break;
  }
  return vec2(tMax, -1.0);
}

// Does the ray pass through any shape's bounding sphere at all?
bool mayHit(vec3 ro, vec3 rd) {
  for (int i = 0; i < 6; i++) {
    if (i >= uCount) break;
    vec3 oc = ro - uPos[i].xyz;
    float r = 1.95 * uPos[i].w;
    float b = dot(oc, rd);
    if (b * b - dot(oc, oc) + r * r > 0.0) return true;
  }
  return false;
}

vec4 render(vec3 ro, vec3 rd, vec3 L) {
  if (!mayHit(ro, rd)) return behind(ro, rd, L);
  // nothing reaches in front of z = 2.4, so start the march there
  float t = max(0.0, (2.4 - ro.z) / min(rd.z, -1e-4));
  float tEnd = (TILE_Z - ro.z) / min(rd.z, -1e-4);
  vec4 acc = vec4(0.0);
  int skip = -1;
  for (int layer = 0; layer < 3; layer++) {
    vec2 h = march(ro, rd, t, tEnd, skip);
    if (h.y < 0.0) break;
    vec3 p = ro + rd * h.x;
    acc = over(acc, shapeShade(p, rd, int(h.y + 0.5), skip, L));
    if (acc.a > 0.985) return acc;
    skip = int(h.y + 0.5);
    t = h.x + 0.01;
  }
  return over(acc, behind(ro, rd, L));
}

vec4 lensLayer(vec2 o, float r) {
  vec4 c = vec4(vec3(1.0) * 0.06, 0.06);
  float rim = smoothstep(0.84, 0.975, r) * (1.0 - smoothstep(0.975, 1.0, r));
  c = over(vec4(vec3(1.0), 1.0) * rim * 0.5, c);
  float line = smoothstep(0.955, 0.985, r) * (1.0 - smoothstep(0.985, 1.0, r));
  c = over(vec4(uFg, 1.0) * line * 0.16, c);
  float spot = smoothstep(0.55, 0.0, length(o - vec2(-0.42, 0.48)));
  c = over(vec4(vec3(1.0), 1.0) * spot * 0.3, c);
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * uRes.y);
  vec3 ro = uEye;
  vec3 rd = normalize(uRight * uv.x * uFov + uUp * uv.y * uFov - uBack);
  vec3 L = normalize(uLight);

  vec4 glass = vec4(0.0);
  if (uLens.w > 0.002) {
    float tl = (LENS_Z - ro.z) / min(rd.z, -1e-4);
    vec3 lp = ro + rd * tl;
    vec2 o = (lp.xy - uLens.xy) / uLens.z;
    float r = length(o);
    if (r < 1.0) {
      glass = lensLayer(o, r) * uLens.w;
      // a convex lens bends rays toward its axis, so what is behind it looks bigger
      float bend = 0.13 * uLens.w * (1.0 - 0.25 * r * r);
      ro = lp;
      rd = normalize(rd - vec3(o * bend, 0.0));
    }
  }
  outColor = over(glass, render(ro, rd, L));
}`,Gt="(prefers-reduced-motion: reduce)";function jt(){const[o,a]=L.useState(!1);return L.useEffect(()=>{if(typeof window>"u"||!window.matchMedia)return;const i=window.matchMedia(Gt),n=()=>a(i.matches);return n(),i.addEventListener("change",n),()=>i.removeEventListener("change",n)},[]),o}function Ht(){let o=null;return(a,i)=>{const n=It(a);if(n)return n;try{if(!o){const m=document.createElement("canvas");m.width=m.height=1,o=m.getContext("2d",{willReadFrequently:!0})}if(!o)return i;o.clearRect(0,0,1,1),o.fillStyle="#000",o.fillStyle=a,o.fillRect(0,0,1,1);const c=o.getImageData(0,0,1,1).data;return[c[0]/255,c[1]/255,c[2]/255]}catch{return i}}}const Xt=()=>({hover:0,sel:0,yaw:0,pitch:0,vYaw:0,vPitch:0,roll:0,flips:0,flipAngle:0,squash:0,vSquash:0});function Ot({items:o=Et,selected:a,defaultSelected:i=null,onSelect:n,height:c="clamp(240px, 30vw, 340px)",lens:m=!0,idle:w=!0,interactive:v=!0,shadow:l=.5,glow:S=.5,maxDpr:k=1.75,ariaLabel:j="Foundation primitives",className:P=""}){const R=o.slice(0,z),I=jt(),[ne,at]=L.useState(i??null),W=a!==void 0?a:ne,H=W!=null&&W>=0&&W<R.length?W:null,[ct,Z]=L.useState(null),[Me,re]=L.useState(!1),[lt,ut]=L.useState(0),se=L.useRef(null),Le=L.useRef(null),ie=L.useRef([]),u=L.useRef({items:R,hovered:null,selected:H,lens:m,idle:w,interactive:v,shadow:l,glow:S,anims:[],pointer:{x:.5,y:.5,inside:!1},drag:null,kick:()=>{}});u.current.items=R,u.current.hovered=ct,u.current.selected=H,u.current.lens=m,u.current.idle=w,u.current.interactive=v,u.current.shadow=l,u.current.glow=S,L.useEffect(()=>{u.current.kick()});const ft=L.useCallback(r=>{a===void 0&&at(r),n==null||n(r)},[a,n]),ht=r=>{var e;const t=u.current.anims[r];!t||I||(t.vYaw+=11,t.vSquash+=7,((e=R[r])==null?void 0:e.shape)==="hourglass"&&(t.flips+=1),u.current.kick())},Pe=r=>{const t=H===r?null:r;ft(t),t!=null&&ht(r)};L.useEffect(()=>{const r=Le.current,t=se.current;if(!r||!t)return;const e=r.getContext("webgl2",{premultipliedAlpha:!0,alpha:!0,antialias:!1});if(!e){re(!0);return}const p=(f,g)=>{const d=e.createShader(f);return d?(e.shaderSource(d,g),e.compileShader(d),e.getShaderParameter(d,e.COMPILE_STATUS)?d:(console.error("foundation-primitives:",e.getShaderInfoLog(d)),e.deleteShader(d),null)):null},x=p(e.VERTEX_SHADER,Nt),q=p(e.FRAGMENT_SHADER,Ut),M=x&&q?e.createProgram():null;if(!M||!x||!q){re(!0);return}if(e.attachShader(M,x),e.attachShader(M,q),e.linkProgram(M),e.deleteShader(x),e.deleteShader(q),!e.getProgramParameter(M,e.LINK_STATUS)){console.error("foundation-primitives:",e.getProgramInfoLog(M)),e.deleteProgram(M),re(!0);return}const y=f=>e.getUniformLocation(M,f),b={res:y("uRes"),count:y("uCount"),pos:y("uPos"),rot:y("uRot"),info:y("uInfo"),squash:y("uSquash"),core:y("uCore"),rim:y("uRim"),strip:y("uStrip"),stripCount:y("uStripCount"),disc:y("uDisc"),discCount:y("uDiscCount"),eye:y("uEye"),right:y("uRight"),up:y("uUp"),back:y("uBack"),fov:y("uFov"),light:y("uLight"),lens:y("uLens"),fg:y("uFg"),shadow:y("uShadow"),glow:y("uGlow")},X=e.createVertexArray();e.clearColor(0,0,0,0);const Ce=new Float32Array(z*4),Ee=new Float32Array(z*9),Ae=new Float32Array(z*4),Fe=new Float32Array(z*3),ze=new Float32Array(z*3),Ie=new Float32Array(z*3),ae=new Float32Array(16),De=new Float32Array(z*3);let _=1,Y=1,E=it(u.current.items.length,1);const Te=()=>{const f=Math.min(window.devicePixelRatio||1,Math.max(k,.5));_=Math.max(t.clientWidth,1),Y=Math.max(t.clientHeight,1);const g=Math.floor(_*f),d=Math.floor(Y*f);(r.width!==g||r.height!==d)&&(r.width=g,r.height=d),N()},ce=Ht();let le=[.1,.1,.1],gt=0;const ue=()=>{le=ce(getComputedStyle(t).color,le)},_e=new MutationObserver(()=>{ue(),N()});_e.observe(document.documentElement,{attributes:!0,attributeFilter:["class","style","data-theme"]});let Ye="";const xt=()=>{const f=u.current.items,g=f.map(d=>d.colors.join(",")).join("|");g!==Ye&&(Ye=g,f.forEach((d,C)=>{ze.set(ce(d.colors[0],[.5,.4,1]),C*3),Ie.set(ce(d.colors[1],[.9,.85,1]),C*3)}))},fe=u.current.anims;let he=0,de=0,ve=0,pe=0,K=0,Q=0,me=0,Ne=!1,D=0,ge=performance.now(),$=0;const yt=()=>{var $e;const f=performance.now(),g=Math.min((f-ge)/1e3,.05);ge=f;const d=u.current,C=I,U=d.idle&&!C;C||(D+=g);const J=d.items,B=J.length;for(;fe.length<B;)fe.push(Xt());E=it(B,_/Y);const A=d.pointer,F=h=>C?1:1-Math.exp(-h*g),Oe=d.interactive&&A.inside?A.x-.5:U?Math.sin(D*.23)*.22:0,Ve=d.interactive&&A.inside?A.y-.5:U?Math.sin(D*.31+1)*.12:0;he+=(Oe*.3-he)*F(3),de+=(-Ve*.2-de)*F(3),ve+=(Oe*1.6-ve)*F(4),pe+=(-Ve*1.2-pe)*F(4);const ye=Tt(he,de,E.fit);let We=!1;for(let h=0;h<B;h++){const s=fe[h],kt=J[h],ke=At[kt.shape]??0,St=d.hovered===h||(($e=d.drag)==null?void 0:$e.i)===h,qt=d.selected===h;if(s.hover+=((St?1:0)-s.hover)*F(9),s.sel+=((qt?1:0)-s.sel)*F(6),C?s.vYaw=s.vPitch=s.vSquash=s.squash=0:(!d.drag||d.drag.i!==h)&&(s.yaw+=s.vYaw*g,s.pitch+=s.vPitch*g,s.vYaw*=Math.exp(-2.4*g),s.vPitch=s.vPitch*Math.exp(-3*g)-s.pitch*14*g),s.vSquash+=(-s.squash*170-s.vSquash*9)*g,s.squash+=s.vSquash*g,C&&(s.squash=s.vSquash=0),ke===1&&!C&&(s.roll+=g*(.25+3.2*s.hover)),ke===3){U&&Math.floor(D/6.5+h*.13)>Math.floor((D-g)/6.5+h*.13)&&(s.flips+=1);const te=s.flips*Math.PI;s.flipAngle=C?te:zt(s.flipAngle,te,5.5,g),s.roll=s.flipAngle}(Math.abs(s.vYaw)>.01||Math.abs(s.vPitch)>.01||Math.abs(s.squash)>.002)&&(We=!0);const[Je,et]=E.pts[h],tt=U?Math.sin(D*1.05+h*1.3)*.07:0,ot=.5*s.hover+.22*s.sel,nt=1+.06*s.hover+.03*s.sel;Ce.set([Je,et+tt,ot,nt],h*4);const Mt=U?Math.sin(D*.45+h*1.7)*.4:0,Lt=U?Math.sin(D*.37+h*2.3)*.2:0;Dt(s.yaw+Mt,s.pitch+Lt,s.roll,Ee,h*9);const Pt=1+.42*Math.max(s.hover,s.sel*.45);Ae.set([ke,0,s.hover,Pt],h*4);const Se=G(s.squash,-.6,.6);Fe.set([1+.1*Se,1-.14*Se,1+.1*Se],h*3);const ee=ie.current[h];if(ee){const[te,Rt,Ct]=_t(ye,[Je,et+tt,ot],_,Y),qe=Ct*1.12*nt;ee.style.width=ee.style.height=Math.round(qe*2)+"px",ee.style.transform="translate("+(te-qe).toFixed(1)+"px,"+(Rt-qe).toFixed(1)+"px)"}}const Ze=Ft(J.map(h=>h.tile??"none"),E.pts);ae.fill(0),Ze.forEach((h,s)=>ae.set([h[0],h[1],h[2],0],s*4));let Ke=0;J.forEach((h,s)=>{h.tile==="disc"&&De.set([E.pts[s][0],E.pts[s][1],1.3],Ke++*3)});const Qe=E.pts[0]??[0,0],bt=Qe[0]+(E.rows===1?V*.6:V*.5),wt=Qe[1]-(E.rows===1?0:.3);let be=bt,we=wt;return d.interactive&&A.inside&&([be,we]=Yt(ye,A.x*_,A.y*Y,_,Y,1.9)),Ne||(K=be,Q=we,Ne=!0),K+=(be-K)*F(A.inside?7:2.5),Q+=(we-Q)*F(A.inside?7:2.5),me+=((d.lens&&B>0?1:0)-me)*F(5),xt(),gt++%45===0&&ue(),{cam:ye,n:B,stripCount:Ze.length,discCount:Ke,moving:We}},Ue=()=>{const f=yt(),g=u.current;return e.useProgram(M),e.bindVertexArray(X),e.viewport(0,0,r.width,r.height),e.clear(e.COLOR_BUFFER_BIT),e.uniform2f(b.res,r.width,r.height),e.uniform1i(b.count,f.n),e.uniform4fv(b.pos,Ce),e.uniformMatrix3fv(b.rot,!1,Ee),e.uniform4fv(b.info,Ae),e.uniform3fv(b.squash,Fe),e.uniform3fv(b.core,ze),e.uniform3fv(b.rim,Ie),e.uniform4fv(b.strip,ae),e.uniform1i(b.stripCount,f.stripCount),e.uniform3fv(b.disc,De),e.uniform1i(b.discCount,f.discCount),e.uniform3fv(b.eye,f.cam.eye),e.uniform3fv(b.right,f.cam.right),e.uniform3fv(b.up,f.cam.up),e.uniform3fv(b.back,f.cam.back),e.uniform1f(b.fov,f.cam.fov),e.uniform3f(b.light,-.45+ve,.6+pe,1.3),e.uniform4f(b.lens,K,Q,1,me),e.uniform3fv(b.fg,le),e.uniform1f(b.shadow,G(g.shadow,0,1)*.13),e.uniform1f(b.glow,G(g.glow,0,1)*.5),e.drawArrays(e.TRIANGLES,0,3),f.moving};let T=0,xe=!0;const Ge=()=>{T=0,Ue()||!I?$=0:$++,(I?$<2:!0)&&xe&&!document.hidden&&(T=requestAnimationFrame(Ge))};function N(){$=0,!T&&xe&&!document.hidden&&(ge=performance.now(),T=requestAnimationFrame(Ge))}u.current.kick=N;const je=new IntersectionObserver(f=>{xe=f.some(g=>g.isIntersecting),N()});je.observe(t),document.addEventListener("visibilitychange",N);const He=f=>{f.preventDefault(),cancelAnimationFrame(T),T=0},Xe=()=>ut(f=>f+1);r.addEventListener("webglcontextlost",He),r.addEventListener("webglcontextrestored",Xe),ue();const Be=new ResizeObserver(Te);return Be.observe(t),Te(),Ue(),()=>{cancelAnimationFrame(T),T=0,u.current.kick=()=>{},Be.disconnect(),je.disconnect(),_e.disconnect(),document.removeEventListener("visibilitychange",N),r.removeEventListener("webglcontextlost",He),r.removeEventListener("webglcontextrestored",Xe),e.deleteVertexArray(X),e.deleteProgram(M)}},[I,lt,k]);const dt=r=>{const t=se.current;if(!t)return;const e=t.getBoundingClientRect(),p=u.current.pointer;p.x=G((r.clientX-e.left)/Math.max(e.width,1),0,1),p.y=G((r.clientY-e.top)/Math.max(e.height,1),0,1),p.inside=r.pointerType!=="touch"||!!u.current.drag;const x=u.current.drag;if(x){const q=u.current.anims[x.i],M=performance.now(),y=r.clientX-x.lx,b=r.clientY-x.ly;if(Math.hypot(r.clientX-x.x,r.clientY-x.y)>5&&(x.moved=!0),q){const X=Math.max((M-x.lt)/1e3,.004166666666666667);q.yaw+=y*.012,q.pitch=G(q.pitch+b*.012,-1.2,1.2),q.vYaw=q.vYaw*.4+y*.012/X*.6,q.vPitch=q.vPitch*.4+b*.012/X*.6}x.lx=r.clientX,x.ly=r.clientY,x.lt=M}u.current.kick()},Re=()=>{u.current.pointer.inside=!1,u.current.kick()},vt=r=>t=>{var p,x;if(!v||t.button>0)return;(x=(p=t.currentTarget).setPointerCapture)==null||x.call(p,t.pointerId),u.current.drag={i:r,x:t.clientX,y:t.clientY,lx:t.clientX,ly:t.clientY,lt:performance.now(),moved:!1};const e=u.current.anims[r];e&&(e.vYaw=0,e.vPitch=0),u.current.kick()},pt=r=>t=>{var p,x;const e=u.current.drag;!e||e.i!==r||(u.current.drag=null,(x=(p=t.currentTarget).releasePointerCapture)==null||x.call(p,t.pointerId),e.moved||Pe(r),t.pointerType==="touch"&&(u.current.pointer.inside=!1),u.current.kick())},mt=r=>t=>{var x;const e=R.length;let p=-1;if((t.key==="ArrowRight"||t.key==="ArrowDown")&&(p=(r+1)%e),(t.key==="ArrowLeft"||t.key==="ArrowUp")&&(p=(r-1+e)%e),t.key==="Home"&&(p=0),t.key==="End"&&(p=e-1),t.key==="Enter"||t.key===" "){t.preventDefault(),Pe(r);return}p>=0&&(t.preventDefault(),(x=ie.current[p])==null||x.focus())};return O.jsxs("div",{ref:se,role:"group","aria-label":j,className:"relative w-full touch-pan-y select-none overflow-hidden rounded-[28px] bg-foreground/[0.022] text-foreground ring-1 ring-inset ring-foreground/[0.035] "+P,style:{height:c},onPointerMove:v?dt:void 0,onPointerLeave:v?Re:void 0,onPointerCancel:v?Re:void 0,children:[Me?O.jsx("div",{className:"absolute inset-0 flex items-center justify-center gap-[3%] px-[6%]","aria-hidden":"true",children:R.map((r,t)=>O.jsx("div",{className:"aspect-square w-[12%] min-w-10 max-w-36 rounded-full",style:{background:"radial-gradient(circle at 42% 40%, "+r.colors[0]+" 0%, "+r.colors[0]+" 35%, "+r.colors[1]+" 100%)"}},t))}):O.jsx("canvas",{ref:Le,"aria-hidden":"true",className:"pointer-events-none absolute inset-0 block h-full w-full",style:{maxWidth:"none"}}),Me?null:R.map((r,t)=>{const e=H===t;return O.jsx("button",{ref:p=>{ie.current[t]=p},type:"button","aria-pressed":e,"aria-label":r.label,tabIndex:v?H==null?t===0?0:-1:e?0:-1:-1,disabled:!v,className:"absolute left-0 top-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent "+(v?"cursor-grab active:cursor-grabbing":"cursor-default"),style:{width:0,height:0,touchAction:"none"},onPointerEnter:()=>Z(t),onPointerLeave:()=>Z(p=>p===t?null:p),onFocus:()=>Z(t),onBlur:()=>Z(p=>p===t?null:p),onPointerDown:vt(t),onPointerUp:pt(t),onPointerCancel:()=>{u.current.drag=null},onKeyDown:mt(t)},t)})]})}export{Ot as F};
