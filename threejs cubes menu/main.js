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

renderer.render(scene, camera);

// Event handling, raycaster, camera update

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function renderRay() {
  // mouse pos camera to pick object clicked
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children);
  var sect = null;
  if (intersects[0].object.name === "rolam") {
    sect = "rolam"
  }
  if (intersects[0].object.name === "versek") {
    sect = "versek"
  }
  if (intersects[0].object.name === "irasok") {
    sect = "irasok"
  }
  menu_anim = "out"
  document.getElementById(sect).className = "";
	renderer.render(scene, camera);
  window.removeEventListener('mousemove', onMouseOver, false);
  controls.autoRotate = false;
  window.addEventListener('click', onMouseClick(sect), false);
}

function onMouseClick(sect) {
  return function() {
    menu_anim = "in";
    camera.rotation.y = -1.5;
    camera.rotation.x = 0;
    document.getElementById(sect).className = "hidden-cont";
    window.removeEventListener('click', onMouseClick, false);
    controls.autoRotate = true;
    window.addEventListener('mousemove', onMouseOver, false);
  };
}

function onMouseOver(event) {
	// calc mouse pos in normalized device coords
	// (-1 to +1)
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	window.requestAnimationFrame(renderRay);
}

window.addEventListener('mousemove', onMouseOver, false);

// Background, Light, Controls

const bgTexture = new THREE.TextureLoader()
  .load('./bannerlight.jpg');
scene.background = bgTexture;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5.0;
var menu_anim = "off"

// Text Labels

function createTextLabel(text, x, y, z, id) {
  const loader = new THREE.FontLoader();
  loader.load('./ADayInAutumn_Medium.json', function (font) {
    // TextGeometry(String, Object)
    const textObj = new THREE.TextGeometry(text, {
        font: font,
        size: 2,
        height: 0.5,
        curveSegments: 6,
    });
    const labelTexture = new THREE.TextureLoader()
      .load('./space.jpg');
    const material = new THREE.MeshBasicMaterial({ map: labelTexture });
    const mLabel = new THREE.Mesh(textObj, material);
    mLabel.name = id;
    mLabel.position.x = x;
    mLabel.position.y = y;
    mLabel.position.z = z;
    scene.add(mLabel);
  });
}

createTextLabel("About Me", 4, 0, 4, "rolam");
createTextLabel("Poems", -5, 3, 2, "versek");
createTextLabel("Publications", -15, 6, 0, "irasok");

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  if (menu_anim === "off") {
    camera.rotation.y = 0;
  }
  if (menu_anim === "in") {
    if (camera.rotation.y < 0) {
      camera.rotation.y += 0.01;
    }
  }
  if (menu_anim === "out") {
    if (camera.rotation.x < 1) {
      camera.rotation.x += 0.02;
    }
  }

  /*
  if (camera.rotation.y < 1.5) {
    camera.rotation.y += 0.005;
  } else {
    camera.rotation.y -= 2.5;
  } */
  //controls.update();
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
