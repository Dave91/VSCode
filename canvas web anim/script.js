const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
let particleArray;

const image1 = new Image();
image1.src = "space.jpg";

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
	context.fillStyle = this.color;
	context.fill();
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

// animation loop
function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, innerWidth, innerHeight);
	for (let obj of particleArray) {
		obj.update();
	}
}

animate();

// Resize event handler
window.addEventListener("resize", function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});
