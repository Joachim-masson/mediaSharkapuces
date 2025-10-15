// === CONST LIVRES ===
const books = [
  { id: 1, titre: "Harry Potter et le Prisonnier d'Azkaban", auteur: "J.K. Rowling", annee: 1999, synopsis: "Harry découvre de nouveaux mystères à Poudlard et affronte un dangereux fugitif.", prix_location: 9.99, image: "H3.jpg", path: "images/"},
  { id: 2, titre: "Harry Potter et la Chambre des Secrets", auteur: "J.K. Rowling", annee: 1998, synopsis: "Harry retourne à Poudlard et découvre une chambre secrète remplie de mystères.", prix_location: 9.99, image: "HP2.webp",path: "images/"},
  { id: 3, titre: "Les Aventuriers de la Mer", auteur: "Robin Hobb", annee: 1995, synopsis: "Une saga épique sur les pirates et marchands des mers, pleine de magie et de complots.", prix_location: 9.99, image: "fant1.jpg", path: "images/" },
  { id: 4, titre: "La Boutique de Sortilèges", auteur: "Sarah Beth Durst", annee: 1996, synopsis: "Une boutique mystérieuse qui cache des secrets magiques.", prix_location: 9.99, image: "fant3.jpg", path: "images/" },
  { id: 5, titre: "Serpent Descendant de la Nuit", auteur: "Carissa Broadbent", annee: 1997, synopsis: "Un périple périlleux sur les mers face à des ennemis inattendus.", prix_location: 9.99, image: "fant5.jpg", path: "images/" },
  { id: 6, titre: "La Trilogie du Magicien Noir", auteur: "Trudi Canavan", annee: 2001, synopsis: "Une jeune sorcière découvre ses pouvoirs et lutte contre de sombres conspirations.", prix_location: 9.99, image: "fant11.jpg", path: "images/" },
  { id: 7, titre: "La Malédiction des Dragensblöt Tome 3", auteur: "Anne Robillard", annee: 2005, synopsis: "La bataille finale pour lever la malédiction qui frappe le royaume.", prix_location: 9.99, image: "fant6.jpg", path: "images/"},
  { id: 8, titre: "L'Empire d'Éclume 1", auteur: "Andrea Stewart", annee: 2007, synopsis: "Début d'une aventure épique dans un empire en pleine révolution.", prix_location: 9.99, image: "fant10.jpg", path: "images/" },
  { id: 9, titre: "L'Empire d'Éclume 2", auteur: "Andrea Stewart", annee: 2008, synopsis: "Les héros poursuivent leur lutte contre les forces obscures de l'empire.", prix_location: 9.99, image: "fant8.jpg",path: "images/" },
  { id: 10, titre: "Le Dernier Souffle", auteur: "Fiona McIntosh", annee: 2010, synopsis: "Une quête désespérée pour sauver un monde au bord du chaos.", prix_location: 9.99, image: "fant9.jpg", path: "images/" },
  { id: 11, titre: "Dark Shores", auteur: "Danielle L. Jensen", annee: 2012, synopsis: "Des rivages dangereux où se cachent secrets et créatures terrifiantes.", prix_location: 9.99, image: "fant7.jpg",path: "images/" },
  { id: 12, titre: "Le Hobbit 1", auteur: "J.R.R. Tolkien", annee: 1937, synopsis: "Bilbo part à l'aventure avec des nains pour récupérer un trésor volé.", prix_location: 9.99, image: "hobb.png", path: "images/" },
  { id: 13, titre: "Le Hobbit 2", auteur: "J.R.R. Tolkien", annee: 1937, synopsis: "La suite des aventures de Bilbo face aux dangers de la Terre du Milieu.", prix_location: 9.99, image: "hobb2.jpg",path: "images/" },
  { id: 14, titre: "La Roue du Temps Tome 1", auteur: "Robert Jordan", annee: 1990, synopsis: "Rand et ses amis découvrent leur destin dans un monde en guerre.", prix_location: 9.99, image: "roue.jpg", path: "images/" },
  { id: 15, titre: "Le Seigneur des Anneaux Tome 1", auteur: "J.R.R. Tolkien", annee: 1954, synopsis: "Frodon commence sa quête pour détruire l'Anneau Unique.", prix_location: 9.99, image: "seign.jpg", path: "images/" },
  { id: 16, titre: "La Roue du Temps Tome 2", auteur: "Robert Jordan", annee: 1991, synopsis: "Les aventures de Rand et ses compagnons continuent face à des dangers croissants.", prix_location: 9.99, image: "roue2.jpg", path :"images/fantastique/"},
  { id: 17, titre: "Le Feu de la Sorcière", auteur: "C.J. Daugherty", annee: 2013, synopsis: "Une jeune sorcière lutte pour contrôler ses pouvoirs dans un monde sombre.", prix_location: 9.99, image: "bannis.jpeg", path:"images/magie/" },
  { id: 18, titre: "Les Animaux Fantastiques", auteur: "J.K. Rowling", annee: 2001, synopsis: "Découverte des créatures magiques et de leur rôle dans le monde des sorciers.", prix_location: 9.99, image: "animaux.jpeg", path:"images/magie/" },
  { id: 19, titre: "Le Seigneur des Anneaux Tome 3", auteur: "J.R.R. Tolkien", annee: 1955, synopsis: "La conclusion de la quête de Frodon pour détruire l'Anneau et sauver la Terre du Milieu.", prix_location: 9.99, image: "seign3.jpg", path:"images/magie/" }
];

let favorisCount = 0;
let panierCount = 0;

// CARTE LIVRE 
function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  const img = document.createElement("img");
  img.src = book.path + book.image;
  img.alt = book.titre;

  const info = document.createElement("div");
  info.className = "book-info";
  info.innerHTML = `
      <div>
          <h5>${book.titre}</h5>
          <p><strong>Auteur :</strong> ${book.auteur}</p>
          <p><strong>Année :</strong> ${book.annee}</p>
          <p>${book.synopsis}</p>
          <p><strong>Prix location :</strong> ${book.prix_location} €</p>
      </div>
      <div class="book-actions">
          <img src="../navbar/images/heart.svg" alt="Favoris" class="icon favoris">
          <img src="../navbar/images/shopping_cart.svg" alt="Panier" class="icon panier">
      </div>
  `;

  card.appendChild(img);
  card.appendChild(info);


  info.querySelector(".favoris").addEventListener("click", () => {
    favorisCount++;
    document.getElementById("favoris-count").textContent = favorisCount;
  });

  info.querySelector(".panier").addEventListener("click", () => {
    panierCount++;
    document.getElementById("panier-count").textContent = panierCount;
  });

  return card;
}

//  CARROUSELS 
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = carousel.querySelector('.carousel-button.next');
  const prevButton = carousel.querySelector('.carousel-button.prev');

  let currentIndex = 0;
  const slidesToShow = 3;


  slides.forEach((slide) => {
    const imgId = parseInt(slide.querySelector('img').id);
    const book = books.find(b => b.id === imgId);
    if(book){
      const card = createBookCard(book);
      slide.innerHTML = "";
      slide.appendChild(card);
    }
  });

  function updateSlidePosition() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - slidesToShow) currentIndex += slidesToShow;
    else currentIndex = 0;
    updateSlidePosition();
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex -= slidesToShow;
    else currentIndex = slides.length - slidesToShow;
    updateSlidePosition();
  });
});

// === GALERIE  ===
const imagesCategory = {
  magie: books.filter(b => b.id >= 14 && b.id <= 17),
  fantastique: books.filter(b => b.id >= 3 && b.id <= 13)
};

function showImages(category){
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  imagesCategory[category].forEach(book => {
    const card = createBookCard(book);
    gallery.appendChild(card);
  });
}


showImages('magie');

