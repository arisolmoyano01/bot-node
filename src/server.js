const express = require("express");
const { moveHandler } = require("./moveHandler");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/move", (req, res) => {
  const state = req.body;

  const movement = moveHandler(state);

  res.status(200).json(movement);
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});