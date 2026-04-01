// LOADER
(function(){
  var loader=document.getElementById("loader"),loaderBar=document.getElementById("loaderBar"),loaderPct=document.getElementById("loaderPct"),p=0;
  var iv=setInterval(function(){
    p+=Math.random()*3+1;if(p>100)p=100;
    loaderBar.style.width=p+"%";loaderPct.textContent=Math.floor(p)+"%";
    if(p>=100){clearInterval(iv);setTimeout(function(){loader.classList.add("hide")},400)}
  },30);
})();

// CURSOR
(function(){
  var dot=document.getElementById("cursorDot"),ring=document.getElementById("cursorRing");
  var mx=0,my=0,rx=0,ry=0;
  document.addEventListener("mousemove",function(e){
    mx=e.clientX;my=e.clientY;
    dot.style.left=mx+"px";dot.style.top=my+"px";
  });
  function loop(){
    rx+=(mx-rx)*.15;ry+=(my-ry)*.15;
    ring.style.left=rx+"px";ring.style.top=ry+"px";
    requestAnimationFrame(loop);
  }
  loop();
  var hoverEls=document.querySelectorAll("a,button,input,textarea,.project-card,.tech-badge,.stat");
  hoverEls.forEach(function(el){
    el.addEventListener("mouseenter",function(){dot.classList.add("hover");ring.classList.add("hover")});
    el.addEventListener("mouseleave",function(){dot.classList.remove("hover");ring.classList.remove("hover")});
  });
  if("ontouchstart" in window){dot.style.display="none";ring.style.display="none";document.body.style.cursor="auto"}
})();

// PARTICLES
(function(){
  var c=document.getElementById("particleCanvas"),ctx=c.getContext("2d");
  function resize(){c.width=c.offsetWidth;c.height=c.offsetHeight}
  resize();window.addEventListener("resize",resize);
  var count=window.innerWidth<768?30:80,pts=[];
  for(var i=0;i<count;i++)pts.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.5+.5});
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    for(var i=0;i<pts.length;i++){
      var p=pts[i];p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>c.width)p.vx*=-1;
      if(p.y<0||p.y>c.height)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(0,212,255,.4)";ctx.fill();
      for(var j=i+1;j<pts.length;j++){
        var q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle="rgba(0,212,255,"+((1-d/120)*.15)+")";ctx.stroke()}
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// TYPING
(function(){
  var words=["Frontend Developer.","UI Craftsman.","Problem Solver.","Available for Hire."];
  var el=document.getElementById("typingText"),wi=0,ci=0,del=false;
  function step(){
    var w=words[wi];
    if(!del){el.textContent=w.substring(0,ci+1);ci++;if(ci===w.length){del=true;setTimeout(step,1800);return}setTimeout(step,80+Math.random()*40)}
    else{el.textContent=w.substring(0,ci-1);ci--;if(ci===0){del=false;wi=(wi+1)%words.length;setTimeout(step,400);return}setTimeout(step,40)}
  }
  step();
})();

// SCROLL
window.addEventListener("scroll",function(){
  var h=document.documentElement.scrollHeight-window.innerHeight;
  var bar=document.getElementById("scrollProgress");
  if(bar)bar.style.width=(window.scrollY/h*100)+"%";
  var nav=document.getElementById("navbar");
  if(nav)nav.classList.toggle("scrolled",window.scrollY>50);
  var sections=document.querySelectorAll("section[id]");
  var links=document.querySelectorAll(".nav-links a");
  var y=window.scrollY+200;
  sections.forEach(function(s){
    var top=s.offsetTop,h2=s.offsetHeight,id=s.getAttribute("id");
    if(y>=top&&y<top+h2)links.forEach(function(l){l.classList.toggle("active",l.getAttribute("href")==="#"+id)});
  });
});

// HAMBURGER
(function(){
  var btn=document.getElementById("hamburger"),menu=document.getElementById("mobileMenu");
  btn.addEventListener("click",function(){btn.classList.toggle("open");menu.classList.toggle("open")});
  menu.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){btn.classList.remove("open");menu.classList.remove("open")})});
})();

// REVEAL
(function(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}});
  },{threshold:0.15});
  document.querySelectorAll(".reveal").forEach(function(el){obs.observe(el)});
})();

// COUNTERS
(function(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var el=e.target,target=+(el.dataset.target||0),dur=1500,start=performance.now();
        function s(now){var prog=Math.min((now-start)/dur,1);el.textContent=Math.floor(prog*target);if(prog<1)requestAnimationFrame(s);else el.textContent=target}
        requestAnimationFrame(s);obs.unobserve(el);
      }
    });
  },{threshold:0.5});
  document.querySelectorAll(".counter").forEach(function(el){obs.observe(el)});
})();

// SKILL BARS
(function(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.querySelectorAll(".skill-fill").forEach(function(bar){bar.style.width=bar.dataset.width+"%"});
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.2});
  var sg=document.getElementById("skillsGrid");
  if(sg)obs.observe(sg);
})();

// COPY EMAIL
document.getElementById("copyBtn").addEventListener("click",function(){
  var btn=this;
  navigator.clipboard.writeText("nasefabdo600@gmail.com").then(function(){
    btn.textContent="Copied!";setTimeout(function(){btn.textContent="Copy"},2000);
  });
});

// FORM
document.getElementById("contactForm").addEventListener("submit",function(e){
  e.preventDefault();
  var s=document.getElementById("formSuccess");
  s.classList.add("show");this.reset();
  setTimeout(function(){s.classList.remove("show")},4000);
});