const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
}

const symbols =
  "0123456789QWERTZUIOPASDFGHJKLYXCVBNMアイウエオカキクケコサシスセソガギグゲゴパピプペポ";
const dropSize = 18;
let drops = [];

function init() {
  const dropsTotal = Math.floor(canvas.width / dropSize);
  drops = [];
  for (let d = 0; d < dropsTotal; d++) {
    drops[d] = Math.random() * -100;
  }
}

function draw() {
  context.fillStyle = "rgba(0, 0, 0, 0.05)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#0F0";
  context.font = dropSize + "px monospace";
  context.textAlign = "center";
  for (let d = 0; d < drops.length; d++) {
    const char = symbols.charAt(Math.floor(Math.random() * symbols.length));
    context.fillText(char, d * dropSize, drops[d] * dropSize);
    if (drops[d] * dropSize > canvas.height && Math.random() > 0.975) {
      drops[d] = 0;
    }
    drops[d]++;
  }
	//requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
resize();
setInterval(draw, 30);
