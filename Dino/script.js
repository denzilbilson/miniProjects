var player = document.getElementById("player");
var obstacle = document.getElementById("obstacle");
function jump(){
    if(player.classList != "jump-animation"){
        player.classList.add("jump-animation");
        setTimeout(()=>{player.classList.remove("jump-animation");}, 500)
    }
}

function endGame(){
    setInterval(() => {
        var playerTop = 
        parseInt(window.getComputedStyle(player).getPropertyValue("top"));
        var obstacleLeft = 
        parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
        if(obstacleLeft < 30 && obstacleLeft > 0 && playerTop >= 210){
            alert("You have lost the game.");
            obstacle.style.animation = "none";
            obstacle.style.display = "none";
        }
    }, 10);
}

endGame();