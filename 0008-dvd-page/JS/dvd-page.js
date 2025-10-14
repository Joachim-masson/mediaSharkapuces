
//FRENCH MOVIES

// Base données
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


// Clés de stockage
const PANIER_KEY  = 'dvd.panier';
const FAVORIS_KEY = 'dvd.favoris';

// Local storage
let panier  = JSON.parse(localStorage.getItem(PANIER_KEY))  || []; 
let favoris = JSON.parse(localStorage.getItem(FAVORIS_KEY)) || [];

// Éléments DOM
const gallery   = document.getElementById('gallery');
const selector  = document.querySelector('.boutonselector');
const favPanel  = document.getElementById('favPanel');
const favBtn    = document.getElementById('favBtn');
const favBadge  = document.getElementById('favBadge');
const cartBadge = document.getElementById('cartBadge');

// Récupérer tous les films dans une seule liste
const toutesCategories = Object.keys(frenchmovie);
const tousLesFilms = toutesCategories.flatMap(cat =>
  frenchmovie[cat].map(f => ({ ...f, category: cat }))
);

const filmIndex = new Map(tousLesFilms.map(f => [String(f.id), f]));

// Fonctions utilitaires
const savePanier  = () => localStorage.setItem(PANIER_KEY,  JSON.stringify(panier));
const saveFavoris = () => localStorage.setItem(FAVORIS_KEY, JSON.stringify(favoris));

const updateBadges = () => {
  cartBadge.textContent = panier.length  || 0;
  favBadge.textContent  = favoris.length || 0;

  for (const el of [cartBadge, favBadge]) {
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
    el.toggleAttribute('hidden', Number(el.textContent) === 0);
  }

  const countEl = favPanel?.querySelector('header .count');
  if (countEl) countEl.textContent = `(${favoris.length})`;
};

const showToast = (message, type = 'info', duration = 2200) => {
  const container = document.getElementById('toast') || (() => {
    const d = document.createElement('div'); d.id = 'toast'; document.body.appendChild(d); return d;
  })();
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = message;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(-6px)'; setTimeout(() => t.remove(), 300); }, duration);
};

const isInArrayById = (arr, id) => arr.some(item => String(item.id) === String(id));

// Rendu de la galerie
const renderFilms = (liste) => {
  if (!gallery) return;
  if (!liste || !liste.length) {
    gallery.innerHTML = `<p>Aucune donnée trouvée.</p>`;
    return;
  }
  gallery.innerHTML = liste.slice(0, 6).map(film => `
    <figure data-id="${film.id}" tabindex="0">
      <img src="${film.img}" alt="Affiche du film ${film.title}">
      <figcaption>${film.title}</figcaption>
      <div class="overlay">
        <h4>${film.title}</h4>
        <div class="meta">${film.year} • ${film.duration} min</div>
        <p class="desc">${film.desc}</p>
        <div class="actions">
          <button class="icon-btn action-favoris" type="button" data-id="${film.id}"
                  aria-pressed="${isInArrayById(favoris, film.id)}" title="Ajouter aux favoris">
            <img class="icon" src="../navbar/images/heart.svg" alt="" aria-hidden="true">
          </button>
          <button class="icon-btn action-panier" type="button" data-id="${film.id}"
                  aria-pressed="${isInArrayById(panier, film.id)}" title="Ajouter au panier">
            <img class="icon" src="images/shopping-cart-white.svg" alt="" aria-hidden="true">
          </button>
        </div>
      </div>
    </figure>
  `).join('');
};

// Rendu du dropdown favoris
const renderFavDropdown = () => {
  if (!favPanel) return;
  const ul    = favPanel.querySelector('.fav-list');
  const empty = favPanel.querySelector('.empty');
  const count = favPanel.querySelector('header .count');

  ul.innerHTML = '';
  count.textContent = `(${favoris.length})`;

  if (favoris.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  ul.innerHTML = favoris.map(f => `
    <li data-id="${f.id}">
      <img src="${f.img}" alt="Affiche de ${f.title}">
      <div>
        <div class="title">${f.title}</div>
        <div class="meta">${f.year} • ${f.duration} min</div>
      </div>
      <button class="remove" type="button" aria-label="Retirer ${f.title}" data-id="${f.id}">×</button>
    </li>
  `).join('');
};

// Événements
if (gallery) {
  gallery.addEventListener('click', (e) => {
    const btnFav  = e.target.closest('.action-favoris');
    const btnCart = e.target.closest('.action-panier');
    if (!btnFav && !btnCart) return;

    const id = (btnFav || btnCart).dataset.id;
    const film = filmIndex.get(String(id));
    if (!film) return;

    // Gestion du toast et du stockage
    if (btnFav) {
      if (!isInArrayById(favoris, id)) {
        favoris.push(film);
        btnFav.setAttribute('aria-pressed', 'true');
        showToast(`"${film.title}" ajouté aux favoris !`, 'success');
      } else {
        favoris = favoris.filter(f => String(f.id) !== String(id));
        btnFav.setAttribute('aria-pressed', 'false');
        showToast(`"${film.title}" retiré des favoris.`, 'info');
      }
      saveFavoris();
      updateBadges();
      renderFavDropdown();
    }
// Gestion du panier
    if (btnCart) {
      if (!isInArrayById(panier, id)) {
        panier.push(film);
        btnCart.setAttribute('aria-pressed', 'true');
        showToast(`"${film.title}" ajouté au panier !`, 'success');
      } else {
        panier = panier.filter(p => String(p.id) !== String(id));
        btnCart.setAttribute('aria-pressed', 'false');
        showToast(`"${film.title}" retiré du panier.`, 'info');
      }
      savePanier();
      updateBadges();
    }
  });
}

// 2) Sélecteur de catégorie
if (selector) {
  selector.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-category]');
    if (!btn) return;
    const cat = btn.dataset.category;
    const liste = frenchmovie[cat] || [];
    renderFilms(liste);
  });
}

// 3) Dropdown favoris (ouverture clic + fermeture off-panel)
if (favBtn && favPanel) {
  favBtn.addEventListener('click', () => {
    const opened = !favPanel.hasAttribute('hidden');
    favPanel.toggleAttribute('hidden', opened);
    favBtn.setAttribute('aria-expanded', String(!opened));
  });

  document.addEventListener('click', (e) => {
    if (!favPanel.contains(e.target) && !favBtn.contains(e.target)) {
      favPanel.setAttribute('hidden', '');
      favBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Retirer depuis le dropdown (délégation)
  favPanel.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove');
    if (!removeBtn) return;
    const id = removeBtn.dataset.id;
    const item = favoris.find(f => String(f.id) === String(id));
    favoris = favoris.filter(f => String(f.id) !== String(id));
    saveFavoris();
    updateBadges();
    renderFavDropdown();
    const btnFavInGrid = document.querySelector(`.action-favoris[data-id="${CSS.escape(String(id))}"]`);
    if (btnFavInGrid) btnFavInGrid.setAttribute('aria-pressed', 'false');
    showToast(`"${item?.title || 'Article'}" retiré des favoris.`, 'info');
  });
}

// 4) Synchronisation multi-onglets
window.addEventListener('storage', (e) => {
  if (e.key === PANIER_KEY)  { try { panier  = JSON.parse(e.newValue) || []; } catch { panier = []; } }
  if (e.key === FAVORIS_KEY) { try { favoris = JSON.parse(e.newValue) || []; } catch { favoris = []; } }
  updateBadges();
  renderFavDropdown();
});
// Initialisation
updateBadges();
renderFilms(frenchmovie['comédie']);   // catégorie par défaut
renderFavDropdown();