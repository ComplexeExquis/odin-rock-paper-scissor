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
    playerOneChoice: -1,  // player
    playerTwoChoice: -1   // can be player2 or AI
};

const score = {
    playerOne: 0,
    playerTwo:  0
};

let roundWinner = "";

const pVsPBtn = document.querySelector(".player-vs-player-btn");
const pVsAiBtn = document.querySelector(".player-vs-ai-btn");
const restartBtn = document.querySelector(".game-result-btn.restart");
const homeBtn = document.querySelector(".game-result-btn.home");


function changeGamePageToPVsAi() { 
    const playerTitle = 
        document.querySelectorAll(".player-title");

    playerTitle[0].textContent = "Player";
    playerTitle[1].textContent = "AI";

    document.querySelector("#player-pick").textContent = "Player picking";
}

function changeGamePageToPVP() {
    
    const playerTitle = 
        document.querySelectorAll(".player-title");
    
    playerTitle[0].textContent = "Player 1";
    playerTitle[1].textContent = "Player 2";

    document.querySelector("#player-pick").textContent = "Player 1 picking";
}

function moveToGamePage() {
    screenState = "gamePage";
    let page = document.querySelector(".start-page");
    page.style.display = "none";
    page = document.querySelector(".game-page");
    page.style.display = "flex";

    if (gameModes === "pvai") 
        changeGamePageToPVsAi();
    else 
        changeGamePageToPVP();
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
    else if(turn === "player2" && gameModes === "pvp") {
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

function resetScore() {
    score.playerOne = 0;
    score.playerTwo = 0;

    const playerScore = document.querySelectorAll(".player-score");
    playerScore[0].textContent = 0;
    playerScore[1].textContent = 0;
    

    choices.playerOneChoice = -1;
    choices.playerTwoChoice = -1;
}

function closeGameResult() {
    // close pop up game result and show the player pick again
    document.querySelector("#game-result-pop-up").style.display = "none";
    document.querySelector("#player-pick").style.display = "flex";
}

function restartBtnHandler() {
    resetScore();
    closeGameResult();

    if (gameModes === "pvp") {
        pvpGame("Player 1", "Player 2");    
    }
    else {
        pvaiGame("Player", "AI");
    }
}

function HomeBtnHandler() {
    screenState = "homePage";
    gameModes = "";
    resetScore();

    closeGameResult();

    let page = document.querySelector(".start-page");
    page.style.display = "flex";
    page = document.querySelector(".game-page");
    page.style.display = "none";
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
    

    if (gameModes === "pvp") {
        if (roundWinner === "Player 1 wins") {
            playerScore[0].textContent = score.playerOne;
        }
        else if (roundWinner === "Player 2 wins") {
            playerScore[1].textContent = score.playerTwo;
        }    
    }
    else {
        if (roundWinner === "Player wins") {
            playerScore[0].textContent = score.playerOne;
        }
        else if (roundWinner === "AI wins") {
            playerScore[1].textContent = score.playerTwo;
        }
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
        roundWinner = `${player2} wins`;
    }      
    else if (choices.playerOneChoice == choices.playerTwoChoice) {
        roundWinner = "Draw"
    }
    else {
        score.playerOne++;
        roundWinner = `${player1} wins`;
    }
    
    showPopUpResult();

    choices.playerOneChoice = -1;
    choices.playerTwoChoice = -1; 
}

function disableRpsBtns() {
    document.querySelectorAll(".btn.rps").forEach((button) => {
        button.disabled = true;
    });
}

async function showGameResult() {
    await new Promise(r => setTimeout(r, 3500));

    // disable button
    disableRpsBtns();

    document.querySelector("#player-pick").style.display = "none";
    document.querySelector("#game-result-pop-up").style.display = "flex";
    
    document.querySelector("#game-result-text").textContent = `${roundWinner}`;
    
    
}

function enableRpsBtns() {
    document.querySelectorAll(".btn.rps").forEach((button) => {
        button.disabled = false;
    });
}

function pvpGame(player1, player2) {
    turn = "player1";
    // enable button
    enableRpsBtns();
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

function getAiChoice() {
    let computerChoice = Math.random();

    turn = "player1";

    if(computerChoice  <= 0.3) return 0;
    else if (computerChoice >= 0.31 && 
             computerChoice <= 0.6) return 1;
    else return 2;
}

function pvaiGame(player1, player2) {
    turn = "player1";
    enableRpsBtns();

    changeMiddlePartUI("Player");
    
    const rounds = setInterval(() => {
        if (score.playerOne === 5 || 
            score.playerTwo === 5) {
            showGameResult();
            clearInterval(rounds);
        }
        else if (choices.playerOneChoice !== -1) {
            // player 1 finish choosing their choose, 
            // change ui to ai picking
            changeMiddlePartUI("AI");

            choices.playerTwoChoice = getAiChoice();
            
            evaluateRound(player1, player2);

            // round finished, reverting the ui back
            changeMiddlePartUI("Player");
        }
        
    }, 200);

}

function startGame() {

    if (gameModes === "pvai") {
        pvaiGame("Player", "AI");
    }    
    else {
        pvpGame("Player 1", "Player 2");
    }
    
}

pVsPBtn.addEventListener("click", () => {
    gameModes = "pvp";

    moveToGamePage();
    startGame();
});

pVsAiBtn.addEventListener("click", () => {
    gameModes = "pvai";
    
    moveToGamePage();
    startGame();
});

initiateGamePage();

restartBtn.addEventListener("click", restartBtnHandler);

homeBtn.addEventListener("click", HomeBtnHandler);