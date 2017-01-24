const navLinks = document.querySelectorAll('.navbar-nav a');

navLinks.forEach(link => {
    if (link.classList.contains('active')) link.classList.remove('active');
    let pathname = link.href.substr(link.href.lastIndexOf('/'), link.href.length);
    if (window.location.pathname === pathname) {
        link.classList.add('active');
    }
});
