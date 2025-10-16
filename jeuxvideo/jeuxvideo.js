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
            currentIndex = 0; // on revient au début
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

// carousel de ma page

let mesImages = document.querySelectorAll('.container2 img');

const BASE_PATH = "images/grid/";
let categories = {
  fps: ["images/grid/b4b87eb735d738ae903e018ea687de1778dc4b53d05b3edf.avif", "images/grid/apex-legends-1sze4.jpg", "images/grid/Capture d’écran 2025-10-10 151928.png", "images/grid/1696414021417.webp", "images/grid/iHZIqzxIpvLe8g-medium.jpg", "images/grid/za3pxrr77px31.jpg"],
  rpg: ["images/grid/clair-obscur.avif", "images/grid/diablo4.webp", "images/grid/dota2.jpg", "images/grid/eldenring.avif", "images/grid/hades2.jpeg", "images/grid/wukong.avif"],
  combat: ["images/grid/dbz.avif", "images/grid/for honor.jpg", "images/grid/mortal.jpeg", "images/grid/street.jpg", "images/grid/tekken.jpg", "images/grid/batman.avif"],
  course: ["images/grid/forza5.webp", "images/grid/nfs most wanted.webp", "images/grid/nfs heat.avif", "images/grid/trackmania.png", "images/grid/corsa.avif", BASE_PATH +"f1.webp"]
};

let mesBoutons = document.querySelectorAll('button');

mesBoutons.forEach(function (unBouton) {
  unBouton.addEventListener('click', function () {
       
    let categorie = unBouton.dataset.categorie;
     
    for (let i = 0; i < 6; i++) {
      if (categories[categorie] && categories[categorie][i]) {
        
        mesImages[i].src = categories[categorie][i];
      }
    }
  });
});

// grid dynamique qui change en fonction des catégories