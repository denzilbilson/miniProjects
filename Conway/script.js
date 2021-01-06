// canvas variables
var canvas;
var canvasContext;

// cells array
var cells = [];

// grid array
var grid = [];

window.onload = () => {
    // define how many times setInterval function runs a second
    var framesPerSecond = 10;

    document.addEventListener("mousemove", printMousePos);
    document.addEventListener("mousedown", createCell);
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    createGrid();

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

function createGrid() {
    for (var i = 0; i < canvas.width / 10; i++) {
        for (var j = 0; j < canvas.height / 10; j++) {
            grid.push([i * 10, j * 10, "dead"]);
        }
    }
}

function startGame() {
    setInterval(() => {
        birthCell();
        removeCells();
        console.log(cells);
    }, 1000 / 1);
}
function birthCell() {
    var checkCell = JSON.stringify(cells);
    cells.forEach((coor) => {
        var sideCells = 0;
        if (checkCell.includes([coor[0] - 10, coor[1]] - 10)) {
            sideCells++;
        }
        if (checkCell.includes([coor[0], coor[1]] - 10)) {
            sideCells++;
        }
        if (checkCell.includes([coor[0] + 10, coor[1]] - 10)) {
            sideCells++;
        }
        if (checkCell.includes([coor[0] - 10, coor[1]])) {
            sideCells++;
        }
        if (checkCell.includes([coor[0] + 10, coor[1]])) {
            sideCells++;
        }
        if (checkCell.includes([coor[0] - 10, coor[1]] + 10)) {
            sideCells++;
        }
        if (checkCell.includes([coor[0], coor[1]] + 10)) {
            sideCells++;
        }
        if (checkCell.includes([coor[0] + 10, coor[1]] + 10)) {
            sideCells++;
        }

        if (sideCells == 3) {
            cells.push(coor);
        }
    })
}
function removeCells() {
    var checkCell = JSON.stringify(cells);
    grid.forEach((coor) => {
        var sideCells = 0;
        if (checkCell.includes([coor[0] - 10, coor[1]] - 10)) {
            sideCells++;
        }
        if (checkCell.includes([coor[0], coor[1]] - 10)) {
            sideCells++;
        }
        if (checkCell.includes([coor[0] + 10, coor[1]] - 10)) {
            sideCells++;
        }
        if (checkCell.includes([coor[0] - 10, coor[1]])) {
            sideCells++;
        }
        if (checkCell.includes([coor[0] + 10, coor[1]])) {
            sideCells++;
        }
        if (checkCell.includes([coor[0] - 10, coor[1]] + 10)) {
            sideCells++;
        }
        if (checkCell.includes([coor[0], coor[1]] + 10)) {
            sideCells++;
        }
        if (checkCell.includes([coor[0] + 10, coor[1]] + 10)) {
            sideCells++;
        }

        // game law
        if (sideCells < 2 || sideCells > 3) {
            cells.splice(cells.indexOf(coor), 1);
        }
    })
}

// future function to handle clicking and dragging
function onMouseDown(event) {

}
function createCell(event) {
    var checkCell = JSON.stringify(cells);
    var rect = canvas.getBoundingClientRect();
    var xPos = Math.floor((event.clientX - rect.left) / 10) * 10;
    var yPos = Math.floor((event.clientY - rect.top) / 10) * 10;
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