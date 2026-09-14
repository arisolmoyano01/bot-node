# Registro de práctica - Node.js y npm
## Inicialización del proyecto

Se creó el proyecto Node.js utilizando:

npm init -y
## Dependencias

Se instaló Axios como dependencia del proyecto y Nodemon como dependencia de desarrollo.

Axios quedó registrado dentro de dependencies y Nodemon dentro de devDependencies.
## Scripts

Se configuraron los scripts dev, test y start.

- start ejecuta el archivo principal index.js.
- test ejecuta el archivo test.js.
- dev utiliza Nodemon para ejecutar el proyecto y reiniciarlo automáticamente cuando se guarda un cambio.
## Comparación entre npm install y npm ci

Para realizar la comparación se eliminó la carpeta node_modules.

Primero se ejecutó:

npm install

El comando volvió a instalar las dependencias y reconstruyó la carpeta node_modules.

Después se volvió a eliminar node_modules y se ejecutó:

npm ci

El comando también reconstruyó node_modules utilizando las versiones registradas en package-lock.json.
## Conclusión

npm install es más flexible y se utiliza habitualmente durante el desarrollo.

npm ci realiza una instalación limpia basada en package-lock.json, por lo que es útil cuando se necesita reproducir la misma instalación, por ejemplo en integración continua o despliegues.


## Estrategia inicial del bot

La estrategia del bot analiza el estado recibido por el endpoint POST /move.

Actualmente realiza los siguientes pasos:

1. Identifica las fichas correspondientes al jugador activo.
2. Utiliza el valor del dado para calcular la posición final posible de cada ficha.
3. Considera las cuatro direcciones: norte, sur, este y oeste.
4. Tiene en cuenta que el tablero es toroidal.
5. Descarta los movimientos cuya posición final se encuentre ocupada por otra ficha.
6. Prioriza movimientos que permiten conquistar una casa neutral inmediatamente.
7. Si ninguna ficha puede conquistar una casa, selecciona el movimiento válido que deje una ficha a menor distancia de alguna casa neutral.
8. Si existen varias fichas, analiza las posibilidades de todas antes de elegir el movimiento.

### Limitación actual

El contrato actual del endpoint /move devuelve un único objeto con pieceId y direction.

Las reglas del juego indican que todas las fichas de un jugador deben moverse durante su turno. Para implementar completamente esta regla será necesario conocer cómo el motor solicitará o recibirá los movimientos de múltiples fichas.