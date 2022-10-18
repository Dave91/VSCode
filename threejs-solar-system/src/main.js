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

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 0, -50);
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
const neptunDia = N / 28.1;

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
const neptunDist = (N * 3230) / scaleDown;

// Sun

const sunTexture = new THREE.TextureLoader().load("./images/normal.jpg");
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(N, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0xffff55,
    normalMap: sunTexture,
  })
);

scene.add(sun);
sun.name = "sun";
sun.position.set(-50, 0, 0);
// sun should be x=0 later??

// Mercury

const mercuryTexture = new THREE.TextureLoader().load("./images/mars.jpg");
const mercuryNormal = new THREE.TextureLoader().load("./images/marsnorm.jpg");

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(mercuryDia, 32, 32),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
    normalMap: mercuryNormal,
  })
);

scene.add(mercury);
mercury.name = "mercury";
mercury.position.set(-20, 0, 0);

// Venus

const venusTexture = new THREE.TextureLoader().load("./images/mars.jpg");
const venusNormal = new THREE.TextureLoader().load("./images/marsnorm.jpg");

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(venusDia, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
    normalMap: venusNormal,
  })
);

scene.add(venus);
venus.name = "venus";
venus.position.set(-10, 0, 0);

// Earth

const earthTexture = new THREE.TextureLoader().load(
  "./images/earthwithtopo.jpg"
);
const earthNormal = new THREE.TextureLoader().load(
  "./images/earthwithtopo.jpg"
);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormal,
  })
);

scene.add(earth);
earth.name = "earth";
//earth.position.set(5, 0, 0);

// Moon

const moonTexture = new THREE.TextureLoader().load("./images/moon.jpg");
const moonNormal = new THREE.TextureLoader().load("./images/normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormal,
  })
);

scene.add(moon);
moon.name = "moon";
//moon.position.set(0, 0, 0);

// Mars

const marsTexture = new THREE.TextureLoader().load("./images/mars.jpg");
const marsNormal = new THREE.TextureLoader().load("./images/marsnorm.jpg");

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(marsDia, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: marsNormal,
  })
);

scene.add(mars);
mars.name = "mars";
mars.position.set(10, 0, 0);

// Jupiter

const jupiterTexture = new THREE.TextureLoader().load("./images/mars.jpg");
const jupiterNormal = new THREE.TextureLoader().load("./images/marsnorm.jpg");

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(jupiterDia, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
    normalMap: jupiterNormal,
  })
);

scene.add(jupiter);
jupiter.name = "jupiter";
jupiter.position.set(20, 0, 0);

// Saturn

const saturnTexture = new THREE.TextureLoader().load("./images/mars.jpg");
const saturnNormal = new THREE.TextureLoader().load("./images/marsnorm.jpg");

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(saturnDia, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
    normalMap: saturnNormal,
  })
);

scene.add(saturn);
saturn.name = "saturn";
saturn.position.set(30, 0, 0);

// Uranus

const uranusTexture = new THREE.TextureLoader().load("./images/mars.jpg");
const uranusNormal = new THREE.TextureLoader().load("./images/marsnorm.jpg");

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(uranusDia, 32, 32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
    normalMap: uranusNormal,
  })
);

scene.add(uranus);
uranus.name = "mars";
uranus.position.set(40, 0, 0);

// Neptun

const neptunTexture = new THREE.TextureLoader().load("./images/mars.jpg");
const neptunNormal = new THREE.TextureLoader().load("./images/marsnorm.jpg");

const neptun = new THREE.Mesh(
  new THREE.SphereGeometry(neptunDia, 32, 32),
  new THREE.MeshStandardMaterial({
    map: neptunTexture,
    normalMap: neptunNormal,
  })
);

scene.add(neptun);
neptun.name = "neptun";
neptun.position.set(50, 0, 0);

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

// Animation Loop

let delta = 0;

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y -= 0.001;
  moon.rotation.y -= 0.005;
  earth.rotation.y += 0.005;
  mars.rotation.y -= 0.005;

  earth.position.x = sun.position.x + Math.sin(delta) * 25;
  earth.position.z = sun.position.z + Math.cos(delta) * 30;

  moon.position.x = earth.position.x + Math.sin(delta) * 4;
  moon.position.z = earth.position.z + Math.cos(delta) * 5;

  //jupiter.position.x = sun.position.x + Math.sin(delta) * 45;
  //jupiter.position.z = sun.position.z + Math.cos(delta) * 50;

  //saturn.position.x = sun.position.x + Math.sin(delta) * 55;
  //saturn.position.z = sun.position.z + Math.cos(delta) * 60;

  //uranus.position.x = sun.position.x + Math.sin(delta) * 65;
  //uranus.position.z = sun.position.z + Math.cos(delta) * 70;

  //neptun.position.x = sun.position.x + Math.sin(delta) * 75;
  //neptun.position.z = sun.position.z + Math.cos(delta) * 80;

  delta += 0.01;

  renderer.render(scene, camera);
}

animate();
