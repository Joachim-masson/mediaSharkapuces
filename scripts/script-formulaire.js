    // Sélectionne le formulaire grâce à son ID
    const contactForm = document.getElementById('contact-form');

    // Ajoute un écouteur d'événement qui attend la soumission du formulaire
    contactForm.addEventListener('submit', function(event) {
        // Empêche le navigateur de recharger la page
        event.preventDefault();

        // Récupère les valeurs de chaque champ
        const prenom = document.getElementById('prenom').value;
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const telephone = document.getElementById('telephone').value;
        const message = document.getElementById('message').value;

        // --- Configuration de l'email ---
        // REMPLACEZ PAR VOTRE ADRESSE EMAIL
        const recipient = 'Sharkapuces@wcs.fr';

        // Crée le sujet de l'email
        const subject = `Message de ${prenom} ${nom} via votre site web`;

        // Crée le corps du message (le contenu de l'email)
        const body = `Bonjour,

Vous avez reçu un nouveau message depuis votre formulaire de contact.

Prénom: ${prenom}
Nom: ${nom}
Email: ${email}
Téléphone: ${telephone}

Message:
${message}
        `;

        // Assemble le lien mailto complet en encodant le sujet et le corps
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Déclenche l'ouverture du client de messagerie
        window.location.href = mailtoLink;
    });