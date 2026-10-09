import{r as d,j as z}from"./index-CdiR0C0d.js";const Ue={propagation:.245,damping:.996,edgeWidth:.045,edgeDamp:.9,clampH:1.6,simRate:60,maxSub:4,brushRadius:.032,brushBase:.012,brushGain:.9,brushMax:.09,clickStrength:.22,clickRadius:.05,ambient:!0,ambientCount:4,ambientStrength:.018,ambientRate:1,idle:2.2,drivenMult:.45,ghost:!0,ghostReturn:10,ghostFade:1.5,ghostSpeed:4,ghostGain:2,causticA:9,detFloor:.06,clamp1:6,contrast:1.22,clamp2:8,floorBase:.34,causticGain:.3,veinThresh:1,veinGain:.1,veinColor:[140,204,217],baseDepth:1.05,depthScale:1.4,depthNoise:2,depthNoiseAmp:.25,absorb:[107,33,20],absorbScale:1.7,deepColor:[5,26,37],deepGain:.3,parallax:2.4,nScale:8.5,sun1:[.3,.45,.82],sun2:[-.5,.15,.78],spec1:150,spec2:70,spec2Gain:.35,glintGain:.85,glintColor:[255,247,224],fresnelPow:4,fresnelGain:.22,skyColor:[41,77,102],sandHi:[219,179,120],sandLo:[158,117,77],rippleScale:6.5,warpScale:3,warp:.6,bandFreq:9,bandSkew:4,bandGain:.06,grainScale:240,grainAmp:.045,octaves:4,lacunarity:2.03,gain:.5,exposure:1.55,grain:.022,gamma:.4545,vigOuter:1.28,vigInner:.32,vigDark:.6,vigBright:1.05},Le={tidepool:{},"deep-ocean":{causticA:12,contrast:1.5,veinGain:.16,veinColor:[120,190,235],floorBase:.22,causticGain:.26,baseDepth:1.6,depthScale:1.9,absorb:[70,30,14],absorbScale:2.4,deepColor:[4,22,40],deepGain:.55,sandHi:[150,160,150],sandLo:[70,90,95],skyColor:[30,66,104],fresnelGain:.3,exposure:1.35,glintColor:[220,240,255],glintGain:.7},"golden-hour":{causticA:8,contrast:1.15,veinGain:.12,veinColor:[255,214,150],floorBase:.42,causticGain:.34,baseDepth:.9,depthScale:1.1,absorb:[120,55,20],absorbScale:1.4,deepColor:[24,20,12],deepGain:.28,sandHi:[240,196,130],sandLo:[176,118,66],sun1:[.55,.18,.72],glintColor:[255,236,190],glintGain:1.1,skyColor:[90,70,45],fresnelGain:.2,exposure:1.75},"ink-bath":{causticA:16,contrast:1.8,clamp2:10,veinGain:.22,veinColor:[235,240,255],floorBase:.1,causticGain:.42,baseDepth:1.4,depthScale:2.2,absorb:[120,120,120],absorbScale:2.6,deepColor:[3,4,6],deepGain:.35,sandHi:[120,122,128],sandLo:[24,26,30],grainAmp:.02,glintColor:[255,255,255],glintGain:1.2,skyColor:[40,44,52],fresnelGain:.26,exposure:1.9,grain:.05},"alien-pool":{causticA:11,contrast:1.4,veinGain:.2,veinColor:[180,255,120],floorBase:.3,causticGain:.32,baseDepth:1.2,depthScale:1.6,absorb:[90,20,110],absorbScale:2,deepColor:[30,6,44],deepGain:.5,sandHi:[120,210,150],sandLo:[40,80,120],glintColor:[200,255,220],glintGain:.9,skyColor:[70,40,110],fresnelGain:.28,exposure:1.6}},M=12,xe=[["propagation","f"],["damping","f"],["edgeWidth","f"],["edgeDamp","f"],["clampH","f"]],ge=[["causticA","f"],["detFloor","f"],["clamp1","f"],["contrast","f"],["clamp2","f"],["floorBase","f"],["causticGain","f"],["veinThresh","f"],["veinGain","f"],["veinColor","c"],["baseDepth","f"],["depthScale","f"],["depthNoise","f"],["depthNoiseAmp","f"],["absorb","c"],["absorbScale","f"],["deepColor","c"],["deepGain","f"],["parallax","f"],["nScale","f"],["sun1","v"],["sun2","v"],["spec1","f"],["spec2","f"],["spec2Gain","f"],["glintGain","f"],["glintColor","c"],["fresnelPow","f"],["fresnelGain","f"],["skyColor","c"],["sandHi","c"],["sandLo","c"],["rippleScale","f"],["warpScale","f"],["warp","f"],["bandFreq","f"],["bandSkew","f"],["bandGain","f"],["grainScale","f"],["grainAmp","f"],["octaves","i"],["lacunarity","f"],["gain","f"],["exposure","f"],["grain","f"],["gamma","f"],["vigOuter","f"],["vigInner","f"],["vigDark","f"],["vigBright","f"]],be=s=>"u"+s[0].toUpperCase()+s.slice(1),Pe=s=>s==="i"?"int":s==="f"?"float":"vec3",Ee=s=>s.map(([u,f])=>"uniform "+Pe(f)+" "+be(u)+";").join(`
`),de=`#version 300 es
out vec2 vUv;
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Be=`#version 300 es
precision highp float;
uniform sampler2D uState;
uniform vec2 uTexel;
uniform float uAspect;
uniform int uDropCount;
uniform vec4 uDrops[${M}];
${Ee(xe)}
in vec2 vUv;
out vec4 o;
void main(){
  vec2 uv = vUv;
  float c = texture(uState, uv).r, p = texture(uState, uv).g;
  float l = texture(uState, uv - vec2(uTexel.x, 0.0)).r;
  float r = texture(uState, uv + vec2(uTexel.x, 0.0)).r;
  float u = texture(uState, uv + vec2(0.0, uTexel.y)).r;
  float d = texture(uState, uv - vec2(0.0, uTexel.y)).r;
  float nv = (2.0 * c - p) + (l + r + u + d - 4.0 * c) * uPropagation;
  nv *= uDamping;
  for (int i = 0; i < ${M}; i++) {
    if (i >= uDropCount) break;
    vec2 dp = uv - uDrops[i].xy;
    dp.x *= uAspect;
    float rr = uDrops[i].w;
    nv += uDrops[i].z * exp(-dot(dp, dp) / (rr * rr));
  }
  vec2 e = min(uv, 1.0 - uv);
  nv *= mix(uEdgeDamp, 1.0, smoothstep(0.0, uEdgeWidth, min(e.x, e.y)));
  o = vec4(clamp(nv, -uClampH, uClampH), c, 0.0, 1.0);
}`,Ne=`#version 300 es
precision highp float;
uniform sampler2D uState;
uniform vec2 uTexel;
uniform vec2 uResolution;
uniform float uTime;
uniform float uAspect;
${Ee(ge)}
in vec2 vUv;
out vec4 frag;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 8; i++) { if (i >= uOctaves) break; s += a * vnoise(p); p *= uLacunarity; a *= uGain; }
  return s;
}
vec3 sand(vec2 uv){
  vec2 p = uv * vec2(uAspect, 1.0);
  float rip = fbm(p * uRippleScale + fbm(p * uWarpScale) * uWarp);
  float band = 0.5 + 0.5 * sin(rip * uBandFreq + p.x * uBandSkew);
  vec3 b = mix(uSandHi, uSandLo, rip);
  b = mix(b, b * (1.0 + uBandGain), band);
  return b + (vnoise(p * uGrainScale) - 0.5) * uGrainAmp;
}
void main(){
  vec2 uv = vUv, t = uTexel;
  float hc = texture(uState, uv).r;
  float hl = texture(uState, uv - vec2(t.x, 0.0)).r, hr = texture(uState, uv + vec2(t.x, 0.0)).r;
  float hu = texture(uState, uv + vec2(0.0, t.y)).r, hd = texture(uState, uv - vec2(0.0, t.y)).r;
  float hpp = texture(uState, uv + t).r, hmm = texture(uState, uv - t).r;
  float hpm = texture(uState, uv + vec2(t.x, -t.y)).r, hmp = texture(uState, uv + vec2(-t.x, t.y)).r;
  float hx = (hr - hl) * 0.5, hy = (hu - hd) * 0.5;
  float hxx = hr - 2.0 * hc + hl, hyy = hu - 2.0 * hc + hd, hxy = (hpp - hpm - hmp + hmm) * 0.25;

  // The caustic is the area compression of the refracted-ray map: bright where
  // the surface focuses light, which is the determinant of its Jacobian.
  float jxx = 1.0 - uCausticA * hxx, jyy = 1.0 - uCausticA * hyy, jxy = -uCausticA * hxy;
  float det = jxx * jyy - jxy * jxy;
  float ca = clamp(1.0 / max(abs(det), uDetFloor), 0.0, uClamp1);
  ca = clamp(pow(ca, uContrast), 0.0, uClamp2);

  vec2 land = uv + vec2(hx, hy) * uParallax;
  vec3 col = sand(land) * (uFloorBase + ca * uCausticGain);
  col += uVeinColor * max(ca - uVeinThresh, 0.0) * uVeinGain;

  float depth = clamp(uBaseDepth - hc * uDepthScale + fbm(land * uDepthNoise) * uDepthNoiseAmp, 0.2, 3.0);
  col *= exp(-uAbsorb * depth * uAbsorbScale);
  col += uDeepColor * depth * uDeepGain;

  vec3 N = normalize(vec3(-hx * uNScale, -hy * uNScale, 1.0)), V = vec3(0.0, 0.0, 1.0);
  vec3 s1 = normalize(uSun1 + vec3(0.0, 0.0, 1e-4));
  vec3 s2 = normalize(uSun2 + vec3(0.0, 0.0, 1e-4));
  float sp = pow(max(dot(N, normalize(s1 + V)), 0.0), uSpec1)
           + pow(max(dot(N, normalize(s2 + V)), 0.0), uSpec2) * uSpec2Gain;
  col += sp * uGlintColor * uGlintGain;
  col = mix(col, uSkyColor, pow(1.0 - N.z, uFresnelPow) * uFresnelGain);
  col *= mix(uVigDark, uVigBright, smoothstep(uVigOuter, uVigInner, length((uv - 0.5) * vec2(uAspect, 1.0))));
  col = vec3(1.0) - exp(-col * uExposure);
  col += (hash(uv * uResolution + fract(uTime)) - 0.5) * uGrain;
  frag = vec4(pow(max(col, vec3(0.0)), vec3(uGamma)), 1.0);
}`;function ke(s,u){const f=6.283185307,v=.5+.3*Math.sin(s*.037*f*u)+.12*Math.sin(s*.011*f*u+1.7),h=.5+.28*Math.cos(s*.043*f*u)+.13*Math.cos(s*.017*f*u+4.1);return[Math.min(Math.max(v,.06),.94),Math.min(Math.max(h,.06),.94)]}function ve(s,u){return Math.min(u.brushBase+s*u.brushGain,u.brushMax)}function Ie(s,u,f,v){const h=f/Math.max(v,.05);return s+Math.max(-h,Math.min(h,u-s))}function Ve({height:s="100svh",preset:u="tidepool",params:f,resolution:v=256,interactive:h=!0,touch:Se="scroll",className:Te=""}){const W=d.useRef(null),[Re,A]=d.useState(!1),[Me,Ae]=d.useState(0),[q,ye]=d.useState(!1);d.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)"),e=()=>ye(r.matches);return e(),r.addEventListener("change",e),()=>r.removeEventListener("change",e)},[]);const y=d.useMemo(()=>({...Ue,...Le[u]??{},...f??{}}),[u,f]),m=d.useRef(y);return m.current=y,d.useEffect(()=>{const r=W.current;if(!r)return;const e=r.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,powerPreference:"high-performance"});if(!e){A(!0);return}const Ce=e.getExtension("EXT_color_buffer_float"),Ge=e.getExtension("EXT_color_buffer_half_float");if(!Ce&&!Ge){A(!0);return}e.getExtension("OES_texture_half_float_linear");const $=(t,n)=>{const a=e.createShader(t);return a?(e.shaderSource(a,n),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS)?a:(console.error("caustic-pool:",e.getShaderInfoLog(a)),null)):null},Y=(t,n)=>{const a=$(e.VERTEX_SHADER,t),i=$(e.FRAGMENT_SHADER,n),o=a&&i?e.createProgram():null;return!o||!a||!i?null:(e.attachShader(o,a),e.attachShader(o,i),e.linkProgram(o),e.deleteShader(a),e.deleteShader(i),e.getProgramParameter(o,e.LINK_STATUS)?o:(console.error("caustic-pool:",e.getProgramInfoLog(o)),null))},C=Y(de,Be),G=Y(de,Ne);if(!C||!G){A(!0);return}const J=(t,n,a)=>{const i=n.map(([c,l])=>[e.getUniformLocation(t,be(c)),c,l]),o={};for(const c of a)o[c]=e.getUniformLocation(t,c);return{tuned:i,named:o}},x=J(C,xe,["uState","uTexel","uAspect","uDropCount","uDrops"]),g=J(G,ge,["uState","uTexel","uResolution","uTime","uAspect"]),K=(t,n)=>{for(const[a,i,o]of t.tuned){const c=n[i];if(o==="c"){const l=c;e.uniform3f(a,l[0]/255,l[1]/255,l[2]/255)}else if(o==="v"){const l=c;e.uniform3f(a,l[0],l[1],l[2])}else o==="i"?e.uniform1i(a,c|0):e.uniform1f(a,c)}},p=v,Q=()=>{const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,p,p,0,e.RGBA,e.HALF_FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const n=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),{tex:t,fbo:n}},E=[Q(),Q()];if(e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE){A(!0);return}for(const t of E)e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.viewport(0,0,p,p),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT);e.bindFramebuffer(e.FRAMEBUFFER,null);let D=0;const I=e.createVertexArray();let F=1,w=1;const Z=()=>{const t=Math.min(window.devicePixelRatio||1,2);F=Math.max(r.clientWidth,1),w=Math.max(r.clientHeight,1);const n=Math.floor(F*t),a=Math.floor(w*t);(r.width!==n||r.height!==a)&&(r.width=n,r.height=a)};Z();const ee=new ResizeObserver(Z);ee.observe(r);const te=new Float32Array(M*4);let S=[];const T=(t,n,a,i)=>{S.length<M&&S.push([t,n,a,i])},De=()=>{const t=Math.min(S.length,M);for(let n=0;n<t;n++)te.set(S[n],n*4);return S=[],t};let X=[];const ae=t=>{X=[];for(let n=0;n<t;n++)X.push({px:.2+.6*Math.random(),py:.2+.6*Math.random(),ax:.1+.1*Math.random(),ay:.1+.1*Math.random(),sx:.05+.08*Math.random(),sy:.05+.08*Math.random(),phx:Math.random()*6.28,phy:Math.random()*6.28,next:Math.random()*1.2,period:.7+Math.random()*1.1})};ae(y.ambientCount);let ne=y.ambientCount;const Fe=performance.now(),_=()=>(performance.now()-Fe)/1e3;let O=.5,V=.5,U=!1,L=!1,P=-1e9;const oe=t=>{const n=r.getBoundingClientRect();return[Math.min(Math.max((t.clientX-n.left)/Math.max(n.width,1),0),1),Math.min(Math.max(1-(t.clientY-n.top)/Math.max(n.height,1),0),1)]},re=t=>{if(!h)return;const n=m.current,[a,i]=oe(t);if(U&&(L||t.pointerType==="mouse")){const o=Math.hypot(a-O,i-V);T(a,i,ve(o,n),n.brushRadius)}O=a,V=i,U=!0,P=_()},ie=t=>{if(!h)return;const n=m.current,[a,i]=oe(t);L=!0,T(a,i,n.clickStrength,n.clickRadius),O=a,V=i,U=!0,P=_()},B=()=>{L=!1},se=()=>{L=!1,U=!1};r.addEventListener("pointermove",re),r.addEventListener("pointerdown",ie),r.addEventListener("pointerup",B),r.addEventListener("pointercancel",B),r.addEventListener("pointerleave",se);const ce=t=>{t.preventDefault(),cancelAnimationFrame(b),b=0},ue=()=>Ae(t=>t+1);r.addEventListener("webglcontextlost",ce),r.addEventListener("webglcontextrestored",ue);let N=0,H=.5,j=.5,le=!1;const we=(t,n)=>{const a=m.current;if(!a.ambient)return;a.ambientCount!==ne&&(ae(a.ambientCount),ne=a.ambientCount);const i=t-P>a.idle;for(const o of X){if(o.next-=n,o.next>0)continue;o.next=o.period/Math.max(a.ambientRate,.05)*(.7+Math.random()*.6);const c=Math.min(Math.max(o.px+o.ax*Math.sin(t*o.sx*6.28+o.phx),.06),.94),l=Math.min(Math.max(o.py+o.ay*Math.cos(t*o.sy*6.28+o.phy),.06),.94);T(c,l,a.ambientStrength*(i?1:a.drivenMult),.03+Math.random()*.02)}},_e=(t,n)=>{const a=m.current,i=a.ghost&&t-P>a.ghostReturn;N=Ie(N,i?1:0,n,a.ghostFade);const[o,c]=ke(t,a.ghostSpeed);if(le||(H=o,j=c,le=!0),N>.001){const l=Math.hypot(o-H,c-j),me=ve(l,a)*N*a.ghostGain;me>1e-4&&T(o,c,me,a.brushRadius)}H=o,j=c},k=t=>{const n=_();we(n,t),_e(n,t);const a=De(),i=E[D],o=E[D^1];e.useProgram(C),e.bindVertexArray(I),e.bindFramebuffer(e.FRAMEBUFFER,o.fbo),e.viewport(0,0,p,p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,i.tex),e.uniform1i(x.named.uState,0),e.uniform2f(x.named.uTexel,1/p,1/p),e.uniform1f(x.named.uAspect,F/w),e.uniform1i(x.named.uDropCount,a),e.uniform4fv(x.named.uDrops,te),K(x,m.current),e.drawArrays(e.TRIANGLES,0,3),D^=1},fe=()=>{e.useProgram(G),e.bindVertexArray(I),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,r.width,r.height),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E[D].tex),e.uniform1i(g.named.uState,0),e.uniform2f(g.named.uTexel,1/p,1/p),e.uniform2f(g.named.uResolution,r.width,r.height),e.uniform1f(g.named.uTime,_()),e.uniform1f(g.named.uAspect,F/w),K(g,m.current),e.drawArrays(e.TRIANGLES,0,3)};let b=0,pe=performance.now(),R=0;const he=t=>{b=0;const n=m.current;let a=(t-pe)/1e3;a>.25&&(a=.25),pe=t;const i=1/Math.max(n.simRate,1);R+=a;let o=0;for(;R>=i&&o<n.maxSub;)k(i),R-=i,o++;o===0&&R>0&&(k(i),R=0),fe(),b=requestAnimationFrame(he)};return(()=>{for(let t=0;t<6;t++)T(.2+.6*Math.random(),.2+.6*Math.random(),.05+.07*Math.random(),.035+.03*Math.random()),t%3===2&&k(1/60);for(let t=0;t<26;t++)k(1/60)})(),q?fe():b=requestAnimationFrame(he),()=>{cancelAnimationFrame(b),ee.disconnect(),r.removeEventListener("pointermove",re),r.removeEventListener("pointerdown",ie),r.removeEventListener("pointerup",B),r.removeEventListener("pointercancel",B),r.removeEventListener("pointerleave",se),r.removeEventListener("webglcontextlost",ce),r.removeEventListener("webglcontextrestored",ue);for(const t of E)e.deleteFramebuffer(t.fbo),e.deleteTexture(t.tex);e.deleteVertexArray(I),e.deleteProgram(C),e.deleteProgram(G)}},[v,h,q,Me]),z.jsx("section",{className:"relative w-full overflow-hidden bg-[#05070a] "+Te,style:{height:s},"aria-label":"Shallow water lit from above",children:Re?z.jsx("div",{className:"absolute inset-0",style:{background:"radial-gradient(120% 90% at 40% 25%, #2a6b7d 0%, #16495c 35%, #0a2635 70%, #05070a 100%)"}}):z.jsx("canvas",{ref:W,"aria-hidden":"true",className:"absolute inset-0 block h-full w-full "+(h?"cursor-crosshair ":"")+(Se==="draw"?"touch-none":"touch-pan-y")})})}export{Ve as C,Le as a};
