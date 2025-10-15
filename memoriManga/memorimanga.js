const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let attempts = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  attempts++;
  document.getElementById("attempts").textContent = "Tentatives : " + attempts;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();

  const allMatched =
    document.querySelectorAll(".memory-card.flip").length === cards.length;

  if (allMatched) {
    setTimeout(() => {
      const winMessage = document.getElementById("win-message");
      const finalMessageDiv = document.getElementById("final-message");

      if (attempts <= 12) {
        finalMessageDiv.textContent = "Tu es le GOAT ! Le roi du memorie !";
      } else if (attempts <= 20) {
        finalMessageDiv.textContent =
          "Bien joué tu es dans une bonne moyenne ! ";
      } else if (attempts <= 30) {
        finalMessageDiv.textContent = "Mouai on peut dire que ça passe ...";
      } else {
        finalMessageDiv.textContent = "Change de jeu, c'est pas fait pour toi!";
      }

      winMessage.classList.remove("hidden");
    }, 500);
  }
}

document.getElementById("replay-btn").addEventListener("click", () => {
  document.getElementById("win-message").classList.add("hidden");
  document.getElementById("final-message").textContent = "";
  resetGame();
});

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
  const positions = Array.from(Array(cards.length).keys());
  cards.forEach((card) => {
    const randomIndex = Math.floor(Math.random() * positions.length);
    const pos = positions.splice(randomIndex, 1)[0];
    card.style.order = pos;
  });
}

function resetGame() {
  attempts = 0;
  document.getElementById("attempts").textContent = "Tentatives : 0";
  resetBoard();

  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });

  shuffleCards();
}

shuffleCards();
cards.forEach((card) => card.addEventListener("click", flipCard));
