import{r as y,j as M}from"./index-CdiR0C0d.js";const T=(e,o,n)=>e>n?n:e>o?e:o,P=(e,o,n,a,c)=>[e,o,e+(n-e)/3,o+(a-o)/3,n-(n-e)/3,a-(a-o)/3,n,a,c],Q=(e,o,n,a,c,i)=>{const h=a*Math.PI/180,u=c*Math.PI/180,v=4/3*Math.tan((u-h)/4)*n,w=e+n*Math.cos(h),R=o+n*Math.sin(h),L=e+n*Math.cos(u),S=o+n*Math.sin(u);return[w,R,w-v*Math.sin(h),R+v*Math.cos(h),L+v*Math.sin(u),S-v*Math.cos(u),L,S,i]},ue={waves:[[18,34,38,20,62,48,82,34,11],[24,53,41,40,59,66,76,53,10],[31,72,44,61,56,83,69,72,9]],play:[P(36,27,74,50,11),P(74,50,36,73,11),P(36,73,36,27,11)],bars:[P(30,46,30,72,12),P(50,28,50,72,12),P(70,38,70,72,12)],broadcast:[Q(18,50,18,-50,50,10),Q(18,50,36,-46,46,10),Q(18,50,54,-42,42,10)],spark:[P(50,20,50,80,10),P(24,35,76,65,10),P(24,65,76,35,10)],smile:[P(38,34,38,42,11),P(62,34,62,42,11),Q(50,46,24,22,158,10)]},de=(e,o)=>{const n=1-o,a=n*n*n,c=3*n*n*o,i=3*n*o*o,h=o*o*o;return[a*e[0]+c*e[2]+i*e[4]+h*e[6],a*e[1]+c*e[3]+i*e[5]+h*e[7]]},st=e=>{let o=0,n=de(e,0);for(let a=1;a<=24;a++){const c=de(e,a/24);o+=Math.hypot(c[0]-n[0],c[1]-n[1]),n=c}return o},_e=e=>{const o=de(e,.5);return[o[0],o[1],o[0],o[1],o[0],o[1],o[0],o[1],0]},at=(e,o)=>{const n=Math.max(e.length,o.length),a=[],c=[];for(let i=0;i<n;i++)a.push(e[i]??_e(o[i])),c.push(o[i]??_e(e[i]));return[a,c]},it=e=>{const o=1.8299999999999998,n=T(e,0,1);return n<.5?Math.pow(2*n,2)*((o+1)*2*n-o)/2:(Math.pow(2*n-2,2)*((o+1)*(n*2-2)+o)+2)/2},Be=e=>1-Math.pow(1-T(e,0,1),3),Ge=(e,o,n,a)=>{const[c,i]=at(e,o),h=c.length,u=h>1?Math.min(a,.5/(h-1)):0,v=1-u*(h-1);return c.map((w,R)=>{const L=it((n-R*u)/v),S=w.map((_,V)=>_+(i[R][V]-_)*L);return S[8]=Math.max(0,S[8]),S})},ct=(e,o,n,a)=>{const c=e*Math.PI/180,i=Math.cos(c),h=Math.sin(c),u=Math.hypot(i-o,h-n);if(!(u>1e-4))return{dx:i,dy:h,fold:9,r:0};const v=(i-o)/u,w=(h-n)/u,R=Math.min(a,u*.3);return{dx:v,dy:w,fold:(o*v+n*w+i*v+h*w-Math.PI*R)/2,r:R}},lt=(e,o,n)=>{const a=e*Math.PI/180,c=Math.cos(a),i=Math.sin(a),h=o*c+n*i,u=h>.98?h-.98:0;let v=o-c*u,w=n-i*u;const R=Math.hypot(v,w);return R>1.2&&(v*=1.2/R,w*=1.2/R),[v,w]},Z=(e,o)=>{const n=e*Math.PI/180,a=1-T(o,0,1)*1.6;return[Math.cos(n)*a,Math.sin(n)*a]},ht=(e,o,n)=>({ax:T((.5-o)*2*n,-n,n),ay:T((e-.5)*2*n,-n,n)}),ut=(e,o)=>{const n=e*Math.PI/180,a=o*Math.PI/180,c=Math.sin(a)*Math.cos(n),i=-Math.sin(n),h=Math.cos(a)*Math.cos(n),u=Math.hypot(c,i,h)||1;return[c/u,i/u,h/u]},ft=(e,o,n,a,c,i)=>{const h=o+(-a*(e-n)-c*o)*i;return[e+h*i,h]},Ue=(e,o)=>{const n=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(e).trim());if(!n)return o;const a=n[1].length===3?n[1].replace(/./g,c=>c+c):n[1];return[parseInt(a.slice(0,2),16)/255,parseInt(a.slice(2,4),16)/255,parseInt(a.slice(4,6),16)/255]},dt=["waves","play","bars","broadcast","spark","smile"],Ne={waves:"Waves",play:"Play",bars:"Bars",broadcast:"Broadcast",spark:"Spark",smile:"Smile"},pe=.64,pt=1.5,X=1024,mt=.15,je=1150,vt=e=>{const o=[];for(const n of e&&e.length?e:dt)typeof n=="string"?ue[n]&&o.push({name:Ne[n],strokes:ue[n]}):n&&(n.strokes&&n.strokes.length||n.d)&&o.push(n);return o.length?o:[{name:Ne.waves,strokes:ue.waves}]},gt=(e,o,n)=>"M"+[e[0],e[1]].map(a=>(a-n)*o).join(" ")+"C"+[e[2],e[3],e[4],e[5],e[6],e[7]].map(a=>((a-n)*o).toFixed(2)).join(" "),Xe=new Map,kt=e=>{let o=Xe.get(e);return o||(o=new Path2D(e),Xe.set(e,o)),o};function Oe(e,o,n){const a=o.length,c=a>1?Math.min(.16,.5/(a-1)):0;o.forEach((i,h)=>{if(i[8]<=.01)return;const u=T((n-h*c)/(1-c*(a-1)),0,1);if(!(u<=0)){if(e.lineWidth=i[8],e.beginPath(),e.moveTo(i[0],i[1]),e.bezierCurveTo(i[2],i[3],i[4],i[5],i[6],i[7]),u<1){const v=st(i);e.setLineDash([v*u,v+1])}else e.setLineDash([]);e.stroke()}}),e.setLineDash([])}function fe(e,o,n,a,c){n<=.001||(e.save(),e.globalAlpha=n,e.translate(50,50),e.scale(a,a),e.translate(-50,-50),o.strokes&&o.strokes.length?Oe(e,o.strokes,c):o.d&&(e.globalAlpha=n*Be(c),e.fill(kt(o.d),"evenodd")),e.restore())}function xt(e,o,n,a,c){e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,X,X);const i=pe*X/100,h=X*(1-pe)/2;if(e.setTransform(i,0,0,i,h,h),e.fillStyle="#fff",e.strokeStyle="#fff",e.lineCap="round",e.lineJoin="round",!o||a>=1)fe(e,n,1,1,c);else if(o.strokes&&n.strokes&&o.strokes.length&&n.strokes.length)Oe(e,Ge(o.strokes,n.strokes,a,.12),c);else{const u=a*a*(3-2*a);fe(e,o,1-u,1-.2*u,1),fe(e,n,u,.8+.2*u,1)}}const wt=`#version 300 es
void main() {
  // One oversized triangle. The *2 is what makes it cover the viewport.
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) * 2.0 - 1.0;
  gl_Position = vec4(p, 0.0, 1.0);
}
`,bt=`#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2 uRes;
uniform float uSpan;
uniform vec3 uView;
uniform float uTime;
uniform vec3 uTint;
uniform vec3 uInk;
uniform float uFoil;
uniform float uRim;
uniform vec2 uDir;
uniform float uFold;
uniform float uCurl;
uniform float uReveal;
uniform float uHeat;
uniform float uPhase;
uniform float uSweep;
uniform float uLift;
uniform sampler2D tMask;

const float PI = 3.14159265;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * vnoise(p); p = p * 2.03 + 7.1; a *= 0.5; }
  return s;
}

float pixel() { return 2.0 * uSpan / uRes.y; }

// Coverage of the unpeeled sheet at q, with the stamping reveal applied.
float sheet(vec2 q) {
  float r = length(q);
  float px = pixel();
  float disk = 1.0 - smoothstep(1.0 - px, 1.0 + px, r);
  float rr = uReveal * 1.12;
  return disk * (1.0 - smoothstep(rr - 0.06, rr, r));
}

float mask(vec2 q) { return texture(tMask, vec2(q.x * 0.5 + 0.5, 0.5 - q.y * 0.5)).a; }

vec3 spectrum(float ph) { return 0.5 + 0.5 * cos(6.28318 * (ph + vec3(0.0, 0.33, 0.67))); }

// Turn a colour's hue by a (radians) in YIQ, keeping its brightness. The foil
// swings the tint's hue either way, so it stays recognisably *its* colour —
// green foil goes cyan, violet and gold, it does not become a test card.
vec3 hueTurn(vec3 c, float a) {
  float y = dot(c, vec3(0.299, 0.587, 0.114));
  float i = dot(c, vec3(0.596, -0.274, -0.322));
  float q = dot(c, vec3(0.211, -0.523, 0.312));
  float cs = cos(a);
  float sn = sin(a);
  vec2 iq = vec2(i * cs - q * sn, i * sn + q * cs);
  return max(vec3(y + 0.956 * iq.x + 0.621 * iq.y, y - 0.272 * iq.x - 0.647 * iq.y, y - 1.106 * iq.x + 1.703 * iq.y), 0.0);
}

// The printed face at sheet point q, seen with surface normal n.
vec3 face(vec2 q, vec3 n) {
  // A turned surface catches a different slice of the rainbow.
  vec2 v = uView.xy + n.xy * 0.9;
  float r = length(q);

  // Diffraction from a light off the top-left corner: the bands fan out from
  // it like the streaks on a disc, warped so they read as foil, not a ramp.
  vec2 dq = q - vec2(-1.8, 1.6);
  float warp = fbm(q * 0.75 + vec2(uTime * 0.02, -uTime * 0.015));
  float ph = length(dq) * 0.42 + atan(dq.y, dq.x) * 0.3 + warp * 0.38
    + v.x * 0.9 - v.y * 0.6 + uPhase;
  // Lingers near the tint and swings out to its neighbours: the sqrt
  // flattens the wave around zero, the bias leans it toward the cool side.
  float sw = sin(6.28318 * ph);
  float swing = 1.4 * sw * sqrt(abs(sw)) + sin(12.56637 * ph + 1.1) * 0.3 - 0.3;
  vec3 col = hueTurn(uTint, swing * uFoil);
  vec3 rainbow = spectrum(ph * 2.0);
  col = mix(col, rainbow, 0.14 * uFoil);
  // Darker streaks across the bands, as in pressed foil.
  float streak = 0.5 + 0.5 * sin(ph * 6.28318 * 1.5 + 1.4 + warp * 2.5);
  col *= 0.74 + 0.4 * streak;

  // The ink: translucent, so the foil still glows through it darker.
  float m = mask(q);
  float e = 0.01;
  vec2 g = vec2(mask(q + vec2(e, 0.0)) - mask(q - vec2(e, 0.0)), mask(q + vec2(0.0, e)) - mask(q - vec2(0.0, e)));
  float edge = -dot(g, normalize(vec2(-0.55, 0.85) - uView.xy * 0.6));
  vec3 inkCol = uInk * 0.7 + col * col * vec3(0.32, 0.22, 0.42);
  col = mix(col, inkCol, m * 0.92);
  col += edge * 0.05;

  // Pearl rim, brushed round the edge, with a hairline where it meets the face.
  float rimIn = 1.0 - uRim;
  float px = pixel();
  float rim = smoothstep(rimIn - px, rimIn + px, r);
  vec3 pearl = mix(vec3(0.9, 0.88, 0.95), spectrum(ph * 1.6 + 0.35 + r * 2.0), 0.3);
  pearl *= 0.9 + 0.14 * vnoise(normalize(q + 1e-5) * 28.0 + r * 3.0);
  pearl *= 0.85 + 0.25 * smoothstep(rimIn, 1.0, r);
  col = mix(col, pearl, rim);
  col *= 1.0 - 0.22 * exp(-pow((r - rimIn) / 0.01, 2.0));

  // A sheen that follows the view, and a band of light that crosses on cue.
  float sheen = pow(max(0.0, 1.0 - length(q + v * 1.5 - vec2(-0.4, 0.45)) / 1.35), 2.0);
  float band = exp(-pow((dot(q, vec2(0.87, -0.5)) - uSweep) / 0.15, 2.0));
  col += (sheen * 0.2 + band * 0.5 * mix(vec3(1.0), rainbow, 0.35)) * (1.0 - m * 0.55);

  // Glitter flakes that wink as the view changes.
  vec2 cell = floor(q * 150.0);
  float h = hash(cell);
  float wink = pow(0.5 + 0.5 * sin(uTime * 1.7 + h * 40.0 + (v.x - v.y) * 24.0), 24.0);
  col += step(0.993, h) * wink * 0.75 * (1.0 - m * 0.8);

  // Light falling off as the surface turns away round the curl.
  col *= 0.42 + 0.58 * clamp(n.z, 0.0, 1.0);

  // The stamping reveal's white-hot leading edge.
  float rr = uReveal * 1.12;
  col += uHeat * exp(-pow((r - rr + 0.03) / 0.035, 2.0)) * vec3(1.0, 0.96, 0.88) * 1.6;
  return col;
}

// The back of the sticker: silvered liner with a faint rainbow, lit as a curve.
vec3 liner(vec2 q, vec3 n) {
  vec3 L = normalize(vec3(-0.45, 0.6, 0.75));
  float diff = max(dot(n, L), 0.0);
  float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 20.0);
  vec3 base = mix(vec3(0.82, 0.84, 0.88), spectrum(dot(q, vec2(0.9, 0.5)) * 1.3 + uView.x + n.x * 1.6 + uPhase), 0.22);
  // the liner's own rim, a shade darker, so the flap reads as die-cut
  base *= 1.0 - 0.18 * smoothstep(1.0 - uRim, 1.0, length(q));
  // and the mark ghosting through the film, mirrored because it is the back
  base *= 1.0 - 0.1 * mask(q);
  return base * (0.3 + 0.8 * diff) + spec * 0.9;
}

void main() {
  vec2 p = (gl_FragCoord.xy / uRes * 2.0 - 1.0) * uSpan;
  float px = pixel();
  float R = max(uCurl, 1e-4);
  vec2 dir = uDir;
  float d = dot(p, dir) - uFold;
  float on = min(uReveal * 1.6, 1.0);

  // Shadow on the stage under the sheet, deeper when it lifts.
  vec2 so = vec2(0.04, -0.07 - 0.06 * uLift);
  float sh = (1.0 - smoothstep(0.82, 1.14 + 0.14 * uLift, length(p - so))) * (0.42 + 0.12 * uLift);
  // The peeled-away part casts nothing: it is up on the roll.
  sh *= 1.0 - smoothstep(-R * 0.2, R * 0.9, d);
  // and a contact shadow just past the roll, where the sheet left the stage
  // only where the roll actually is, which is short at the ends of the chord
  if (d > 0.0) sh = max(sh, 0.4 * exp(-max(d - R, 0.0) / (R * 0.3)) * sheet(p + (R * 1.57 - d) * dir) * sheet(p - d * dir));
  vec4 acc = vec4(0.0, 0.0, 0.0, sh * on);

  // Front: the flat face, then the underside of the roll.
  if (d < R) {
    vec2 src;
    vec3 n;
    if (d < 0.0) {
      src = p;
      n = vec3(0.0, 0.0, 1.0);
    } else {
      float th = asin(clamp(d / R, 0.0, 1.0));
      src = p + (R * th - d) * dir;
      n = vec3(-dir * sin(th), cos(th));
    }
    float a = sheet(src) * (1.0 - smoothstep(R - px, R, d));
    if (a > 0.0) {
      vec3 c = face(src, n);
      // The crease: the face just inside the fold and the underside of the
      // roll sit in each other's shade. Symmetric in d, so it is continuous.
      float roll = sheet(p + (R * 0.6 - d) * dir);
      c *= 1.0 - 0.5 * exp(-abs(d) / (R * 0.55)) * roll;
      if (d < 0.0) {
        // and the laid-back flap's shadow, offset away from the light
        vec2 p2 = p + vec2(-0.035, 0.045);
        float d2 = dot(p2, dir) - uFold;
        if (d2 < 0.0) c *= 1.0 - 0.4 * sheet(p2 + (PI * R - 2.0 * d2) * dir);
        else if (d2 < R) c *= 1.0 - 0.4 * sheet(p2 + (R * (PI - asin(d2 / R)) - d2) * dir);
      }
      acc = vec4(c * a, a) + acc * (1.0 - a);
    }
  }

  // Back: the top of the roll, then the flap laid back over the face.
  if (d < R) {
    float s;
    vec3 n;
    if (d < 0.0) {
      s = PI * R - d;
      n = vec3(0.0, 0.0, 1.0);
    } else {
      float th = PI - asin(clamp(d / R, 0.0, 1.0));
      s = R * th;
      n = vec3(dir * sin(th), -cos(th));
    }
    vec2 src = p + (s - d) * dir;
    float a = sheet(src) * (1.0 - smoothstep(R - px, R, d));
    if (a > 0.0) acc = vec4(liner(src, n) * a, a) + acc * (1.0 - a);
  }

  fragColor = vec4(min(acc.rgb, vec3(acc.a)), acc.a);
}
`,yt=["uRes","uSpan","uView","uTime","uTint","uInk","uFoil","uRim","uDir","uFold","uCurl","uReveal","uHeat","uPhase","uSweep","uLift","tMask"],Rt=`
.hsk-root { position: relative; width: 100%; overflow: hidden; container-type: size; isolation: isolate;
  display: flex; align-items: center; justify-content: center; box-sizing: border-box;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; -webkit-tap-highlight-color: transparent; }
.hsk-root canvas, .hsk-root svg { max-width: none; }
.hsk-night { background: radial-gradient(70% 70% at 50% 44%, #141416 0%, #060607 55%, #000 100%); color: #f4f3f7; }
.hsk-studio { background: radial-gradient(75% 75% at 50% 40%, #f7f5f1 0%, #e4e1db 70%, #d6d2cb 100%); color: #19171d; }
.hsk-clear { background: transparent; color: inherit; }
.hsk-slot { --hsk-d: min(60vmin, 440px); position: relative; width: var(--hsk-d); height: var(--hsk-d); perspective: 900px; flex: none; }
@supports (width: 1cqmin) { .hsk-slot { --hsk-d: min(64cqmin, 440px); } }
.hsk-glow { position: absolute; inset: -38%; border-radius: 50%; pointer-events: none; filter: blur(8px); }
.hsk-body { position: absolute; inset: 0; transform-style: preserve-3d; will-change: transform; }
.hsk-canvas { position: absolute; left: -25%; top: -25%; width: 150%; height: 150%; display: block; pointer-events: none; }
.hsk-fallback { position: absolute; inset: 0; border-radius: 50%; overflow: hidden;
  box-shadow: 0 18px 50px -12px rgba(0,0,0,0.55), inset 0 0 0 6px rgba(255,255,255,0.55); }
.hsk-fallback svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hsk-hit { position: absolute; inset: 0; border-radius: 50%; border: 0; padding: 0; margin: 0; background: transparent;
  cursor: pointer; touch-action: pan-y; appearance: none; -webkit-appearance: none; color: inherit; }
.hsk-hit:focus { outline: none; }
.hsk-hit:focus-visible { outline: 1.5px solid currentColor; outline-offset: 10px; }
.hsk-corner { position: absolute; width: 26%; height: 26%; border-radius: 50%; transform: translate(-50%, -50%);
  cursor: grab; touch-action: none; }
.hsk-corner:active { cursor: grabbing; }
`;function Tt({glyphs:e,index:o,defaultIndex:n=0,onIndexChange:a,cycle:c=5200,size:i,height:h="100svh",tone:u="night",tint:v="#2bd67b",ink:w="#120a1c",foil:R=1,rim:L=.075,peel:S=.3,peelAngle:_=48,tilt:V=14,label:He="Holo sticker",className:me}){const Ve=JSON.stringify(e??null),ve=y.useMemo(()=>vt(e),[Ve]),I=ve.length,[ze,Ye]=y.useState(n),$=((o??ze)%I+I)%I,q=ve[$],[We,ee]=y.useState(!1),[z,Ke]=y.useState(!1),ge=y.useRef(null),ke=y.useRef(null),xe=y.useRef(null),we=y.useRef(null),te=y.useRef(z);te.current=z;const oe=Ue(v,[.17,.84,.48]),be=Ue(w,[.07,.04,.11]),C=y.useRef({tintRgb:oe,inkRgb:be,foil:R,rim:L,peel:S,peelAngle:_,tilt:V});C.current={tintRgb:oe,inkRgb:be,foil:R,rim:L,peel:S,peelAngle:_,tilt:V};const E=y.useRef({ax:{x:0,v:0},ay:{x:0,v:0},spin:{x:0,v:0},scale:{x:1,v:0},qx:{x:0,v:0},qy:{x:0,v:0},seeded:!1,pointer:null,hoverCorner:!1,drag:null,dragTarget:[0,0],sweepAt:-1e9,phase:0,phaseFrom:0,phaseAt:-1e9,shown:null,morph:null,dirty:!0,kickSign:1});y.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)"),l=()=>Ke(r.matches);return l(),r.addEventListener("change",l),()=>r.removeEventListener("change",l)},[]);const U=y.useCallback(r=>{const l=(($+r)%I+I)%I;a==null||a(l),o===void 0&&Ye(l)},[$,I,o,a]);y.useEffect(()=>{const r=E.current;if(!r.shown){r.shown=q,r.dirty=!0;return}if((r.morph?r.morph.to:r.shown)===q)return;const d=performance.now();if(te.current){r.shown=q,r.morph=null,r.dirty=!0;return}let t=r.morph?r.morph.to:r.shown;if(r.morph){const g=T((d-r.morph.at)/je,0,1),x=r.morph.from,A=r.morph.to;x.strokes&&A.strokes&&(t={name:A.name,strokes:Ge(x.strokes,A.strokes,g,.12)})}r.morph={from:t,to:q,at:d},r.dirty=!0,r.kickSign=-r.kickSign,r.spin.v+=260*r.kickSign,r.scale.v-=1.5,r.ay.v+=90*r.kickSign,r.phaseFrom=r.phase,r.phaseAt=d,r.sweepAt=d+120;const p=C.current.peelAngle*Math.PI/180;r.qx.v-=Math.cos(p)*2.4,r.qy.v-=Math.sin(p)*2.4},[q]),y.useEffect(()=>{if(!c||c<600||z||I<2)return;const r=setInterval(()=>{const l=E.current;l.drag||l.pointer||document.hidden||U(1)},c);return()=>clearInterval(r)},[c,z,I,U]),y.useEffect(()=>{const r=we.current;if(!r)return;const l=document.createElement("canvas");l.width=X,l.height=X;const d=l.getContext("2d");if(!d){ee(!0);return}let t=null,p=null,g=null,x=null,A=null,F=null;const k={};let se=0,Te=!0,ae=!1,ie=performance.now();const et=ie,Ee=(f,b,s)=>{const m=f.createShader(b);return m?(f.shaderSource(m,s),f.compileShader(m),f.getShaderParameter(m,f.COMPILE_STATUS)?m:(f.deleteShader(m),null)):null},ce=()=>{t&&(p&&t.deleteProgram(p),g&&t.deleteShader(g),x&&t.deleteShader(x),A&&t.deleteVertexArray(A),F&&t.deleteTexture(F),p=g=x=null,A=null,F=null)},Pe=()=>{if(t=r.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1}),!t||(g=Ee(t,t.VERTEX_SHADER,wt),x=Ee(t,t.FRAGMENT_SHADER,bt),p=t.createProgram(),!g||!x||!p)||(t.attachShader(p,g),t.attachShader(p,x),t.linkProgram(p),!t.getProgramParameter(p,t.LINK_STATUS)))return!1;A=t.createVertexArray(),F=t.createTexture(),t.bindTexture(t.TEXTURE_2D,F),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);for(const f of yt)k[f]=t.getUniformLocation(p,f);return E.current.dirty=!0,!0},Se=()=>{const f=Math.min(window.devicePixelRatio||1,2),b=Math.max(1,Math.round(r.clientWidth*f)),s=Math.max(1,Math.round(r.clientHeight*f));(r.width!==b||r.height!==s)&&(r.width=b,r.height=s)},N=(f,b,s,m,B)=>{const[j,D]=ft(f.x,f.v,b,s,m,B);f.x=Number.isFinite(j)?j:b,f.v=Number.isFinite(D)?D:0},qe=f=>{se=requestAnimationFrame(qe);const b=Math.min(1/30,Math.max(0,(f-ie)/1e3));if(ie=f,!Te||ae||!t||!p)return;const s=E.current,m=C.current,B=te.current,j=(f-et)/1e3;let D=0,Y=0;if(s.pointer){const H=ht(s.pointer.x,s.pointer.y,m.tilt);D=H.ax,Y=H.ay}else B||(D=Math.sin(j*.5)*m.tilt*.32,Y=Math.sin(j*.37+1)*m.tilt*.42);s.drag&&(D*=.4,Y*=.4),N(s.ax,D,60,11,b),N(s.ay,Y,60,11,b),N(s.spin,0,80,8.5,b),N(s.scale,1+(s.hoverCorner||s.drag?.015:0),170,13,b);const le=m.peelAngle;if(!s.seeded){const H=Z(le,m.peel);s.qx.x=H[0],s.qy.x=H[1],s.seeded=!0}let W;s.drag&&s.pointer?W=s.dragTarget:W=Z(le,m.peel+(s.hoverCorner?.12:0));const Fe=s.drag?300:120;N(s.qx,W[0],Fe,s.drag?30:10,b),N(s.qy,W[1],Fe,s.drag?30:10,b);const K=ct(le,s.qx.x,s.qy.x,mt);let he=1;s.morph&&(he=T((f-s.morph.at)/je,0,1),s.dirty=!0,he>=1&&(s.shown=s.morph.to,s.morph=null)),s.dirty&&s.shown&&(xt(d,s.morph?s.morph.from:null,s.morph?s.morph.to:s.shown,he,1),t.bindTexture(t.TEXTURE_2D,F),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,l),s.dirty=!1);const G=T((f-s.phaseAt)/1300,0,1),tt=s.phaseFrom+(G<1?G*G*(3-2*G):1);G>=1&&(s.phase=s.phaseFrom+1),!B&&f-s.sweepAt>7e3&&(s.sweepAt=f);const ot=-1.9+3.8*Be((f-s.sweepAt)/1100),O=ut(s.ax.x,s.ay.x),J=-s.spin.x*Math.PI/180,rt=O[0]*Math.cos(J)-O[1]*Math.sin(J),nt=O[0]*Math.sin(J)+O[1]*Math.cos(J);Se(),t.viewport(0,0,r.width,r.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(p),t.bindVertexArray(A),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,F),t.uniform1i(k.tMask,0),t.uniform2f(k.uRes,r.width,r.height),t.uniform1f(k.uSpan,pt),t.uniform3f(k.uView,rt,nt,O[2]),t.uniform1f(k.uTime,B?0:j),t.uniform3f(k.uTint,m.tintRgb[0],m.tintRgb[1],m.tintRgb[2]),t.uniform3f(k.uInk,m.inkRgb[0],m.inkRgb[1],m.inkRgb[2]),t.uniform1f(k.uFoil,T(m.foil,0,1)),t.uniform1f(k.uRim,T(m.rim,0,.3)),t.uniform2f(k.uDir,K.dx,K.dy),t.uniform1f(k.uFold,K.fold),t.uniform1f(k.uCurl,K.r),t.uniform1f(k.uReveal,1),t.uniform1f(k.uHeat,0),t.uniform1f(k.uPhase,tt),t.uniform1f(k.uSweep,ot),t.uniform1f(k.uLift,T((s.scale.x-1)*40,0,1)),t.drawArrays(t.TRIANGLES,0,3);const De=xe.current;De&&(De.style.transform="rotateX("+s.ax.x.toFixed(3)+"deg) rotateY("+s.ay.x.toFixed(3)+"deg) rotateZ("+s.spin.x.toFixed(3)+"deg) scale("+s.scale.x.toFixed(4)+")")},Ie=f=>{f.preventDefault(),ae=!0},Ae=()=>{ce(),ae=!1,Pe()||ee(!0)};if(!Pe()){ce(),ee(!0);return}r.addEventListener("webglcontextlost",Ie),r.addEventListener("webglcontextrestored",Ae);const Le=new ResizeObserver(Se);Le.observe(r);const Ce=new IntersectionObserver(f=>{Te=f.some(b=>b.isIntersecting)});return Ce.observe(r),se=requestAnimationFrame(qe),()=>{cancelAnimationFrame(se),Le.disconnect(),Ce.disconnect(),r.removeEventListener("webglcontextlost",Ie),r.removeEventListener("webglcontextrestored",Ae),ce()}},[]);const ye=(r,l)=>{const d=ke.current;if(!d)return[0,0];const t=d.getBoundingClientRect(),p=(r-(t.left+t.width/2))/(t.width/2),g=(t.top+t.height/2-l)/(t.height/2),x=E.current.spin.x*Math.PI/180;return[p*Math.cos(-x)-g*Math.sin(-x),p*Math.sin(-x)+g*Math.cos(-x)]},Je=r=>{const l=ge.current;if(!l)return;const d=E.current,t=l.getBoundingClientRect();d.pointer={x:(r.clientX-t.left)/t.width,y:(r.clientY-t.top)/t.height};const[p,g]=ye(r.clientX,r.clientY);if(d.drag&&d.drag.id===r.pointerId)d.drag.travel=Math.max(d.drag.travel,Math.hypot(p-d.drag.sx,g-d.drag.sy)),d.dragTarget=lt(C.current.peelAngle,p+d.drag.ox,g+d.drag.oy);else{const x=Z(C.current.peelAngle,C.current.peel*.5);d.hoverCorner=Math.hypot(p-x[0],g-x[1])<.3}},Qe=r=>{(r.pointerType==="mouse"||!E.current.drag)&&(E.current.pointer=null,E.current.hoverCorner=!1)},Ze=r=>{var p,g;r.preventDefault(),r.stopPropagation();const l=E.current,[d,t]=ye(r.clientX,r.clientY);l.drag={id:r.pointerId,ox:l.qx.x-d,oy:l.qy.x-t,sx:d,sy:t,travel:0},l.dragTarget=[l.qx.x,l.qy.x],l.hoverCorner=!0,(g=(p=r.currentTarget).setPointerCapture)==null||g.call(p,r.pointerId)},Re=r=>{const l=E.current;if(!l.drag||l.drag.id!==r.pointerId)return;const d=l.drag.travel;if(l.drag=null,l.hoverCorner=!1,r.pointerType!=="mouse"&&(l.pointer=null),d<.03){const t=C.current.peelAngle*Math.PI/180;l.qx.v-=Math.cos(t)*3,l.qy.v-=Math.sin(t)*3}else d>.6&&U(1)},$e=r=>{r.key==="ArrowRight"||r.key==="ArrowDown"?(r.preventDefault(),U(1)):(r.key==="ArrowLeft"||r.key==="ArrowUp")&&(r.preventDefault(),U(-1))},Me=Z(_,S*.5),re=2*pe,ne=oe.map(r=>Math.round(r*255)).join(",");return M.jsxs("div",{ref:ge,className:"hsk-root hsk-"+u+(me?" "+me:""),style:{height:h},onPointerMove:Je,onPointerLeave:Qe,children:[M.jsx("style",{children:Rt}),M.jsxs("div",{ref:ke,className:"hsk-slot",style:i?{"--hsk-d":i}:void 0,children:[u!=="clear"?M.jsx("div",{className:"hsk-glow","aria-hidden":"true",style:{background:"radial-gradient(closest-side, rgba("+ne+","+(u==="night"?.16:.22)+"), rgba("+ne+",0.05) 55%, rgba("+ne+",0) 100%)"}}):null,M.jsx("div",{ref:xe,className:"hsk-body",children:We?M.jsx("div",{className:"hsk-fallback",style:{background:"conic-gradient(from 210deg, "+v+", #7fd9ff, #b48cff, #ff9ad5, #ffe38a, "+v+")"},children:M.jsxs("svg",{viewBox:"-100 -100 200 200","aria-hidden":"true",children:[(q.strokes??[]).map((r,l)=>M.jsx("path",{d:gt(r,re,50),fill:"none",stroke:w,strokeOpacity:.85,strokeWidth:r[8]*re,strokeLinecap:"round"},l)),q.d?M.jsx("path",{d:q.d,transform:"scale("+re+") translate(-50 -50)",fill:w,fillRule:"evenodd"}):null]})}):M.jsx("canvas",{ref:we,className:"hsk-canvas","aria-hidden":"true"})}),M.jsx("button",{type:"button",className:"hsk-hit","aria-label":He+": "+q.name+". Press to change the mark.","aria-roledescription":"sticker",onClick:()=>U(1),onKeyDown:$e}),M.jsx("div",{className:"hsk-corner","aria-hidden":"true",style:{left:50+50*Me[0]+"%",top:50-50*Me[1]+"%"},onPointerDown:Ze,onPointerUp:Re,onPointerCancel:Re})]}),M.jsx("span",{"aria-live":"polite",style:{position:"absolute",width:1,height:1,overflow:"hidden",clipPath:"inset(50%)"},children:q.name})]})}export{Tt as H};
