const canvas = document.getElementById("neonCanvas");
const ctx = canvas.getContext("2d");


function resize() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();


class NeonWave {
constructor(color1, color2, amp, speed, offset) {
this.color1 = color1;
this.color2 = color2;
this.amp = amp;
this.speed = speed;
this.offset = offset;
}
draw(t) {
const w = canvas.width;
const h = canvas.height;


ctx.lineWidth = 3;
const gradient = ctx.createLinearGradient(0, 0, w, 0);
gradient.addColorStop(0, this.color1);
gradient.addColorStop(1, this.color2);
ctx.strokeStyle = gradient;


ctx.beginPath();
for (let x = 0; x < w; x++) {
const y = h * 0.5 + Math.sin((x * 0.004) + t * this.speed + this.offset) * this.amp;
ctx.lineTo(x, y);
}
ctx.stroke();
}
}


const waves = [
new NeonWave("#7d35ff", "#8f4bff", 90, 0.002, 0),
new NeonWave("#6f3bff", "#4ad0ff", 70, 0.0025, 1),
new NeonWave("#3dbdff", "#8f4bff", 110, 0.0018, 2.2),
new NeonWave("#8e3aff", "#ff53f5", 55, 0.003, 3.5),
// Linha adicional: menor, blur, diagonal
new NeonWave("#4ad0ff", "#7d35ff", 40, 0.0015, 4.5)
];


function animate(t) {
ctx.clearRect(0, 0, canvas.width, canvas.height);


ctx.globalCompositeOperation = "lighter";
// fundo diagonal com blur (linha completa)
ctx.save();
ctx.filter = "blur(8px)";
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.rotate(-0.5);
ctx.translate(-canvas.width / 2, -canvas.height / 2);
waves.slice(-1)[0].draw(t);
ctx.restore();


// ondas principais
waves.slice(0, -1).forEach(w => w.draw(t));(w => w.draw(t));


requestAnimationFrame(animate);
}


animate(0);