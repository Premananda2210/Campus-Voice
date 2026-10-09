import{r as g,j as s}from"./index-CdiR0C0d.js";const gt={sepia:{stage:"#15100b",face:"#0d0906",ink:"#d3b98f",paper:"#dcc39b",shade:"#2c2015",glow:"#ffcf8f",seal:"#b5352b",text:"#e8d6b6"},jade:{stage:"#08120f",face:"#040a08",ink:"#a3cdb8",paper:"#c6ddcf",shade:"#11241b",glow:"#86e3bd",seal:"#c43d30",text:"#d8ece1"},cinnabar:{stage:"#1b0806",face:"#110403",ink:"#eca67d",paper:"#f2c09b",shade:"#3b1009",glow:"#ff9466",seal:"#efc25a",text:"#f8ddc9"},paper:{stage:"#e9ddc5",face:"#f3ead8",ink:"#3b2c1e",paper:"#f8f0e1",shade:"#3b2c1e",glow:"#a8743d",seal:"#b3271f",text:"#2b1f15"}},vt=[{roles:"概念设计 | 美术指导 | 造型设计",name:"墨川",rolesLatin:"Concept Design | Art Direction | Character Design",nameLatin:"Mo Chuan"},{roles:"摄影指导",name:"林霁",rolesLatin:"Director of Photography",nameLatin:"Lin Ji"},{roles:"原创音乐 | 声音设计",name:"苏遥",rolesLatin:"Original Score | Sound Design",nameLatin:"Su Yao"},{roles:"编剧 | 导演",name:"沈岚",rolesLatin:"Written & Directed by",nameLatin:"Shen Lan"}],yt=[{label:"Story"},{label:"Cast"},{label:"Stills"},{label:"Screenings"}],bt='"Songti SC", "STSong", "Noto Serif SC", "Noto Serif CJK SC", "Source Han Serif SC", "SimSun", "Hiragino Mincho ProN", serif',kt='"Helvetica Neue", "Avenir Next", Helvetica, Arial, system-ui, sans-serif',jt='"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace',Mt="子丑寅卯辰巳午未申酉戌亥",it=n=>n<=0?0:n>=1?1:n,Is=[[0,0],[.2,.26],[.31,.29],[.58,.66],[.7,.7],[1,1]];function wt(n){if(n<=0)return 0;if(n>=1)return 1;for(let e=0;e<Is.length-1;e++){const a=Is[e],t=Is[e+1];if(n<=t[0]){const r=(n-a[0])/(t[0]-a[0]),o=1-Math.pow(1-r,3);return a[1]+(t[1]-a[1])*o}}return 1}function Qs(n){return Math.min(8,Math.floor(it(n)*8+1e-9))}function Hs(n){return 360/Math.max(1,n)}function Gs(n,e){const a=Math.max(1,e);return(Math.round(n/Hs(a))%a+a)%a}function Js(n,e){const a=Hs(e);return Math.round(n/a)*a}function Nt(n,e,a){const t=Math.max(1,a);let r=((e-n)%t+t)%t;return r>t/2&&(r-=t),r}function Vs(n){let e=n%360;return e>180&&(e-=360),e<=-180&&(e+=360),e}function St(n,e){const a=Math.max(0,Math.floor(n/1e3*e)),t=r=>String(r).padStart(2,"0");return t(Math.floor(a/(e*3600)))+":"+t(Math.floor(a/(e*60))%60)+":"+t(Math.floor(a/e)%60)+":"+t(a%e)}function _s(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let a=e;return a=Math.imul(a^a>>>15,a|1),a^=a+Math.imul(a^a>>>7,a|61),((a^a>>>14)>>>0)/4294967296}}const dt=[{lines:[!0,!0,!0],han:"乾",name:"Heaven"},{lines:[!0,!0,!1],han:"兑",name:"Lake"},{lines:[!0,!1,!0],han:"离",name:"Fire"},{lines:[!0,!1,!1],han:"震",name:"Thunder"},{lines:[!1,!0,!0],han:"巽",name:"Wind"},{lines:[!1,!0,!1],han:"坎",name:"Water"},{lines:[!1,!1,!0],han:"艮",name:"Mountain"},{lines:[!1,!1,!1],han:"坤",name:"Earth"}],Cs=n=>Math.round(n*10)/10,y=n=>Cs(n[0])+" "+Cs(n[1]),Ms=(n,e,a)=>n+(e-n)*a,$s=(n,e,a)=>{const t=Math.max(0,Math.min(1,(a-n)/(e-n)));return t*t*(3-2*t)},rs=(n,e)=>{const a=e[0]-n[0],t=e[1]-n[1],r=Math.hypot(a,t)||1;return[a/r,t/r]};function N(n,e){const a=n.length;if(a<2)return"";const t=i=>e?n[(i+a)%a]:n[Math.max(0,Math.min(a-1,i))];let r="M"+y(n[0]);const o=e?a:a-1;for(let i=0;i<o;i++){const l=t(i-1),c=t(i),m=t(i+1),x=t(i+2),b=[c[0]+(m[0]-l[0])/6,c[1]+(m[1]-l[1])/6],f=[m[0]-(x[0]-c[0])/6,m[1]-(x[1]-c[1])/6];r+="C"+y(b)+" "+y(f)+" "+y(m)}return e?r+"Z":r}function fs(n,e,a,t,r,o,i){const l=[],c=Math.max(8,Math.round(t*18));for(let m=0;m<=c;m++){const x=m/c,b=r+o*x*t*Math.PI*2,f=a*(1-i*x);l.push([n+Math.cos(b)*f,e+Math.sin(b)*f])}return l}function ns(n,e,a,t,r,o){const i=Math.cos(r),l=Math.sin(r);return n.map(([c,m])=>{const x=c*t*o,b=m*t;return[e+x*i-b*l,a+x*l+b*i]})}function L(n){const e=Cs(n);return"M"+e+" 0A"+e+" "+e+" 0 1 1 "+-e+" 0A"+e+" "+e+" 0 1 1 "+e+" 0Z"}function ws(n,e,a,t,r){let o="";for(let i=0;i<a;i++){const l=i/a*Math.PI*2,c=t>0&&i%t===0?r:e;o+="M"+y([Math.cos(l)*n,Math.sin(l)*n])+"L"+y([Math.cos(l)*c,Math.sin(l)*c])}return o}function Lt(n,e,a,t){const r=_s(t);let o="";for(let i=0;i<a;i++){const l=r()*Math.PI*2,c=n+(e-n)*Math.sqrt(r());o+="M"+y([Math.cos(l)*c,Math.sin(l)*c])+"h0"}return o}const Pt=[fs(0,.02,.44,1.35,Math.PI,1,.82),fs(0,.02,.31,1,Math.PI,1,.75),fs(-.66,.16,.26,1.2,0,-1,.8),fs(.64,.14,.24,1.2,Math.PI,1,.8),[[-.92,.16],[-.86,-.12],[-.6,-.26],[-.4,-.36],[-.2,-.56],[.12,-.6],[.38,-.42],[.52,-.26],[.8,-.2],[.9,.06]],[[.86,.3],[1.12,.36],[1.38,.3],[1.7,.08]],[[.7,.38],[1.05,.48],[1.4,.4],[1.7,.08]]];function lt(n,e,a,t,r){let o="";for(const i of Pt)o+=N(ns(i,n,e,a,t,r),!1);return o}function Us(n,e,a,t,r){const o=[Math.cos(e),Math.sin(e)],i=[-o[1],o[0]],l=(f,M)=>[n[0]+o[0]*f+i[0]*M,n[1]+o[1]*f+i[1]*M],c=l(a,r*a*.34),m=fs(c[0]-i[0]*r*a*.08,c[1]-i[1]*r*a*.08,a*.08,1,Math.atan2(i[1]*r,i[0]*r),r,.7),x=[l(0,t),l(a*.42,t*.8+r*a*.1),l(a*.78,r*a*.3+t*.25),c],b=[c,l(a*.84,r*a*.3-t*.1),l(a*.5,-t*.4+r*a*.14),l(0,-t)];return{fill:N([...x,...b.slice(1)],!0),line:N(x,!1)+N(b,!1)+N(m,!1)}}function os(n,e){const a=n.length,t=n.map((f,M)=>rs(n[Math.max(0,M-1)],n[Math.min(a-1,M+1)])),r=[],o=[];n.forEach((f,M)=>{const[D,R]=t[M];o.push([f[0]-R*e[M],f[1]+D*e[M]]),r.push([f[0]+R*e[M],f[1]-D*e[M]])});const i=n[a-1],[l,c]=t[a-1],m=e[a-1],x=[];for(let f=1;f<6;f++){const M=f/6*Math.PI,D=Math.cos(M)*m,R=Math.sin(M)*m;x.push([i[0]-c*D+l*R,i[1]+l*D+c*R])}const b=[...o,...x,...r.reverse()];return{fill:N(b,!0),line:N(b,!1)}}function Y(n,e,a,t){const r=[-e[1],e[0]],o=[n[0]+r[0]*a,n[1]+r[1]*a],i=[n[0]-r[0]*a,n[1]-r[1]*a],l=[n[0]+e[0]*t,n[1]+e[1]*t];return"M"+y(o)+"Q"+y(l)+" "+y(i)}function st(n,e,a,t){const r=[-e[1],e[0]],o=(i,l)=>[n[0]+e[0]*i+r[0]*l,n[1]+e[1]*i+r[1]*l];return N([o(-t,-a),o(-t*.1,-a*.95),o(t*.25,0),o(-t*.1,a*.95),o(-t,a),o(-t*1.08,0)],!0)}function Rt(n,e,a){let t="";const r=e-n;for(let o=0;o<a;o++){const i=o/a*Math.PI*2,l=o%2===1,c=n+r*(l?.34:.64);t+=lt(Math.cos(i)*c,Math.sin(i)*c,r*.36,i+Math.PI/2+(l?0:Math.PI),l?1:-1);const m=(o+.5)/a*Math.PI*2,x=n+r*(l?.78:.2);t+=N(fs(Math.cos(m)*x,Math.sin(m)*x,r*.1,1.3,m,l?1:-1,.8),!1)}return t}function tt(n,e,a,t){let r="";for(let o=0;o<a;o++){const i=(o+t)/a*Math.PI*2,l=(o+t+1)/a*Math.PI*2,c=(i+l)/2,m=[Math.cos(i)*n,Math.sin(i)*n],x=[Math.cos(l)*n,Math.sin(l)*n],b=[Math.cos(c)*e,Math.sin(c)*e],f=(e-n)*.7,M=[m[0]+Math.cos(i)*f,m[1]+Math.sin(i)*f],D=[x[0]+Math.cos(l)*f,x[1]+Math.sin(l)*f];r+="M"+y(m)+"Q"+y(M)+" "+y(b)+"Q"+y(D)+" "+y(x);const R=n+(e-n)*.55;r+="M"+y([Math.cos(c)*(n+2),Math.sin(c)*(n+2)])+"L"+y([Math.cos(c)*R,Math.sin(c)*R])}return r}function zs(n,e,a){const t=[];for(let r=0;r<4;r++){const o=r*Math.PI/2,i=Math.cos(o),l=Math.sin(o),c=[[-n,-n],[-e,-n],[-e,-n-a],[-e*1.6,-n-a],[-e*1.6,-n-a*2],[e*1.6,-n-a*2],[e*1.6,-n-a],[e,-n-a],[e,-n]];for(const[m,x]of c)t.push([m*i-x*l,m*l+x*i])}return"M"+t.map(y).join("L")+"Z"}function Dt(){let n="";for(let e=-66;e<=66;e+=9)for(let a=-66;a<=66;a+=9)Math.hypot(e,a)<64||Math.abs(e)<16||Math.abs(a)<16||(n+="M"+y([e-2.6,a-2.6])+"h5.2v5.2h-5.2Z");return n}function Ct(n,e,a,t){let r="";const o=[-Math.sin(e),Math.cos(e)],i=[Math.cos(e),Math.sin(e)];return n.forEach((l,c)=>{const m=a+(c-1)*6.5,x=[i[0]*m,i[1]*m],b=(f,M)=>{r+="M"+y([x[0]+o[0]*f,x[1]+o[1]*f])+"L"+y([x[0]+o[0]*M,x[1]+o[1]*M])};l?b(-t,t):(b(-t,-t*.22),b(t*.22,t))}),r}function Ft(n,e,a){const t=[[[-10,-20],[6,-34],[22,-44],[34,-52],[48,-46],[62,-38],[82,-36],[100,-38],[108,-46],[118,-42],[121,-30],[116,-20]],[[116,-20],[104,-14],[88,-10],[72,-6],[58,-2]],[[104,-14],[101,-4],[97,-12]],[[88,-10],[84,4],[80,-8]],[[72,-6],[70,1],[66,-4]],[[58,-2],[70,7],[84,14],[95,19],[99,26],[90,31],[72,31],[52,28],[32,24],[12,21],[-6,18]],[[90,18],[88,9],[84,16]],[[76,12],[75,5],[71,10]],[[64,6],[82,8],[100,4],[116,-2],[128,4],[134,-4]],[[128,4],[136,8]],[[34,-36],[44,-41],[55,-35]],[[30,-22],[44,-18],[56,-24]],[[60,-30],[80,-28],[100,-30]],[[64,-24],[84,-22],[104,-24]],[[114,-24],[132,-32],[150,-52],[158,-76],[148,-92],[136,-86],[140,-76]],[[106,-14],[126,-2],[146,16],[158,38],[150,54],[138,48],[142,38]],[[100,40],[96,56],[86,70]],[[90,40],[82,58],[70,66]]];let r="";for(const f of t)r+=N(ns(f,n[0],n[1],a,e,1),!1);for(const[f,M,D,R]of[[36,-50,7,1],[108,-38,5,-1],[8,-30,6,1]])r+=N(ns(fs(f,M,D,1.2,Math.PI,R,.8),n[0],n[1],a,e,1),!1);let o="",i="";for(const[f,M,D,R,V,k]of[[6,-30,Math.PI+.55,62,10,-1],[0,-16,Math.PI+.22,76,11,1],[0,0,Math.PI-.08,70,10,-1],[6,14,Math.PI-.42,60,9,1],[16,22,Math.PI-.85,48,8,-1],[44,10,Math.PI-1,34,6,1],[32,18,Math.PI-.75,30,5,-1]]){const B=Us(ns([[f,M]],n[0],n[1],a,e,1)[0],D+e,R*a,V*a,k);o+=B.fill,i+=B.line}const l=[[-10,-20],[6,-34],[22,-44],[34,-52],[48,-46],[62,-38],[82,-36],[100,-38],[108,-46],[118,-42],[121,-30],[116,-20],[104,-14],[88,-10],[72,-6],[58,-2],[40,4],[18,8],[-8,8]],c=[[58,-2],[70,7],[84,14],[95,19],[99,26],[90,31],[72,31],[52,28],[32,24],[12,21],[-6,18],[-8,8],[18,8],[40,4]];let m=N(ns(l,n[0],n[1],a,e,1),!0)+N(ns(c,n[0],n[1],a,e,1),!0);for(const f of[[24,-40,10,-56,-12,-68,-38,-70,6,5,3.6,2.2],[16,-44,0,-64,-22,-78,-46,-82,7.5,6.2,5,3.4],[-14,-76,-22,-94,-17,-110,-17,-110,4.4,3.2,2.2,2.2],[-38,-82,-50,-98,-46,-112,-46,-112,4,2.8,1.8,1.8]]){const M=[[f[0],f[1]],[f[2],f[3]],[f[4],f[5]],[f[6],f[7]]],D=os(ns(f[4]===f[6]?M.slice(0,3):M,n[0],n[1],a,e,1),(f[4]===f[6]?f.slice(8,11):f.slice(8)).map(R=>R*a));m+=D.fill,r+=D.line}const x=ns([[44,-28]],n[0],n[1],a,e,1)[0],b=Cs(8*a);return r+="M"+y([x[0]+b,x[1]])+"A"+b+" "+b+" 0 1 1 "+y([x[0]-b,x[1]])+"A"+b+" "+b+" 0 1 1 "+y([x[0]+b,x[1]])+"Z",{fill:m,line:r,maneFill:o,maneLine:i,eye:x}}function At(){const e=-62*Math.PI/180,a=218*Math.PI/180,t=[];for(let p=0;p<=260;p++){const u=p/260,v=Ms(e,a,u),P=256+40*Math.sin(u*Math.PI*4.6+1.1)+14*u;t.push([Math.cos(v)*P,Math.sin(v)*P])}const r=t.map((p,u)=>rs(t[Math.max(0,u-1)],t[Math.min(260,u+1)])),o=r.map(([p,u])=>[u,-p]),i=t.map((p,u)=>3+30*$s(0,.4,u/260)-4*$s(.88,1,u/260)),l=t.map((p,u)=>[p[0]+o[u][0]*i[u],p[1]+o[u][1]*i[u]]),c=t.map((p,u)=>[p[0]-o[u][0]*i[u],p[1]-o[u][1]*i[u]]),m=N([...l,...c.slice().reverse()],!0),x=N(l,!1)+N(c,!1);let b="";for(let p=8,u=0;p<250;p+=5,u++){const v=i[p],P=u%2?[-.55,0,.55]:[-.28,.28],S=v*.3;for(const C of P){const A=[t[p][0]+o[p][0]*C*v,t[p][1]+o[p][1]*C*v],U=[A[0]+o[p][0]*S,A[1]+o[p][1]*S],is=[A[0]-o[p][0]*S,A[1]-o[p][1]*S],X=[A[0]+r[p][0]*S*1.5,A[1]+r[p][1]*S*1.5];b+="M"+y(U)+"Q"+y(X)+" "+y(is)}}const f=t.map((p,u)=>[p[0]-o[u][0]*i[u]*.62,p[1]-o[u][1]*i[u]*.62]);let M=N(f.slice(10,256),!1);for(let p=12;p<254;p+=3)M+="M"+y(f[p])+"L"+y(c[p]);let D="";for(let p=14;p<246;p+=6){const u=i[p]*.75,v=l[p],P=l[p+5],S=l[p+1],C=[S[0]+o[p][0]*u-r[p][0]*u*.55,S[1]+o[p][1]*u-r[p][1]*u*.55];D+="M"+y(v)+"Q"+y([Ms(v[0],C[0],.6)+r[p][0]*3,Ms(v[1],C[1],.6)+r[p][1]*3])+" "+y(C),D+="Q"+y([Ms(P[0],C[0],.4),Ms(P[1],C[1],.4)])+" "+y(P)}let R="",V="";for(const[p,u,v]of[[.29,-1,50],[.47,1,58],[.73,-1,58],[.87,1,54]]){const P=Math.round(p*260),S=[o[P][0]*u,o[P][1]*u],C=r[P],A=[t[P][0]+S[0]*i[P]*.4,t[P][1]+S[1]*i[P]*.4],U=[A[0]+S[0]*v*.7-C[0]*v*.2,A[1]+S[1]*v*.7-C[1]*v*.2],is=[U[0]+C[0]*v*.55+S[0]*v*.24,U[1]+C[1]*v*.55+S[1]*v*.24],X=Math.atan2(-C[1],-C[0]);for(const[$,ls,F]of[[.5*u,.62,u],[.15*u,.5,-u]]){const _=Us(U,X+$,v*ls,v*.08,F);R+=_.fill,V+=_.line}const K=os([A,U],[v*.19,v*.14]),Ss=os([U,is],[v*.13,v*.1]);R+=K.fill+Ss.fill,V+=K.line+Ss.line+Y(U,rs(A,U),v*.12,v*.04);const ds=Math.atan2(C[1]*.75+S[1]*.65,C[0]*.75+S[0]*.65);for(let $=-1.5;$<=1.5;$+=1){const ls=ds+$*.42,F=v*(.4-Math.abs($)*.05),_=v*.055,ss=[Math.cos(ls),Math.sin(ls)],ms=[-ss[1]*u,ss[0]*u],Z=(ps,Ls)=>[is[0]+ss[0]*ps+ms[0]*Ls,is[1]+ss[1]*ps+ms[1]*Ls],xs=N([Z(0,_),Z(F*.55,_*.9+F*.08),Z(F*.9,F*.32),Z(F,F*.52),Z(F*.72,F*.18),Z(F*.4,-_*.4),Z(0,-_)],!0);R+=xs,V+=xs}}let k="",B="";const us=Math.atan2(-r[0][1],-r[0][0]);for(const[p,u,v]of[[-.5,46,-1],[-.1,62,1],[.35,52,-1],[.75,38,1]]){const P=Us(t[2],us+p,u,10,v);k+=P.fill,B+=P.line}const Ns=t[260],ys=Ft(Ns,Math.atan2(r[260][1],r[260][0])-.3,1.6);let bs="";for(const[p,u,v,P]of[[-34,368,40,1],[22,360,34,-1],[118,366,40,1],[158,352,30,-1],[-118,352,30,-1],[72,388,28,1]]){const S=p*Math.PI/180;bs+=lt(Math.cos(S)*u,Math.sin(S)*u,v,S+Math.PI/2,P)}return{bodyFill:m,outline:x,scales:b,belly:M,fins:D,legFill:R,legLine:V,tailFill:k,tailLine:B,head:ys,clouds:bs}}function Tt(){const n=[],e=[];n.push({fill:N([[-40,90],[-41,30],[-44,0],[-52,-36],[-50,-76],[-40,-112],[-14,-124],[20,-124],[44,-116],[58,-98],[58,-64],[50,-24],[42,10],[40,90]],!0),line:""}),n[0].line=n[0].fill,n.push(os([[-25,-108],[-26,-168],[-27,-206],[-27,-234]],[14,12.6,11.4,10.4])),e.push(Y([-26,-165],[0,-1],10,3),Y([-26,-171],[0,-1],9,3),Y([-27,-204],[0,-1],8.6,3));for(const[a,t,r,o]of[[50,-132,-90,10.5],[29,-148,-92,12],[5,-152,-94,13]])n.push(os([[a+1,r+6],[a,t+o]],[o,o])),e.push(Y([a,t+o*2.1],[0,-1],o*.7,-2.5),st([a+1,r+2],[0,1],o*.6,o*.95));return n.push(os([[-46,-28],[-38,-62],[-20,-86],[2,-98]],[19,15,12.5,11])),e.push(st([2,-98],rs([-20,-86],[2,-98]),7.4,11),Y([-22,-84],rs([-38,-62],[-20,-86]),11.5,3)),e.push(N([[-40,-2],[-26,-26],[-14,-50],[-4,-66]],!1),N([[-10,-48],[14,-56],[36,-66],[52,-80]],!1),N([[-28,34],[0,38],[30,34]],!1),N([[-28,46],[0,50],[30,46]],!1)),{shapes:n,lines:e.join("")}}function Wt(){const n=[],e=[],a=N([[-40,-90],[-41,-30],[-44,0],[-52,34],[-50,76],[-40,108],[-10,118],[22,118],[44,110],[56,90],[56,50],[50,10],[42,-20],[40,-90]],!0);n.push({fill:a,line:a});for(const t of[[42,100,46,140,48,160,49,176,10.4,9,8.3,7.8],[22,108,24,152,25,180,25,198,12.4,11,10,9.3],[-1,110,-1,158,-1,188,-1,208,13,11.6,10.6,9.8],[-24,106,-26,150,-27,178,-27,196,12.8,11.4,10.4,9.6]]){const r=[[t[0],t[1]],[t[2],t[3]],[t[4],t[5]],[t[6],t[7]]];n.push(os(r,t.slice(8)));const o=rs(r[0],r[1]);e.push(Y(r[1],o,t[9]*.82,2.5),Y([r[1][0]+o[0]*5,r[1][1]+o[1]*5],o,t[9]*.78,2.5),Y(r[2],rs(r[1],r[2]),t[10]*.8,2.5))}return n.push(os([[-44,24],[-62,58],[-74,88],[-80,112]],[19,14.5,12.4,11])),e.push(Y([-73,86],rs([-62,58],[-74,88]),11,3)),e.push(N([[-46,16],[-28,40],[-20,70],[-22,98]],!1),N([[-44,30],[-16,46],[12,56],[32,74]],!1),N([[-8,92],[16,86],[36,84],[54,80]],!1),N([[-30,-36],[0,-40],[30,-36]],!1)),{shapes:n,lines:e.join("")}}function It(){const n=dt.map((t,r)=>Ct(t.lines,r/8*Math.PI*2-Math.PI/2,163,12.5));let e="";for(let t=0;t<8;t++){const r=(t+.5)/8*Math.PI*2-Math.PI/2;e+="M"+y([Math.cos(r)*153,Math.sin(r)*153])+"L"+y([Math.cos(r)*174,Math.sin(r)*174])}let a="";for(const[t,r]of[[0,-1],[1,0],[0,1],[-1,0]]){const o=[-r*6,t*6];a+="M"+y([t*58+o[0],r*58+o[1]])+"L"+y([t*72+o[0],r*72+o[1]]),a+="M"+y([t*58-o[0],r*58-o[1]])+"L"+y([t*72-o[0],r*72-o[1]])}return{rimLines:L(198)+L(195)+L(178)+ws(195,190.5,180,0,0)+ws(195,187,36,0,0),band:L(176)+L(150)+e,bandDots:L(153),trigrams:n,face:L(146)+tt(128,146,24,0)+zs(86,22,9)+zs(79,20,8)+zs(72,18,7)+L(58)+tt(40,58,8,.5)+L(40)+L(24)+a,faceDots:L(124),lattice:Dt(),fine:ws(24,40,24,0,0),rays:ws(10,21,16,2,24),needle:"M-142 0L-20 -5L0 -12L20 -5L142 0L20 5L0 12L-20 5Z"+L(12)+"M142 0L158 -6L158 6Z"}}function zt(){return{lace:Rt(690,810,44),rules:L(690)+L(682)+L(810)+L(818),dots:L(700)+L(800),stipple:Lt(692,808,2600,3),scale:L(905)+ws(905,920,120,10,935)}}let Es=null;function Fs(){return Es||(Es={rings:zt(),dragon:At(),raised:Tt(),open:Wt(),seal:It()}),Es}function Et(n){const e=n.replace("#",""),a=e.length===3?e.replace(/./g,"$&$&"):e.slice(0,6),t=parseInt(a,16);return a.length!==6||Number.isNaN(t)?!1:.2126*(t>>16&255)+.7152*(t>>8&255)+.0722*(t&255)>150}function Bt(n){const a=document.createElement("canvas");a.width=384,a.height=384;const t=a.getContext("2d");if(!t)throw new Error("no 2d context");const r=_s(17);for(let o=0;o<90;o++){const i=r()*384,l=r()*384,c=20+r()*90,m=r()>.5?255:0,x=t.createRadialGradient(i,l,0,i,l,c);x.addColorStop(0,"rgba("+m+","+m+","+m+","+(.03+r()*.05).toFixed(3)+")"),x.addColorStop(1,"rgba("+m+","+m+","+m+",0)"),t.fillStyle=x;for(const b of[-384,0,384])for(const f of[-384,0,384])t.save(),t.translate(b,f),t.fillRect(i-c,l-c,c*2,c*2),t.restore()}t.lineWidth=.6;for(let o=0;o<260;o++){const i=r()*384,l=r()*384,c=r()*Math.PI,m=4+r()*14;t.strokeStyle=n?"rgba(255,240,210,"+(.03+r()*.06).toFixed(3)+")":"rgba(60,40,20,"+(.03+r()*.06).toFixed(3)+")",t.beginPath(),t.moveTo(i,l),t.quadraticCurveTo(i+Math.cos(c)*m*.5+r()*3,l+Math.sin(c)*m*.5,i+Math.cos(c)*m,l+Math.sin(c)*m),t.stroke()}for(let o=0;o<140;o++){t.fillStyle="rgba(20,10,0,"+(.08+r()*.2).toFixed(3)+")";const i=r()<.9?.8:1.8;t.fillRect(r()*384,r()*384,i,i)}return a}function Ut(){const e=document.createElement("canvas");e.width=160,e.height=160;const a=e.getContext("2d");if(!a)throw new Error("no 2d context");const t=a.createImageData(160,160),r=_s(7);for(let o=0;o<t.data.length;o+=4){const i=Math.round(r()*255);t.data[o]=i,t.data[o+1]=i,t.data[o+2]=i,t.data[o+3]=40}return a.putImageData(t,0,0),e}const et=n=>'url("'+n.toDataURL("image/png")+'")',Ht=`
.dsp-root {
  position: relative;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: var(--dsp-stage);
  color: var(--dsp-text);
  font-family: var(--dsp-latin);
  -webkit-tap-highlight-color: transparent;
  --dsp-par: calc(var(--dsp-s) * 0.014);
  --dsp-ease: cubic-bezier(0.16, 1, 0.3, 1);
}
.dsp-root[data-phase="boot"], .dsp-root[data-phase="load"], .dsp-root[data-phase="summon"] { cursor: pointer; }
.dsp-shell, .dsp-shell *, .dsp-shell *::before, .dsp-shell *::after { box-sizing: border-box; }
.dsp-shell { position: absolute; inset: 0; }

/* ---- the stage ---- */
.dsp-backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% var(--dsp-cy), var(--dsp-lift) 0%, transparent 70%),
    var(--dsp-stage);
}
.dsp-paper {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: var(--dsp-paper-tex);
  background-size: 384px 384px;
  mix-blend-mode: var(--dsp-blend-paper);
  opacity: var(--dsp-paper-k);
}
.dsp-glow {
  position: absolute;
  left: 50%;
  top: var(--dsp-cy);
  width: calc(var(--dsp-s) * 1.25);
  height: calc(var(--dsp-s) * 1.25);
  margin: calc(var(--dsp-s) * -0.625) 0 0 calc(var(--dsp-s) * -0.625);
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(closest-side, var(--dsp-glow), transparent 72%);
  mix-blend-mode: var(--dsp-blend-light);
  opacity: calc(0.05 + var(--dsp-p) * 0.13);
  transform: translate3d(calc(var(--dsp-mx) * var(--dsp-par) * 2.2), calc(var(--dsp-my) * var(--dsp-par) * 2.2), 0);
  transition: opacity 1.2s ease;
}
.dsp-root[data-phase="landing"] .dsp-glow { opacity: 0.2; animation: dsp-breathe 7s ease-in-out infinite alternate; }
.dsp-flash {
  position: absolute;
  left: 50%;
  top: var(--dsp-cy);
  width: calc(var(--dsp-s) * 0.9);
  height: calc(var(--dsp-s) * 0.9);
  margin: calc(var(--dsp-s) * -0.45) 0 0 calc(var(--dsp-s) * -0.45);
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(closest-side, var(--dsp-glow), transparent);
  mix-blend-mode: var(--dsp-blend-light);
  opacity: 0;
  transform: scale(0.2);
}
.dsp-root[data-phase="summon"] .dsp-flash { animation: dsp-flash 2.2s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.dsp-root[data-pulse="1"] .dsp-flash { animation: dsp-pulse 1.1s cubic-bezier(0.2, 0.7, 0.2, 1) both; }

/* ---- the emblem: stacked layers, each its own svg so moves stay on the GPU ---- */
.dsp-weave { position: absolute; inset: 0; }
.dsp-root[data-phase="boot"] .dsp-weave, .dsp-root[data-phase="load"] .dsp-weave { animation: dsp-weave 0.42s steps(3) infinite; }
.dsp-emblem {
  position: absolute;
  left: 50%;
  top: var(--dsp-cy);
  width: var(--dsp-s);
  height: var(--dsp-s);
  margin: calc(var(--dsp-s) * -0.5) 0 0 calc(var(--dsp-s) * -0.5);
}
.dsp-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transform: translate3d(calc(var(--dsp-mx) * var(--dsp-par) * var(--d)), calc(var(--dsp-my) * var(--dsp-par) * var(--d)), 0);
}
.dsp-layer svg, .dsp-spin, .dsp-turn {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.dsp-root svg, .dsp-root canvas, .dsp-root img { max-width: none; }

.dsp-rings .dsp-spin { animation: dsp-spin 360s linear infinite; }
.dsp-rings .dsp-scale { animation: dsp-spin 520s linear infinite reverse; }
.dsp-lace { opacity: 0.78; }
.dsp-spark { opacity: 0; transition: opacity 0.6s ease; }
.dsp-root[data-phase="load"] .dsp-spark { opacity: 1; }

/* the dragon draws itself in */
.dsp-draw { stroke-dasharray: 1 2; stroke-dashoffset: 1; }
.dsp-root[data-phase="summon"] .dsp-draw {
  animation: dsp-draw var(--du, 2s) cubic-bezier(0.45, 0.05, 0.2, 1) var(--dl, 0s) forwards;
}
.dsp-root[data-phase="landing"] .dsp-draw { stroke-dashoffset: 0; }
.dsp-fade { opacity: 0; }
.dsp-root[data-phase="summon"] .dsp-fade { animation: dsp-in 1.4s ease var(--dl, 0s) forwards; }
.dsp-root[data-phase="landing"] .dsp-fade { opacity: 1; }
.dsp-dragon .dsp-turn { animation: dsp-sway 14s ease-in-out infinite alternate; }
.dsp-eye { opacity: 0; transform-box: fill-box; transform-origin: center; }
.dsp-root[data-phase="summon"] .dsp-eye { animation: dsp-glint 1.2s ease 2.4s forwards; }
.dsp-root[data-phase="landing"] .dsp-eye { opacity: 1; animation: dsp-blink 9s ease-in-out 2s infinite; }

/* the hands rise out from behind the seal */
.dsp-hand .dsp-rise {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translate3d(0, calc(var(--dir) * var(--dsp-s) * 0.2), 0) scale(0.92);
  transition: transform 2s var(--dsp-ease) var(--dl), opacity 0.9s ease var(--dl);
}
.dsp-root[data-phase="summon"] .dsp-hand .dsp-rise, .dsp-root[data-phase="landing"] .dsp-hand .dsp-rise { opacity: 1; transform: none; }
.dsp-hand .dsp-bob { position: absolute; inset: 0; animation: dsp-bob 6s ease-in-out infinite alternate; animation-delay: var(--bd); }

/* the seal */
.dsp-seal .dsp-in {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(0.94);
  filter: blur(8px);
  animation: dsp-rack 1.8s var(--dsp-ease) 0.35s forwards;
}
.dsp-root[data-phase="summon"] .dsp-seal .dsp-thud { animation: dsp-thud 0.9s var(--dsp-ease) both; }
.dsp-thud { position: absolute; inset: 0; }
.dsp-face .dsp-spin { animation: dsp-spin 240s linear infinite; }
.dsp-face .dsp-turn { transform: rotate(calc(var(--dsp-a) * 0.25deg)); }
.dsp-band .dsp-turn { transform: rotate(calc(var(--dsp-a) * -0.5deg)); }
.dsp-rim .dsp-turn { transform: rotate(calc(var(--dsp-a) * 1deg)); }
.dsp-needle .dsp-turn { transform: rotate(calc(var(--dsp-n) * 1deg)); }
.dsp-needle { opacity: 0; transition: opacity 1.2s ease; }
.dsp-root[data-phase="landing"] .dsp-needle { opacity: 1; }
.dsp-tri { opacity: 0.22; transition: opacity 0.5s ease, stroke 0.5s ease; }
.dsp-tri[data-lit="1"] { opacity: 1; }
.dsp-tri[data-hot="1"] { stroke: var(--dsp-glow); }
.dsp-sun { transform-box: fill-box; transform-origin: center; animation: dsp-sun 4s ease-in-out infinite alternate; }

/* the dial: an invisible control laid over the seal */
.dsp-dial {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 42%;
  height: 42%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  cursor: grab;
  outline: none;
  touch-action: none;
  pointer-events: none;
}
.dsp-root[data-phase="landing"] .dsp-dial { pointer-events: auto; }
.dsp-dial:active { cursor: grabbing; }
.dsp-dial:focus-visible { box-shadow: 0 0 0 1px var(--dsp-seal), 0 0 0 6px color-mix(in srgb, var(--dsp-seal) 25%, transparent); }

/* ---- film ---- */
.dsp-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse 75% 70% at 50% 50%, transparent 45%, var(--dsp-vig) 100%);
}
.dsp-grain {
  position: absolute;
  inset: -50%;
  pointer-events: none;
  opacity: 0.5;
  mix-blend-mode: overlay;
  background-image: var(--dsp-grain-tex);
  background-size: 160px 160px;
  animation: dsp-grain 0.8s steps(5) infinite;
}
.dsp-flicker {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: var(--dsp-stage);
  opacity: 0;
  animation: dsp-flicker 0.24s steps(2) infinite;
}
.dsp-scratch {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  pointer-events: none;
  background: linear-gradient(transparent, var(--dsp-ink) 20%, var(--dsp-ink) 70%, transparent);
  opacity: 0;
  animation: dsp-scratch 4.2s steps(1) infinite;
}
.dsp-scratch + .dsp-scratch { animation-duration: 6.6s; animation-delay: -2.1s; }
.dsp-boot {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: #000;
  opacity: 0;
}
.dsp-root[data-phase="boot"] .dsp-boot { animation: dsp-boot 1.1s steps(9) forwards; }
.dsp-veil {
  position: absolute;
  inset: 0;
  z-index: 9;
  background: var(--dsp-stage);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.7s ease;
}
.dsp-veil[data-on="true"] { opacity: 1; pointer-events: auto; }

/* ---- type ---- */
.dsp-ui { position: absolute; inset: 0; z-index: 4; pointer-events: none; }
.dsp-ui a, .dsp-ui button { pointer-events: auto; }
.dsp-btn {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  text-decoration: none;
  cursor: pointer;
}
.dsp-btn:focus-visible { outline: 1px solid var(--dsp-seal); outline-offset: 4px; }

.dsp-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: clamp(16px, 3.4vh, 36px) clamp(16px, 4vw, 56px);
}
.dsp-brand { display: flex; align-items: center; gap: 14px; opacity: 0; }
.dsp-root[data-phase="landing"] .dsp-brand { animation: dsp-up 1.2s var(--dsp-ease) 0.1s forwards; }
.dsp-chop {
  display: flex;
  flex-flow: column wrap-reverse;
  align-content: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 3px;
  background: var(--dsp-seal);
  color: var(--dsp-chop-ink);
  font-family: var(--dsp-cjk);
  font-size: 14px;
  line-height: 1;
  letter-spacing: 0;
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--dsp-chop-ink) 35%, transparent), inset 0 0 0 4px var(--dsp-seal), inset 0 0 6px rgba(0, 0, 0, 0.35);
  transition: transform 0.4s var(--dsp-ease);
}
.dsp-chop span { display: block; padding: 0.5px 0.5px; }
.dsp-chop[data-many="true"] { font-size: 12px; }
.dsp-chop:hover { transform: rotate(-6deg) scale(1.06); }
.dsp-brand-latin { font-size: 11px; letter-spacing: 0.5em; text-transform: uppercase; opacity: 0.85; }
.dsp-nav { display: flex; gap: clamp(14px, 2.4vw, 34px); font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0; }
.dsp-root[data-phase="landing"] .dsp-nav { animation: dsp-up 1.2s var(--dsp-ease) 0.25s forwards; }
.dsp-nav .dsp-btn { position: relative; padding: 6px 0; opacity: 0.72; transition: opacity 0.3s ease; }
.dsp-nav .dsp-btn::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0.32em;
  bottom: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: 100% 50%;
  transition: transform 0.45s var(--dsp-ease);
}
.dsp-nav .dsp-btn:hover { opacity: 1; }
.dsp-nav .dsp-btn:hover::after { transform: scaleX(1); transform-origin: 0 50%; }
.dsp-tc {
  font-family: var(--dsp-mono);
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--dsp-text);
  opacity: 0.55;
  font-variant-numeric: tabular-nums;
}
.dsp-tc b { font-weight: 400; color: var(--dsp-seal); }

.dsp-verse {
  position: absolute;
  right: clamp(16px, 4vw, 56px);
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  font-family: var(--dsp-cjk);
  font-size: 13px;
  letter-spacing: 0.9em;
  opacity: 0;
  color: var(--dsp-ink);
}
.dsp-root[data-phase="landing"] .dsp-verse { animation: dsp-verse 2.4s ease 0.8s forwards; }
.dsp-verse::before {
  content: "";
  display: inline-block;
  width: 1px;
  height: 46px;
  margin-bottom: 18px;
  background: currentColor;
  opacity: 0.6;
}

/* the credit, set like the opening of a film */
.dsp-credits {
  position: absolute;
  left: clamp(18px, 6vw, 96px);
  bottom: clamp(70px, 14vh, 150px);
  width: max(260px, calc(50% - var(--dsp-s) * 0.3 - clamp(18px, 6vw, 96px)));
}
.dsp-credit { position: relative; }
.dsp-credit + .dsp-credit { position: absolute; left: 0; bottom: 0; }
.dsp-roles {
  margin: 0;
  font-family: var(--dsp-cjk);
  font-size: clamp(12px, 1.25vw, 16px);
  line-height: 1.7;
  letter-spacing: 0.26em;
}
.dsp-name {
  margin: 0.28em 0 0.32em;
  font-family: var(--dsp-cjk);
  font-weight: 600;
  font-size: clamp(38px, 5.4vw, 78px);
  line-height: 1;
  letter-spacing: 0.14em;
  white-space: nowrap;
}
.dsp-roles-latin {
  margin: 0;
  font-family: var(--dsp-mono);
  font-size: clamp(8px, 0.75vw, 10px);
  line-height: 1.8;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  opacity: 0.7;
}
.dsp-name-latin {
  margin: 0.7em 0 0;
  font-size: clamp(11px, 1vw, 14px);
  letter-spacing: 0.72em;
  text-transform: uppercase;
}
.dsp-word { display: inline-block; white-space: nowrap; }
.dsp-ch { display: inline-block; }
.dsp-credit[data-state="in"] .dsp-ch { opacity: 0; filter: blur(8px); transform: translateY(0.3em); animation: dsp-letter 1s var(--dsp-ease) forwards; }
.dsp-credit[data-state="out"] { animation: dsp-out 0.7s ease forwards; }
.dsp-rule {
  display: block;
  width: 64px;
  height: 1px;
  margin: 0 0 14px;
  background: var(--dsp-seal);
  transform-origin: 0 50%;
  transform: scaleX(0);
}
.dsp-credit[data-state="in"] .dsp-rule { animation: dsp-rule 1.1s var(--dsp-ease) forwards; }

/* the loading read-out sits where the credits will */
.dsp-readout {
  position: absolute;
  left: clamp(18px, 6vw, 96px);
  bottom: clamp(70px, 14vh, 150px);
  min-width: 220px;
  outline: none;
  transition: opacity 0.8s ease, filter 0.8s ease;
}
.dsp-root[data-phase="summon"] .dsp-readout, .dsp-root[data-phase="landing"] .dsp-readout { opacity: 0; filter: blur(6px); pointer-events: none; }
.dsp-readout:focus-visible { outline: 1px solid var(--dsp-seal); outline-offset: 10px; }
.dsp-kicker {
  display: block;
  font-family: var(--dsp-cjk);
  font-size: 13px;
  letter-spacing: 0.36em;
  opacity: 0.85;
}
.dsp-kicker small { font-family: var(--dsp-mono); font-size: 9px; letter-spacing: 0.34em; text-transform: uppercase; opacity: 0.7; }
.dsp-count {
  display: block;
  margin: 10px 0 8px;
  font-family: var(--dsp-cjk);
  font-size: clamp(44px, 6vw, 84px);
  line-height: 1;
  letter-spacing: 0.06em;
  font-variant-numeric: tabular-nums;
}
.dsp-count small { font-size: 0.3em; letter-spacing: 0.2em; opacity: 0.6; margin-left: 0.4em; }
.dsp-gua { display: block; font-family: var(--dsp-mono); font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase; opacity: 0.8; min-height: 1.4em; }
.dsp-gua b { font-family: var(--dsp-cjk); font-weight: 400; font-size: 14px; letter-spacing: 0; margin-right: 10px; color: var(--dsp-seal); }
.dsp-track { display: block; position: relative; width: 220px; height: 1px; margin-top: 16px; background: color-mix(in srgb, var(--dsp-text) 18%, transparent); }
.dsp-track i { position: absolute; inset: 0; background: var(--dsp-text); transform-origin: 0 50%; transform: scaleX(var(--dsp-p)); }
.dsp-track s { position: absolute; top: -3px; width: 1px; height: 7px; background: color-mix(in srgb, var(--dsp-text) 40%, transparent); }

/* bottom right: the credit counter and the way in */
.dsp-controls {
  position: absolute;
  right: clamp(16px, 4vw, 56px);
  bottom: clamp(28px, 6vh, 56px);
  display: flex;
  align-items: center;
  gap: clamp(14px, 2vw, 28px);
  opacity: 0;
}
.dsp-root[data-phase="landing"] .dsp-controls { animation: dsp-up 1.2s var(--dsp-ease) 0.5s forwards; }
.dsp-index { display: flex; align-items: center; gap: 10px; font-family: var(--dsp-mono); font-size: 10px; letter-spacing: 0.24em; font-variant-numeric: tabular-nums; }
.dsp-index b { font-weight: 400; font-size: 13px; }
.dsp-arrow {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--dsp-text) 30%, transparent);
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
}
.dsp-arrow:hover { border-color: var(--dsp-text); transform: scale(1.06); }
.dsp-arrow svg { width: 12px; height: 12px; }
.dsp-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 13px 22px 13px 24px;
  border: 1px solid color-mix(in srgb, var(--dsp-text) 45%, transparent);
  font-size: 11px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  overflow: hidden;
  transition: color 0.45s ease, border-color 0.45s ease;
}
.dsp-cta::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--dsp-seal);
  transform: translateY(101%);
  transition: transform 0.5s var(--dsp-ease);
}
.dsp-cta:hover { color: var(--dsp-chop-ink); border-color: var(--dsp-seal); }
.dsp-cta:hover::before { transform: none; }
.dsp-cta span, .dsp-cta svg { position: relative; }
.dsp-cta svg { width: 18px; height: 10px; transition: transform 0.45s var(--dsp-ease); }
.dsp-cta:hover svg { transform: translateX(4px); }
.dsp-hint {
  position: absolute;
  left: 50%;
  bottom: clamp(26px, 5vh, 48px);
  transform: translateX(-50%);
  font-family: var(--dsp-mono);
  font-size: 9px;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.8s ease;
}
.dsp-root[data-phase="landing"] .dsp-hint { animation: dsp-hint 1.6s ease 1.4s forwards; }
.dsp-root[data-touched="true"] .dsp-hint { animation: none; opacity: 0; }
.dsp-skip {
  position: absolute;
  right: clamp(16px, 4vw, 56px);
  bottom: clamp(28px, 6vh, 56px);
  font-family: var(--dsp-mono);
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}
.dsp-skip:hover { opacity: 1; }
.dsp-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* ---- tall screens: the seal moves up, the credit sits under it ---- */
.dsp-root[data-tall="true"] .dsp-credits, .dsp-root[data-tall="true"] .dsp-readout { bottom: clamp(96px, 15vh, 150px); width: auto; right: clamp(18px, 6vw, 96px); }
.dsp-root[data-tall="true"] .dsp-verse, .dsp-root[data-tall="true"] .dsp-nav, .dsp-root[data-tall="true"] .dsp-hint { display: none; }
.dsp-root[data-tall="true"] .dsp-controls { left: clamp(16px, 4vw, 56px); justify-content: space-between; }

@keyframes dsp-spin { to { transform: rotate(360deg); } }
@keyframes dsp-sway { from { transform: rotate(-1.4deg) scale(0.995); } to { transform: rotate(1.4deg) scale(1.005); } }
@keyframes dsp-bob { from { transform: translate3d(0, -0.5%, 0); } to { transform: translate3d(0, 0.5%, 0); } }
@keyframes dsp-draw { to { stroke-dashoffset: 0; } }
@keyframes dsp-in { to { opacity: 1; } }
@keyframes dsp-rack { to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes dsp-thud { 0% { transform: scale(1); } 22% { transform: scale(1.035); } 100% { transform: scale(1); } }
@keyframes dsp-glint { 0% { opacity: 0; transform: scale(0.2); } 40% { opacity: 1; transform: scale(2.2); } 100% { opacity: 1; transform: scale(1); } }
@keyframes dsp-blink { 0%, 96%, 100% { transform: scale(1); } 98% { transform: scale(1, 0.1); } }
@keyframes dsp-sun { from { transform: scale(0.92); opacity: 0.85; } to { transform: scale(1.08); opacity: 1; } }
@keyframes dsp-flash {
  0% { opacity: 0; transform: scale(0.2); }
  25% { opacity: 0.9; }
  100% { opacity: 0; transform: scale(1.6); }
}
@keyframes dsp-pulse {
  0% { opacity: 0; transform: scale(0.3); }
  30% { opacity: 0.55; }
  100% { opacity: 0; transform: scale(1.2); }
}
@keyframes dsp-breathe { from { opacity: 0.16; } to { opacity: 0.26; } }
@keyframes dsp-weave {
  0% { transform: translate(0, 0); }
  33% { transform: translate(0.4px, -0.5px); }
  66% { transform: translate(-0.3px, 0.4px); }
  100% { transform: translate(0, 0); }
}
@keyframes dsp-grain {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-7%, 4%); }
  40% { transform: translate(5%, -6%); }
  60% { transform: translate(-3%, -9%); }
  80% { transform: translate(8%, 3%); }
  100% { transform: translate(-5%, 7%); }
}
@keyframes dsp-flicker { 0% { opacity: 0.035; } 50% { opacity: 0; } 100% { opacity: 0.02; } }
@keyframes dsp-scratch {
  0% { left: 18%; opacity: 0; }
  12% { left: 71%; opacity: 0.12; }
  14% { opacity: 0; }
  46% { left: 33%; opacity: 0.08; }
  48% { opacity: 0; }
  80% { left: 86%; opacity: 0.1; }
  82% { opacity: 0; }
}
@keyframes dsp-boot {
  0% { opacity: 1; }
  20% { opacity: 0.55; }
  30% { opacity: 0.95; }
  45% { opacity: 0.3; }
  55% { opacity: 0.7; }
  70% { opacity: 0.1; }
  80% { opacity: 0.35; }
  100% { opacity: 0; }
}
@keyframes dsp-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes dsp-verse { from { opacity: 0; letter-spacing: 0.4em; } to { opacity: 0.7; letter-spacing: 0.9em; } }
@keyframes dsp-letter { to { opacity: 1; filter: blur(0); transform: none; } }
@keyframes dsp-out { to { opacity: 0; filter: blur(6px); transform: translateY(-0.4em); } }
@keyframes dsp-rule { to { transform: scaleX(1); } }
@keyframes dsp-hint { to { opacity: 0.55; } }

@media (max-width: 720px) {
  .dsp-nav, .dsp-verse { display: none; }
  .dsp-cta { padding: 12px 16px; letter-spacing: 0.3em; }
}

@media (prefers-reduced-motion: reduce) {
  .dsp-root { --dsp-par: 0px; }
  .dsp-rings .dsp-spin, .dsp-rings .dsp-scale, .dsp-face .dsp-spin, .dsp-dragon .dsp-turn, .dsp-hand .dsp-bob, .dsp-sun { animation: none; }
  .dsp-weave, .dsp-grain, .dsp-flicker, .dsp-scratch { animation: none; }
  .dsp-root[data-phase="boot"] .dsp-weave, .dsp-root[data-phase="load"] .dsp-weave { animation: none; }
  .dsp-scratch, .dsp-flash { display: none; }
  .dsp-draw { stroke-dasharray: none; stroke-dashoffset: 0; opacity: 0; transition: opacity 0.8s ease; }
  .dsp-root[data-phase="summon"] .dsp-draw { animation: none; opacity: 1; }
  .dsp-root[data-phase="landing"] .dsp-draw { opacity: 1; }
  .dsp-hand .dsp-rise { transform: none; transition: opacity 0.8s ease; }
  .dsp-seal .dsp-in { animation: dsp-in 0.6s ease forwards; transform: none; filter: none; }
  .dsp-root[data-phase="summon"] .dsp-seal .dsp-thud { animation: none; }
  .dsp-credit[data-state="in"] .dsp-ch { filter: none; transform: none; animation: dsp-in 0.5s ease forwards; }
  .dsp-root[data-phase="landing"] .dsp-eye { animation: none; }
}
`,_t=1100,Ot=3700,Xt=750,Bs=24;function at({hand:n,uid:e,id:a,y:t}){return s.jsxs("g",{transform:"translate(0 "+t+")",children:[s.jsxs("defs",{children:[s.jsxs("linearGradient",{id:e+a+"g",x1:"-70",y1:"0",x2:"70",y2:"40",gradientUnits:"userSpaceOnUse",children:[s.jsx("stop",{offset:"0.3",stopColor:"#000"}),s.jsx("stop",{offset:"1",stopColor:"#fff"})]}),s.jsx("mask",{id:e+a+"m",maskUnits:"userSpaceOnUse",x:"-120",y:"-280",width:"240",height:"560",children:s.jsx("rect",{x:"-120",y:"-280",width:"240",height:"560",fill:"url(#"+e+a+"g)"})})]}),n.shapes.map((r,o)=>s.jsxs(g.Fragment,{children:[s.jsx("path",{d:r.fill,fill:"var(--dsp-paper)"}),s.jsx("path",{d:r.line,fill:"none",stroke:"var(--dsp-shade)",strokeWidth:"1.7",strokeLinejoin:"round"})]},o)),s.jsx("g",{mask:"url(#"+e+a+"m)",children:n.shapes.map((r,o)=>s.jsx("path",{d:r.fill,fill:"url(#"+e+"hatch)"},o))}),s.jsx("path",{d:n.lines,fill:"none",stroke:"var(--dsp-shade)",strokeWidth:"1.15",strokeLinecap:"round"})]})}const Zt=g.memo(function({uid:e,maskRef:a,sparkRef:t}){const r=Fs().rings;return s.jsxs("div",{className:"dsp-layer dsp-rings",style:{"--d":.35},children:[s.jsx("div",{className:"dsp-scale",children:s.jsx("svg",{viewBox:"-500 -500 1000 1000","aria-hidden":"true",children:s.jsx("path",{d:r.scale,fill:"none",stroke:"var(--dsp-ink)",strokeWidth:"1",opacity:"0.22"})})}),s.jsx("div",{className:"dsp-spin",children:s.jsxs("svg",{viewBox:"-500 -500 1000 1000","aria-hidden":"true",children:[s.jsx("defs",{children:s.jsx("mask",{id:e+"reveal",maskUnits:"userSpaceOnUse",x:"-1000",y:"-1000",width:"2000",height:"2000",children:s.jsx("circle",{ref:a,r:"750",fill:"none",stroke:"#fff",strokeWidth:"170",pathLength:1,strokeDasharray:"1 2",strokeDashoffset:"1",transform:"rotate(-90)"})})}),s.jsx("g",{mask:"url(#"+e+"reveal)",fill:"none",stroke:"var(--dsp-ink)",strokeLinecap:"round",strokeLinejoin:"round",children:s.jsxs("g",{className:"dsp-lace",children:[s.jsx("path",{d:r.lace,strokeWidth:"1.6"}),s.jsx("path",{d:r.rules,strokeWidth:"1.4"}),s.jsx("path",{d:r.dots,strokeWidth:"2.6",strokeDasharray:"0 7"}),s.jsx("path",{d:r.stipple,strokeWidth:"2.1",opacity:"0.6"})]})}),s.jsxs("g",{ref:t,className:"dsp-spark",children:[s.jsx("path",{d:"M0 -680V-820",stroke:"var(--dsp-glow)",strokeWidth:"2",opacity:"0.8"}),s.jsx("circle",{cy:"-750",r:"7",fill:"var(--dsp-glow)"}),s.jsx("circle",{cy:"-750",r:"22",fill:"var(--dsp-glow)",opacity:"0.18"})]})]})})]})}),qt=g.memo(function(){const e=Fs().dragon,a={fill:"none",stroke:"var(--dsp-ink)",strokeLinecap:"round",strokeLinejoin:"round",pathLength:1},t=(r,o)=>({"--dl":r+"s","--du":o+"s"});return s.jsx("div",{className:"dsp-layer dsp-dragon",style:{"--d":.8},children:s.jsx("div",{className:"dsp-turn",children:s.jsxs("svg",{viewBox:"-500 -500 1000 1000","aria-hidden":"true",children:[s.jsx("path",{className:"dsp-draw",d:e.clouds,...a,strokeWidth:"1.5",opacity:"0.85",style:t(.2,2.6)}),s.jsx("path",{className:"dsp-fade",d:e.bodyFill,fill:"var(--dsp-face)",style:t(.5,0)}),s.jsx("path",{className:"dsp-fade",d:e.tailFill,fill:"var(--dsp-face)",style:t(.4,0)}),s.jsx("path",{className:"dsp-draw",d:e.tailLine,...a,strokeWidth:"1.5",style:t(0,1.2)}),s.jsx("path",{className:"dsp-draw",d:e.outline,...a,strokeWidth:"2.1",style:t(0,2.2)}),s.jsx("path",{className:"dsp-draw",d:e.scales,...a,strokeWidth:"1.25",style:t(.25,2.4)}),s.jsx("path",{className:"dsp-draw",d:e.belly,...a,strokeWidth:"1.1",style:t(.35,2.2)}),s.jsx("path",{className:"dsp-draw",d:e.fins,...a,strokeWidth:"1.35",style:t(.3,2.3)}),s.jsx("path",{className:"dsp-fade",d:e.legFill,fill:"var(--dsp-face)",style:t(1,0)}),s.jsx("path",{className:"dsp-draw",d:e.legLine,...a,strokeWidth:"1.5",style:t(1,1.6)}),s.jsx("path",{className:"dsp-fade",d:e.head.maneFill,fill:"var(--dsp-face)",style:t(1.5,0)}),s.jsx("path",{className:"dsp-draw",d:e.head.maneLine,...a,strokeWidth:"1.5",style:t(1.7,1.5)}),s.jsx("path",{className:"dsp-fade",d:e.head.fill,fill:"var(--dsp-face)",style:t(1.4,0)}),s.jsx("path",{className:"dsp-draw",d:e.head.line,...a,strokeWidth:"1.8",style:t(1.5,1.6)}),s.jsx("circle",{className:"dsp-eye",cx:e.head.eye[0],cy:e.head.eye[1],r:"5.4",fill:"var(--dsp-glow)"})]})})})}),Yt=g.memo(function({uid:e}){const a=Fs();return s.jsxs(s.Fragment,{children:[s.jsx("svg",{width:"0",height:"0",style:{position:"absolute"},"aria-hidden":"true",children:s.jsx("defs",{children:s.jsx("pattern",{id:e+"hatch",width:"4",height:"4",patternUnits:"userSpaceOnUse",patternTransform:"rotate(-35)",children:s.jsx("path",{d:"M0 0.5H4",stroke:"var(--dsp-shade)",strokeWidth:"0.9"})})})}),s.jsx("div",{className:"dsp-layer dsp-hand",style:{"--d":1.25,"--dir":1,"--dl":"0.35s","--bd":"0s"},children:s.jsx("div",{className:"dsp-rise",children:s.jsx("div",{className:"dsp-bob",children:s.jsx("svg",{viewBox:"-500 -500 1000 1000","aria-hidden":"true",children:s.jsx(at,{hand:a.raised,uid:e,id:"r",y:-168})})})})}),s.jsx("div",{className:"dsp-layer dsp-hand",style:{"--d":1.25,"--dir":-1,"--dl":"0.6s","--bd":"-3s"},children:s.jsx("div",{className:"dsp-rise",children:s.jsx("div",{className:"dsp-bob",children:s.jsx("svg",{viewBox:"-500 -500 1000 1000","aria-hidden":"true",children:s.jsx(at,{hand:a.open,uid:e,id:"o",y:168})})})})})]})}),Kt=g.memo(function({count:e,trigramRefs:a}){const t=Fs().seal,r=360/Math.max(1,e);return s.jsx("div",{className:"dsp-seal",children:s.jsx("div",{className:"dsp-thud",children:s.jsxs("div",{className:"dsp-in",children:[s.jsx("div",{className:"dsp-layer dsp-face",style:{"--d":.6},children:s.jsx("div",{className:"dsp-spin",children:s.jsx("div",{className:"dsp-turn",children:s.jsxs("svg",{viewBox:"-500 -500 1000 1000","aria-hidden":"true",children:[s.jsx("circle",{r:"200",fill:"var(--dsp-face)"}),s.jsxs("g",{fill:"none",stroke:"var(--dsp-ink)",strokeLinecap:"round",strokeLinejoin:"round",children:[s.jsx("path",{d:t.face,strokeWidth:"1.3"}),s.jsx("path",{d:t.faceDots,strokeWidth:"2.2",strokeDasharray:"0 5"}),s.jsx("path",{d:t.lattice,strokeWidth:"0.9",opacity:"0.55"}),s.jsx("path",{d:t.fine,strokeWidth:"0.9",opacity:"0.7"})]})]})})})}),s.jsx("div",{className:"dsp-layer dsp-band",style:{"--d":.6},children:s.jsx("div",{className:"dsp-turn",children:s.jsxs("svg",{viewBox:"-500 -500 1000 1000","aria-hidden":"true",children:[s.jsx("path",{d:L(176)+L(150),fill:"var(--dsp-face)",fillRule:"evenodd"}),s.jsxs("g",{fill:"none",stroke:"var(--dsp-ink)",strokeLinecap:"round",children:[s.jsx("path",{d:t.band,strokeWidth:"1.2"}),s.jsx("path",{d:t.bandDots,strokeWidth:"2",strokeDasharray:"0 6"}),t.trigrams.map((o,i)=>s.jsx("path",{ref:l=>{a.current[i]=l},className:"dsp-tri",d:o,strokeWidth:"3.2"},i))]})]})})}),s.jsx("div",{className:"dsp-layer dsp-rim",style:{"--d":.6},children:s.jsx("div",{className:"dsp-turn",children:s.jsxs("svg",{viewBox:"-500 -500 1000 1000","aria-hidden":"true",children:[s.jsx("path",{d:L(200)+L(176),fill:"var(--dsp-paper)",fillRule:"evenodd"}),s.jsx("path",{d:t.rimLines,fill:"none",stroke:"var(--dsp-shade)",strokeWidth:"1.1"}),s.jsx("g",{fill:"var(--dsp-shade)",fontFamily:"var(--dsp-cjk)",fontSize:"11",textAnchor:"middle",dominantBaseline:"central",children:Array.from(Mt).map((o,i)=>s.jsx("text",{transform:"rotate("+(i*30+15)+") translate(0 -182.5)",children:o},i))}),Array.from({length:e},(o,i)=>s.jsx("path",{d:"M-5 -201L0 -209L5 -201Z",fill:"var(--dsp-seal)",transform:"rotate("+(-90-i*r)+")"},i))]})})}),s.jsx("div",{className:"dsp-layer dsp-needle",style:{"--d":.7},children:s.jsx("div",{className:"dsp-turn",children:s.jsx("svg",{viewBox:"-500 -500 1000 1000","aria-hidden":"true",children:s.jsx("path",{d:t.needle,fill:"none",stroke:"var(--dsp-ink)",strokeWidth:"1.2",strokeLinejoin:"round",opacity:"0.75"})})})}),s.jsx("div",{className:"dsp-layer dsp-core",style:{"--d":.7},children:s.jsx("svg",{viewBox:"-500 -500 1000 1000","aria-hidden":"true",children:s.jsxs("g",{className:"dsp-sun",children:[s.jsx("circle",{r:"30",fill:"var(--dsp-glow)",opacity:"0.12"}),s.jsx("path",{d:t.rays,fill:"none",stroke:"var(--dsp-ink)",strokeWidth:"1.3",strokeLinecap:"round"}),s.jsx("circle",{r:"7.5",fill:"var(--dsp-ink)"})]})})}),s.jsx("div",{className:"dsp-layer",style:{"--d":.6},children:s.jsxs("svg",{viewBox:"-500 -500 1000 1000","aria-hidden":"true",children:[s.jsx("path",{d:"M-226 0L-214 -7V7Z",fill:"var(--dsp-seal)"}),s.jsx("path",{d:L(214),fill:"none",stroke:"var(--dsp-ink)",strokeWidth:"1.4",strokeDasharray:"0 6",strokeLinecap:"round",opacity:"0.6"})]})})]})})})});function Ds({text:n,delay:e,step:a}){let t=0;return s.jsx(s.Fragment,{children:n.split(" ").map((r,o)=>s.jsxs(g.Fragment,{children:[o>0?" ":null,s.jsx("span",{className:"dsp-word",children:Array.from(r).map((i,l)=>s.jsx("span",{className:"dsp-ch",style:{animationDelay:(e+t++*a).toFixed(3)+"s"},children:i},l))})]},o))})}function nt({credit:n,state:e}){const a=Array.from(n.roles).length;return s.jsxs("div",{className:"dsp-credit","data-state":e,"aria-hidden":e==="out",children:[s.jsx("span",{className:"dsp-rule"}),s.jsx("p",{className:"dsp-roles",children:s.jsx(Ds,{text:n.roles,delay:.05,step:.028})}),s.jsx("p",{className:"dsp-name",children:s.jsx(Ds,{text:n.name,delay:.2+a*.012,step:.12})}),n.rolesLatin?s.jsx("p",{className:"dsp-roles-latin",children:s.jsx(Ds,{text:n.rolesLatin,delay:.5,step:.008})}):null,n.nameLatin?s.jsx("p",{className:"dsp-name-latin",children:s.jsx(Ds,{text:n.nameLatin,delay:.65,step:.04})}):null]})}function rt({link:n,className:e,onClick:a,children:t}){return n.href?s.jsx("a",{className:"dsp-btn "+e,href:n.href,onClick:a,children:t??n.label}):s.jsx("button",{type:"button",className:"dsp-btn "+e,onClick:a,children:t??n.label})}const ot=({flip:n})=>s.jsx("svg",{viewBox:"0 0 12 12","aria-hidden":"true",style:n?{transform:"scaleX(-1)"}:void 0,children:s.jsx("path",{d:"M2 6H10M6.5 2.5L10 6L6.5 9.5",fill:"none",stroke:"currentColor",strokeWidth:"1.1"})});function Gt({progress:n,durationMs:e=4600,skipIntro:a=!1,brand:t="天枢",brandLatin:r="Tianshu",nav:o=yt,credits:i=vt,verse:l="云起龙骧 · 星移斗转",cta:c={label:"Enter"},onEnter:m,onLoaded:x,autoAdvanceMs:b=6500,tone:f="sepia",palette:M,fontFamily:D=bt,height:R="100svh",className:V=""}){const[k,B]=g.useState(a?"landing":"boot"),[us,Ns]=g.useState(a?100:0),[ys,bs]=g.useState(0),[p,u]=g.useState(null),[v,P]=g.useState(0),[S,C]=g.useState(!1),[A,U]=g.useState(0),[is,X]=g.useState(!1),[K,Ss]=g.useState(null),[ds,$]=g.useState({s:800,tall:!1}),ls="dsp"+g.useId().replace(/[^a-zA-Z0-9_-]/g,""),F=g.useRef(null),_=g.useRef(null),ss=g.useRef(null),ms=g.useRef(null),Z=g.useRef([]),xs=g.useRef(null),ps=g.useRef(!1),Ls=g.useRef(0),gs=g.useRef({cur:0,target:0,vel:0,drag:!1,last:0,moved:0,speed:0}),q=g.useRef(0),Os=g.useRef(n);Os.current=n;const Ps=g.useRef(x);Ps.current=x;const E={...gt[f],...M},ts=f==="paper",T=Math.max(1,i.length),vs=Math.min(ys,T-1),es=i[vs],Xs=Qs(us/100);g.useEffect(()=>{try{Ss({paper:et(Bt(!ts)),grain:et(Ut())})}catch{}},[ts]),g.useEffect(()=>{const d=F.current;if(!d)return;const h=()=>{const w=d.getBoundingClientRect();if(w.width<=0||w.height<=0)return;const W=w.width/w.height<.82,G=W?Math.min(w.height*.74,w.width*1.16):w.height*.97;$(J=>Math.abs(J.s-G)<1&&J.tall===W?J:{s:Math.round(G),tall:W})};if(h(),typeof ResizeObserver>"u")return;const j=new ResizeObserver(h);return j.observe(d),()=>j.disconnect()},[]),g.useEffect(()=>{const d=F.current;if(!d)return;const h=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let j=0,w=0,W=0,G=-90,J=-1;const cs=performance.now();Ls.current=cs;const H=as=>{const z=xs.current;let O=0,ks=0;if(z)O=z.x,ks=z.y;else if(!h){const js=(as-cs)/1e3;O=Math.sin(js*.33)*.35,ks=Math.sin(js*.21+1.3)*.25}w+=(O-w)*.06,W+=(ks-W)*.06,d.style.setProperty("--dsp-mx",w.toFixed(4)),d.style.setProperty("--dsp-my",W.toFixed(4));const hs=d.getBoundingClientRect(),xt=z?Math.atan2(z.y*hs.height*.5-(parseFloat(d.dataset.cy||"0.5")-.5)*hs.height,z.x*hs.width*.5)*180/Math.PI:G+(h?0:.06);G+=Vs(xt-G)*(z?.08:1),d.style.setProperty("--dsp-n",G.toFixed(2));const I=gs.current;if(I.drag||(h?(I.cur=I.target,I.vel=0):(I.vel=(I.vel+(I.target-I.cur)*.035)*.8,I.cur+=I.vel,Math.abs(I.target-I.cur)<.01&&Math.abs(I.vel)<.01&&(I.cur=I.target))),d.style.setProperty("--dsp-a",I.cur.toFixed(3)),ms.current){const js=Math.floor((as-cs)/1e3*Bs);js!==J&&(J=js,ms.current.textContent=St(as-cs,Bs))}j=requestAnimationFrame(H)};return j=requestAnimationFrame(H),()=>cancelAnimationFrame(j)},[]),g.useEffect(()=>{if(k!=="boot")return;const d=setTimeout(()=>B("load"),_t);return()=>clearTimeout(d)},[k,v]),g.useEffect(()=>{const d=F.current,h=H=>{d==null||d.style.setProperty("--dsp-p",H.toFixed(4)),_.current&&(_.current.style.strokeDashoffset=(1-H).toFixed(4)),ss.current&&ss.current.setAttribute("transform","rotate("+(H*360).toFixed(2)+")");const as=Qs(H);Z.current.forEach((z,O)=>{z&&(z.dataset.lit=O<as?"1":"0",z.dataset.hot=O===as-1&&H<1?"1":"0")})};if(k==="landing"||k==="summon"){h(1);return}if(k!=="load"){h(0);return}let j=0,w=0,W=performance.now();const G=W;let J=-1;const cs=H=>{const as=Math.min(64,H-W);W=H;const z=Os.current;let O=z!==void 0?it(z/100):wt((H-G)/Math.max(400,e));ps.current&&(O=1);const ks=ps.current?.12:z!==void 0?.1:1;w+=(O-w)*Math.min(1,ks*(as/16.7)),O-w<.002&&(w=O),h(w);const hs=Math.round(w*100);if(hs!==J&&(J=hs,Ns(hs)),w>=1){B("summon");return}j=requestAnimationFrame(cs)};return h(0),j=requestAnimationFrame(cs),()=>cancelAnimationFrame(j)},[k,v,e]),g.useEffect(()=>{if(k!=="summon")return;const d=setTimeout(()=>B("landing"),Ot);return()=>clearTimeout(d)},[k]),g.useEffect(()=>{var d;k==="landing"&&((d=Ps.current)==null||d.call(Ps))},[k,v]);const As=d=>{const h=q.current;d!==h&&(q.current=d,u(h),bs(d))},Q=(d,h)=>{const j=(d%T+T)%T,w=h??Nt(q.current,j,T);if(!w)return;const W=gs.current;W.target=Js(W.target,T)+w*Hs(T),As(j)},Zs=g.useRef(Q);Zs.current=Q,g.useEffect(()=>{if(k!=="landing"||b<=0||i.length<2)return;const d=setTimeout(()=>Zs.current(q.current+1,1),b);return()=>clearTimeout(d)},[k,vs,b,i.length]),g.useEffect(()=>{if(p===null)return;const d=setTimeout(()=>u(null),800);return()=>clearTimeout(d)},[p,ys]),g.useEffect(()=>{if(!A)return;const d=setTimeout(()=>U(0),1100);return()=>clearTimeout(d)},[A]),g.useEffect(()=>{if(!S)return;const d=setTimeout(()=>{const h=gs.current;h.cur=h.target=h.vel=0,ps.current=!1,q.current=0,Ns(0),bs(0),u(null),X(!1),B("boot"),P(j=>j+1),C(!1)},Xt);return()=>clearTimeout(d)},[S]);const Ts=()=>{k==="boot"||k==="load"?(k==="boot"&&B("load"),ps.current=!0):k==="summon"&&B("landing")},pt=d=>{const h=F.current;if(!h)return null;const j=h.getBoundingClientRect();return{x:(d.clientX-j.left)/j.width*2-1,y:(d.clientY-j.top)/j.height*2-1,r:j}},qs=d=>{const h=F.current;if(!h)return 0;const j=h.getBoundingClientRect(),w=j.left+j.width/2,W=j.top+j.height*(ds.tall?.42:.5);return Math.atan2(d.clientY-W,d.clientX-w)*180/Math.PI},ct=d=>{const h=pt(d);h&&d.pointerType!=="touch"&&(xs.current={x:h.x,y:h.y})},ht=()=>{xs.current=null},ft=d=>{var j,w;if(k!=="landing")return;(w=(j=d.currentTarget).setPointerCapture)==null||w.call(j,d.pointerId);const h=gs.current;h.drag=!0,h.last=qs(d),h.moved=0,h.speed=0,h.vel=0,X(!0)},ut=d=>{const h=gs.current;if(!h.drag)return;const j=qs(d),w=Vs(j-h.last);h.last=j,h.cur+=w,h.target=h.cur,h.moved+=Math.abs(w),h.speed=h.speed*.6+w*.4,h.moved>=3&&As(Gs(h.cur,T))},Ys=()=>{const d=gs.current;if(d.drag){if(d.drag=!1,d.moved<3){U(h=>h+1),Q(q.current+1,1);return}d.target=Js(d.cur+d.speed*5,T),As(Gs(d.target,T))}},mt=d=>{if(k!=="landing"){(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),Ts());return}d.key==="ArrowRight"||d.key==="ArrowDown"?(d.preventDefault(),X(!0),Q(q.current+1,1)):d.key==="ArrowLeft"||d.key==="ArrowUp"?(d.preventDefault(),X(!0),Q(q.current-1,-1)):d.key==="Home"?(d.preventDefault(),Q(0)):d.key==="End"&&(d.preventDefault(),Q(T-1))},Rs=k==="boot"||k==="load",Ws=Xs>0?dt[Xs-1]:null,Ks=k==="summon"?"Summoning":"Unsealing";return s.jsxs("div",{ref:F,className:"dsp-root "+V,"data-phase":k,"data-tall":ds.tall,"data-touched":is,"data-pulse":A?1:0,"data-cy":ds.tall?.42:.5,style:{height:R,"--dsp-s":ds.s+"px","--dsp-cy":ds.tall?"42%":"50%","--dsp-mx":0,"--dsp-my":0,"--dsp-p":a?1:0,"--dsp-a":0,"--dsp-n":-90,"--dsp-stage":E.stage,"--dsp-face":E.face,"--dsp-ink":E.ink,"--dsp-paper":E.paper,"--dsp-shade":E.shade,"--dsp-glow":E.glow,"--dsp-seal":E.seal,"--dsp-text":E.text,"--dsp-chop-ink":Et(E.seal)?E.face:ts?E.paper:E.text,"--dsp-lift":ts?"rgba(255, 250, 238, 0.7)":"color-mix(in srgb, "+E.glow+" 10%, transparent)","--dsp-vig":ts?"rgba(90, 60, 25, 0.38)":"rgba(0, 0, 0, 0.78)","--dsp-blend-paper":ts?"multiply":"soft-light","--dsp-paper-k":ts?.45:.9,"--dsp-blend-light":ts?"multiply":"screen","--dsp-cjk":D,"--dsp-latin":kt,"--dsp-mono":jt,"--dsp-paper-tex":(K==null?void 0:K.paper)??"none","--dsp-grain-tex":(K==null?void 0:K.grain)??"none"},onPointerMove:ct,onPointerLeave:ht,onClick:Rs||k==="summon"?Ts:void 0,onKeyDown:mt,children:[s.jsx("style",{children:Ht}),s.jsxs("div",{className:"dsp-shell",children:[s.jsx("div",{className:"dsp-backdrop"}),s.jsx("div",{className:"dsp-paper"}),s.jsx("div",{className:"dsp-glow"}),s.jsx("div",{className:"dsp-weave",children:s.jsxs("div",{className:"dsp-emblem",children:[s.jsx(Zt,{uid:ls,maskRef:_,sparkRef:ss}),s.jsx(qt,{}),s.jsx(Yt,{uid:ls}),s.jsx(Kt,{count:T,trigramRefs:Z}),s.jsx("div",{className:"dsp-dial",role:"slider",tabIndex:k==="landing"?0:-1,"aria-label":"Turn the seal to change the credit","aria-valuemin":1,"aria-valuemax":T,"aria-valuenow":vs+1,"aria-valuetext":es?es.name+(es.nameLatin?" ("+es.nameLatin+")":"")+", "+(es.rolesLatin||es.roles):void 0,onPointerDown:ft,onPointerMove:ut,onPointerUp:Ys,onPointerCancel:Ys})]})},v),s.jsx("div",{className:"dsp-flash"},"f"+A),s.jsx("div",{className:"dsp-vignette"}),s.jsx("div",{className:"dsp-grain"}),s.jsx("div",{className:"dsp-flicker"}),s.jsx("i",{className:"dsp-scratch"}),s.jsx("i",{className:"dsp-scratch"}),s.jsxs("div",{className:"dsp-ui",children:[s.jsx("div",{className:"dsp-top",children:k==="landing"?s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"dsp-brand",children:[s.jsx("button",{type:"button",className:"dsp-btn dsp-chop",title:"Replay the opening","aria-label":t+" — replay the opening","data-many":Array.from(t).length>2,onClick:()=>C(!0),children:Array.from(t).slice(0,4).map((d,h)=>s.jsx("span",{children:d},h))}),s.jsx("span",{className:"dsp-brand-latin",children:r})]}),o.length?s.jsx("nav",{className:"dsp-nav","aria-label":r||t,children:o.map((d,h)=>s.jsx(rt,{link:d,className:""},h))}):null]}):s.jsxs(s.Fragment,{children:[s.jsxs("span",{className:"dsp-tc","aria-hidden":"true",children:[s.jsx("b",{children:"●"})," R",String(v+1).padStart(2,"0")," · ",s.jsx("span",{ref:ms,children:"00:00:00:00"})]}),s.jsxs("span",{className:"dsp-tc","aria-hidden":"true",children:[Bs," fps · ",Ks]})]})}),l?s.jsx("p",{className:"dsp-verse","aria-hidden":k!=="landing",children:l}):null,s.jsxs("div",{className:"dsp-readout",role:"progressbar",tabIndex:Rs?0:-1,"aria-label":r||t,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":us,"aria-valuetext":Rs?us+"%":"Loaded","aria-hidden":!Rs,children:[s.jsxs("span",{className:"dsp-kicker",children:["启封 ",s.jsxs("small",{children:["· ",Ks]})]}),s.jsxs("span",{className:"dsp-count",children:[String(us).padStart(3,"0"),s.jsx("small",{children:"%"})]}),s.jsx("span",{className:"dsp-gua",children:Ws?s.jsxs(s.Fragment,{children:[s.jsx("b",{children:Ws.han}),Ws.name]}):" "}),s.jsxs("span",{className:"dsp-track",children:[s.jsx("i",{}),Array.from({length:9},(d,h)=>s.jsx("s",{style:{left:h/8*100+"%"}},h))]})]}),k==="landing"&&es?s.jsxs("div",{className:"dsp-credits","aria-live":"polite",children:[p!==null&&p!==vs&&i[p]?s.jsx(nt,{credit:i[p],state:"out"},"o"+p+"-"+ys):null,s.jsx(nt,{credit:es,state:"in"},"i"+vs+"-"+v)]}):null,k==="landing"?s.jsxs("div",{className:"dsp-controls",children:[T>1?s.jsxs("div",{className:"dsp-index",children:[s.jsx("button",{type:"button",className:"dsp-btn dsp-arrow","aria-label":"Previous credit",onClick:()=>{X(!0),Q(q.current-1,-1)},children:s.jsx(ot,{flip:!0})}),s.jsxs("span",{"aria-hidden":"true",children:[s.jsx("b",{children:String(vs+1).padStart(2,"0")})," / ",String(T).padStart(2,"0")]}),s.jsx("button",{type:"button",className:"dsp-btn dsp-arrow","aria-label":"Next credit",onClick:()=>{X(!0),Q(q.current+1,1)},children:s.jsx(ot,{})})]}):null,s.jsxs(rt,{link:c,className:"dsp-cta",onClick:m,children:[s.jsx("span",{children:c.label}),s.jsx("svg",{viewBox:"0 0 18 10","aria-hidden":"true",children:s.jsx("path",{d:"M0 5H16M12 1L16 5L12 9",fill:"none",stroke:"currentColor",strokeWidth:"1.1"})})]})]}):s.jsx("button",{type:"button",className:"dsp-btn dsp-skip",onClick:d=>(d.stopPropagation(),Ts()),children:"Skip"}),k==="landing"&&T>1?s.jsx("span",{className:"dsp-hint","aria-hidden":"true",children:"转动印盘 · Drag the seal"}):null]}),s.jsx("div",{className:"dsp-boot"}),s.jsx("div",{className:"dsp-veil","data-on":S})]})]})}export{Gt as D};
