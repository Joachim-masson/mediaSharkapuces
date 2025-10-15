
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false; 
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard){
        hasFlippedCard = true; 
        firstCard= this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
        disableCards();
        updateScoreOnMatch(); 
    } else {
        unflipCards();
        updateScoreOnError(); 
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * cards.length);
        card.style.order = ramdomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flipCard));


let score = 0;
let erreurs = 0;
let pairesTrouvees = 0;
let totalPairs = cards.length / 2;


const endGameContainer = document.createElement('div');
endGameContainer.id = 'endgame-container';
endGameContainer.style.display = 'none';
endGameContainer.style.textAlign = 'center';
endGameContainer.style.marginTop = '30px';
endGameContainer.style.transition = 'opacity 0.6s ease';
endGameContainer.innerHTML = `
    <h2 id="endgame-message" style="opacity:0;">Bravo ! 🎉</h2>
    <h3 id="final-score">Score : 0</h3>
    <button id="replay-btn" style="
        background-color:#f2c200;
        border:none;
        padding:10px 20px;
        border-radius:8px;
        cursor:pointer;
        font-size:1rem;
        font-weight:bold;
        transition:background 0.3s;">Rejouer</button>
`;
document.querySelector('main').appendChild(endGameContainer);

document.getElementById('replay-btn').addEventListener('click', () => {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    score = 0;
    erreurs = 0;
    pairesTrouvees = 0;
    endGameContainer.style.display = 'none';

    (function shuffle() {
        cards.forEach(card => {
            let ramdomPos = Math.floor(Math.random() * cards.length);
            card.style.order = ramdomPos;
        });
    })();

    resetBoard();
});

function updateScoreOnMatch() {
    score += 10;
    pairesTrouvees++;
    checkEndGame();
}

function updateScoreOnError() {
    score -= 2;
    if(score < 0) score = 0;
    erreurs++;
}

function checkEndGame() {
    if(pairesTrouvees === totalPairs){
        document.getElementById('final-score').textContent = `Score final : ${score}`;
        endGameContainer.style.display = 'block';
        setTimeout(() => {
            document.getElementById('endgame-message').style.opacity = 1;
        }, 200);
    }
}
