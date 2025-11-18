// Get canvas and context
const canvas = document.getElementById('smileyCanvas');
const ctx = canvas.getContext('2d');

// Get slider elements
const eyeDistanceSlider = document.getElementById('eyeDistance');
const smileWidthSlider = document.getElementById('smileWidth');
const smileCurveSlider = document.getElementById('smileCurve');

// Get value display elements
const eyeDistanceValue = document.getElementById('eyeDistanceValue');
const smileWidthValue = document.getElementById('smileWidthValue');
const smileCurveValue = document.getElementById('smileCurveValue');

// Get download button
const downloadBtn = document.getElementById('downloadBtn');

// Smiley parameters
let eyeDistance = 80;
let smileWidth = 140;
let smileCurve = 50;

// Center of canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const faceRadius = 150;

// Function to draw the smiley face
function drawSmiley() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw face
    ctx.beginPath();
    ctx.arc(centerX, centerY, faceRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw eyes
    const eyeY = centerY - 30;
    const eyeRadius = 10;

    // Left eye
    ctx.beginPath();
    ctx.arc(centerX - eyeDistance / 2, eyeY, eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();

    // Right eye
    ctx.beginPath();
    ctx.arc(centerX + eyeDistance / 2, eyeY, eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();

    // Draw smile (curved line)
    const smileY = centerY + 20;
    const smileHeight = smileCurve;

    ctx.beginPath();
    ctx.moveTo(centerX - smileWidth / 2, smileY);

    // Create a quadratic curve for the smile
    ctx.quadraticCurveTo(
        centerX,
        smileY + smileHeight,
        centerX + smileWidth / 2,
        smileY
    );

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
}

// Update eye distance
eyeDistanceSlider.addEventListener('input', (e) => {
    eyeDistance = parseInt(e.target.value);
    eyeDistanceValue.textContent = eyeDistance;
    drawSmiley();
});

// Update smile width
smileWidthSlider.addEventListener('input', (e) => {
    smileWidth = parseInt(e.target.value);
    smileWidthValue.textContent = smileWidth;
    drawSmiley();
});

// Update smile curve
smileCurveSlider.addEventListener('input', (e) => {
    smileCurve = parseInt(e.target.value);
    smileCurveValue.textContent = smileCurve;
    drawSmiley();
});

// Download functionality
downloadBtn.addEventListener('click', () => {
    // Create a link element
    const link = document.createElement('a');

    // Set the download filename
    link.download = 'my-smiley-face.png';

    // Convert canvas to data URL
    link.href = canvas.toDataURL('image/png');

    // Trigger the download
    link.click();
});

// Draw initial smiley
drawSmiley();
