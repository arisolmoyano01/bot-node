const { chooseMove } = require("./strategy");

function moveHandler(state) {
  if (!state || typeof state !== "object") {
    throw new Error("Estado inválido");
  }

  if (
    state.turno === undefined ||
    state.jugadorActivo === undefined ||
    state.tablero === undefined
  ) {
    throw new Error("Faltan datos del estado");
  }

  const movement = chooseMove(state);

  return movement;
}

module.exports = { moveHandler };