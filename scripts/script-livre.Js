fetch('./assets/livre.json')
  .then(response => response.json())
  .then(data => {
    const livresData = data.categories.livres;
    const boutons = document.querySelectorAll('.boutons-sous-categorie button');
    const affichage = document.getElementById('affichage-livres');

    const panierImg = livresData.Panier.image;
    const favorisImg = livresData.favoris.image;

    // clés localStorage
    const PANIER_KEY = 'mes_livres_panier_v1';
    const FAVORIS_KEY = 'mes_livres_favoris_v1';

    // Charger depuis localStorage (si existant)
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
      if (panierCountEl) panierCountEl.textContent = panier.length;
      if (favorisCountEl) favorisCountEl.textContent = favoris.length;
    }

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

      // disparition automatique
      setTimeout(() => {
        t.style.opacity = '0';
        t.style.transform = 'translateY(-6px)';
        setTimeout(() => t.remove(), 300);
      }, duration);
    }

    // si tu veux permettre suppression par second clic => toggle behaviour
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

      // Attacher événements (après rendu)
      document.querySelectorAll('.icon-panier').forEach(img => {
        img.addEventListener('click', (e) => {
          const idLivre = parseInt(e.currentTarget.dataset.id, 10);
          const livreAjoute = listeLivres.find(l => l.id === idLivre);
          if (!livreAjoute) return;

          if (!isInArrayById(panier, idLivre)) {
            panier.push(livreAjoute);
            savePanier();
            updateBadges();
            showToast(`"${livreAjoute.titre}" ajouté au panier !`, 'success');
          } else {
            showToast(`"${livreAjoute.titre}" est déjà dans le panier.`, 'info');
          }
        });
      });

      document.querySelectorAll('.icon-favoris').forEach(img => {
        img.addEventListener('click', (e) => {
          const idLivre = parseInt(e.currentTarget.dataset.id, 10);
          const livreAjoute = listeLivres.find(l => l.id === idLivre);
          if (!livreAjoute) return;

          // toggle dans favoris : si présent on enlève, sinon on ajoute
          if (!isInArrayById(favoris, idLivre)) {
            favoris.push(livreAjoute);
            saveFavoris();
            updateBadges();
            showToast(`"${livreAjoute.titre}" ajouté aux favoris !`, 'success');
          } else {
            // suppression
            favoris = favoris.filter(l => l.id !== idLivre);
            saveFavoris();
            updateBadges();
            showToast(`"${livreAjoute.titre}" retiré des favoris.`, 'info');
          }
        });
      });
    }

    // Événement des boutons de sous-catégorie
    boutons.forEach(bouton => {
      bouton.addEventListener('click', () => {
        const sousCategorie = bouton.dataset.categorie;
        const livres = livresData[sousCategorie];
        afficherLivres(livres);
      });
    });

    // Affichage par défaut : tous les livres (sauf images Panier/Favoris)
    const tousLesLivres = Object.keys(livresData)
      .filter(key => key !== "Panier" && key !== "favoris")
      .flatMap(key => livresData[key]);

    // Mettre à jour badges initialement (après chargement localStorage)
    updateBadges();

    afficherLivres(tousLesLivres);

    // --- Optionnel : sync entre onglets (si l'utilisateur ouvre plusieurs onglets) ---
    window.addEventListener('storage', (e) => {
      if (e.key === PANIER_KEY) {
        panier = JSON.parse(e.newValue) || [];
        updateBadges();
      } else if (e.key === FAVORIS_KEY) {
        favoris = JSON.parse(e.newValue) || [];
        updateBadges();
      }
    });

  })
  .catch(error => console.error("Erreur lors du chargement du JSON :", error));