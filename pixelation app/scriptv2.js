const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
const textInput = document.getElementById("textInput");
let specialWords = ["MATRIX-IS-EVERYWHERE", "NEO", "WHITE-RABBIT"];

textInput.addEventListener("input", (e) => {
  if (e.target.value) {
    specialWords = [];
    specialWords.push(e.target.value);
  } else {
    specialWords = ["MATRIX-IS-EVERYWHERE", "NEO", "WHITE-RABBIT"];
  }
  inputTextArray.push(e.target.value);
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const symbols =
  "0123456789QWERTZUIOPASDFGHJKLYXCVBNMアイウエオカキクケコサシスセソガギグゲゴパピプペポ";
const dropSize = 18;
const dropsTotal = Math.floor(canvas.width / dropSize);
const drops = [];

for (let d = 0; d < dropsTotal; d++) {
  drops[d] = {
    y: Math.random() * -100,
    word: "",
    wordInd: 0,
  };
}

function draw() {
  context.fillStyle = "rgba(0, 0, 0, 0.05)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = dropSize + "px monospace";
  context.textAlign = "center";
  for (let d = 0; d < drops.length; d++) {
    let char;
    if (drops[d].word === "" && Math.random() > 0.999) {
      drops[d].word =
        specialWords[Math.floor(Math.random() * specialWords.length)];
      drops[d].wordInd = 0;
    }
    if (drops[d].word !== "") {
      char = drops[d].word.charAt(drops[d].wordInd);
      drops[d].wordInd++;
      if (drops[d].wordInd >= drops[d].word.length) {
        drops[d].word = "";
      }
      context.fillStyle = "#FFF";
    } else {
      char = symbols.charAt(Math.floor(Math.random() * symbols.length));
      context.fillStyle = "#0F0";
    }
    const x = d * dropSize + dropSize / 2;
    const y = drops[d].y * dropSize;
    context.fillText(char, x, y);
    if (y > canvas.height && Math.random() > 0.975) {
      drops[d].y = 0;
    }
    drops[d].y++;
  }
  //requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
setInterval(draw, 30);
