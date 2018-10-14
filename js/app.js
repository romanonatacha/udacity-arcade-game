// Creating a super class
class Component {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    // Draw the component
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);        
    }
}

// Creating Enemy class extending the component class
class Enemy extends Component {
    constructor(x, y, row, speed, sprite) {
        super(x, y, sprite);
        this.y = (row * 83) - 20;
        this.speed = speed;
    }

    // updates the enemy, detect a colision alert on the screen
    // and reset the position of the player and the enemies
    update(dt) {
        if (this.collision()) {
            alert('YOU LOSE! Press enter to try again!')
            player.reset();
            this.reset();
        } else {
            this.x += this.speed * dt;
            if (this.x >= 505) {
                this.x = -101;
            }
        }
    }

    // dedect a collision between the player and the enemy
    collision() {
        return ((this.x + 101 - 30 > player.x
            && this.x + 101 -30 < player.x + 101
            || this.x >= player.x
            && this.x < player.x + 101 -30))
            && this.y === player.y;
    }

    // reset the enemy position on the screen to the inicial position
    reset() {
        this.x = 101;
    }
}

// Creating PLayer class extending the component class
class Player extends Component {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.moveX = 101;
        this.moveY = 83;
        this.move = '';
    }

    // uptades the player position when the keys are pressed, if the player wins a alert will apear
    // and the game will restart
    update() {
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
            alert('YOU DID IT! Press enter to restart.');
            this.reset();
        }
    
        this.move = '';
    }

    // reset the player position to the inicial position
    reset() {
        this.x = 202;
        this.y = 395;
    }

    handleInput(mov) {
        this.move = mov;
    }
}

// creating objects instances
// one player with 3 parameters (x, y, sprite)
// an array of enemies with 5 parameters (x, y, row, speed, sprite)
let player = new Player(202, 395, 'images/rick.png');
let allEnemies = [
    new Enemy(103, null, 1, 270, 'images/morty.png'),
    new Enemy(101, null, 2, 150, 'images/pickle-rick.png'),
    new Enemy(99, null, 3, 120, 'images/morty.png'),
    new Enemy(110, null, 1, 305, 'images/pickle-rick.png'),
    new Enemy(101, null, 2, 250, 'images/morty.png'),
    new Enemy(121, null,  3, 340, 'images/pickle-rick.png')
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
