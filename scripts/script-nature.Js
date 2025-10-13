fetch('../assets/livre.json')
  .then(response => response.json())
  .then(data => {
    const livresData = data.categories.livres;
    const boutons = document.querySelectorAll('.boutons-sous-categorie button');
    const affichage = document.getElementById('affichage-livres');

    const panierImg = livresData.Panier.image;
    const favorisImg = livresData.favoris.image;

    // --- Références DOM ---
    const panierContainer = document.getElementById('panier-container');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // --- Clés localStorage ---
    const PANIER_KEY = 'Panier';
    const FAVORIS_KEY = 'Favoris';

    // --- Chargement depuis localStorage ---
    let panier = JSON.parse(localStorage.getItem(PANIER_KEY)) || [];
    let favoris = JSON.parse(localStorage.getItem(FAVORIS_KEY)) || [];

    // --- Fonctions utilitaires ---
    function savePanier() {
      localStorage.setItem(PANIER_KEY, JSON.stringify(panier));
    }
    function saveFavoris() {
      localStorage.setItem(FAVORIS_KEY, JSON.stringify(favoris));
    }

    function updateBadges() {
      const panierCountEl = document.getElementById('panier-count');
      const favorisCountEl = document.getElementById('favoris-count');
      if (panierCountEl) panierCountEl.textContent = panier.length || 0;
      if (favorisCountEl) favorisCountEl.textContent = favoris.length || 0;
    }

    // --- Dropdown panier ---
    function afficherDropdown() {
      if (panier.length === 0) {
        dropdownMenu.innerHTML = "<p>Aucun article dans le panier.</p>";
      } else {
        const total = panier.reduce((sum, livre) => sum + parseFloat(livre.Prix || 0), 0);
        dropdownMenu.innerHTML = panier.map(livre => `
          <div class="dropdown-item">${livre.titre} — ${livre.Prix}€</div>
        `).join('') + `<div class="dropdown-total">Total : ${total.toFixed(2)}€</div>`;
      }
      dropdownMenu.classList.add('visible');
    }

    function cacherDropdown() {
      dropdownMenu.classList.remove('visible');
    }

    panierContainer.addEventListener('mouseenter', afficherDropdown);
    panierContainer.addEventListener('mouseleave', cacherDropdown);

    // --- Toast notifications ---
    function showToast(message, type = 'info', duration = 2000) {
      const container = document.getElementById('toast-container') || (() => {
        const d = document.createElement('div');
        d.id = 'toast-container';
        document.body.appendChild(d);
        return d;
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

    function isInArrayById(arr, id) {
      return arr.some(item => item.id === id);
    }

    // --- Affichage des livres ---
    function afficherLivres(listeLivres) {
      if (!listeLivres || listeLivres.length === 0) {
        affichage.innerHTML = "<p>Aucune donnée trouvée.</p>";
        return;
      }

      affichage.innerHTML = listeLivres.map(livre => `
        <div class="carte-livre">
          <div class="image-container">
            <img src="${livre.image}" alt="${livre.titre}" class="image-livre">
            <div class="overlay">
              <div class="shopping-icons">
                <img src="${panierImg}" alt="Panier" class="icon-panier" data-id="${livre.id}">
                <img src="${favorisImg}" alt="Favoris" class="icon-favoris" data-id="${livre.id}">
              </div>
              <h4>${livre.titre}</h4><br>
              <p>Auteur : ${livre.auteur}</p><br>
              <p>En stock : ${livre.disponible ? "✅ Disponible" : "❌ Indisponible"}</p><br>
              <p>Synopsis : ${livre.synopsis || "Pas de synopsis disponible."}</p>
            </div>
          </div>
        </div>
      `).join('');
    }

    // --- Délégation d’événements pour les icônes ---
    affichage.addEventListener('click', (e) => {
      const icon = e.target;
      const idLivre = parseInt(icon.dataset.id, 10);
      const tousLesLivres = Object.keys(livresData)
        .filter(key => key !== "Panier" && key !== "favoris")
        .flatMap(key => livresData[key]);
      const livreAjoute = tousLesLivres.find(l => l.id === idLivre);
      if (!livreAjoute) return;

      if (icon.classList.contains('icon-panier')) {
        if (!isInArrayById(panier, idLivre)) {
          panier.push(livreAjoute);
          savePanier();
          updateBadges();
          showToast(`"${livreAjoute.titre}" ajouté au panier !`, 'success');
        } else {
          showToast(`"${livreAjoute.titre}" est déjà dans le panier.`, 'info');
        }
      } else if (icon.classList.contains('icon-favoris')) {
        if (!isInArrayById(favoris, idLivre)) {
          favoris.push(livreAjoute);
          saveFavoris();
          updateBadges();
          showToast(`"${livreAjoute.titre}" ajouté aux favoris !`, 'success');
        } else {
          favoris = favoris.filter(l => l.id !== idLivre);
          saveFavoris();
          updateBadges();
          showToast(`"${livreAjoute.titre}" retiré des favoris.`, 'info');
        }
      }
    });

    // --- Boutons de sous-catégorie ---
    boutons.forEach(bouton => {
      bouton.addEventListener('click', () => {
        const sousCategorie = bouton.dataset.categorie;
        const livres = livresData[sousCategorie];
        afficherLivres(livres);
      });
    });

    // --- Affichage initial ---
    const tousLesLivres = Object.keys(livresData)
      .filter(key => key !== "Panier" && key !== "favoris")
      .flatMap(key => livresData[key]);

    updateBadges();
    afficherLivres(tousLesLivres);

    // --- Synchronisation multi-onglets ---
    window.addEventListener('storage', (e) => {
      if (e.key === PANIER_KEY) {
        panier = JSON.parse(e.newValue) || [];
      } else if (e.key === FAVORIS_KEY) {
        favoris = JSON.parse(e.newValue) || [];
      }
      updateBadges();
    });
  })
  .catch(error => console.error("Erreur lors du chargement du JSON :", error));
