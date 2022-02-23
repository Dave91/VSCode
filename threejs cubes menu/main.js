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

// Event handling, raycaster, camera update

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function renderRay() {
  // mouse pos camera to pick object clicked
	raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects( scene.children );
  if (intersects[ 0 ].object.name) {
    var answer = window.confirm("Do you wish to open link on new tab?");
    if (answer === false) {
      return;
    }
  }

	if (intersects[ 0 ].object.name === "menu1") {
    window.open("./rolam2.jpg");
	}
  if (intersects[ 0 ].object.name === "menu2") {
    window.open("./rolam2.jpg");
	}
  if (intersects[ 0 ].object.name === "menu3") {
    window.open("./rolam2.jpg");
	}
  if (intersects[ 0 ].object.name === "menu4") {
    window.open("./rolam2.jpg");
	}
	renderer.render(scene, camera);
}

function onMouseClick(event) {
	// calc mouse pos in normalized device coords
	// (-1 to +1)
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	window.requestAnimationFrame(renderRay);
}

window.addEventListener('click', onMouseClick, false);

// Background, Light, Controls

const bgTexture = new THREE.TextureLoader()
  .load('./bannerlight.jpg');
scene.background = bgTexture;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;

// Text Labels

function createTextLabel(text, x, y, z, id) {
  const loader = new THREE.FontLoader();
  loader.load('./ADayInAutumn_Medium.json', function (font) {
    // TextGeometry(String, Object)
    const textObj = new THREE.TextGeometry(text, {
        font: font,
        size: 1,
        height: 0.1,
        curveSegments: 4,
    });
    const labelTexture = new THREE.TextureLoader()
      .load('./space.jpg');
    const material = new THREE.MeshBasicMaterial({ map: labelTexture });
    const mesh = new THREE.Mesh(textObj, material);
    mesh.name = id;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    scene.add(mesh);
  });
}

createTextLabel("menu1", 4, 0, 4, "menu1");
createTextLabel("menu2", -5, 3, 2, "menu2");
createTextLabel("menu3", -15, 3, 0, "menu3");
createTextLabel("menu4", 3, 3, 15, "menu4");

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Resize, scaling

window.addEventListener('resize', onWindResize, false);

function onWindResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}
