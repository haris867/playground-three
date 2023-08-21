import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import bigHead from "../images/head5.png";

// Scene
const scene = new THREE.Scene();

// Load texture
const textureLoader = new THREE.TextureLoader();
const myTexture = textureLoader.load(bigHead);

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
const originalPhiLength = Math.PI * 0.5; // Original horizontal span (90 degrees)
const originalThetaLength = Math.PI * 0.5; // Original vertical span (90 degrees)

const newPhiLength = originalPhiLength * 0.5; // New horizontal span (45 degrees)
const newThetaLength = originalThetaLength * 0.5; // New vertical span (45 degrees)

const segmentGeometry = new THREE.SphereGeometry(
  3, // radius
  64, // widthSegments
  64, // heightSegments
  Math.PI * 0.25 + (originalPhiLength - newPhiLength) * 0.5, // Adjusted phiStart
  newPhiLength, // New phiLength
  Math.PI * 0.25 + (originalThetaLength - newThetaLength) * 0.5, // Adjusted thetaStart
  newThetaLength // New thetaLength
);
const segmentMaterial = new THREE.MeshBasicMaterial({
  map: myTexture,
  side: THREE.DoubleSide,
  transparent: true,
});
const segmentMesh = new THREE.Mesh(segmentGeometry, segmentMaterial);

const anotherSphere = new THREE.SphereGeometry(2, 64, 64);
const anotherGeometry = new THREE.TorusGeometry(3, 0.3, 124);
const anotherMaterial = new THREE.MeshStandardMaterial({
  color: "#ff5733",
  roughness: 0.3,
  metalness: 0.6,
});

const anotherMesh = new THREE.Mesh(anotherSphere, anotherMaterial);
const anotherShape = new THREE.Mesh(anotherGeometry, anotherMaterial);
anotherMesh.position.set(10, 0, 0);
anotherShape.position.set(10, 0, 0);
anotherShape.rotation.x += 0.01;

// Star shape

const starShape = new THREE.Shape();

let x = 0,
  y = 0;
starShape.moveTo(x + 1, y + 1);
starShape.lineTo(x + 2, y + 5);
starShape.lineTo(x + 5, y + 5);
starShape.lineTo(x + 3, y + 7);
starShape.lineTo(x + 4.6, y + 12);
starShape.lineTo(x, y + 9);
starShape.lineTo(x - 4.6, y + 12);
starShape.lineTo(x - 3, y + 7);
starShape.lineTo(x - 5, y + 5);
starShape.lineTo(x - 2, y + 5);
starShape.lineTo(x + 1, y + 1);

const extrudeSettings = {
  steps: 2,
  depth: 10,
  bevelEnabled: true,
  bevelThickness: 1,
  bevelSize: 1,
  bevelOffset: 0,
  bevelSegments: 1,
};

const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
const starMesh = new THREE.Mesh(extrudeGeometry, material);

starMesh.position.set(-10, -10, -10);

// Create a group to hold both the main sphere and the image segment
const group = new THREE.Group();
group.add(mesh);
group.add(segmentMesh);
scene.add(group);
group.add(anotherMesh);
group.add(anotherShape);
group.add(starMesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Light
const light = new THREE.PointLight(0xffffff, 200, 100);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1, 100);
light.position.set(10, 8, 15);
scene.add(light);
scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
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
controls.autoRotate = false;
controls.autoRotateSpeed = 5;

// Hemisphere light

const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1); // Sky color, ground color, intensity
// scene.add(hemisphereLight);

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

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function handleIntersect(event) {
  let clientX, clientY;

  if (event.touches) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  } else {
    clientX = event.clientX;
    clientY = event.clientY;
  }

  // Normalize position between -1 and 1 for both axes
  mouse.x = (clientX / sizes.width) * 2 - 1;
  mouse.y = -(clientY / sizes.height) * 2 + 1;

  // Check for intersections
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(segmentMesh);

  if (intersects.length > 0) {
    const originalPosition = segmentMesh.position.clone();
    segmentMesh.position.z = 2;

    gsap.to(segmentMesh.position, {
      delay: 1,
      z: originalPosition.z,
      ease: "power2.out",
      duration: 0.5,
    });
  }
}

window.addEventListener("mousedown", handleIntersect);
window.addEventListener("touchstart", handleIntersect);

function addStars() {
  const geometry = new THREE.SphereGeometry(0.025, 64, 64);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(30));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStars);

const loop = () => {
  controls.update();
  anotherShape.rotation.x += 0.01;
  anotherShape.rotation.y += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();

const tl = gsap.timeline({ defaults: { duration: 1 } });
// Use combinedMesh for the animation
tl.fromTo(group.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
