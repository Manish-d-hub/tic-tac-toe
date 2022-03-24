// Setting Board layout
const board = {
  1: " ",
  2: " ",
  3: " ",
  4: " ",
  5: " ",
  6: " ",
  7: " ",
  8: " ",
  9: " ",
};

// use array in board (in future)

// display board function
const displayBoard = (board) => {
  console.log(`\n    ${board[1]} | ${board[2]} | ${board[3]}
   ___|___|___
    ${board[4]} | ${board[5]} | ${board[6]}
   ___|___|___
    ${board[7]} | ${board[8]} | ${board[9]}
      |   |`);
};

// exporting board and displayBoard
module.exports.board = board;
module.exports.displayBoard = displayBoard;
