const express = require("express");
const { moveHandler } = require("./moveHandler");

const app = express();

// Middleware de logs
app.use((req, res, next) => {
  const inicio = Date.now();

  res.on("finish", () => {
    const tiempo = Date.now() - inicio;

    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${tiempo}ms`
    );
  });

  next();
});

// Permite recibir cuerpos JSON
app.use(express.json());

const PORT = process.env.PORT || 3000;

// GET /health
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

// POST /move
app.post("/move", (req, res, next) => {
  try {
    const state = req.body;

    const movement = moveHandler(state);

    res.status(200).json(movement);
  } catch (error) {
    next(error);
  }
});

// Ruta inexistente
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

// Middleware centralizado de errores
app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "JSON inválido"
    });
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    error:
      statusCode === 500
        ? "Error interno del servidor"
        : error.message
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});