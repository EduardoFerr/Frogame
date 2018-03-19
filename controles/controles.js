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
var Controles = (function (global) {
    /* Predefinir as variáveis que vamos usar dentro deste escopo,
     * crie o elemento de tela, pegue o contexto 2D para essa tela
     * Defina a altura / largura dos elementos da tela e adicione - a ao DOM.
     */
    var doc = global.document,
        win = global.window,
        canvasControle = doc.createElement('canvas'),
        ctxControle = canvasControle.getContext('2d'),
        lastTime;
    
    canvasControle.width = 120;
    canvasControle.height = 200;

    doc.body.appendChild(canvasControle);






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

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        /* Ligue para nossas funções de atualização / renderização, passe o tempo delta para
         * nossa função de atualização, uma vez que pode ser usada para animação suave.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        /* Defina nossa variável lasttime que é usada para determinar o tempo delta
         * para a próxima vez que esta função é chamada.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */

        /* Use a função requestAnimationFrame do navegador para chamar isso
         * função novamente assim que o navegador pode desenhar outro quadro.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    /* Esta função faz alguma configuração inicial que só deve ocorrer uma vez,
     * particularmente definindo a variável lasttime que é necessária para a
     * loop de jogo.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */

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
        //checkCollisions();
    }



    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    /* Isto é chamado pela função de atualização e acompanha todos os
     * objetos dentro de sua matriz allEnemies conforme definido em app.js e chamadas
     * seus métodos de atualização().Em seguida, ele chamará a função de atualização para sua
     * objeto do jogador.Esses métodos de atualização devem se concentrar apenas na atualização
     * os dados / propriedades relacionadas ao objeto.Faça seu desenho em seu
     * processar métodos.
     */
    function updateEntities(dt) {
        // allEnemies.forEach(function (enemy) {
        //     enemy.update(dt);
        // });
        // player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */

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
            // 'images/water-block.png', // A linha superior é água
            // 'images/grass-block.png', // Linha 1 de 1 de grama
            // 'images/stone-block.png', // Linha 1 de 3 de pedra
            // 'images/stone-block.png', // Linha 2 de 3 de pedra
            // 'images/stone-block.png', // Linha 3 de 3 de pedra
            // 'images/grass-block.png', // Linha 1 de 1 de grama
            'images/Gem_Blue.png', // Linha 1 de 1 de gema
            'images/Gem_Green.png', // Linha 1 de 1 de gema
            'images/Gem_Orange.png', // Linha 1 de 1 de gema

        ],
            numRows = 3,
            numCols = 3,
            row, col;

        // Before drawing, clear existing canvas
        // Antes de desenhar, limpe a tela existente
        ctxControle.clearRect(0, 0, canvasControle.width, canvasControle.height)

        /* Loop através do número de linhas e colunas que definimos acima
         * e, usando a matriz rowImages, desenhe a imagem correta para isso
         * parte da "grade"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */

                /* A função drawImage do elemento de contexto da tela
                * requer 3 parâmetros: a imagem a desenhar, a coordenada x
                * para começar a desenhar e a coordenada y para começar a desenhar.
                * Estamos usando nossos ajudantes de Recursos para se referir a nossas imagens
                * para que obtenhamos os benefícios de armazenar em cache essas imagens, já que
                * estamos usando - os repetidamente.
                */
                ctxControle.drawImage(Resources.get(rowImages[row]), col * 40, row * 65);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    /* Esta função é chamada pela função de renderização e é chamada em cada instante do jogo.
     * Seu objetivo é chamar as funções de renderização que você definiu
     * em seu inimigo e entidades de jogadores dentro de app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        /* Loop através de todos os objetos dentro da matriz allEnemies e ligue
         * a função de renderização que você definiu.
         */
        // allEnemies.forEach(function (enemy) {
        //     enemy.render();
        //     //enemy.renascer();
        // });

        // player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    /* Esta função não faz nada, mas poderia ter sido um bom lugar para
     * lidar com os estados de reinicialização do jogo - talvez um novo menu de jogo ou um jogo na tela
     * Esse tipo de coisas.É chamado apenas uma vez pelo método init().
     */
    function reset() {
        // noop

    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */

    /* Vá em frente e carregue todas as imagens que sabemos que precisaremos
     * desenhe o nível do nosso jogo.Em seguida, configure o init como método de retorno de chamada, de modo que quando
     * todas essas imagens são carregadas corretamente, nosso jogo começará.
     */
    Resources.load([
        'images/Gem_Blue.png', // Linha 1 de 1 de gema
        'images/Gem_Green.png', // Linha 1 de 1 de gema
        'images/Gem_Orange.png', // Linha 1 de 1 de gema
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
    * object when run in a browser) so that developers can use it more easily
    * from within their app.js files.
    */
    /* Atribua o objeto de contexto da tela à variável global (a janela
     * objeto quando executado em um navegador) para que os desenvolvedores possam usá - lo mais facilmente
     * dentro de seus arquivos app.js.
     */

    global.ctxControle = ctxControle;
})(this);
