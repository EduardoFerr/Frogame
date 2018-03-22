    /* Engine.js
    * Este arquivo fornece a funcionalidade de loop de jogo(atualizar entidades e renderizar),
    * desenha o quadro de jogo inicial na tela e, em seguida, chama a atualização e
    * processe métodos em seu jogador e objetos inimigos(definidos em seu app.js).
    *
    * Um mecanismo de jogo funciona desenhando toda a tela do jogo uma e outra vez, tipo de
    * como um flipbook que você pode ter criado como uma criança.Quando o seu jogador se move
    * a tela, pode parecer que apenas essa imagem / personagem está se movendo ou sendo
    * desenhado, mas esse não é o caso.O que realmente está acontecendo é toda a "cena"
    * está sendo desenhado uma e outra vez, apresentando a ilusão de animação.
    *
    * Este mecanismo torna o objeto de contexto da tela(ctx) globalmente disponível para fazer
    * escrevendo app.js um pouco mais simples para trabalhar.
    */
    var Engine = (function (global) {
        /* Predefinir as variáveis que vamos usar dentro deste escopo,
        * crie o elemento de tela, pegue o contexto 2D para essa tela
        * Defina a altura / largura dos elementos da tela e adicione - a ao DOM.
         */
        var doc = global.document,
            win = global.window,
            canvas = doc.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            lastTime;

        this.sound = document.createElement("audio");
        this.sound.src = "./audio/ImmigrantSongLedZeppelin.ogg";
        this.sound.autoplay = true;
        this.sound.loop = true;

        canvas.width = 505;
        canvas.height = 606;
        doc.body.appendChild(canvas);





        /* Esta função serve como o ponto de lançamento para o loop do jogo em si
        * e lida corretamente com os métodos de atualização e renderização.
        */
        function main() {
            /* Obtenha a nossa informação delta do tempo que é necessária se o seu jogo
            * requer animação suave.Porque todos os processos de computador
            * instruções a diferentes velocidades, precisamos de um valor constante que
            * seria o mesmo para todos(independentemente da rapidez com a sua
            * computador é) - tempo de hurtra!
            */

            var now = Date.now(),
                dt = (now - lastTime) / 1000.0;


            /* Ligue para nossas funções de atualização / renderização, passe o tempo delta para
            * nossa função de atualização, uma vez que pode ser usada para animação suave.
            */
            update(dt);
            render();

            /* Defina nossa variável lasttime que é usada para determinar o tempo delta
            * para a próxima vez que esta função é chamada.
             */
            lastTime = now;


            /* Use a função requestAnimationFrame do navegador para chamar isso
            * função novamente assim que o navegador pode desenhar outro quadro.
             */
            win.requestAnimationFrame(main);
        }

        /* Esta função faz alguma configuração inicial que só deve ocorrer uma vez,
        * particularmente definindo a variável lasttime que é necessária para a
        * loop de jogo.
        */
        function init() {
            reset();
            lastTime = Date.now();
            main();
        }

        /* Esta função é chamada por principal (nosso loop de jogo) e, por si só, chama tudo
        * das funções que podem precisar atualizar os dados da entidade.Com base em como
        * você implementa sua detecção de colisão(quando duas entidades ocupam o
        * mesmo espaço, por exemplo, quando seu personagem deve morrer), você pode encontrar
        * a necessidade de adicionar uma função adicional chamada aqui.Por enquanto, partimos
        * comentou - você pode ou não querer implementar isso
        * funcionalidade assim(você poderia implementar a detecção de colisão
        * nas próprias entidades no seu arquivo app.js).
        */
        function update(dt) {
            updateEntities(dt);
            checkCollisions();
        }

        /* Isto é chamado pela função de atualização e acompanha todos os
        * objetos dentro de sua matriz allEnemies conforme definido em app.js e chamadas
        * seus métodos de atualização().Em seguida, ele chamará a função de atualização para sua
        * objeto do jogador.Esses métodos de atualização devem se concentrar apenas na atualização
        * os dados / propriedades relacionadas ao objeto.Faça seu desenho em seu
        * processar métodos.
        */
        function updateEntities(dt) {
            allEnemies.forEach(function (enemy) {
                enemy.update(dt);
            });
            player.update();
        }

        /* Esta função inicialmente desenha o "nível do jogo", ele chamará
        * a função renderEntities.Lembre - se, esta função é chamada de
        * jogo tick(ou loop do motor do jogo) porque é assim que os jogos funcionam -
        * são flipbooks criando a ilusão de animação, mas na realidade
        * Eles estão apenas desenhando toda a tela uma e outra vez.
        */
        function render() {
            /* Esta matriz contém o URL relativo à imagem usada
            * para essa linha específica do nível do jogo.
            */
           
            var rowImages = [
                
                'images/water-block.png', // A linha superior é água
                'images/grass-block.png', // Linha 1 de 1 de grama
                'images/stone-block.png', // Linha 1 de 3 de pedra
                'images/stone-block.png', // Linha 2 de 3 de pedra
                'images/stone-block.png', // Linha 3 de 3 de pedra
                'images/grass-block.png', // Linha 1 de 1 de grama
            ],
                rowColicionaveis = ['images/Gem_Blue.png'],
                numRows = 6,
                numCols = 5,
                row, col;
            
            // Antes de desenhar, limpe a tela existente
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            /* Loop através do número de linhas e colunas que definimos acima
            * e, usando a matriz rowImages, desenhe a imagem correta para isso
            * parte da "grade"
            */
            for (row = 0; row < numRows; row++) {
                for (col = 0; col < numCols; col++) {
                    /* A função drawImage do elemento de contexto da tela
                    * requer 3 parâmetros: a imagem a desenhar, a coordenada x
                    * para começar a desenhar e a coordenada y para começar a desenhar.
                    * Estamos usando nossos ajudantes de images para se referir a nossas imagens
                    * para que obtenhamos os benefícios de armazenar em cache essas imagens, já que
                    * estamos usando - os repetidamente.
                    */
                    ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
                    
                    
                }
   
            }
            
            renderEntities();
        }


        /* Esta função é chamada pela função de renderização e é chamada em cada instante do jogo.
        * Seu objetivo é chamar as funções de renderização que você definiu
        * em seu inimigo e entidades de jogadores dentro de app.js
        */
        function renderEntities() {
            /* Loop através de todos os objetos dentro da matriz allEnemies e ligue
            * a função de renderização que você definiu.
            */

            ctx.fillStyle = 'white';
            ctx.font = "2em serif";
            ctx.fillText("Pontos:"+player.score, 0, 83);

            allEnemies.forEach(function (enemy) {
                enemy.render();
                //TODO
                //enemy.renascer();
            });
            allColecionaveis.forEach(function (cl) {
                cl.render();
            });
            player.render();

            
        }


        /* Esta função não faz nada, mas poderia ter sido um bom lugar para
        * lidar com os estados de reinicialização do jogo - talvez um novo menu de jogo ou um jogo na tela
        * Esse tipo de coisas.É chamado apenas uma vez pelo método init().
        */
        function reset() {

        }


        function checkCollisions(dt) {
            
            allEnemies.forEach(function (enemy) {
                enemy.colisao(dt);
            });
            allColecionaveis.forEach(function (colecionavel) {
                colecionavel.colisao();
            });

        }
        /* Vá em frente e carregue todas as imagens que sabemos que precisaremos
        * desenhe o nível do nosso jogo.Em seguida, configure o init como método de retorno de chamada, de modo que quando
        * todas essas imagens são carregadas corretamente, nosso jogo começará.
        */
        Resources.load([
            'images/fundo-da-agua-azul.png',
            'images/stone-block.png',
            'images/water-block.png',
            'images/grass-block.png',
            'images/enemy-bug.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png',
            'images/Gem_Blue.png',
            'images/char-boy.png',
            'images/pow.png'
        ]);
        Resources.onReady(init);

        /* Atribua o objeto de contexto da tela à variável global (a janela
        * objeto quando executado em um navegador) para que os desenvolvedores possam usá - lo mais facilmente
        * dentro de seus arquivos app.js.
        */

        global.ctx = ctx;

    })(this);
