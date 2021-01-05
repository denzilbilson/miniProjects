// canvas variables
var canvas;
var canvasContext;

// cells array
var cells = [];

window.onload = () => {
    // define how many times setInterval function runs a second
    var framesPerSecond = 10;

    document.addEventListener("mousemove", printMousePos);
    document.addEventListener("mousedown", createCell);
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');

    const intervalID = setInterval(() => {
        render();
    }, 1000 / framesPerSecond);
};

function render() {
    createRect(0, 0, canvas.width, canvas.height, '#ffffff');
    cells.forEach((coor) => {
        createRect(coor[0], coor[1], 10, 10, '#000000');
    })
}

function createCell(event) {
    var checkCell = JSON.stringify(cells);
    var rect = canvas.getBoundingClientRect();
    var xPos = Math.floor((event.clientX - rect.left)/10) * 10;
    var yPos = Math.floor((event.clientY - rect.top)/10) * 10;
    cells.push([xPos, yPos]);
}

function printMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var test = document.getElementById("test");
    test.innerText = "clientX: " + (event.clientX - rect.left) + " - clientY: " + (event.clientY - rect.top);
}

// uses canvasContext functions to make drawing rect easier
function createRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);

    if (color == "#000000") {
        canvasContext.strokeStyle = '#ffffff';
    } else if (color == "#ffffff") {
        canvasContext.strokeStyle = '#000000';
    }
    canvasContext.strokeRect(leftX, topY, width, height);
}