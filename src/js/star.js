import * as THREE from "three";

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1, 100);
scene.add(ambientLight);

const starShape = new THREE.Shape();

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

let x = 0,
  y = 0;
starShape.moveTo(x + 5, y + 5);
starShape.lineTo(x + 10, y + 25);
starShape.lineTo(x + 25, y + 25);
starShape.lineTo(x + 15, y + 35);
starShape.lineTo(x + 23, y + 60);
starShape.lineTo(x, y + 45);
starShape.lineTo(x - 23, y + 60);
starShape.lineTo(x - 15, y + 35);
starShape.lineTo(x - 25, y + 25);
starShape.lineTo(x - 10, y + 25);
starShape.lineTo(x + 5, y + 5);

const extrudeSettings = {
  steps: 2,
  depth: 10,
  bevelEnabled: true,
  bevelThickness: 1,
  bevelSize: 1,
  bevelOffset: 0,
  bevelSegments: 1,
};

const geometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 100;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
