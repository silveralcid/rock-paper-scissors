document.addEventListener('DOMContentLoaded', function() {
    let playerScore = 0;
    let computerScore = 0;
    let roundsPlayed = 0;
    let roundsToWin = 3; // Best out of 5 (change this if needed)
    let gameIsOver = false;
    let isTyping = false; // Flag to track if typing animation is in progress

    const roundResultElement = document.getElementById('roundResult');
    const playerScoreElement = document.getElementById('playerScore');
    const computerScoreElement = document.getElementById('computerScore');
    const computerChoiceElement = document.getElementById('computerChoice');
    const restartButton = document.getElementById('restartButton');

    function typeOutMessage(element, message, index = 0) {
        isTyping = true;
        if (index < message.length) {
            element.textContent += message.charAt(index);
            setTimeout(function() {
                typeOutMessage(element, message, index + 1);
            }, 45); // Adjust the typing speed (50 milliseconds per character)
        } else {
            isTyping = false;
        }
    }

    function playRound(playerChoice) {
        if (gameIsOver) return;

        if (isTyping) {
            // If typing animation is in progress, do not proceed
            return;
        }

        const choices = ['Rock', 'Paper', 'Scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        roundResultElement.textContent = '';
        let roundResult = '';

        if (playerChoice === computerChoice) {
            roundResult = `Your Father chose... ${computerChoice}. It's a tie. Not quite good enough as usual...`;
        } else if (
            (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
            (playerChoice === 'Scissors' && computerChoice === 'Paper') ||
            (playerChoice === 'Paper' && computerChoice === 'Rock')
        ) {
            roundResult = `Your Father chose... ${computerChoice}. Somehow you managed to win this round.`;
            playerScore++;
        } else {
            roundResult = `Your Father chose ${computerChoice}. You lose this round and your self-confidence.`;
            computerScore++;
        }

        roundsPlayed++;
        roundResultElement.textContent = ''; // Clear the previous message
        typeOutMessage(roundResultElement, roundResult);

        updateScoreboard();

        if (roundsPlayed >= roundsToWin) {
            // Add a delay before showing the final game result
            setTimeout(endGame, 8000); // Adjust the delay as needed (4 seconds in this example)
        } else {
            // Change the color of the clicked button to green
            const clickedButton = document.getElementById(`${playerChoice.toLowerCase()}Button`);
            clickedButton.classList.add('green-button');

            // Reset the button color after a delay (e.g., 1 second)
            setTimeout(() => {
                clickedButton.classList.remove('green-button');
            }, 1000);
        }
    }

    function updateScoreboard() {
        playerScoreElement.textContent = `Your Score: ${playerScore}`;
        computerScoreElement.textContent = `Your Father's Score: ${computerScore}`;
    }

    function endGame() {
        gameIsOver = true;
        let gameResult = '';

        if (playerScore > computerScore) {
            gameResult = 'You win. Your father will not leave for milk quite yet.';
        } else if (playerScore < computerScore) {
            gameResult = 'You lose and you are now a disappointment to your family.';
        } else {
            gameResult = 'The game ends in a tie. Your Father leaves for milk and cigarettes.';
        }

        roundResultElement.textContent = ''; // Clear the previous message
        typeOutMessage(roundResultElement, gameResult);
        restartButton.style.display = 'block'; // Show the restart button
    }

    function restartGame() {
        playerScore = 0;
        computerScore = 0;
        roundsPlayed = 0;
        gameIsOver = false;

        updateScoreboard();
        roundResultElement.textContent = '';
        computerChoiceElement.textContent = ''; // Clear the computer's choice

        // Hide the restart button
        restartButton.style.display = 'none';

        // Enable the choice buttons
        enableChoiceButtons();
    }

    function enableChoiceButtons() {
        const choiceButtons = document.querySelectorAll('button[id$="Button"]');
        choiceButtons.forEach(button => button.disabled = false);
    }

    // Add event listeners to the choice buttons
    document.getElementById('rockButton').addEventListener('click', function() {
        playRound('Rock');
    });

    document.getElementById('paperButton').addEventListener('click', function() {
        playRound('Paper');
    });

    document.getElementById('scissorsButton').addEventListener('click', function() {
        playRound('Scissors');
    });

    // Add event listener to the restart button
    restartButton.addEventListener('click', restartGame);
});
