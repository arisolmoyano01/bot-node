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