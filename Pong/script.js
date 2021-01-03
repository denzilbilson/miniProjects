//canvas variables
var canvas;
var canvasContext;

//variables for ball's horizontal setting and speed
var ballX = 50;
var ballSpeedX = 5;

//variables for ball's vertical setting and speed
var ballY = 50;
var ballSpeedY = 10;

//variables for left paddle's vertical and horizontal setting
var paddle1X = 0;
var paddle1Y = 250;

//variables for right paddle's vertical and horizontal postions
var paddle2X = 780;
var paddle2Y = 250;

//variables for player scores
var player1Score = 0;
var player2Score = 0;

//constants for paddle size
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

//control paddle 1 (left paddle) with mouse
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX, y: mouseY
    };

}
window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function () {
        move();
        draw();
    }, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);

    });
}
//ai code for right paddle
function artificialPlayer() {
    var paddle2Center = paddle2Y + (PADDLE_HEIGHT / 2);
    if (ballX > 400 && ballSpeedX > 0) {
        if (paddle2Center < ballY + 35) {
            paddle2Y += 6;
        } else {
            paddle2Y -= 6;
        }
    }
}

function move() {
    artificialPlayer();

    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT && ballX <= 20) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT && ballX >= 780) {
        ballSpeedX = -ballSpeedX;
    }
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX > canvas.width) {
        //ballSpeedX = -ballSpeedX;
        ballReset();
        player1Score += 1;
    }
    if (ballX < 0) {
        //ballSpeedX = -ballSpeedX;
        ballReset();
        player2Score += 1;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function draw() {
    //main background canvas
    createRect(0, 0, canvas.width, canvas.height, '#003365');

    //this is the left player's paddle
    createRect(paddle1X, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, '#35ccff');

    //this is the paddle for the right player
    createRect(paddle2X, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, '#35ccff');

    //ball
    createRect(ballX, ballY, 10, 10, '#35ccff');
    canvasContext.fillStyle = '#35ccff';
    canvasContext.font = "70px Audiowide"
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, 700, 100)
}

function createRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}
function ballReset() {
    ballSpeedX = -ballSpeedX
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}