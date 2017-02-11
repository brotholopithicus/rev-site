const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('focus', selectHandler)
});

function selectHandler(e) {
    inputs.forEach(input => {
        input.parentNode.classList.remove('focused')
    });
    if (this.type === 'submit') return;
    this.parentNode.classList.add('focused');
}
