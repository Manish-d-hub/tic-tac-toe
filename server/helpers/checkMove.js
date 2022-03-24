// Checking after player has made its move
exports.checkMove = (
  competitorId,
  asndId,
  move,
  board,
  competitor,
  ...args
) => {
  if (competitorId === asndId && move <= 9 && board[move] === " ") {
    return true;
  } else if (competitorId !== asndId) {
    // Emit messsage to desired clinet
    args[0].sockets
      .to(competitor[competitorId].id)
      .emit("false-turn", "it's not your turn");
  } else if (board[move] !== undefined) {
    // Emit messsage to desired client
    args[0].sockets
      .to(competitor[competitorId].id)
      .emit("invalid-move:", "Place is already occupied.");
  }
  return false;
};
