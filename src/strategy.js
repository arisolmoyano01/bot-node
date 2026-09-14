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
  const piezasPropias = state.piezas.filter(
    pieza => pieza.jugador === state.jugadorActivo
  );

  const direcciones = ["N", "S", "E", "O"];

  // Prioridad 1:
  // buscar si alguna ficha puede conquistar una casa ahora
  for (const pieza of piezasPropias) {
    for (const direccion of direcciones) {
      const destino = calcularDestino(
        pieza.fila,
        pieza.columna,
        direccion,
        state.dado
      );

      if (estaOcupada(destino, state.piezas, pieza)) {
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
  }

  // Prioridad 2:
  // buscar qué ficha y dirección quedan más cerca de una casa
  let mejorMovimiento = null;
  let mejorDistancia = Infinity;

  for (const pieza of piezasPropias) {
    for (const direccion of direcciones) {
      const destino = calcularDestino(
        pieza.fila,
        pieza.columna,
        direccion,
        state.dado
      );

      if (estaOcupada(destino, state.piezas, pieza)) {
        continue;
      }

      for (const casa of state.casas) {
        const distancia = calcularDistancia(destino, casa);

        if (distancia < mejorDistancia) {
          mejorDistancia = distancia;

          mejorMovimiento = {
            pieceId: pieza.id,
            direction: direccion
          };
        }
      }
    }
  }

  if (mejorMovimiento !== null) {
    return mejorMovimiento;
  }

  throw new Error("No hay movimientos válidos");
}

module.exports = { chooseMove };