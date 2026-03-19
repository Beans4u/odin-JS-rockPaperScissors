// --------------------------------------------------------------------------------
//                         GAME PROGRAM
// --------------------------------------------------------------------------------

// *************************************************************
//         DOM ELEMENTS
// *************************************************************

//  + + + THROW HANDS + + +
let choiceButtons = document.querySelectorAll('#btn-choice-container button');

//  + + + RPS ARENA + + +
const playerChoiceText = document.getElementById('player-choice-text');
const playerRoundResults = document.getElementById('player-round-results');

//  + + + SCORE BOARD + + +
const scoreBoard = document.getElementById('score-board');
const roundNumber = document.getElementById('round-number');

//  + + + GAME PROGRESS + + +
const gameProgressHeader = document.getElementById('game-progress-header');
const gameProgressText = document.getElementById('game-progress-text');
const newGameButton = document.getElementById('btn-play-again');

// *************************************************************
//         GAME STATE
// *************************************************************

const gameState = {
  userScore: 0,
  /*--- This will keep track of the user score, which will be used to determine the game winner ---*/

  computerScore: 0,
  /*--- This will keep track of the computer score, which will be used to determine the game winner ---*/

  tiesScore: 0,

  roundCounter: 0,
  /*--- This will keep track of the rounds played, which will be used to determine when the game is over ---*/
};

const MAX_ROUNDS = 5;

// *************************************************************
//         BEGIN GAME
// *************************************************************

// GAME BUTTONS: add or remove disable button styles

choiceButtons.forEach((choiceButton) => {
  choiceButton.disabled = false;
  choiceButton.classList.remove('disabled-button');
});

choiceButtons.forEach((button) => {
  // RETURNS userChoice in an uppercase string containing either "ROCK", "PAPER", or "SCISSORS"
  button.addEventListener('click', (e) => {
    if (gameState.roundCounter < 5) {
      ++gameState.roundCounter;

      /* ----- Updates the status text in the Game Status area. ----- */
      gameProgressHeader.textContent = 'Round started';
      gameProgressText.textContent = '[game in progress...]';

      /* ----- This function gets the user's hand as ROCK, PAPER, or SCISSORS. ----- */
      const userChoice = e.target.textContent;
      console.log('userChoice initial = ', userChoice);

      // RETURNS computerChoice assigned with "ROCK", "PAPER", or "SCISSORS"
      let computerChoiceResult = getComputerChoice();

      // Compares user and computer selections and determines the winner of the round.
      // RETURNS roundWinner with value "TIE", userRoundWinner, or computerRoundWinner
      let roundWinner = determineRoundWinner(userChoice, computerChoiceResult);

      // Increases the score of the one who won the round
      // RETURNS text: tell the user the scores of both players
      increaseWinnerScore(roundWinner, gameState);

      // Announces the winner of this round
      // RETURNS text: tell user it's a tie, or that they won, or that the computer won
      displayArenaText(roundWinner, userChoice, computerChoiceResult);
      displayRoundScores(gameState);

      if (gameState.roundCounter === MAX_ROUNDS) {
        // displayGameWinner(gameState);
        // Announces the winner of this round
        // RETURNS text: tell user it's a tie, or that they won, or that the computer won

        // maybe change the brightness of the button backgrounds to make it more obvious.

        choiceButtons.forEach((choiceButton) => {
          choiceButton.classList.add('disabled-button');
          choiceButtons.disabled = true;

          newGameButton.disabled = false;
          newGameButton.classList.remove('disabled-button');
        });

        // END OF 5 ROUNDS: DETERMINE GAME WINNER
        const gameWinner = determineGameWinner(gameState);
        displayGameWinner(gameWinner);
      } //end of 5 rounds IF statement
    } // end of IF statement
  });
});

// *************************************************************
//         NEW GAME
// *************************************************************

// + + + + + NEW GAME BUTTON + + + + +
// clear printed data from the containers
newGameButton.addEventListener('click', () => {
  // change each gameState object back to 0
  gameState.userScore = 0;
  gameState.computerScore = 0;
  gameState.roundCounter = 0;

  // RPS ARENA: change each DOM element back to default text
  playerChoiceText.textContent =
    'Click ROCK, PAPER, or SCISSORS to start the game.';
  playerRoundResults.textContent = 'Game will end after five rounds.';

  // SCORE BOARD: change each DOM element back to default text
  scoreBoard.textContent = 'User score: 0 | Computer score: 0 | Ties: 0';
  roundNumber.textContent = 'Round number: 0';

  // GAME PROGRESS: change each DOM element back to default text
  gameProgressHeader.textContent = 'Game not started.';
  gameProgressText.textContent = '[waiting for user...]';

  // GAME BUTTONS: add or remove disable button styles
  choiceButtons.disabled = true;
  choiceButtons.forEach((choiceButton) => {
    choiceButton.classList.remove('disabled-button');
  });
  newGameButton.disabled = true;
  newGameButton.classList.add('disabled-button');
});

// --------------------------------------------------------------------------------
//                         BELOW: UTILITY FUNCTIONS
// --------------------------------------------------------------------------------

// *************************************************************
//         GET COMPUTER CHOICE
// *************************************************************

function getComputerChoice() {
  /*----- This will determine the computerChoice for the round. It will randomize a number from 1 to 3, which will output ROCK, PAPER, or SCISSORS respectively -----*/

  const number = Math.floor(Math.random() * 3) + 1;

  if (number === 1) {
    return 'ROCK';
  } else if (number === 2) {
    return 'PAPER';
  } else {
    return 'SCISSORS';
  }
}

// *************************************************************
//         DETERMINE ROUND WINNER
// *************************************************************

function determineRoundWinner(userChoiceInput, computerChoiceResult) {
  /*----- This will take the user and computer round results from computerChoice and userChoice, and determine the winner of the round -----*/

  const userChoice = userChoiceInput;
  const computerChoice = computerChoiceResult;

  // HANDLING THE TIE (short-circuit)
  if (userChoice === computerChoice) {
    return 'TIE';
  }

  // ROCK BEATS SCISSORS
  if (userChoice === 'ROCK' && computerChoice === 'SCISSORS') {
    return 'USER';
  } else if (userChoice === 'SCISSORS' && computerChoice === 'ROCK') {
    return 'COMPUTER';

    // SCISSORS BEATS PAPER
  } else if (userChoice === 'SCISSORS' && computerChoice === 'PAPER') {
    return 'USER';
  } else if (userChoice === 'PAPER' && computerChoice === 'SCISSORS') {
    return 'COMPUTER';
  }

  // PAPER BEATS ROCK
  else if (userChoice === 'PAPER' && computerChoice === 'ROCK') {
    return 'USER';
  } else if (userChoice === 'ROCK' && computerChoice === 'PAPER') {
    return 'COMPUTER';
  }
}

// *************************************************************
//         INCREASE WINNER SCORE
// *************************************************************

function increaseWinnerScore(roundWinner, gameState) {
  /*----- This will take the results from determineRoundWinner and increment their score. -----*/

  /*--- short circuit: we don't need to increase the score on a tie ---*/
  if (roundWinner === 'TIE') {
    ++gameState.tiesScore;
  } else if (roundWinner === 'USER') {
    ++gameState.userScore;
  } else {
    ++gameState.computerScore;
  }

  return;
}

// *************************************************************
//         ANNOUNCE ROUND WINNER (ARENA)
// *************************************************************

function displayArenaText(roundWinner, userChoice, computerChoiceResult) {
  /*----- This will take value of roundWinner from determineRoundWinner and announce the winner by printing the text in the RPS ARENA. -----*/
  const userHand = userChoice;
  const computerHand = computerChoiceResult;

  switch (roundWinner) {
    case 'TIE':
      playerChoiceText.textContent = "It's a tie!";
      break;

    case 'USER':
      playerChoiceText.textContent = 'You won this round!';
      break;

    case 'COMPUTER':
      playerChoiceText.textContent = 'The computer won this round!';
      break;
  }
  playerRoundResults.textContent = `You chose ${userHand} and the computer chose ${computerHand}`;
}

// *************************************************************
//         DISPLAY ROUND SCORES (SCORE BOARD)
// *************************************************************

function displayRoundScores(gameState) {
  /*----- This will take value of roundWinner from determineRoundWinner and announce the winner by printing the text in the RPS ARENA. -----*/
  const currentUserScore = gameState.userScore;
  const currentComputerScore = gameState.computerScore;
  const currentTiesScore = gameState.tiesScore;
  const currentRound = gameState.roundCounter;

  scoreBoard.textContent = `User score: ${currentUserScore} | Computer score: ${currentComputerScore} | Ties:
    ${currentTiesScore}`;

  roundNumber.textContent = `Round: ${currentRound}`;
}

// *************************************************************
//         END OF 5 ROUNDS: DETERMINE GAME WINNER
// *************************************************************

function determineGameWinner(gameState) {
  /*----- This will determine the winner of the game. -----*/
  const userScore = gameState.userScore;
  const computerScore = gameState.computerScore;

  if (userScore === computerScore) {
    return 'TIE';
  } else if (userScore > computerScore) {
    return 'USER';
  } else {
    return 'COMPUTER';
  }
}
// *************************************************************
//         END OF 5 ROUNDS: ANNOUNCE GAME WINNER
// *************************************************************

function displayGameWinner(winResult) {
  /*----- This will announce the winner of the game. -----*/
  const gameWinner = winResult;

  if (gameWinner === 'TIE') {
    gameProgressHeader.textContent = "YOU'RE EQUAL IN STRENGTH.";
    return (gameProgressText.textContent = '[the game is tied]');
  } else if (gameWinner === 'USER') {
    gameProgressHeader.textContent = 'A WINNER IS YOU!';
    return (gameProgressText.textContent = '[you won the game]');
  } else {
    gameProgressHeader.textContent = 'BAD END.';
    return (gameProgressText.textContent = '[you lost the game]');
  }
}
