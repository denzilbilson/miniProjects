// canvas variables
var canvas;
var canvasContext;

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
    var framesPerSecond = 1;

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');

    
    setInterval(() => {
        move();
        //draw();
    }, 1000 / framesPerSecond);
};

// modifies array to set new player positions
function move(){
    snake.pop();
    var x = snake[0][0] + 10;
    var y = snake[0][1];
    snake.unshift([x,y]);

}

// draw canvas and game every frame refresh
function draw(){

}

// tracks game inputs
function key(){
    document.addEventListener('keydown', function(event) {
        if(event.key == "ArrowLeft" || "a") {
            console.log('Left was pressed');
        }
        else if(event.key == "ArrowRight" || "d") {
            console.log('Right was pressed');
        }
        else if(event.key == "ArrowUp" || "w") {
            console.log('Up was pressed');
        }
        else if(event.key == "ArrowDown" || "s") {
            console.log('Down was pressed');
        }
    });
}
