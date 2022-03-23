const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

const content1 = document.getElementById("cont1");
const content2 = document.getElementById("cont2");
const content3 = document.getElementById("cont3");
const content4 = document.getElementById("cont4");

const menuBtn1 = document.getElementById("m-btn-1");
const menuBtn2 = document.getElementById("m-btn-2");
const menuBtn3 = document.getElementById("m-btn-3");
const menuBtn4 = document.getElementById("m-btn-4");

const menuChkb = document.getElementById("m-chkb");
var toggleAnim = true;

let particleArray;

// construct
function Particle(id, x, y, dirX, dirY, size) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.speed = size / 25;
	this.dirX = dirX + this.speed;
	this.dirY = dirY + this.speed;
	this.size = size;
	let colors = ["white", "orange", "navy", "maroon", "black"];
	this.color = colors[Math.floor(Math.random() * 5.5)];
	this.action = "enlarge";
}

// draw & update
Particle.prototype.draw = function() {
	context.beginPath();
	context.rect(this.x, this.y, this.size, this.size);
	context.strokeStyle = this.color;
	context.stroke();
}

Particle.prototype.update = function() {
	// movements
	if (this.x + this.size > canvas.width || this.x < 0) {
		this.dirX = -this.dirX;
	}
	if (this.y + this.size > canvas.height || this.y < 0) {
		this.dirY = -this.dirY;
	}
	this.x += this.dirX;
	this.y += this.dirY;
	// size changes
	if (this.action === "enlarge") {
		this.size += 0.1;
	} else {
		this.size -= 0.1;
	}
	if (this.size >= 100) {
		this.action = "shrink";
	}
	if (this.size <= 1) {
		this.action = "enlarge";
	}
	this.draw();
}

// init
function init() {
	particleArray = [];
	for (let i = 0; i < 100; i++) {
		let id = i;
		let size = Math.random() * 10;
		let x = Math.random() * (innerWidth - size * 2);
		let y = Math.random() * (innerHeight - size * 2);
		let dirX = (Math.random() * 0.6) - 0.3;
		let dirY = (Math.random() * 0.6) - 0.3;
		particleArray.push(new Particle(id, x, y, dirX, dirY, size));
	}
}

init();

// anim loop
function animate() {
	requestAnimationFrame(animate);
	if (toggleAnim) {
		context.clearRect(0, 0, innerWidth, innerHeight);
		for (let obj of particleArray) {
			obj.update();
		}
	}
}

animate();

// events
window.addEventListener("resize", function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

function onInputChange() {
	if (menuChkb.checked) {
		toggleAnim = true;
	} else {toggleAnim = false;}
	init();
}

menuChkb.addEventListener("change", onInputChange, false);

function onMenuClick(event) {
	let contHideCss = "width: 15%; top: 50rem; background: navajowhite; max-height: 38%;";
	let contShowCss = "width: 90%; top: 5rem; background: rgba(255, 150, 50, 0.7); max-height: 83%;";
	content1.style = contHideCss;
	content2.style = contHideCss;
	content3.style = contHideCss;
	content4.style = contHideCss;
	menuBtn1.style = "border: 1px solid black;";
	menuBtn2.style = "border: 1px solid black;";
	menuBtn3.style = "border: 1px solid black;";
	menuBtn4.style = "border: 1px solid black;";

	if (event.target === menuBtn1) {
		menuBtn1.style = "border: 1px solid white;";
		content1.style = contShowCss;
	}
	if (event.target === menuBtn2) {
		menuBtn2.style = "border: 1px solid white;";
		content2.style = contShowCss;
	}
	if (event.target === menuBtn3) {
		menuBtn3.style = "border: 1px solid white;";
		content3.style = contShowCss;
	}
	if (event.target === menuBtn4) {
		menuBtn4.style = "border: 1px solid white;";
		content4.style = contShowCss;
	}
}

menuBtn1.addEventListener("click", onMenuClick, false);
menuBtn2.addEventListener("click", onMenuClick, false);
menuBtn3.addEventListener("click", onMenuClick, false);
menuBtn4.addEventListener("click", onMenuClick, false);

canvas.onmousemove = animCubes;
function animCubes (event) {
	var cube = document.createElement("div");
	cube.setAttribute("class", "cubes");
	document.body.appendChild(cube);
	cube.style.left = event.offsetX + "px";
	cube.style.top = event.offsetY + "px";
	let rs = Math.round(Math.random() * 20) + 10;
	cube.style.width = rs + "px";
	cube.style.height = rs + "px";
	let rd = Math.round(Math.random() * 180) - 90;
	cube.style.transform = "rotateZ(" + rd + "deg)";
	cube.style.opacity = "0";
	setTimeout(function() {
		cube.remove();
	}, 1000);
}
