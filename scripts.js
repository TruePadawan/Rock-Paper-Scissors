function generateNum(minimum, maximum)
{
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function computerPlay()
{
    const val = generateNum(0,2);
    const table = {
        0: "ROCK",
        1: "PAPER",
        2: "SCISSORS"
    };
    return table[val];
}

function playRound(playerSelection, computerSelection)
{
    let winTable = {
        "ROCK" : "SCISSORS",
        "SCISSORS" : "PAPER",
        "PAPER" : "ROCK"
    };

    if (playerSelection === computerSelection)
    {
        return -1;
    }
    else if (computerSelection == winTable[playerSelection])
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

let player = document.querySelector(".player > .score");
let computer = document.querySelector(".pc > .score");
let resultUIText = document.querySelector(".result");
let replayButton = document.querySelector("button");

function game(e) {
  let player_choice = e.target.dataset.key;
  let computer_choice = computerPlay();
  let result = playRound(player_choice, computer_choice);

  if (result === 1) {
    updatePlayerScore();
    resultUIText.textContent = `${player_choice} BEATS ${computer_choice}`;
  } else if (result === 0) {
    updateComputerScore();
    resultUIText.textContent = `${player_choice} LOSES TO ${computer_choice}`;
  } else {
    resultUIText.textContent = `${player_choice} CANCELS OUT ${computer_choice}`;
  }
}


function updatePlayerScore()
{
    
    let currentScore = Number(player.textContent);
    player.textContent = ++currentScore;
}

function updateComputerScore()
{
    
    let currentScore = Number(computer.textContent);
    computer.textContent = ++currentScore;
}

const options = document.querySelectorAll("img");
options.forEach((option) => {
    option.addEventListener('click', (e) => {
        if (Number(player.textContent) < 5 && Number(computer.textContent) < 5)
        {
            game(e);
            playerScore = Number(player.textContent);
            computerScore = Number(computer.textContent);

            if (playerScore == 5 || computerScore == 5)
            {
                if (playerScore == computerScore) resultUIText.textContent = "A Tie!";
                if (playerScore > computerScore) resultUIText.textContent = "You Win!";
                if (playerScore < computerScore) resultUIText.textContent = "You Lose!";
                replayButton.disabled = false;
            }
        }
    });
});

replayButton.addEventListener('click', () => {
    resetUI();
});

function resetUI()
{
    player.textContent = "0";
    computer.textContent = "0";
    resultUIText.textContent = "Waiting for Result...";
    replayButton.disabled = true;
}