const navButton = document.querySelector('.toggleNav');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav li a');

function toggleMenu(e) {
    mainNav.style.display = mainNav.style.display === 'none' ?
        mainNav.style.display = '' :
        mainNav.style.display = 'none';
}

navButton.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    if (link.classList.contains('active-link')) link.classList.remove('active-link');
    let pathname = link.href.substr(link.href.lastIndexOf('/'), link.href.length);
    if (window.location.pathname === pathname) {
        link.classList.add('active-link');
    }
});

window.addEventListener('resize', windowResizeHandler);

function windowResizeHandler() {
    if (window.innerWidth < 769) {
        mainNav.style.display = 'none';
        navButton.style.display = '';
    } else {
        mainNav.style.display = '';
        navButton.style.display = 'none';
    }
}

window.onload = windowResizeHandler();
