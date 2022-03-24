// use modules everywhere

const { io } = require("socket.io-client"); // intializing socket.io client
const { displayBoard } = require("../utils/board");
const { getInput } = require("../utils/readInput");

// client listening on 5050
const socket = io("http://localhost:5050");

let competitor;

// SOCKET LISTENERS
socket.on("connect", () => {
  // Handling client connection
  console.log("You are connected to TIC-TAC-TOE");
  console.log("Your id is: " + socket.id);

  socket.on("Game-on", (data) => {
    console.log(data);

    if (data.includes("first")) {
      competitor = 0;
    } else {
      competitor = 1;
    }
    // Getting players input from the client side
    getInput(socket, competitor);
  });
});

// chiecking for moves
socket.on("valid-move", (board) => {
  displayBoard(board);
});

socket.on("invalid-move", (data) => {
  console.log("invalid move", data);
});

// Handling players and game
socket.on("searching", (data) => {
  console.log(data);
});

socket.on("endgame", (data) => {
  console.log(data);
  process.exit(0);
});

socket.on("tie", (data) => {
  console.log(data);
  process.exit(0);
});

socket.on("false-turn", (data) => {
  console.log(data);
});

// Handling disconnected client
socket.on("opponent-offline", () => {
  console.log("Opponent left...You Won!!");
  process.exit(0);
});
