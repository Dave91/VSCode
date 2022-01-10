import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mapLinear } from 'three/src/math/MathUtils';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Raycaster (for event handling)

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function renderRay() {
	// update picking ray with camera and mouse pos
	raycaster.setFromCamera( mouse, camera );

	// calc obj intersecting picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	if (intersects[ 0 ].object.name === "m1") {
		window.open("https://en.wikipedia.org/wiki/Moon");
	} else {
		if (intersects[ 0 ].object.name === "m2") {
			window.open("https://www.google.hu/intl/hu/earth/"); 
		} else {
			if (intersects[ 0 ].object.name === "m3") {
				window.open("https://en.wikipedia.org/wiki/Mars");
			}
		}
	}
	console.log(intersects[ 0 ].object.name)
	renderer.render( scene, camera );
}

// Events

function onMouseClick( event ) {
	// calc mouse pos in normalized device coords
	// (-1 to +1)
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	window.requestAnimationFrame(renderRay);
}

window.addEventListener( 'click', onMouseClick, false );

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight)

// for a simpler zoom in, zoom out, no rotation
// const controls = new OrbitControls(camera, renderer.domElement);

// Stars

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xfffff5 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(250).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('bg4.jpg');
scene.background = spaceTexture;

// Moon1

const moon1Texture = new THREE.TextureLoader().load('moon.jpg');
const normal1Texture = new THREE.TextureLoader().load('normal.jpg');

const moon1 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moon1Texture,
    normalMap: normal1Texture,
  })
);

scene.add(moon1);
moon1.name = "m1"
moon1.position.z = -5;
moon1.position.x = 2;

// Earth (moon2)

const moon2Texture = new THREE.TextureLoader().load('earthwithtopo.jpg');
const normal2Texture = new THREE.TextureLoader().load('earthwithtopo.jpg');

const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moon2Texture,
    normalMap: normal2Texture,
  })
);

scene.add(moon2);
moon2.name = "m2"
moon2.position.z = 6;
moon2.position.x = -4;

// Mars (moon3)

const moon3Texture = new THREE.TextureLoader().load('space.jpg');
const normal3Texture = new THREE.TextureLoader().load('bgblackwhite.jpeg');

const moon3 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moon3Texture,
    normalMap: normal3Texture,
  })
);

scene.add(moon3);
moon3.name = "m3"
moon3.position.z = 30;
moon3.position.setX(-10);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon1.rotation.x += 0.075;
  moon1.rotation.y += 0.01;
  moon1.rotation.z += 0.05;

  moon2.rotation.y += 0.05;
  moon2.rotation.z += 0.01;

	moon3.rotation.x += 0.075;
  moon3.rotation.y += 0.05;
  moon3.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  moon1.rotation.x += 0.005;
  moon2.rotation.x += 0.005;
	moon3.rotation.x += 0.005;

  // for a simpler zoom in, zoom out, no rotation
  // controls.update();

  renderer.render(scene, camera);
}

animate();
