# Proyecto: Pre Entrega

Este proyecto es una aplicación básica para la gestión de productos y carritos de compras utilizando Node.js y Express.


## Descripción de Archivos

### `src/app.js`

Este archivo es el punto de entrada de la aplicación. Configura Express, los middlewares y define las rutas principales para la API.

- **Middlewares**:
  - `express.json()`: Para parsear datos en formato JSON.
  - `express.urlencoded()`: Para parsear datos de formularios.

- **Rutas**:
  - `/api/products`: Rutas relacionadas con productos.
  - `/api/carts`: Rutas relacionadas con carritos.

### `src/routes/products.js`

Este archivo maneja las rutas relacionadas con los productos. Incluye funcionalidades para obtener, agregar, actualizar y eliminar productos.

- **Rutas**:
  - `GET /api/products`: Obtener todos los productos.
  - `GET /api/products/:pid`: Obtener un producto por su ID.
  - `POST /api/products`: Agregar un nuevo producto.
  - `PUT /api/products/:pid`: Actualizar un producto por su ID.
  - `DELETE /api/products/:pid`: Eliminar un producto por su ID.

### `src/routes/carts.js`

Este archivo maneja las rutas relacionadas con los carritos de compras. Permite crear carritos, obtener productos en un carrito y agregar productos a un carrito.

- **Rutas**:
  - `POST /api/carts`: Crear un nuevo carrito.
  - `GET /api/carts/:cid`: Obtener los productos en un carrito específico por su ID.
  - `POST /api/carts/:cid/product/:pid`: Agregar un producto a un carrito específico.

### `src/data/products.json`

Este archivo contiene una lista de productos en formato JSON. Cada producto tiene las siguientes propiedades:

- `id`: Identificador único del producto.
- `title`: Título del producto.
- `description`: Descripción del producto.
- `code`: Código del producto.
- `price`: Precio del producto.
- `status`: Estado del producto (disponible o no).
- `stock`: Cantidad disponible en stock.
- `category`: Categoría del producto.
- `thumbnails`: Lista de imágenes del producto.

### `src/data/carts.json`

Este archivo contiene una lista de carritos en formato JSON. Cada carrito tiene un identificador único y una lista de productos agregados.

- `id`: Identificador único del carrito.
- `products`: Lista de productos en el carrito, donde cada producto tiene:
  - `product`: ID del producto.
  - `quantity`: Cantidad del producto en el carrito.

