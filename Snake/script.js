// canvas variables
var canvas;
var canvasContext;

// track velocity of snake
var xVel = 0;
var yVel = 10;

// snake array
var snake = [
    [50, 10],
    [40, 10],
    [30, 10]
];

window.onload = () => {
    document.addEventListener('keydown', function(event) {
     console.log(event.key);
    });
    
    // define how many times setInterval function runs a second
    var framesPerSecond = 10;

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    key();
    
    setInterval(() => {
        move();
        draw();
        console.log("X: " + xVel + "| Y: " + yVel);
    }, 1000 / framesPerSecond);
};

// modifies array to set new player positions
function move(){
    snake.pop();
    var x = snake[0][0] + xVel;
    var y = snake[0][1] + yVel;
    snake.unshift([x,y]);

}

// draw canvas and game every frame refresh
function draw(){
    //main background canvas
    createRect(0, 0, canvas.width, canvas.height, '#ffffff');
    snake.forEach((coor) =>{
        createRect(coor[0], coor[1], 10, 10, '#000000');
    })

}

// tracks game inputs
function key(){
    document.addEventListener('keydown', function(event) {
        if(event.key == ("ArrowLeft" || "a")) {
            xVel = -10;
            yVel = 0;
        }
        if(event.key == ("ArrowRight" || "d")) {
            xVel = 10;
            yVel = 0;
        }
        if(event.key == ("ArrowUp" || "w")) {
            xVel = 0;
            yVel = -10;
        }
        if(event.key == ("ArrowDown" || "s")) {
            xVel = 0;
            yVel = 10;
        }
    });
}

function createRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);

    if(color == "#000000"){
    canvasContext.strokeStyle = '#ffffff'
    }else if(color == "#ffffff"){
        canvasContext.strokeStyle = '#000000';
    }
    canvasContext.strokeRect(leftX, topY, width, height);
}