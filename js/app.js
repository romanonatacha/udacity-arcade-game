// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 101;
    this.y = (row * 83) - 20;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/morty.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // detect collision and reset position of the enemies qnd the player
    if (this.collision()) {
        player.reset();
        this.reset();
    } else {
        this.x += this.speed * dt;
        if (this.x >= 505) {
            this.x = -101;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collision = function() {
    return ((this.x + 101 - 30 > player.x && this.x + 101 -30 < player.x + 101 ||
        this.x >= player.x && this.x < player.x + 101 -30)) && this.y === player.y;
}

Enemy.prototype.reset = function() {
    this.x = 101;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 202;
    this.y = 395;
    this.moveX = 101;
    this.moveY = 83;
    this.move = '';

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/rick.png';
};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 395;
}

Player.prototype.update = function() {
    switch (this.move) {
        case 'up':
            if(this.y - this.moveY < -20)
                return;
            this.y -= this.moveY;
            break;
        case 'right':
            if(this.x + this.moveX > 404)
                return;
            this.x += this.moveX;
            break;
        case 'left':
            if(this.x - this.moveX < 0)
                return;
            this.x -= this.moveX;
            break;
        case 'down':
            if(this.y + this.moveY > 395)
                return;
            this.y += this.moveY;
            break;
        default:
            break;
    }
    

    if (this.y == -20) {
        alert('You did it! Press ENTER to restart.');
        this.reset();
    }

    this.move = '';
}


// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(mov) {
    this.move = mov;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();
let allEnemies = [
    new Enemy(1, 250),
    new Enemy(2, 100),
    new Enemy(3, 100),
    new Enemy(1, 300),
    new Enemy(2, 200),
    new Enemy(3, 150)
];

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
