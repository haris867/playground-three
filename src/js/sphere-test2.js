import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

// Scene
const scene = new THREE.Scene();

// Load texture
const textureLoader = new THREE.TextureLoader();
const myTexture = textureLoader.load("/images/head5.png");

// Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#fcb235",
  roughness: 0.3,
  metalness: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Image on Segment of Sphere
const segmentGeometry = new THREE.SphereGeometry(
  3,
  64,
  64,
  0,
  Math.PI * 2,
  0,
  Math.PI / 4
);
const segmentMaterial = new THREE.MeshBasicMaterial({
  map: myTexture,
  side: THREE.DoubleSide,
  transparent: true,
});
const segmentMesh = new THREE.Mesh(segmentGeometry, segmentMaterial);

// Create a group to hold both the main sphere and the image segment
const group = new THREE.Group();
group.add(mesh);
group.add(segmentMesh);
scene.add(group);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Light
const light = new THREE.PointLight(0xffffff, 90, 100);
light.position.set(10, 10, 1);
scene.add(light);

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
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

const tl = gsap.timeline({ defaults: { duration: 1 } });
// Use combinedMesh for the animation
tl.fromTo(group.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
