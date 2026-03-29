const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');

// Centro e tamanho do relógio
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 150;

function drawClockFace() {
    ctx.save();
    
    // ✓ TRANSLAÇÃO: Move a origem para o centro do canvas
    ctx.translate(centerX, centerY);
    
    // Circulo de sombra (efeito visual)
    ctx.fillStyle = '#ddd';
    ctx.beginPath();
    ctx.arc(0, 0, radius + 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Fundo branco do relógio
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Borda do relógio
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
}
