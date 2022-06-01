const list = document.querySelector('.b-tab-bar ul'),
    marginLeft = list.style.getPropertyValue('--marginLeft'),
    listArr = [...list.children];
let idx = 0,
    time1,
    time2;
listArr[idx].classList.add('active');
list.style.setProperty("--offsetWidth", listArr[idx].offsetWidth);
list.addEventListener('touchend', (e) => {
    if (e.target.tagName === 'A') {
        listArr[idx].classList.remove('active');
        e.target.parentNode.classList.add('active');
        const currentIdx = listArr.indexOf(e.target.parentNode);
        time1 = setTimeout(function () {
            list.style.setProperty("--offsetLeft", getOffsetLeft(currentIdx));
            clearTimeout(time1);
        }, 100);
        time2 = setTimeout(function () {
            list.style.setProperty("--offsetWidth", e.target.parentNode.offsetWidth);
            clearTimeout(time2);
        }, 150);
        idx = currentIdx;
    }
});


function getOffsetLeft(idx) {
    let offsetLeft = 0;
    for (let index = 0; index < idx; index++) {
        offsetLeft += listArr[index].offsetWidth + Number(marginLeft);
    }
    return offsetLeft;
}
