import{S as i,c as d,T as c,W as m,B as w,M as l,b as h,P as u,O as f}from"./OrbitControls-a9f36f34.js";const o=new i,a=new d(75,window.innerWidth/window.innerHeight,.1,1e3);new c().load("/src/images/head5.png");const g=document.querySelector(".webgl"),e=new m({canvas:g});e.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(e.domElement);const p=new w(1,1,1),b=new l({color:24745,roughness:.2,transparent:!0}),t=new h(p,b);o.add(t);const r=new u(16777215,1e3,0,2.3);r.position.set(7,10,15);o.add(r);const n=new f(a,e.domElement);n.enableDamping=!0;n.enablePan=!1;n.enableZoom=!1;n.autoRotateSpeed=5;a.position.z=5;function s(){requestAnimationFrame(s),t.rotation.x+=.01,t.rotation.y+=.01,e.render(o,a)}s();