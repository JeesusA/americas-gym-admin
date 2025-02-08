const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Configurar conexión a la base de datos
const pool = mysql.createPool({
  host: 'host.docker.internal',
  user: 'root',
  password: '',
  database: 'gestion-gym',
});

// Obtener todas las promociones
router.get('/', (req, res) => {
  const SQL_QUERY = 'SELECT * FROM promociones';
  pool.query(SQL_QUERY, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

router.put('/:id', (req, res) => {
    const { nombre_promocion, descuento } = req.body;
    const { id } = req.params;
  
    if (!nombre_promocion || !descuento) {
      console.log("Faltan datos:", { nombre_promocion, descuento });
      return res.status(400).json({ error: 'Favor de llenar los campos' });
    }
  
    const SQL_QUERY = 'UPDATE promociones SET nombre_promocion = ?, descuento = ? WHERE id = ?';
  
    pool.query(SQL_QUERY, [nombre_promocion, descuento, id], (err, result) => {
      if (err) {
        console.error("Error en la base de datos:", err);
        return res.status(500).json({ error: err.message });
      }
  
      if (result.affectedRows === 0) {
        console.log("No se encontró la promoción con el ID:", id);
        return res.status(404).json({ error: 'Promoción no encontrada' });
      }
  
      console.log("Promoción actualizada correctamente:", result);
      res.json({ id, nombre_promocion, descuento });
    });
  });
  

// Eliminar una promoción
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const SQL_QUERY = 'DELETE FROM promociones WHERE id = ?';
  pool.query(SQL_QUERY, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
});

module.exports = router;
