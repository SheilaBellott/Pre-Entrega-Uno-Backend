const express = require('express');
const app = express();
const path = require('path');

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear URL-encoded
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Importando las rutas
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json());

// Definiendo las rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
