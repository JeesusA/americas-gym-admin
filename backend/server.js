const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const http = require("http");
const { initSocket, sendNotification } = require("./routes/notifications");

const app = express();
const server = http.createServer(app); // Crear servidor HTTP
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Agregar esta linea para procesar los datos en formato json que llegan del frontend

const discountCodeRouter = require("./routes/discountCode");
const promotionsRouter = require('./routes/promotions');

app.use("/api/discount-code", discountCodeRouter);
app.use("/api/promociones", promotionsRouter);

// Iniciar socket.io
initSocket(server);

// Mejor para entornos reales
const pool = mysql.createPool({
    host: 'host.docker.internal',
    user: 'root',
    password: '',
    database: 'gestion-gym',
})

// Verificar conexión
pool.getConnection((err, connection) =>{
    if (err) {
        console.error('Error de conexion:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos!');
    connection.release();
});

// Servidor escuchando en el puerto 3001
server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// Rutas para obtener los datos de la DB y devolverlos al frontend
app.get('/api/precios', (req, res) => {
    const SQL_QUERY = 'SELECT * FROM precios';
    pool.query(SQL_QUERY, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.json(result);
    });
});

app.get('/api/promociones', (req, res) => {
    const SQL_QUERY = 'SELECT * FROM promociones';
    pool.query(SQL_QUERY, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.json(result);
    });
});

app.get('/api/sucursales', (req, res) => {
    const SQL_QUERY = 'SELECT * FROM sucursales';
    pool.query(SQL_QUERY, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.json(result);
    });
});

app.get('/api/informacion_general', (req, res) => {
    const SQL_QUERY = 'SELECT * FROM informacion_general';
    pool.query(SQL_QUERY, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.json(result);
    });
});

app.get('/api/contacto', (req, res) => {
    const SQL_QUERY = 'SELECT * FROM contacto';
    pool.query(SQL_QUERY, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.json(result);
    });
});

// Declarar las rutas para guardar los datos en la DB
app.post('/api/precios', (req, res) => {
    const { nombre_membresia, precio_membresia } = req.body;
    // Hacemos un validacion basica
    if (!nombre_membresia || !precio_membresia) {
        return res.status(400).json({
            error: 'Favor de llenar los campos'
        });
    }

    const SQL_QUERY =
        'insert into precios (nombre_membresia, precio_membresia) values (?, ?)';
    pool.query(
        SQL_QUERY,
        [nombre_membresia, precio_membresia],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res
                .status(201)
                .json({ id: result.insertId, nombre_membresia, precio_membresia });
        });
});

app.post('/api/promociones', (req, res) => {
    const { nombre_promocion, descuento } = req.body;
    // Hacemos un validacion basica
    if (!nombre_promocion || !descuento) {
        return res.status(400).json({
            error: 'Favor de llenar los campos'
        });
    }

    const SQL_QUERY =
        'insert into promociones (nombre_promocion, descuento) values (?, ?)';
    pool.query(
        SQL_QUERY,
        [nombre_promocion, descuento],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res
                .status(201)
                .json({ id: result.insertId, nombre_promocion, descuento });
        });
});

app.post('/api/sucursales', (req, res) => {
    const { nombre_sucursal, direccion_sucursal } = req.body;
    // Hacemos un validacion basica
    if (!nombre_sucursal || !direccion_sucursal) {
        return res.status(400).json({
            error: 'Favor de llenar los campos'
        });
    }

    const SQL_QUERY =
        'insert into sucursales (nombre_sucursal, direccion_sucursal) values (?, ?)';
    pool.query(
        SQL_QUERY,
        [nombre_sucursal, direccion_sucursal],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res
                .status(201)
                .json({ id: result.insertId, nombre_sucursal, direccion_sucursal });
        });
});

app.post('/api/informacion_general', (req, res) => {
    const { informacion } = req.body;
    // Hacemos un validacion basica
    if (!informacion) {
        return res.status(400).json({
            error: 'Favor de llenar los campos'
        });
    }

    const SQL_QUERY =
        'insert into informacion_general (informacion) values (?)';
    pool.query(
        SQL_QUERY,
        [informacion],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res
                .status(201)
                .json({ id: result.insertId, informacion });
        });
});

app.post('/api/contacto', (req, res) => {
    const { correo_electronico, telefono, redes_sociales } = req.body;
    // Hacemos un validacion basica
    if (!correo_electronico || !telefono || !redes_sociales) {
        return res.status(400).json({
            error: 'Favor de llenar los campos'
        });
    }

    const SQL_QUERY =
        'insert into contacto (correo_electronico, telefono, redes_sociales) values (?, ?, ?)';
    pool.query(
        SQL_QUERY,
        [correo_electronico, telefono, redes_sociales],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res
                .status(201)
                .json({ id: result.insertId, correo_electronico, telefono, redes_sociales });
        });
});