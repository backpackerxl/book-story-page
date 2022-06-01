; (function (doc, win) {
    const author = doc.querySelector('#author'),
        bookname = doc.querySelector('#bookname'),
        bookcover = doc.querySelector('#bookcover'),
        data = win.location.href.split('?');
    let value = {};
    if (data.length === 2) {
        data[1].split('&').forEach(val => {
            const temp = val.split('=');
            value[temp[0]] = win.decodeURIComponent(temp[1])
        });
    }
    bookname.innerHTML = value.bookname;
    author.innerHTML = value.author;
    bookcover.src = value.bookcover;
})(document, window);