// --------------------------------------------------------------------------------
//                             ROCK PAPER SCISSORS GAME
// --------------------------------------------------------------------------------


// --------------------------------------------------------------------------------
//                         GAME PROGRAM
// --------------------------------------------------------------------------------


// *************************************************************
//         gameInit, playGame: BEGIN GAME
// *************************************************************

// HOUSEKEEPING: I need to find a better way to handle the gameState, and make sure that the values reset when a new game starts.

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

        let rpsInput = prompt("Enter ROCK, PAPER, or SCISSORS");

        let userChoiceInput = getUserChoice(rpsInput);
        // RETURNS userChoice in an uppercase string containing either "ROCK", "PAPER", or "SCISSORS"

        let roundWinner = determineRoundWinner(userChoiceInput, computerChoiceResult)
        // Compares user and computer selections and determines the winner of the round.
        // RETURNS roundWinner with value "TIE", userRoundWinner, or computerRoundWinner

        announceRoundWinner(roundWinner);
        // Announces the winner of this round
        // RETURNS LOG tell user it's a tie, or that they won, or that the computer won

        increaseWinnerScore(roundWinner);
        // Increases the score of the one who won the round
        // RETURNS LOG tell the user the scores of both players

    } // END OF WHILE LOOP

    return gameState;
}


function gameOver() {
    
    const newGameInput = prompt("Do you want to play a new game?");

    const newGame = getComputerChoice(newGameInput);

    if (newGame === "YES") {
        return playGame();
    }
    else {
        return console.log("Thank you for playing!");
    }
}




// --------------------------------------------------------------------------------
//                         BELOW: UTILITY FUNCTIONS
// --------------------------------------------------------------------------------



// *************************************************************
//         GET COMPUTER CHOICE
// *************************************************************


function getComputerChoice() {
/*----- This will determine the computerChoice for the round. It will randomize a number from 1 to 3, which will output ROCK, PAPER, or SCISSORS respectively -----*/

    let number = Math.floor(Math.random() * 3) + 1;
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
        const errorMessage = console.log("There was an error generating the computer's choice");
        return errorMessage;
    }
}



// *************************************************************
//         GET USER CHOICE
// *************************************************************


function getUserChoice(rpsInput) {
/* ----- This function GETS the user input ROCK, PAPER, or SCISSORS. ----- */

    let userChoice = String.toUpperCase(rpsInput); 

    while (userChoice !== "ROCK" || userChoice !== "PAPER" || userChoice !== "SCISSORS" || userChoice !== "YES" || userChoice !== "NO") {

        rpsInput = prompt("Your answer was invalid, please try again.");
        getUserChoice(rpsInput); // do I need this?
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
    else {
        roundWinner = "COMPUTER";
    }

    return roundWinner;
}



// *************************************************************
//         ANNOUNCE ROUND WINNER
// *************************************************************

// HOUSEKEEPING: need to ensure using return instead of break works as expected.


function announceRoundWinner(roundWinner) {
/*----- This will take roundWinner from determineRoundWinner and announce the winner. The roundWinner value is reassigned to the winner's name to utilize the placeholder in the LOG message -----*/
    const roundWinner = roundWinner;

    switch (true) {

        case roundWinner("TIE"):
            return console.log("It's a tie!");

        case roundWinner("USER"):
            return console.log("You won this round!");

        case roundWinner("COMPUTER"):
            return console.log("The computer won this round!");
    }

}



// *************************************************************
//         INCREASE WINNER SCORE
// *************************************************************


function increaseWinnerScore(roundWinner) {
/*----- This will take the results from determineRoundWinner and increment their score. This function should not be called in case of a draw. -----*/

    const roundWinner = roundWinner;

    /*--- short circuit: we don't need to display the score on a tie ---*/
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
// /*----- This will announce the winner of the game. gameWinner can be used as a placeholder for the announcement to fill in TIE, YOU, or COMPUTER. e.g. "PLACEHOLDER won the game!". -----*/

    const userScore = gameState.userScore;
    const computerScore = gameState.computerScore;

//     /*--- Short-circuit ---*/
        if (userScore === computerScore) {
            return console.log("The game ends in a tie!");
        }
        else if (userScore < computerScore) {
            return console.log("A winner is you!");
        }
        else {
            return console.log("Bad end.");
        }
}