/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
//PT-br
/* Resources.js
* Este é simplesmente um utilitário de carregamento de imagem.Facilita o processo de carregamento
* arquivos de imagem para que eles possam ser usados ​​em seu jogo.Também inclui
* uma camada simples de "cache" para que reutilize imagens em cache se você tentar
* carregar a mesma imagem várias vezes.
*/
(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /* This is the publicly accessible image loading function. It accepts
     * an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     */
    /* Esta é a função de carregamento de imagem acessível ao público. Aceita
    * uma série de strings apontando para arquivos de imagem ou uma string para um único
    * imagem.Em seguida, ele chamará nossa função de carregamento de imagem privada de acordo.
    */
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            /* Se o desenvolvedor passou em uma série de imagens
            * faça um loop para cada valor e chame nossa imagem
            * carregador no arquivo de imagem
            */
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            /* O desenvolvedor não passou uma matriz para esta função,
             * assumir que o valor é uma string e ligar para o nosso carregador de imagens
             * diretamente.
             */
            _load(urlOrArr);
        }
    }

    /* This is our private image loader function, it is
     * called by the public image loader function.
     */
    /* Esta é a nossa função privada de carregador de imagens, é
     * chamado pela função pública de carregador de imagens.
     */
    function _load(url) {
        if(resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
            /* Se este URL foi carregado anteriormente, ele existirá dentro de
             * nossa matriz de ResourceCache.Basta retornar essa imagem, antes
             * recarregando a imagem.
             */
            return resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            //BR-pt
            /* Este URL não foi carregado anteriormente e não está presente
             * dentro do nosso cache; precisamos carregar esta imagem.
             */
            var img = new Image();
            img.onload = function() {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                /* Uma vez que nossa imagem tenha carregado corretamente, adicione-a ao nosso cache
                 * para que possamos simplesmente retornar esta imagem se o desenvolvedor
                 * tenta carregar este arquivo no futuro.
                 */
                resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                /* Uma vez que a imagem está realmente carregada e corretamente armazenada em cache,
                 * Ligue para todas as chamadas onReady() que definimos.
                 */
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the image's src attribute to the passed in URL.
             */
            /* Defina o valor do cache inicial como falso, isso mudará quando
             * o manipulador de eventos onload da imagem é chamado.Finalmente, aponte
             * atributo src da imagem para o URL passado.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* This is used by developers to grab references to images they know
     * have been previously loaded. If an image is cached, this functions
     * the same as calling load() on that URL.
     */
    //BR-pt
    /* Isso é usado pelos desenvolvedores para obter referências a imagens que eles conhecem
     * já foram carregados anteriormente.Se uma imagem estiver em cache, isso funciona
     * o mesmo que chamar load() nesse URL.
     */
    function get(url) {
        return resourceCache[url];
    }

    /* This function determines if all of the images that have been requested
     * for loading have in fact been properly loaded.
     */
    //BR-pt
    /* Esta função determina se todas as imagens que foram solicitadas
     * para carregamento de fato foram devidamente carregados.
     */
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     */
    //BR-pt
    /* Esta função para adicionar uma função à pilha de chamada de retorno chamada
     * quando todas as imagens solicitadas são carregadas corretamente.
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* This object defines the publicly accessible functions available to
     * developers by creating a global Resources object.
     */
    //BR-pt
    /* Este objeto define as funções publicamente acessíveis disponíveis para
     * desenvolvedores criando um objeto de recursos global.
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
