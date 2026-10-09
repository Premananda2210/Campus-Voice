import{r as G,j as Ve}from"./index-CdiR0C0d.js";const we=(t,n,s)=>t>s?s:t>=n?t:n,rn=t=>{let n=t>>>0;return()=>{n=n+1831565813>>>0;let s=n;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296}},sn=t=>{const n=Math.round(we(t,5,15)),s=Math.PI/(n-1),o=[];for(let a=0;a<n;a++){const c=-Math.PI/2+a*s,f=2*Math.PI*Math.cos(c),m=Math.max(1,Math.round(f/s)),u=m===1?s:f/m,h=Math.min(1,u/s);for(let E=0;E<m;E++){const L=E/m*2*Math.PI,x=Math.cos(c),N=[x*Math.sin(L),Math.sin(c),x*Math.cos(L)],B=[Math.cos(L),0,-Math.sin(L)];o.push({lat:c,lon:L,size:h,dir:N,east:B})}}return o},Xt=(t,n)=>Math.acos(we(t[0]*n[0]+t[1]*n[1]+t[2]*n[2],-1,1)),an=t=>{const n=[0,0,1],s=t.map((o,a)=>{const c=Math.round(Xt(o.dir,n)*1e3)/1e3,f=Math.atan2(o.dir[1],o.dir[0]),m=((Math.PI-f)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);return{i:a,d:c,around:Math.round(m*1e3)/1e3}});return s.sort((o,a)=>o.d-a.d||o.around-a.around||o.i-a.i),s.map(o=>o.i)},oe=(t,n)=>[t[3]*n[0]+t[0]*n[3]+t[1]*n[2]-t[2]*n[1],t[3]*n[1]-t[0]*n[2]+t[1]*n[3]+t[2]*n[0],t[3]*n[2]+t[0]*n[1]-t[1]*n[0]+t[2]*n[3],t[3]*n[3]-t[0]*n[0]-t[1]*n[1]-t[2]*n[2]],O=(t,n)=>{const s=Math.sin(n/2);return[t[0]*s,t[1]*s,t[2]*s,Math.cos(n/2)]},Ge=t=>{const n=Math.hypot(t[0],t[1],t[2],t[3]);return n>1e-9&&Number.isFinite(n)?[t[0]/n,t[1]/n,t[2]/n,t[3]/n]:[0,0,0,1]},ge=(t,n)=>{const s=t[0],o=t[1],a=t[2],c=t[3],f=2*(o*n[2]-a*n[1]),m=2*(a*n[0]-s*n[2]),u=2*(s*n[1]-o*n[0]);return[n[0]+c*f+o*u-a*m,n[1]+c*m+a*f-s*u,n[2]+c*u+s*m-o*f]},cn=(t,n)=>{const s=t-n/3.2;return s<=0||s>2.4?0:Math.sin(s*13)*Math.exp(-s*4.2)*Math.exp(-n*.55)*.42},ln=(t,n,s,o)=>{const a=Math.tan(n/2),c=we(o,.3,.95);return t/(c*a*Math.min(1,s))+t*.35},fn=(t,n,s,o)=>{let a=-1/0,c=1/0;for(let f=0;f<3;f++){if(Math.abs(n[f])<1e-12){if(t[f]<s[f]||t[f]>o[f])return-1;continue}const m=(s[f]-t[f])/n[f],u=(o[f]-t[f])/n[f];a=Math.max(a,Math.min(m,u)),c=Math.min(c,Math.max(m,u))}return c<Math.max(a,0)?-1:a>=0?a:c},un=(t,n,s,o)=>{const a=t[0]-s[0],c=t[1]-s[1],f=t[2]-s[2],m=a*n[0]+c*n[1]+f*n[2],u=a*a+c*c+f*f-o*o,h=m*m-u;if(h<0)return-1;const E=Math.sqrt(h),L=-m-E;return L>=0?L:-m+E>=0?-m+E:-1},re=(t,n)=>{const s=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((t??"").trim());if(!s)return n;const o=s[1].length===3?s[1].replace(/./g,c=>c+c):s[1],a=c=>{const f=c/255;return f<=.04045?f/12.92:Math.pow((f+.055)/1.055,2.4)};return[a(parseInt(o.slice(0,2),16)),a(parseInt(o.slice(2,4),16)),a(parseInt(o.slice(4,6),16))]},hn={ink:0,ash:1,glass:2,cobalt:3,lime:4},Ht={ink:{cap:"#17181d",legend:"#c9cdd9"},ash:{cap:"#b3b7c1",legend:"#1c2352"},glass:{cap:"#a9bcff",legend:"#3a50ff"},cobalt:{cap:"#2633d4",legend:"#141c8f"},lime:{cap:"#9aa53a",legend:"#1b1e0e"}},Bt=[{label:"CSS",finish:"cobalt",hotkey:"c"},{label:"HTML",finish:"ink",hotkey:"h"},{icon:"slash",finish:"ash"},{label:"JS",finish:"ink",hotkey:"j"},{icon:"bolt",finish:"ash"},{icon:"quote",finish:"ink"},{icon:"at",finish:"glass"},{icon:"gear",finish:"ink"},{icon:"search",finish:"ink"},{icon:"pen",finish:"ash"},{icon:"braces",finish:"ink"},{icon:"check",finish:"lime"},{icon:"folder",finish:"ash"},{icon:"frame",finish:"ash"},{icon:"chevrons",finish:"ash"},{icon:"shield",finish:"ash"},{icon:"cube",finish:"glass"},{icon:"code",finish:"ink"},{icon:"none",finish:"ink"},{icon:"hash",finish:"cobalt"},{icon:"terminal",finish:"ink"},{icon:"layers",finish:"glass"},{icon:"cursor",finish:"ash"},{icon:"none",finish:"cobalt"},{icon:"star",finish:"ink"},{icon:"none",finish:"ash"},{icon:"heart",finish:"glass"},{icon:"arrow",finish:"ink"},{label:"⌘",finish:"ash"},{icon:"plus",finish:"cobalt"},{icon:"none",finish:"glass"},{label:"Esc",finish:"lime"}],dn=()=>{let t="";for(let s=0;s<8;s++){const o=s/8*Math.PI*2;for(const[a,c]of[[7,o-.3],[9.4,o-.17],[9.4,o+.17],[7,o+.3]])t+=(t?"L":"M")+(12+Math.cos(c)*a).toFixed(2)+" "+(12+Math.sin(c)*a).toFixed(2)}return t+"Z M15.2 12 A3.2 3.2 0 1 0 8.8 12 A3.2 3.2 0 1 0 15.2 12 Z"},vn={code:["M8 7 L3 12 L8 17","M16 7 L21 12 L16 17","M14 4 L10 20"],braces:["M9 4 C7 4 6.5 5 6.5 7 V9.8 C6.5 11 5.8 12 4.5 12 C5.8 12 6.5 13 6.5 14.2 V17 C6.5 19 7 20 9 20","M15 4 C17 4 17.5 5 17.5 7 V9.8 C17.5 11 18.2 12 19.5 12 C18.2 12 17.5 13 17.5 14.2 V17 C17.5 19 17 20 15 20"],chevrons:["M9.5 6.5 L4 12 L9.5 17.5","M14.5 6.5 L20 12 L14.5 17.5"],frame:["M6.5 6.5 H17.5 V17.5 H6.5 Z","f:M4 4 H8 V8 H4 Z M16 4 H20 V8 H16 Z M4 16 H8 V20 H4 Z M16 16 H20 V20 H16 Z"],quote:["f:M10.5 6 C6.5 6.5 4.5 9 4.5 12.5 V18 H10.5 V12 H7.5 C7.7 10 8.8 8.8 10.5 8.5 Z M19.5 6 C15.5 6.5 13.5 9 13.5 12.5 V18 H19.5 V12 H16.5 C16.7 10 17.8 8.8 19.5 8.5 Z"],slash:["M15.5 3.5 L8.5 20.5"],at:["M16 12 A4 4 0 1 1 8 12 A4 4 0 1 1 16 12","M16 8 V13.5 C16 15.3 17 16.3 18.5 16.3 C20 16.3 21 14.8 21 12 A9 9 0 1 0 17.4 19.2"],pen:["M12 3 L18.5 12.5 L15 20.5 H9 L5.5 12.5 Z","M12 3 V10.5","M13.6 12 A1.6 1.6 0 1 1 10.4 12 A1.6 1.6 0 1 1 13.6 12"],check:["M4.5 12.5 L9.8 17.8 L19.5 6.5"],search:["M16.5 10.5 A6 6 0 1 1 4.5 10.5 A6 6 0 1 1 16.5 10.5","M15 15 L20 20"],bolt:["f:M13.5 2.5 L5 13.5 H11 L10 21.5 L19 10 H13 Z"],gear:["f:"+dn()],shield:["M12 3 L19.5 6 V11.5 C19.5 16 16.5 19.5 12 21.5 C7.5 19.5 4.5 16 4.5 11.5 V6 Z"],folder:["M3.5 7 C3.5 6 4.2 5.2 5.2 5.2 H9.4 L11.4 7.3 H18.8 C19.8 7.3 20.5 8 20.5 9 V17 C20.5 18 19.8 18.8 18.8 18.8 H5.2 C4.2 18.8 3.5 18 3.5 17 Z"],cube:["M12 3 L19.8 7.5 V16.5 L12 21 L4.2 16.5 V7.5 Z","M4.2 7.5 L12 12 L19.8 7.5","M12 12 V21"],cursor:["f:M5 3.5 L19 12 L12.6 13.4 L9.4 19.6 Z"],hash:["M10 4 L8 20","M16 4 L14 20","M4.5 9 H20","M4 15 H19.5"],terminal:["M5 7 L10 12 L5 17","M12.5 17.5 H19"],layers:["M12 3.5 L20.5 8 L12 12.5 L3.5 8 Z","M3.5 12 L12 16.5 L20.5 12","M3.5 16 L12 20.5 L20.5 16"],star:["f:M12 3 L14.6 8.9 L21 9.5 L16.2 13.8 L17.6 20.2 L12 16.9 L6.4 20.2 L7.8 13.8 L3 9.5 L9.4 8.9 Z"],heart:["f:M12 20 C5 15.5 3 12.5 3 9.2 C3 6.6 5 4.6 7.5 4.6 C9.3 4.6 10.9 5.6 12 7.2 C13.1 5.6 14.7 4.6 16.5 4.6 C19 4.6 21 6.6 21 9.2 C21 12.5 19 15.5 12 20 Z"],arrow:["M4.5 12 H19.5","M13.5 6 L19.5 12 L13.5 18"],plus:["M12 5 V19","M5 12 H19"]},pn={"/":["slash"],"\\":["slash"],"@":["at"],"#":["hash"],"{":["braces"],"}":["braces"],"<":["code","chevrons"],">":["chevrons","code","terminal"],'"':["quote"],"'":["quote"],"?":["search"],"+":["plus"],"*":["star"],$:["terminal"]},ye=.6,Oe=.37,Ye=.055,Ut=.028,Q=128,mn=(t,n)=>{const s=new Float32Array(t.length);for(let o=0;o<n.length;o+=3){const a=n[o]*3,c=n[o+1]*3,f=n[o+2]*3,m=t[c]-t[a],u=t[c+1]-t[a+1],h=t[c+2]-t[a+2],E=t[f]-t[a],L=t[f+1]-t[a+1],x=t[f+2]-t[a+2],N=u*x-h*L,B=h*E-m*x,S=m*L-u*E;for(const Y of[a,c,f])s[Y]+=N,s[Y+1]+=B,s[Y+2]+=S}for(let o=0;o<s.length;o+=3){const a=Math.hypot(s[o],s[o+1],s[o+2])||1;s[o]/=a,s[o+1]/=a,s[o+2]/=a}return s},gn=()=>{const n=[],s=ye-Ye;for(let u=0;u<=4;u++){const h=u/4;n.push([.5-(.5-Oe-Ye)*h,.11+.03*h,s*h])}for(let u=1;u<=5;u++){const h=u/5*(Math.PI/2);n.push([Oe+Ye*Math.cos(h),.14+.02*(1-Math.cos(h)),s+Ye*Math.sin(h)])}for(let u=1;u<=6;u++){const h=Oe*(1-u/6.2),E=h/Oe;n.push([h,.16*E,ye-Ut*(1-E*E)])}const o=[],a=32;for(const[u,h,E]of n){const L=Math.min(h,u),x=u-L,N=[[x,x,0],[-x,x,Math.PI/2],[-x,-x,Math.PI],[x,-x,3*Math.PI/2]];for(const[B,S,Y]of N)for(let ee=0;ee<=7;ee++){const X=Y+ee/7*(Math.PI/2);o.push(B+Math.cos(X)*L,E,S+Math.sin(X)*L)}}const c=[];for(let u=0;u<n.length-1;u++)for(let h=0;h<a;h++){const E=u*a+h,L=u*a+(h+1)%a,x=(u+1)*a+(h+1)%a,N=(u+1)*a+h;c.push(E,N,x,E,x,L)}const f=o.length/3;o.push(0,ye-Ut,0);const m=(n.length-1)*a;for(let u=0;u<a;u++)c.push(m+u,f,m+(u+1)%a);return{pos:new Float32Array(o),nor:mn(o,c),idx:new Uint16Array(c)}},Mn=()=>{const t=[],n=[],s=[],o=(a,c,f,m,u,h)=>{const E=[[[1,0,0],[0,1,0],[0,0,1]],[[-1,0,0],[0,0,1],[0,1,0]],[[0,1,0],[0,0,1],[1,0,0]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[0,1,0],[1,0,0]]],L=[m,u,h];for(const[x,N,B]of E){const S=t.length/3;for(const[Y,ee]of[[-1,-1],[1,-1],[1,1],[-1,1]]){const X=[a,c,f];for(let k=0;k<3;k++)X[k]+=x[k]*L[k]+N[k]*Y*L[k]+B[k]*ee*L[k];t.push(X[0],X[1],X[2]),n.push(x[0],x[1],x[2])}s.push(S,S+1,S+2,S,S+2,S+3)}};return o(0,.05,0,.36,.05,.36),o(0,.25,0,.17,.2,.045),o(0,.25,0,.045,.2,.17),{pos:new Float32Array(t),nor:new Float32Array(n),idx:new Uint16Array(s)}},wn=()=>{const s=[];for(let a=0;a<=24;a++){const c=a/24*Math.PI;for(let f=0;f<=40;f++){const m=f/40*Math.PI*2;s.push(Math.sin(c)*Math.cos(m),Math.cos(c),Math.sin(c)*Math.sin(m))}}const o=[];for(let a=0;a<24;a++)for(let c=0;c<40;c++){const f=a*41+c,m=f+1,u=f+40+1,h=u+1;o.push(f,m,h,f,h,u)}return{pos:new Float32Array(s),nor:new Float32Array(s),idx:new Uint16Array(o)}},Vt=t=>t.icon&&t.icon!=="none"?"i:"+t.icon:t.label&&t.icon!=="none"?"t:"+t.label:"",yn=t=>{const n=Math.max(1,Math.ceil(Math.sqrt(t.length))),s=document.createElement("canvas");s.width=s.height=n*Q;const o=s.getContext("2d");return o?(o.fillStyle="#000",o.fillRect(0,0,s.width,s.height),o.fillStyle="#fff",o.strokeStyle="#fff",o.lineCap="round",o.lineJoin="round",t.forEach((a,c)=>{const f=c%n*Q,m=Math.floor(c/n)*Q;if(o.save(),o.translate(f,m),a.startsWith("i:")){const u=vn[a.slice(2)]??[],h=Q*.66/24;o.translate(Q*.17,Q*.17),o.scale(h,h),o.lineWidth=2.6;for(const E of u)E.startsWith("f:")?o.fill(new Path2D(E.slice(2)),"evenodd"):o.stroke(new Path2D(E))}else{const u=a.slice(2);let h=u.length<=2?64:46;const E='ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';for(o.font="700 "+h+"px "+E;o.measureText(u).width>Q*.78&&h>14;)h-=2,o.font="700 "+h+"px "+E;o.textAlign="center",o.textBaseline="middle",o.fillText(u,Q/2,Q/2+h*.04)}o.restore()}),{canvas:s,cells:n}):{canvas:s,cells:n}},En=`#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) * 2.0 - 1.0;
  gl_Position = vec4(p, 0.0, 1.0);
}
`,Ln=`#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 uRes;
uniform vec3 uBg;
uniform vec3 uGlow;
uniform vec2 uOrb;
uniform float uHorizon;
uniform float uSeed;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233)) + uSeed) * 43758.5453); }

vec3 tone(vec3 c) {
  c = (c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14);
  return pow(clamp(c, 0.0, 1.0), vec3(1.0 / 2.2));
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 col = uBg;

  // The lit floor: a pool of the glow colour rising from the bottom edge,
  // brightest just off-centre, gone by the middle of the frame.
  vec2 g = (p - vec2(uOrb.x + 0.2, uHorizon - 0.5)) * vec2(0.55, 0.95);
  col += uGlow * exp(-dot(g, g) * 8.0) * 0.5;
  col += uGlow * exp(-dot(g, g) * 2.6) * 0.05;

  // A faint halo right behind the ball, so its silhouette separates.
  vec2 h = p - uOrb;
  col += uGlow * exp(-dot(h, h) * 9.0) * 0.012;

  // Corners sink.
  col *= 1.0 - 0.4 * smoothstep(0.5, 1.15, length(p * vec2(0.8, 1.0)));

  vec3 outc = tone(col);
  // Dither: an 8-bit gradient this dark bands visibly without it.
  outc += (hash(gl_FragCoord.xy) - 0.5) / 255.0 * 1.5;
  fragColor = vec4(outc, 1.0);
}
`,xn=`#version 300 es
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNor;
layout(location = 2) in vec4 aM0;
layout(location = 3) in vec4 aM1;
layout(location = 4) in vec4 aM2;
layout(location = 5) in vec4 aM3;
layout(location = 6) in vec4 aInfo;
uniform mat4 uViewProj;
uniform float uReflect;
uniform float uFloor;
out vec3 vWorld;
out vec3 vNormal;
out vec3 vLocal;
out vec3 vTx;
out vec3 vTz;
// flat: the cell index must not be interpolated. Rounding error across a
// triangle flips floor(id / cells) per pixel and samples the neighbouring
// legend, which reads as sparkle on the cap.
flat out vec4 vInfo;
void main() {
  mat4 m = mat4(aM0, aM1, aM2, aM3);
  vec4 w = m * vec4(aPos, 1.0);
  vec3 n = mat3(m) * aNor;
  vec3 tx = aM0.xyz;
  vec3 tz = aM2.xyz;
  if (uReflect > 0.5) {
    // Mirror through the floor plane. The winding flips with it, which the
    // draw call answers with frontFace(CW).
    w.y = 2.0 * uFloor - w.y;
    n.y = -n.y;
    tx.y = -tx.y;
    tz.y = -tz.y;
  }
  vWorld = w.xyz;
  vNormal = n;
  vLocal = aPos;
  vTx = tx;
  vTz = tz;
  vInfo = aInfo;
  gl_Position = uViewProj * w;
}
`,An=`#version 300 es
precision highp float;
in vec3 vWorld;
in vec3 vNormal;
in vec3 vLocal;
in vec3 vTx;
in vec3 vTz;
flat in vec4 vInfo;
out vec4 fragColor;

uniform vec3 uCam;
uniform vec3 uCap[7];
uniform vec3 uInk[7];
uniform vec3 uGlow;
uniform sampler2D tLegend;
uniform float uCells;
uniform float uReflect;
uniform float uFloor;
uniform float uGlass;
uniform float uStem;
uniform float uCore;

// Must match KEY_H, TOP_HALF and CELL above.
const float KEY_H = 0.600;
const float TOP_HALF = 0.370;
const float CELL = 128.0;

vec3 tone(vec3 c) {
  c = (c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14);
  return pow(clamp(c, 0.0, 1.0), vec3(1.0 / 2.2));
}

// The studio the caps reflect: a dark room, one big softbox high on the left,
// a thin strip on the right, and the blue floor underneath.
vec3 env(vec3 d) {
  vec3 c = mix(vec3(0.006, 0.007, 0.014), vec3(0.03, 0.033, 0.055), smoothstep(-0.2, 0.9, d.y));
  c += vec3(1.0, 0.97, 0.93) * smoothstep(0.86, 0.96, dot(d, normalize(vec3(-0.55, 0.78, 0.45)))) * 2.6;
  c += vec3(0.75, 0.8, 1.0) * smoothstep(0.94, 0.99, dot(d, normalize(vec3(0.85, 0.3, 0.25)))) * 1.1;
  c += uGlow * smoothstep(0.05, -0.55, d.y) * 0.95;
  return c;
}

void main() {
  int f = int(vInfo.x + 0.5);
  float hover = vInfo.z;
  vec3 base = uCap[f] * vInfo.w;
  vec3 ink = uInk[f];
  float rough = f == 0 ? 0.36 : f == 1 ? 0.46 : f == 2 ? 0.06 : f == 3 ? 0.3 : 0.42;
  if (uStem > 0.5) { base = uCap[5]; rough = 0.5; }
  if (uCore > 0.5) { base = uCap[6]; rough = 0.55; }

  vec3 N = normalize(vNormal);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(uCam - vWorld);

  // The legend is engraved into the dish: the mask colours it, and its
  // gradient tips the normal so the edges catch the light like a cut would.
  //
  // Sampled unconditionally and masked afterwards: a mipmapped lookup inside a
  // non-uniform branch has undefined derivatives, which shows up as sparkle
  // across the cap and legends that break into dashes.
  float hasLegend = step(0.0, vInfo.y) * (1.0 - uStem) * (1.0 - uCore);
  vec2 uv = vLocal.xz / (2.0 * TOP_HALF) + 0.5;
  float inside = step(0.0, uv.x) * step(0.0, uv.y) * step(uv.x, 1.0) * step(uv.y, 1.0);
  float top = smoothstep(KEY_H - 0.07, KEY_H - 0.035, vLocal.y) * inside * hasLegend;
  float id = floor(max(vInfo.y, 0.0) + 0.5);
  float row = floor((id + 0.5) / uCells);
  vec2 cell = vec2(id - row * uCells, row);
  vec2 auv = (cell + clamp(uv, 0.02, 0.98)) / uCells;
  float e = 1.5 / (uCells * CELL);
  float leg = texture(tLegend, auv).r * top;
  float gx = texture(tLegend, auv + vec2(e, 0.0)).r - texture(tLegend, auv - vec2(e, 0.0)).r;
  float gz = texture(tLegend, auv + vec2(0.0, e)).r - texture(tLegend, auv - vec2(0.0, e)).r;
  N = normalize(N + (normalize(vTx) * gx + normalize(vTz) * gz) * 0.45 * top);
  base = mix(base, ink, leg * (f == 2 ? 0.0 : 0.92));
  rough = mix(rough, 0.6, leg * 0.5);

  // Contact shadow: the walls darken toward the base, where the neighbouring
  // caps and the core close in.
  float ao = (uStem > 0.5 || uCore > 0.5) ? 0.55 : mix(0.28, 1.0, smoothstep(0.0, KEY_H * 0.85, vLocal.y));

  float ndv = max(dot(N, V), 0.0);
  float F = 0.04 + 0.96 * pow(1.0 - ndv, 5.0);
  float shin = mix(900.0, 22.0, rough);

  vec3 Ls[3];
  vec3 Cs[3];
  Ls[0] = normalize(vec3(-0.55, 0.85, 0.7));  Cs[0] = vec3(1.0, 0.96, 0.9) * 2.3;
  Ls[1] = normalize(vec3(0.2, -0.85, 0.5));   Cs[1] = uGlow * 1.5;
  Ls[2] = normalize(vec3(0.9, 0.35, -0.45));  Cs[2] = vec3(0.6, 0.68, 1.0) * 1.2;
  vec3 diff = vec3(0.0);
  vec3 spec = vec3(0.0);
  for (int i = 0; i < 3; i++) {
    float ndl = max(dot(N, Ls[i]), 0.0);
    vec3 H = normalize(Ls[i] + V);
    diff += Cs[i] * ndl;
    spec += Cs[i] * pow(max(dot(N, H), 0.0), shin) * (shin + 8.0) / 60.0 * ndl;
  }
  vec3 R = reflect(-V, N);
  vec3 envc = mix(env(R), env(N) * 0.5, rough);
  vec3 ambient = vec3(0.02, 0.022, 0.035) + uGlow * 0.06 * max(-N.y, 0.0);

  vec3 col;
  float alpha = 1.0;
  if (uGlass > 0.5) {
    // Clear plastic: mostly what it reflects, a little of its own tint, and
    // opaque only where the fresnel says so — which is what makes the edges
    // and the bevel read as thickness.
    alpha = clamp(0.1 + F * 0.95 + leg * 0.8, 0.0, 1.0);
    vec3 body = base * (diff * 0.1 + 0.05);
    col = body * alpha + envc * F * 1.4 + spec * 0.09;
    col += ink * leg * (0.35 + diff.r * 0.25);
    col += uGlow * hover * (0.25 + F) * 0.6;
  } else {
    col = base * (diff * 0.3 + ambient) * ao;
    col += (spec * 0.05 * (1.0 - rough * 0.7) + envc * F * (1.0 - rough * 0.55)) * mix(0.5, 1.0, ao);
    col += uGlow * hover * (0.06 + F * 1.1) * 0.7;
    col += ink * leg * hover * 0.35;
  }

  vec3 outc = tone(col);
  if (uReflect > 0.5) {
    float fade = exp(-max(uFloor - vWorld.y, 0.0) * 1.5) * 0.3;
    fragColor = vec4(outc * fade * alpha, fade * alpha);
  } else if (uGlass > 0.5) {
    fragColor = vec4(outc, alpha);
  } else {
    fragColor = vec4(outc, 1.0);
  }
}
`,Gt=(t,n,s)=>{const o=t.createShader(n);if(!o)throw new Error("no shader");if(t.shaderSource(o,s),t.compileShader(o),!t.getShaderParameter(o,t.COMPILE_STATUS)){const a=t.getShaderInfoLog(o);throw t.deleteShader(o),new Error("shader: "+a)}return o},Ot=(t,n,s)=>{const o=Gt(t,t.VERTEX_SHADER,n),a=Gt(t,t.FRAGMENT_SHADER,s),c=t.createProgram();if(!c)throw new Error("no program");if(t.attachShader(c,o),t.attachShader(c,a),t.linkProgram(c),t.deleteShader(o),t.deleteShader(a),!t.getProgramParameter(c,t.LINK_STATUS)){const f=t.getProgramInfoLog(c);throw t.deleteProgram(c),new Error("link: "+f)}return c},bn=(t,n,s,o)=>{const a=1/Math.tan(t/2),c=1/(s-o);return[a/n,0,0,0,0,a,0,0,0,0,(o+s)*c,-1,0,0,2*o*s*c,0]},Me=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],P=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],Xe=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],H=t=>{const n=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/n,t[1]/n,t[2]/n]},Rn=(t,n)=>{const s=H(Me(t,n)),o=H(Xe([0,1,0],s)),a=Xe(s,o);return{m:[o[0],a[0],s[0],0,o[1],a[1],s[1],0,o[2],a[2],s[2],0,-P(o,t),-P(a,t),-P(s,t),1],right:o,up:a,forward:[-s[0],-s[1],-s[2]]}},Tn=(t,n)=>{const s=new Array(16);for(let o=0;o<4;o++)for(let a=0;a<4;a++)s[o*4+a]=t[a]*n[o*4]+t[4+a]*n[o*4+1]+t[8+a]*n[o*4+2]+t[12+a]*n[o*4+3];return s},Yt=(t,n)=>{const s=t[0]*n[0]+t[4]*n[1]+t[8]*n[2]+t[12],o=t[1]*n[0]+t[5]*n[1]+t[9]*n[2]+t[13],a=t[3]*n[0]+t[7]*n[1]+t[11]*n[2]+t[15];return[s/a,o/a]},Fe=20,Se=2,ht=28*Math.PI/180;function _n({keys:t=Bt,palette:n,background:s="#020206",glow:o="#1f30ff",rings:a=9,scale:c=.62,autoRotate:f=!0,speed:m=1,reflection:u=!0,ripple:h=!0,height:E="100svh",onKeyPress:L,className:x="","aria-label":N="A ball of keycaps. Drag to spin it, press a cap, or focus it and type."}){const B=G.useRef(null),S=G.useRef(null),[Y,ee]=G.useState(!1),[X,k]=G.useState(0),[dt,Wt]=G.useState(!1),[Kt,jt]=G.useState("");G.useEffect(()=>{const T=window.matchMedia("(prefers-reduced-motion: reduce)"),M=()=>Wt(T.matches);return M(),T.addEventListener("change",M),()=>T.removeEventListener("change",M)},[]);const Ee=G.useRef({palette:n,background:s,glow:o,scale:c,autoRotate:f,speed:m,reflection:u,ripple:h,reduced:dt,onKeyPress:L});Ee.current={palette:n,background:s,glow:o,scale:c,autoRotate:f,speed:m,reflection:u,ripple:h,reduced:dt,onKeyPress:L};const Zt=G.useMemo(()=>Math.round(we(a,5,15))+"|"+JSON.stringify(t??[]),[a,t]);return G.useEffect(()=>{const T=S.current,M=B.current;if(!T||!M)return;const e=T.getContext("webgl2",{alpha:!1,antialias:!0,premultipliedAlpha:!1});if(!e){ee(!0);return}const vt=Math.round(we(a,5,15)),We=sn(vt),qt=an(We),Pe=t&&t.length?t:Bt,D=We.length,Jt=Math.PI/(vt-1),pt=Se*Jt*.92,se=new Array(D);qt.forEach((r,l)=>{se[r]=l<Pe.length?Pe[l]:Pe[l*7%Pe.length]});const Ne=[],Ke=new Map;for(const r of se){const l=Vt(r);l&&!Ke.has(l)&&Ne.length<64&&(Ke.set(l,Ne.length),Ne.push(l))}const ae=rn(1801812323),ie=We.map((r,l)=>{var J;const i=r.dir,d=r.east,y=H(Xe(i,d)),g=(ae()-.5)*.09,v=ae()*Math.PI*2,A=(ae()-.5)*.08,z=H([d[0]*Math.cos(v)+y[0]*Math.sin(v),d[1]*Math.cos(v)+y[1]*Math.sin(v),d[2]*Math.cos(v)+y[2]*Math.sin(v)]),F=oe(O(z,g),O(i,A)),q=ge(F,i),te=ge(F,d),ne=Xe(te,q),ot=ae()<.12?.18+ae()*.12:(ae()-.3)*.06,Ie=((J=se[l])==null?void 0:J.finish)??"ink";return{x:te,y:q,z:ne,dir:i,size:pt*r.size,pop:Ie==="glass"?Math.max(ot,.1):ot,finish:hn[Ie]??0,cell:Ke.get(Vt(se[l]??{}))??-1,shade:.92+ae()*.16}}),ve=ie.map((r,l)=>r.finish===2?l:-1).filter(r=>r>=0),ke=ie.map((r,l)=>r.finish!==2?l:-1).filter(r=>r>=0);let Le=null,xe=null;const je=[],De=[];let Ae=null,U=null,ce=null,W=0,ze=!1,Ze=!0;const mt=r=>{r.preventDefault(),cancelAnimationFrame(W),W=0},gt=()=>k(r=>r+1);T.addEventListener("webglcontextlost",mt),T.addEventListener("webglcontextrestored",gt);const qe=()=>{const r=Math.min(window.devicePixelRatio||1,2),l=Math.round(T.clientWidth*r),i=Math.round(T.clientHeight*r);l===0||i===0||(T.width!==l||T.height!==i)&&(T.width=l,T.height=i)},Mt=new ResizeObserver(qe);Mt.observe(T);const Je=(r,l)=>{const i=e.createVertexArray();if(!i)throw new Error("no vao");De.push(i),e.bindVertexArray(i);const d=e.createBuffer(),y=e.createBuffer(),g=e.createBuffer();if(!d||!y||!g)throw new Error("no buffer");je.push(d,y,g),e.bindBuffer(e.ARRAY_BUFFER,d),e.bufferData(e.ARRAY_BUFFER,r.pos,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,y),e.bufferData(e.ARRAY_BUFFER,r.nor,e.STATIC_DRAW),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,3,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,g),e.bufferData(e.ELEMENT_ARRAY_BUFFER,r.idx,e.STATIC_DRAW);for(let v=0;v<5;v++)e.enableVertexAttribArray(2+v),e.vertexAttribDivisor(2+v,1);return be(l,0),e.bindVertexArray(null),{vao:i,count:r.idx.length}},be=(r,l)=>{e.bindBuffer(e.ARRAY_BUFFER,r);for(let i=0;i<5;i++)e.vertexAttribPointer(2+i,4,e.FLOAT,!1,Fe*4,l*Fe*4+i*16)};let C={},le={},pe={vao:null,count:0},$e={vao:null,count:0},Qe={vao:null,count:0},wt=1;const fe=new Float32Array(D*Fe);let ue=O([1,0,0],-.14),I=[0,0],he=[0,0];const He=new Float32Array(D),et=new Float32Array(D),K=new Uint8Array(D),yt=new Float32Array(D),de=[],tt=performance.now();let nt=tt,Re=-1,Te={x:0,y:0,inside:!1},w={active:!1,moved:!1,id:-1,sx:0,sy:0,lx:0,ly:0,lt:0,key:-1},Ce=new Map,j=[0,0,0],_={eye:[0,0,10],right:[1,0,0],up:[0,1,0],forward:[0,0,-1],aspect:1};const Z=ie.map(()=>({x:[0,0,0],y:[0,0,0],z:[0,0,0],p:[0,0,0],s:1})),$t=(r,l)=>{const i=T.getBoundingClientRect(),d=(r-i.left)/Math.max(i.width,1)*2-1,y=1-(l-i.top)/Math.max(i.height,1)*2,g=Math.tan(ht/2),v=H([_.forward[0]+_.right[0]*d*g*_.aspect+_.up[0]*y*g,_.forward[1]+_.right[1]*d*g*_.aspect+_.up[1]*y*g,_.forward[2]+_.right[2]*d*g*_.aspect+_.up[2]*y*g]);return{o:_.eye,d:v}},Et=(r,l)=>{const{o:i,d}=$t(r,l);let y=-1,g=un(i,d,j,Se*.98);g<0&&(g=1/0);for(let v=0;v<D;v++){const A=Z[v],z=Me(i,A.p),F=A.s*A.s,q=[P(z,A.x)/F,P(z,A.y)/F,P(z,A.z)/F],te=[P(d,A.x)/F,P(d,A.y)/F,P(d,A.z)/F],ne=fn(q,te,[-.5,0,-.5],[.5,ye,.5]);ne>=0&&ne<g&&(g=ne,y=v)}return y},Lt=r=>{var y,g;const l=(performance.now()-tt)/1e3;Ee.current.ripple&&!Ee.current.reduced&&(de.push({origin:ie[r].dir,t0:l}),de.length>6&&de.shift());const i=se[r],d=(i==null?void 0:i.label)||(i!=null&&i.icon&&i.icon!=="none"?i.icon:"blank");jt(d+" pressed"),(g=(y=Ee.current).onKeyPress)==null||g.call(y,i??{},r)},xt=()=>{let r=0,l=-1/0;for(let i=0;i<D;i++){const d=Z[i],y=H(Me(_.eye,d.p)),g=P(H(d.y),y);g>l&&(l=g,r=i)}return r},Qt=r=>{const l=r.toLowerCase(),i=[];if(se.forEach((v,A)=>{v.hotkey&&v.hotkey.toLowerCase()===l&&i.push(A)}),!i.length&&r.length===1){const v=pn[r]??[];se.forEach((A,z)=>{(A.icon&&v.includes(A.icon)||A.label&&A.label.toLowerCase().startsWith(l))&&i.push(z)})}let d=-1,y=-1/0;for(const v of i){const A=P(H(Z[v].y),H(Me(_.eye,Z[v].p)));A>y&&(y=A,d=v)}if(d>=0||r.length!==1)return d;const g=[];for(let v=0;v<D;v++)P(H(Z[v].y),H(Me(_.eye,Z[v].p)))>.55&&g.push(v);return g.length?g[r.codePointAt(0)%g.length]:xt()},At=r=>{var i;if(r.button!==0&&r.pointerType==="mouse")return;(i=M.setPointerCapture)==null||i.call(M,r.pointerId);const l=Et(r.clientX,r.clientY);w={active:!0,moved:!1,id:r.pointerId,sx:r.clientX,sy:r.clientY,lx:r.clientX,ly:r.clientY,lt:performance.now(),key:l},I=[0,0],l>=0&&(K[l]=1),M.style.cursor="grabbing"},bt=r=>{const l=M.getBoundingClientRect();if(Te={x:(r.clientX-l.left)/Math.max(l.width,1)*2-1,y:(r.clientY-l.top)/Math.max(l.height,1)*2-1,inside:!0},w.active&&r.pointerId===w.id){const i=r.clientX-w.lx,d=r.clientY-w.ly;if(!w.moved&&Math.hypot(r.clientX-w.sx,r.clientY-w.sy)>6&&(w.moved=!0,w.key>=0&&(K[w.key]=0)),w.moved){const y=Math.PI*1.2/Math.max(Math.min(l.width,l.height),1);ue=Ge(oe(oe(O([0,1,0],i*y),O(_.right,d*y)),ue));const g=performance.now(),v=Math.max(g-w.lt,1)/1e3;I=[I[0]*.6+i*y/v*.4,I[1]*.6+d*y/v*.4],w.lt=g}w.lx=r.clientX,w.ly=r.clientY}else Re=Et(r.clientX,r.clientY),M.style.cursor=Re>=0?"pointer":"grab"},Rt=r=>{var l;!w.active||r.pointerId!==w.id||(performance.now()-w.lt>80&&(I=[0,0]),!w.moved&&w.key>=0&&(K[w.key]=0,Lt(w.key)),w.active=!1,(l=M.releasePointerCapture)==null||l.call(M,r.pointerId),M.style.cursor=Re>=0?"pointer":"grab")},Tt=r=>{w.key>=0&&(K[w.key]=0),r.pointerId===w.id&&(w.active=!1)},Ct=()=>{Te.inside=!1,w.active||(Re=-1)},It=r=>{if(r.metaKey||r.ctrlKey||r.altKey)return;const l=1.6;if(r.key==="ArrowLeft")I=[-l,I[1]];else if(r.key==="ArrowRight")I=[l,I[1]];else if(r.key==="ArrowUp")I=[I[0],-l];else if(r.key==="ArrowDown")I=[I[0],l];else{if(r.key==="Tab"||r.key==="Escape"||r.key==="Shift")return;{if(r.repeat){r.preventDefault();return}const i=r.key==="Enter"||r.key===" "?xt():Qt(r.key);if(i<0)return;K[i]=1,Ce.set(r.key.toLowerCase(),i)}}r.preventDefault()},_t=r=>{const l=Ce.get(r.key.toLowerCase());l!==void 0&&(Ce.delete(r.key.toLowerCase()),K[l]=0,Lt(l))},Ft=()=>{Ce.forEach(r=>K[r]=0),Ce=new Map};M.addEventListener("pointerdown",At),M.addEventListener("pointermove",bt),M.addEventListener("pointerup",Rt),M.addEventListener("pointercancel",Tt),M.addEventListener("pointerleave",Ct),M.addEventListener("keydown",It),M.addEventListener("keyup",_t),M.addEventListener("blur",Ft);const St=new IntersectionObserver(r=>{Ze=r.some(l=>l.isIntersecting),Ze&&!W&&!ze&&(nt=performance.now(),W=requestAnimationFrame(Be))});St.observe(M);const Be=()=>{var Dt,zt;if(W=0,ze||!Ze)return;const r=Ee.current,l=performance.now(),i=Math.min((l-nt)/1e3,.05);nt=l;const d=(l-tt)/1e3,y=r.reduced;qe();const g=T.width,v=T.height;if(g===0||v===0){W=requestAnimationFrame(Be);return}if(!w.active){if(Math.abs(I[0])+Math.abs(I[1])>1e-4){ue=Ge(oe(oe(O([0,1,0],I[0]*i),O(_.right,I[1]*i)),ue));const p=Math.exp(-i*2.2);I=[I[0]*p,I[1]*p]}r.autoRotate&&!y&&(ue=Ge(oe(O([0,1,0],.16*we(r.speed,-6,6)*i),ue)))}const A=Te.inside&&!w.active?[Te.x*.12,Te.y*.1]:[0,0],z=1-Math.exp(-i*4);he=[he[0]+(A[0]-he[0])*z,he[1]+(A[1]-he[1])*z];const F=Ge(oe(oe(O([0,1,0],he[0]),O([1,0,0],he[1])),ue)),q=g/v,te=Se+pt*ye,ne=ln(te,ht,q,r.scale);j=[0,y?0:Math.sin(d*.9)*.05,0];const Ie=-te*1.16,J=[0,ne*.12,ne],en=[0,-te*.12,0],_e=Rn(J,en);_={eye:J,right:_e.right,up:_e.up,forward:_e.forward,aspect:q};const tn=bn(ht,q,.1,100),rt=Tn(tn,_e.m),Pt=1-Math.exp(-i*14);for(let p=0;p<D;p++){const b=ie[p];He[p]+=((p===Re?1:0)-He[p])*Pt,et[p]+=(K[p]-et[p])*(K[p]?1-Math.exp(-i*30):Pt);let R=0;for(const V of de)R+=cn(d-V.t0,Xt(b.dir,V.origin));yt[p]=b.pop+He[p]*.16-et[p]*.3+R}for(;de.length&&d-de[0].t0>4;)de.shift();for(let p=0;p<D;p++){const b=ie[p],R=Z[p],V=ge(F,b.x),$=ge(F,b.y),lt=ge(F,b.z),ft=ge(F,b.dir),ut=Se+yt[p]*b.size*ye;R.s=b.size,R.x=[V[0]*b.size,V[1]*b.size,V[2]*b.size],R.y=[$[0]*b.size,$[1]*b.size,$[2]*b.size],R.z=[lt[0]*b.size,lt[1]*b.size,lt[2]*b.size],R.p=[j[0]+ft[0]*ut,j[1]+ft[1]*ut,j[2]+ft[2]*ut]}const nn=ve.map(p=>({i:p,d:P(Me(Z[p].p,J),_e.forward)})).sort((p,b)=>b.d-p.d).map(p=>p.i);ke.concat(nn).forEach((p,b)=>{const R=Z[p],V=ie[p],$=b*Fe;fe.set([R.x[0],R.x[1],R.x[2],0,R.y[0],R.y[1],R.y[2],0,R.z[0],R.z[1],R.z[2],0,R.p[0],R.p[1],R.p[2],1],$),fe[$+16]=V.finish,fe[$+17]=V.cell,fe[$+18]=He[p],fe[$+19]=V.shade}),e.bindBuffer(e.ARRAY_BUFFER,U),e.bufferSubData(e.ARRAY_BUFFER,0,fe);const st=Se*.985;e.bindBuffer(e.ARRAY_BUFFER,ce),e.bufferSubData(e.ARRAY_BUFFER,0,new Float32Array([st,0,0,0,0,st,0,0,0,0,st,0,j[0],j[1],j[2],1,0,-1,0,1]));const Nt=r.palette??{},at=[],it=[];for(const p of["ink","ash","glass","cobalt","lime"])at.push(...re((Dt=Nt[p])==null?void 0:Dt.cap,re(Ht[p].cap,[0,0,0]))),it.push(...re((zt=Nt[p])==null?void 0:zt.legend,re(Ht[p].legend,[1,1,1])));at.push(...re("#c9cfe0",[.6,.6,.7]),...re("#050508",[0,0,0])),it.push(0,0,0,0,0,0);const me=re(r.glow,[.014,.03,1]),ct=re(r.background,[.001,.001,.002]);e.viewport(0,0,g,v),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const kt=Yt(rt,j),on=Yt(rt,[0,Ie,0]);e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.useProgram(Le),e.bindVertexArray(De[0]),e.uniform2f(le.uRes,g,v),e.uniform3f(le.uBg,ct[0],ct[1],ct[2]),e.uniform3f(le.uGlow,me[0],me[1],me[2]),e.uniform2f(le.uOrb,kt[0]*q/2,kt[1]/2),e.uniform1f(le.uHorizon,on[1]/2),e.uniform1f(le.uSeed,y?0:d*7.3%100),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(xe),e.uniformMatrix4fv(C.uViewProj,!1,rt),e.uniform3f(C.uCam,J[0],J[1],J[2]),e.uniform3fv(C.uCap,at),e.uniform3fv(C.uInk,it),e.uniform3f(C.uGlow,me[0],me[1],me[2]),e.uniform1f(C.uCells,wt),e.uniform1f(C.uFloor,Ie),e.uniform1i(C.tLegend,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,Ae),e.enable(e.DEPTH_TEST),e.enable(e.CULL_FACE);const Ue=p=>{if(e.uniform1f(C.uStem,0),e.uniform1f(C.uCore,0),!p){e.uniform1f(C.uGlass,0),e.uniform1f(C.uCore,1),e.bindVertexArray(Qe.vao),be(ce,0),e.drawElementsInstanced(e.TRIANGLES,Qe.count,e.UNSIGNED_SHORT,0,1),e.uniform1f(C.uCore,0),e.bindVertexArray(pe.vao),be(U,0),e.drawElementsInstanced(e.TRIANGLES,pe.count,e.UNSIGNED_SHORT,0,ke.length),ve.length&&(e.uniform1f(C.uStem,1),e.bindVertexArray($e.vao),be(U,ke.length),e.drawElementsInstanced(e.TRIANGLES,$e.count,e.UNSIGNED_SHORT,0,ve.length),e.uniform1f(C.uStem,0));return}ve.length&&(e.uniform1f(C.uGlass,1),e.depthMask(!1),e.bindVertexArray(pe.vao),be(U,ke.length),e.cullFace(e.FRONT),e.drawElementsInstanced(e.TRIANGLES,pe.count,e.UNSIGNED_SHORT,0,ve.length),e.cullFace(e.BACK),e.drawElementsInstanced(e.TRIANGLES,pe.count,e.UNSIGNED_SHORT,0,ve.length),e.depthMask(!0),e.uniform1f(C.uGlass,0))};r.reflection&&(e.uniform1f(C.uReflect,1),e.frontFace(e.CW),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),Ue(!1),Ue(!0),e.frontFace(e.CCW),e.clear(e.DEPTH_BUFFER_BIT)),e.uniform1f(C.uReflect,0),e.disable(e.BLEND),Ue(!1),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),Ue(!0),e.disable(e.BLEND),e.bindVertexArray(null),W=requestAnimationFrame(Be)};try{Le=Ot(e,En,Ln),xe=Ot(e,xn,An);for(const d of["uRes","uBg","uGlow","uOrb","uHorizon","uSeed"])le[d]=e.getUniformLocation(Le,d);for(const d of["uViewProj","uReflect","uFloor","uCam","uCap","uInk","uGlow","tLegend","uCells","uGlass","uStem","uCore"])C[d]=e.getUniformLocation(xe,d);const r=e.createVertexArray();if(!r)throw new Error("no vao");if(De.push(r),U=e.createBuffer(),ce=e.createBuffer(),!U||!ce)throw new Error("no buffer");je.push(U,ce),e.bindBuffer(e.ARRAY_BUFFER,U),e.bufferData(e.ARRAY_BUFFER,fe.byteLength,e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,ce),e.bufferData(e.ARRAY_BUFFER,Fe*4,e.DYNAMIC_DRAW),pe=Je(gn(),U),$e=Je(Mn(),U),Qe=Je(wn(),ce);const l=yn(Ne);wt=l.cells,Ae=e.createTexture(),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,Ae),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,l.canvas),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const i=e.getExtension("EXT_texture_filter_anisotropic");i&&e.texParameterf(e.TEXTURE_2D,i.TEXTURE_MAX_ANISOTROPY_EXT,4),qe(),W=requestAnimationFrame(Be)}catch{ze||ee(!0)}return()=>{ze=!0,cancelAnimationFrame(W),Mt.disconnect(),St.disconnect(),T.removeEventListener("webglcontextlost",mt),T.removeEventListener("webglcontextrestored",gt),M.removeEventListener("pointerdown",At),M.removeEventListener("pointermove",bt),M.removeEventListener("pointerup",Rt),M.removeEventListener("pointercancel",Tt),M.removeEventListener("pointerleave",Ct),M.removeEventListener("keydown",It),M.removeEventListener("keyup",_t),M.removeEventListener("blur",Ft);for(const r of je)e.deleteBuffer(r);for(const r of De)e.deleteVertexArray(r);Ae&&e.deleteTexture(Ae),Le&&e.deleteProgram(Le),xe&&e.deleteProgram(xe)}},[X,Zt]),Ve.jsxs("div",{ref:B,role:"application","aria-roledescription":"keycap orb","aria-label":N,tabIndex:0,className:"relative w-full select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/40 "+x,style:{height:E,background:s,cursor:"grab",touchAction:"pan-y"},children:[Y?Ve.jsx("div",{"aria-hidden":"true",className:"absolute inset-0",style:{background:"radial-gradient(60% 45% at 55% 100%, "+o+" 0%, transparent 70%), radial-gradient(30% 30% at 50% 45%, #15161c 0%, #08080c 60%, transparent 61%)"}}):Ve.jsx("canvas",{ref:S,"aria-hidden":"true",className:"absolute inset-0 block",style:{width:"100%",height:"100%",maxWidth:"none"}}),Ve.jsx("span",{"aria-live":"polite",className:"pointer-events-none absolute overflow-hidden",style:{width:1,height:1,clip:"rect(0 0 0 0)",whiteSpace:"nowrap"},children:Kt})]})}export{_n as K};
