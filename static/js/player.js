const me_progess_line = document.querySelector("#me_progess_line");
me_progess_line.addEventListener("touchend", function () {
    this.style.setProperty("--height", 3);
    let tirm;
    tirm = setTimeout(() => {
        clearTimeout(tirm);
        this.style.setProperty("--height", 2);
    }, 2000);
});