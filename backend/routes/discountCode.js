const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Generar código de descuento
router.get("/generate", (req, res) => {
  let discountCode = uuidv4(); // Genera un código aleatorio
  discountCode = discountCode.split('-')[0];
  res.json({ code: discountCode });
});

module.exports = router;
