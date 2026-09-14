function calcularDestino(fila, columna, direccion, pasos) {
  let nuevaFila = fila;
  let nuevaColumna = columna;

  if (direccion === "N") {
    nuevaFila = (fila - pasos + 10) % 10;
  }

  if (direccion === "S") {
    nuevaFila = (fila + pasos) % 10;
  }

  if (direccion === "E") {
    nuevaColumna = (columna + pasos) % 10;
  }

  if (direccion === "O") {
    nuevaColumna = (columna - pasos + 10) % 10;
  }

  return {
    fila: nuevaFila,
    columna: nuevaColumna
  };
}

function chooseMove(state) {
  const pieza = state.piezas.find(
    p => p.jugador === state.jugadorActivo
  );

  const direcciones = ["N", "S", "E", "O"];

  for (const direccion of direcciones) {
    const destino = calcularDestino(
      pieza.fila,
      pieza.columna,
      direccion,
      state.dado
    );

    const hayCasa = state.casas.some(
      casa =>
        casa.fila === destino.fila &&
        casa.columna === destino.columna
    );

    if (hayCasa) {
      return {
        pieceId: pieza.id,
        direction: direccion
      };
    }
  }

  return {
    pieceId: pieza.id,
    direction: "N"
  };
}

module.exports = { chooseMove };