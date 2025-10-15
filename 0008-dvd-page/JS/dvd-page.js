// --- MISE A JOUR IMMEDIATE DES BADGES AU CHARGEMENT DE LA PAGE ---

// On définit les clés de stockage une seule fois
const PANIER_KEY = 'Panier';
const FAVORIS_KEY = 'Favoris';

// On récupère les listes depuis le localStorage
const panierInitial = JSON.parse(localStorage.getItem(PANIER_KEY)) || [];
const favorisInitial = JSON.parse(localStorage.getItem(FAVORIS_KEY)) || [];

// On met à jour les badges avec les données récupérées
document.getElementById('cartBadge').textContent = panierInitial.length || 0;
document.getElementById('favBadge').textContent = favorisInitial.length || 0;

// ---- CONFIG JSON (chemin RELATIF à dvd-page.html) ----
const JSON_URL = './data/dvd.json'; // place le fichier ici: 0008-dvd-page/data/movies.json

// ---- Helpers courts ----
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

let catalogue = null;
let filmIndex = new Map();
let panier  = JSON.parse(localStorage.getItem(PANIER_KEY))  || [];
let favoris = JSON.parse(localStorage.getItem(FAVORIS_KEY)) || [];

// Éléments DOM
const favPanel  = $('#favPanel');
const favBtn    = $('#favBtn');
const favBadge  = $('#favBadge');
const cartBadge = $('#cartBadge');

// LS save
const savePanier  = () => localStorage.setItem(PANIER_KEY,  JSON.stringify(panier));
const saveFavoris = () => localStorage.setItem(FAVORIS_KEY, JSON.stringify(favoris));
const isInArrayById = (arr, id) => arr.some(item => String(item.id) === String(id));

// Badges
function updateBadges() {
  if (!cartBadge || !favBadge) return;
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
}

function showToast(message, type = 'info', duration = 2200) {
  const container = document.getElementById('toast') || (() => {
    const d = document.createElement('div'); d.id = 'toast'; document.body.appendChild(d); return d;
  })();
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = message;
  container.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(-6px)';
    setTimeout(() => t.remove(), 300);
  }, duration);
}

// Charge le JSON et construit l'index
async function loadCatalogue() {
  const res = await fetch(JSON_URL, { cache: 'no-store' });
  if (!res.ok) {
    console.error('Fetch catalogue KO:', res.status, res.statusText, 'URL:', new URL(JSON_URL, location.href).href);
    throw new Error('HTTP '+res.status);
  }
  catalogue = await res.json();
  buildIndex();
}

function buildIndex() {
  filmIndex.clear();
  if (!catalogue) return;
//parcours le catalogue pour créer un index plat des films
  for (const [region, genres] of Object.entries(catalogue)) {
    for (const [genre, films] of Object.entries(genres || {})) {
      for (const f of films || []) {
        const key = String(f.id);
        if (filmIndex.has(key)) {
          console.warn(`ID dupliqué dans le catalogue: "${key}" (${region}/${genre}) — l'entrée précédente sera écrasée.`);
        }
        filmIndex.set(key, { ...f, region, genre });
      }
    }
  }
}

//dropdown global favoris
function renderFavDropdown() {
  if (!favPanel) return;
  const ul    = favPanel.querySelector('.fav-list');
  const empty = favPanel.querySelector('.empty');
  const count = favPanel.querySelector('header .count');

  ul.innerHTML = '';
  if (count) count.textContent = `(${favoris.length})`;

  if (favoris.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

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
}

///section des films par région
function createMovieSection(sectionEl, regionKey, defaultGenre) {
  if (!sectionEl) return;
  const gallery  = sectionEl.querySelector('.gallery');
  const selector = sectionEl.querySelector('.boutonselector');

  const list = (genre) => catalogue?.[regionKey]?.[genre] ?? [];

  // Visuel des films
  const renderFilms = (liste) => {
    if (!gallery) return;
    if (!liste || !liste.length) {
      gallery.innerHTML = `<p>Aucune donnée trouvée.</p>`;
      return;
    }
    gallery.innerHTML = liste.slice(0, 6).map(film => `
      <figure data-id="${film.id}" tabindex="0">
        <img src="${film.img}" alt="Affiche du film ${film.title}" onerror="this.src='images/placeholder.jpg'">
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

  // Changement de catégorie animé
  let __isSwitching = false;
  function switchCategory(genre) {
    if (!gallery || __isSwitching) return;
    __isSwitching = true;

    const liste = list(genre);

    const cs = getComputedStyle(gallery);
    const dur   = Math.max(...cs.transitionDuration.split(',').map(s => parseFloat(s) || 0));
    const delay = Math.max(...cs.transitionDelay.split(',').map(s => parseFloat(s) || 0));
    const totalMs = (dur + delay) * 1000;

    const prevH = gallery.offsetHeight;
    gallery.style.height = prevH + 'px';
    gallery.classList.add('is-leaving');

    // reflow
    void gallery.offsetWidth;

    let leftPhaseDone = false;
    const proceedToSwap = () => {
      if (leftPhaseDone) return;
      leftPhaseDone = true;

      renderFilms(liste);

      // entrée
      const nextH = gallery.scrollHeight;
      gallery.style.height = nextH + 'px';

      gallery.classList.remove('is-leaving');
      gallery.classList.add('is-entering');

      let cleaned = false;
      const cleanUp = (ev) => {
        if (ev && ev.propertyName && ev.propertyName !== 'height') return;
        if (cleaned) return;
        cleaned = true;
        gallery.removeEventListener('transitionend', cleanUp);
        gallery.style.height = '';
        gallery.classList.remove('is-entering');
        __isSwitching = false;
      };

      gallery.addEventListener('transitionend', cleanUp);
      setTimeout(cleanUp, Math.max(220, totalMs + 80));
    };

    // fin de l'anim de sortie
    const onLeave = (e) => {
      if (e.target !== gallery) return;
      gallery.removeEventListener('transitionend', onLeave);
      proceedToSwap();
    };
    gallery.addEventListener('transitionend', onLeave, { once: true });
    setTimeout(proceedToSwap, Math.max(220, totalMs + 80));
  }

  sectionEl.addEventListener('click', (e) => {
    const tab = e.target.closest('button[data-category]');
    if (tab && selector.contains(tab)) {
      selector.querySelectorAll('button[data-category]').forEach(b => {
        b.classList.toggle('active-red', b === tab);
        b.setAttribute('aria-selected', b === tab ? 'true' : 'false');
      });
      switchCategory(tab.dataset.category);
      return;
    }

// favoris + panier
    const btnFav  = e.target.closest('.action-favoris');
    const btnCart = e.target.closest('.action-panier');
    if (!btnFav && !btnCart) return;

    const id   = (btnFav || btnCart).dataset.id;
    const film = filmIndex.get(String(id));
    if (!film) return;

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
      saveFavoris(); updateBadges(); renderFavDropdown();
    }

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
      savePanier(); updateBadges();
    }
  });

  const defaultTab =
    selector.querySelector('[data-category].active-red')?.dataset.category
    || defaultGenre
    || Object.keys(catalogue?.[regionKey] || {})[0];

  switchCategory(defaultTab);
}

// Favoris dropdown
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

  // Suppresion d'un favori dans le panneau
  favPanel.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove');
    if (!removeBtn) return;
    const id = removeBtn.dataset.id;
    const item = favoris.find(f => String(f.id) === String(id));
    favoris = favoris.filter(f => String(f.id) !== String(id));
    saveFavoris(); updateBadges(); renderFavDropdown();

    const btnFavInGrid = document.querySelector(`.action-favoris[data-id="${CSS.escape(String(id))}"]`);
    if (btnFavInGrid) btnFavInGrid.setAttribute('aria-pressed', 'false');
    showToast(`"${item?.title || 'Article'}" retiré des favoris.`, 'info');
  });
}

//Synchronisation entre onglets
window.addEventListener('storage', (e) => {
  if (e.key === PANIER_KEY)  { try { panier  = JSON.parse(e.newValue) || []; } catch { panier = []; } }
  if (e.key === FAVORIS_KEY) { try { favoris = JSON.parse(e.newValue) || []; } catch { favoris = []; } }
  updateBadges();
  renderFavDropdown();
});

//Init
(async () => {
  try {
    updateBadges();
    await loadCatalogue();    // charge le JSON et construit l'index
    renderFavDropdown();

    createMovieSection(document.getElementById('french'),   'french',   'comédie');
    createMovieSection(document.getElementById('american'), 'american', 'action');
    createMovieSection(document.getElementById('european'), 'european', 'comédie');
    createMovieSection(document.getElementById('asian'),    'asian',    'comédie');

  } catch (err) {
    console.error('Catalogue error:', err, 'URL:', new URL(JSON_URL, location.href).href);
    // feedback visuel si souci de chargement
    $$('.movie-section .gallery').forEach(g => g.innerHTML = `<p>Erreur chargement catalogue.</p>`);
  }
})();