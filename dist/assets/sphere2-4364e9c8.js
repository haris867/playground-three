import{S as m,T as l,a as i,M as g,b as r,e as u,D as p,G as f,P as M,c as S,W as b,O as x}from"./OrbitControls-a9f36f34.js";import{g as P}from"./index-4db78ffb.js";const n=new m,y=new l,z=y.load("/src/images/head5.png"),G=new i(3,64,64),L=new g({color:"#fcb235",roughness:.3,metalness:.5}),d=new r(G,L);n.add(d);const W=new i(3,64,64,0,Math.PI*2,0,Math.PI/4),R=new u({map:z,side:p,transparent:!0}),T=new r(W,R),o=new f;o.add(d);o.add(T);n.add(o);const e={width:window.innerWidth,height:window.innerHeight},h=new M(16777215,90,100);h.position.set(10,10,1);n.add(h);const t=new S(45,e.width/e.height);t.position.z=20;n.add(t);const c=document.querySelector(".webgl"),s=new b({canvas:c});s.setSize(e.width,e.height);s.render(n,t);s.setPixelRatio(2);const a=new x(t,c);a.enableDamping=!0;a.enablePan=!1;a.enableZoom=!1;a.autoRotate=!0;a.autoRotateSpeed=5;window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,t.aspect=e.width/e.height,t.updateProjectionMatrix(),s.setSize(e.width,e.height)});const w=()=>{a.update(),s.render(n,t),window.requestAnimationFrame(w)};w();const v=P.timeline({defaults:{duration:1}});v.fromTo(o.scale,{z:0,x:0,y:0},{z:1,x:1,y:1});