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


let mesImages = document.querySelectorAll('.container2 img');

// 2. Définir les catégories
let categories = {
    fps: ["", "images/fps2.jpg", "images/fps3.jpg", "images/fps4.jpg", "images/fps5.jpg", "images/fps6.jpg"],
    rpg: ["images/rpg1.jpg", "images/rpg2.jpg", "images/rpg3.jpg", "images/rpg4.jpg", "images/rpg5.jpg", "images/rpg6.jpg"]

};

let mesBoutons = document.querySelectorAll('.bouton button');

mesBoutons.forEach(function (unBouton) {
    unBouton.addEventListener('click', function () {


        let categorie = unBouton.dataset.category;

        // 6. Boucle pour changer les 6 images
        for (let i = 0; i < 6; i++) {
            mesImages[i].src = categories[categorie][i];
        }

    });
});
