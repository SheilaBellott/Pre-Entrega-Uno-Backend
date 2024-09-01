const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const cartsFilePath = path.join(__dirname, '../data/carts.json');
const productsFilePath = path.join(__dirname, '../data/products.json');

const getCartsData = () => JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
const saveCartsData = (data) => fs.writeFileSync(cartsFilePath, JSON.stringify(data, null, 2));

const getProductsData = () => JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Crear nuevo carrito
router.post('/', (req, res) => {
  const carts = getCartsData();
  const newCart = {
    id: Date.now().toString(),
    products: []
  };

  carts.push(newCart);
  saveCartsData(carts);
  res.status(201).json(newCart);
});

// Obtener productos de un carrito por ID
router.get('/:cid', (req, res) => {
  const carts = getCartsData();
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// Agregar producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
  const carts = getCartsData();
  const products = getProductsData();
  const cart = carts.find(c => c.id === req.params.cid);
  const product = products.find(p => p.id === req.params.pid);

  if (cart && product) {
    const productInCart = cart.products.find(p => p.product === req.params.pid);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }
    saveCartsData(carts);
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
});

module.exports = router;
