; (function () {
    if (document.documentElement.clientWidth > 490) {
        document.documentElement.style.fontSize = '10px';
    } else {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 32 + 'px';
    }
})();