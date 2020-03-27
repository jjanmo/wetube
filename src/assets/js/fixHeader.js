const header = document.getElementById('jsHeader');
const headerHeight = header.offsetHeight;

function fixHeader() {
    if (window.scrollY >= headerHeight) {
        header.classList.add('headerFixed');
        header.style.marginBottom = 0 + 'px';
    }
    else {
        header.classList.remove('headerFixed');
        header.style.marginBottom = 30 + 'px';
    }
}

function init() {
    window.addEventListener('scroll', fixHeader);
}


if (header) {
    init();
}