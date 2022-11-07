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

// Modal Intro

const modal = document.getElementById("modal");
modal.addEventListener("click", function () {
  modal.style.display = "none";
})

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

function createObj(objText, objNorm, objDia, objXYZ) {
  let obj = new THREE.Mesh(
    new THREE.SphereGeometry(objDia, 64, 64),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(objText),
      normalMap: new THREE.TextureLoader().load(objNorm),
    })
  );
  scene.add(obj);
  obj.position.set(objXYZ[0], objXYZ[1], objXYZ[2]);
  return obj;
}

// Sun
const sun = createObj("./images/sun.jpg", "", N / 2, [0, 0, 0]);

// Planets
const mercury = createObj(
  "./images/mercury.jpg",
  "./images/mercury.jpg",
  mercuryDia,
  [mercuryDist, 0, 0]
);
const venus = createObj("./images/venus.jpg", "./images/venus.jpg", venusDia, [
  venusDist,
  0,
  0,
]);
const earth = createObj(
  "./images/earthwithtopo.jpg",
  "./images/earthwithtopo.jpg",
  earthDia,
  [earthDist, 0, 0]
);
const mars = createObj("./images/mars.jpg", "./images/marsnorm.jpg", marsDia, [
  marsDist,
  0,
  0,
]);
const jupiter = createObj(
  "./images/jupiter.jpg",
  "./images/jupiter.jpg",
  jupiterDia,
  [jupiterDist, 0, 0]
);
const saturn = createObj(
  "./images/saturn.jpg",
  "./images/saturn.jpg",
  saturnDia,
  [saturnDist, 0, 0]
);
const uranus = createObj(
  "./images/uranus.jpg",
  "./images/uranus.jpg",
  uranusDia,
  [uranusDist, 0, 0]
);
const neptune = createObj(
  "./images/neptune.jpg",
  "./images/neptune.jpg",
  neptuneDia,
  [neptuneDist, 0, 0]
);

// Moons
// Earth Moon
const moon = createObj(
  "./images/moon.jpg",
  "./images/moonnorm.jpg",
  earthDia / 5,
  [earthDist, 0, 2]
);
// Mars moons
const phobos = createObj(
  "./images/phobos.jpg",
  "./images/phobos.jpg",
  marsDia / 5,
  [marsDist, 0, 2]
);
const deimos = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  marsDia / 5,
  [marsDist, 0, 3]
);
// Jupiter moons
const io = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  jupiterDia / 20,
  [jupiterDist, 0, 4]
);
const europa = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  jupiterDia / 20,
  [jupiterDist, 0, 5]
);
const ganymedes = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  jupiterDia / 20,
  [jupiterDist, 0, 6]
);
const callisto = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  jupiterDia / 20,
  [jupiterDist, 0, 7]
);
// Saturn moons
const thetis = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  saturnDia / 20,
  [saturnDist, 0, 4]
);
const dione = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  saturnDia / 20,
  [saturnDist, 0, 5]
);
const rhea = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  saturnDia / 20,
  [saturnDist, 0, 6]
);
const titan = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  saturnDia / 20,
  [saturnDist, 0, 7]
);
const japetu = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  saturnDia / 20,
  [saturnDist, 0, 8]
);
// Uranus moons
const miranda = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  uranusDia / 18,
  [uranusDist, 0, 4]
);
const ariel = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  uranusDia / 18,
  [uranusDist, 0, 5]
);
const umbriel = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  uranusDia / 18,
  [uranusDist, 0, 6]
);
const titania = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  uranusDia / 18,
  [uranusDist, 0, 7]
);
const oberon = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  uranusDia / 18,
  [uranusDist, 0, 8]
);
// Neptune moons
const triton = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  neptuneDia / 18,
  [neptuneDist, 0, 4]
);
const nereida = createObj(
  "./images/deimos.jpg",
  "./images/deimos.jpg",
  neptuneDia / 18,
  [neptuneDist, 0, 5]
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
function loadInfoTxt(infofile) {
  let request = new XMLHttpRequest();
  request.open("GET", "./info/" + infofile + ".txt", true);
  request.responseType = "blob";
  request.onerror = function () {
    console.log(request.error);
  };
  request.onload = function () {
    let reader = new FileReader();
    reader.readAsText(request.response);
    reader.onerror = function () {
      console.log(reader.error);
    };
    reader.onload = function () {
      infotxt.innerHTML = reader.result;
    };
  };
  request.send();
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
  animIsPaused = animIsPaused ? false : true;
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

const axisHelp = new THREE.AxesHelper(1000);
const gridHelp = new THREE.PolarGridHelper(1000, 10, 10);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
scene.add(axisHelp, gridHelp);

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
}

animate();
