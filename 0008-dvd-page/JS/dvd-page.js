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

// ================== DONNÉES ==================
const frenchmovie = {
    comédie: [
        {
            id: "les-tuche",
            title: "Les Tuche",
            year: 2011,
            duration: 95,
            img: "images/lestuches.jpg",
            desc: "Dans une petite ville du Nord, une famille déjantée remporte le gros lot et débarque dans un univers de luxe qui ne lui ressemble pas. Entre gaffes, bonne humeur et esprit de clan, chacun tente de rester soi-même malgré la nouvelle vie."
        },
        {
            id: "bienvenue-chez-les-chtis",
            title: "Bienvenue chez les Ch'tis",
            year: 2008,
            duration: 106,
            img: "images/bienvenue.jpg",
            desc: "Muté à Bergues, un postier du Sud découvre le Nord qu'il imaginait hostile. De quiproquos en rencontres chaleureuses, il apprivoise l'accent, la pluie… et surtout l'amitié qui bouscule ses préjugés."
        },
        {
            id: "intouchables",
            title: "Intouchables",
            year: 2011,
            duration: 112,
            img: "images/intouchables.jpg",
            desc: "À la suite d'un accident, un aristocrate tétraplégique embauche un aide à domicile venu d'un milieu populaire. Leur duo improbable se nourrit d'humour et d'audace: chacun secoue l'autre, jusqu'à réinventer sa façon d'être au monde."
        },
        {
            id: "les-visiteurs",
            title: "Les Visiteurs",
            year: 1993,
            duration: 107,
            img: "images/visiteurs.jpg",
            desc: "Un chevalier et son écuyer sont propulsés du Moyen Âge à la France des années 1990. Percés d'armures et de jurons, ils affrontent l'électricité, l'ascenseur et la politesse moderne dans une suite de catastrophes réjouissantes."
        },
        {
            id: "le-diner-de-cons",
            title: "Le Dîner de Cons",
            year: 1998,
            duration: 80,
            img: "images/diner.jpg",
            desc: "Chaque semaine, des bourgeois organisent un dîner où chacun amène un « con ». Mais le champion du soir, naïf et attachant, retourne la situation à force de gaffes sincères et de bonté."
        }
    ],

    drame: [
        {
            id: "la-haine",
            title: "La Haine",
            year: 1995,
            duration: 98,
            img: "images/haine.jpg",
            desc: "Au lendemain d'une bavure policière, trois amis de banlieue dérivent 24 heures durant, entre colère et désœuvrement. Un noir et blanc tendu qui questionne la spirale de la violence et le regard des institutions."
        },
        {
            id: "les-choristes",
            title: "Les Choristes",
            year: 2004,
            duration: 97,
            img: "images/choristes.jpg",
            desc: "Dans un internat austère de l'après-guerre, un surveillant rassemble des élèves difficiles autour d'un chœur. La musique fissure l'autoritarisme et redonne aux enfants une part d'innocence et d'élan."
        },
        {
            id: "un-prophete",
            title: "Un Prophète",
            year: 2009,
            duration: 155,
            img: "images/prophete.jpg",
            desc: "Jeune détenu sans repères, Malik apprend la loi du plus fort en prison. De petites missions en alliances dangereuses, il s'impose comme stratège et force d'ascension au cœur d'un système carcéral implacable."
        },
        {
            id: "amelie-poulain",
            title: "Le Fabuleux Destin d'Amélie Poulain",
            year: 2001,
            duration: 122,
            img: "images/amelie.jpg",
            desc: "À Montmartre, Amélie s'invente une vie faite de micro-bontés et de coïncidences poétiques. Quand elle croise Nino, collectionneur d'images oubliées, son imaginaire se frotte au risque du vrai rendez-vous."
        },
        {
            id: "de-rouille-et-dos",
            title: "De Rouille et d'Os",
            year: 2012,
            duration: 122,
            img: "images/rouille.jpg",
            desc: "Un père à la dérive et une dresseuse d'orques amputée s'apprivoisent dans une relation brute où se mêlent désir, survie et dignité. Deux corps cabossés cherchent un équilibre."
        }
    ],

    thriller: [
        {
            id: "ne-le-dis-a-personne",
            title: "Ne le dis à personne",
            year: 2006,
            duration: 131,
            img: "images/personne.jpg",
            desc: "Huit ans après le meurtre de sa femme, un pédiatre reçoit un e-mail troublant. La piste rouvre: faux-semblants, flics et secrets familiaux se télescopent dans une cavale sous haute tension."
        },
        {
            id: "36-quai-des-orfevres",
            title: "36 Quai des Orfèvres",
            year: 2004,
            duration: 111,
            img: "images/orfevres.jpg",
            desc: "Deux flics rivaux chassent le même gang de braqueurs. Au 36, l'ambition dévore tout: loyautés fragiles, procédures qui vacillent, morale qui s'effrite au fil de la traque."
        },
        {
            id: "le-pacte-des-loups",
            title: "Le Pacte des loups",
            year: 2001,
            duration: 142,
            img: "images/pacte.jpg",
            desc: "Sous Louis XV, une « bête » terrorise le Gévaudan. Un naturaliste et un guerrier iroquois enquêtent, entre complots, superstition et scènes d'action baroques."
        },
        {
            id: "la-proie",
            title: "La Proie",
            year: 2011,
            duration: 102,
            img: "images/proie.jpg",
            desc: "Évadé pour sauver sa famille, un braqueur traque un ex-codétenu devenu tueur. Polar de poursuite nerveux où la police se retrouve prise entre les deux."
        },
        {
            id: "affaire-sk1",
            title: "L'Affaire SK1",
            year: 2015,
            duration: 120,
            img: "images/sk1.jpg",
            desc: "Dans les années 90, la brigade criminelle de Paris remonte, pièce par pièce, la piste d'un tueur en série. Chronique procédurale des années ADN naissantes."
        }
    ],

    horreur: [
        {
            id: "grave",
            title: "Grave",
            year: 2016,
            duration: 98, 
            img: "images/grave.jpg",
            desc: "Justine, étudiante vétérinaire végétarienne, découvre une faim nouvelle après un bizutage carné. Corps, pulsions et identité déraillent dans un coming-of-age viscéral."
        },
        {
            id: "martyrs",
            title: "Martyrs",
            year: 2008,
            duration: 100, 
            img: "images/martyrs.jpg",
            desc: "Deux jeunes femmes hantées par un trauma d'enfance s'enfoncent dans une vengeance qui révèle un projet aussi fanatique que dérangeant. Extrême, radical et tragique."
        },
        {
            id: "frontieres",
            title: "Frontière(s)",
            year: 2007,
            duration: 108,
            img: "images/frontiere.jpeg",
            desc: "En fuite après un braquage, des jeunes tombent sur une famille néo-nazie dans une auberge isolée. Survival brutal qui dérape en cauchemar."
        },
        {
            id: "haute-tension",
            title: "Haute Tension",
            year: 2003,
            duration: 91,
            img: "images/tension.jpg",
            desc: "Deux amies révisent à la campagne; un tueur fait irruption dans la nuit. Course-poursuite suffocante et twist traumatique."
        },
        {
            id: "a-l-interieur",
            title: "À l'intérieur",
            year: 2007,
            duration: 83,
            img: "images/interieur.jpg",
            desc: "La veille de son accouchement, une femme enceinte est assiégée chez elle par une inconnue. Un huis clos gore et implacable."
        }
    ]
};


// ================== ÉTATS & HELPERS ==================
const favs = new Set();
const cart = [];

function slugify(str) {
    return String(str)
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function normalizeMovie(movie) {
    const id = movie.id ?? slugify(movie.title || crypto.randomUUID());
    return {
        id,
        title: movie.title ?? "Titre inconnu",
        year: movie.year ?? "—",
        duration: movie.duration ?? "?",
        img: movie.img ?? "",
        desc: movie.desc ?? "Résumé indisponible."
    };
}

function updateBadges() {
    const favEl = document.getElementById("favCount");
    const cartEl = document.getElementById("cartCount");
    if (favEl) favEl.textContent = favs.size;
    if (cartEl) cartEl.textContent = cart.length;
}

// ================== RENDU ==================
function showImages(category) {
    const gallery = document.getElementById("gallery");
    if (!gallery) return;

    gallery.innerHTML = "";

    const list = frenchmovie[category];
    if (!list) {
        gallery.textContent = "Catégorie introuvable.";
        return;
    }

    // 2 rangées x 3 colonnes => 6 items max
    list.slice(0, 6).forEach(raw => {
        const film = normalizeMovie(raw);

        const figure = document.createElement("figure");
        figure.tabIndex = 0;
        figure.dataset.id = film.id;

        const img = document.createElement("img");
        img.src = film.img;
        img.alt = `Affiche du film ${film.title}`;

        const caption = document.createElement("figcaption");
        caption.textContent = film.title;

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.innerHTML = `
      <h4>${film.title}</h4>
      <div class="meta">${film.year} • ${film.duration} min</div>
      <p class="desc">${film.desc}</p>
      <div class="actions">
        <button class="icon-btn fav"
                type="button"
                aria-pressed="${favs.has(film.id)}"
                data-id="${film.id}">
                <img class="icon" src="../navbar/images/heart.svg" alt="" aria-hidden="true">
                </button>
        <button class="icon-btn add-cart"
                type="button"
                data-id="${film.id}"> 
                <img class="icon" src="../navbar/images/shopping_cart.svg" alt="" aria-hidden="true">
                </button>
      </div>
    `;

        figure.append(img, caption, overlay);
        gallery.appendChild(figure);
    });
}

// ================== LISTENERS (UNE SEULE FOIS) ==================
document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    if (gallery) {
        gallery.addEventListener("click", (e) => {
            const favBtn = e.target.closest(".fav");
            const cartBtn = e.target.closest(".add-cart");

            if (favBtn) {
                const id = favBtn.dataset.id;
                if (favs.has(id)) {
                    favs.delete(id);
                    favBtn.setAttribute("aria-pressed", "false");
                } else {
                    favs.add(id);
                    favBtn.setAttribute("aria-pressed", "true");
                }
                updateBadges();
            }

            if (cartBtn) {
                const id = cartBtn.dataset.id;
                cart.push(id);
                updateBadges();
                cartBtn.textContent = "Ajouté";
            }
        });


    }

    // Boutons de catégories
    const selector = document.querySelector(".boutonselector");
    if (selector) {
        selector.addEventListener("click", (e) => {
            const btn = e.target.closest("button[data-category]");
            if (!btn) return;
            showImages(btn.dataset.category);
        });
    }

    // Init par défaut
    showImages("comédie");
    updateBadges();
});
