// Attend que le contenu de la page soit entièrement chargé avant d'exécuter le script.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SÉLECTION DES ÉLÉMENTS DU DOM ET RÉCUPÉRATION DES DONNÉES ---

    const PANIER_KEY = 'Panier';
    const panierContainer = document.getElementById('panier-items-container');
    const totalElement = document.getElementById('panier-total');

    // On récupère le panier depuis le localStorage.
    // S'il n'y a rien, on initialise avec un tableau vide `[]` pour éviter les erreurs.
    let panier = JSON.parse(localStorage.getItem(PANIER_KEY)) || [];

    // --- 2. FONCTIONS PRINCIPALES ---

    /**
     * Met à jour le localStorage avec l'état actuel du panier.
     */
    const savePanier = () => {
        localStorage.setItem(PANIER_KEY, JSON.stringify(panier));
    };

    /**
     * Calcule le total du panier et l'affiche dans la page.
     */
    const renderTotal = () => {
        // La méthode reduce() est parfaite pour calculer une somme.
        // On part de 0 (le deuxième argument de reduce), et pour chaque livre, on ajoute son prix.
        const total = panier.reduce((sum, livre) => {
            // parseFloat s'assure qu'on additionne des nombres, même si le prix est une chaîne.
            return sum + parseFloat(livre.Prix || 0);
        }, 0);

        // Affiche le total formaté avec 2 décimales.
        totalElement.textContent = `${total.toFixed(2)}€`;
    };

    /**
     * Affiche tous les articles du panier dans le tableau HTML.
     */
    const renderItems = () => {
        // On vide d'abord le conteneur pour éviter les doublons lors des mises à jour.
        panierContainer.innerHTML = '';

        // Si le panier est vide, on affiche un message et on s'arrête là.
        if (panier.length === 0) {
            panierContainer.innerHTML = '<tr><td colspan="4">Votre panier est vide.</td></tr>';
            return;
        }

        // On utilise map() pour transformer chaque objet 'livre' en une ligne de tableau (<tr>).
        const itemsHTML = panier.map(livre => `
            <tr data-id="${livre.id}">
                <td><img src="${livre.image}" alt="${livre.titre}" width="50"></td>
                <td>${livre.titre}</td>
                <td>
                    <button class="btn-supprimer" data-id="${livre.id}">Supprimer</button>
                </td>
            </tr>
        `).join(''); // .join('') transforme le tableau de lignes HTML en une seule chaîne.

        // On injecte le HTML généré dans notre tableau.
        panierContainer.innerHTML = itemsHTML;
    };
    
    /**
     * Gère la suppression d'un article du panier.
     * @param {number} id - L'identifiant du livre à supprimer.
     */
    const removeItemFromPanier = (id) => {
        // On filtre le panier pour ne garder que les livres dont l'ID est différent de celui à supprimer.
        panier = panier.filter(livre => livre.id !== id);
        
        // On sauvegarde le nouveau panier dans le localStorage.
        savePanier();
        
        // On met à jour l'affichage pour refléter la suppression.
        renderItems();
        renderTotal();
    };


    // --- 3. GESTION DES ÉVÉNEMENTS ---

    // On place un seul écouteur sur le conteneur principal (délégation d'événements).
    // C'est plus performant que de mettre un écouteur sur chaque bouton.
    panierContainer.addEventListener('click', (event) => {
        // On vérifie si l'élément cliqué est bien un bouton de suppression.
        const deleteButton = event.target.closest('.btn-supprimer');
        
        if (deleteButton) {
            // On récupère l'ID stocké dans l'attribut data-id.
            // On le convertit en nombre avec parseInt.
            const idToRemove = parseInt(deleteButton.dataset.id, 10);
            removeItemFromPanier(idToRemove);
        }
    });


    // --- 4. INITIALISATION DE LA PAGE ---

    // Au chargement, on affiche les articles et le total une première fois.
    renderItems();
    renderTotal();

});