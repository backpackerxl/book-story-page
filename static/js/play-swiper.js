; (function (doc, win) {
    const list = doc.querySelector(".b-play-list");
    let touchX,
        moveX,
        currentIdx = 1,
        totalNum = list.children.length;
    list.addEventListener("touchstart", (e) => {
        if (e.target.className === "line" && e.touches.length === 1) {
            e.target.style.setProperty("--height", 7);
            touchX = e.touches[0].clientX;
            e.preventDefault();
        }
    }, { passive: false });

    list.addEventListener("touchmove", (e) => {
        if (e.target.className === "line" && e.touches.length === 1) {
            e.target.style.setProperty("--height", 7);
            let offset = e.touches[0].clientX - touchX;
            moveX = offset / win.innerWidth;
            e.preventDefault();
            list.style.setProperty("--translateXPercent", -moveX + currentIdx);
        }
    }, { passive: false });

    list.addEventListener("touchend", (e) => {
        if (e.target.className === "line") {
            if (moveX > 0 && moveX > 0.25) {
                if (currentIdx !== 0) {
                    currentIdx--;
                }
            } else if (moveX < 0 && moveX < -0.25) {
                if (currentIdx < totalNum - 1) {
                    currentIdx++;
                }
            }
            list.style.setProperty("--translateXPercent", currentIdx);
            e.target.style.setProperty("--height", 6);
        }
    }, { passive: false });
})(document, window);