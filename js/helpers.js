var initSound = function () {
    sprite.play(); setTimeout(function () {
        // the timeout isn't completely necessary but solves some issues on older devices/buggy browsers  
        sprite.stop();
    }, 0); document.removeEventListener('touchstart', initSound, false);
}
document.addEventListener('touchstart', initSound, false);
