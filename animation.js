const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Particle properties
const numParticles = 175;
const particles = [];
const colors = ['#FF6347', '#FFD700', '#32CD32', '#1E90FF', '#DA70D6','red','black'];

// Helper function to generate random numbers within a range
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Particle class
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = randomRange(9, 9);
    this.dx = randomRange(-2.5, 2.5);
    this.dy = randomRange(-2.5, 2.5);
    this.gravity = 0.07;
    this.opacity = 1.5;
  }

  update() {
    this.dy += this.gravity;
    this.x += this.dx;
    this.y += this.dy;
    this.opacity -= 0.01;

    if (this.opacity <= 0) {
      this.opacity = 0;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.closePath();
  }
}

// Animation function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.opacity > 0) {
      particle.update();
      particle.draw();
    } else {
      particles.splice(index, 1);
    }
  });

  // Request next animation frame
  requestAnimationFrame(draw);
}

// Click event to create particle explosion
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  for (let i = 0; i < numParticles; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particle = new Particle(clickX, clickY, color);
    particles.push(particle);
  }
});

// Draw the text in the middle of the canvas
function drawText() {
  const instructionsDiv = document.createElement('div');
  instructionsDiv.innerText = 'Click anywhere in the box.';
  instructionsDiv.style.position = 'absolute';
  instructionsDiv.style.top = `${canvas.height / 16}px`;
  instructionsDiv.style.left = `${canvas.width / 1.3}px`;
  instructionsDiv.style.fontSize = '28px';
  instructionsDiv.style.fontFamily = 'Arial';
  instructionsDiv.style.color = 'blue';
  instructionsDiv.style.filter = 'blur(1px)';
  instructionsDiv.style.userSelect = 'none';
  instructionsDiv.style.pointerEvents = 'none'; // To prevent text from intercepting clicks
  document.body.appendChild(instructionsDiv);
}

// Start the animation
draw();
drawText();
