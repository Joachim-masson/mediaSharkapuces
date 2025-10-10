

//carrousel 
document.querySelectorAll('.carousel').forEach(carousel => {

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = carousel.querySelector('.carousel-button.next');
  const prevButton = carousel.querySelector('.carousel-button.prev');

  let currentIndex = 0;
  const slidesToShow = 3;

  function updateSlidePosition() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - slidesToShow) {
      currentIndex += slidesToShow;
    } else {
      currentIndex = 0;
    }
    updateSlidePosition();
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= slidesToShow;
    } else {
      currentIndex = slides.length - slidesToShow;
    }
    updateSlidePosition();
  });
});


//  Galerie "magie" et "fantastique" 
const images = {
  magie: [
    "images/magie/roue2.jpg",
    "images/magie/bannis.jpeg",
    "images/magie/animaux.jpeg"
  ],
  fantastique: [
    "images/fantastique/seign2.jpg",
    "images/fantastique/seign3.jpg",
  ]
};

function showImages(category) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  images[category].forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = category;
    gallery.appendChild(img);
  });
}

showImages('magie');
