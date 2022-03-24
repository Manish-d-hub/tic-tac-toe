// const { board } = require("./board");

exports.checkWin = (board) => {
  // CHECKING ROWS
  // console.log("CHECKING ROWS,COLUMNS,DIAGONALS");
  if (board[1] === board[2] && board[2] === board[3] && board[1] !== " ") {
    return true;
  } else if (
    board[4] === board[5] &&
    board[5] === board[6] &&
    board[4] !== " "
  ) {
    return true;
  } else if (
    board[7] === board[8] &&
    board[8] === board[9] &&
    board[7] !== " "
  ) {
    return true;
  }

  // CHECKING COLUMNS
  else if (board[1] === board[4] && board[4] === board[7] && board[1] !== " ") {
    return true;
  } else if (
    board[2] === board[5] &&
    board[5] === board[8] &&
    board[2] !== " "
  ) {
    return true;
  } else if (
    board[3] === board[6] &&
    board[6] === board[9] &&
    board[3] !== " "
  ) {
    return true;
  }

  // CHECKING DIAGONALS
  else if (board[3] === board[5] && board[5] === board[7] && board[3] !== " ") {
    return true;
  } else if (
    board[1] === board[5] &&
    board[5] === board[9] &&
    board[1] !== " "
  ) {
    return true;

    // Checking for draw
  } else {
    return false;
  }
};

// checking for draw
exports.checkDraw = (board) => {
  for (let i = 0; i < 9; i++) {
    // console.log("KEY", key);
    if (board[i] === " ") {
      return false;
    }
  }
  return true;
};
