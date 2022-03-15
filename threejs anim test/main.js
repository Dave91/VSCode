import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;
camera.position.x = -3;

renderer.render(scene, camera);

// Background, Light, Controls

const bgTexture = new THREE.TextureLoader()
  .load('./Roland Mey Pixabay.jpg');
scene.background = bgTexture;

const pointLight = new THREE.PointLight(0xffff55);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

// Torus

const torusTexture = new THREE.TextureLoader()
  .load('./bgfulllight.jpg');
const torus = new THREE.Mesh(
  new THREE.TorusKnotGeometry(150, 15, 25, 100, 1, 2),
  new THREE.MeshStandardMaterial({ map: torusTexture })
);

scene.add(torus);

// Avatar

const avatarTexture = new THREE.TextureLoader()
  .load('./rolam.jpg');
const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: avatarTexture })
);

scene.add(avatar);
avatar.name = "avatar"
avatar.position.z = 4;
avatar.position.x = 4;
avatar.position.y = 0;
avatar.rotation.y -= 0.6

// Poet

const poetTexture = new THREE.TextureLoader()
  .load('./poet-pic.jpg');
const poet = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: poetTexture })
);

scene.add(poet);
poet.name = "poet"
poet.position.z = 2;
poet.position.x = -5;
poet.position.y = 3;

// Doggy

const doggyTexture = new THREE.TextureLoader()
  .load('./doggy.jpg');
const doggy = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: doggyTexture })
);

scene.add(doggy);
doggy.name = "doggy"
doggy.position.z = 0;
doggy.position.x = -15;

// Flower

const flowerTexture = new THREE.TextureLoader()
  .load('./flower.jpg');
const flower = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: flowerTexture })
);

scene.add(flower);
flower.name = "flower"
flower.position.z = 15;
flower.position.x = 3;

// Books

const bookTexture = new THREE.TextureLoader()
  .load('./book.jpg');
const book = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: bookTexture })
);

scene.add(book);
book.name = "book"
book.position.z = 25;
book.position.x = 5;
book.position.y = 3;

// Moon

const moonTexture = new THREE.TextureLoader()
  .load('./moon.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6, 30, 30),
  new THREE.MeshStandardMaterial({ map: moonTexture })
);

scene.add(moon);
moon.name = "moon"
moon.position.z = 23;
moon.position.x = -20;
moon.position.y = -2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  torus.rotation.x += 0.05;
  torus.rotation.y += 0.05;
  torus.rotation.z += 0.05;

  camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  poet.rotation.y += 0.002;
  doggy.rotation.x += 0.005;
  flower.rotation.z -= 0.003;
  book.rotation.y += 0.001;
  moon.rotation.y -= 0.005;

  controls.update();

  renderer.render(scene, camera);
}

window.addEventListener('resize', onWindResize, false);

function onWindResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}

animate();
