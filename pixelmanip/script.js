const image1 = new Image();
image1.src = "space.jpg";

image1.addEventListener('load', function() {
	const canvas = document.getElementById('canvas1');
	const context = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	context.drawImage(image1, 0, 0, canvas.width, canvas.height);
	const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
	context.clearRect(0, 0, canvas.width, canvas.height);

	let particleArray = [];
	const totalParticles = 3000;
	
	// mapping pixel rgb values row*col
	let mappedImage = [];
	for (let y = 0; y < canvas.height; y++) {
		let row = [];
		for (let x = 0; x < canvas.width; x++) {
			const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
			const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
			const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
			const brightness = calcRelativeBrightness(red, green, blue);
			const cell = [cellBrightness = brightness,];
			row.push(cell);
		}
		mappedImage.push(row);
	}

	function calcRelativeBrightness(red, green, blue) {
		return Math.sqrt((red * red) * 0.299 + (green * green) * 0.587 + (blue * blue) * 0.114) / 100;
	}

	class Particle {
		constructor() {
			this.size = Math.random() * 5 + 1;
			this.x = Math.random() * canvas.width;
			this.y = 0;
			this.posRowY = Math.floor(this.y);
			this.posColX = Math.floor(this.x);
			this.speed = 0;
			this.velocity = Math.random() * 2.5;
		}
		update() {
			this.posRowY = Math.floor(this.y);
			this.posColX = Math.floor(this.x);
			this.speed = mappedImage[this.posRowY][this.posColX][0];
			let move = (1.5 - this.speed) + this.velocity;
			this.y += move;
			if (this.y >= canvas.height) {
				this.y = 0;
				this.x = Math.random() * canvas.width;
			}
		}
		draw() {
			context.beginPath();
			context.fillStyle = "lightblue";
			context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			context.fill();
		}
	}
	function init() {
		for (let i = 0; i < totalParticles; i++) {
			particleArray.push(new Particle);
		}
	}
	init();
	// anim loop
	function animate() {
		context.globalAlpha = 0.5;
		context.fillStyle = "rgb(25, 25, 50)";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.globalAlpha = 1.5;
		for (let particle of particleArray) {
			particle.update();
			context.globalAlpha = particle.speed * 0.5;
			particle.draw();
		}
		requestAnimationFrame(animate);
	}
	animate();
});
