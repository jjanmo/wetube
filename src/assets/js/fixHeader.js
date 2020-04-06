const header = document.getElementById('jsHeader');
const headerHeight = header.offsetHeight;
const headerWidth = header.offsetWidth;

function fixHeader() {
    if (window.scrollY >= headerHeight) {
        header.classList.add('headerFixed');
        header.style.marginBottom = 0 + 'px';
    }
    else {
        header.classList.remove('headerFixed');
        if (headerWidth > 1281) {
            header.style.marginBottom = 30 + 'px';
        }
        else if (headerWidth > 1025 && headerWidth <= 1280) {
            header.style.marginBottom = 15 + 'px';
        }
    }
}

function init() {
    window.addEventListener('scroll', fixHeader);
}


if (header) {
    init();
}