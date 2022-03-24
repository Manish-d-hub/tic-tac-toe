// require dependencies
const app = require("express")();
const { createServer } = require("http");
const { Server } = require("socket.io");

// Importing helpers and utilities
const { board, displayBoard } = require("../utils/board");
const { checkWin, checkDraw } = require("../utils/checkResult");
const { checkMove } = require("./helpers/checkMove");
// const { handleInput } = require("./helpers/handleInput");

// creating and intializing server
const httpServer = createServer(app);
const io = new Server(httpServer);

const competitor = [];

// Making connection ready
io.on("connection", (socket) => {
  console.log(`The Player ${socket.id} is active`); // Displaying player ID
  console.log("socket is ready to be connected....");
  competitor.push(socket); // Adding players to an array
  console.log("____________________________________\n");

  // chekcing for palyers and matching
  if (competitor.length === 2) {
    console.log("This is the baord layout\n");
    displayBoard(board); // displaying board

    console.log("Players Have Joined The Game");

    io.sockets.to(competitor[0].id).emit("Game-on", "\nYou go first");
    io.sockets.to(competitor[1].id).emit("Game-on", "\nYou go second");

    // creating separate input handlers

    let assignedId = 0;
    // handleInput(competitor, 0, 0, io);

    competitor[0].on("move", (data) => {
      // console.log("this is socket data", data);
      if (
        checkMove(data.competitor, assignedId, data.move, board, competitor, io)
      ) {
        if (data.competitor == 0) {
          // console.log("this is the place on the board", data.move);
          board[data.move] = "x";
          assignedId = 1;
          // competitorIndex = 1;
        } else {
          board[data.move] = "o";
          // competitorIndex = 0;
          assignedId = 0;
        }
        displayBoard(board);
        io.sockets.emit("valid-move", board);

        // Checking for win or draw
        // let status = checkWin(board);
        if (checkWin(board)) {
          console.log("Competitor Won");
          io.sockets.emit("endgame", "competitor 1 Wins!!");
        } else if (checkDraw(board)) {
          console.log("Tie");
          io.sockets.emit("tie", "Game is tied");
        }
      }
    });

    competitor[1].on("move", (data) => {
      if (
        checkMove(data.competitor, assignedId, data.move, board, competitor, io)
      ) {
        if (data.competitor == 0) {
          board[data.move] = "x";
          assignedId = 1;
        } else {
          board[data.move] = "o";
          assignedId = 0;
        }
        displayBoard(board);
        io.sockets.emit("valid-move", board);

        // let status = checkWin(board);
        // Checking for win or draw
        if (checkWin(board)) {
          console.log("Competitor Won");
          io.sockets.emit("endgame", "competitor 2 Wins!!");
        } else if (checkDraw(board)) {
          console.log("Tie");
          io.sockets.emit("tie", "Game is tied");
        }
      }
    });

    // handleInput(competitor, 1, assignedId, io);
  } else {
    // Searching for players
    socket.emit("searching", "\nSearching for your opponent");
    console.log("Searching your opponent");
  }

  // Hanling disconnect
  socket.on("disconnect", () => {
    console.log(`Your Competitor: ${socket.id} has left the arena.`);
    // Removing player from the memory
    competitor.pop(socket.id);
    // emiting disconnected player to the client
    io.sockets.emit("opponent-offline", socket.id);
  });
});

// MAKING PORT ON 5050
httpServer.listen(5050, () => {
  console.log("server is listening at 5050");
});
