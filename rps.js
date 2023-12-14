document.addEventListener('DOMContentLoaded', function() {
    let playerScore = 0;
    let computerScore = 0;
    let roundsPlayed = 0;
    let roundsToWin = 3; // Best out of 5
    let gameIsOver = false;
    let isTyping = false; // Flag to track if typing animation is in progress

    const roundResultElement = document.getElementById('roundResult');
    const playerScoreElement = document.getElementById('playerScore');
    const computerScoreElement = document.getElementById('computerScore');
    const computerChoiceElement = document.getElementById('computerChoice');
    const restartButton = document.getElementById('restartButton');
    const clickSound = document.getElementById('clickSound');

    function typeOutMessage(element, message, index = 0) {
        isTyping = true;
        if (index < message.length) {
            element.textContent += message.charAt(index);
            setTimeout(function() {
                typeOutMessage(element, message, index + 1);
            }, 45);
        } else {
            isTyping = false;
        }
    }

    function playRound(playerChoice) {
        if (gameIsOver) return;
    
        if (isTyping) {
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
    
        // Change the color of the clicked button to green
        const clickedButton = document.getElementById(`${playerChoice.toLowerCase()}Button`);
        clickedButton.classList.add('green-button');
    
        updateScoreboard();
    
        // Listen for the typing animation to complete
        const typingInterval = setInterval(() => {
            if (!isTyping) {

                clickedButton.classList.remove('green-button');
                clearInterval(typingInterval);
            }
        }, 100);
    
        if (roundsPlayed >= roundsToWin) {
            setTimeout(endGame, 8000);
        }
    }
        

    function updateScoreboard() {
        playerScoreElement.textContent = `Your Score: ${playerScore}`;
        computerScoreElement.textContent = `Your Father's Score: ${computerScore}`;
    }

    function endGame() {
        if (gameIsOver) return;
    
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


    restartButton.addEventListener('click', restartGame);
});
