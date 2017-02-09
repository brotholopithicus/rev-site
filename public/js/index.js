const imageLinks = document.querySelectorAll('.img-links-container a');

imageLinks.forEach(imageLink => {
    imageLink.style.background = `url(/img/${imageLink.id}.jpg) no-repeat center center`;
    imageLink.style.backgroundSize = 'contain';
});

const panels = document.querySelectorAll('.panel');

function toggleOpen() {
    panels.forEach(panel => {
        if (panel !== this) {
            panel.removeEventListener('transitionend', toggleActive);
            panel.classList.remove('open');
            panel.classList.remove('open-active');
        } else {
            this.classList.toggle('open');
            this.addEventListener('transitionend', toggleActive);
        }
    });
}

function toggleActive(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

function resetPanels(exception) {
    panels.forEach(panel => {
        panel.classList.remove('open');
        panel.classList.remove('open-active');
        panel.addEventListener('transitionend', toggleActive);
    });
}
let index = 0;
let panelInterval = setInterval(openPanel, 4000);

function openPanel() {
    toggleOpen.bind(panels[index])();
    index++;
    if (index > panels.length - 1) {
        index = 0;
    }
}

function clearPanelInterval() {
    resetPanels();
    clearInterval(panelInterval);
    toggleOpen.apply(this);
}
panels.forEach(panel => panel.addEventListener('click', clearPanelInterval));
