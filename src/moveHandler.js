const { chooseMove } = require("./strategy");

function moveHandler(state) {
  const movement = chooseMove(state);
  return movement;
}

module.exports = { moveHandler };