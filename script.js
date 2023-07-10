function getComputerChoice() {
    /*
    - random floating point number between 0 to 1 not including 1
    - return char
      0 = rock, less than or equal 0.3
      1 = paper, more than 0.30 to 0.60 included
      2 = scissor, more tham 0.60 up to 0.99 included
    */ 

    let computerChoice = Math.random();

    if(computerChoice  <= 0.3) return 0;
    else if (computerChoice >= 0.31 && 
             computerChoice <= 0.6) return 1;
    else return 2;
}

function getPlayerChoice(params) {
    /* 
    - prompt for input
    - proccess the first letter, lowercase
    - turn player choice to int
      0 = rock
      1 = paper
      2 = scissor
    */
    
    let playerChoice = prompt("enter your choice [rock|paper|scissor]");
    switch (playerChoice[0].toLowerCase()) {
        // rock
        case 'r':
            return 0;
        // paper
        case 'p': 
            return 1;    
        // scissor
        default:
            return 2;
    }
}


function playRound(computerChoice, playerChoice) {
    /* 
    - run the algorithm
    - return -1 if computer won
      return 0 if draw
      return 1 if player won
    */
    console.log(`computer choice: ${computerChoice}`);
    console.log(`player choice:   ${playerChoice}`);

    let result;

    if ( (playerChoice + 1) % 3 == computerChoice ) {
        result = -1; 
        console.log("computer won");
    }      
    else if (playerChoice == computerChoice) {
        result = 0;
        console.log("draw");
    }
    else {
        result = 1;
        console.log("player won");
    }
        
    return result;
}


function game() {
    let playerScore = 0;
    let computerScore = 0;


    alert("welcome to rock paper scissor againts a computer");
    alert("the first to achieve five scores wins")

    while (playerScore != 5 && computerScore != 5) {
        console.log(`player score: ${playerScore}  computer score: ${computerScore}`);
        let result = playRound( getComputerChoice(), getPlayerChoice() );

        switch (result) {
            case -1:
                computerScore++;
                break;
            case 1:
                playerScore++;
                break;
            default:
                break;
        }

    }
    
}



/*
All possible states: 
[1] startPage
[2] gamePage
*/ 
let screenState = "startPage";

/*
All possible gamemodes:
[1] pvp (player vs player)
[2] pvai (player vs ai)
*/
let gameModes = "";

// either player1 or player2 turn
let turn = "player1";
// can be rock, paper, or scissor
let choice = "";

const choices = {
    /*
    0 = rock
    1 = paper
    2 = scissor
    */
    playerOneChoice: -1, // player
    playerTwoChoice: -1   // can be player2 or AI
};

const score = {
    playerOne: 0,
    playerTwo:  0
};

let roundWinner = "";

const pVsPBtn = document.querySelector(".player-vs-player-btn");
const pVsAiBtn = document.querySelector(".player-vs-ai-btn");


function changeGamePageToPVsAi() { 
    const playerTitle = 
        document.querySelectorAll(".player-title");

    playerTitle[0].textContent = "Player";
    playerTitle[1].textContent = "AI";

    document.querySelector("#player-pick").textContent = "Player picking";
}

function moveToGamePage() {
    screenState = "gamePage";
    let page = document.querySelector(".start-page");
    page.style.display = "none";
    page = document.querySelector(".game-page");
    page.style.display = "flex";

    if (gameModes === "pvai") 
        changeGamePageToPVsAi();
}

function changeMiddlePartUI(player) {
    document.querySelector("#player-pick").textContent = `${player} is picking`;
}

function rpsBtnHandler() {
    if (turn === "player1") {
        switch(choice) {
            case "rock":
                choices.playerOneChoice = 0;
                break;
            case "paper":
                choices.playerOneChoice = 1;
                break;
            case "scissor":
                choices.playerOneChoice = 2;
                break;
        }
        
        turn = "player2";
    }
    else {
        switch(choice) {
            case "rock":
                choices.playerTwoChoice = 0;
                break;
            case "paper":
                choices.playerTwoChoice = 1;
                break;
            case "scissor":
                choices.playerTwoChoice = 2;
                break;
        }
        
        turn = "player1";
        
    }
}

function initiateGamePage() {
    const rockBtn = document.querySelector(".btn.rock");
    const paperBtn = document.querySelector(".btn.paper");
    const scissorBtn = document.querySelector(".btn.scissor");

    rockBtn.addEventListener("click", () => {
        choice = "rock"
        rpsBtnHandler();
    });
    paperBtn.addEventListener("click", () => {
        choice = "paper"
        rpsBtnHandler();
    });
    scissorBtn.addEventListener("click", () => {
        choice = "scissor"
        rpsBtnHandler();
    });
}

function updateScore() {
    const playerScore = document.querySelectorAll(".player-score");
    if (roundWinner === "Player 1 wins") {
        playerScore[0].textContent = score.playerOne;
    }
    else if (roundWinner === "Player 2 wins") {
        playerScore[1].textContent = score.playerTwo;
    }
}

async function showPopUpResult() {
    const playerPick = document.querySelector("#player-pick");
    playerPick.style.display = "none";

    /*
    - change img to corresponding icons 
    - make round result visible 
    - wait 2 second  
    - show pop up result 
    - update score  
    - wait 2 second  
    - hide pop up result and round result 
    - make player-pick visible again 
    */

    const iconsArr = ["rock.png", "paper.png", "scissor.png"];

    const icons = document.querySelectorAll(".choice-icon");
    icons[0].src = `./assets/icons/${iconsArr[choices.playerOneChoice]}`;
    icons[1].src = `./assets/icons/${iconsArr[choices.playerTwoChoice]}`;
    
    const roundResult = document.querySelector("#round-result");
    roundResult.style.display = "flex";

    await new Promise(r => setTimeout(r, 1500));

    const popUpResult = document.querySelector("#pop-up-result");
    popUpResult.firstElementChild.textContent = `${roundWinner}`;
    popUpResult.style.display = "block";
    updateScore();

    await new Promise(r => setTimeout(r, 2000));

    roundResult.style.display = "none";
    popUpResult.style.display = "none";

    playerPick.style.display = "block";
}

function evaluateRound(player1, player2) {
    if ( (choices.playerOneChoice + 1) % 3 == choices.playerTwoChoice ) {
        score.playerTwo++;
        roundWinner = "Player 2 wins";
    }      
    else if (choices.playerOneChoice == choices.playerTwoChoice) {
        roundWinner = "Draw"
    }
    else {
        score.playerOne++;
        roundWinner = "Player 1 wins";
    }
    
    showPopUpResult();

    choices.playerOneChoice = -1;
    choices.playerTwoChoice = -1; 
}

async function showGameResult() {
    await new Promise(r => setTimeout(r, 3800));

    
    // instead of alert
    alert("game ended");
    // pop up at the end, who won.
    // restart and go to start-page btns

    
    

    // don't forget to change gamemode to empty string
    // and screenState back to startPage at the end
}

function pvpGame(player1, player2) {
    /* 
    check every 200 milisecond:
    1. if someone has got a score of 5, game ends
    2. detects if both players have selected their option
    3. detects if player one already choose
    */
    changeMiddlePartUI("Player 1");
    
    const rounds = setInterval(() => {
        if (score.playerOne === 5 || 
            score.playerTwo === 5) {
            showGameResult();
            clearInterval(rounds);
        }
        else if (choices.playerOneChoice !== -1 && 
                 choices.playerTwoChoice !== -1) {
            evaluateRound(player1, player2);

            // round finished, reverting the ui back
            changeMiddlePartUI("Player 1");
        }
        else if (choices.playerOneChoice !== -1) {
            // player 1 finish choosing their choose, 
            // change ui to player 2
            changeMiddlePartUI("Player 2");
        }
        
    }, 200);
}


function startGame() {
    /* 
    TODO, implement
    - start round
    - player one pick
    - player two pick
    - evaluate round result, 
    - check if one of the player score has reached to 5, then than player won, stop game
    */ 

    // player vs ai gamemode
    if (gameModes === "pvai") {
        /*
        player turn
        ai turn
        showPopUpResult();
        until one have five score
        
        then 
        showGameResult();
        */
    }    
    else {
        pvpGame("Player 1", "Player 2");
    }
    
}

pVsPBtn.addEventListener("click", () => {
    gameModes = "pvp";

    moveToGamePage();
    initiateGamePage();
    startGame();
});

pVsAiBtn.addEventListener("click", () => {
    gameModes = "pvai";
    
    moveToGamePage();
    initiateGamePage();
    startGame();
});
