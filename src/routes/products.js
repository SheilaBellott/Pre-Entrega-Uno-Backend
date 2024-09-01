const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const productsFilePath = path.join(__dirname, '../data/products.json');

const getProductsData = () => JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const saveProductsData = (data) => fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2));

// Obtener todos los productos
router.get('/', (req, res) => {
  const products = getProductsData();
  const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
  res.json(products.slice(0, limit));
});

// Obtener producto por ID
router.get('/:pid', (req, res) => {
  const products = getProductsData();
  const product = products.find(p => p.id === req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Agregar nuevo producto
router.post('/', (req, res) => {
  const products = getProductsData();
  const newProduct = {
    id: Date.now().toString(),
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status !== undefined ? req.body.status : true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails || []
  };

  products.push(newProduct);
  saveProductsData(products);
  res.status(201).json(newProduct);
});

// Actualizar producto por ID
router.put('/:pid', (req, res) => {
  const products = getProductsData();
  const productIndex = products.findIndex(p => p.id === req.params.pid);

  if (productIndex !== -1) {
    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
    saveProductsData(products);
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Eliminar producto por ID
router.delete('/:pid', (req, res) => {
  let products = getProductsData();
  products = products.filter(p => p.id !== req.params.pid);
  saveProductsData(products);
  res.status(204).send();
});

module.exports = router;
