const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');

let scale = 1; // 👈 MOVER PRA CÁ

// Centro e tamanho do relógio
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 150;
function drawClockFace() {
    ctx.save();

    ctx.translate(centerX, centerY);

    // ✓ ESCALA
    ctx.scale(scale, scale);

    ctx.fillStyle = '#ddd';
    ctx.beginPath();
    ctx.arc(0, 0, radius + 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
}
function drawNumbers() {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.fillStyle = "#333";
    ctx.font = "22px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let num = 1; num <= 12; num++) {
        let angle = num * Math.PI / 6;
        ctx.save();
        // gira até posição
        ctx.rotate(angle);
        // vai pra borda
        ctx.translate(0, -radius + 30);

        // desfaz rotação do texto (pra não ficar torto)
        ctx.rotate(-angle);
        ctx.fillText(num.toString(), 0, 0);
        ctx.restore();
    }
    ctx.restore();
}
function drawHand(angle, length, width, color) {
    ctx.save();

    //  origem já está no centro (por translate)
    ctx.translate(centerX, centerY);

    //  ROTAÇÃO (ponto fixo no centro)
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.restore();
}
function drawHands() {
    const now = new Date();

    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours() % 12;

    const secAngle = sec * Math.PI / 30;
    const minAngle = (min + sec / 60) * Math.PI / 30;
    const hrAngle = (hr + min / 60) * Math.PI / 6;

    drawHand(hrAngle, radius * 0.5, 6, "#333");
    drawHand(minAngle, radius * 0.7, 4, "#555");
    drawHand(secAngle, radius * 0.9, 2, "red");
}
function animate() {
    //  RESET DA MATRIZ
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawClockFace();
    drawNumbers();
    drawHands();

    requestAnimationFrame(animate);
}
animate();
canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(0.5, scale), 2);
});