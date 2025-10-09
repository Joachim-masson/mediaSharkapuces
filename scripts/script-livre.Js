fetch('./assets/livre.json')
  .then(response => response.json())
  .then(data => {
    const livresData = data.categories.livres;
    const boutons = document.querySelectorAll('.boutons-sous-categorie button');
    const affichage = document.getElementById('affichage-livres');

    const panierImg = livresData.Panier.image;
    const favorisImg = livresData.favoris.image;

    const panier = [];
    const favoris = [];

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

      // Ajouter les événements de clic sur les images
      document.querySelectorAll('.icon-panier').forEach(img => {
        img.addEventListener('click', (e) => {
          const idLivre = parseInt(e.currentTarget.dataset.id);
          const livreAjoute = listeLivres.find(l => l.id === idLivre);
          if (!panier.includes(livreAjoute)) {
            panier.push(livreAjoute);
            alert(`${livreAjoute.titre} ajouté au panier !`);
          } else {
            alert(`${livreAjoute.titre} est déjà dans le panier.`);
          }
        });
      });

      document.querySelectorAll('.icon-favoris').forEach(img => {
        img.addEventListener('click', (e) => {
          const idLivre = parseInt(e.currentTarget.dataset.id);
          const livreAjoute = listeLivres.find(l => l.id === idLivre);
          if (!favoris.includes(livreAjoute)) {
            favoris.push(livreAjoute);
            alert(`${livreAjoute.titre} ajouté aux favoris !`);
          } else {
            alert(`${livreAjoute.titre} est déjà dans les favoris.`);
          }
        });
      });
    }

    // Événement des boutons
    boutons.forEach(bouton => {
      bouton.addEventListener('click', () => {
        const sousCategorie = bouton.dataset.categorie;
        const livres = livresData[sousCategorie];
        afficherLivres(livres);
      });
    });

    // ⚡ Affichage par défaut de tous les livres
    const tousLesLivres = Object.keys(livresData)
      .filter(key => key !== "Panier" && key !== "favoris")
      .flatMap(key => livresData[key]);

    afficherLivres(tousLesLivres);
  })
  .catch(error => console.error("Erreur lors du chargement du JSON :", error));