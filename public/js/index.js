const imageLinks = document.querySelectorAll('.img-links-container a');

imageLinks.forEach(imageLink => {
  imageLink.style.background = `url(/img/${imageLink.id}.jpg) no-repeat center center`;
  imageLink.style.backgroundSize = 'contain';
});
