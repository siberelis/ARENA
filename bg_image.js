

// Get the canvas element by its ID
const canvas = document.getElementById("bg");
const context = canvas.getContext("2d");


canvas.width = window.innerWidth/1.2; // Set the width to 800 pixels
canvas.height = window.innerWidth/1.2; // Set the height to 600 pixels

// Create an image element
const image = new Image();

// Set the source of the image
image.src = "GRID_2.png"; // Replace with the actual image path

// Once the image is loaded, draw it on the canvas
image.onload = function () {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image on the canvas
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
};