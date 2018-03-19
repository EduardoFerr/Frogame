var Avatar = function(){
    // this.sprite = 'images/enemy-bug.png';
    // this.x = -83;
    // this.y = this.localY();


    this.sprite = 'images/'+sprite+'.png';
    this.x = 202;
    this.y = 404;
}

Avatar.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Parâmetro: dt, um tempo delta entre carrapatos
Avatar.prototype.update = function (dt) {
    // Você deve multiplicar qualquer movimento pelo parâmetro dt
    // que assegurará que o jogo seja executado na mesma velocidade para
    // todos os computadores.

};

// Enemies our player must avoid
// Inimigos que nosso jogador deve evitar
var Enemy = function () {
    // As variáveis ​​aplicadas a cada uma das nossas instâncias vão aqui,
    // nós fornecemos um para você começar

    // A imagem / sprite para os nossos inimigos, isso usa
    // um ajudante que fornecemos para carregar facilmente imagens
    this.sprite = 'images/enemy-bug.png';
    this.pow = 'images/pow.png';
    this.x = -83;
    this.y = this.localY();
    this.velocidade = (Math.random() * 5) + 0.1;
};
Enemy.prototype = Object.create(Avatar.prototype);
Enemy.prototype.constructor = Enemy;


Enemy.prototype.move = function (dt) {
    this.x += dt * this.velocidade;
}

//#Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//BR-pt
// # Atualize a posição do inimigo, método necessário para o jogo
// Parâmetro: dt, um tempo delta entre carrapatos
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Você deve multiplicar qualquer movimento pelo parâmetro dt
    // que assegurará que o jogo seja executado na mesma velocidade para
    // todos os computadores.

    this.move(dt * 83);

    this.matar();

    this.colisao();

};

Enemy.prototype.colisao = function () {
    // if ((Math.floor(this.x) > (player.x - 50) && (Math.floor(this.x) < (player.x + 50)) && player.y == this.y)) {
    //     this.sprite = 'images/pow.png';
    // }
}

Enemy.prototype.matar = function () {
    if (this.x > 505) {
        //console.log(allEnemies[allEnemies.indexOf(this)]);
        allEnemies[allEnemies.indexOf(this)] = new Enemy("inseto");
    }
}

Enemy.prototype.localY = () => {
    let random = (Math.floor(Math.random() * 3) + 1);
    return random * 101;
}


// Draw the enemy on the screen, required method for game
// Desenhe o inimigo na tela, método necessário para o jogo
Enemy.prototype.render = function () {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Agora escreva sua própria classe de jogador
// Esclasse requer uma atualização (), render () e
// um método handleInput ().
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 0;
}
Player.prototype.handleInput = (key) => {
    switch (key) {
        case "up":
            if (player.y > 000) {
                player.y -= 101;
            }

            break;
        case "down":
            if (player.y < (document.body.getElementsByTagName("canvas")[0].height - 202)) {
                player.y += 101;
            }

            break;
        case "left":
            if (player.x > 000) {
                player.x -= 101;
            }
            break;
        case "right":
            if (player.x < (document.body.getElementsByTagName("canvas")[0].width) - 166) {
                player.x += 101;
            }

            break;
        default:
            break;
    }
}

// Parâmetro: dt, um tempo delta entre carrapatos
Player.prototype.update = function (dt) {
    // Você deve multiplicar qualquer movimento pelo parâmetro dt
    // que assegurará que o jogo seja executado na mesma velocidade para
    // todos os computadores.

};

// Desenhe o inimigo na tela, método necessário para o jogo
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};






// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//PT-br
// Agora instancie seus objetos.
// Coloque todos os objetos inimigos em uma matriz chamada allEnemies
// Coloque o objeto do jogador em uma variável chamada player
var allEnemies = [new Enemy("a"), new Enemy("b"), new Enemy("c"), new Enemy("d")];



var player = new Player();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
//PT-br
// Isso escuta pressionamentos de teclas e envia as chaves para o seu
// Método Player.handleInput (). Você não precisa modificar isso.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


