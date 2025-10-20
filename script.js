const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
let hearts = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Khi nhấn nút Play
document.getElementById("playMusic").addEventListener("click", () => {
  const audio = document.getElementById("bgMusic");
  audio.play();
  startHearts();
});

function startHearts() {
  for (let i = 0; i < 30; i++) {
    hearts.push(new Heart());
  }
  animate();
}

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 20 + 10;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size / 20, this.size / 20);
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.bezierCurveTo(10, -20, 20, 0, 0, 20);
    ctx.bezierCurveTo(-20, 0, -10, -20, 0, -10);
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 105, 180, ${this.alpha})`;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y -= this.speedY;
    this.alpha -= 0.005;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, i) => {
    heart.update();
    heart.draw();
    if (heart.alpha <= 0) {
      hearts[i] = new Heart();
    }
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
