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


//FRENCH MOVIES

const frenchmovie = {
    comédie: [
        { title: "Les Tuche", img: "../images/lestuches.jpg" },
        { title: "Bienvenue chez les Ch'tis", img: "../images/bienvenue.jpg" },
        { title: "Intouchables", img: "../images/intouchables.jpg" },
        { title: "Les Visiteurs", img: "../images/visiteurs.jpg" },
        { title: "Le Dîner de Cons", img: "../images/diner.jpg" }
    ],

    drame: [
        { title: "La Haine", img: "../images/haine.jpg" },
        { title: "Les Choristes", img: "../images/choristes.jpg" },
        { title: "Un Prophète", img: "../images/prophete.jpg" },
        { title: "Amélie Poulain", img: "../images/amelie.jpg" },
        { title: "De Rouille et d'Os", img: "../images/rouille.jpg" }
    ],

    thriller: [
        { title: "Ne le dis à personne", img: "../images/personne.jpg" },
        { title: "36 Quai des Orfèvres", img: "../images/orfevres.jpg" },
        { title: "Le Pacte des loups", img: "../images/pacte.jpg" },
        { title: "La Proie", img: "../images/proie.jpg" },
        { title: "L'Affaire SK1", img: "../images/sk1.jpg" }
    ],

    horreur: [
        { title: "Grave", img: "../images/grave.jpg" },
        { title: "Martyrs", img: "../images/martyrs.jpg" },
        { title: "Frontière(s)", img: "../images/frontiere.jpeg" },
        { title: "Haute Tension", img: "../images/tension.jpg" },
        { title: "À l'intérieur", img: "../images/interieur.jpg" }
    ]
};

function showImages(category) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    if (!frenchmovie[category]) {
        gallery.textContent = "Catégorie introuvable.";
        return;
    }

    frenchmovie[category].forEach(film => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = film.img;
        img.alt = `Affiche du film ${film.title}`;

        const caption = document.createElement("figcaption");
        caption.textContent = film.title;

        figure.appendChild(img);
        figure.appendChild(caption);
        gallery.appendChild(figure);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // par défaut : affiche les comédies
    showImages("comédie");

    // écoute les clics sur les boutons
    document.querySelector(".boutonselector").addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-category]");
        if (!btn) return;
        showImages(btn.dataset.category);
    });
});
