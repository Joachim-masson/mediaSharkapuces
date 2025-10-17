const words = ['MARIO', 'NARUTO', 'PACMAN', 'AVATAR','POULET', 'BATMAN', 'ZELDA', 'POKEMON','LICORNE', 'GLADIATOR', 'PIRATE', 'ANTAGONISTE', 'TRILOGIE', 'FANTASTIQUE', 'SAMOURAI', 'TITANS', 'ATTAQUE', 'POUVOIR', 'NINJA', 'DRAGON','AVENTURE','OPHTALMOLOGUE','SAMOURAI'];
  
  let word = '';
  let guessedLetters = [];
  let remainingGuesses = 10;
  const hangmanParts = ['base','upright','beam','rope','head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];

  function chooseWord() {
    return words[Math.floor(Math.random() * words.length)];
  }
  function displayWord() {
    const wordEl = document.getElementById('word');
    wordEl.innerHTML = word.split('').map(letter => 
      guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
  }
  function displayGuesses() {
    const guessesEl = document.getElementById('guesses');
    guessesEl.textContent = `Lettres essayées : ${guessedLetters.join(', ')}`;
  }
  function updateHangman() {
    for (let i = 0; i < 10 - remainingGuesses; i++) {
      document.getElementById(hangmanParts[i]).setAttribute('visibility', 'visible');
    }
  }
  function showMessage(text, isSuccess) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = isSuccess ? 'success' : 'failure';
    messageEl.style.opacity = 1;
  }

  function checkWin() {
    if (word.split('').every(letter => guessedLetters.includes(letter))) {
      showMessage('Félicitations ! Vous avez gagné !', true);
      disableButtons();
    }
  }

  function checkLoss() {
    if (remainingGuesses === 0) {
      showMessage(`Dommage ! Le mot était : ${word}`, false);
      disableButtons();
    }
  }
  function guessLetter(letter) {
    if (!guessedLetters.includes(letter)) {
      guessedLetters.push(letter);
      if (!word.includes(letter)) {
        remainingGuesses--;
        updateHangman();
      }
      displayWord();
      displayGuesses();
      checkWin();
      checkLoss();
    }
  }
  function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = ''; 
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const button = document.createElement('button');
      button.textContent = letter;
      button.addEventListener('click', () => guessLetter(letter));
      keyboard.appendChild(button);
    }
  }

  function disableButtons() {
    const buttons = document.querySelectorAll('#keyboard button');
    buttons.forEach(button => button.disabled = true);
  }

  function newGame() {
    word = chooseWord();
    guessedLetters = [];
    remainingGuesses = 10;
  
    displayWord();
    displayGuesses();
    updateHangman(); 
  
    const buttons = document.querySelectorAll('#keyboard button');
    buttons.forEach(button => button.disabled = false);

    hangmanParts.forEach(id => {
      document.getElementById(id).setAttribute('visibility', 'hidden');
    });
  
    const messageEl = document.getElementById('message');
    messageEl.style.opacity = 0;
    messageEl.textContent = '';
    messageEl.className = '';
  }

  createKeyboard();
  newGame();

  document.getElementById('newGameBtn').addEventListener('click', newGame);