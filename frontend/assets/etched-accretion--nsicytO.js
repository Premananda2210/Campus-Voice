import{r as f,j as M}from"./index-CdiR0C0d.js";const se={diskColor:"#d3121f",streakColor:"#e9e4df",glowColor:"#ffffff",cloudColor:"#c9d0e2",background:"#030307",center:[.5,.49],holeSize:.052,angle:13,inclination:.27,diskRadius:1.35,speed:1,shear:1,streakDensity:150,crimson:.62,doppler:.35,flare:1,lensing:1,clouds:1,cloudLines:44,stars:1,grain:1,vignette:.55,exposure:1.25},he={crimson:{},ember:{diskColor:"#ff6a13",streakColor:"#ffe2b8",glowColor:"#fff1d6",cloudColor:"#d8c3a8",background:"#060302",crimson:.65},glacier:{diskColor:"#2f6bff",streakColor:"#dbe8ff",glowColor:"#eaf4ff",cloudColor:"#b9cdf0",background:"#02040a",crimson:.5,angle:-9},ash:{diskColor:"#8d8d8d",streakColor:"#f2f2f2",glowColor:"#ffffff",cloudColor:"#d6d6d6",background:"#040404",crimson:.35,grain:1.35},orchid:{diskColor:"#b3219e",streakColor:"#f3dcf4",glowColor:"#fff0fb",cloudColor:"#d6c4e8",background:"#050309",inclination:.34,angle:6}};function ne(o){let r=String(o).trim().replace(/^#/,"");if(/^[0-9a-f]{3}$/i.test(r)&&(r=r.replace(/./g,l=>l+l)),!/^[0-9a-f]{6}$/i.test(r))return[0,0,0];const a=parseInt(r,16);return[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]}function U(o,r,a,l){const h=1-Math.exp(-Math.max(a,0)*l);return o+(r-o)*h}function me(o,r,a){const l=b=>Math.max(-1,Math.min(1,b)),h=Math.max(a.width,1),p=Math.max(a.height,1);return[l((o-a.left)/h*2-1),l(1-(r-a.top)/p*2)]}function pe(o){return[.45*Math.sin(o*.13)+.15*Math.sin(o*.31+1.7),.3*Math.sin(o*.17+.6)]}function ve(o){var l,h;const r=(p,b,P,y)=>Number.isFinite(p)?Math.max(b,Math.min(P,p)):y,a=se;return{...o,center:[r((l=o.center)==null?void 0:l[0],-.5,1.5,a.center[0]),r((h=o.center)==null?void 0:h[1],-.5,1.5,a.center[1])],holeSize:r(o.holeSize,.005,.3,a.holeSize),angle:r(o.angle,-180,180,a.angle),inclination:r(o.inclination,.08,.95,a.inclination),diskRadius:r(o.diskRadius,.3,4,a.diskRadius),speed:r(o.speed,0,10,a.speed),shear:r(o.shear,0,4,a.shear),streakDensity:r(o.streakDensity,40,800,a.streakDensity),crimson:r(o.crimson,0,1,a.crimson),doppler:r(o.doppler,0,1,a.doppler),flare:r(o.flare,0,4,a.flare),lensing:r(o.lensing,0,3,a.lensing),clouds:r(o.clouds,0,2,a.clouds),cloudLines:r(o.cloudLines,4,120,a.cloudLines),stars:r(o.stars,0,4,a.stars),grain:r(o.grain,0,3,a.grain),vignette:r(o.vignette,0,1,a.vignette),exposure:r(o.exposure,.1,5,a.exposure)}}const ge=`#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,xe=`#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 uRes;
uniform float uTime;
uniform float uClock;
uniform float uFeed;
uniform vec2 uParallax;

uniform vec3 uDisk;
uniform vec3 uStreak;
uniform vec3 uGlow;
uniform vec3 uCloud;
uniform vec3 uBg;

uniform vec2 uCenter;
uniform float uHole;
uniform float uAngle;
uniform float uIncl;
uniform float uDiskRadius;
uniform float uShear;
uniform float uDensity;
uniform float uCrimson;
uniform float uDoppler;
uniform float uFlare;
uniform float uLensing;
uniform float uClouds;
uniform float uCloudLines;
uniform float uStars;
uniform float uGrain;
uniform float uVignette;
uniform float uExposure;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
float noise2(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), u.x),
             mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), u.x), u.y);
}
float noise3(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  float a = mix(mix(hash13(i), hash13(i + vec3(1, 0, 0)), u.x),
                mix(hash13(i + vec3(0, 1, 0)), hash13(i + vec3(1, 1, 0)), u.x), u.y);
  float b = mix(mix(hash13(i + vec3(0, 0, 1)), hash13(i + vec3(1, 0, 1)), u.x),
                mix(hash13(i + vec3(0, 1, 1)), hash13(i + vec3(1, 1, 1)), u.x), u.y);
  return mix(a, b, u.z);
}
float fbm(vec2 p, int oct) {
  float s = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 7; i++) {
    if (i >= oct) break;
    s += a * noise2(p);
    p = m * p + 17.13;
    a *= 0.5;
  }
  return s;
}

// A hair-thin line on every integer of x, anti-aliased by its own footprint.
// Where lines crowd tighter than a pixel it settles to their average instead
// of shimmering into moire.
// w is the share of each period the line covers.
float lines(float x, float w) {
  float fw = fwidth(x) + 1e-5;
  float dist = 0.5 - abs(fract(x) - 0.5);
  float l = 1.0 - smoothstep(w * 0.5 - fw, w * 0.5 + fw, dist);
  return mix(l, w, smoothstep(0.25, 0.7, fw));
}

// Nebula density: domain-warped fbm, drifting.
float nebula(vec2 w, float t) {
  vec2 q = vec2(fbm(w * 1.1 + vec2(0.0, t * 0.012), 4),
                fbm(w * 1.1 + vec2(5.2, 1.3) - t * 0.009, 4));
  return fbm(w * 1.8 + 1.5 * q, 6);
}

// Engraved nebula bank: returns (colour, coverage).
vec4 bank(vec2 w, float mask, float t, vec2 toHole, float px) {
  float d = nebula(w, t);
  float body = d + 0.42 * (mask - 1.0) + 0.05 * mask + 0.1 * (uClouds - 1.0);
  float cover = smoothstep(0.5, 0.56, body);
  if (cover <= 0.0) return vec4(0.0);
  // Wrinkle the contour coordinate so the lines tremble like a burin cut.
  float x = (d + 0.012 * noise2(w * 55.0)) * uCloudLines;
  float ink = max(lines(x, 0.16), 0.45 * lines(x * 2.7 + 3.0 * noise2(w * 9.0), 0.12));
  // Rim: brightest right at the silhouette, fading into the mass.
  float rim = 1.0 - smoothstep(0.0, 0.07, body - 0.5);
  // Light from the horizon glow, off the density slope.
  vec2 g = vec2(dFdx(d), dFdy(d)) / px;
  float lam = clamp(0.5 + 0.5 * dot(-normalize(g + 1e-5), toHole), 0.0, 1.0);
  float lit = ink * (0.26 + 0.95 * rim) * (0.3 + 0.7 * lam) + rim * rim * 0.12 * lam;
  vec3 col = uBg * 0.55 + uCloud * lit;
  return vec4(col, cover);
}

float starField(vec2 w, float scale, float dens, float t) {
  vec2 g = w * scale;
  vec2 id = floor(g);
  float h = hash12(id);
  if (h < 1.0 - dens) return 0.0;
  vec2 o = vec2(hash12(id + 7.1), hash12(id + 3.7)) - 0.5;
  float dpx = length(fract(g) - 0.5 - o * 0.7) / scale * uRes.y;
  float tw = 0.65 + 0.35 * sin(t * (1.5 + h * 3.0) + h * 60.0);
  return exp(-dpx * dpx * 0.9) * tw * (0.4 + 0.6 * hash12(id + 1.9));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float px = 1.0 / uRes.y;
  float aspect = uRes.x / uRes.y;
  vec2 uv = (frag - 0.5 * uRes) * px;
  float t = uTime;

  vec2 c = vec2((uCenter.x - 0.5) * aspect, 0.5 - uCenter.y);
  vec2 p = uv - c - uParallax * 0.012;

  // Disk frame: undo the clockwise roll, then open the plane back out.
  float ang = radians(uAngle) + uParallax.x * 0.03;
  float ca = cos(ang), sa = sin(ang);
  vec2 pr = vec2(ca * p.x - sa * p.y, sa * p.x + ca * p.y);
  float incl = clamp(uIncl + uParallax.y * 0.035, 0.06, 0.98);
  vec2 q = vec2(pr.x, pr.y / incl);
  float r = length(q);

  float Rh = uHole * (1.0 + 0.06 * uFeed);
  float d = length(p);
  vec2 dir = p / max(d, 1e-5);

  // ---- background: lensed stars and far nebula ---------------------------
  float RE = Rh * 1.7 * uLensing;
  vec2 pl = p * (1.0 - min(RE * RE / max(d * d, 1e-6), 1.6));
  vec2 uvL = pl + c;

  vec3 col = uBg + vec3(0.004, 0.008, 0.024) * smoothstep(-0.2, 0.6, uv.y + 0.3 * uv.x);
  float st = starField(uvL + uParallax * 0.004, 42.0, 0.09 * uStars, uClock)
           + 0.7 * starField(uvL + uParallax * 0.002 + 3.3, 95.0, 0.07 * uStars, uClock);
  col += vec3(0.92, 0.94, 1.0) * st;

  vec2 toHole = normalize(c - uv + 1e-5);

  if (uClouds > 0.0) {
    float maskT = smoothstep(-0.02, 0.3, pr.y + 0.15 * pr.x - 0.06);
    if (maskT > 0.0) {
      vec4 b = bank(uvL * 0.95 + uParallax * 0.02 + vec2(t * 0.004, 0.0), maskT, t, toHole, px);
      // A cold navy cast along the upper bank.
      b.rgb += vec3(0.02, 0.03, 0.09) * b.a * smoothstep(0.1, 0.5, uv.y);
      col = mix(col, b.rgb, b.a);
    }
  }

  // ---- the horizon itself -------------------------------------------------
  float inside = 1.0 - smoothstep(Rh - px, Rh + px, d);
  vec2 sp = p / Rh;
  float z = sqrt(max(0.0, 1.0 - dot(sp, sp)));
  vec3 n = vec3(sp, z);
  float lit = max(0.0, dot(n, normalize(vec3(0.15, 0.85, 0.5))));
  vec3 sphere = uBg * 0.4 + vec3(0.1, 0.1, 0.115) * lit * lit + uGlow * pow(1.0 - z, 4.0) * 0.18;
  col = mix(col, sphere, inside);

  // ---- accretion disk -----------------------------------------------------
  float rin = Rh * 1.55;
  if (r < uDiskRadius * 1.6) {
    float theta = atan(q.y, q.x);
    float om = 0.5 * uShear * pow(max(r, rin) / 0.3, -1.5) + 0.05;
    float th = theta + t * om;
    vec2 a2 = vec2(cos(th), sin(th));
    float lr = log(max(r, 1e-4));

    float arm = sin(2.0 * theta - t * 0.08 + 6.5 * lr);
    float w1 = noise3(vec3(a2 * 1.3, lr * 2.0 + 3.1));
    float w2 = noise3(vec3(a2 * 4.0, lr * 7.0 - 1.7));
    float rr = r * (1.0 + 0.035 * (w1 - 0.5) + 0.012 * arm) + 0.004 * (w2 - 0.5);

    float x1 = rr * uDensity;
    float x2 = rr * uDensity * 1.618 + 0.7 * w2;
    float x3 = rr * uDensity * 0.47 + 0.3 * w1;
    float dash1 = smoothstep(0.3, 0.62, noise3(vec3(a2 * 2.2, r * uDensity * 0.09)));
    float dash2 = smoothstep(0.36, 0.7, noise3(vec3(a2 * 4.5, r * uDensity * 0.14 + 9.0)));
    float s = lines(x1, 0.2) * dash1
            + 0.6 * lines(x2, 0.14) * dash2
            + 0.25 * lines(x3, 0.18) * (0.4 + 0.6 * dash2);

    // Where the crimson bands fall: a slow radial ripple plus the arms.
    float band = noise3(vec3(a2 * 1.7, r * 6.0 + 11.0)) + 0.16 * arm;
    float prof = smoothstep(0.1, 0.3, r) * (1.0 - smoothstep(0.95, 1.5, r / uDiskRadius * 1.35));
    float red = smoothstep(0.62 - 0.4 * uCrimson, 0.72 - 0.4 * uCrimson, band) * (0.25 + 0.75 * prof);

    float hot = exp(-(r - rin) / (Rh * 2.2));
    vec3 lineCol = mix(uStreak * 0.5, uDisk * 1.55, red);
    lineCol = mix(lineCol, uStreak * 1.4 + uGlow * 0.3, clamp(hot, 0.0, 1.0));

    float edge = smoothstep(rin, rin * 1.18, r) * (1.0 - smoothstep(uDiskRadius * 0.55, uDiskRadius, r));
    float bright = edge * (0.3 + 1.25 * exp(-(r - rin) * 1.9) + 1.6 * hot);
    float dop = 1.0 - uDoppler * (q.x / max(r, 1e-4));

    vec3 disk = lineCol * s * bright * dop;
    // Faint gas between the lines: crimson, cooling to navy at the inner edge.
    disk += (uDisk * 0.035 * (0.3 + red) + vec3(0.02, 0.03, 0.08) * hot) * edge * dop;
    disk *= 1.0 + 0.6 * uFeed;

    // The far half of the disk passes behind the horizon.
    float far = smoothstep(-0.25 * px, 1.5 * px, pr.y);
    col += disk * (1.0 - inside * far);
  }

  // ---- photon crown, ring and flare ---------------------------------------
  float outside = 1.0 - inside;
  float fl = uFlare * (1.0 + 1.3 * uFeed);
  float up = dot(dir, normalize(vec2(sa * 0.6, 1.0)));
  float ring = exp(-pow((d - Rh * 1.02) / (Rh * 0.035), 2.0)) * (0.55 + 0.9 * smoothstep(-0.4, 1.0, up));
  float crown = exp(-pow((d - Rh * 1.14) / (Rh * 0.09), 2.0)) * smoothstep(-0.05, 0.7, dir.y * ca - dir.x * sa);
  float halo = exp(-max(d - Rh, 0.0) / (Rh * 0.7)) * (0.35 + 0.65 * smoothstep(-0.3, 1.0, up));
  float rays = noise3(vec3(dir * 7.0, t * 0.06 + uClock * 0.02));
  rays = pow(rays, 3.0) * 1.6 * exp(-max(d - Rh, 0.0) / (Rh * 1.7)) * smoothstep(0.25, 1.0, up);
  float plane = exp(-abs(pr.y) / (Rh * 0.12)) * exp(-abs(pr.x) / (Rh * 2.6)) * smoothstep(Rh * 0.6, Rh * 1.3, abs(pr.x));
  float jet = exp(-abs(dot(p, vec2(ca, -sa))) / (Rh * 0.22)) * exp(-max(dot(p, vec2(sa, ca)), 0.0) / (Rh * 7.0))
            * step(0.0, dot(p, vec2(sa, ca)));
  col += uGlow * fl * (ring * 1.3 + crown * 0.9 + (halo * 0.8 + rays * 0.7 + jet * 0.07) * outside + plane * 0.9);

  // ---- foreground nebula, over the disk -----------------------------------
  if (uClouds > 0.0) {
    float maskB = smoothstep(0.0, 0.3, -pr.y - 0.3 * pr.x - 0.03);
    if (maskB > 0.0) {
      vec4 b = bank(uv * 0.85 + uParallax * 0.05 + vec2(7.0 - t * 0.006, 2.0), maskB, t + 40.0, toHole, px);
      col = mix(col, b.rgb, b.a);
    }
  }

  // ---- film ---------------------------------------------------------------
  col = 1.0 - exp(-col * uExposure);
  vec2 vq = uv / vec2(aspect, 1.0);
  col *= mix(1.0, smoothstep(0.95, 0.2, length(vq * vec2(1.25, 1.05))), uVignette);

  float f = floor(uClock * 24.0);
  float g1 = hash12(frag + f * vec2(37.1, 91.7));
  float g2 = hash12(floor(frag / 2.0) + f * vec2(13.3, 7.9));
  float grain = (g1 - 0.5) * 0.8 + (g2 - 0.5) * 0.55;
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  col += grain * uGrain * (0.045 + 0.4 * luma * (1.0 - luma));
  // Rare dust flecks.
  float fleck = step(0.99965, hash12(floor(frag / 2.0) + f * 3.1));
  col += fleck * uGrain * 0.12;

  outColor = vec4(max(col, 0.0), 1.0);
}`,be=[["uDisk","diskColor"],["uStreak","streakColor"],["uGlow","glowColor"],["uCloud","cloudColor"],["uBg","background"]],ke=[["uHole","holeSize"],["uAngle","angle"],["uIncl","inclination"],["uDiskRadius","diskRadius"],["uShear","shear"],["uDensity","streakDensity"],["uCrimson","crimson"],["uDoppler","doppler"],["uFlare","flare"],["uLensing","lensing"],["uClouds","clouds"],["uCloudLines","cloudLines"],["uStars","stars"],["uGrain","grain"],["uVignette","vignette"],["uExposure","exposure"]],we=["uRes","uTime","uClock","uFeed","uParallax","uCenter"],Re="a,button,input,textarea,select,label,summary,[role=button],[contenteditable]";function ye({height:o="100svh",preset:r="crimson",params:a,interactive:l=!0,renderScale:h=1,children:p,className:b="","aria-label":P="A black hole wrapped in a crimson accretion disk"}){const y=f.useRef(null),W=f.useRef(null),[ie,T]=f.useState(!1),[le,ce]=f.useState(0),[k,ue]=f.useState(!1);f.useEffect(()=>{const n=window.matchMedia("(prefers-reduced-motion: reduce)"),c=()=>ue(n.matches);return c(),n.addEventListener("change",c),()=>n.removeEventListener("change",c)},[]);const u=f.useMemo(()=>ve({...se,...he[r]??{},...a??{}}),[r,a]),z=f.useRef(u);z.current=u;const I=f.useRef(()=>{});f.useEffect(()=>{I.current()},[u]),f.useEffect(()=>{const n=W.current,c=y.current;if(!n||!c)return;const e=n.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance"});if(!e){T(!0);return}const K=(t,s)=>{const i=e.createShader(t);return i?(e.shaderSource(i,s),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS)?i:(console.error("etched-accretion:",e.getShaderInfoLog(i)),e.deleteShader(i),null)):null},v=K(e.VERTEX_SHADER,ge),g=K(e.FRAGMENT_SHADER,xe),d=v&&g?e.createProgram():null;if(!d||!v||!g){v&&e.deleteShader(v),g&&e.deleteShader(g),T(!0);return}if(e.attachShader(d,v),e.attachShader(d,g),e.linkProgram(d),e.deleteShader(v),e.deleteShader(g),!e.getProgramParameter(d,e.LINK_STATUS)){console.error("etched-accretion:",e.getProgramInfoLog(d)),e.deleteProgram(d),T(!0);return}e.useProgram(d);const Y=e.createVertexArray();e.bindVertexArray(Y);const q=t=>e.getUniformLocation(d,t),fe=be.map(([t,s])=>[q(t),s]),de=ke.map(([t,s])=>[q(t),s]),x=Object.fromEntries(we.map(t=>[t,q(t)]));let N=1;const G=()=>{const t=Math.min(window.devicePixelRatio||1,1.5)*Math.max(.25,h)*N,s=Math.max(1,Math.floor(n.clientWidth*t)),i=Math.max(1,Math.floor(n.clientHeight*t));(n.width!==s||n.height!==i)&&(n.width=s,n.height=i)};G();let J=7.3,w=0,E=0,R=!1,C=[0,0],L=null,Q=-1/0;const S=()=>{const t=z.current;e.viewport(0,0,n.width,n.height);for(const[s,i]of fe){const[$,B,A]=ne(t[i]);e.uniform3f(s,$,B,A)}for(const[s,i]of de)e.uniform1f(s,t[i]);e.uniform2f(x.uRes,n.width,n.height),e.uniform2f(x.uCenter,t.center[0],t.center[1]),e.uniform1f(x.uTime,J),e.uniform1f(x.uClock,w),e.uniform1f(x.uFeed,E),e.uniform2f(x.uParallax,C[0],C[1]),e.drawArrays(e.TRIANGLES,0,3)};I.current=()=>{k&&S()};const Z=new ResizeObserver(()=>{G(),k&&S()});Z.observe(n);const _=t=>{l&&(L=me(t.clientX,t.clientY,c.getBoundingClientRect()),Q=w)},ee=()=>{L=null,R=!1},te=t=>{if(!l)return;const s=t.target;s&&s.closest&&s.closest(Re)||(R=!0,_(t))},D=()=>{R=!1};c.addEventListener("pointermove",_),c.addEventListener("pointerdown",te),c.addEventListener("pointerleave",ee),window.addEventListener("pointerup",D),window.addEventListener("pointercancel",D);let m=0;const oe=t=>{t.preventDefault(),cancelAnimationFrame(m),m=0},ae=()=>ce(t=>t+1);n.addEventListener("webglcontextlost",oe),n.addEventListener("webglcontextrestored",ae);let O=!0;const re=new IntersectionObserver(([t])=>{O=t.isIntersecting,O&&!k&&!m&&(F=performance.now(),m=requestAnimationFrame(j))});re.observe(c);let F=performance.now(),H=0,V=0;const j=t=>{if(m=0,!O)return;const s=Math.min((t-F)/1e3,.05),i=t-F;F=t;const $=z.current;E=U(E,R?1:0,s,R?1.6:.9),w+=s,J+=s*$.speed*(1+2.6*E);const B=w-Q>4,A=L&&!B?L:pe(w);C=[U(C[0],A[0],s,2.2),U(C[1],A[1],s,2.2)],V<240&&i<250&&(V++,i>28&&H++,V%60===0&&(H>30&&N>.5&&(N*=.8,G()),H=0)),S(),m=requestAnimationFrame(j)};return k?S():m=requestAnimationFrame(j),()=>{cancelAnimationFrame(m),I.current=()=>{},Z.disconnect(),re.disconnect(),c.removeEventListener("pointermove",_),c.removeEventListener("pointerdown",te),c.removeEventListener("pointerleave",ee),window.removeEventListener("pointerup",D),window.removeEventListener("pointercancel",D),n.removeEventListener("webglcontextlost",oe),n.removeEventListener("webglcontextrestored",ae),e.deleteVertexArray(Y),e.deleteProgram(d)}},[l,k,h,le]);const X=ne(u.diskColor).map(n=>Math.round(n*255)).join(",");return M.jsxs("section",{ref:y,className:"relative isolate w-full overflow-hidden "+b,style:{height:o,backgroundColor:u.background},"aria-label":P,children:[ie?M.jsx("div",{"aria-hidden":"true",className:"absolute inset-0",style:{background:`radial-gradient(4% 7% at ${u.center[0]*100}% ${u.center[1]*100}%, #000 92%, rgba(255,255,255,.9) 100%, transparent 130%),radial-gradient(9% 12% at ${u.center[0]*100}% ${u.center[1]*100-4}%, rgba(255,255,255,.35), transparent 70%),radial-gradient(60% 16% at ${u.center[0]*100}% ${u.center[1]*100}%, rgba(${X},.55), rgba(${X},.12) 55%, transparent 75%)`}}):M.jsx("canvas",{ref:W,"aria-hidden":"true",className:"absolute inset-0 block h-full w-full",style:{maxWidth:"none",width:"100%",height:"100%"}}),p?M.jsx("div",{className:"absolute inset-0 z-10",children:p}):null]})}export{ye as E};
