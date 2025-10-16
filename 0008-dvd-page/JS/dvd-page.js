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
const JSON_URL = "./data/dvd.json"; 

// Helper de sélection DOM
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

let catalogue = null;            
let filmIndex = new Map();       
let panier  = JSON.parse(localStorage.getItem(PANIER_KEY))  || [];
let favoris = JSON.parse(localStorage.getItem(FAVORIS_KEY)) || [];

// éléments DOM
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

// Charge le Json et construit l'index
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
          console.warn(`ID dupliqué: "${key}" (${region}/${genre}) — l'entrée précédente sera écrasée.`);
        }
        filmIndex.set(key, { ...f, region, genre });
      }
    }
  }
}

// Dropdown global favoris
function renderFavDropdown() {
  if (!favPanel) return;
  const ul    = favPanel.querySelector('.fav-list');
  const empty = favPanel.querySelector('.empty');
  const count = favPanel.querySelector('header .count');

  ul.innerHTML = '';
  if (count) count.textContent = `(${favoris.length})`;

//bouton vider favoris
  let favFooter = favPanel.querySelector('.fav-footer');
  if (!favFooter) {
    favFooter = document.createElement('footer');
    favFooter.className = 'fav-footer';
    favFooter.innerHTML = `
      <footer class="cart-footer">
      <button class="vider-favoris" type="button">
        Vider les favoris
      </button>
      </footer>
    `;
    favPanel.appendChild(favFooter);
  }

  if (favoris.length === 0) {
    if (empty) empty.style.display = 'block';
    favFooter.style.display = 'none';
    return;
  }
  if (empty) empty.style.display = 'none';
  favFooter.style.display = 'block';

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

//Section films (par région)
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

  // Animation (ta logique)
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
    void gallery.offsetWidth;

    let leftPhaseDone = false;
    const proceedToSwap = () => {
      if (leftPhaseDone) return;
      leftPhaseDone = true;

      renderFilms(liste);
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

    const onLeave = (e) => {
      if (e.target !== gallery) return;
      gallery.removeEventListener('transitionend', onLeave);
      proceedToSwap();
    };
    gallery.addEventListener('transitionend', onLeave, { once: true });
    setTimeout(proceedToSwap, Math.max(220, totalMs + 80));
  }

  // Délégation d'événements DANS la section
  sectionEl.addEventListener('click', (e) => {
    // Tabs genres
    const tab = e.target.closest('button[data-category]');
    if (tab && selector.contains(tab)) {
      selector.querySelectorAll('button[data-category]').forEach(b => {
        b.classList.toggle('active-red', b === tab);
        b.setAttribute('aria-selected', b === tab ? 'true' : 'false');
      });
      switchCategory(tab.dataset.category);
      return;
    }

    // Actions favoris/panier
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
      savePanier(); updateBadges(); renderCartDropdown(); // dropdown panier
    }
  });

  // Affichage initial
  const defaultTab =
    selector.querySelector('[data-category].active-red')?.dataset.category
    || defaultGenre
    || Object.keys(catalogue?.[regionKey] || {})[0];

  switchCategory(defaultTab);
}

/* ---------- Panneau favoris (global) ---------- */
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

favPanel.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('.remove');
  const clearBtn  = e.target.closest('.vider-favoris');

  // suppression solo
  if (removeBtn) {
    const id = removeBtn.dataset.id;
    const item = favoris.find(f => String(f.id) === String(id));
    favoris = favoris.filter(f => String(f.id) !== String(id));
    saveFavoris();
    updateBadges();
    renderFavDropdown();

    const btnFavInGrid = document.querySelector(`.action-favoris[data-id="${CSS.escape(String(id))}"]`);
    if (btnFavInGrid) btnFavInGrid.setAttribute('aria-pressed', 'false');

    showToast(`"${item?.title || 'Article'}" retiré des favoris.`, 'info');
    return;
  }

  // Vide tous les favoris
  if (clearBtn) {
    if (!favoris.length) return;
    if (confirm('Vider tous les favoris ?')) {
      favoris = [];
      saveFavoris();
      updateBadges();
      renderFavDropdown();
      showToast('Favoris vidés.', 'info');
    }
    return;
  }
});

}

// Panier
let cartPanel = null;
function ensureCartPanel() {
  const panierContainer = document.getElementById('panier-container');
  if (!panierContainer) return null;

  if (!cartPanel) {
    cartPanel = document.createElement('div');
    cartPanel.id = 'cartPanel';
    cartPanel.className = 'fav-panel cart-panel'; 
    cartPanel.setAttribute('hidden', '');
    cartPanel.innerHTML = `
      <header>Panier <span class="count">(0)</span></header>
      <ul class="cart-list" role="list"></ul>
      <p class="empty">Aucun article dans le panier.</p>
      <footer class="cart-footer">
        <button class="vider-panier" type="button">
          Vider le panier
        </button>
      </footer>
    `;
    panierContainer.appendChild(cartPanel);

    const openCart = () => cartPanel.removeAttribute('hidden');
    const closeCart = () => cartPanel.setAttribute('hidden', '');

    panierContainer.addEventListener('mouseenter', openCart);
    panierContainer.addEventListener('mouseleave', closeCart);
    panierContainer.addEventListener('click', (e) => {
      if (cartPanel.contains(e.target)) return;
      const opened = !cartPanel.hasAttribute('hidden');
      cartPanel.toggleAttribute('hidden', opened);
    });

    // Délégation : retirer un item / vider panier
    cartPanel.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.remove-from-cart');
      const clearBtn  = e.target.closest('.vider-panier');

      if (removeBtn) {
        const id = String(removeBtn.dataset.id);
        const removed = panier.find(p => String(p.id) === id);
        panier = panier.filter(p => String(p.id) !== id);
        savePanier(); updateBadges(); renderCartDropdown();
        const btnInGrid = document.querySelector(`.action-panier[data-id="${CSS.escape(id)}"]`);
        if (btnInGrid) btnInGrid.setAttribute('aria-pressed', 'false');
        showToast(`"${removed?.title || 'Article'}" retiré du panier.`, 'info');
      }

      if (clearBtn) {
        if (!panier.length) return;
        if (confirm('Vider tout le panier ?')) {
          panier = [];
          savePanier(); updateBadges(); renderCartDropdown();
          showToast('Panier vidé.', 'info');
        }
      }
    });
// Synchronisation panier entre onglets
    window.addEventListener('storage', (e) => {
      if (e.key === PANIER_KEY) {
        try { panier = JSON.parse(e.newValue) || []; } catch { panier = []; }
        renderCartDropdown();
      }
    });
  }
  return cartPanel;
}

function renderCartDropdown() {
  const panel = ensureCartPanel();
  if (!panel) return;

  const cartList   = panel.querySelector('.cart-list');
  const cartEmpty  = panel.querySelector('.empty');
  const cartCount  = panel.querySelector('header .count');
  const cartFooter = panel.querySelector('.cart-footer');

  cartList.innerHTML = '';
  cartCount.textContent = `(${panier.length})`;

  if (panier.length === 0) {
    cartEmpty.style.display = 'block';
    cartFooter.style.display = 'none';
    return;
  }
  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'block';

  cartList.innerHTML = panier.map(item => `
    <li data-id="${item.id}" style="display:grid; grid-template-columns:44px 1fr auto; gap:10px; align-items:center; padding:8px; border-radius:8px;">
      <img src="${item.img}" alt="Affiche de ${item.title}" width="44" height="60" style="object-fit:cover; border-radius:6px;">
      <div>
        <div class="title">${item.title}</div>
        <div class="meta">${item.year} • ${item.duration} min</div>
      </div>
      <button class="remove-from-cart" type="button" aria-label="Retirer ${item.title}" data-id="${item.id}">×</button>
    </li>
  `).join('');
}

// Synchronisation entre onglets
window.addEventListener('storage', (e) => {
  if (e.key === PANIER_KEY)  { try { panier  = JSON.parse(e.newValue) || []; } catch { panier = []; } }
  if (e.key === FAVORIS_KEY) { try { favoris = JSON.parse(e.newValue) || []; } catch { favoris = []; } }
  updateBadges();
  renderFavDropdown();
  renderCartDropdown();
});

// Init
(async () => {
  try {
    updateBadges();
    await loadCatalogue();    // charge le JSON et construit l'index
    renderFavDropdown();
    renderCartDropdown(); 

    // Section films
    createMovieSection(document.getElementById('french'),   'french',   'comédie');
    createMovieSection(document.getElementById('american'), 'american', 'comédie');
    createMovieSection(document.getElementById('european'), 'european', 'comédie');
    createMovieSection(document.getElementById('asian'),    'asian',    'comédie');

  } catch (err) {
    console.error('Catalogue error:', err, 'URL:', new URL(JSON_URL, location.href).href);
    $$('.movie-section .gallery').forEach(g => g.innerHTML = `<p>Erreur chargement catalogue.</p>`);
  }
})();