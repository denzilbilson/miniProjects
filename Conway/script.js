// canvas variables
var canvas;
var canvasContext;

// cells array
var cells = [];
var tempArray;

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
    cells.forEach((item) => {
        var coor = item.split(" ");
        createRect(coor[0], coor[1], 10, 10, '#000000');
    })
}

function startGame() {
    setInterval(() => {
        manageCells();
    }, 1000 / 30);
}
function manageCells() {
    tempArray = cells;
    cells.forEach((item) => {
        var coor = item.split(" ");
        let x = parseInt(coor[0]);
        let y = parseInt(coor[1]);
        var side = 0;
        
        side += checkCells((x - 10) , (y - 10));
        side += checkCells( x , (y - 10));
        side += checkCells( (x + 10) , (y - 10));
        side += checkCells( (x - 10) , y);
        side += checkCells( (x + 10) , y);
        side += checkCells( (x - 10) , (y + 10));
        side += checkCells( x , (y + 10));
        side += checkCells( (x + 10) , (y + 10));

        if(side > 3 || side < 2){
            for( var i = 0; i < cells.length; i++){ 
                if (cells[i] == item) { 
                    tempArray.splice(i, 1);
                    return;
                }
            }
        }

    });
    cells = tempArray;
}
function checkCells(x,y) {
    var sideCells = 0;
    var current = x + " " + y;

    if(cells.includes(current)){
        return 1;
    }
    if (cells.includes((x - 10) + " " + (y - 10))) {
        sideCells++;
    }
    if (cells.includes( x + " " + (y - 10))) {
        sideCells++;
    }
    if (cells.includes( (x + 10) + " " + (y - 10))) {
        sideCells++;
    }
    if (cells.includes( (x - 10) + " " + y)) {
        sideCells++;
    }
    if (cells.includes( (x + 10) + " " + y)) {
        sideCells++;
    }
    if (cells.includes( (x - 10) + " " + (y + 10))) {
        sideCells++;
    }
    if (cells.includes( x + " " + (y + 10))) {
        sideCells++;
    }
    if (cells.includes( (x + 10) + " " + (y + 10))) {
        sideCells++;
    }

    if(sideCells == 3){
        if(x <= 390 || x >= 0 || y <= 390 || y >= 0){
            tempArray.push(current);
        }
    }

    return 0;

}

// future function to handle clicking and dragging
function onMouseDown(event) {

}
function createCell(event) {
    var rect = canvas.getBoundingClientRect();
    var xPos = Math.floor((event.clientX - rect.left) / 10) * 10;
    var yPos = Math.floor((event.clientY - rect.top) / 10) * 10;
    if(xPos > 390 || xPos < 0 || yPos > 390 || yPos < 0){
        return;
    }
    var newCell = xPos + " " + yPos;
    console.log(cells.includes((xPos + 10) + " " + (yPos + 10)));
    for( var i = 0; i < cells.length; i++){ 
        if (cells[i] == newCell) { 
            cells.splice(i, 1);
            return;
        }
    }
    cells.push(newCell);
    console.log(cells);
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