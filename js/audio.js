var EngineAudio = (function (global) {
    var doc = global.document,
        win = global.window,
        
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

   
    audio.loop = true;
    
    audio.preload = "auto";
    
    audio.oncanplay = function () {
        audio.play();
    };
    // audio.ontouchstart = function () {
    //     audio.play();
    // };
    
    
    doc.body.appendChild(audio);
})(this)