const mots = [
  "shonen",
  "shojo",
  "seinen",
  "manga",
  "anime",
  "cosplay",
  "otaku",
  "mangaka",
  "volumes",
  "chapitre",
  "shinigami",
  "ninja",
  "samouraï",
  "mécha",
  "attaque",
  "titans",
  "détective",
  "mystère",
  "romance",
  "amour",
  "isekai",
  "school-life",
  "bataille",
  "rival",
  "héro",
  "antihéros",
  "pouvoir",
  "technique",
  "ennemi",
  "allié",
  "magie",
  "dragon",
  "combat",
  "quêtes",
  "arc",
  "fandom",
  "studio",
  "adaptation",
  "illustration",
  "personnage",
  "livre",
  "roman",
  "nouvelle",
  "auteur",
  "éditeur",
  "bibliothèque",
  "lecture",
  "fantastique",
  "science-fiction",
  "aventure",
  "poésie",
  "conte",
  "encyclopédie",
  "bande-dessinée",
  "classique",
  "fiction",
  "mystère",
  "thriller",
  "polar",
  "biographie",
  "manuscrit",
  "chapitre",
  "page",
  "prologue",
  "épilogue",
  "écriture",
  "style",
  "réédition",
  "collection",
  "ouvrage",
  "critique",
  "bestseller",
  "édition-limitée",
  "histoire",
  "intrigue",
  "personnage-principal",
  "antagoniste",
  "univers",
  "chronique",
  "trilogie",
  "forêt",
  "arbre",
  "plante",
  "fleur",
  "montagne",
  "rivière",
  "océan",
  "lac",
  "cascade",
  "plage",
  "désert",
  "jungle",
  "prairie",
  "ciel",
  "nuage",
  "papillon",
  "oiseaux",
  "animaux",
  "plante-aromatique",
  "forêt-tropicale",
  "arbuste",
  "roche",
  "vallée",
  "falaise",
  "île",
  "volcan",
  "étang",
  "champ",
  "arbres-anciens",
  "liane",
  "écosystème",
  "climat",
  "plante-résiliente",
  "feuille",
  "racine",
  "herbe",
  "baie",
  "champignon",
  "lumière",
  "ombre",
  "jeu",
  "console",
  "manette",
  "PC",
  "RPG",
  "FPS",
  "stratégie",
  "aventure",
  "multijoueur",
  "quête",
  "arcade",
  "plateforme",
  "simulation",
  "combat",
  "stratégie-en-temps-réel",
  "MMORPG",
  "open-world",
  "crafting",
  "boss",
  "level-up",
  "expérience",
  "score",
  "niveau",
  "upgrade",
  "mission",
  "co-op",
  "solo",
  "ennemi",
  "puzzle",
  "secret",
  "loot",
  "artefact",
  "compétence",
  "magie",
  "arme",
  "armure",
  "carte",
  "habitat",
  "pnj",
  "campagne",
  "fantôme",
  "vampire",
  "zombie",
  "loup-garou",
  "sirène",
  "magicien",
  "elfique",
  "orque",
  "gobelin",
  "griffon",
  "royaume",
  "épée",
  "sortilège",
  "château",
  "légende",
  "mythologie",
  "créature",
  "dimension",
  "portail",
  "enchanteur",
  "sorcellerie",
  "ensorcelé",
  "prophétie",
  "quatrième-dimension",
  "voyage-temporel",
  "épique",
  "destin",
  "héritage",
  "quête-mystique",
  "artifact",
  "super-héros",
  "comics",
  "Marvel",
  "DC",
  "Batman",
  "Spider-Man",
  "Iron-Man",
  "capitaine-america",
  "Hulk",
  "Wonder-Woman",
  "super-vilain",
  "justice-league",
  "x-men",
  "avengers",
  "deadpool",
  "thor",
  "flash",
  "green-lantern",
  "comic-book",
  "illustration",
  "bande-dessinée-française",
  "comic-strip",
  "storyline",
  "origin-story",
  "univers",
  "crossover",
  "fan-art",
  "édition",
  "collectionneur",
  "numéro",
  "CD",
  "DVD",
  "musique",
  "album",
  "single",
  "playlist",
  "artiste",
  "groupe",
  "concert",
  "chorale",
  "vinyl",
  "cassette",
  "boîte-collector",
  "édition-limitée",
  "réédition",
  "album-live",
  "single-exclusif",
  "EP",
  "compilation",
  "remaster",
  "DVD-collector",
  "film",
  "série",
  "documentaire",
  "bonus",
  "interview",
  "making-of",
  "scène-supprimée",
  "soundtrack",
  "OST",
  "fantasy",
  "aventure-épique",
  "exploration",
  "quête-héroïque",
  "univers-parallèle",
  "pouvoir-magique",
  "bataille-légendaire",
  "héros-mythique",
  "créature-légendaire",
  "artefact-sacré",
  "chronique-historique",
  "récit-fantastique",
  "drame",
  "thriller-psychologique",
  "humour",
  "comédie",
  "romance-épique",
  "saga",
  "sorcière",
  "chevalier",
  "royaume-perdu",
  "île-mystérieuse",
  "secret-ancien",
  "légende-urbaine",
  "quête-secret",
  "épée-magique",
  "armure-ancienne",
  "sortilège-perdu",
  "potion",
  "enchanteur-sage",
  "boss-final",
  "niveau-secret",
  "arme-légendaire",
  "armure-magique",
  "quête-secondaire",
  "artefact-ancien",
  "magie-noire",
  "magie-blanche",
  "dimension-occulte",
  "royaume-perdu",
  "compagnon",
  "familiers",
  "animal-magique",
  "guide",
  "mentor",
  "trésor",
  "caverne",
  "labyrinthe",
  "portail-magique",
  "grotte",
  "planète",
  "univers-parallèle",
  "civilisation",
  "exploration-spatiale",
  "vaisseau",
  "robots",
  "IA",
  "alien",
  "galaxie",
  "cosmos",
  "technique-spéciale",
  "attaque-ultime",
  "capacité",
  "pouvoir-surnaturel",
  "transformation",
  "mutation",
  "héros-légendaire",
  "énigme",
  "puzzle-magique",
  "quête-éternelle",
];

const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const startButton = document.getElementById("start-button");
const scoreDisplay = document.getElementById("score-display");
const timeDisplay = document.getElementById("time-display");
const winMessage = document.getElementById("win-message");
const finalMessage = document.getElementById("final-message");
const replayBtn = document.getElementById("replay-btn");
const resultsDiv = document.getElementById("results");

let score = 0;
let timeLeft = 60;
let currentWord = "";
let timer;
let isPlaying = false;

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * mots.length);
  return mots[randomIndex];
}

function showNewWord() {
  currentWord = getRandomWord();
  wordDisplay.innerText = currentWord;
}

wordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (wordInput.value.trim() === currentWord) {
      score++;
    }
    scoreDisplay.innerText = `Score: ${score}`;
    wordInput.value = "";
    showNewWord();
  }
});

function startGame() {
  if (isPlaying) return;
  isPlaying = true;
  score = 0;
  scoreDisplay.innerText = score;
  timeLeft = 60;
  timeDisplay.innerText = timeLeft;
  showNewWord();

  wordInput.disabled = false;
  winMessage.classList.add("hidden");

  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      isPlaying = false;
      endGame();
    }
  }, 1000);
}

function endGame() {
  isPlaying = false;
  wordInput.disabled = true;
  wordDisplay.innerText = "";
  finalMessage.innerText = "Temps écoulé !";
  resultsDiv.innerText = `Score : ${score}`;
  winMessage.classList.remove("hidden");
}

function replayGame() {
  winMessage.classList.add("hidden");
  wordInput.value = "";
  startGame();
}

startButton.addEventListener("click", startGame);
replayBtn.addEventListener("click", replayGame);
