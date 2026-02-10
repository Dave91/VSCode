const m = document.getElementById("habitat").getContext("2d");

const draw = (x, y, c, s) => {
  m.fillStyle = c;
  m.fillRect(x, y, s, s);
};

const particles = [];
const particle = (x, y, c) => {
  return { x: x, y: y, vx: 0, vy: 0, color: c };
};

const random = () => {
  return Math.random() * 650 + 75;
};

const create = (number, color) => {
  const group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group;
};

const rule = (particles1, particles2, g) => {
  for (let p1 of particles1) {
    let fx = 0;
    let fy = 0;
    for (let p2 of particles2) {
      let dx = p1.x - p2.x;
      let dy = p1.y - p2.y;
      let d = Math.hypot(dx, dy);
      if (d > 0 && d < 80) {
        let f = (g * 1) / d;
        fx += f * dx;
        fy += f * dy;
      }
    }
    p1.vx = (p1.vx + fx) * 0.5;
    p1.vy = (p1.vy + fy) * 0.5;
    p1.x += p1.vx;
    p1.y += p1.vy;
    if (p1.x <= 5 || p1.x >= 795) {
      p1.vx *= -1;
      p1.x += p1.vx;
    }
    if (p1.y <= 5 || p1.y >= 795) {
      p1.vy *= -1;
      p1.y += p1.vy;
    }
  }
};

const yellow = create(500, "yellow");
const red = create(200, "red");
const green = create(200, "green");
const scale = 1; // def 1 (0.5 - 1.5)
const fratio = 0.2; // def 1 (0.05 - 1.05)

const update = () => {
  rule(green, green, -0.32 * fratio);
  rule(green, red, -0.17 * fratio);
  rule(green, yellow, 0.34 * fratio);
  rule(red, red, -0.1 * fratio);
  rule(red, green, -0.34 * fratio);
  rule(yellow, yellow, 0.15 * fratio);
  rule(yellow, green, -0.2 * fratio);
  m.clearRect(0, 0, 800, 800);
  draw(0, 0, "black", 800);
  for (let p of particles) {
    draw(p.x, p.y, p.color, 5 * scale);
  }
  requestAnimationFrame(update);
};

update();
