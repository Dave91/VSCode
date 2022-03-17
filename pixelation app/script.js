const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const symbols = "0123456789QWERTZUIOPASDFGHJKLYXCVBNM";
const dropSize = 24;
const totalDrops = canvas.width / dropSize;
let particleArray = [];

function Particle() {
	this.x = Math.random() * canvas.width;
	this.y = 0;
	this.speed = Math.random() * 0.2 + 0.4;
}

Particle.prototype.update = function() {
	this.y += this.speed;
	if (this.y > canvas.height) {
		this.y = 0;
		this.x = Math.random() * canvas.width;
	}
}

Particle.prototype.draw = function() {
	context.fillStyle = "green";
	context.font = dropSize + "px monospace";
	context.textAlign = "center";
	let char = symbols.charAt(Math.floor(Math.random() * symbols.length));
	context.fillText(char, this.x, this.y * (dropSize / 2));
	context.fill();
}

function init() {
	for (let i = 0; i < totalDrops; i++) {
		particleArray.push(new Particle);
	}
}

init();

// anim loop
function animate() {
	context.fillStyle = "rgba(0, 0, 0, 0.05)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	for (let particle of particleArray) {
		particle.update();
		particle.draw();
	}
	requestAnimationFrame(animate);
}

animate();
