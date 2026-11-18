(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var root=document.documentElement,th=$("#th");
function label(){th.textContent=root.dataset.theme==="warm"?"Dark":"Warm"}
label();
th.onclick=function(){root.dataset.theme=root.dataset.theme==="warm"?"dark":"warm";try{localStorage.setItem("theme",root.dataset.theme)}catch(e){}label()};

var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
$$(".rv").forEach(function(el){io.observe(el)});

var f="all",rows=$$(".row"),q=$("#q");
function filter(){var s=q.value.toLowerCase(),n=0;rows.forEach(function(r){var ok=(f==="all"||r.dataset.t.indexOf(f)>-1)&&r.textContent.toLowerCase().indexOf(s)>-1;r.classList.toggle("hide",!ok);if(ok)n++});$("#none").style.display=n?"none":"block"}
q.oninput=filter;
$$(".chip").forEach(function(c){c.onclick=function(){$$(".chip").forEach(function(x){x.classList.remove("on")});c.classList.add("on");f=c.dataset.f;filter()}});
rows.forEach(function(r){r.addEventListener("mousemove",function(e){var b=r.getBoundingClientRect();r.style.setProperty("--x",e.clientX-b.left+"px");r.style.setProperty("--y",e.clientY-b.top+"px")})});

var items=[["Work","#work"],["Toolkit","#toolkit"],["CodeKootu","#codekootu"],["Path","#path"],["Beyond code","#beyond"],["Credentials","#creds"],["Contact","#contact"],["CodeKootu site","https://www.codekootu.codes"],["GitHub","https://github.com/noelvmathews"],["LinkedIn","https://www.linkedin.com/in/noelvmathews/"],["Codeforces","https://codeforces.com/profile/noelvmathews"],["Download PDF","#print"],["Switch theme","#theme"]];
var pal=$("#pal"),pi=$("#pi"),pl=$("#pl"),sel=0;
function draw(){var s=pi.value.toLowerCase(),m=items.filter(function(i){return i[0].toLowerCase().indexOf(s)>-1});sel=0;pl.innerHTML=m.map(function(i,k){return'<a href="'+i[1]+'"'+(k?"":' class="sel"')+'>'+i[0]+"</a>"}).join("")}
function open(){pal.classList.add("on");pi.value="";draw();pi.focus()}
function close(){pal.classList.remove("on")}
function go(a){if(!a)return;var h=a.getAttribute("href");close();if(h==="#print")print();else if(h==="#theme")th.click();else if(h[0]==="#")location.hash=h;else window.open(h,"_blank")}
$("#kb").onclick=open;pi.oninput=draw;
pal.onclick=function(e){if(e.target===pal)close();var a=e.target.closest("a");if(a){e.preventDefault();go(a)}};
document.addEventListener("keydown",function(e){
if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();pal.classList.contains("on")?close():open();return}
if(!pal.classList.contains("on"))return;
var a=$$("a",pl);
if(e.key==="Escape")close();
if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();sel=(sel+(e.key==="ArrowDown"?1:a.length-1))%a.length;a.forEach(function(x,i){x.classList.toggle("sel",i===sel)})}
if(e.key==="Enter"){e.preventDefault();go(a[sel])}
});
})();
(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return[].slice.call(document.querySelectorAll(s))};
var pg=$("#pg"),cur=$("#cur");
addEventListener("scroll",function(){var h=document.documentElement;pg.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%"},{passive:true});
addEventListener("mousemove",function(e){cur.style.transform="translate("+e.clientX+"px,"+e.clientY+"px)"});
$$(".btn,nav button,.big").forEach(function(b){b.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+(e.clientX-r.left-r.width/2)*.25+"px,"+(e.clientY-r.top-r.height/2)*.35+"px)"});b.addEventListener("mouseleave",function(){b.style.transform=""})});
var ph=$(".phw");if(ph){ph.addEventListener("mousemove",function(e){var r=ph.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;ph.style.transform="perspective(600px) rotateY("+x*18+"deg) rotateX("+-y*18+"deg)"});ph.addEventListener("mouseleave",function(){ph.style.transform="";ph.style.transition="transform .6s"});ph.addEventListener("mouseenter",function(){ph.style.transition="none"})}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);var m=e.target.textContent.match(/^([\d.]+)(.*)$/);if(!m)return;var end=parseFloat(m[1]),d=(m[1].split(".")[1]||"").length,t0=performance.now();(function f(t){var k=Math.min((t-t0)/1600,1),v=end*(1-Math.pow(1-k,4));e.target.textContent=v.toFixed(d)+m[2];if(k<1)requestAnimationFrame(f)})(t0)})},{threshold:.6});
$$(".nums b").forEach(function(b){io.observe(b)});
var W=["backend systems.","secure networks.","machine learning models.","things that fly and drive."],wi=0,ci=0,del=false,tw=$("#tw");
(function tick(){var w=W[wi];ci+=del?-1:1;tw.textContent=w.slice(0,ci);var t=del?35:70;if(!del&&ci===w.length){del=true;t=1600}else if(del&&ci===0){del=false;wi=(wi+1)%W.length;t=350}setTimeout(tick,t)})();
var T=["Python","Go","Backend systems","Cybersecurity","Machine learning","Embedded systems","Cinematography","Aviation","Automotive","Leadership"],h="";for(var i=0;i<2;i++)T.forEach(function(x){h+="<span>"+x+"</span>"});$("#mqi").innerHTML=h;
})();
(function(){
var $=function(s){return document.querySelector(s)},it=$("#intro"),B=document.body,go=false;
function done(){B.classList.add("ready");it.classList.add("out");setTimeout(function(){it.classList.add("gone")},1200);try{sessionStorage.setItem("seen","1")}catch(e){}}
function fin(){if(go)return;go=true;done()}
var seen;try{seen=sessionStorage.getItem("seen")}catch(e){}
if(seen){it.classList.add("gone");B.classList.add("ready")}else{
var L=["Warming the workbench","Compiling projects","Wiring the network","Polishing the pixels","Ready"],bar=$("#ibar"),il=$("#il"),pc=$("#pc"),t0=performance.now(),D=3000;
it.onclick=fin;$("#iskip").onclick=function(e){e.stopPropagation();fin()};
(function f(t){if(go)return;var k=Math.min((t-t0)/D,1),e=1-Math.pow(1-k,2.2);bar.style.transform="scaleX("+e+")";pc.textContent=Math.round(e*100)+"%";il.textContent=L[Math.min(L.length-1,Math.floor(e*L.length))];if(k<1)requestAnimationFrame(f);else setTimeout(fin,500)})(t0);}
var m={top:0,work:1,codekootu:2,path:3,contact:4},d=[].slice.call(document.querySelectorAll(".dock a"));
var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&m[e.target.id]!==undefined){d.forEach(function(a,i){a.classList.toggle("on",i===m[e.target.id])})}})},{rootMargin:"-45% 0px -50% 0px"});
["top","work","codekootu","path","contact"].forEach(function(i){var e=document.getElementById(i);if(e)o.observe(e)});
})();

document.querySelectorAll('a[href^="http"]').forEach(function(a){a.target="_blank";a.rel="noopener"});
