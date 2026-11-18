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

var items=[["Work","#work"],["CodeKootu","#codekootu"],["Path","#path"],["Beyond code","#beyond"],["Credentials","#creds"],["Contact","#contact"],["GitHub","https://github.com/noelvmathews"],["LinkedIn","https://www.linkedin.com/in/noelvmathews/"],["Codeforces","https://codeforces.com/profile/noelvmathews"],["Download PDF","#print"],["Switch theme","#theme"]];
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
