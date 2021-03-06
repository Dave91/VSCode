const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
let particleArray;

const content1 = document.getElementById("cont1");
const content2 = document.getElementById("cont2");
const content3 = document.getElementById("cont3");
const content4 = document.getElementById("cont4");

const menuBtn1 = document.getElementById("m-btn-1");
const menuBtn2 = document.getElementById("m-btn-2");
const menuBtn3 = document.getElementById("m-btn-3");
const menuBtn4 = document.getElementById("m-btn-4");

const menuChkb = document.getElementById("m-chkb");
const menuNum1 = document.getElementById("m-num-1");
const menuNum2 = document.getElementById("m-num-2");
var toggleAnim = true;
var setPartsTotal = menuNum1.value;
var setPartsSize = menuNum2.value;

// smaller memory usage when not using class decl??
// can be compared to similar, but classed canvas stuff
// construct
function Particle(id, x, y, dirX, dirY, size) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.speed = size / 25;
	this.dirX = dirX + this.speed;
	this.dirY = dirY + this.speed;
	this.size = size;
	this.color = "white";
}

// draw & update methods addef to Particle proto
Particle.prototype.draw = function() {
	context.beginPath();
	context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
	context.strokeStyle = this.color;
	context.stroke();
}

Particle.prototype.update = function() {
	if (this.x + this.size > canvas.width || this.x - this.size < 0) {
		particleArray.splice(this.id, 1, new Particle(this.id, canvas.width / 2, this.y, - this.dirX, this.dirY, this.size));
	}
	if (this.y + this.size > canvas.height || this.y - this.size < 0) {
		particleArray.splice(this.id, 1, new Particle(this.id, this.x, canvas.height / 2, this.dirX, - this.dirY, this.size));
	}
	this.x += this.dirX;
	this.y += this.dirY;
	this.draw();
}

// init anim, fill up array
function init() {
	particleArray = [];
	for (let i = 0; i < setPartsTotal; i++) {
		let id = i;
		let size = Math.random() * setPartsSize;
		let x = Math.random() * (innerWidth - size * 2);
		let y = Math.random() * (innerHeight - size * 2);
		let dirX = (Math.random() * 0.6) - 0.3;
		let dirY = (Math.random() * 0.6) - 0.3;
		particleArray.push(new Particle(id, x, y, dirX, dirY, size));
	}
}

init();

// animation loop
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

// event handlers
window.addEventListener("resize", function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

function onInputChange() {
	if (menuChkb.checked) {
		toggleAnim = true;
	} else {toggleAnim = false;}
	setPartsTotal = menuNum1.value;
	setPartsSize = menuNum2.value;
	init();
}

menuChkb.addEventListener("change", onInputChange, false);
menuNum1.addEventListener("change", onInputChange, false);
menuNum2.addEventListener("change", onInputChange, false);

function onMenuClick(event) {
	let contHideCss = "width: 45%; top: 50rem; background: navajowhite; max-height: 38%;";
	let contShowCss = "width: 90%; top: 5rem; background: rgba(255, 150, 50, 0.5); max-height: 83%;";
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
