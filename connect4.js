/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const width = 7;
const height = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// TODO: set "board" to empty HEIGHT x WIDTH matrix array

// Here we make the board Array matrix. The row array is created and set as empty arrays.
// Null is then pushed onto the row arrays WIDTH number of times. 
// [0,0] is the top left of the board and [(HEIGHT-1),{WIDTH-1}] would correspond to the bottom right of the board.
function makeBoard(){
  for(let x=0; x<height; x++){
    let emptyArray = [];
    for(let y = 0; y < width; y++){
      emptyArray.push(null);
    }
    board.push(emptyArray);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  // The game board is a table in html and called by JS by creating the htmlBoard variable.
  // The top variable is declared and corresponds to the top row where players
  // are able to select the column to place their piece. The top row also has an event listener
  // that is activated by a click.
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  // The top row is set to have WIDTH number of data elements(td).
  // Each td will have an 'id' of 0 through WIDTH-1.
  for (let x = 0; x < width; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  // This top row is then appended to the htmlBoard table.
  htmlBoard.append(top);

  // TODO: add comment for this code   Make main part of board
  // This section creates the rest of the game board by creating
  // 6 other table rows each with 7 td cells to create columns.
  // Each cell is then given an id of row number-cell number [y,x].
  // The rows are then appended to the htmlBoard table.
  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  
// TODO: write the real version of this, rather than always returning 0
// Given x or the column, we check starting from the bottom(HEIGHT-1) for the top empty y.
for(let y = height-1; y>=0; y--){
    if(!board[y][x]) {
      return y;
    }
  } return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const playingPiece = document.createElement('div');
  playingPiece.classList.add('piece');
  playingPiece.classList.add(`p${currPlayer}`);
  
  const playedSpot = document.getElementById(`${y}-${x}`);
  playedSpot.append(playingPiece);
}

/** endGame: announce game end */
function endGame(message) {
  // TODO: pop up alert message
  setTimeout(function() { alert(message); }, 1000);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Congratulations! Player ${currPlayer} won!`);
  }
 
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(row => row.every(cell => cell))) {
    return endGame("It's a tie!");
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 :1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
// Here we loop over the cells to see if 4 consecutive horizontal cells, vertical cells, or left/right diagonal cells are occupied.
// The win function is checked and returns true if any of the above were true.
// If both above functions returned true then the checkforWin function calls for the endgame function
// which would return the corresponding message alerting a win or a tie. 

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

