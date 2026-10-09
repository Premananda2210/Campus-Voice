import{r as u,j as s}from"./index-CdiR0C0d.js";const ea=["beams","monolith","debris","target","tunnel","constellation","moon","eclipse"],ht=8,aa=4600,oa=1700;function b(t,e,a,o){return{a:t,e,p:a,side:o}}const xt={beams:{scene:0,look:"duo",slots:[b([-.3,.125],[-.33,.33],[-.34,.26],"r"),b([.26,-.33],[.1,-.1],[.3,-.3],"l"),b([.5,.2],[.34,.3],[.3,.3],"l")]},monolith:{scene:1,look:"mono",slots:[b([-.12,.13],[-.24,.28],[-.34,.3],"l"),b([.14,.08],[.24,.2],[.34,.24],"r"),b([-.13,-.09],[-.24,-.2],[-.34,-.24],"l"),b([.1,-.15],[.25,-.28],[.34,-.3],"r")]},debris:{scene:2,look:"tag",slots:[b([-.08,.08],[-.17,.3],[-.34,.3],"l"),b([.09,.07],[.2,.3],[.34,.24],"r"),b([-.1,-.06],[-.24,-.2],[-.34,-.24],"l"),b([.1,-.08],[.27,-.16],[.34,-.3],"r")]},target:{scene:3,look:"plate",slots:[b([-.2,0],[-.24,.034],[-.34,.22],"l"),b([.2,0],[.24,.034],[.34,-.22],"r"),b([-.2,0],[-.24,-.034],[-.34,.17],"l"),b([.2,0],[.24,-.034],[.34,-.17],"r")]},tunnel:{scene:4,look:"plate",slots:[b([-.09,0],[-.2,.034],[-.34,.24],"l"),b([.09,0],[.2,.034],[.34,-.24],"r"),b([-.09,0],[-.2,-.034],[-.34,.19],"l"),b([.09,0],[.2,-.034],[.34,-.19],"r")]},constellation:{scene:5,look:"orbit",slots:[b([-.15,0],[-.19,0],[-.34,.1],"l"),b([.15,0],[.19,0],[.34,-.1],"r")]},moon:{scene:6,look:"duo",slots:[b([-.03,-.1],[-.2,-.2],[-.34,-.2],"l"),b([.035,-.1],[.2,-.2],[.34,-.3],"r"),b([-.03,-.1],[-.2,-.255],[-.34,-.25],"l"),b([.035,-.1],[.2,-.255],[.34,-.35],"r")]},eclipse:{scene:7,look:"rail",slots:[b([-.21,0],[-.21,.04],[-.34,.2],"l"),b([.21,0],[.21,.04],[.34,-.2],"r"),b([-.21,0],[-.21,-.045],[-.34,.15],"l"),b([.21,0],[.21,-.045],[.34,-.15],"r")]}};function F(t,e,a){return t<e?e:t>a?a:t}function Ut(t,e,a){const o=F((a-t)/(e-t),0,1);return o*o*(3-2*o)}function sa(t){const e=(t||[]).filter(a=>Object.prototype.hasOwnProperty.call(xt,a));return e.length?e:ea.slice()}function na(t){const e=typeof t=="string"?t:t&&typeof t.name=="string"?t.name:"",a=typeof t=="object"&&t&&typeof t.role=="string"?t.role.trim():"",o=e.trim().split(/\s+/).filter(Boolean);return{first:o[0]||"",rest:o.slice(1).join(" "),role:a}}function ra(t,e,a){const o=e.reduce((d,h)=>d+h,0);if(t<=0||o<=0)return e.map(()=>[]);const n=e.map(()=>0);if(t>=o)for(let d=0;d<e.length;d++)n[d]=e[d];else{let d=t;for(let h=0;d>0;h++)for(let i=0;i<e.length&&d>0;i++)h<e[i]&&(n[i]++,d--)}let p=t>o?Math.max(0,Math.floor(a))*o%t:0;return n.map(d=>{const h=[];for(let i=0;i<d;i++)h.push(p++%t);return h})}function la(t,e){const a=[0,0,.07,8,.16,19,.24,23,.35,41,.46,50,.55,54,.66,70,.76,77,.86,90,.94,96,1,100],o=F(t/Math.max(1,e),0,1);for(let n=2;n<a.length;n+=2)if(o<=a[n]){const p=(o-a[n-2])/(a[n]-a[n-2]);return a[n-1]+(a[n+1]-a[n-1])*p*p*(3-2*p)}return 100}function Ne(){return{phase:"titles",shot:0,cycle:0,local:0,clock:0,shown:0,total:0,armed:!1}}function ia(t,e){return e.target===null?la(t.clock,e.duration):F(e.target,0,100)}function ca(t,e,a){const o={...t},n=Math.max(1,a.count);if(o.total+=e,o.phase==="titles")if(a.target===null){a.hold||(o.clock=Math.min(a.duration,o.clock+e));const d=Math.min(n-1,Math.floor((o.clock+1e-6)/a.shotMs));o.local=o.clock-d*a.shotMs,o.shot=d,o.clock>=a.duration&&(o.phase="finale",o.local=0)}else a.hold||(o.local+=e),o.local>=a.shotMs&&(o.shot=(o.shot+1)%n,o.shot===0&&o.cycle++,o.local=0),F(a.target,0,100)>=100&&(o.armed||o.local>=a.shotMs*.5)&&(o.phase="finale",o.local=0);else if(o.phase==="finale"){if(o.local+=e,o.local>=a.finaleMs){if(a.loop)return{...Ne(),cycle:o.cycle+1,total:o.total};o.phase="reveal",o.local=0}}else o.phase==="reveal"&&(o.local+=e,o.local>=a.revealMs&&(o.phase="done"));if(o.phase!=="titles")return o.shown=100,o;const p=ia(o,a);return o.shown=Math.max(o.shown,p-o.shown<.05?p:o.shown+(p-o.shown)*(1-Math.exp(-e/140))),o}function Re(t,e){const a={...t};return a.phase==="finale"&&!e.loop?{...a,phase:"reveal",local:0}:a.phase!=="titles"?a:e.target===null?{...a,clock:e.duration,phase:"finale",local:0}:F(e.target,0,100)>=100?{...a,phase:"finale",local:0}:{...a,armed:!0}}function fa(t,e,a){if(t.phase!=="titles")return t;const o=Math.max(1,a.count),n={...t};if(a.target===null){const p=n.shot+(e<0?-1:1);return p>=o?Re(n,a):(n.shot=Math.max(0,p),n.clock=n.shot*a.shotMs,n.local=0,n)}return n.shot=(n.shot+(e<0?o-1:1))%o,e>0&&n.shot===0&&n.cycle++,n.local=0,n}function je(t){const e=Math.sin(t*12.9898+78.233)*43758.5453;return e-Math.floor(e)}const Vt="#%&*+=-/:;01";function pa(t,e,a){let o="";const n=t.length;for(let p=0;p<n;p++){const d=t[p];if(d===" "){o+=" ";continue}const h=p/Math.max(1,n)*.7+je(p*7.1+a)*.3;e>=h?o+=d:o+=Vt[Math.floor(je(p*3.7+a+Math.floor(e*24)*1.3)*Vt.length)%Vt.length]}return o}const Se={A:"4",E:"3",I:"1",O:"0",S:"5",T:"7"};function ma(t,e){const a=[];for(let n=0;n<t.length;n++)Se[t[n].toUpperCase()]&&a.push(n);if(!a.length)return t;const o=a[Math.abs(Math.floor(e))%a.length];return t.slice(0,o)+Se[t[o].toUpperCase()]+t.slice(o+1)}function da(t,e=24){const a=Math.floor(Math.max(0,t)/(1e3/e));return[Math.floor(a/e/3600),Math.floor(a/e/60)%60,Math.floor(a/e)%60,a%e].map(n=>String(n).padStart(2,"0")).join(":")}function ua(t){return String(t.getDate()).padStart(2,"0")+"."+String(t.getMonth()+1).padStart(2,"0")+"."+t.getFullYear()}function ha(t){let e=String(t||"").trim().replace(/^#/,"");if(e.length===3&&(e=e.split("").map(o=>o+o).join("")),!/^[0-9a-f]{6}$/i.test(e))return[0,0,0];const a=parseInt(e,16);return[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]}function xa(t,e,a){const o=t.first.length+(t.rest?t.rest.length+1:0),n=e==="orbit"?.98:e==="rail"?.9:e==="mono"?.84:e==="plate"?.7:.74,p=e==="orbit"||e==="rail"?.8:e==="mono"?.9:1,d=e==="plate"||e==="tag"?a*1.2:e==="orbit"?a*2:0,h=o*a*p*n+d,i=t.role?t.role.length*a*.62*.86:0,r=a*(e==="plate"||e==="tag"?1.75:1.15)+(t.role?a*.95:0)+(e==="rail"?8:0);return{w:Math.ceil(Math.max(h,i)),h:Math.ceil(r)}}function va(t,e,a,o,n,p,d){const h=Math.min(e,a),i=a>e*1.1?t.p:t.e,r=Math.max(14,Math.round(e*.025)),w=8,g=e/2+t.a[0]*h,T=a/2-t.a[1]*h,f=p+n/2+6,x=a-d-n/2-6,M=f>x?a/2:F(a/2-i[1]*a,f,x);let y=e/2+i[0]*e;t.side==="l"?y=Math.min(e-r,Math.max(y,r+o+w)):y=Math.max(r,Math.min(y,e-r-o-w));const k=y+(t.side==="l"?18:-18),j=Math.max(40,t.side==="l"?y-w-r:e-y-w-r);return{ax:g,ay:T,kx:k,ex:y,ey:M,side:t.side,room:j}}const ga=[{name:"Ada Lindqvist",role:"Direction"},{name:"Theo Marchetti",role:"Art direction"},{name:"Noor Haddad",role:"Motion"},{name:"Kenji Arata",role:"3D"},{name:"Lena Okafor",role:"Typography"},{name:"Mateo Ruiz",role:"Lighting"},{name:"Ines Duarte",role:"Compositing"},{name:"Oskar Brandt",role:"Sound"},{name:"Priya Raman",role:"Engineering"},{name:"Jonas Weller",role:"Edit"},{name:"Saoirse Byrne",role:"Producer"},{name:"Yusuf Demir",role:"Colour"},{name:"Maya Sorensen",role:"Storyboard"},{name:"Dev Kapoor",role:"Shaders"},{name:"Elsa Novak",role:"Particles"},{name:"Rafe Callahan",role:"Camera"},{name:"Zoe Laurent",role:"Titles"},{name:"Kai Moreno",role:"Rigging"},{name:"Hana Sato",role:"Illustration"},{name:"Felix Adeyemi",role:"Music"},{name:"Clara Voss",role:"Research"},{name:"Arjun Mehta",role:"Pipeline"},{name:"Lucia Ferri",role:"Design"},{name:"Emil Strand",role:"Tools"}],ya=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,ba=`#version 300 es
precision highp float;
out vec4 o;
uniform vec2 uRes;
uniform float uTime;
uniform float uT;
uniform int uScene;
uniform vec2 uMouse;
uniform float uFade;
uniform float uReveal;
uniform float uFF;
uniform float uFlash;
uniform float uGrain;
uniform float uMotion;
uniform vec3 uTint;
uniform vec3 uShade;
uniform vec3 uAccent;
uniform vec3 uHot;
uniform float uPx;

#define PI 3.14159265

float h11(float p) { p = fract(p * 0.1031); p *= p + 33.33; p *= p + p; return fract(p); }
float h21(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
float h31(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }

float vn(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), u.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), u.x), u.y);
}
float vn3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  float a = mix(mix(h31(i), h31(i + vec3(1.0, 0.0, 0.0)), u.x), mix(h31(i + vec3(0.0, 1.0, 0.0)), h31(i + vec3(1.0, 1.0, 0.0)), u.x), u.y);
  float b = mix(mix(h31(i + vec3(0.0, 0.0, 1.0)), h31(i + vec3(1.0, 0.0, 1.0)), u.x), mix(h31(i + vec3(0.0, 1.0, 1.0)), h31(i + vec3(1.0, 1.0, 1.0)), u.x), u.y);
  return mix(a, b, u.z);
}
const mat2 M2 = mat2(1.6, 1.2, -1.2, 1.6);
float fbm(vec2 p) { float s = 0.0; float a = 0.5; for (int i = 0; i < 5; i++) { s += a * vn(p); p = M2 * p; a *= 0.5; } return s; }
float fbm3(vec2 p) { float s = 0.0; float a = 0.5; for (int i = 0; i < 3; i++) { s += a * vn(p); p = M2 * p; a *= 0.5; } return s; }
mat2 rot(float a) { float c = cos(a); float s = sin(a); return mat2(c, s, -s, c); }
float sdBox(vec3 p, vec3 b) { vec3 q = abs(p) - b; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0); }
float sdBox2(vec2 p, vec2 b) { vec2 q = abs(p) - b; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0); }
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a; vec2 ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
float band(float x, float w) { return 1.0 - smoothstep(0.0, w, abs(x)); }
vec3 camRay(vec3 ro, vec3 ta, vec2 uv, float f) {
  vec3 w = normalize(ta - ro);
  vec3 u = normalize(cross(vec3(0.0, 1.0, 0.0), w));
  vec3 v = cross(w, u);
  return normalize(uv.x * u + uv.y * v + f * w);
}

/* 0 · a dark room, light fanning through a window onto a monitor */
vec3 sBeams(vec2 uv, float t) {
  uv *= 1.0 - 0.012 * t;
  uv += uMouse * vec2(0.03, 0.018);
  vec2 L = vec2(1.1, 1.0);
  vec2 d = uv - L;
  float dist = length(d);
  float ang = atan(d.y, d.x) + 0.015 * sin(t * 0.5);
  float q = (ang + 2.62) / 0.66;
  float inWin = smoothstep(-0.03, 0.03, q) * (1.0 - smoothstep(0.97, 1.03, q));
  float soft = 0.03 + 0.05 * dist;
  float pane = inWin * (1.0 - smoothstep(0.36 - soft, 0.44, abs(fract(q * 4.0) - 0.5)));
  float dust = 0.5 + 0.9 * fbm(uv * 3.0 + vec2(t * 0.05, -t * 0.03));
  float shaft = pane * exp(-dist * 0.55) * dust * 0.5;
  float fy = -0.24;
  float onFloor = 1.0 - smoothstep(fy - 0.003, fy + 0.003, uv.y);
  float pool = pane * onFloor * exp(-dist * 0.3) * (0.7 + 0.5 * vn(vec2(uv.x * 9.0, 3.0 / max(fy - uv.y + 0.04, 0.02))));
  float wall = 0.03 + 0.035 * smoothstep(-0.25, 0.7, uv.y);
  float flo = 0.018 + 0.02 * smoothstep(-0.9, fy, uv.y);
  float c = mix(wall, flo, onFloor) + shaft + pool * 0.55;
  c += 0.3 * exp(-dist * 2.2);
  c += 0.05 * band(uv.y - fy, 0.004);
  vec2 m = uv - vec2(-0.44, 0.03);
  m.y -= m.x * 0.16;
  float sd = sdBox2(m, vec2(0.25, 0.155)) - 0.006;
  float inside = 1.0 - smoothstep(0.0, 0.0025, sd);
  float inScr = 1.0 - smoothstep(0.0, 0.002, sdBox2(m, vec2(0.232, 0.138)));
  float glare = pane * 0.22 * band(m.x * 0.9 + m.y - 0.04 + 0.03 * sin(t * 0.35), 0.07);
  float glass = 0.01 + glare + 0.025 * (1.0 - smoothstep(-0.14, 0.14, m.y));
  float mon = mix(0.02 + shaft * 0.35, glass + shaft * 0.2, inScr);
  float rim = band(sd, 0.0035) * (0.2 + shaft * 2.2);
  float stand = 1.0 - smoothstep(0.0, 0.0025, sdBox2(uv - vec2(-0.43, -0.175), vec2(0.016, 0.06)));
  float foot = 1.0 - smoothstep(0.0, 0.0025, sdBox2(uv - vec2(-0.43, -0.238), vec2(0.085, 0.007)));
  c = mix(c, 0.015 + shaft * 0.15, max(stand, foot) * (1.0 - inside));
  c = mix(c, mon, inside) + rim;
  float tally = (1.0 - smoothstep(0.0, 0.002, sdBox2(m - vec2(0.14, 0.095), vec2(0.02, 0.0045)))) * inScr;
  vec2 g = uv * 26.0 + vec2(t * 0.35, -t * 0.22);
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5 - (vec2(h21(id), h21(id + 7.3)) - 0.5) * 0.7;
  float mote = (1.0 - smoothstep(0.0, 0.07, length(f))) * step(0.84, h21(id + 3.1));
  c += mote * pane * 0.7 * (1.0 - inside) * (0.5 + 0.5 * sin(t * 3.0 + h21(id) * 20.0));
  return vec3(c) + uHot * tally * 1.1;
}

/* 1 · a faceted monolith turning under a lamp, in fog */
float sdPoly(vec3 p, float r) {
  const float G = 1.618034;
  float d = abs(dot(p, normalize(vec3(0.0, 1.0, G))));
  d = max(d, abs(dot(p, normalize(vec3(0.0, 1.0, -G)))));
  d = max(d, abs(dot(p, normalize(vec3(1.0, G, 0.0)))));
  d = max(d, abs(dot(p, normalize(vec3(-1.0, G, 0.0)))));
  d = max(d, abs(dot(p, normalize(vec3(G, 0.0, 1.0)))));
  d = max(d, abs(dot(p, normalize(vec3(-G, 0.0, 1.0)))));
  float e = abs(dot(p, normalize(vec3(1.0, 1.0, 1.0))));
  e = max(e, abs(dot(p, normalize(vec3(-1.0, 1.0, 1.0)))));
  e = max(e, abs(dot(p, normalize(vec3(1.0, -1.0, 1.0)))));
  e = max(e, abs(dot(p, normalize(vec3(1.0, 1.0, -1.0)))));
  e = max(e, abs(dot(p, normalize(vec3(0.0, 1.0 / G, G)))));
  e = max(e, abs(dot(p, normalize(vec3(0.0, 1.0 / G, -G)))));
  e = max(e, abs(dot(p, normalize(vec3(1.0 / G, G, 0.0)))));
  e = max(e, abs(dot(p, normalize(vec3(-1.0 / G, G, 0.0)))));
  e = max(e, abs(dot(p, normalize(vec3(G, 0.0, 1.0 / G)))));
  e = max(e, abs(dot(p, normalize(vec3(-G, 0.0, 1.0 / G)))));
  return max(d - r, e - r * 0.99);
}
float mMono(vec3 p, float t) {
  vec3 q = p - vec3(0.0, 0.15 + 0.04 * sin(t * 0.9), 0.0);
  q.xz *= rot(t * 0.2 + 0.5);
  q.xy *= rot(0.4);
  return min(sdPoly(q, 0.62), p.y + 1.0);
}
vec3 sMonolith(vec2 uv, float t) {
  float ang = 0.6 + t * 0.06 + uMouse.x * 0.3;
  vec3 ro = vec3(sin(ang) * 4.8, 0.35 + uMouse.y * 0.35, -cos(ang) * 4.8);
  vec3 rd = camRay(ro, vec3(0.0, 0.1, 0.0), uv, 1.9);
  float d = 0.0;
  bool hit = false;
  for (int i = 0; i < 90; i++) {
    float h = mMono(ro + rd * d, t);
    if (h < 0.0015) { hit = true; break; }
    d += h;
    if (d > 18.0) break;
  }
  vec3 Lp = vec3(0.7, 6.0, 0.3);
  float c = 0.012;
  if (hit) {
    vec3 p = ro + rd * d;
    vec2 e = vec2(0.002, 0.0);
    vec3 n = normalize(vec3(
      mMono(p + e.xyy, t) - mMono(p - e.xyy, t),
      mMono(p + e.yxy, t) - mMono(p - e.yxy, t),
      mMono(p + e.yyx, t) - mMono(p - e.yyx, t)));
    vec3 l = normalize(Lp - p);
    float spot = smoothstep(0.95, 0.988, dot(normalize(p - Lp), vec3(0.0, -1.0, 0.0)));
    float sh = 1.0;
    float st = 0.03;
    for (int i = 0; i < 28; i++) {
      float h = mMono(p + l * st, t);
      sh = min(sh, 12.0 * h / st);
      st += clamp(h, 0.02, 0.35);
      if (sh < 0.005 || st > 7.0) break;
    }
    sh = clamp(sh, 0.0, 1.0);
    float ground = step(p.y, -0.99);
    float dif = max(dot(n, l), 0.0);
    float rim = pow(clamp(1.0 + dot(rd, n), 0.0, 1.0), 5.0);
    float fill = max(dot(n, normalize(vec3(-0.7, 0.25, -0.6))), 0.0);
    float face = 0.85 + 0.3 * h31(floor(n * 23.0 + 50.0));
    float obj = (0.03 + dif * (0.25 + spot * 0.9) * sh + fill * 0.07 + rim * 0.35) * face;
    float gnd = 0.012 + dif * spot * sh * 0.85 + 0.02 * vn(p.xz * 3.0);
    c = mix(obj, gnd, ground);
    c = mix(c, 0.012, 1.0 - exp(-0.012 * d * d));
  }
  float tmax = hit ? d : 18.0;
  float stp = tmax / 26.0;
  float jit = h21(gl_FragCoord.xy + fract(uTime) * 91.0);
  float vol = 0.0;
  for (int i = 0; i < 26; i++) {
    vec3 p = ro + rd * ((float(i) + jit) * stp);
    float cone = smoothstep(0.95, 0.988, dot(normalize(p - Lp), vec3(0.0, -1.0, 0.0)));
    vec2 sc = -Lp.xz * (0.15 - p.y) / (Lp.y - 0.15);
    float occ = p.y > 0.8 ? 1.0 : smoothstep(0.4, 0.66, length(p.xz - sc));
    float dens = 0.6 + 0.4 * vn3(p * 1.4 + vec3(0.0, -t * 0.2, t * 0.07));
    vol += cone * occ * dens;
  }
  c += vol * stp * 0.1;
  return vec3(c);
}

/* 2 · an explosion held still round an eye that watches the pointer */
float mDebris(vec3 p, float t, out float id) {
  float d = length(p) - 0.36;
  id = 0.0;
  for (int i = 0; i < 14; i++) {
    float fi = float(i);
    vec3 dir = normalize(vec3(h11(fi * 3.1 + 1.0), h11(fi * 5.7 + 2.0), h11(fi * 7.3 + 3.0)) * 2.0 - 1.0 + 0.001);
    float r = 0.8 + 1.7 * h11(fi * 1.9 + 4.0) + t * 0.05;
    vec3 q = p - dir * r;
    q.xy *= rot(t * (0.2 + 0.4 * h11(fi)) + fi);
    q.yz *= rot(t * (0.15 + 0.3 * h11(fi + 9.0)) + fi * 2.0);
    float k = h11(fi * 9.1);
    vec3 b = k < 0.45 ? vec3(0.3, 0.014, 0.2) * (0.55 + k) : vec3(0.08, 0.11, 0.065) * (0.7 + k);
    float s = sdBox(q, b) - 0.005;
    if (s < d) { d = s; id = fi + 1.0; }
  }
  return d;
}
float mDebrisD(vec3 p, float t) { float id; return mDebris(p, t, id); }
vec3 sDebris(vec2 uv, float t) {
  vec3 ro = vec3(uMouse.x * 0.6, 0.1 + uMouse.y * 0.4, -6.2);
  vec3 rd = camRay(ro, vec3(0.0), uv, 2.0);
  vec2 sp = uv * 1.6;
  float smoke = fbm(sp + vec2(fbm(sp + t * 0.03), fbm(sp - t * 0.02)) * 1.2);
  float c = 0.012 + 0.16 * smoke * smoke * smoothstep(-0.4, 0.9, uv.x + uv.y * 0.6) + 0.04 * exp(-dot(uv, uv) * 5.0);
  vec3 col = vec3(c);
  float d = 0.0;
  float id = 0.0;
  bool hit = false;
  for (int i = 0; i < 80; i++) {
    float h = mDebris(ro + rd * d, t, id);
    if (h < 0.0015) { hit = true; break; }
    d += h;
    if (d > 13.0) break;
  }
  if (hit) {
    vec3 p = ro + rd * d;
    vec2 e = vec2(0.002, 0.0);
    vec3 n = normalize(vec3(
      mDebrisD(p + e.xyy, t) - mDebrisD(p - e.xyy, t),
      mDebrisD(p + e.yxy, t) - mDebrisD(p - e.yxy, t),
      mDebrisD(p + e.yyx, t) - mDebrisD(p - e.yyx, t)));
    vec3 l = normalize(vec3(0.7, 0.8, -0.6));
    float dif = max(dot(n, l), 0.0);
    float back = pow(clamp(1.0 + dot(rd, n), 0.0, 1.0), 3.0) * max(dot(n, normalize(vec3(-0.8, 0.2, 0.6))), 0.0);
    float spec = pow(max(dot(reflect(rd, n), l), 0.0), 40.0);
    col = vec3((0.015 + dif * dif * 0.85 + back * 0.9 + spec * 0.9) * (0.75 + 0.3 * h11(id * 4.1)));
    if (id < 0.5) {
      vec3 look = normalize(vec3(uMouse.x * 0.9, uMouse.y * 0.7 + 0.05, -1.0));
      float k = dot(normalize(p), look);
      float iris = smoothstep(0.86, 0.875, k);
      float pupil = smoothstep(0.955, 0.962, k);
      float fib = 0.7 + 0.3 * vn(p.xy * 38.0);
      vec3 ir = uAccent * (0.3 + 0.55 * fib) * (0.45 + dif);
      vec3 sclera = vec3(0.5 + dif * 0.45 + back * 0.2);
      col = mix(sclera, ir, iris);
      col = mix(col, vec3(0.01), pupil);
      col += vec3(spec * 1.2);
    }
    col = mix(col, vec3(c), 1.0 - exp(-0.004 * d * d));
  }
  return col;
}

/* 3 · lit fog for the reticle */
vec3 sTarget(vec2 uv, float t) {
  vec2 p = uv * 1.1 + uMouse * 0.05;
  vec2 w = vec2(fbm(p * 1.4 + vec2(t * 0.05, 0.0)), fbm(p * 1.4 + vec2(5.2, -t * 0.04)));
  float f = fbm(p * 1.9 + w * 1.6 + vec2(-t * 0.06, t * 0.02));
  float glow = exp(-dot(uv, uv) * 2.4);
  float c = 0.03 + f * f * 0.9 * (0.3 + 0.9 * glow) + glow * 0.12;
  c *= 0.75 + 0.25 * smoothstep(-0.9, 0.3, uv.y);
  return vec3(c);
}

/* 4 · a kaleidoscope tunnel of blocks, flying towards the light */
float mTunnel(vec3 p) {
  float r = length(p.xy);
  float a = atan(p.y, p.x) + p.z * 0.035;
  float sec = 2.0 * PI / 12.0;
  float af = abs(a - sec * floor(a / sec + 0.5));
  vec2 pp = vec2(cos(af), sin(af)) * r;
  float cell = 0.6;
  float zi = floor(p.z / cell + 0.5);
  float z = p.z - zi * cell;
  float R = 1.55;
  float d = R - r;
  for (int k = 0; k < 3; k++) {
    float fk = float(k);
    float hh = h21(vec2(zi, 1.3 + fk * 6.1));
    float g = 0.1 + 0.62 * hh * hh;
    float zo = (h21(vec2(zi, 4.7 + fk)) - 0.5) * cell * 0.3;
    d = min(d, sdBox(vec3(pp.x - (R - g * 0.5), pp.y - (0.064 + fk * 0.126), z - zo), vec3(g * 0.5, 0.066, cell * (0.22 + 0.14 * hh))));
  }
  return d * 0.6;
}
vec3 sTunnel(vec2 uv, float t) {
  vec3 ro = vec3(uMouse.x * 0.15, uMouse.y * 0.12, t * 1.1);
  vec2 q = rot(t * 0.12) * uv;
  vec3 rd = normalize(vec3(q, 1.25));
  float d = 0.0;
  bool hit = false;
  float steps = 0.0;
  for (int i = 0; i < 110; i++) {
    float h = mTunnel(ro + rd * d);
    if (h < 0.001) { hit = true; break; }
    d += min(h, 0.3);
    steps += 1.0;
    if (d > 28.0) break;
  }
  float c = 1.0;
  if (hit) {
    vec3 p = ro + rd * d;
    vec2 e = vec2(0.002, 0.0);
    vec3 n = normalize(vec3(
      mTunnel(p + e.xyy) - mTunnel(p - e.xyy),
      mTunnel(p + e.yxy) - mTunnel(p - e.yxy),
      mTunnel(p + e.yyx) - mTunnel(p - e.yyx)));
    vec3 l = normalize(vec3(-p.xy * 0.25, 1.0));
    float dif = max(dot(n, l), 0.0);
    float ao = 1.0 - steps / 110.0;
    float surf = (0.01 + 0.55 * pow(dif, 3.0) + 0.05 * max(dot(n, -rd), 0.0)) * ao;
    c = mix(surf, 1.0, smoothstep(2.0, 24.0, d));
  }
  return vec3(c + exp(-length(uv) * 5.0) * 0.3);
}

/* 5 · a night for the date */
vec3 sStars(vec2 uv, float t) {
  float c = 0.006 + 0.03 * exp(-uv.y * uv.y * 40.0);
  for (int k = 0; k < 2; k++) {
    float fk = float(k);
    vec2 g = uv * (60.0 + fk * 80.0) + fk * 13.1 + uMouse * (4.0 + 6.0 * fk);
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5 - (vec2(h21(id + 1.7), h21(id + 9.2)) - 0.5) * 0.6;
    float hs = h21(id);
    float star = (1.0 - smoothstep(0.0, 0.08, length(f))) * step(0.93, hs);
    c += star * (0.3 + 0.35 * sin(t * 2.0 + hs * 50.0) + 0.3) * (0.6 - 0.25 * fk);
  }
  c += 0.05 * fbm(uv * 1.5 + t * 0.02) * exp(-uv.y * uv.y * 6.0);
  return vec3(c);
}

/* 6 · a moon over a ridge; the figure standing on it is drawn crisp in SVG */
vec3 sMoon(vec2 uv, float t) {
  vec2 par = uMouse * vec2(7.0, 5.0) * uPx;
  vec2 mc = vec2(0.0, 0.08 + 0.004 * t) - par * 0.35;
  float R = 0.48;
  vec2 q = (uv - mc) / R;
  float r = length(q);
  float c = 0.03 + 0.03 * smoothstep(-0.5, 0.5, uv.y);
  float halo = 0.3 * exp(-(max(r, 1.0) - 1.0) * 6.0) + 0.12 * exp(-(max(r, 1.0) - 1.0) * 1.8);
  float disc = 1.0 - smoothstep(0.995, 1.005, r);
  vec3 n = vec3(q, sqrt(max(0.0, 1.0 - r * r)));
  float light = 0.35 + 0.65 * max(dot(n, normalize(vec3(-0.3, 0.2, 1.0))), 0.0);
  float alb = 0.78 - 0.35 * smoothstep(0.45, 0.75, fbm(q * 2.2 + 3.1));
  vec2 cg = q * 7.0;
  vec2 ci = floor(cg);
  float cr = 0.15 + 0.25 * h21(ci);
  float cd = length(fract(cg) - 0.5 - (vec2(h21(ci + 2.0), h21(ci + 5.0)) - 0.5) * 0.4);
  alb += step(0.8, h21(ci + 9.0)) * (band(cd - cr, 0.025) * 0.06 - (1.0 - smoothstep(0.0, cr, cd)) * 0.07);
  alb += 0.08 * (fbm(q * 12.0) - 0.5);
  float moon = alb * light * (0.65 + 0.35 * sqrt(n.z));
  c = mix(c + halo, moon * 1.25, disc);
  vec2 gp = uv + par;
  float gx = gp.x;
  float gy = -0.3 + (0.05 * fbm(vec2(gx * 2.2, 1.0)) - 0.025 + 0.012 * vn(vec2(gx * 14.0, 0.0))) * smoothstep(0.06, 0.35, abs(gx));
  float below = gy - gp.y;
  float gm = smoothstep(-0.0015, 0.0015, below);
  float rimg = exp(-max(below, 0.0) * 55.0) * 0.55 * (0.6 + 0.4 * fbm(vec2(gx * 30.0, gp.y * 30.0)));
  float rock = 0.02 + 0.05 * fbm(gp * 18.0) * exp(-max(below, 0.0) * 6.0);
  c = mix(c, rock + rimg * (0.4 + 0.6 * exp(-abs(gx) * 1.5)), gm);
  c += 0.12 * exp(-abs(below) * 25.0) * (0.5 + 0.5 * fbm(vec2(gx * 3.0 - t * 0.1, 0.0)));
  return vec3(c);
}

/* 7 · a dark planet with a lashed corona; its sun follows the pointer */
vec3 sEclipse(vec2 uv, float t) {
  vec2 q = uv + uMouse * 0.01;
  float R = 0.2;
  float r = length(q);
  vec2 dir = q / max(r, 0.0001);
  vec2 ld = normalize(vec2(-0.55, 0.6) + uMouse * 1.6 + vec2(0.0001, 0.0));
  float lit = 0.5 + 0.5 * dot(dir, ld);
  float c = 0.012 + 0.02 * fbm3(uv * 1.2);
  vec2 sg = uv * 110.0;
  vec2 sid = floor(sg);
  c += step(0.975, h21(sid)) * (1.0 - smoothstep(0.0, 0.3, length(fract(sg) - 0.5))) * 0.35;
  float out1 = max(r - R, 0.0);
  float disc = 1.0 - smoothstep(R - 0.0015, R + 0.0015, r);
  c += (0.35 * exp(-out1 * 30.0) + 0.1 * exp(-out1 * 6.0)) * (0.25 + 0.75 * lit * lit) * (1.0 - disc);
  float a = atan(q.y, q.x);
  float fil = 0.0;
  for (int k = 0; k < 3; k++) {
    float fk = float(k);
    float aa = a + out1 * (fk - 1.0) * 2.5 + 0.02 * sin(t * 0.7 + fk);
    vec2 ring = vec2(cos(aa), sin(aa));
    float strand = pow(vn(ring * (9.5 + fk * 5.0) + fk * 7.0), 12.0);
    float len = 0.02 + 0.09 * vn(ring * 1.6 + fk * 3.0 + 1.0);
    fil += strand * (1.0 - smoothstep(0.0, len, out1));
  }
  c += fil * 1.4 * (0.3 + 0.7 * lit) * (1.0 - disc);
  vec2 sp = q * 2.2;
  vec2 w = vec2(fbm(sp + vec2(t * 0.05, 0.0)), fbm(sp + vec2(3.3, -t * 0.04)));
  float smoke = smoothstep(0.55, 0.85, fbm(sp * 1.4 + w * 2.2 + vec2(-t * 0.06, 0.0)));
  c += smoke * exp(-abs(r - 0.36) * 5.0) * (1.0 - disc) * 0.3 * (0.4 + 0.6 * lit);
  vec3 n = vec3(q / R, sqrt(max(0.0, 1.0 - r * r / (R * R))));
  float rimL = pow(1.0 - n.z, 2.5) * max(dot(dir, ld), 0.0);
  float surf = 0.01 + 0.04 * fbm(q * 18.0) * n.z + rimL * 0.85;
  surf += 0.03 * band(r - R * 0.45, 0.012) * (0.5 + 0.5 * vn(dir * 14.0));
  c = mix(c, surf, disc);
  float oa = t * 0.35 + 2.2;
  vec2 sc = vec2(cos(oa) * 0.36, sin(oa) * 0.08 + 0.21);
  float sd = length(q - sc);
  c += (1.0 - smoothstep(0.009, 0.011, sd)) * (0.25 + 0.5 * max(dot(normalize(q - sc + 0.0001), ld), 0.0)) + 0.06 * exp(-sd * 40.0);
  return vec3(c);
}

/* 8 · lift-off through the clouds, then the clouds rise over the lens */
float puff(float x, float s, float seed) {
  float i = floor(x / s);
  float best = -1.0;
  for (int k = -1; k <= 1; k++) {
    float j = i + float(k);
    float cx = (j + 0.5 + 0.4 * (h11(j * 1.7 + seed) - 0.5)) * s;
    float r = s * (0.6 + 0.5 * h11(j * 3.1 + seed * 2.0));
    float dx = x - cx;
    best = max(best, sqrt(max(r * r - dx * dx, 0.0)) - r * 0.45);
  }
  return best;
}
vec4 sLiftoff(vec2 uv, float t) {
  float rise = smoothstep(0.0, 0.62, uReveal);
  float pan = smoothstep(1.2, 4.6, t) * 0.07;
  vec2 w = uv + vec2(0.0, pan);
  float ry = 0.0 + 0.02 * t + 0.022 * t * t;
  vec2 rk = vec2(0.01 * sin(t * 0.8), ry);
  vec2 noz = rk - vec2(0.0, 0.032);
  float base = -0.2;
  float c = 0.012 + 0.03 * (1.0 - smoothstep(-0.3, 0.5, w.y));
  vec2 sg = w * 90.0;
  c += step(0.985, h21(floor(sg))) * (1.0 - smoothstep(0.0, 0.3, length(fract(sg) - 0.5))) * 0.5 * smoothstep(0.0, 0.5, w.y);
  c += 0.22 * exp(-length((w - noz) * vec2(1.0, 0.6)) * 4.0);
  float below = max(noz.y - w.y, 0.0);
  float on = step(w.y, noz.y);
  float wob = vn(vec2(w.y * 22.0 - t * 14.0, 1.0)) - 0.5;
  float wid = 0.003 + 0.045 * pow(below, 0.85) + abs(wob) * 0.012 * min(below * 4.0, 1.0);
  float dx = w.x - rk.x - wob * 0.03 * below;
  float core = exp(-dx * dx / (wid * wid)) * on;
  float trail = exp(-dx * dx / (wid * wid * 9.0 + 0.0004)) * on;
  float smk = 0.5 + 0.5 * fbm(vec2(w.x * 26.0, w.y * 9.0 - t * 1.6));
  c += core * (1.6 - min(below, 1.0) * 0.9) + trail * 0.28 * smk;
  c += 2.2 * exp(-length((w - noz) * vec2(1.0, 0.6)) * 90.0);
  vec2 rp = w - rk;
  float rkd = min(min(sdBox2(rp, vec2(0.0048, 0.026)) - 0.0015, length(rp - vec2(0.0, 0.026)) - 0.0048), sdBox2(rp + vec2(0.0, 0.02), vec2(0.01, 0.005)) - 0.001);
  float rkm = 1.0 - smoothstep(0.0, 0.0012, rkd);
  c = mix(c, 0.03 + 0.25 * (1.0 - smoothstep(-0.03, 0.01, rp.y)), rkm);
  for (int i = 0; i < 3; i++) {
    float L = float(i);
    float x = w.x + uMouse.x * 0.012 * (L + 1.0);
    float boost = 0.13 * exp(-pow((x - rk.x) / (0.16 + 0.05 * t), 2.0)) * smoothstep(0.0, 1.6, t) * (1.0 - L * 0.25);
    float top = base - 0.02 - 0.075 * L + puff(x + L * 3.1, 0.2 - L * 0.03, L * 11.0) * 0.55 + puff(x + L * 7.7, 0.07, L * 5.0 + 3.0) * 0.5 + boost + rise * (1.3 + L * 0.12);
    float depth = top - w.y;
    float edge = 0.006 + 0.01 * L;
    float m = smoothstep(-edge, edge, depth + 0.012 * (fbm3(vec2(x * 22.0, w.y * 22.0 + t * 0.1)) - 0.5));
    float light = 0.12 + 1.7 * exp(-abs(x - rk.x) * (2.2 + L)) * smoothstep(0.0, 0.8, t + 0.3);
    float tex = fbm(vec2(x * 6.0 + L * 4.0, w.y * 7.0 - t * 0.05 * (L + 1.0)));
    float shade = light * (0.3 + 0.7 * tex) * (0.55 + 0.6 * exp(-max(depth, 0.0) * 18.0)) * (1.0 - 0.22 * L);
    shade = mix(shade, 1.05 + 0.35 * tex, rise);
    c = mix(c, shade, m);
  }
  float u2 = smoothstep(0.42, 1.0, uReveal);
  float nz = fbm(uv * 2.3 + 11.0);
  float thr = u2 * 1.3 - 0.12;
  float alpha = smoothstep(thr - 0.05, thr + 0.05, nz);
  c += band(nz - thr, 0.06) * u2 * 0.6;
  return vec4(vec3(c), alpha);
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float row = floor(fc.y / 3.0);
  fc.x += (h11(row * 1.7 + floor(uTime * 30.0)) - 0.5) * 22.0 * uFF * uRes.x / 1200.0;
  float m = min(uRes.x, uRes.y);
  vec2 uv = (fc - 0.5 * uRes) / m;
  uv += uMotion * (vec2(vn(vec2(uTime * 2.1, 1.0)), vn(vec2(uTime * 1.7, 5.0))) - 0.5) * 0.002;
  float t = uT;
  vec3 col = vec3(0.0);
  float alpha = 1.0;
  if (uScene == 0) col = sBeams(uv, t);
  else if (uScene == 1) col = sMonolith(uv, t);
  else if (uScene == 2) col = sDebris(uv, t);
  else if (uScene == 3) col = sTarget(uv, t);
  else if (uScene == 4) col = sTunnel(uv, t);
  else if (uScene == 5) col = sStars(uv, t);
  else if (uScene == 6) col = sMoon(uv, t);
  else if (uScene == 7) col = sEclipse(uv, t);
  else { vec4 r = sLiftoff(uv, t); col = r.rgb; alpha = r.a; }
  col *= uFade;
  col += uFlash * 0.55;
  col = col * 1.15 / (1.0 + col * 0.35);
  float l = dot(col, vec3(0.299, 0.587, 0.114));
  vec3 g = mix(uShade, uTint, clamp(l, 0.0, 1.0)) + (col - l);
  g *= 1.0 - 0.55 * smoothstep(0.3, 1.3, length(uv * vec2(0.72, 1.0)));
  g += (h21(fc + fract(uTime * 7.3) * 517.0) - 0.5) * uGrain * 0.1;
  float sc = floor(uTime * 11.0);
  g += step(0.83, h11(sc)) * band(uv.x - (h11(sc + 3.0) - 0.5) * 1.7, 0.0011) * 0.07 * uGrain * uMotion;
  g += uFF * 0.1 * band(fract(fc.y / uRes.y + uTime * 0.9) - 0.5, 0.025);
  o = vec4(clamp(g, 0.0, 1.0), alpha);
}`,ka=["uRes","uTime","uT","uScene","uMouse","uFade","uReveal","uFF","uFlash","uGrain","uMotion","uTint","uShade","uAccent","uHot","uPx"];function wa(t){const e=t.createShader(t.VERTEX_SHADER),a=t.createShader(t.FRAGMENT_SHADER),o=t.createProgram();return!e||!a||!o?null:(t.shaderSource(e,ya),t.shaderSource(a,ba),t.compileShader(e),t.compileShader(a),t.attachShader(o,e),t.attachShader(o,a),t.linkProgram(o),{prog:o,vs:e,fs:a})}function Ma(t,e,a){return a&&!t.getProgramParameter(e.prog,a.COMPLETION_STATUS_KHR)?"wait":t.getProgramParameter(e.prog,t.LINK_STATUS)?(t.deleteShader(e.vs),t.deleteShader(e.fs),"ok"):(console.warn("[title-sequence-preloader]",t.getShaderInfoLog(e.fs)||t.getShaderInfoLog(e.vs)||t.getProgramInfoLog(e.prog)),"fail")}const ja=`
.tsp-root { position: relative; width: 100%; isolation: isolate; }
.tsp-dest { position: relative; }
.tsp-gate {
  position: absolute; left: 0; right: 0; top: 0; z-index: 20; overflow: hidden;
  background: #000; color: #eef1f3; outline: none; cursor: crosshair;
  touch-action: manipulation; user-select: none; -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; container-type: inline-size;
  --tsp-cond: "Oswald", "Bebas Neue", "Barlow Condensed", "Roboto Condensed", "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
  --tsp-serif: "Playfair Display", "Bodoni 72", Didot, Georgia, "Times New Roman", serif;
  --tsp-mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;
}
.tsp-gate:focus-visible { box-shadow: inset 0 0 0 2px var(--tsp-accent); }
.tsp-gate[data-phase="reveal"] { pointer-events: none; cursor: default; background: transparent; box-shadow: none; }
.tsp-gate[data-still="true"][data-phase="reveal"] { opacity: 0; transition: opacity .8s ease; }
.tsp-canvas { position: absolute; inset: 0; width: 100%; height: 100%; max-width: none; display: block; }
.tsp-fallback { position: absolute; inset: 0; background: radial-gradient(60% 55% at 50% 45%, #3a3d41 0%, #111214 55%, #000 100%); }
.tsp-fallback[data-scene="4"] { background: radial-gradient(35% 35% at 50% 50%, #fff 0%, #8a8d90 30%, #151617 75%); }
.tsp-fallback[data-scene="5"], .tsp-fallback[data-scene="7"] { background: radial-gradient(40% 40% at 50% 50%, #1b1c1e 0%, #000 70%); }
.tsp-fallback[data-scene="6"] { background: radial-gradient(28% 40% at 50% 42%, #d9dcde 0%, #9ea2a5 60%, #202224 64%, #050505 100%); }
.tsp-fallback[data-scene="8"] { background: linear-gradient(#030303 0%, #0b0b0c 55%, #c9cccf 78%, #6d7073 100%); }
.tsp-layer { position: absolute; inset: 0; pointer-events: none; transition: opacity .24s ease; }
.tsp-layer[data-out="1"] { opacity: 0; }
.tsp-svg { position: absolute; left: 0; top: 0; overflow: visible; max-width: none; }
.tsp-line { fill: none; stroke: rgba(255,255,255,.72); stroke-width: 1; stroke-dasharray: 1; stroke-dashoffset: 1; animation: tsp-draw .45s cubic-bezier(.65,0,.25,1) forwards; transition: stroke .2s, stroke-width .2s; }
.tsp-lead[data-hot="true"] .tsp-line { stroke: var(--tsp-accent); stroke-width: 1.6; }
.tsp-dot { fill: #fff; transform-box: fill-box; transform-origin: center; transform: scale(0); animation: tsp-pop .32s cubic-bezier(.3,1.7,.5,1) forwards; }
.tsp-lead[data-hot="true"] .tsp-dot { fill: var(--tsp-accent); }
.tsp-ring { fill: none; stroke: rgba(255,255,255,.6); stroke-width: 1; transform-box: fill-box; transform-origin: center; opacity: 0; animation: tsp-ping 1.8s ease-out infinite; }
.tsp-hair { fill: none; stroke: rgba(255,255,255,.42); stroke-width: 1; }
.tsp-bold { fill: none; stroke: rgba(255,255,255,.9); stroke-width: 2; }
.tsp-fill { fill: rgba(255,255,255,.92); }
.tsp-knot { fill: rgba(255,255,255,.8); }
.tsp-figure { fill: #030304; filter: drop-shadow(0 0 1.2px rgba(236,241,244,.7)); opacity: 0; animation: tsp-in .6s ease forwards; }
.tsp-limbs { fill: none; stroke: #030304; stroke-width: 6.2; stroke-linecap: round; stroke-linejoin: round; }
.tsp-laser { fill: none; stroke: rgba(255,255,255,.6); stroke-width: 1; stroke-dasharray: 1; stroke-dashoffset: 1; animation: tsp-draw .7s cubic-bezier(.7,0,.2,1) forwards; }
.tsp-date { fill: var(--tsp-accent); font-family: var(--tsp-mono); letter-spacing: .32em; }
.tsp-hud { opacity: 0; animation: tsp-in .5s ease .1s forwards; }
.tsp-spin { transform-box: view-box; animation: tsp-spin 14s linear infinite; }
.tsp-spin-rev { transform-box: view-box; animation: tsp-spin 9s linear infinite reverse; }
.tsp-label {
  position: absolute; transform: translateY(-50%); white-space: nowrap; pointer-events: auto; cursor: default;
  display: flex; flex-direction: column; gap: .3em; font-size: var(--tsp-fs); line-height: 1.05;
  opacity: 0; animation: tsp-in .25s ease forwards; text-shadow: 0 0 14px rgba(0,0,0,.55);
}
.tsp-label[data-side="l"] { align-items: flex-end; text-align: right; }
.tsp-label[data-side="r"] { align-items: flex-start; text-align: left; }
.tsp-name {
  display: inline-flex; align-items: baseline; gap: .36em; font-family: var(--tsp-cond); font-weight: 700;
  letter-spacing: .07em; text-transform: uppercase; color: #f4f6f7;
  transition: background-color .18s, color .18s, box-shadow .18s;
}
.tsp-role { font-family: var(--tsp-mono); font-size: .6em; letter-spacing: .24em; text-transform: uppercase; color: rgba(238,241,243,.5); transition: color .18s; }
.tsp-label:hover .tsp-role { color: var(--tsp-accent); }
.tsp-label:hover .tsp-name { background: #f4f6f7; color: #050607; box-shadow: 0 0 0 .28em #f4f6f7; text-shadow: none; }
.tsp-label[data-look="duo"][data-v="0"] .tsp-name { color: var(--tsp-accent); }
.tsp-label[data-look="mono"] .tsp-name { font-weight: 600; font-size: .9em; letter-spacing: .16em; }
.tsp-label[data-look="tag"] .tsp-name { font-size: .92em; letter-spacing: .12em; }
.tsp-label[data-look="tag"][data-v="0"] .tsp-name { color: var(--tsp-marker); }
.tsp-label[data-look="tag"][data-v="3"] .tsp-name { color: var(--tsp-hot); }
.tsp-label[data-look="plate"] .tsp-name, .tsp-label[data-look="tag"][data-v="2"] .tsp-name { background: var(--tsp-plate); padding: .34em .6em .3em; text-transform: none; letter-spacing: .02em; text-shadow: none; }
.tsp-label[data-look="plate"] .tsp-first, .tsp-label[data-look="tag"][data-v="2"] .tsp-first { text-transform: uppercase; letter-spacing: .1em; }
.tsp-label[data-look="plate"] .tsp-rest, .tsp-label[data-look="tag"][data-v="2"] .tsp-rest { font-family: var(--tsp-serif); font-style: italic; font-weight: 700; letter-spacing: .01em; color: #dce6ff; }
.tsp-label[data-look="plate"]:hover .tsp-name, .tsp-label[data-look="tag"][data-v="2"]:hover .tsp-name { background: #f4f6f7; box-shadow: none; }
.tsp-label[data-look="plate"]:hover .tsp-rest, .tsp-label[data-look="tag"][data-v="2"]:hover .tsp-rest { color: var(--tsp-plate); }
.tsp-label[data-look="orbit"] .tsp-name { font-family: var(--tsp-mono); font-weight: 500; font-size: .8em; letter-spacing: .34em; }
.tsp-label[data-look="rail"] .tsp-name { font-weight: 600; font-size: .8em; letter-spacing: .22em; }
.tsp-ruler { display: block; align-self: stretch; height: 6px; border-top: 1px solid rgba(238,241,243,.55); background: repeating-linear-gradient(90deg, rgba(238,241,243,.55) 0 1px, transparent 1px 6px); background-size: 100% 4px; background-repeat: no-repeat; }
.tsp-rings { display: inline-flex; align-self: center; color: var(--tsp-accent); }
.tsp-rings i { width: .8em; height: .8em; border: 1px solid currentColor; border-radius: 50%; display: block; }
.tsp-rings i + i { margin-left: -.3em; }
.tsp-bar {
  position: absolute; left: 0; right: 0; z-index: 2; display: flex; align-items: center; justify-content: space-between;
  gap: 18px; padding: 0 24px; padding: 0 clamp(14px, 3.2cqw, 40px); background: #000;
  font-family: var(--tsp-mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
  color: rgba(238,241,243,.58); transition: transform 1.1s cubic-bezier(.7,0,.2,1);
}
.tsp-top { top: 0; border-bottom: 1px solid rgba(255,255,255,.06); }
.tsp-bottom { bottom: 0; border-top: 1px solid rgba(255,255,255,.06); }
.tsp-gate[data-phase="reveal"] .tsp-top { transform: translateY(-101%); }
.tsp-gate[data-phase="reveal"] .tsp-bottom { transform: translateY(101%); }
.tsp-gate[data-phase="reveal"] .tsp-layer, .tsp-gate[data-phase="reveal"] .tsp-ff { opacity: 0; transition: opacity .3s ease; }
.tsp-brand { display: flex; align-items: center; gap: 10px; min-width: 0; color: #eef1f3; }
.tsp-brand b { font-weight: 600; letter-spacing: .24em; }
.tsp-tri { width: 0; height: 0; flex: none; border-left: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 8px solid var(--tsp-hot); animation: tsp-blink 1.6s steps(2, jump-none) infinite; }
.tsp-dim { color: rgba(238,241,243,.42); }
.tsp-slate { display: flex; gap: 18px; font-variant-numeric: tabular-nums; }
.tsp-count { display: flex; align-items: baseline; gap: 8px; }
.tsp-num { font-family: var(--tsp-cond); font-weight: 700; font-size: 32px; font-size: clamp(22px, 3.4cqw, 40px); line-height: 1; letter-spacing: .02em; color: #f4f6f7; font-variant-numeric: tabular-nums; }
.tsp-pct { font-family: var(--tsp-cond); font-size: 15px; color: var(--tsp-accent); letter-spacing: 0; }
.tsp-status { margin-left: 6px; white-space: nowrap; }
.tsp-reel { position: relative; flex: 1 1 auto; max-width: 440px; display: flex; gap: 4px; align-items: center; }
.tsp-reel i { flex: 1; height: 7px; border: 1px solid rgba(238,241,243,.28); transition: background-color .3s, border-color .3s; }
.tsp-reel i[data-state="past"] { background: rgba(238,241,243,.3); }
.tsp-reel i[data-state="on"] { background: var(--tsp-accent); border-color: var(--tsp-accent); }
.tsp-reel b { position: absolute; left: 0; right: 0; bottom: -7px; height: 1px; background: #f4f6f7; transform-origin: left; transform: scaleX(0); }
.tsp-actions { display: flex; align-items: center; gap: 16px; white-space: nowrap; }
.tsp-skip { font: inherit; letter-spacing: inherit; text-transform: inherit; color: #f4f6f7; background: transparent; border: 1px solid rgba(238,241,243,.4); padding: 8px 13px; cursor: pointer; transition: background-color .2s, color .2s; }
.tsp-skip:hover, .tsp-skip:focus-visible { background: #f4f6f7; color: #000; outline: none; }
.tsp-ff { position: absolute; left: 50%; z-index: 3; transform: translateX(-50%); padding: 5px 9px; background: #f4f6f7; color: #000; font-family: var(--tsp-mono); font-size: 10px; letter-spacing: .24em; pointer-events: none; }
.tsp-fin { position: absolute; transform: translateY(-50%); white-space: nowrap; font-family: var(--tsp-mono); font-weight: 600; letter-spacing: .3em; color: #f4f6f7; text-shadow: 0 0 18px rgba(0,0,0,.6); opacity: 0; animation: tsp-in .4s ease forwards; }
@container (max-width: 760px) { .tsp-hint, .tsp-dim { display: none; } }
@container (max-width: 540px) { .tsp-reel, .tsp-tc { display: none; } .tsp-bar { font-size: 9px; letter-spacing: .14em; } }
@keyframes tsp-draw { to { stroke-dashoffset: 0; } }
@keyframes tsp-pop { to { transform: scale(1); } }
@keyframes tsp-ping { 0% { transform: scale(.4); opacity: .9; } 100% { transform: scale(2.4); opacity: 0; } }
@keyframes tsp-in { to { opacity: 1; } }
@keyframes tsp-spin { to { transform: rotate(360deg); } }
@keyframes tsp-blink { 50% { opacity: .2; } }
@media (prefers-reduced-motion: reduce) {
  .tsp-line, .tsp-laser { animation: none; stroke-dashoffset: 0; }
  .tsp-dot { animation: none; transform: none; }
  .tsp-ring { animation: none; opacity: 0; }
  .tsp-spin, .tsp-spin-rev, .tsp-tri { animation: none; }
  .tsp-label, .tsp-hud, .tsp-fin { animation-duration: .01s; animation-delay: 0s !important; }
  .tsp-bar { transition: none; }
}
`;function vt({text:t,delay:e,dur:a,seed:o,still:n}){const p=u.useRef(null);return u.useEffect(()=>{const d=p.current;if(!d||(d.textContent=n?t:"",n))return;let h=0,i=0,r=0;const w=()=>{i=window.setTimeout(()=>{d.textContent=ma(t,o+r++),i=window.setTimeout(()=>{d.textContent=t,w()},90)},2600+(o*977+r*331)%3400)},g=performance.now(),T=f=>{const x=(f-g-e)/a;if(x>=1){d.textContent=t,w();return}d.textContent=x<0?"":pa(t,x,o),h=requestAnimationFrame(T)};return h=requestAnimationFrame(T),()=>{cancelAnimationFrame(h),clearTimeout(i)}},[t,e,a,o,n]),s.jsx("span",{ref:p})}function ze(){return s.jsxs("span",{className:"tsp-rings",children:[s.jsx("i",{}),s.jsx("i",{})]})}function Sa({c:t,look:e,v:a,geo:o,w:n,delay:p,speed:d,still:h,seed:i,onEnter:r,onLeave:w}){const g={top:o.ey,animationDelay:p+"s",maxWidth:o.room};o.side==="l"?g.right=n-(o.ex-8):g.left=o.ex+8;const T=p*1e3+60,f=460/d;return s.jsxs("div",{className:"tsp-label","data-look":e,"data-v":a,"data-side":o.side,style:g,onPointerEnter:r,onPointerLeave:w,children:[s.jsxs("span",{className:"tsp-name",children:[e==="orbit"&&o.side==="r"?s.jsx(ze,{}):null,s.jsx("span",{className:"tsp-first",children:s.jsx(vt,{text:t.first,delay:T,dur:f,seed:i,still:h})}),t.rest?s.jsx("span",{className:"tsp-rest",children:s.jsx(vt,{text:t.rest,delay:T+110/d,dur:f,seed:i+5,still:h})}):null,e==="orbit"&&o.side==="l"?s.jsx(ze,{}):null]}),e==="rail"?s.jsx("i",{className:"tsp-ruler"}):null,t.role?s.jsx("span",{className:"tsp-role",children:t.role}):null]})}function Yt(t,e,a,o,n){const p=t+Math.cos(o)*a,d=e+Math.sin(o)*a,h=t+Math.cos(n)*a,i=e+Math.sin(n)*a;return"M"+p.toFixed(1)+" "+d.toFixed(1)+" A"+a.toFixed(1)+" "+a.toFixed(1)+" 0 0 1 "+h.toFixed(1)+" "+i.toFixed(1)}function za({id:t,w:e,h:a,fs:o,date:n,speed:p,hudRef:d}){const h=Math.min(e,a),i=e/2,r=a/2,w=f=>i+f*h,g=f=>r-f*h,T={transformOrigin:i.toFixed(1)+"px "+r.toFixed(1)+"px"};if(t==="target"){const f=.19*h,x=Math.max(6,f*.13),M=[];for(let y=0;y<8;y++){const k=y/8*Math.PI*2+Math.PI/8,j=i+Math.cos(k)*f,S=r+Math.sin(k)*f;M.push(s.jsx("rect",{x:j-x/2,y:S-x/2,width:x,height:x,className:"tsp-fill",transform:"rotate("+(k*180/Math.PI).toFixed(1)+" "+j.toFixed(1)+" "+S.toFixed(1)+")"},y))}return s.jsx("g",{ref:d,children:s.jsxs("g",{className:"tsp-hud",children:[s.jsx("line",{x1:i-f*3,y1:r,x2:i-f*1.08,y2:r,className:"tsp-hair"}),s.jsx("line",{x1:i+f*1.08,y1:r,x2:i+f*3,y2:r,className:"tsp-hair"}),s.jsx("line",{x1:i,y1:r-f*1.75,x2:i,y2:r-f*1.08,className:"tsp-hair"}),s.jsx("line",{x1:i,y1:r+f*1.08,x2:i,y2:r+f*1.75,className:"tsp-hair"}),s.jsx("circle",{cx:i,cy:r,r:f,className:"tsp-hair"}),s.jsx("circle",{cx:i,cy:r,r:f*.34,className:"tsp-bold"}),s.jsx("circle",{cx:i,cy:r,r:f*.08,className:"tsp-fill"}),s.jsx("path",{d:Yt(i,r,f*1.3,-.95,.95),className:"tsp-bold"}),s.jsx("g",{className:"tsp-spin",style:T,children:M}),s.jsxs("g",{className:"tsp-spin-rev",style:T,children:[s.jsx("path",{d:Yt(i,r,f*.62,.3,1.5),className:"tsp-hair"}),s.jsx("path",{d:Yt(i,r,f*.62,3.44,4.64),className:"tsp-hair"})]})]})})}if(t==="constellation"){const f=Math.max(58,n.length*o*.62),x=[[-.46,.16],[-.38,.22],[-.3,.17],[-.24,.24]],M=[[.24,-.2],[.31,-.15],[.39,-.22],[.46,-.17]],y=j=>j.map(S=>w(S[0]).toFixed(1)+","+g(S[1]).toFixed(1)).join(" "),k=.15*h;return s.jsxs("g",{className:"tsp-hud",children:[s.jsx("text",{x:i,y:r+o*.34,textAnchor:"middle",className:"tsp-date",style:{fontSize:o*.95},children:n}),k>f+12?s.jsxs(s.Fragment,{children:[s.jsx("line",{x1:i-k,y1:r,x2:i-f-8,y2:r,className:"tsp-hair"}),s.jsx("line",{x1:i+f+8,y1:r,x2:i+k,y2:r,className:"tsp-hair"}),s.jsx("circle",{cx:i-f-8,cy:r,r:2,className:"tsp-knot"}),s.jsx("circle",{cx:i+f+8,cy:r,r:2,className:"tsp-knot"})]}):null,s.jsx("polyline",{points:y(x),className:"tsp-hair"}),s.jsx("polyline",{points:y(M),className:"tsp-hair"}),x.concat(M).map((j,S)=>s.jsx("circle",{cx:w(j[0]),cy:g(j[1]),r:S%2?1.6:2.4,className:"tsp-knot"},S))]})}if(t==="monolith"){const f=[[-1.7,.62,-.04,.06],[-.3,.75,1.8,-.42],[1.6,.5,.06,-.03]];return s.jsx("g",{children:f.map((x,M)=>s.jsx("line",{x1:w(x[0]),y1:g(x[1]),x2:w(x[2]),y2:g(x[3]),pathLength:1,className:"tsp-laser",style:{animationDelay:(.1+M*.14)/p+"s"}},M))})}if(t==="tunnel"||t==="eclipse"){const f=(t==="tunnel"?.09:.21)*h,x=Math.max(14,e*.025);return s.jsxs("g",{className:"tsp-hud",children:[s.jsx("line",{x1:x,y1:r,x2:i-f,y2:r,className:"tsp-hair"}),s.jsx("line",{x1:i+f,y1:r,x2:e-x,y2:r,className:"tsp-hair"}),s.jsx("line",{x1:x,y1:r-4,x2:x,y2:r+4,className:"tsp-hair"}),s.jsx("line",{x1:e-x,y1:r-4,x2:e-x,y2:r+4,className:"tsp-hair"})]})}if(t==="moon"){const f=.36*h/100;return s.jsxs("g",{className:"tsp-figure",transform:"translate("+w(0).toFixed(1)+" "+g(-.3).toFixed(1)+") scale("+f.toFixed(4)+")",children:[s.jsx("circle",{cx:0,cy:-91,r:6}),s.jsx("ellipse",{cx:0,cy:-96,rx:10.5,ry:1.9}),s.jsx("path",{d:"M-6 -96 L-5.4 -104 Q0 -106.6 5.4 -104 L6 -96 Z"}),s.jsx("rect",{x:-2.2,y:-86.5,width:4.4,height:5.5}),s.jsx("path",{d:"M-9 -83 C-11.5 -83 -12.6 -80.5 -12.8 -76 L-14.8 -38 L14.8 -38 L12.8 -76 C12.6 -80.5 11.5 -83 9 -83 Z"}),s.jsx("path",{d:"M3.66 -93.74 L41.44 -125.33 L46.56 -118.67 L6.34 -90.26 Z"}),s.jsx("ellipse",{cx:44,cy:-122,rx:2.4,ry:5.6,transform:"rotate(-37.6 44 -122)"}),s.jsxs("g",{className:"tsp-limbs",children:[s.jsx("line",{x1:-5.5,y1:-40,x2:-7.2,y2:-2}),s.jsx("line",{x1:5.5,y1:-40,x2:7.8,y2:-2}),s.jsx("line",{x1:-11,y1:-78,x2:-15.5,y2:-49}),s.jsx("polyline",{points:"11,-79 20,-87 17,-100"})]}),s.jsx("ellipse",{cx:-9,cy:-1.4,rx:5.2,ry:2.3}),s.jsx("ellipse",{cx:9.6,cy:-1.4,rx:5.2,ry:2.3})]})}if(t==="beams"){const f=w(-.7),x=w(-.17),M=g(.23),y=g(-.26),k=Math.max(10,h*.025),j=(S,A,nt,rt)=>S+nt*k+","+A+" "+S+","+A+" "+S+","+(A+rt*k);return s.jsxs("g",{className:"tsp-hud",children:[s.jsx("polyline",{points:j(f,M,1,1),className:"tsp-hair"}),s.jsx("polyline",{points:j(x,M,-1,1),className:"tsp-hair"}),s.jsx("polyline",{points:j(f,y,1,-1),className:"tsp-hair"}),s.jsx("polyline",{points:j(x,y,-1,-1),className:"tsp-hair"})]})}return null}function Na({title:t,location:e,w:a,h:o,fs:n,speed:p,still:d,layerRef:h}){const i=Math.min(a,o),r=o/2+.06*i,w=Math.max(30,.085*i),g=F(a*.07,30,96),T=Math.max(14,a*.025),f=a/2-w-g-12-T,x=S=>F(f/Math.max(1,S.length*.95),9,n*1.35),M=a/2-w,y=a/2+w,k=.45/p,j=S=>S.map(A=>A.toFixed(1)).join(" ");return s.jsxs("div",{ref:h,className:"tsp-layer","aria-hidden":"true",children:[s.jsx("svg",{className:"tsp-svg",width:a,height:o,viewBox:"0 0 "+a+" "+o,children:s.jsxs("g",{className:"tsp-lead",children:[s.jsx("polyline",{points:j([M,r,M-g,r]),pathLength:1,className:"tsp-line",style:{animationDelay:k+"s"}}),s.jsx("polyline",{points:j([M-g+6,r-4,M-g,r,M-g+6,r+4]),pathLength:1,className:"tsp-line",style:{animationDelay:k+.35/p+"s"}}),s.jsx("polyline",{points:j([y,r,y+g,r]),pathLength:1,className:"tsp-line",style:{animationDelay:k+"s"}}),s.jsx("polyline",{points:j([y+g-6,r-4,y+g,r,y+g-6,r+4]),pathLength:1,className:"tsp-line",style:{animationDelay:k+.35/p+"s"}})]})}),s.jsx("div",{className:"tsp-fin",style:{right:a-(M-g-10),top:r,fontSize:x(t),animationDelay:k+.2/p+"s"},children:s.jsx(vt,{text:t,delay:(k+.25/p)*1e3,dur:700/p,seed:3,still:d})}),s.jsx("div",{className:"tsp-fin",style:{left:y+g+10,top:r,fontSize:x(e),animationDelay:k+.3/p+"s"},children:s.jsx(vt,{text:e,delay:(k+.35/p)*1e3,dur:700/p,seed:7,still:d})})]})}function Fa({credits:t=ga,title:e="STUDIO.2026",location:a="LOW ORBIT",date:o,shots:n,progress:p,durationMs:d=16e3,shotMs:h,loop:i=!1,speed:r=1,accent:w="#7fe0ee",hot:g="#ff4d6d",marker:T="#f3e37c",plate:f="#1b2a7a",tint:x="#eef3f6",shade:M="#050608",grain:y=.5,interactive:k=!0,skipLabel:j="Skip",hint:S="Hold to fast-forward · tap to cut",height:A="100svh",onShotChange:nt,onComplete:rt,className:Le="",children:Fe}){const Te=(n||[]).join(","),Y=u.useMemo(()=>sa(n),[Te]),lt=u.useMemo(()=>(t||[]).map(na).filter(l=>l.first),[t]),Wt=Y.map(l=>xt[l].slots.length).join(","),C=r>0?r:1,Xt=typeof p!="number"||!isFinite(p),_=Y.length,Zt=Xt?Math.max(900,d/_):Math.max(900,h??2200),[q,qe]=u.useState("titles"),[D,De]=u.useState({i:0,cycle:0}),[Jt,Pe]=u.useState({w:0,h:0}),[Ae,gt]=u.useState(!1),[Ee,Ce]=u.useState(!1),[Ge,yt]=u.useState(-1),[Ie,Qt]=u.useState(!1),[Be,Oe]=u.useState(!1),[He]=u.useState(()=>ua(new Date)),bt=q==="done",$t=u.useRef(null),te=u.useRef(null),ee=u.useRef(null),kt=u.useRef(null),wt=u.useRef(null),Mt=u.useRef(null),jt=u.useRef(null),St=u.useRef(null),zt=u.useRef(null),G=u.useRef(Ne()),W=u.useRef(!1),$=u.useRef(!1),Nt=u.useRef(0),ae=u.useRef(!1),oe=u.useRef({x:0,y:0,t:-1e9}),B=u.useRef({down:!1,timer:0}),se={count:_,shotMs:Zt,duration:Zt*_,finaleMs:aa,revealMs:oa,target:Xt?null:F(p,0,100),loop:i,hold:!1},it=u.useRef({dirOpts:se,list:Y,speed:C,grain:y,interactive:k,colors:[x,M,w,g],onShotChange:nt,onComplete:rt});it.current={dirOpts:se,list:Y,speed:C,grain:y,interactive:k,colors:[x,M,w,g],onShotChange:nt,onComplete:rt},u.useEffect(()=>{const l=window.matchMedia("(prefers-reduced-motion: reduce)"),m=()=>{ae.current=l.matches,Ce(l.matches)};return m(),l.addEventListener("change",m),()=>l.removeEventListener("change",m)},[]),u.useEffect(()=>{W.current=!1,yt(-1)},[D.i,D.cycle,q]),u.useEffect(()=>{const l=ee.current;l&&(l.inert=q==="titles"||q==="finale")},[q]),u.useEffect(()=>{if(bt)return;const l=$t.current,m=te.current;if(!l||!m)return;let c=null;try{c=m.getContext("webgl2",{alpha:!0,premultipliedAlpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance"})}catch{c=null}const z=c?wa(c):null;z||(c=null);const X=z?z.prog:null,Je=c?c.getExtension("KHR_parallel_shader_compile"):null;let qt=!1;const fe=c?c.createVertexArray():null,N={},et=c;gt(!c);const pe=L=>{L.preventDefault(),c=null,gt(!0)};m.addEventListener("webglcontextlost",pe);const Dt=Math.min(window.devicePixelRatio||1,1.5)*.8;let Z=Dt;const me=11e5;let K=1,U=1;const pt=()=>{const L=l.getBoundingClientRect();K=Math.max(1,Math.round(L.width)),U=Math.max(1,Math.round(L.height)),Pe(J=>J.w===K&&J.h===U?J:{w:K,h:U});let E=Z;K*U*E*E>me&&(E=Math.sqrt(me/(K*U)));const R=Math.max(1,Math.round(K*E)),P=Math.max(1,Math.round(U*E));(m.width!==R||m.height!==P)&&(m.width=R,m.height=P)};pt();const de=new ResizeObserver(pt);de.observe(l);let ue=!0;const he=new IntersectionObserver(L=>{ue=L.length?L[L.length-1].isIntersecting:!0});he.observe(l);let Pt=0,xe=performance.now(),at=0,ot=0,st=0,mt=0,At=0,ve=-1,ge="",V={phase:G.current.phase,shot:G.current.shot,cycle:G.current.cycle};const ye=L=>{var ke,we;Pt=requestAnimationFrame(ye);const E=Math.min(64,Math.max(0,L-xe));xe=L;const R=it.current,P=ae.current,J=E*R.speed*($.current?4:1),Q={...R.dirOpts,hold:W.current};let v=G.current;if(v.shot>=Q.count&&(v={...v,shot:0,local:0}),v=ca(v,J,Q),G.current=v,at+=J/1e3,(v.phase!==V.phase||v.shot!==V.shot||v.cycle!==V.cycle)&&(v.phase!=="reveal"&&(at=0),v.phase!==V.phase&&qe(v.phase),(v.shot!==V.shot||v.cycle!==V.cycle)&&(De({i:v.shot,cycle:v.cycle}),v.phase==="titles"&&((ke=R.onShotChange)==null||ke.call(R,v.shot,R.list[v.shot]))),v.phase==="done"&&((we=R.onComplete)==null||we.call(R)),V={phase:v.phase,shot:v.shot,cycle:v.cycle}),v.phase==="done")return;const dt=Math.floor(v.shown);dt!==ve&&(ve=dt,Mt.current&&(Mt.current.textContent=String(dt).padStart(3,"0")),jt.current&&jt.current.setAttribute("aria-valuenow",String(dt)),St.current&&(St.current.style.transform="scaleX("+(v.shown/100).toFixed(3)+")"));const Et=da(v.total);Et!==ge&&zt.current&&(ge=Et,zt.current.textContent=Et);const Ct=oe.current;let Gt=Ct.x,It=Ct.y;L-Ct.t>2500&&(Gt=Math.sin(L/3100)*.35,It=Math.cos(L/4300)*.2),(P||!R.interactive)&&(Gt=0,It=0);const be=1-Math.exp(-E/260);ot+=(Gt-ot)*be,st+=(It-st)*be;const ut=kt.current;if(ut){ut.style.transform="translate3d("+(-ot*7).toFixed(2)+"px,"+(st*5).toFixed(2)+"px,0)";const H=v.phase==="titles"&&!W.current&&v.local>Q.shotMs-240?"1":"0";ut.dataset.out!==H&&(ut.dataset.out=H)}if(wt.current&&wt.current.setAttribute("transform","translate("+(ot*14).toFixed(2)+" "+(-st*10).toFixed(2)+")"),Nt.current*=Math.exp(-E/90),!c||!X||!z||!ue||document.hidden)return;if(!qt){const H=Ma(c,z,Je);if(H==="wait")return;if(H==="fail"){c=null,gt(!0);return}for(const Me of ka)N[Me]=c.getUniformLocation(X,Me);qt=!0}const Bt=v.phase==="titles"?xt[R.list[v.shot]].scene:ht,Qe=P?Bt===ht?2.4:1.3:at,$e=P?1:Ut(0,.22,at),ta=v.phase==="titles"&&!W.current?1-Ut(Q.shotMs-150,Q.shotMs,v.local):1,[Ot,Ht,_t,Kt]=R.colors.map(ha);if(c.viewport(0,0,m.width,m.height),c.useProgram(X),c.bindVertexArray(fe),c.uniform2f(N.uRes,m.width,m.height),c.uniform1f(N.uTime,P?0:L/1e3),c.uniform1f(N.uT,Qe),c.uniform1i(N.uScene,Bt),c.uniform2f(N.uMouse,ot,st),c.uniform1f(N.uFade,Bt===ht?P?1:Ut(0,.35,at):Math.min($e,ta)),c.uniform1f(N.uReveal,v.phase==="reveal"&&!P?F(v.local/Q.revealMs,0,1):0),c.uniform1f(N.uFF,$.current&&!P?1:0),c.uniform1f(N.uFlash,P?0:Nt.current),c.uniform1f(N.uGrain,F(R.grain,0,1)),c.uniform1f(N.uMotion,P?0:1),c.uniform3f(N.uTint,Ot[0],Ot[1],Ot[2]),c.uniform3f(N.uShade,Ht[0],Ht[1],Ht[2]),c.uniform3f(N.uAccent,_t[0],_t[1],_t[2]),c.uniform3f(N.uHot,Kt[0],Kt[1],Kt[2]),c.uniform1f(N.uPx,1/Math.max(1,Math.min(K,U))),c.drawArrays(c.TRIANGLES,0,3),At+=E,mt++,mt>=45){const H=At/mt;At=0,mt=0,H>24&&Z>.42?(Z*=.82,pt()):H<15&&Z<Dt&&(Z=Math.min(Dt,Z*1.08),pt())}};return Pt=requestAnimationFrame(ye),()=>{cancelAnimationFrame(Pt),de.disconnect(),he.disconnect(),m.removeEventListener("webglcontextlost",pe),et&&z&&(qt||(et.deleteShader(z.vs),et.deleteShader(z.fs)),et.deleteVertexArray(fe),et.deleteProgram(z.prog))}},[bt]),u.useEffect(()=>()=>clearTimeout(B.current.timer),[]);const ne=l=>{const m=G.current;(l.shot!==m.shot||l.phase!==m.phase)&&(Nt.current=1),G.current=l},Rt=l=>ne(fa(G.current,l,it.current.dirOpts)),re=()=>{const l=Re(G.current,it.current.dirOpts);l.armed&&Oe(!0),ne(l)},Lt=()=>(B.current.down=!1,clearTimeout(B.current.timer),$.current?($.current=!1,Qt(!1),!0):!1),_e=l=>{const m=l.currentTarget.getBoundingClientRect();oe.current={x:F((l.clientX-m.left)/m.width*2-1,-1,1),y:F(1-(l.clientY-m.top)/m.height*2,-1,1),t:performance.now()}},Ke=l=>{k&&(l.pointerType==="mouse"&&l.button!==0||l.target.closest("button, a, .tsp-label")||(B.current.down=!0,clearTimeout(B.current.timer),B.current.timer=window.setTimeout(()=>{B.current.down&&($.current=!0,Qt(!0))},260)))},Ue=()=>{B.current.down&&(Lt()||Rt(1))},Ve=l=>{!k||l.target!==l.currentTarget||(l.key==="ArrowRight"||l.key===" "?(l.preventDefault(),Rt(1)):l.key==="ArrowLeft"?(l.preventDefault(),Rt(-1)):(l.key==="Enter"||l.key==="Escape")&&(l.preventDefault(),re()))},Ye=u.useMemo(()=>ra(lt.length,Wt.split(",").map(Number),D.cycle),[lt.length,Wt,D.cycle]),I=Jt.w,O=Jt.h,tt=Math.round(F(O*.095,40,84)),ct=Math.round(F(I*.0098,10.5,15)*10)/10,le=Y[Math.min(D.i,_-1)],ft=xt[le],We=Ye[Math.min(D.i,_-1)]||[],ie=!bt,Ft=Ee,ce=l=>String(l).padStart(2,"0"),Xe=q==="titles"?"SC "+ce(Math.min(D.i,_-1)+1)+"/"+ce(_):q==="finale"?"Lift-off":"Clear",Ze={height:A,"--tsp-accent":w,"--tsp-hot":g,"--tsp-marker":T,"--tsp-plate":f,"--tsp-fs":ct+"px"};let Tt=null;if(I>0&&O>0&&q==="titles"){const l=We.map((m,c)=>{const z=lt[m],X=xa(z,ft.look,ct);return{c:z,j:c,geo:va(ft.slots[c],I,O,X.w,X.h,tt,tt)}});Tt=s.jsxs("div",{ref:kt,className:"tsp-layer","aria-hidden":"true",children:[s.jsxs("svg",{className:"tsp-svg",width:I,height:O,viewBox:"0 0 "+I+" "+O,children:[s.jsx(za,{id:le,w:I,h:O,fs:ct,date:o||He,speed:C,hudRef:wt}),l.map(({geo:m,j:c})=>{const z=(.22+c*.16)/C;return s.jsxs("g",{className:"tsp-lead","data-hot":Ge===c,children:[s.jsx("polyline",{points:m.ax.toFixed(1)+","+m.ay.toFixed(1)+" "+m.kx.toFixed(1)+","+m.ey.toFixed(1)+" "+m.ex.toFixed(1)+","+m.ey.toFixed(1),pathLength:1,className:"tsp-line",style:{animationDelay:z+.08/C+"s"}}),s.jsx("circle",{cx:m.ax,cy:m.ay,r:2.4,className:"tsp-dot",style:{animationDelay:z+"s"}}),s.jsx("circle",{cx:m.ax,cy:m.ay,r:6,className:"tsp-ring",style:{animationDelay:z+.2/C+"s"}})]},c)})]}),l.map(({c:m,j:c,geo:z})=>s.jsx(Sa,{c:m,look:ft.look,v:c%4,geo:z,w:I,delay:(.22+c*.16+.4)/C,speed:C,still:Ft,seed:D.i*17+c*5+D.cycle*3,onEnter:()=>{W.current=!0,yt(c)},onLeave:()=>{W.current=!1,yt(-1)}},c))]},D.cycle+":"+D.i)}else I>0&&O>0&&q!=="done"&&(Tt=s.jsx(Na,{title:e,location:a,w:I,h:O,fs:ct,speed:C,still:Ft,layerRef:kt}));return s.jsxs("div",{className:"tsp-root "+Le,style:{height:ie?A:"auto",minHeight:A},children:[s.jsx("style",{children:ja}),!i&&s.jsx("div",{ref:ee,className:"tsp-dest",style:{minHeight:A},children:Fe}),ie&&s.jsxs("div",{ref:$t,className:"tsp-gate","data-phase":q,"data-still":Ft,style:Ze,tabIndex:0,role:"region","aria-roledescription":"title sequence","aria-label":"Opening titles while the page loads."+(k?" Arrow keys cut between shots, Enter skips.":""),onPointerMove:_e,onPointerDown:Ke,onPointerUp:Ue,onPointerCancel:Lt,onPointerLeave:Lt,onKeyDown:Ve,children:[s.jsx("canvas",{ref:te,className:"tsp-canvas","aria-hidden":"true"}),Ae?s.jsx("div",{className:"tsp-fallback","data-scene":q==="titles"?ft.scene:ht}):null,Tt,Ie?s.jsx("div",{className:"tsp-ff",style:{top:tt+14},"aria-hidden":"true",children:"▸▸ ×4"}):null,s.jsxs("div",{className:"tsp-bar tsp-top",style:{height:tt},children:[s.jsxs("div",{className:"tsp-brand",children:[s.jsx("span",{className:"tsp-tri"}),s.jsx("b",{children:e}),s.jsx("span",{className:"tsp-dim",children:"Opening titles"})]}),s.jsxs("div",{className:"tsp-slate","aria-hidden":"true",children:[s.jsx("span",{children:Xe}),s.jsx("span",{ref:zt,className:"tsp-tc",children:"00:00:00:00"})]})]}),s.jsxs("div",{className:"tsp-bar tsp-bottom",style:{height:tt},children:[s.jsxs("div",{ref:jt,className:"tsp-count",role:"progressbar","aria-label":"Loading","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":0,children:[s.jsx("span",{ref:Mt,className:"tsp-num","aria-hidden":"true",children:"000"}),s.jsx("span",{className:"tsp-pct","aria-hidden":"true",children:"%"}),s.jsx("span",{className:"tsp-status",children:q==="titles"?Be?"Skip when ready":"Loading":"Lift-off"})]}),s.jsxs("div",{className:"tsp-reel","aria-hidden":"true",children:[Y.map((l,m)=>s.jsx("i",{"data-state":q!=="titles"||m<D.i?"past":m===D.i?"on":"next"},m)),s.jsx("b",{ref:St})]}),s.jsxs("div",{className:"tsp-actions",children:[S&&k?s.jsx("span",{className:"tsp-hint",children:S}):null,j?s.jsx("button",{type:"button",className:"tsp-skip",onClick:re,children:j}):null]})]}),s.jsx("ul",{className:"sr-only",children:lt.map((l,m)=>s.jsx("li",{children:[l.first,l.rest].filter(Boolean).join(" ")+(l.role?", "+l.role:"")},m))})]})]})}export{Fa as T};
