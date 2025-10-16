// --- MISE A JOUR IMMEDIATE DES BADGES AU CHARGEMENT DE LA PAGE ---

// On définit les clés de stockage une seule fois
const PANIER_KEY = 'Panier';
const FAVORIS_KEY = 'Favoris';

// On récupère les listes depuis le localStorage
const panierInitial = JSON.parse(localStorage.getItem(PANIER_KEY)) || [];
const favorisInitial = JSON.parse(localStorage.getItem(FAVORIS_KEY)) || [];

// On met à jour les badges avec les données récupérées
document.getElementById('panier-count').textContent = panierInitial.length || 0;
document.getElementById('favoris-count').textContent = favorisInitial.length || 0;


// --- Chargement JSON ---
fetch('../assets/livre.json')
  .then(response => response.json())
  .then(data => {
    const livresData = data.categories.livres;
    const affichage = document.getElementById('affichage-livres');
    const boutons = document.querySelectorAll('.boutons-sous-categorie button');
    
    // Conteneurs pour les dropdowns
    const panierContainer = document.getElementById('panier-container');
    const favorisContainer = document.getElementById('favoris-container');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownMenuFavoris = document.getElementById('dropdown-menu-favoris');

    let panier = JSON.parse(localStorage.getItem(PANIER_KEY)) || [];
    let favoris = JSON.parse(localStorage.getItem(FAVORIS_KEY)) || [];

    const panierImg = livresData.Panier.image;
    const favorisImg = livresData.favoris.image;

    // Calculer tous les livres une seule fois
    const tousLesLivres = Object.keys(livresData)
      .filter(key => key !== "Panier" && key !== "favoris")
      .flatMap(key => livresData[key]);
      
    // --- GESTION DES POPUPS DE CONFIRMATION ---

    // On récupère les éléments du DOM pour les popups
    const popupGlobal = document.getElementById('confirm-popup');
    const popupUnitaire = document.getElementById('confirm-popup-uni');

    // Les boutons des popups
    const btnConfirmYes = document.getElementById('confirm-yes');
    const btnConfirmNo = document.getElementById('confirm-no');
    const btnConfirmYesUni = document.getElementById('confirm-yes-uni');
    const btnConfirmNoUni = document.getElementById('confirm-no-uni');

    // Variable pour garder en mémoire l'action à confirmer
    let actionAConfirmer = null;

    // Fonctions pour afficher/cacher les popups
    const showPopup = (popup) => popup.classList.add('visible');
    const hidePopups = () => {
        popupGlobal.classList.remove('visible');
        popupUnitaire.classList.remove('visible');
    };

    // Logique de confirmation pour la suppression GLOBALE (vider)
    btnConfirmYes.addEventListener('click', () => {
        if (actionAConfirmer) {
            actionAConfirmer(); // Exécute l'action mise en attente
            actionAConfirmer = null; // Réinitialise l'action
        }
        hidePopups(); // Cache le popup
    });

    // Logique de confirmation pour la suppression UNITAIRE
    btnConfirmYesUni.addEventListener('click', () => {
        if (actionAConfirmer) {
            actionAConfirmer(); // Exécute l'action mise en attente
            actionAConfirmer = null; // Réinitialise l'action
        }
        hidePopups(); // Cache le popup
    });

    // Les boutons "Annuler" cachent simplement les popups
    btnConfirmNo.addEventListener('click', hidePopups);
    btnConfirmNoUni.addEventListener('click', hidePopups);


    // --- Fonctions utilitaires ---
    const savePanier = () => localStorage.setItem(PANIER_KEY, JSON.stringify(panier));
    const saveFavoris = () => localStorage.setItem(FAVORIS_KEY, JSON.stringify(favoris));

    const updateBadges = () => {
      document.getElementById('panier-count').textContent = panier.length || 0;
      document.getElementById('favoris-count').textContent = favoris.length || 0;
    };

    const showToast = (message, type = 'info', duration = 1000) => {
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
    };

    const isInArrayById = (arr, id) => arr.some(item => item.id === id);

    // --- Affichage livres ---
    const afficherLivres = (listeLivres) => {
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
              <h4>${livre.titre}</h4>
              <p>Auteur : ${livre.auteur}</p>
              <p>${livre.disponible ? "✅ Disponible" : "❌ Indisponible"}</p>
              <p>Synopsis : ${livre.synopsis || "Pas de synopsis disponible."}</p>
            </div>
          </div>
        </div>
      `).join('');
    };

    // --- Dropdown panier ---
    const afficherDropdownPanier = () => {
      if (panier.length === 0) {
        dropdownMenu.innerHTML = "<p>Aucun article dans le panier.</p>";
      } else {
        dropdownMenu.innerHTML = `
          <table class="panier-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              ${panier.map(livre => `
                <tr data-id="${livre.id}">
                  <td>${livre.titre}</td>
                  <td class="col-delete">
                    <button class="delete-item-panier" data-id="${livre.id}" aria-label="Supprimer ${livre.titre} du panier">
                      <img src="../navbar/images/trash.svg" alt="Supprimer" width="18" height="18">
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2">
                  <button id="vider-panier-btn" class="vider-panier-btn">
                    <img src="../navbar/images/trash.svg" alt="Vider le panier">
                    Vider le panier
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        `;
      }
      dropdownMenu.classList.add('visible');
    };
    
    const cacherDropdownPanier = () => dropdownMenu.classList.remove('visible');
    panierContainer.addEventListener('mouseenter', afficherDropdownPanier);
    panierContainer.addEventListener('mouseleave', cacherDropdownPanier);
    
    // --- Dropdown Favoris ---
    const afficherDropdownFavoris = () => {
      if (favoris.length === 0) {
        dropdownMenuFavoris.innerHTML = "<p>Aucun livre dans les favoris.</p>";
      } else {
        dropdownMenuFavoris.innerHTML = `
          <table class="panier-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              ${favoris.map(livre => `
                <tr data-id="${livre.id}">
                  <td>${livre.titre}</td>
                  <td class="col-delete">
                    <button class="delete-item-favoris" data-id="${livre.id}" aria-label="Supprimer ${livre.titre} des favoris">
                      <img src="../navbar/images/trash.svg" alt="Supprimer" width="18" height="18">
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2">
                  <button id="vider-favoris-btn" class="vider-panier-btn">
                    <img src="../navbar/images/trash.svg" alt="Vider les favoris">
                    Vider les favoris
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        `;
      }
      dropdownMenuFavoris.classList.add('visible');
    };

    const cacherDropdownFavoris = () => dropdownMenuFavoris.classList.remove('visible');
    favorisContainer.addEventListener('mouseenter', afficherDropdownFavoris);
    favorisContainer.addEventListener('mouseleave', cacherDropdownFavoris);

    // --- Gestion suppression et vidage du PANIER (AVEC CONFIRMATION) ---
    dropdownMenu.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-item-panier');
        const viderBtn = e.target.closest('#vider-panier-btn');

        if (deleteBtn) {
            const idToRemove = parseInt(deleteBtn.dataset.id, 10);
            // On met l'action de suppression en attente
            actionAConfirmer = () => {
                const itemRemoved = panier.find(p => p.id === idToRemove);
                panier = panier.filter(p => p.id !== idToRemove);
                savePanier();
                updateBadges();
                afficherDropdownPanier();
                if (itemRemoved) {
                    showToast(`"${itemRemoved.titre}" supprimé du panier.`, 'info');
                }
            };
            // On affiche le popup de confirmation unitaire
            showPopup(popupUnitaire);
        }

        if (viderBtn) {
            // On met l'action de vidage en attente
            actionAConfirmer = () => {
                panier = [];
                savePanier();
                updateBadges();
                afficherDropdownPanier();
                showToast("Panier vidé avec succès.", "info");
            };
            // On affiche le popup de confirmation globale
            showPopup(popupGlobal);
        }
    });

    // --- Gestion suppression et vidage des FAVORIS (AVEC CONFIRMATION) ---
    dropdownMenuFavoris.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-item-favoris');
        const viderBtn = e.target.closest('#vider-favoris-btn');

        if (deleteBtn) {
            const idToRemove = parseInt(deleteBtn.dataset.id, 10);
            // On met l'action en attente
            actionAConfirmer = () => {
                const itemRemoved = favoris.find(f => f.id === idToRemove);
                favoris = favoris.filter(f => f.id !== idToRemove);
                saveFavoris();
                updateBadges();
                afficherDropdownFavoris();
                if (itemRemoved) {
                    showToast(`"${itemRemoved.titre}" supprimé des favoris.`, 'info');
                }
            };
            // On affiche le popup de confirmation unitaire
            showPopup(popupUnitaire);
        }

        if (viderBtn) {
            // On met l'action en attente
            actionAConfirmer = () => {
                favoris = [];
                saveFavoris();
                updateBadges();
                afficherDropdownFavoris();
                showToast("Favoris vidés avec succès.", "info");
            };
            // On affiche le popup de confirmation globale
            showPopup(popupGlobal);
        }
    });

    // --- Événements sur icônes livres ---
    affichage.addEventListener('click', (e) => {
      const icon = e.target;
      const idLivre = parseInt(icon.dataset.id, 10);
      if (Number.isNaN(idLivre)) return;

      const livreSelectionne = tousLesLivres.find(l => l.id === idLivre);
      if (!livreSelectionne) return;

      if (icon.classList.contains('icon-panier')) {
        if (livreSelectionne.disponible) {
          if (!isInArrayById(panier, idLivre)) {
            panier.push(livreSelectionne);
            savePanier();
            updateBadges();
            showToast(`"${livreSelectionne.titre}" ajouté au panier !`, 'success');
          } else showToast(`"${livreSelectionne.titre}" est déjà dans le panier.`, 'info');
        } else { showToast(`"${livreSelectionne.titre}" est indisponible.`, 'info') }
      } else if (icon.classList.contains('icon-favoris')) {
          if (!isInArrayById(favoris, idLivre)) {
            favoris.push(livreSelectionne);
            saveFavoris();
            updateBadges();
            showToast(`"${livreSelectionne.titre}" ajouté aux favoris !`, 'success');
          } else {
            favoris = favoris.filter(l => l.id !== idLivre);
            saveFavoris();
            updateBadges();
            showToast(`"${livreSelectionne.titre}" retiré des favoris.`, 'info');
          }
      }
    });

    // --- Boutons sous-catégorie ---
    boutons.forEach(bouton => {
      bouton.addEventListener('click', () => {
        const sousCategorie = bouton.dataset.categorie;
        afficherLivres(livresData[sousCategorie]);
      });
    });

    // --- Affichage initial ---
    updateBadges();
    afficherLivres(tousLesLivres);

    // --- Synchronisation multi-onglets ---
    window.addEventListener('storage', (e) => {
      if (e.key === PANIER_KEY) { panier = JSON.parse(e.newValue) || []; }
      if (e.key === FAVORIS_KEY) { favoris = JSON.parse(e.newValue) || []; }
      updateBadges();
    });

    // --- Générer carousel dynamiquement ---
    const carouselTrack = document.getElementById('carousel-track');
    const dernieresSorties = tousLesLivres.slice(-9).reverse();

    carouselTrack.innerHTML = dernieresSorties.map((livre, index) => `
      <li class="carousel-slide ${index === 0 ? 'current-slide' : ''}">
        <img src="${livre.image}" alt="${livre.titre}">
      </li>
    `).join('');

    // --- Carousel fonctionnel ---
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const slides = Array.from(carouselTrack.children);
    let currentSlideIndex = 0;

    const updateCarousel = () => {
      if (slides.length === 0) return; // Sécurité si pas de slide
      const slideWidth = slides[0].getBoundingClientRect().width;
      carouselTrack.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
      slides.forEach(slide => slide.classList.remove('current-slide'));
      slides[currentSlideIndex].classList.add('current-slide');
    };

    nextButton.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      updateCarousel();
    });

    prevButton.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    updateCarousel();

  })
  .catch(error => console.error("Erreur lors du chargement du JSON :", error));