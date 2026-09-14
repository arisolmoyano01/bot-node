# Pruebas HTTP - Entrega técnica 5

## 200 - Health

Método: GET  
Ruta: /health

Comando:

Invoke-RestMethod -Uri http://localhost:3000/health -Method Get

Resultado esperado:

200 OK

{
  "status": "ok"
}

---

## 200 - Move válido

Método: POST  
Ruta: /move

Primero cargar el fixture:

$body = Get-Content -Raw -Path ".\src\fixtures\state.json"

Luego ejecutar:

Invoke-RestMethod -Uri http://localhost:3000/move -Method Post -ContentType "application/json" -Body $body

Resultado esperado:

200 OK

{
  "pieceId": "A1",
  "direction": "N"
}

---

## 400 - JSON inválido

Método: POST  
Ruta: /move

Comando:

Invoke-RestMethod -Uri http://localhost:3000/move -Method Post -ContentType "application/json" -Body '{"turno":'

Resultado esperado:

400 Bad Request

{
  "error": "JSON inválido"
}

---

## 404 - Ruta inexistente

Método: GET  
Ruta: /no-existe

Comando:

Invoke-RestMethod -Uri http://localhost:3000/no-existe -Method Get

Resultado esperado:

404 Not Found

{
  "error": "Ruta no encontrada"
}

---

## 500 - Error interno

Para esta prueba se provocó temporalmente un error dentro de strategy.js usando:

throw new Error("Error interno de prueba");

Luego se cargó el fixture:

$body = Get-Content -Raw -Path ".\src\fixtures\state.json"

Y se ejecutó:

Invoke-RestMethod -Uri http://localhost:3000/move -Method Post -ContentType "application/json" -Body $body

Resultado esperado:

500 Internal Server Error

{
  "error": "Error interno del servidor"
}

Después de la prueba se eliminó el error temporal.