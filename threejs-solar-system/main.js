import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
camera.position.set(0, 100, 150);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);
labelRenderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1.5);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(pointLight, ambientLight);
pointLight.position.set(0, 0, 0);

// Background

const skyboxLoader = new THREE.TextureLoader();
const skyboxTexture = skyboxLoader.load("images/bg1.jpg", () => {
  skyboxTexture.mapping = THREE.EquirectangularReflectionMapping;
  skyboxTexture.colorSpace = THREE.SRGBColorSpace;
  scene.background = skyboxTexture;
});

//const spaceTexture = new THREE.TextureLoader().load("images/bg1.jpg");
//scene.background = spaceTexture;

// Textures

const sunTexture = new THREE.TextureLoader().load("images/sun.jpg");
const mercuryTexture = new THREE.TextureLoader().load("images/mercury.jpg");
const venusTexture = new THREE.TextureLoader().load("images/venus.jpg");
const earthTexture = new THREE.TextureLoader().load("images/earthwithtopo.jpg");
const marsTexture = new THREE.TextureLoader().load("images/mars.jpg");
const marsNorm = new THREE.TextureLoader().load("images/marsnorm.jpg");
const jupiterTexture = new THREE.TextureLoader().load("images/jupiter.jpg");
const saturnTexture = new THREE.TextureLoader().load("images/saturn.jpg");
const uranusTexture = new THREE.TextureLoader().load("images/uranus.jpg");
const neptuneTexture = new THREE.TextureLoader().load("images/neptune.jpg");
const moonTexture = new THREE.TextureLoader().load("images/moon.jpg");
const moonNorm = new THREE.TextureLoader().load("images/moonnorm.jpg");
const phobosTexture = new THREE.TextureLoader().load("images/phobos.jpg");
const deimosTexture = new THREE.TextureLoader().load("images/deimos.jpg");

// Modal Intro

const modal = document.getElementById("modal");
modal.addEventListener("click", function () {
  modal.style.display = "none";
});

// Scales/object data

const N = 30; // N = sun diameter
const mercuryDia = N / 285;
const venusDia = N / 115;
const earthDia = N / 109.3;
const marsDia = N / 205.4;
const jupiterDia = N / 9.7;
const saturnDia = N / 11.6;
const uranusDia = N / 27.2;
const neptuneDia = N / 28.1;
const scaleDown = 100;

// distances from sun, pos(x)
const mercuryDist = (N * 41.6) / scaleDown + N / 2;
const venusDist = (N * 77.7) / scaleDown + N / 2;
const earthDist = (N * 107.4) / scaleDown + N / 2;
const marsDist = (N * 163.7) / scaleDown + N / 2;
const jupiterDist = (N * 559) / scaleDown + N / 2;
const saturnDist = (N * 1030) / scaleDown + N / 2;
const uranusDist = (N * 2061) / scaleDown + N / 2;
const neptuneDist = (N * 3230) / scaleDown + N / 2;

// Functions to create objects, orbits, labels

function createSystem(text, norm, dia, dist, name, parentObj, hasOrb = true) {
  const childGroup = new THREE.Group();
  const geometry = new THREE.SphereGeometry(dia, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    map: text,
    normalMap: norm || null,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = dist;
  childGroup.add(mesh);
  const label = createLabel(name, dia);
  mesh.add(label);
  if (hasOrb && dist > 0) {
    const orbit = createOrbitLine(dist);
    parentObj.add(orbit);
  }
  parentObj.add(childGroup);
  return { child: childGroup, mesh: mesh, dist: dist };
}

function createLabel(name, dia) {
  const p = document.createElement("p");
  p.className = "label";
  p.textContent = name;
  p.style.color = "white";
  p.style.marginTop = "-1em";
  const label = new CSS2DObject(p);
  label.position.set(0, dia + 0.05, 0);
  return label;
}

function createOrbitLine(rad) {
  const curve = new THREE.EllipseCurve(
    0,
    0,
    rad,
    rad,
    0,
    2 * Math.PI,
    false,
    0,
  );
  const points = curve.getPoints(128);
  const orbitGeom = new THREE.BufferGeometry().setFromPoints(points);
  const orbitMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
  });
  const orbit = new THREE.LineLoop(orbitGeom, orbitMat);
  orbit.rotation.x = Math.PI / 2;
  return orbit;
}

// Sun - Center Object
const solarSystem = new THREE.Group();
scene.add(solarSystem);

const sunGeom = new THREE.SphereGeometry(N / 2, 32, 32);
const sunMat = new THREE.MeshStandardMaterial({
  map: sunTexture,
  emissive: 0xffffff,
  emissiveIntensity: 0.5,
});
const sunMesh = new THREE.Mesh(sunGeom, sunMat);
solarSystem.add(sunMesh);

// Planets
const mercury = createSystem(
  mercuryTexture,
  null,
  mercuryDia,
  mercuryDist,
  "Mercury",
  solarSystem,
);
const venus = createSystem(
  venusTexture,
  null,
  venusDia,
  venusDist,
  "Venus",
  solarSystem,
);
const earth = createSystem(
  earthTexture,
  null,
  earthDia,
  earthDist,
  "Earth",
  solarSystem,
);
const mars = createSystem(
  marsTexture,
  marsNorm,
  marsDia,
  marsDist,
  "Mars",
  solarSystem,
);
const jupiter = createSystem(
  jupiterTexture,
  jupiterTexture,
  jupiterDia,
  jupiterDist,
  "Jupiter",
  solarSystem,
);
const saturn = createSystem(
  saturnTexture,
  saturnTexture,
  saturnDia,
  saturnDist,
  "Saturn",
  solarSystem,
);
const uranus = createSystem(
  uranusTexture,
  uranusTexture,
  uranusDia,
  uranusDist,
  "Uranus",
  solarSystem,
);
const neptune = createSystem(
  neptuneTexture,
  neptuneTexture,
  neptuneDia,
  neptuneDist,
  "Neptune",
  solarSystem,
);

// Moons
// Earth Moon
const moon = createSystem(
  moonTexture,
  moonNorm,
  earthDia / 4,
  3,
  "Moon",
  earth.mesh,
);
// Mars moons
const phobos = createSystem(
  phobosTexture,
  null,
  marsDia / 5,
  3,
  "Phobos",
  mars.mesh,
);
const deimos = createSystem(
  deimosTexture,
  null,
  marsDia / 6,
  5,
  "Deimos",
  mars.mesh,
);
// Jupiter moons
const io = createSystem(
  deimosTexture,
  null,
  jupiterDia / 20,
  3,
  "Io",
  jupiter.mesh,
);
const europa = createSystem(
  deimosTexture,
  deimosTexture,
  jupiterDia / 20,
  5,
  "Europa",
  jupiter.mesh,
);
const ganymedes = createSystem(
  deimosTexture,
  deimosTexture,
  jupiterDia / 20,
  8,
  "Ganymedes",
  jupiter.mesh,
);
const callisto = createSystem(
  deimosTexture,
  deimosTexture,
  jupiterDia / 20,
  12,
  "Callisto",
  jupiter.mesh,
);
// Saturn moons
const thetis = createSystem(
  deimosTexture,
  deimosTexture,
  saturnDia / 20,
  3,
  "Thetis",
  saturn.mesh,
);
const dione = createSystem(
  deimosTexture,
  deimosTexture,
  saturnDia / 20,
  5,
  "Dione",
  saturn.mesh,
);
const rhea = createSystem(
  deimosTexture,
  deimosTexture,
  saturnDia / 20,
  8,
  "Rhea",
  saturn.mesh,
);
const titan = createSystem(
  deimosTexture,
  deimosTexture,
  saturnDia / 20,
  12,
  "Titan",
  saturn.mesh,
);
const japetu = createSystem(
  deimosTexture,
  deimosTexture,
  saturnDia / 20,
  17,
  "Japetu",
  saturn.mesh,
);
// Uranus moons
const miranda = createSystem(
  deimosTexture,
  deimosTexture,
  uranusDia / 18,
  3,
  "Miranda",
  uranus.mesh,
);
const ariel = createSystem(
  deimosTexture,
  deimosTexture,
  uranusDia / 18,
  5,
  "Ariel",
  uranus.mesh,
);
const umbriel = createSystem(
  deimosTexture,
  deimosTexture,
  uranusDia / 18,
  8,
  "Umbriel",
  uranus.mesh,
);
const titania = createSystem(
  deimosTexture,
  deimosTexture,
  uranusDia / 18,
  12,
  "Titania",
  uranus.mesh,
);
const oberon = createSystem(
  deimosTexture,
  deimosTexture,
  uranusDia / 18,
  17,
  "Oberon",
  uranus.mesh,
);
// Neptune moons
const triton = createSystem(
  deimosTexture,
  deimosTexture,
  neptuneDia / 18,
  3,
  "Triton",
  neptune.mesh,
);
const nereida = createSystem(
  deimosTexture,
  deimosTexture,
  neptuneDia / 18,
  5,
  "Nereida",
  neptune.mesh,
);

// Object Lists

const pSpeedMod = 10;
const planetObjects = [
  { obj: mercury, speed: 0.04 / pSpeedMod },
  { obj: venus, speed: 0.015 / pSpeedMod },
  { obj: earth, speed: 0.01 / pSpeedMod },
  { obj: mars, speed: 0.008 / pSpeedMod },
  { obj: jupiter, speed: 0.004 / pSpeedMod },
  { obj: saturn, speed: 0.003 / pSpeedMod },
  { obj: uranus, speed: 0.002 / pSpeedMod },
  { obj: neptune, speed: 0.001 / pSpeedMod },
];
const mSpeedMod = 100;
const moonObjects = [
  { obj: moon, speed: 0.05 / mSpeedMod },
  { obj: phobos, speed: 0.1 / mSpeedMod },
  { obj: deimos, speed: 0.08 / mSpeedMod },
  { obj: io, speed: 0.07 / mSpeedMod },
  { obj: europa, speed: 0.06 / mSpeedMod },
  { obj: ganymedes, speed: 0.05 / mSpeedMod },
  { obj: callisto, speed: 0.04 / mSpeedMod },
  { obj: thetis, speed: 0.03 / mSpeedMod },
  { obj: dione, speed: 0.02 / mSpeedMod },
  { obj: rhea, speed: 0.01 / mSpeedMod },
  { obj: titan, speed: 0.009 / mSpeedMod },
  { obj: japetu, speed: 0.008 / mSpeedMod },
  { obj: miranda, speed: 0.007 / mSpeedMod },
  { obj: ariel, speed: 0.006 / mSpeedMod },
  { obj: umbriel, speed: 0.005 / mSpeedMod },
  { obj: titania, speed: 0.004 / mSpeedMod },
  { obj: oberon, speed: 0.003 / mSpeedMod },
  { obj: triton, speed: 0.002 / mSpeedMod },
  { obj: nereida, speed: 0.001 / mSpeedMod },
];

let planetDias = [
  mercuryDia,
  venusDia,
  earthDia,
  marsDia,
  jupiterDia,
  saturnDia,
  uranusDia,
  neptuneDia,
];

// Menu and Info Box

const menus = document.getElementsByClassName("menusel");
const infotxt = document.getElementById("objinfo");

async function loadInfoTxt(infofile) {
  try {
    const response = await fetch(`public/info/${infofile}.txt`);
    const text = await response.text();
    infotxt.innerHTML = text;
  } catch (error) {
    console.error("Error fetching info text:", error);
  }
}

// move camera on menu click

const targetPos = new THREE.Vector3();
let targetMesh = null;
for (let ms of menus) {
  ms.addEventListener("click", function () {
    let evid = this.dataset.ind;
    let evlab = this.dataset.lab;
    targetMesh = planetObjects[evid].obj.mesh;
    //const targetRad = planetDias[evid];
    targetMesh.getWorldPosition(targetPos);
    /* camera.position.set(
      targetPos.x + targetRad * 5,
      targetPos.y + targetRad * 2,
      targetPos.z + targetRad * 2,
    ); */
    //controls.target.copy(targetPos); // becomes camera center
    //controls.update();
    loadInfoTxt(evlab);
  });
}

// pause/play

const infobox = document.getElementById("infobox");
let animIsPaused = true;
window.addEventListener("keydown", function (ev) {
  if (ev.code != "Space") {
    return;
  }
  animIsPaused = !animIsPaused;
  infobox.style.display = animIsPaused ? "grid" : "none";
  infotxt.innerHTML = "";
  camera.position.set(50, 50, 25);
});

// Window Resize Event

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

// Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
// let tempVec = new THREE.Vector3();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  // moving camera towards target obj
  if (targetMesh) {
    targetMesh.getWorldPosition(targetPos);
    camera.position.lerp(
      new THREE.Vector3(targetPos.x + 10, targetPos.y + 5, targetPos.z + 10),
      0.05,
    );
    controls.target.lerp(targetPos, 0.05);
    controls.update();
  }
  sunMesh.rotation.y += 0.001;
  planetObjects.forEach((p) => (p.obj.mesh.rotation.y += 0.01));
  moonObjects.forEach((m) => (m.obj.mesh.rotation.y += 0.01));
  if (!animIsPaused) {
    planetObjects.forEach((p) => (p.obj.child.rotation.y += p.speed));
    moonObjects.forEach((m) => (m.obj.child.rotation.y += m.speed));
  }
  //controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();
