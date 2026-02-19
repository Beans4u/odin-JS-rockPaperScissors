--------------------------------------------------------------------------------
                            ROCK PAPER SCISSORS GAME
--------------------------------------------------------------------------------


--------------------------------------------------------------------------------
                        GAME PROGRAM
--------------------------------------------------------------------------------


*************************************************************
        gameInit, playGame: BEGIN GAME
*************************************************************


FUNCTION playGame()

    SET gameState with FUNCTION CALL gameStateTracker()
        currentGameState object with key/value Pairs userScore 0, computerScore 0, roundCounter 0
        RETURNS currentGameState

    WHILE gameState.roundCounter is less than 5:

        UPDATE roundCounter with FUNCTION CALL fiveRoundsCounter(gameState.roundCounter)
            RETURNS INCREMENT roundCounter by 1
        
        UPDATE computerChoice with FUNCTION CALL getComputerChoice()
            RETURNS computerChoice assigned with "ROCK", "PAPER", or "SCISSORS"

        LOG - Tell user to enter their choice of "ROCK", "PAPER", or "SCISSORS"

        UPDATE userChoice with FUNCTION CALL getUserChoice()
            RETURNS userChoice in an uppercase string containing either "ROCK", "PAPER", or "SCISSORS"

        UPDATE roundWinner with FUNCTION CALL determineRoundWinner(userChoice, computerChoice)
            Compares user and computer selections and determines the winner of the round.
            RETURNS roundWinner with value "TIE", userRoundWinner, or computerRoundWinner

        FUNCTION CALL announceRoundWinner(roundWinner)
            Announces the winner of this round
            RETURNS LOG tell user it's a tie, or that they won, or that the computer won

        FUNCTION CALL increaseWinnerScore(roundWinner)
            Increases the score of the one who won the round
            RETURNS LOG tell the user the scores of both players

        IF gameState.roundCounter is 5:
            Exit while loop

    END WHILE

    RETURN - Exit function

END FUNCTION


FUNCTION gameOver()

        LOG - Ask the user if they want to play another game

        FUNCTION CALL getUserChoice(input)
        RETURNS userChoice with value YES or NO

        IF userChoice is YES:
            FUNCTION CALL playGame() to start a new game
        ELSE
            LOG - thank the player
            RETURN - exit function to end the game

END FUNCTION


--------------------------------------------------------------------------------
                        UTILITY FUNCTIONS
--------------------------------------------------------------------------------


*************************************************************
        gameState - Initialize game state variables
*************************************************************

/*----- This will initialize the variables needed for the game. -----*/

FUNCTION - gameStateTracker

    *--- This will make these variables accessible outside this scope ---*/
    
    SET gameState with CREATE OBJECT with key/value pairs:

        userScore at 0
        /*--- This will keep track of the user score, which will be used to determine the game winner ---*/

        computerScore at 0
        /*--- This will keep track of the computer score, which will be used to determine the game winner ---*/

        roundCounter at 0
        /*--- This will keep track of the rounds played, which will be used to determine when the game is over ---*/

        RETURN gameState

    END OBJECT

END FUNCTION



*************************************************************
        FIVE ROUNDS COUNTER
*************************************************************

/*----- This will keep track of the rounds played, which will be used to determine when the game is over -----*/

FUNCTION - fiveRoundsCounter(gameState.roundCounter)

    UPDATE gameState.roundCounter object by 1

    RETURN gameState.roundCounter

END FUNCTION



*************************************************************
        GET COMPUTER CHOICE
*************************************************************

/*----- This will determine the computerChoice for the round. It will randomize a number from 1 to 3, which will output ROCK, PAPER, or SCISSORS respectively -----*/

FUNCTION: getComputerChoice()
     Randomly select a number between 1 and 3

    IF the number is 1
        Return "ROCK" as the computer's choice

    ELSE IF the number is 2
        Return "PAPER" as the computer's choice

    ELSE IF the number is 3
        Return "SCISSORS" as the computer's choice
        
    ELSE
        Display "There was an error generating the computer's choice"

    RETURN - return the computer's choice or the error message.
END FUNCTION



*************************************************************
        GET USER CHOICE
*************************************************************

/* ----- This function GETS the user input ROCK, PAPER, or SCISSORS. ----- */
        
FUNCTION: getUserChoice(input)

    INIT userChoice

    WHILE userChoice is not a string containing ROCK, PAPER, SCISSORS, YES, or NO:
        
        SET userChoice with PROMPT + UPPERCASE string method to make it case insensitive
        
        PROMPT - get INPUT again, explaining error in prompt
    
    END WHILE
    
    RETURN - userChoice

END FUNCTION


*************************************************************
        DETERMINE ROUND WINNER
*************************************************************

/*----- This will take the user and computer round results from computerChoice and userChoice, and determine the winner of the round -----*/

FUNCTION: determineRoundWinner(userChoice, computerChoice)

    SWITCH

        CASE 1 - the computer and the user chose the same thing
            UPDATE - STRING "TIE" to gameState's roundWinner

        CASE 2 - ROCK beats SCISSORS
            UPDATE - ROCK player to gameState's roundWinner

        CASE 3 - SCISSORS beats PAPER
            UPDATE - SCISSORS player to roundWinner

        CASE 4 - PAPER beats ROCK
            UPDATE - PAPER player to roundWinner

    UPDATE roundWinner with "TIE", userRoundWinner, or computerRoundWinner

    RETURN roundWinner

END FUNCTION



*************************************************************
        ANNOUNCE ROUND WINNER
*************************************************************

/*----- This will take roundWinner from determineRoundWinner and announce the winner. The roundWinner value is reassigned to the winner's name to utilize the placeholder in the LOG message -----*/

FUNCTION: announceRoundWinner(roundWinner)

    SWITCH
        CASE 1 it's a tie (the roundWinner variable value is "TIE"):
            LOG - tell the user it's a tie.
            RETURN - exit function

        CASE 2 the user won (variable value is userRoundWinner):
            LOG - tell user they won the round.
            RETURN - exit function

        CASE 3 the computer won (variable value is computerRoundWinner)
            LOG - tell user the winner won the round.
            RETURN - exit function

END FUNCTION



*************************************************************
        INCREASE WINNER SCORE
*************************************************************

/*----- This will take the results from determineRoundWinner and increment their score. This function should not be called in case of a draw. -----*/

FUNCTION: increaseWinnerScore(roundWinner)

    /*--- short circuit: we don't need to display the score on a tie ---*/
    
    IF it's a tie (the roundWinner variable value is "TIE"):
        RETURN - Exit function
    END IF


    IF the user won (variable value is userRoundWinner):
        INCREMENT user's score with gameState.userScore object

    ELSE (variable value is computerRoundWinner)
        INCREMENT computer's score with gameState.computerScore object
    
    END IF


    RETURN LOG - tell the user the scores of both players

END FUNCTION



*************************************************************
        END OF 5 ROUNDS: DETERMINE GAME WINNER
*************************************************************

/*----- Once roundCounter reaches 5, this function will be called to determine the winner of the game. The gameWinner value is reassigned to the winner's name to utilize the placeholder in the LOG message -----*/

FUNCTION: determineGameWinner(gameStatus.userScore, gameStatus.computerScore)

    SET gameWinner to null;

    /*--- Short-circuit ---*/
    IF the user and computer have the same scores:
        UPDATE - gameWinner with "TIE"  // to report the tie in announcement function
        RETURN - gameWinner
    ELSE 
        CONTINUE
        

    IF the user won:
        UPDATE - gameWinner with "YOU" to address user  // to reference computer in announcement function
        RETURN - gameWinner
    ELSE
        UPDATE - gameWinner with "COMPUTER" // to reference computer in announcement function
        RETURN - gameWinner
        
END FUNCTION



*************************************************************
        ANNOUNCE GAME WINNER
*************************************************************

/*----- This will announce the winner of the game. gameWinner can be used as a placeholder for the announcement to fill in TIE, YOU, or COMPUTER. e.g. "PLACEHOLDER won the game!". -----*/

FUNCTION: announceGameWinner(determineGameWinner.gameWinner)
    IF it's a tie:
        LOG - Tell the user it's a tie

    ELSE IF the user won:
        LOG - Tell the user they won the game

    ELSE:
        LOG - Tell the user the computer won the game

END FUNCTION