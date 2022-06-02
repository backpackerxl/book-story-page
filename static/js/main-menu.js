const $ref = (function () {
    function save(str, data) {
        localStorage.setItem(str, JSON.stringify(data));
    }

    function get(str) {
        return JSON.parse(localStorage.getItem(str));
    }

    function rm(str) {
        localStorage.removeItem(str);
    }

    function domDoWithFunc(dom, func, func1) {
        if (dom !== null && typeof dom === 'object') {
            if (typeof func === 'function') {
                func();
            } else {
                throw new Error(func + 'is not a function.');
            }
        } else {
            if (typeof func1 === 'function') {
                func1();
            } else {
                throw new Error(func1 + 'is not a function.');
            }
        }
    }

    return {
        save: save,
        get: get,
        rm: rm,
        domDoWithFunc: domDoWithFunc
    }
})();

; (function (doc, win) {
    const menu_list = doc.querySelector('#menu_list'),
        menu_open = doc.querySelector('#menu_open'),
        cover = doc.querySelector('#cover'),
        check = doc.querySelector('#start'),
        rightFunction = doc.querySelector('#rightFunction');

    let confirm = $ref.get('bStoryGobal') || false;
    if (typeof confirm !== 'boolean') {
        confirm = confirm.isconfirm;
    }

    $ref.domDoWithFunc(rightFunction, () => {
        rightFunction.checked = confirm;

        check.addEventListener('touchend', (e) => {
            if (e.target.tagName === 'LABEL' || e.target.tagName === 'SPAN') {
                const temp = rightFunction.checked;
                if (!temp) {
                    confirm = true;
                    $ref.save('bStoryGobal', { isconfirm: !temp });
                } else {
                    confirm = false;
                    $ref.rm('bStoryGobal');
                }
            }
        });
    }, () => { });



    menu_open.addEventListener('touchend', () => {
        menu_list.classList.add('active');
        cover.classList.add('cover');
        doc.querySelector('body').style.overflow = 'hidden';
    });

    let touchX,
        moveX;
    const startMove = (e) => {
        if (e.touches.length === 1) {
            touchX = e.touches[0].clientX;
        }
    }
    doc.documentElement.addEventListener('touchstart', startMove, { passive: false });
    const showMenu = (e) => {
        if (e.touches.length === 1) {
            let offset = e.touches[0].clientX - touchX;
            moveX = offset / win.innerWidth;
            if (moveX > 0.5) {
                if (confirm) {
                    if (e.target.classList.value === 'line') {
                        return;
                    }
                    document.documentElement.scrollTo(0, 0);
                    menu_list.classList.add('active');
                    cover.classList.add('cover');
                    doc.querySelector('body').style.overflow = 'hidden';
                } else {
                    $ref.domDoWithFunc(rightFunction, () => {
                        e.cancelBubble = true;
                        const temp = win.confirm('你想打开向右滑动的开关吗?');
                        if (temp) {
                            rightFunction.checked = true;
                            confirm = true;
                            $ref.save('bStoryGobal', { isconfirm: true });
                        }
                    }, () => {
                        e.cancelBubble = true;
                        const temp = win.confirm('你想打开向右滑动的开关吗?');
                        if (temp) {
                            const currentUrl = location.href;
                            const goto = currentUrl.substring(0, currentUrl.lastIndexOf("/")) + "/user.html"
                            location.assign(goto);
                        }
                    });
                }
            }
        }
    }

    doc.documentElement.addEventListener('touchmove', showMenu, { passive: false });

    doc.documentElement.addEventListener("touchend", (e) => {
        if (e.target.classList.value === 'cover' || e.target.classList.value === 'fa-solid fa-close') {
            menu_list.classList.remove('active');
            cover.classList.remove('cover');
            doc.querySelector('body').style = '';
        }
    }, { passive: false });
})(document, window);
