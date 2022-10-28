import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
camera.position.set(6, 16, 25);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

// Raycaster (handles click events)

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function renderRay() {
  // mouse pos camera to pick object clicked
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects[0].object.name) {
    let answer = window.confirm("Do you wish to open link on new tab?");
    if (answer === false) {
      return;
    }
  }

  // create lists for objects and links
  // get index of intersects[0].object.name in objects list
  // get the link of that same index from links list
  // window.open("link from above");

  if (intersects[0].object.name === "moon") {
    window.open("https://en.wikipedia.org/wiki/Moon");
  }
  if (intersects[0].object.name === "earth") {
    window.open("https://www.google.hu/intl/hu/earth/");
  }
  if (intersects[0].object.name === "mars") {
    window.open("https://en.wikipedia.org/wiki/Mars");
  }
  if (intersects[0].object.name === "sun") {
    window.open("https://en.wikipedia.org/wiki/Sun");
  }
  renderer.render(scene, camera);
}

// Click Events

function onMouseClick(event) {
  // calc mouse pos in normalized device coords
  // (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  window.requestAnimationFrame(renderRay);
}

// window.addEventListener('click', onMouseClick);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(-25, 40, -30);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

scene.add(pointLight, ambientLight);

// Background

const spaceTexture = new THREE.TextureLoader().load("./images/bg4.jpg");
scene.background = spaceTexture;

// Scales/object data

const N = 20; // N = sun diameter
const mercuryDia = N / 285;
const venusDia = N / 115;
const earthDia = N / 109.3;
const marsDia = N / 205.4;
const jupiterDia = N / 9.7;
const saturnDia = N / 11.6;
const uranusDia = N / 27.2;
const neptuneDia = N / 28.1;

const scaleDown = 100;
// for planet/moon distances, too?

// distances from sun, pos(x)
const mercuryDist = (N * 41.6) / scaleDown;
const venusDist = (N * 77.7) / scaleDown;
const earthDist = (N * 107.4) / scaleDown;
const marsDist = (N * 163.7) / scaleDown;
const jupiterDist = (N * 559) / scaleDown;
const saturnDist = (N * 1030) / scaleDown;
const uranusDist = (N * 2061) / scaleDown;
const neptuneDist = (N * 3230) / scaleDown;

function createObj(objText, objNorm, objDia, objName, objXYZ) {
  let obj = new THREE.Mesh(
    new THREE.SphereGeometry(objDia, 64, 64),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(objText),
      normalMap: new THREE.TextureLoader().load(objNorm),
    })
  );
  scene.add(obj);
  obj.name = objName;
  obj.position.set(objXYZ[0], objXYZ[1], objXYZ[2]);
  return obj;
}

// Sun
const sun = createObj(
  "./images/sun.jpg",
  "./images/sun.jpg",
  N,
  "sun",
  [-50, 0, 0]
);

// Planets
const mercury = createObj(
  "./images/mercury.jpg",
  "./images/mercury.jpg",
  mercuryDia,
  "mercury",
  [-20, 0, 0]
);
const venus = createObj(
  "./images/venus.jpg",
  "./images/venus.jpg",
  venusDia,
  "venus",
  [-10, 0, 0]
);
const earth = createObj(
  "./images/earthwithtopo.jpg",
  "./images/earthwithtopo.jpg",
  earthDia,
  "earth",
  [0, 0, 0]
);
const mars = createObj(
  "./images/mars.jpg",
  "./images/marsnorm.jpg",
  marsDia,
  "mars",
  [10, 0, 0]
);
const jupiter = createObj(
  "./images/jupiter.jpg",
  "./images/jupiter.jpg",
  jupiterDia,
  "jupiter",
  [20, 0, 0]
);
const saturn = createObj(
  "./images/saturn.jpg",
  "./images/saturn.jpg",
  saturnDia,
  "saturn",
  [30, 0, 0]
);
const uranus = createObj(
  "./images/uranus.jpg",
  "./images/uranus.jpg",
  uranusDia,
  "uranus",
  [40, 0, 0]
);
const neptune = createObj(
  "./images/neptune.jpg",
  "./images/neptune.jpg",
  neptuneDia,
  "neptune",
  [50, 0, 0]
);

// Moons
// Earth Moon
const moon = createObj(
  "./images/moon.jpg",
  "./images/moonnorm.jpg",
  earthDia / 7,
  "moon",
  [0, 0, 5]
);
// Mars moons
const phobos = createObj(
  "./images/phobos.jpg",
  "./images/phobos.jpg",
  marsDia / 5,
  "phobos",
  [10, 0, 5]
);
const deimos = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  marsDia / 5,
  "deimos",
  [10, 0, 10]
);

// Window Resize Event

function onWindResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}

window.addEventListener("resize", onWindResize);

// Controls, helpers
const axisHelp = new THREE.AxesHelper(50);
const gridHelp = new THREE.GridHelper(100, 20);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
scene.add(axisHelp, gridHelp);

// Object Lists

let planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
//moons = [[], [], [moon], [phobos, deimos]];

// Animation Loop

let delta = 0;

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y -= 0.001;

  // planets movement
  for (let i = 0; i < planets.length; i++) {
    let p = planets[i];
    p.position.x = sun.position.x + Math.sin(delta + i * 0.2) * (25 + i * 10);
    p.position.z = sun.position.z + Math.cos(delta + i * 0.2) * (30 + i * 10);
    p.rotation.y += 0.01;
  }

  // moons movement
  moon.position.x = earth.position.x - Math.sin(delta + 1) * 4;
  moon.position.z = earth.position.z - Math.cos(delta + 1) * 5;
  moon.rotation.y += 0.01;

  phobos.position.x = mars.position.x - Math.sin(delta + 1) * 4;
  phobos.position.z = mars.position.z - Math.cos(delta + 1) * 5;
  phobos.rotation.y += 0.01;

  deimos.position.x = mars.position.x - Math.sin(delta + 1) * 6;
  deimos.position.z = mars.position.z - Math.cos(delta + 1) * 7;
  deimos.rotation.y += 0.01;

  delta += 0.005;

  renderer.render(scene, camera);
}

animate();
