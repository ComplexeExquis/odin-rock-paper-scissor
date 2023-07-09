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

game();
