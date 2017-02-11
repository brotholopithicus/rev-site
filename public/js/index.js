const imageLinks = document.querySelectorAll('.img-links-container a');

imageLinks.forEach(imageLink => {
    imageLink.style.background = `url(/img/${imageLink.id}.jpg) no-repeat center center`;
    imageLink.style.backgroundSize = 'contain';
});

const panels = document.querySelectorAll('.panel');

function toggleOpen() {
    this.classList.toggle('open');
    panels.forEach(panel => {
        if (panel !== this) {
            panel.removeEventListener('transitionend', toggleActive);
            panel.classList.remove('open');
            panel.classList.remove('open-active');
        } else {
            this.addEventListener('transitionend', toggleActive);
        }
    })
}

function toggleActive(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
