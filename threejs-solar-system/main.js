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
const skyboxTexture = skyboxLoader.load("./images/bg1.jpg", () => {
  skyboxTexture.mapping = THREE.EquirectangularReflectionMapping;
  skyboxTexture.colorSpace = THREE.SRGBColorSpace;
  scene.background = skyboxTexture;
});

//const spaceTexture = new THREE.TextureLoader().load("./images/bg1.jpg");
//scene.background = spaceTexture;

// Textures

const sunTexture = new THREE.TextureLoader().load("./images/sun.jpg");
const mercuryTexture = new THREE.TextureLoader().load("./images/mercury.jpg");
const venusTexture = new THREE.TextureLoader().load("./images/venus.jpg");
const earthTexture = new THREE.TextureLoader().load(
  "./images/earthwithtopo.jpg",
);
const marsTexture = new THREE.TextureLoader().load("./images/mars.jpg");
const marsNorm = new THREE.TextureLoader().load("./images/marsnorm.jpg");
const jupiterTexture = new THREE.TextureLoader().load("./images/jupiter.jpg");
const saturnTexture = new THREE.TextureLoader().load("./images/saturn.jpg");
const uranusTexture = new THREE.TextureLoader().load("./images/uranus.jpg");
const neptuneTexture = new THREE.TextureLoader().load("./images/neptune.jpg");
const moonTexture = new THREE.TextureLoader().load("./images/moon.jpg");
const moonNorm = new THREE.TextureLoader().load("./images/moonnorm.jpg");
const phobosTexture = new THREE.TextureLoader().load("./images/phobos.jpg");
const deimosTexture = new THREE.TextureLoader().load("./images/deimos.jpg");

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

function createObjGroup(text, norm, dia, dist, name, parentObj, hasOrb = true) {
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
  return { child: childGroup, mesh: mesh, dist: dist };
}

function createLabel(name, dia) {
  const p = document.createElement("p");
  p.className = "label";
  p.textContent = name;
  p.style.color = "white";
  p.style.marginTop = "-1em";
  const label = new CSS2DObject(p);
  label.position.set(0, dia + 1.5, 0);
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

// Sun
const sun = createObjGroup(sunTexture, "", N / 2, 0, "Sun");
//sun.mesh.material.emissive = new THREE.Color(0xffffff);
//sun.mesh.material.emissiveIntensity = 0.5;

// Planets
const mercury = createObjGroup(
  mercuryTexture,
  mercuryTexture,
  mercuryDia,
  mercuryDist,
  "Mercury",
);
const venus = createObjGroup(
  venusTexture,
  venusTexture,
  venusDia,
  venusDist,
  "Venus",
);
const earth = createObjGroup(
  earthTexture,
  earthTexture,
  earthDia,
  earthDist,
  "Earth",
);
const mars = createObjGroup(marsTexture, marsNorm, marsDia, marsDist, "Mars");
const jupiter = createObjGroup(
  jupiterTexture,
  jupiterTexture,
  jupiterDia,
  jupiterDist,
  "Jupiter",
);
const saturn = createObjGroup(
  saturnTexture,
  saturnTexture,
  saturnDia,
  saturnDist,
  "Saturn",
);
const uranus = createObjGroup(
  uranusTexture,
  uranusTexture,
  uranusDia,
  uranusDist,
  "Uranus",
);
const neptune = createObjGroup(
  neptuneTexture,
  neptuneTexture,
  neptuneDia,
  neptuneDist,
  "Neptune",
);

// Moons
// Earth Moon
const moon = createObjGroup(
  moonTexture,
  moonNorm,
  earthDia / 5,
  earthDist,
  "Moon",
);
// Mars moons
const phobos = createObjGroup(
  phobosTexture,
  phobosTexture,
  marsDia / 5,
  marsDist,
  "Phobos",
);
const deimos = createObjGroup(
  deimosTexture,
  deimosTexture,
  marsDia / 5,
  marsDist,
  "Deimos",
);
// Jupiter moons
const io = createObjGroup(
  deimosTexture,
  deimosTexture,
  jupiterDia / 20,
  jupiterDist,
  "Io",
);
const europa = createObjGroup(
  deimosTexture,
  deimosTexture,
  jupiterDia / 20,
  jupiterDist,
  "Europa",
);
const ganymedes = createObjGroup(
  deimosTexture,
  deimosTexture,
  jupiterDia / 20,
  jupiterDist,
  "Ganymedes",
);
const callisto = createObjGroup(
  deimosTexture,
  deimosTexture,
  jupiterDia / 20,
  jupiterDist,
  "Callisto",
);
// Saturn moons
const thetis = createObjGroup(
  deimosTexture,
  deimosTexture,
  saturnDia / 20,
  saturnDist,
  "Thetis",
);
const dione = createObjGroup(
  deimosTexture,
  deimosTexture,
  saturnDia / 20,
  saturnDist,
  "Dione",
);
const rhea = createObjGroup(
  deimosTexture,
  deimosTexture,
  saturnDia / 20,
  saturnDist,
  "Rhea",
);
const titan = createObjGroup(
  deimosTexture,
  deimosTexture,
  saturnDia / 20,
  saturnDist,
  "Titan",
);
const japetu = createObjGroup(
  deimosTexture,
  deimosTexture,
  saturnDia / 20,
  saturnDist,
  "Japetu",
);
// Uranus moons
const miranda = createObjGroup(
  deimosTexture,
  deimosTexture,
  uranusDia / 18,
  uranusDist,
  "Miranda",
);
const ariel = createObjGroup(
  deimosTexture,
  deimosTexture,
  uranusDia / 18,
  uranusDist,
  "Ariel",
);
const umbriel = createObjGroup(
  deimosTexture,
  deimosTexture,
  uranusDia / 18,
  uranusDist,
  "Umbriel",
);
const titania = createObjGroup(
  deimosTexture,
  deimosTexture,
  uranusDia / 18,
  uranusDist,
  "Titania",
);
const oberon = createObjGroup(
  deimosTexture,
  deimosTexture,
  uranusDia / 18,
  uranusDist,
  "Oberon",
);
// Neptune moons
const triton = createObjGroup(
  deimosTexture,
  deimosTexture,
  neptuneDia / 18,
  neptuneDist,
  "Triton",
);
const nereida = createObjGroup(
  deimosTexture,
  deimosTexture,
  neptuneDia / 18,
  neptuneDist,
  "Nereida",
);

// Object Lists

let planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
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
let planetDists = [
  mercuryDist,
  venusDist,
  earthDist,
  marsDist,
  jupiterDist,
  saturnDist,
  uranusDist,
  neptuneDist,
];
let moons = [
  [],
  [],
  [moon],
  [phobos, deimos],
  [io, europa, ganymedes, callisto],
  [thetis, dione, rhea, titan, japetu],
  [miranda, ariel, umbriel, titania, oberon],
  [triton, nereida],
];

// Menu Click Event

const menus = document.getElementsByClassName("menusel");
const infotxt = document.getElementById("objinfo");

// Info Text Loader
async function loadInfoTxt(infofile) {
  try {
    const response = await fetch(`./info/${infofile}.txt`);
    const text = await response.text();
    infotxt.innerHTML = text;
  } catch (error) {
    console.error("Error fetching info text:", error);
  }
}

for (let ms of menus) {
  ms.addEventListener("click", function () {
    let evid = this.dataset.ind;
    let evlab = this.dataset.lab;
    let evposx = planets[evid].position.x + planetDias[evid];
    let evposy = planets[evid].position.y + planetDias[evid];
    let evposz = planets[evid].position.z + planetDias[evid];
    camera.position.set(evposx + 4, evposy + 2, evposz + 2);
    loadInfoTxt(evlab);
  });
}

// Key Press Event

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

// Controls, helpers

//const axisHelp = new THREE.AxesHelper(1000);
//const gridHelp = new THREE.PolarGridHelper(1000, 10, 10);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
//scene.add(axisHelp, gridHelp);

// Animation Loop

let delta = 0;

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.001;
  venus.rotation.y -= 0.02;
  for (let p of planets) {
    p.rotation.y += 0.01;
  }

  if (!animIsPaused) {
    // planets movement
    for (let i = 0; i < planets.length; i++) {
      let p = planets[i];
      let pdist = planetDists[i];
      p.position.x = sun.position.x + Math.sin(delta + i * 0.1) * pdist;
      p.position.z = sun.position.z + Math.cos(delta + i * 0.1) * (pdist + 5);
    }
  }

  // moons movement
  for (let pi = 0; pi < planets.length; pi++) {
    if (moons[pi].length) {
      let pm = planets[pi];
      let pmdia = planetDias[pi];
      for (let mi = 0; mi < moons[pi].length; mi++) {
        let m = moons[pi][mi];
        m.position.x =
          pm.position.x - Math.sin(delta + mi * 0.05) * (pmdia + 1 + mi * 1);
        m.position.z =
          pm.position.z - Math.cos(delta + mi * 0.05) * (pmdia + 2 + mi * 1);
        m.rotation.y += 0.01;
      }
    }
  }

  delta += 0.005;

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();
