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

function estaOcupada(destino, piezas, piezaActual) {
  return piezas.some(
    pieza =>
      pieza.id !== piezaActual.id &&
      pieza.fila === destino.fila &&
      pieza.columna === destino.columna
  );
}

function calcularDistancia(posicion, casa) {
  const diferenciaFila = Math.abs(posicion.fila - casa.fila);
  const diferenciaColumna = Math.abs(posicion.columna - casa.columna);

  const distanciaFila = Math.min(
    diferenciaFila,
    10 - diferenciaFila
  );

  const distanciaColumna = Math.min(
    diferenciaColumna,
    10 - diferenciaColumna
  );

  return distanciaFila + distanciaColumna;
}

function chooseMove(state) {
  const pieza = state.piezas.find(
    p => p.jugador === state.jugadorActivo
  );

  const direcciones = ["N", "S", "E", "O"];

  // Primero intenta conquistar una casa
  for (const direccion of direcciones) {
    const destino = calcularDestino(
      pieza.fila,
      pieza.columna,
      direccion,
      state.dado
    );

    const ocupada = estaOcupada(
      destino,
      state.piezas,
      pieza
    );

    if (ocupada) {
      continue;
    }

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

  // Si no puede conquistar, busca acercarse a una casa
  let mejorDireccion = null;
  let mejorDistancia = Infinity;

  for (const direccion of direcciones) {
    const destino = calcularDestino(
      pieza.fila,
      pieza.columna,
      direccion,
      state.dado
    );

    const ocupada = estaOcupada(
      destino,
      state.piezas,
      pieza
    );

    if (ocupada) {
      continue;
    }

    for (const casa of state.casas) {
      const distancia = calcularDistancia(destino, casa);

      if (distancia < mejorDistancia) {
        mejorDistancia = distancia;
        mejorDireccion = direccion;
      }
    }
  }

  if (mejorDireccion !== null) {
    return {
      pieceId: pieza.id,
      direction: mejorDireccion
    };
  }

  throw new Error("No hay movimientos válidos");
}

module.exports = { chooseMove };