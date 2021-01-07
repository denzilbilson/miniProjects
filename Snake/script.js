// canvas variables
var canvas;
var canvasContext;

// player score
var score = 0;

// track velocity of snake
var xVel = 0;
var yVel = 10;

// snake array
var snake = [
    [50, 10],
    [40, 10],
    [30, 10]
];

// track last position of tail
var tailPos;

// apple position
var appleX;
var appleY;

//
var framesPerSecond = 10;

window.onload = () => {
    // define how many times setInterval function runs a second

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');

    // set starting position of apple to center
    appleX = parseInt(canvas.width)/2;
    appleY = parseInt(canvas.height)/2;
    key();
    dynamicInterval();
    // const intervalID  = setInterval(() => {
    //     document.addEventListener('keydown', function(event) {
    //         if(event.key == ' '){
    //         move();
    //         draw();
    //         }
    //     }, {once:true})
    //     move();
    //     collision();
    //     draw();
    //     if(endGame()){ // if game ends
    //         clearInterval(intervalID); // stop calling setInterval
    //     }
    // }, 1000 / framesPerSecond);
};

function addScore() {
    score += 1
    document.querySelector("#score").innerHTML = score
}

/////////////////////
function dynamicInterval(){
    setTimeout(() => {
        move();
        collision();
        draw();
        if(endGame()){ // if game ends
            return;
        }
        dynamicInterval();
    }, 1000 / framesPerSecond);
}

/////////////////////
// modifies array to set new player positions
function move(){
    tailPos = snake.pop();
    var x = snake[0][0] + xVel;
    var y = snake[0][1] + yVel;
    snake.unshift([x,y]);
}

// draw canvas and game every frame refresh
function draw(){
    //main background canvas
    createRect(0, 0, canvas.width, canvas.height, '#ffffff');
    createRect(appleX, appleY, 10, 10, '#ff5555');
    snake.forEach((coor) =>{
        createRect(coor[0], coor[1], 10, 10, '#000000');
    })

}

// tracks game inputs
function key(){
    document.addEventListener('keydown', function(event) {
        if(event.key == ' '){
            framesPerSecond = 30;
        }
    });
    document.addEventListener('keydown', function(event) {
        if(event.key == ("ArrowLeft") || event.key == "a") {
            if(xVel == 10){
                return;
            }
            xVel = -10;
            yVel = 0;
            
        }
        if(event.key == ("ArrowRight") || event.key == "d") {
            if(xVel == -10){
                return;
            }
            xVel = 10;
            yVel = 0;
        }
        if(event.key == ("ArrowUp") || event.key == "w") {
            if(yVel == 10){
                return;
            }
            xVel = 0;
            yVel = -10;
        }
        if(event.key == ("ArrowDown") || event.key == "s") {
            if(yVel == -10){
                return;
            }
            xVel = 0;
            yVel = 10;
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.key == ' '){
            framesPerSecond = 10;
        }
    });
}

// if snake collides with an apple
function collision(){
    if(snake[0][0] == appleX && snake[0][1] == appleY){
        generateApple();
        snake.push(tailPos);
        addScore()
    }
}

// generates apple position
function generateApple(){
    var checkApple = JSON.stringify(snake); // turn snake array into string to check apple position (avoid potential overlap)
    do{
        appleX = 10 * (1 + Math.floor(Math.random() * ((canvas.height/10) - 2))); // returns multiple of 10 between 10 and 380 (canvas height and width are 400)
        appleY = 10 * (1 + Math.floor(Math.random() * ((canvas.width/10) - 2)));
    }while(checkApple.includes([appleX,appleY])) // make sure apple does not overlap snake
}

// when snake goes out of bounds of the canvas
function endGame(){
    if(snake[0][0] > (canvas.height - 10) || snake[0][0] < 0 || snake[0][1] > (canvas.width - 10) || snake[0][1] < 0){
        if(!alert("You have collided into a wall. Game over.")){
            window.location.reload();
            return 1;
        }
    }
    return 0;
}



// uses canvasContext functions to make drawing rect easier
function createRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);

    if(color == "#000000"){
    canvasContext.strokeStyle = '#ffffff';
    }else if(color == "#ffffff"){
        canvasContext.strokeStyle = '#000000';
    }
    canvasContext.strokeRect(leftX, topY, width, height);
}