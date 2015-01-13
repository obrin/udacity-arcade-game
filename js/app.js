// Store all enemies in array


// Generate random numbers
function randomNum(a, b) {
    return Math.floor(Math.random() * a + b);
}

// Object size
var playerWidth = 75,
    playerHeight = 80,
    enemyWidth = 101,
    enemyHeight = 70;


//Enemy Variables
var
    enemyPositionX = 1, // Enemy starting position
    enemyPositionY = 65 + 83,
    enemySpeed = [50, 150, 300],
    maxNumBugs = 3, // Maximum number of bugs
    allEnemies = []; // Store enemies in an array

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = randomNum(200, 100);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if(this.x > 820) {
        this.x = 0; // Reset enemy position

        // Random starting position after end of image [REPEATED CODE!!]
        var randomRowNum = randomNum(3, 1);
        // Enemy position on rock tile
        if (randomRowNum === 1) this.y = 65;
        if (randomRowNum === 2) this.y = 65 + 83;
        if (randomRowNum === 3) this.y = 65 + 83 * 2;
    }

    // Player boundaries for detecting collision
    players = {
        'x': player.x,
        'y': player.y,
        'w': playerWidth,
        'h': playerHeight
    };

    // Enemy boundaries for detecing collision
    for(i = 0; i < allEnemies.length; i++) {
       enemies = {
           'x': allEnemies[i].x,
           'y': allEnemies[i].y,
           'w': enemyWidth,
           'h': enemyHeight
       };

       // Collision detection
       if(enemies.x < players.x + players.w && enemies.x + enemies.w > players.x &&
       enemies.y < players.y + players.h && enemies.y + enemies.h > players.y){
       console.log("BANG!!!");
       collide();
       }
    }
};



// Initiate enemies{}
function initiateObject() {

    for(i = 0; i < maxNumBugs; i++) {

    // Random starting position [REPEATED CODE!!]
    var randomRowNum = randomNum(4, 1);
    // Enemy position on rock tile
    if (randomRowNum === 1) this.y = 65;
    if (randomRowNum === 2) this.y = 65 + 83;
    if (randomRowNum === 3) this.y = 65 + 83 * 2;
    if (randomRowNum === 4) this.y = 65 + 83 * 3;


    var enemy = new Enemy(-200, this.y, Enemy.speed);
    allEnemies.push(enemy);
    }
}

initiateObject();

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// No8w instantiate your objects.
/*function initiateEnemy() {
var enemy1 = new Enemy(0, 50, 1);
};
*/
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Player Variables
var playerMoveX = 101,
    playerMoveY = 83,
    playerInitialPosX = 200,
    playerInitialPosY = 400,
    blockHeight = 83,
    blockWidth = 101,
    maxLife = 5;


// Update player's position
// Parameter: dt, a time delta between two ticks for smooth animation
Player.prototype.update = function() {
    if(this.key === 'up') {
        this.y -= playerMoveY;
    } else if (this.key === 'down' && this.y < 400) {
        this.y += playerMoveY;
    } else if (this.key === 'left' && this.x > 0) {
        this.x  -= playerMoveX;
    } else if (this.key === 'right' && this.x < 606) {
        this.x  += playerMoveX;
    }
    this.key = null;

    if(this.y < 60) {
        this.y = playerInitialPosY;
        this.x = playerInitialPosX;
    }

};

// Draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Call objects
var player = new Player(playerInitialPosX, playerInitialPosY);


/* Update players position
*/
Player.prototype.handleInput = function(key) {
    this.key = key;
};

// Execute collision function
function collide() {
    player.x = playerInitialPosX;
    player.y = playerInitialPosY;
}

var Life = function() {

    this.sprite = 'images/Heart.png';
};

Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), 0, 650, 50, 80);
};

var playerLife = new Life();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

