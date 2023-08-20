import * as THREE from "/node_modules/three/build/three.module.js";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";
import { gsap } from "/node_modules/gsap";

// import {
//   CSS3DRenderer,
//   CSS3DObject,
// } from "three/examples/jsm/renderers/CSS3DRenderer.js";

// Scene

const scene = new THREE.Scene();

// Load texture

// const textureLoader = new THREE.TextureLoader();
// const myTexture = textureLoader.load("/images/head5.png");

// Sphere

const geometry = new THREE.SphereGeometry(3, 64, 64);

const material = new THREE.MeshStandardMaterial({
  color: "#fcb235",
  roughness: 0.3,
  metalness: 0.5,
  //   map: myTexture,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// // Plane for the Image
// const planeGeometry = new THREE.PlaneGeometry(2, 2);
// const planeMaterial = new THREE.MeshBasicMaterial({
//   map: myTexture,
//   side: THREE.DoubleSide,
// });
// const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// planeMesh.position.set(0, 0, 3.01);
// scene.add(planeMesh);

// Sizes

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Light

const light = new THREE.PointLight(0xffffff, 90, 100);
light.position.set(10, 10, 1);
scene.add(light);

// Ambient light

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
// scene.add(ambientLight);

// Directional light

// const dirLight = new THREE.DirectionalLight(0xffffff, 1);
// dirLight.position.set(1, 1, 1);
// scene.add(dirLight);

// Camera

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 20;
scene.add(camera);

// Renderer

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(2);

// Controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// Text

// const fontLoader = new THREE.FontLoader();
// let myFont; // This will store the loaded font.
// fontLoader.load("/examples/fonts/optimer_bold.typeface.json", (font) => {
//   myFont = font;
//   createText();
// });

// function createText() {
//   const textGeometry = new THREE.TextGeometry("Three.js", {
//     font: myFont,
//     size: 0.5,
//     height: 0.1,
//     curveSegments: 12,
//     bevelEnabled: true,
//     bevelThickness: 0.01,
//     bevelSize: 0.01,
//     bevelOffset: 0,
//     bevelSegments: 5,
//   });
//   textGeometry.computeBoundingBox();
//   textGeometry.computeVertexNormals();
//   const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black color for the text
//   const textMesh = new THREE.Mesh(textGeometry, textMaterial);
//   textMesh.position.set(-1, 0, 3); // Adjust this to move your text to the desired position on the sphere
//   scene.add(textMesh);
// }

// const cssRenderer = new CSS3DRenderer();
// cssRenderer.setSize(sizes.width, sizes.height);
// document.body.appendChild(cssRenderer.domElement);

// const element = document.querySelector(".3d-text");
// element.style.display = "block";

// const divObject = new CSS3DObject(element);
// divObject.position.set(0, 0, 3);
// scene.add(divObject);

// Resize

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  //   mesh.rotation.x += 0.2;
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop);
};
loop();

const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
