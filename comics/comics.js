// === CONST COMICS ===
const dcComics = [
  { 
    id: 1, 
    univers: "DC Comics", 
    createur: "Malcolm Wheeler-Nicholson", 
    annee_creation: 1934, 
    description: "L’univers DC réunit des héros emblématiques tels que Batman, Superman et Wonder Woman, évoluant dans des récits sombres et épiques.", 
    prix_location: 3.99, 
    images: ["dc1.webp", "dc2.jpg","dc3.jpg", "dc4.jpg", "dc5.webp", "dc6.webp"], 
    path: "images/dc/"
  }
];

const marvelComics = [
  { 
    id: 2, 
    univers: "Marvel Comics", 
    createur: "Martin Goodman (avec Stan Lee, Jack Kirby et Steve Ditko)", 
    annee_creation: 1939, 
    description: "L’univers Marvel regroupe des héros comme Spider-Man, Iron Man et les Avengers, dans des histoires dynamiques et interconnectées.", 
    prix_location: 3.99, 
    images: ["marvel1.jpg", "marvel2.jpg", "marvel3.webp", "marvel4.jpg", "marvel5.jpg", "marvel6.png", "marvel7.jpeg", "marvel8.png", "marvel9.jpeg", "marvel10.jpeg", "marvel11.jpg"], 
    path: "images/marvel/"
  }
];

let favorisCount = 0;
let panierCount = 0;

// === CREATION CARTE COMICS (UNE CARTE PAR IMAGE) ===
function createComicsCard(comic, imgName) {
  const card = document.createElement("div");
  card.className = "book-card";

  const img = document.createElement("img");
  img.src = comic.path + imgName;
  img.alt = comic.univers;

  const info = document.createElement("div");
  info.className = "book-info";
  info.innerHTML = `
      <div>
          <h5>${comic.univers}</h5>
          <p><strong>Créateur :</strong> ${comic.createur}</p>
          <p><strong>Année de création :</strong> ${comic.annee_creation}</p>
          <p>${comic.description}</p>
          <p><strong>Prix location :</strong> ${comic.prix_location} €</p>
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

// === FONCTION POUR AFFICHER LES COMICS DANS LA GALERIE ===
function showComics(category) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  let comicsList = category === "marvel" ? marvelComics : dcComics;

  comicsList.forEach(comic => {
    comic.images.forEach(imgName => {
      const card = createComicsCard(comic, imgName);
      gallery.appendChild(card);
    });
  });
}

// === GESTION BOUTONS FILTRAGE ===
document.querySelectorAll(".boutonselector .btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent.toLowerCase().includes("marvel")) showComics('marvel');
    else showComics('dc');

    document.querySelectorAll(".boutonselector .btn").forEach(b => b.classList.remove("active-red"));
    document.querySelectorAll(".boutonselector .btn").forEach(b => b.classList.add("border-red"));
    btn.classList.remove("border-red");
    btn.classList.add("active-red");
  });
});

// === APPEL INITIAL ===
showComics('marvel');

// === CARROUSEL COMICS ===
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = carousel.querySelector('.carousel-button.next');
  const prevButton = carousel.querySelector('.carousel-button.prev');

  let currentIndex = 0;
  const slidesToShow = 3;

  // On remplit le carrousel avec toutes les cartes
  slides.forEach((slide, index) => {
    // On alterne Marvel/DC pour l’exemple, tu peux filtrer comme tu veux
    let comicList = index % 2 === 0 ? marvelComics : dcComics;
    let comic = comicList[0];
    let imgName = comic.images[index % comic.images.length];
    slide.innerHTML = "";
    slide.appendChild(createComicsCard(comic, imgName));
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
