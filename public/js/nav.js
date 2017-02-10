const navLinks = document.querySelectorAll('.nav-list a');
const navToggle = document.querySelector('.nav-toggle');

const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', toggleActive);

function toggleActive(e) {
    navList.classList.toggle('active');
    if (navList.classList.contains('active')) {
        navList.style.display = '';
    } else {
        navList.style.display = 'none';
    }
}

navLinks.forEach(link => {
    if (link.classList.contains('active')) link.classList.remove('active');
    let pathname = link.href.substr(link.href.lastIndexOf('/'), link.href.length);
    let relPath = '/' + window.location.pathname.split('/')[1];
    if (relPath === pathname) {
        link.classList.add('active');
    }
});

window.addEventListener('resize', checkDimensions);

function checkDimensions() {
    if (window.innerWidth >= 769) {
        navList.style.display = '';
    } else {
        navList.style.display = 'none';
    }
}
checkDimensions();
