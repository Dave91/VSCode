const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const symbols = "0123456789QWERTZUIOPASDFGHJKLYXCVBNMアイウエオカキクケコサシスセソガギグゲゴパピプペポ";
const dropSize = 14;
const dropsTotal = canvas.width / dropSize;
const dropsArray = [];

function init() {
	for (let d = 0; d < dropsTotal; d++) {
		dropsArray[d] = 1;
	}
}

function update() {
	context.fillStyle = "rgba(0, 0, 0, 0.05)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "green";
	context.font = dropSize + "px monospace";
	context.textAlign = "center";
	for (let drop of dropsArray) {
		let char = symbols.charAt(Math.floor(Math.random() * symbols.length));
		context.fillText(char, drop * dropSize, dropsArray[drop] * dropSize);
		if (dropsArray[drop] * dropSize > canvas.height && Math.random() > 0.985) {
			dropsArray[drop] = 0;
		}
		dropsArray[drop]++;
	}
}

init();
setInterval(update, 30);
