const canvas = document.getElementById("injectorCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

// Get input elements
const numHolesInput = document.getElementById("numHoles");
const spacingInput = document.getElementById("minSpacing");

// Function to draw a circular hole
function drawHole(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
}

// Function to calculate and draw optimal circular layout
function drawOptimalPattern() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const totalHoles = parseInt(numHolesInput.value);
    const minSpacing = parseInt(spacingInput.value);

    let placedHoles = 0;
    let radius = minSpacing;  // Start with smallest radius possible
    let ring = 0;

    // Center the pattern
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    while (placedHoles < totalHoles) {
        let numHoles = Math.floor((2 * Math.PI * radius) / minSpacing); // Spacing is minimal arclength, not straight p2p
        numHoles = Math.min(numHoles, totalHoles - placedHoles); // Ensure we don’t exceed total points
        
        for (let i = 0; i < numHoles; i++) {
            let angle = (i / numHoles) * (2 * Math.PI);
            let x = centerX + radius * Math.cos(angle);
            let y = centerY + radius * Math.sin(angle);
            drawHole(x, y, 8);
        }
        
        placedHoles += numHoles;
        radius += minSpacing; // Increase radius for next ring
        ring++;
    }
}


// Add event listeners for live updates
[numHolesInput, spacingInput].forEach(input => {
    input.addEventListener("input", drawOptimalPattern);
});

// Initial draw
drawOptimalPattern();
