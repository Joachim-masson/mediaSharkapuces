document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SÉLECTION DES ÉLÉMENTS ET DONNÉES ---
    const PANIER_KEY = 'Panier';
    const panierContainer = document.getElementById('panier-items-container');
    const totalElement = document.getElementById('panier-total');
    const viderPanierBtn = document.getElementById('vider-panier-btn'); // <<< NOUVEAU : Sélection du bouton
    let panier = JSON.parse(localStorage.getItem(PANIER_KEY)) || [];

    // --- 2. FONCTIONS ---

    const showToast = (message, type = 'info', duration = 2000) => {
        const container = document.getElementById('toast-container') || (() => {
            const d = document.createElement('div'); d.id = 'toast-container'; document.body.appendChild(d); return d;
        })();
        const t = document.createElement('div'); t.className = `toast ${type}`; t.textContent = message; container.appendChild(t);
        setTimeout(() => {
            t.style.opacity = '0';
            setTimeout(() => t.remove(), 300);
        }, duration);
    };

    const savePanier = () => {
        localStorage.setItem(PANIER_KEY, JSON.stringify(panier));
    };

    const renderTotal = () => {
        const total = panier.reduce((sum, livre) => sum + parseFloat(livre.Prix || 0), 0);
        totalElement.textContent = `${total.toFixed(2)}€`;
    };

    const renderItems = () => {
        panierContainer.innerHTML = '';
        // Affiche/masque le bouton "Vider le panier" selon s'il y a des articles
        if (viderPanierBtn) {
            viderPanierBtn.style.display = panier.length > 0 ? 'inline-block' : 'none';
        }
        
        if (panier.length === 0) {
            panierContainer.innerHTML = '<tr><td colspan="4">Votre panier est vide.</td></tr>';
            return;
        }
        const itemsHTML = panier.map(livre => `
            <tr data-id="${livre.id}">
                <td><img src="${livre.image}" alt="${livre.titre}" width="50"></td>
                <td>${livre.titre}</td>
                <td><button class="btn-supprimer" data-id="${livre.id}">Supprimer</button></td>
            </tr>
        `).join('');
        panierContainer.innerHTML = itemsHTML;
    };

    const removeItemFromPanier = (id) => {
        const itemRemoved = panier.find(livre => livre.id === id);
        panier = panier.filter(livre => livre.id !== id);
        
        savePanier();
        renderItems();
        renderTotal();

        if (typeof window.updateCartUI === 'function') {
            window.updateCartUI();
        }

        if (itemRemoved) {
            showToast(`"${itemRemoved.titre}" a été supprimé du panier.`, 'info');
        }
    };

    // <<< NOUVELLE FONCTION : Pour vider tout le panier
    const viderPanier = () => {
        if (panier.length > 0) {
            panier = []; // Réinitialise le tableau du panier
            savePanier(); // Met à jour le localStorage
            renderItems(); // Met à jour l'affichage des articles (qui est maintenant vide)
            renderTotal(); // Met à jour l'affichage du total (qui est maintenant 0)

            // Met à jour l'interface utilisateur globale (ex: l'icône du panier)
            if (typeof window.updateCartUI === 'function') {
                window.updateCartUI();
            }

            showToast('Le panier a été vidé.', 'success');
        } else {
            showToast('Le panier est déjà vide.', 'info');
        }
    };


    // --- 3. GESTION DES ÉVÉNEMENTS ---
    panierContainer.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('.btn-supprimer');
        if (deleteButton) {
            const idToRemove = parseInt(deleteButton.dataset.id, 10);
            removeItemFromPanier(idToRemove);
        }
    });

    // <<< NOUVEAU : Écouteur d'événement pour le bouton "Vider le panier"
    if (viderPanierBtn) {
        viderPanierBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche le comportement par défaut si le bouton est dans un formulaire
            viderPanier();
        });
    }

    // --- 4. INITIALISATION ---
    renderItems();
    renderTotal();
});