const express = require('express');
const ProductManager = require('./ProductManager'); // Asegúrate de poner la ruta correcta al archivo ProductManager.js
const app = express();

const productManager = new ProductManager('productos.json'); // Asegúrate de poner el nombre del archivo correcto

app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit);

    if (isNaN(limit)) {
        res.json(productManager.getProducts());
    } else {
        const limitedProducts = productManager.getProducts().slice(0, limit);
        res.json(limitedProducts);
    }
});

app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
