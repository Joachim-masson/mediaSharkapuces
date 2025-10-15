
// ---------Carousel -----------
document.querySelectorAll('.carousel').forEach(carousel => {

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-button.next');
    const prevButton = carousel.querySelector('.carousel-button.prev');

    let currentIndex = 0;
    const slidesToShow = 3;

    function updateSlidePosition() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - slidesToShow) {
            currentIndex += slidesToShow;
        } else {
            currentIndex = 0; // on revient au début
        }
        updateSlidePosition();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= slidesToShow;
        } else {
            currentIndex = slides.length - slidesToShow; 
        }
        updateSlidePosition();
    });
});

// ---------------Rechercher dans le Catalogue ---------------
const resultatRechercheMusique = document.querySelector(".resultatRechercheMusique");

// fonction de recherche et d'affichage dans le DOM
function searchAndDisplay(categorieValue, valueSearch){
	// Vide les résultats précédents
  resultatRechercheMusique.innerHTML = "";

  	// Chargement du fichier JSON
  fetch("musique.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur de chargement du fichier JSON");
		}
		return response.json();
    })
    .then(data => {
      // Filtrage des artistes correspondant à la recherche
      const filteredCatalogue = data.filter(artist => artist[categorieValue].toLowerCase().includes(valueSearch));
      
     //Affichage du résultat
      if (filteredCatalogue.length > 0) {
        filteredCatalogue.forEach(artist => {
          const resultatImagePochette = document.createElement("img");
          resultatImagePochette.src=artist.image;
          resultatRechercheMusique.appendChild(resultatImagePochette);

          const resultatContenu = document.createElement("div");
          resultatContenu.classList.add("description");
          const resultatTitre = document.createElement("h3");
          resultatTitre.textContent = `${artist.artist} - ${artist.album}`;
          resultatContenu.appendChild(resultatTitre);
          const resultatDescription = document.createElement("p");
          resultatDescription.textContent = `${artist.description}`;
          resultatContenu.appendChild(resultatDescription);
          resultatRechercheMusique.appendChild(resultatContenu);

          const resultatAudio = document.createElement("div");
          resultatAudio.classList.add("audio");
          const resultatTitleAudio = document.createElement("h5");
          resultatTitleAudio.textContent = "Ecouter un extrait";
          resultatAudio.appendChild(resultatTitleAudio);
          const extraitAudio = document.createElement("audio");
          extraitAudio.src=artist.music;
          extraitAudio.controls = true;
          resultatAudio.appendChild(extraitAudio);
          resultatRechercheMusique.appendChild(resultatAudio);
        });
      } else {
        resultatRechercheMusique.textContent = `aucun ${categorieValue} trouvé.`;
      }
    })
    .catch(error => {
      console.error(error);
      resultatRechercheMusique.textContent = "Une erreur est survenue lors du chargement des données.";
    });
};

//Recherche par Artiste
const btnSearchArtist = document.getElementById("btnSearchArtist")
btnSearchArtist.addEventListener("click", () => {
  const artistSearch = document.getElementById("artistSearch").value.toLowerCase();
	searchAndDisplay("artist", artistSearch);	
});

// Recherche par Album
const btnSearchAlbum = document.getElementById("btnSearchAlbum")
btnSearchAlbum.addEventListener("click", () => {
  const albumSearch = document.getElementById("albumSearch").value.toLowerCase();
	searchAndDisplay("album", albumSearch);
});

// Recherche par Titre
const btnSearchTitle = document.getElementById("btnSearchTitle")
btnSearchTitle.addEventListener("click", () => {
  const titleSearch = document.getElementById("titleSearch").value.toLowerCase();
	searchAndDisplay("title", titleSearch);
});

// Recherche par Genre
const btnSearchGenre = document.getElementById("btnSearchGenre")
btnSearchGenre.addEventListener("click", () => {
  const genreSearch = document.getElementById("genreSearch").options[document.getElementById('genreSearch').selectedIndex].text.toLowerCase();
  searchAndDisplay("genre", genreSearch);
});


