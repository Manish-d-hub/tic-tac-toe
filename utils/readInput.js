// requireing readcommand package
const readcommand = require("readcommand");

// Getting input by readcommand package
exports.getInput = (socket, competitor) => {
  let sigints = 0;
  readcommand.loop((err, args, str, next) => {
    if (err && err.code !== "SIGINT") {
      throw err;
    } else if (err) {
      if (sigints === 1) {
        process.exit(0);
      } else {
        sigints++;
        console.log("Press ^C again to exit.");
        return next();
      }
    } else if (args[0] === "r") {
      process.exit(0);
    } else {
      sigints = 0;
    }

    // emiting move to the server by clinet side
    socket.emit("move", {
      competitor,
      move: args[0],
    });
    return next();
  });
};
