const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-button.next');
    const prevButton = carousel.querySelector('.carousel-button.prev');

    let currentIndex = 0;
    const slidesToShow =3;

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

const images = {
    shonen: [
        "image/dragon_ball.png",
        "image/one_piece-shonen.jpg",
        "image/fullmetal_alchemist.jpg",
        "image/death_note.jpg",
        "image/naruto shono.jpg",
        "image/hunter_x_hunter.jpg"
    ],
    shojo: [
        "image/yona1.jpg",
        "image/yokai2.jpg",
        "image/Yotsuba tome 16.webp",
        "image/skibeat4.jpg",
        "image/hostclub5.jpg",
        "image/kamen6.jpg"
    ],
    seinen: [
        "image/bersk1.jpg",
        "image/akira2.png",
        "image/3.png",
        "image/gunnm4.jpg",
        "image/vagabond5.jpg",
        "image/pluto6.jpg"
    ],
    komodo: [
        "image/tohu_bohu1.jpg",
        "image/chi_une_vie_de_chat_tome_12.jpg",
        "image/nekojima_l_ile_des_chats3.jpg",
        "image/Kamisama4.jpg",
        "image/koko5.jpg",
        "image/Momo_et_le_messager_du_soleil_tome_016.jpg",
    ]
};
  function showImages(category) {
      const gallery = document.getElementById("gallery");
      gallery.innerHTML = ""; // Efface la galerie

      images[category].forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        gallery.appendChild(img);
      });
    }
    showImages('shonen');