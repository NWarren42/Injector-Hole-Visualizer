const canvas = document.getElementById("injectorCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

// Get input elements
const numHolesInput = document.getElementById("numHoles");
const spacingValue = document.getElementById("spacingValue");

const spacingMode = document.getElementById("spacingMode");
const spacingLabel = document.getElementById("spacingLabel");

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
    const minSpacing = parseInt(spacingValue.value);

    let placedHoles = 0;
    let radius = minSpacing;  // Start with smallest radius possible
    let ring = 1;

    // Center the pattern
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    while (placedHoles < totalHoles) {
        let numHoles;
        
        // Calculate number of holes in current ring
        if (spacingMode.value === "pixel"){
            numHoles= Math.floor((2 * Math.PI * radius) / minSpacing); // Spacing is minimal arclength, not straight p2p
            numHoles = Math.min(numHoles, totalHoles - placedHoles); // Ensure we don’t exceed total points
        } else {
            // Use angular spacing: Convert degrees to radians and determine how many points fit
            let angleSpacing = (spacingValue.value * Math.PI) / 180; // Convert degrees to radians
            numHoles = Math.min(Math.floor(2 * Math.PI / angleSpacing), totalHoles - placedHoles);
        }
        
        let angleDelta = 2 * Math.PI / numHoles; // Calculate angle between holes

        for (let i = 0; i < numHoles; i++) {
            let angle = i*angleDelta; // Calculate angle for current hole
            let x = centerX + radius * Math.cos(angle - Math.PI / 2); // Subtract PI/2 to start at 12 o’clock
            let y = centerY + radius * Math.sin(angle - Math.PI / 2); // Subtract PI/2 to start at 12 o’clock
            drawHole(x, y, 8);
        }
        
        // Draw the indicator for the number of points in the current ring
        ctx.fillStyle = "black";
        ctx.font = "16px Times New Roman";
        ctx.fillText(`Ring ${ring}: ${numHoles} holes`, 10, 20 + 25*(ring-1));

        // Draw the indicator for point spacing data
        ctx.fillText(`Ring ${ring} angle: ${Math.ceil(angleDelta*(180/Math.PI))}°`, canvas.width - 130, 20 + 25*(ring-1));


        ring++;
        placedHoles += numHoles;
        radius += minSpacing; // Increase radius for next ring
    }
}

function updateSpacingLabel() {
    if (spacingMode.value === "pixel") {
        spacingLabel.innerText = "Point Spacing (pixels):";
    } else {
        spacingLabel.innerText = "Point Spacing (degrees):";
    }
    drawOptimalPattern(); // Redraw pattern when spacing mode changes
}

// Add event listeners for live updates
[numHolesInput, spacingValue].forEach(input => {
    input.addEventListener("input", drawOptimalPattern);
});
spacingMode.addEventListener("change", updateSpacingLabel);

// Initial draw
updateSpacingLabel();
drawOptimalPattern();
