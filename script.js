// --------------------------------------------------------------------------------
//                         GAME PROGRAM
// --------------------------------------------------------------------------------


// *************************************************************
//         gameInit, playGame: BEGIN GAME
// *************************************************************



function playGame() {

    const gameState = {

        userScore: 0,
        /*--- This will keep track of the user score, which will be used to determine the game winner ---*/

        computerScore: 0,
        /*--- This will keep track of the computer score, which will be used to determine the game winner ---*/

        roundCounter: 0,
        /*--- This will keep track of the rounds played, which will be used to determine when the game is over ---*/
    };

    while (gameState.roundCounter < 5) {

        ++gameState.roundCounter;

        let computerChoiceResult = getComputerChoice()
        // RETURNS computerChoice assigned with "ROCK", "PAPER", or "SCISSORS"

        let userChoiceInput = getUserChoiceRPS();
        // RETURNS userChoice in an uppercase string containing either "ROCK", "PAPER", or "SCISSORS"

        let roundWinner = determineRoundWinner(userChoiceInput, computerChoiceResult)
        // Compares user and computer selections and determines the winner of the round.
        // RETURNS roundWinner with value "TIE", userRoundWinner, or computerRoundWinner

        announceRoundWinner(roundWinner);
        // Announces the winner of this round
        // RETURNS text: tell user it's a tie, or that they won, or that the computer won

        increaseWinnerScore(roundWinner, gameState);
        // Increases the score of the one who won the round
        // RETURNS text: tell the user the scores of both players

    } // END OF WHILE LOOP

        announceGameWinner(gameState);
        // Announces the winner of this round
        // RETURNS text: tell user it's a tie, or that they won, or that the computer won

        let displayScore = JSON.stringify(gameState, null, 4);
    
        window.confirm(`Current score: ${displayScore}`);

    return gameOver();

}

function gameOver() {
    
    const newGameInput = prompt("Do you want to play a new game? Enter YES or NO.").toUpperCase();

    /*--- Short circuit  ---*/
    if (newGameInput === "" || newGameInput === null) {
    newGameInput = window.prompt("You didn't enter anything, please try again. Do you want to play a new game? Enter YES or NO.");
    return gameOver(newGameInput);
    }


    if (newGameInput !== "YES" && newGameInput !== "NO") {
    newGameInput = prompt("Your answer was invalid, please try again. Do you want to play a new game? Enter YES or NO.");
    return gameOver(newGameInput);
    }

    if (newGameInput === "NO") {
        return window.confirm("Thank you for playing!");
    }

    return playGame();
}




// --------------------------------------------------------------------------------
//                         BELOW: UTILITY FUNCTIONS
// --------------------------------------------------------------------------------


// *************************************************************
//         GET COMPUTER CHOICE
// *************************************************************


function getComputerChoice() {
/*----- This will determine the computerChoice for the round. It will randomize a number from 1 to 3, which will output ROCK, PAPER, or SCISSORS respectively -----*/

    const number = Math.floor(Math.random() * 3) + 1;
    let computerChoice = null;

    if (number === 1) {
        return computerChoice = "ROCK";
    }

    else if (number === 2) {
        return computerChoice = "PAPER";
    }

    else if (number === 3) {
        return computerChoice = "SCISSORS";
    }

    else {
        const errorMessage = window.confirm("There was an error generating the computer's choice");
        return errorMessage;
    }
}



// *************************************************************
//         GET USER CHOICE - RPS (ROCK PAPER SCISSORS)
// *************************************************************


function getUserChoiceRPS() {
/* ----- This function GETS the user input ROCK, PAPER, or SCISSORS. ----- */

    let rpsInput = window.prompt("What do you choose, ROCK, PAPER, or SCISSORS?");
    
    let userChoice = rpsInput.toUpperCase(); 

    if (userChoice === "" || userChoice === null) {
        window.confirm("Your answer is invalid, please try again.");
        return rpsInput = getUserChoiceRPS(rpsInput); 
    }

    if (userChoice !== "ROCK" && userChoice !== "PAPER" && userChoice !== "SCISSORS") {
        window.confirm("Your answer is invalid, please try again.");
        return rpsInput = getUserChoiceRPS(rpsInput); 
    }

    return userChoice;

}



// *************************************************************
//         DETERMINE ROUND WINNER
// *************************************************************


function determineRoundWinner(userChoiceInput, computerChoiceResult) {
/*----- This will take the user and computer round results from computerChoice and userChoice, and determine the winner of the round -----*/

    const userChoice = userChoiceInput;
    const computerChoice = computerChoiceResult;

    let roundWinner = null;


    // HANDLING THE TIE (short-circuit)
    if (userChoice === computerChoice) {
        return roundWinner = "TIE";
    }

    // ROCK BEATS SCISSORS
    if  (userChoice === "ROCK" && computerChoice === "SCISSORS") {
        roundWinner = "USER";
    }
    else if (userChoice === "SCISSORS" && computerChoice === "ROCK") {
        roundWinner = "COMPUTER";


    // SCISSORS BEATS PAPER
    }
    else if (userChoice === "SCISSORS" && computerChoice === "PAPER") {
        roundWinner = "USER";
    }
    else if (userChoice === "PAPER" && computerChoice === "SCISSORS") {
        roundWinner = "COMPUTER";
    }


    // PAPER BEATS ROCK
    else if (userChoice === "PAPER" && computerChoice === "ROCK") {
        roundWinner = "USER";
    }
    else if (userChoice === "ROCK" && computerChoice === "PAPER") {
        roundWinner = "COMPUTER";
    }

    return roundWinner;
}



// *************************************************************
//         ANNOUNCE ROUND WINNER
// *************************************************************


function announceRoundWinner(roundWinner) {
/*----- This will take value of roundWinner from determineRoundWinner and announce the winner. -----*/

    switch (roundWinner) {

        case "TIE":
            return window.confirm("It's a tie!");

        case "USER":
            return window.confirm("You won this round!");

        case "COMPUTER":
            return window.confirm("The computer won this round!");
    }

}



// *************************************************************
//         INCREASE WINNER SCORE
// *************************************************************


function increaseWinnerScore(roundWinner, gameState) {
/*----- This will take the results from determineRoundWinner and increment their score. -----*/


    /*--- short circuit: we don't need to increase the score on a tie ---*/
    if (roundWinner === "TIE") {
        return;
    }

    else if (roundWinner === "USER") {
        ++gameState.userScore;
    }
    else {
        ++gameState.computerScore;
    }

    return;

}



// *************************************************************
//         END OF 5 ROUNDS: ANNOUNCE GAME WINNER
// *************************************************************


function announceGameWinner(gameState) {
/*----- This will announce the winner of the game. -----*/

    const userScore = gameState.userScore;
    const computerScore = gameState.computerScore;

        if (userScore === computerScore) {
            return window.confirm("The game ends in a tie!");
        }
        else if (userScore < computerScore) {
            return window.confirm("A winner is you! (you won the game!)");
        }
        else {
            return window.confirm("Bad end. (you lost the game)");
        }
}


// On load, start game

playGame()