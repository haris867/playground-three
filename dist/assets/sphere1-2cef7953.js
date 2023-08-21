import{S as h,T as c,L as v,a as m,d as u,b as g,P as f,c as w,W as p,O as x}from"./OrbitControls-a9f36f34.js";import{g as y}from"./index-4db78ffb.js";const a=new h,S=new c().load("/src/images/head5.png",function(n){n.generateMipmaps=!1,n.minFilter=v}),C=new m(3,64,64),U=`
    uniform sampler2D myTexture;
    varying vec2 vUv;

void main() {
    float imageWidth = 0.1;
    float leftBound = 0.5 - imageWidth / 2.0;
    float rightBound = 0.5 + imageWidth / 2.0;
    vec4 defaultColor = vec4(1.0, 0.0, 0.0, 1.0);
 // Default sphere color

    if (vUv.x > leftBound && vUv.x < rightBound && vUv.y > 0.4 && vUv.y < 0.6) {
        vec2 adjustedUV = vec2(
            (vUv.x - leftBound) / imageWidth,  
            (vUv.y - 0.4) * 5.0  
        );
        vec4 texColor = texture2D(myTexture, adjustedUV);

        gl_FragColor = mix(defaultColor, texColor, texColor.a);
    } else {
        gl_FragColor = defaultColor;
    }
}
`,W=`
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,b=new u({uniforms:{myTexture:{value:S},roughness:{value:.5},metalness:{value:.5}},vertexShader:W,fragmentShader:U,transparent:!0}),r=new g(C,b);a.add(r);const e={width:window.innerWidth,height:window.innerHeight},s=new f(16777215,90,100);s.position.set(10,10,1);a.add(s);const t=new w(45,e.width/e.height);t.position.z=20;a.add(t);const d=document.querySelector(".webgl"),i=new p({canvas:d});i.setSize(e.width,e.height);i.render(a,t);i.setPixelRatio(2);const o=new x(t,d);o.enableDamping=!0;o.enablePan=!1;o.enableZoom=!1;o.autoRotate=!0;o.autoRotateSpeed=5;window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,t.aspect=e.width/e.height,t.updateProjectionMatrix(),i.setSize(e.width,e.height)});const l=()=>{o.update(),i.render(a,t),window.requestAnimationFrame(l)};l();const z=y.timeline({defaults:{duration:1}});z.fromTo(r.scale,{z:0,x:0,y:0},{z:1,x:1,y:1});
