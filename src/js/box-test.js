import * as THREE from "/node_modules/three/build/three.module.js";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import bigHead from "../images/head5.png";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const myTexture = new THREE.TextureLoader().load(bigHead);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.2,
  // map: myTexture,
  // transparent: true,
});
const cube = new THREE.Mesh(geometry, material);
// cube.position.set(1, 0, 0);
scene.add(cube);

// Light

const light = new THREE.PointLight(0xffffff, 1000, 0, 2.3);
light.position.set(7, 10, 15);
scene.add(light);

// Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
// controls.autoRotate = true;
controls.autoRotateSpeed = 5;
// controls.dampingFactor = 0.01;

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
