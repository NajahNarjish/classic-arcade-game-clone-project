// Enemies, our player must avoid
let Enemy = function(x, y, speed) {

    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    if (speed < 0) {
        this.sprite = 'images/enemy-bug-reverse.png';
    } else {
        this.sprite = 'images/enemy-bug.png';
    }

    // Enemy's initial location and speed
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// the objects are instantiated
// all enemy objects are in an array called allEnemies
allEnemies = [];

const enemy1 = new Enemy(520, 230, -60);
allEnemies.push(enemy1);

const enemy2 = new Enemy(-100, 150, 150);
allEnemies.push(enemy2);    

const enemy3 = new Enemy(-100, 60, 300);
allEnemies.push(enemy3);

const enemy4 = new Enemy(520, 150, -400);
allEnemies.push(enemy4);

// the enemy's position updated, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 500) {
        this.x = -100;
    } else if (this.x <-101) {
        this.x = 495;
    } else {
        this.x = this.x + this.speed* dt;
    }
    // "checkCollision" function is called when enemies are moved
    checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//  player class
let Player = function() {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    // Player's initial location
    this.x = 200;
    this.y = 310;
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    // "checkCollision" function is called when player is moved
    checkCollision();
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// fixes player's location when "left", "right", "up", "down" keys are pressed
Player.prototype.handleInput = function(keyCode) {
    
    if (keyCode === 'left' && this.x >0) {
        this.x = this.x - 100;
        
    } else if (keyCode === 'right' && this.x < 400) {
        this.x = this.x + 100;

    } else if (keyCode === 'up' && this.y > 0) {
        this.y = this.y - 90;
        if(player.y <= 0){
            timeAndModal.showModal();
            // time stops when the player reaches water
            clearTimeout(timeAndModal.timeOut);
        }

    } else if (keyCode === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }
};

// This listens for key presses and sends the keys to 
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// the player object is placed in a variable called player
let player = new Player();

// a function is declared to demonstrate player-enemy collision
function checkCollision(){
    allEnemies.forEach(function(enemy) {
        
        if ((enemy.x > player.x-50 && enemy.x < player.x+50) && 
            (enemy.y > player.y-30 && enemy.y < player.y+30)){
            player.x = 200;
            player.y = 310;
        }       
    });
}

// time calculation in seconds
let TimeAndModal = function() {
    this.second = 0;
    this.timeOut;
    this.timer();
};
// this function increases the time
TimeAndModal.prototype.timer = function(){
    this.second++;
    
    this.timeOut = setTimeout(TimeAndModal.prototype.timer.bind(this), 1000);
};

// When the user clicks on the button, the modal opens 
TimeAndModal.prototype.showModal = function() {  
    let message = "Congratulations!!..You won  and you took " + this.second +" seconds.";
    let p = document.querySelector(".message");
    p.textContent = message;
    modal.style.display = "block";
};

let timeAndModal = new TimeAndModal();

//the modal code from https://www.w3schools.com/howto/howto_css_modals.asp
const modal = document.getElementById('myModal');

//the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), the modal closes
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, it closes
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// new game by clicking "play again" button
const btn = document.getElementById("myBtn");
btn.addEventListener ("click", reload);

// funtion to reload the game
function reload(){
    location.reload();
}