const { chooseMove } = require("./strategy");

function moveHandler(state) {
  if (!state || typeof state !== "object") {
    const error = new Error("Estado inválido");
error.statusCode = 400;
throw error;
  }

  if (
    state.turno === undefined ||
    state.jugadorActivo === undefined ||
    state.tablero === undefined
  ) {
    const error = new Error("Faltan datos del estado");
error.statusCode = 400;
throw error;
  }

  const movement = chooseMove(state);

  return movement;
}

module.exports = { moveHandler };