import './style.css';
import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Background, Light, Controls

const bgTexture = new THREE.TextureLoader()
  .load('./space.jpg');
scene.background = bgTexture;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 1);
scene.add(pointLight);

// Asteroids

var asteroidArray = [];
function addAsteroid() {
  const geometry = new THREE.SphereGeometry(0.5, 4, 4);
  const material = new THREE.MeshStandardMaterial({ metalness: true });
  const asteroid = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(10));

  asteroid.position.set(x, y, z);
  asteroidArray.push(asteroid);
  scene.add(asteroid);
  asteroid.name = "asteroid"
}

Array(50).fill().forEach(addAsteroid);

// Events

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
var mouseDown = false;

function renderRay() {
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children);
  const targetObj = intersects[0].object;
  
  asteroidArray.forEach(function(asteroid) {
    if (targetObj.position.x < asteroid.position.x) {
      asteroid.position.x += 0.01;
    }
    if (targetObj.position.x > asteroid.position.x) {
      asteroid.position.x -= 0.01;
    }
    if (targetObj.position.y < asteroid.position.y) {
      asteroid.position.y += 0.01;
    }
    if (targetObj.position.y > asteroid.position.y) {
      asteroid.position.y -= 0.01;
    }
    if (targetObj.position.z < asteroid.position.z) {
      asteroid.position.z += 0.01;
    }
    if (targetObj.position.z > asteroid.position.z) {
      asteroid.position.z -= 0.01;
    }
  });
	renderer.render( scene, camera );
}

function onMouseDown(event) {
  mouseDown = true;
}

function onMouseUp(event) {
  mouseDown = false;
}

window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  if (mouseDown) {
    window.requestAnimationFrame(renderRay);
  }
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
