const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');

let scale       = 1;
let scaleTarget = 1;
let lastSec     = -1;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius  = 150;

function drawClockFace() {
    ctx.save();
    ctx.translate(centerX, centerY);

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

    for (let i = 0; i < 60; i++) {
        ctx.save();
        ctx.rotate(i * Math.PI / 30);
        ctx.translate(0, -radius + 8);
        ctx.fillStyle = i % 5 === 0 ? '#333' : '#aaa';
        const size = i % 5 === 0 ? 4 : 2;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    ctx.restore();
}

function drawNumbers() {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.fillStyle = "#333";
    ctx.font = "bold 20px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let num = 1; num <= 12; num++) {
        let angle = num * Math.PI / 6;
        ctx.save();
        ctx.rotate(angle);
        ctx.translate(0, -radius + 30);
        ctx.rotate(-angle);
        ctx.fillText(num.toString(), 0, 0);
        ctx.restore();
    }

    ctx.restore();
}

function drawHand(length, width, color) {
    ctx.save();
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
    const hr  = now.getHours() % 12;

    const secAngle = sec * Math.PI / 30;
    const minAngle = (min + sec / 60) * Math.PI / 30;
    const hrAngle  = (hr  + min / 60) * Math.PI / 6;

    ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(hrAngle);
        drawHand(radius * 0.5, 6, "#333");
    ctx.restore();

    ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(minAngle);
        drawHand(radius * 0.7, 4, "#555");
    ctx.restore();

    ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(secAngle);
        drawHand(radius * 0.9, 2, "red");
    ctx.restore();

    ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();
    ctx.restore();
}

function animate() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sec = new Date().getSeconds();
    if (sec === 0 && lastSec !== 0) {
        scaleTarget = 1.4;
        setTimeout(() => { scaleTarget = 1; }, 600);
    }
    lastSec = sec;

    scale += (scaleTarget - scale) * 0.08;

    ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);
        ctx.translate(-centerX, -centerY);

        drawClockFace();
        drawNumbers();
        drawHands();
    ctx.restore();

    requestAnimationFrame(animate);
}

animate();