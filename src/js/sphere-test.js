import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

// Scene

const scene = new THREE.Scene();

// Load texture

const myTexture = new THREE.TextureLoader().load(
  "/images/head5.png",
  function (texture) {
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
  }
);

// Sphere

const geometry = new THREE.SphereGeometry(3, 64, 64);

// Fragment shader for custom mapping
const fragmentShader = `
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
`;

// Vertex shader (unchanged, just used for passing UV to fragment shader)
const vertexShader = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// Custom shader material using our shaders and passing the texture as uniform
const material = new THREE.ShaderMaterial({
  uniforms: {
    myTexture: { value: myTexture },
    roughness: { value: 0.5 }, // Default roughness value
    metalness: { value: 0.5 }, // Default metalness value
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
  //   mesh.rotation.x += 0.2;
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop);
};
loop();

const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });

// Text

// const fontLoader = new THREE.FontLoader();
// let myFont; // This will store the loaded font.
// fontLoader.load("path_to_font/helvetiker_bold.typeface.json", (font) => {
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

// Ambient light

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
// scene.add(ambientLight);

// Directional light

// const dirLight = new THREE.DirectionalLight(0xffffff, 1);
// dirLight.position.set(1, 1, 1);
// scene.add(dirLight);
