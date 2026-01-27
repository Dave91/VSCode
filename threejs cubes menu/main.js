import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//import troika-three-text: a good alternative for rendering text

// Setup

const scene = new THREE.Scene();
const bgTexture = new THREE.TextureLoader().load("./bannerlight.jpg");
scene.background = bgTexture;
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.set(0, 0, 35);

// Lights

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(25, 50, 25); //10,10,10
scene.add(pointLight);

// raycaster setup

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function renderRay() {
  // mouse pos camera to pick object clicked
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  let sect = null;
  if (intersects[0].object.userData.id === "rolam") {
    sect = "rolam";
  }
  if (intersects[0].object.userData.id === "versek") {
    sect = "versek";
  }
  if (intersects[0].object.userData.id === "irasok") {
    sect = "irasok";
  }
  menu_anim = "out";
  document.getElementById(sect).className = "";
  renderer.render(scene, camera);
  controls.autoRotate = false;
}

function handleClickEvent(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const object = intersects[0].object;
    const sectionId = object.userData.id;

    if (sectionId) {
      console.log("Kiválasztva:", sectionId);
      // Itt hívhatod meg az animációdat vagy az oldalváltást
      handleMenuTransition(sectionId);
    }
  }
}

let menuAnim = "off";

// Menu elements

function createTextCube(text, color, position, id) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 512;
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = "Bold 80px Harrington";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.fillText(text, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.BoxGeometry(5, 5, 5);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(position.x, position.y, position.z);
  cube.userData = { id: id };
  scene.add(cube);
  return cube;
}

const menuItems = [
  createTextCube("ABOUT ME", "#ff4757", { x: -10, y: 0, z: 0 }, "rolam"),
  createTextCube("POEMS", "#2e86de", { x: 0, y: 5, z: 0 }, "versek"),
  createTextCube("BOOKS", "#2ed573", { x: 10, y: 0, z: 0 }, "irasok"),
];

/* function createTextLabel(text, x, y, z, id) {
  const loader = new THREE.FontLoader();
  loader.load("./ADayInAutumn_Medium.json", function (font) {
    // TextGeometry(String, Object)
    const textObj = new THREE.TextGeometry(text, {
      font: font,
      size: 2,
      height: 0.5,
      curveSegments: 6,
    });
    const labelTexture = new THREE.TextureLoader().load("./space.jpg");
    const material = new THREE.MeshBasicMaterial({ map: labelTexture });
    const mLabel = new THREE.Mesh(textObj, material);
    mLabel.name = id;
    mLabel.position.x = x;
    mLabel.position.y = y;
    mLabel.position.z = z;
    scene.add(mLabel);
  });
} */

function handleMenuTransition(id) {
  menuAnim = menuAnim === "off" ? "in" : "out";
  const target = document.getElementById(id);
  if (target) {
    target.className = "";
    controls.autoRotate = false;
    menuAnim = "out";
  }
}

window.addEventListener("click", handleClickEvent, false);

// Controls setup

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
//controls.dampingFactor = 0.05;
controls.autoRotate = false;
//controls.autoRotateSpeed = 0.5;
// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  menuItems.forEach((item) => {
    item.rotation.x += 0.001;
    item.rotation.y += 0.001;
    item.rotation.z += 0.001;
  });
  if (menuAnim === "in") {
    if (camera.rotation.y < 0) {
      camera.rotation.y += 0.05;
    }
  }
  if (menuAnim === "out") {
    if (camera.rotation.x < 1) {
      camera.rotation.x += 0.05;
    }
  }
  renderer.render(scene, camera);
}

animate();

// Resize event

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
