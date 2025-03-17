const canvas = document.getElementById("injectorCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

// Get input elements
const numRowsInput = document.getElementById("numRows");
const numHolesInput = document.getElementById("numHoles");
const spacingInput = document.getElementById("spacing");

// Function to draw a circular hole
function drawHole(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
}

// Function to draw the pattern
function drawPattern() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rows = parseInt(numRowsInput.value);
    const holesPerRow = parseInt(numHolesInput.value);
    const spacing = parseInt(spacingInput.value);
    const startX = canvas.width / 2;
    const startY = canvas.height / 4;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < holesPerRow; col++) {
            const x = startX + (col - holesPerRow / 2) * spacing;
            const y = startY + row * spacing;
            drawHole(x, y, 10);
        }
    }
}

// Add event listeners for live updates
[numRowsInput, numHolesInput, spacingInput].forEach(input => {
    input.addEventListener("input", drawPattern);
});

// Initial draw
drawPattern();
