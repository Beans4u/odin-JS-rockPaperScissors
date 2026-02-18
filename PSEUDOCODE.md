************************************************************************************
                            PSEUDOCODE QUICK REFERENCE
************************************************************************************

++++++++++++++++++++++++++++++++
        COMMON KEYWORDS
++++++++++++++++++++++++++++++++

SEQUENCE        Linear execution of steps, one after another
WHILE           Loop with a condition at the beginning
REPEAT-UNTIL    Loop with a condition at the end
FOR	            Looping a fixed number of times
IF-THEN-ELSE    Conditional statement, alters flow based on conditions
CASE	        Generalized form of IF-THEN-ELSE for multiple options
CALL            Invoke a function or class
EXCEPTION/WHEN  Handle errors
FUNCTION	    Defines a function that returns a value
PROCEDURE/SUB	Defines a procedure that does not return a value
CALL	        Calls a function or procedure
RETURN	        Returns a value from a function
PARAMETERS	    Define inputs to functions
CLASS	        Define a class or object blueprint
ATTRIBUTES	    List properties/fields of an object
METHOD	        Define a method inside a class
NEW	            Create a new instance of a class
CALL	        Call a method on an object
SET / GET	    Optional keywords for setting or retrieving attributes



++++++++++++++++++++++++++++++++
        GUIDANCE
++++++++++++++++++++++++++++++++

1. Capitalize the initial word (usually a construct like IF, FOR, WHILE).

2. One statement per line.

3. Indent to show hierarchy and nesting.

4. End multi-line constructs explicitly (e.g., ENDIF, ENDWHILE).

5. Keep it language-independent.

6. Use problem-domain naming rather than implementation details.

    Example: Append last name to first name instead of name = first + last.

7. Keep statements simple, concise, and readable.



--------------------------------------------------------------------------------
                        ROCK PAPER SCISSORS GAME
--------------------------------------------------------------------------------



*************************************************************
        gameInit, playGame: BEGIN GAME
*************************************************************



FUNCTION playGame()

    FUNCTION CALL gameState()
        INIT userScore 0, computerScore 0, roundCounter 0
        RETURNS NOTHING

    WHILE gameState.roundCounter is less than 5:

        FUNCTION CALL fiveRoundsCounter(gameState.roundCounter)
                RETURNS ++roundCounter
        
        FUNCTION CALL assignComputerChoice()
            RETURNS computerChoice assigned with "ROCK", "PAPER", or "SCISSORS"

        LOG - Tell user to enter their choice of "ROCK", "PAPER", or "SCISSORS"

        FUNCTION CALL getUserChoice(input)
            RETURNS userChoice in an uppercase string containing either "ROCK", "PAPER", or "SCISSORS"

        FUNCTION CALL determineRoundWinner(getUserChoice.userChoice, assignComputerChoice.computerChoice)
            Compares user and computer selections and determines the winner of the round
            RETURNS roundWinner

        FUNCTION CALL assignRoundWinner(determineRoundWinner.roundWinner)
            Takes the value of roundWinner and assigns a placeholder value for the round prompt
            RETURN roundWinner with value "TIE", userRoundWinner, or computerRoundWinner

        FUNCTION CALL increaseWinnerScore(determineRoundWinner.roundWinner)
            Increases the score of the one who won the round
            RETURNS ++userScore or ++computerScore

        FUNCTION CALL announceRoundWinner(assignRoundWinner.roundWinner)
            Announces the winner using the variable assignRoundWinner.roundWinner which contains either the "TIE", userRoundWinner, or computerRoundWinner value.
            RETURNS LOG tell user it's a tie, or that they won, of that the computer won

        IF fiveRoundsCounter.roundCounter is 5:
            Exit while loop

    END WHILE

    RETURN - Exit function

END FUNCTION


FUNCTION gameOver()

        LOG - Tell the user if they want to play another game

        FUNCTION CALL getUserChoice(input)
        RETURNS userChoice with value YES or NO

        IF userChoice is YES:
            FUNCTION CALL playGame() to start a new game
        ELSE
            LOG - thank the player
            RETURN - exit function to end the game

END FUNCTION



*************************************************************
        gameState - Initialize game state variables
*************************************************************

/*----- This will initialize the variables needed for the game. -----*/

FUNCTION - gameState


        INIT userScore at 0             
        /*--- This will keep track of the user score, which will be used to determine the game winner ---*/


        INIT computerScore at 0          
        /*--- This will keep track of the computer score, which will be used to determine the game winner ---*/


        INIT roundCounter at 0
        /*--- This will keep track of the rounds played, which will be used to determine when the game is over ---*/

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

FUNCTION: assignComputerChoice()
     Randomly select a number between 1 and 3

    IF the number is 1
        Return "ROCK" as the computer's choice

    ELSE IF the number is 2
        Return "PAPER" as the computer's choice

    ELSE IF the number is 3
        Return "SCISSORS" as the computer's choice
        
    ELSE
        Display "There was an error generating the computer's choice"

    RETURN - return the computer's choice.
END FUNCTION



*************************************************************
        GET USER CHOICE
*************************************************************

/* ----- This function GETS the user input ROCK, PAPER, or SCISSORS.----- */
        
FUNCTION: getUserChoice(input)

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

FUNCTION: determineRoundWinner(getUserChoice.userChoice, assignComputerChoice.computerChoice)

    SWITCH

        CASE 1 - the computer and the user chose the same thing
            UPDATE - STRING "TIE" to gameState's roundWinner object

        CASE 2 - ROCK beats SCISSORS
            UPDATE - ROCK player to gameState's roundWinner object

        CASE 3 - SCISSORS beats PAPER
            UPDATE - SCISSORS player to roundWinner object

        CASE 4 - PAPER beats ROCK
            UPDATE - PAPER player to roundWinner object

    UPDATE roundWinner with "TIE", userRoundWinner, or computerRoundWinner

    RETURN roundWinner

END FUNCTION


*************************************************************
        INCREASE WINNER SCORE
*************************************************************

/*----- This will take the results from determineRoundWinner and increment their score. This function should not be called in case of a draw. -----*/

FUNCTION: increaseWinnerScore(determineRoundWinner.roundWinner)

    IF the user won,
        INCREMENT user's score 

    ELSE 
        INCREMENT computer's score

    RETURN updated score

END FUNCTION


*************************************************************
        ANNOUNCE ROUND WINNER
*************************************************************

/*----- This will take roundWinner from determineRoundWinner and announce the winner. The roundWinner value is reassigned to the winner's name to utilize the placeholder in the LOG message -----*/

FUNCTION: announceRoundWinner(determineRoundWinner.roundWinner)

    /*--- Short-circuit ---*/
    IF the roundWinner variable value is "TIE":
        LOG - tell the user it's a tie.
        RETURN - exit function
    ELSE 
        CONTINUE
        
    IF the user won (variable value is userRoundWinner):
        LOG - tell user they won the round.
        RETURN - exit function
    ELSE
        LOG - tell user the winner won the round.
        RETURN - exit function
        
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