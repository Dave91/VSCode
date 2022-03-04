import './style.css';
import * as THREE from 'three';
import { FlatShading } from 'three';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Moving Light

const mouse = new THREE.Vector2();

function onMouseMove(event) {
	// calc mouse pos in normalized device coords
	// (-1 to +1)
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  pointLight.position.x = mouse.x;
  pointLight.position.y = mouse.y;
  renderer.render(scene, camera);
}

window.addEventListener('mousemove', onMouseMove, false);

// Background, Light, Controls

const bgTexture = new THREE.TextureLoader()
  .load('./space.jpg');
scene.background = bgTexture;

// Toggle directLight

function toggleLights(event) {
  const toggleBtn = document.getElementById('toggle-btn');
  if (directLight) {
    toggleBtn.value = "Light Mode";
    scene.remove(directLight);
    directLight = null;
  } else {
    toggleBtn.value = "Dark Mode";
    directLight = new THREE.DirectionalLight(0xffffff, 1);
    directLight.position.set(0, 0, 2)
    scene.add(directLight);
  }
  renderer.render(scene, camera);
}

var directLight = null;

document.getElementById('toggle-btn').addEventListener('click', toggleLights, false);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 1);
scene.add(pointLight);

// Plane

const planeTexture = new THREE.TextureLoader()
  .load('./space.jpg');
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 15, 40, 30),
  new THREE.MeshPhongMaterial({
    map: planeTexture,
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading
  })
);

scene.add(plane);

const { array } = plane.geometry.attributes.position;
for (let i = 0; i < array.length; i += 3) {
  const x = array[i];
  const y = array[i + 1];
  const z = array[i + 2];
  array[i] = x + (Math.random() - 0.25);
  array[i + 1] = y + (Math.random() - 0.25);
  array[i + 2] = z + Math.random();
}

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Resize Event

window.addEventListener('resize', onWindResize, false);

function onWindResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}
