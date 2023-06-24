/*----- constants -----*/
const COLORS = { //they say colour but I want to assign these to X and O and then chand the cell.innerText to player
  '0': 'white',
  '1': 'X', //#e5bdb5
  '-1': 'O', //#8a879a
}
const combinations = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
//not sure if this should be c0r0 c1r0 ... etc. But whatever works

//OK I changed my plan now. 
// I gave every square an id of 0 to 8, instead of the c0r0 thingy. 
// I will try to assign every swuare by using getattribute. and push them into an empty array.
// And continuesly check if the winning options indexes, when applied to the new array equal to each other
//like board[cell0 cell1 cell2 cell3....] etc
// board[cell.getAttribute()] = turn;


/*----- state variables -----*/

let board; //an array of 3 column arrays
let turn; // 1 or -1 for player turns
let winner; // null = there is no winner, 1 is for player pink, -1 is player gray, 'T' is tie

//I'm thinking, maybe we can append aplayers moves into an array and check the winner by checkng if these arrays are included in the winning combinateions
//let xMoves = [];
//let oMoves = [];

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

//Store the 9 elements that represent the squares on the page
const cells = document.querySelectorAll('#board > div');
//we can add an event listener to each cell so that we can mark an x or o based on who's turn it is

/*----- event listeners -----*/

playAgainBtn.addEventListener('click', init);
//addEventListener cannot be chained according to google
const cell = document.getElementById('board')
cell.addEventListener('click', handleClick);

/*----- functions -----*/
// Andrew, shane and I have been working on the code, they used the connect4's id method.
// I tried to do that, but it was a little bit complicate.
// we can get the element id c0r0 and use slice to get the column id colIdx = event.target.id(column part) and get rowIDX = event.target.id(row part) and change board[colIdx][rowIdx] = turn

init();
// initialize all state, then call render()
function init() {
  board = ['','','','','','','','',''];
  turn = 1;
  winner = null;
  render();
}
// this function shoul get the id=sq... attribute from the cell that is clicked.
// find the index of clicked cell based on id..
// then assign the board index corresponding to this cell to playerturn X or O
// then switch the turn by turn *= -1
// and call the checkWinner function
// then render?
function handleClick (event) {
  const id = event.target.id; //this will return the id0 to 8, we have to get rid of the id part
  // get the index of the clicked cell into number form
  const index = +id.slice(id.length-1, id.length);
  //console.log(index)
  
  //we should add a checkpoint to check if the clicke square is already clicked. if so, nothing should change.
  if (board[index]) return; 
  
  //if turn is 1 it is X's turn , assign X
  //and I should set innerText of the corresponding div to board[index]
  if (turn === 1) {
    board[index] = 'X';
    // document.getElementById(id).innerText = board[index]; renderBoard function will do this part
    //xMoves.append(board[index])
  }
  // else if turn is -1, it is O's turn , assign O
  else {
    board[index] = 'O';
    //document.getElementById(id).innerText = board[index];
    //oMoves.append(board[index])
  }
  //call check for the win. 
  //Had to move this function before flip the turn function, otherwise I would have to add *-1 to my winner = turn
  checkWinner();
  //flip the turn
  turn *= -1

  // render the board and message
  render();
}

//Now the board indexes changed according to player clicks
//I should check if combinations[i]'s 0-1-2 indexes are (which is 0, 1 and 2) for combinations[0] on the newly structured board are equal to each other

function checkWinner() {
  for (let i = 0; i < combinations.length; i++) {
    const a = combinations[i][0];
    const b = combinations[i][1];
    const c = combinations[i][2];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      //winner should set to the turn (1 or -1), not x or O
      winner = turn;
      //console.log(winner)
    }
    // if there is no winner and if every cell is already filled with something, it should return a 'T'
    if (!winner && board.every(cell => cell)) { // lol if cell is cell :p
      winner = 'T';
    }
    if (winner){
      renderMessage();
    }
  }
}

//if I used the xMoves andoMoves, I could check if  


function render() {
  renderBoard();
  renderMessage();
  playAgainBtn.disabled = !winner;
}
//ok this part shold not be like the part in connect 4.


function renderBoard(){
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = board[i];
  }
}
function renderMessage() {
  if (winner === 'T') {
    messageEl.innerText = 'Try again, its a tie!!';
  } else if (winner === 1) {
    messageEl.innerText = 'X Wins!';
  } else if (winner === -1) {
    messageEl.innerText = 'O Wins!';
  } else {
    messageEl.innerText = `${COLORS[turn]}'s Turn`;
  }
}
