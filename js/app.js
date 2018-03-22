var Avatar = function () {
    this.sprite = 'images/' + sprite + '.png';
    this.x = 0;
    this.y = 0;
    this.vida = 1;
    this.raio = 53;
}

Avatar.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y + 50.5);
};

Avatar.prototype.localY = () => {
    let random = (Math.floor(Math.random() * 3) + 1);
    return (random * 83);
}

Avatar.prototype.localX = () => {
    let random = (Math.floor(Math.random() * 3) + 1);
    return (random * 101);
}


Avatar.prototype.colisao = function (dt) {

    (this.x >= 505 || this.y >= 606) ?
        this.matar(false) :
        (this.y == player.y ?
            Math.floor(this.x) > player.x - 50 &&
                Math.floor(this.x) < player.x + 50 ? this.matar(true) : null : null);
}



var Colecionavel = function () {
    
    this.sprite = 'images/Gem_Blue.png';
    this.pontos = 100;
    this.x = 101 * (Math.floor(Math.random() * 5));
    this.y = 83 * (Math.floor(Math.random() * 5));
}
Colecionavel.prototype = Object.create(Avatar.prototype);
Colecionavel.prototype.constructor = Colecionavel;
Colecionavel.prototype.matar = function (boleano) {
    if(boleano){
        player.score += this.pontos;
            console.log(player.score);
            
            allColecionaveis[allColecionaveis.indexOf(this)] = new Colecionavel();

    }else{
        allColecionaveis[allColecionaveis.indexOf(this)] = new Colecionavel();
    }
}


// Inimigos que nosso jogador deve evitar
var Enemy = function (y) {
    // As variáveis ​​aplicadas a cada uma das nossas instâncias vão aqui,
    // nós fornecemos um para você começar

    // A imagem / sprite para os nossos inimigos, isso usa
    // um ajudante que fornecemos para carregar facilmente imagens
    this.sprite = 'images/enemy-bug.png';
    this.colisaoSprite = 'images/pow.png';
    this.pontos = 100;
    this.x = -83;
    this.y = this.localY();
    this.velocidade = (Math.random() * 5) + 0.1;
};
Enemy.prototype = Object.create(Avatar.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.move = function (dt) { this.x += dt * this.velocidade; }

/* # Atualize a posição do inimigo, método necessário para o jogo
Parâmetro: dt, um tempo delta entre carrapatos */
Enemy.prototype.update = function (dt) {
    /* Você deve multiplicar qualquer movimento pelo parâmetro dt
    que assegurará que o jogo seja executado na mesma velocidade para
    todos os computadores. */
    this.move(dt * 83);

};
Enemy.prototype.matar = function (boleano) {
    if (boleano) {
        player.score -= this.pontos;
        console.log(player.score);

        allEnemies[allEnemies.indexOf(this)] = new Enemy();

    } else {
        allEnemies[allEnemies.indexOf(this)] = new Enemy();
    }
}

// Agora escreva sua própria classe de jogador
// Esclasse requer uma atualização (), render () e
// um método handleInput ().
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.vivo = true;
    this.x = 202;
    this.y = 0;
    this.score = 0;
    this.vida = 0;
    
}
Player.prototype = Object.create(Avatar.prototype);
Player.prototype.handleInput = (key) => {
    switch (key) {
        case "up":
            if (player.y > 000) {
                player.y -= 83;
            }

            break;
        case "down":
            if (player.y < 329) {
                player.y += 83;
            }

            break;
        case "left":
            if (player.x > 000) {
                player.x -= 101;
            }
            break;
        case "right":
            if (player.x < 404) {
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



// Agora instancie seus objetos.
// Coloque todos os objetos inimigos em uma matriz chamada allEnemies
// Coloque o objeto do jogador em uma variável chamada player
var allEnemies = [new Enemy(83), new Enemy(), new Enemy(), new Enemy()];
var allColecionaveis = [new Colecionavel()];

var player = new Player();


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


