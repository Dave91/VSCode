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
camera.position.set(50, 50, 25);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1.4);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(pointLight, ambientLight);
pointLight.position.set(0, 0, 0);

// Background

const spaceTexture = new THREE.TextureLoader().load("./images/bg4.jpg");
scene.background = spaceTexture;

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
const sun = createObj("./images/sun.jpg", "", N / 2, "sun", [0, 0, 0]);

// Planets
const mercury = createObj(
  "./images/mercury.jpg",
  "./images/mercury.jpg",
  mercuryDia,
  "mercury",
  [mercuryDist, 0, 0]
);
const venus = createObj(
  "./images/venus.jpg",
  "./images/venus.jpg",
  venusDia,
  "venus",
  [venusDist, 0, 0]
);
const earth = createObj(
  "./images/earthwithtopo.jpg",
  "./images/earthwithtopo.jpg",
  earthDia,
  "earth",
  [earthDist, 0, 0]
);
const mars = createObj(
  "./images/mars.jpg",
  "./images/marsnorm.jpg",
  marsDia,
  "mars",
  [marsDist, 0, 0]
);
const jupiter = createObj(
  "./images/jupiter.jpg",
  "./images/jupiter.jpg",
  jupiterDia,
  "jupiter",
  [jupiterDist, 0, 0]
);
const saturn = createObj(
  "./images/saturn.jpg",
  "./images/saturn.jpg",
  saturnDia,
  "saturn",
  [saturnDist, 0, 0]
);
const uranus = createObj(
  "./images/uranus.jpg",
  "./images/uranus.jpg",
  uranusDia,
  "uranus",
  [uranusDist, 0, 0]
);
const neptune = createObj(
  "./images/neptune.jpg",
  "./images/neptune.jpg",
  neptuneDia,
  "neptune",
  [neptuneDist, 0, 0]
);

// Moons
// Earth Moon
const moon = createObj(
  "./images/moon.jpg",
  "./images/moonnorm.jpg",
  earthDia / 5,
  "moon",
  [earthDist, 0, 3]
);
// Mars moons
const phobos = createObj(
  "./images/phobos.jpg",
  "./images/phobos.jpg",
  marsDia / 5,
  "phobos",
  [marsDist, 0, 3]
);
const deimos = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  marsDia / 5,
  "deimos",
  [marsDist, 0, 4]
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
//moons = [[], [], [moon], [phobos, deimos]];

// Click Events
// Raycaster (handles object click events)

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function renderRay() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  const mbstat = document.getElementById("mbox");
  const mframe = document.getElementById("mbframe");
  mbstat.innerHTML = "Loading wiki info...";
  mframe.style.visibility = "hidden";
  let srctxt = intersects[0].object.name;
  mframe.setAttribute("src", "https://en.wikipedia.org/wiki/" + srctxt);
  setTimeout(() => {
    mbstat.innerHTML = "";
    mframe.style.visibility = "visible";
  }, 2500);
  renderer.render(scene, camera);
}

// Object Click
window.addEventListener("click", function () {
  //window.requestAnimationFrame(renderRay);
});

// Menu Click
const menus = document.getElementsByClassName("menusel");
for (let ms of menus) {
  ms.addEventListener("click", function () {
    let evid = this.dataset.ind;
    let evposx = planets[evid].position.x + planetDias[evid];
    let evposy = planets[evid].position.y + planetDias[evid];
    let evposz = planets[evid].position.z + planetDias[evid];
    camera.position.set(evposx + 4, evposy + 2, evposz + 2);
    const mbstat = document.getElementById("mbox");
    const mframe = document.getElementById("mbframe");
    mbstat.innerHTML = "Loading wiki info...";
    mframe.style.visibility = "hidden";
    let srctxt = planets[evid].name;
    mframe.setAttribute("src", "https://en.wikipedia.org/wiki/" + srctxt);
    setTimeout(() => {
      mbstat.innerHTML = "";
      mframe.style.visibility = "visible";
    }, 1500);
  });
}

// Key Press Events
const infobox = document.getElementById("infobox");
let animIsPaused = true;
window.addEventListener("keydown", function (ev) {
  if (ev.code != "Space") {
    return;
  }
  animIsPaused = animIsPaused ? false : true;
  infobox.style.display = animIsPaused ? "grid" : "none";
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

const axisHelp = new THREE.AxesHelper(1000);
const gridHelp = new THREE.PolarGridHelper(1000, 10, 10);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
scene.add(axisHelp, gridHelp);

// Animation Loop

let delta = 0;

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y -= 0.001;
  for (let p of planets) {
    p.rotation.y += 0.01;
  }

  if (!animIsPaused) {
    // planets movement
    for (let i = 0; i < planets.length; i++) {
      let p = planets[i];
      p.position.x =
        sun.position.x + Math.sin(delta + i * 0.1) * planetDists[i];
      p.position.z =
        sun.position.z + Math.cos(delta + i * 0.1) * (planetDists[i] + 5);
    }
  }

  // moons movement
  moon.position.x = earth.position.x - Math.sin(delta + 1) * 2;
  moon.position.z = earth.position.z - Math.cos(delta + 1) * 3;
  moon.rotation.y += 0.01;

  phobos.position.x = mars.position.x - Math.sin(delta + 1) * 2;
  phobos.position.z = mars.position.z - Math.cos(delta + 1) * 3;
  phobos.rotation.y += 0.01;

  deimos.position.x = mars.position.x - Math.sin(delta + 1) * 3;
  deimos.position.z = mars.position.z - Math.cos(delta + 1) * 4;
  deimos.rotation.y += 0.01;

  delta += 0.005;

  renderer.render(scene, camera);
}

animate();
