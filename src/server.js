const express = require("express");
const { moveHandler } = require("./moveHandler");

const app = express();

app.use(express.json());
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

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

app.post("/move", (req, res) => {
  try {
    const state = req.body;

    const movement = moveHandler(state);

    res.status(200).json(movement);
  } catch (error) {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      error: error.message
    });
  }
});
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});