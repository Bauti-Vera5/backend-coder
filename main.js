const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.initializeFile();
    }

    initializeFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, '[]');
        }
    }

    addProduct(product) {
        const products = this.getProducts();
        product.id = this.generateProductId();
        products.push(product);
        this.saveProducts(products);
        console.log(`Product with ID ${product.id} added successfully.`);
    }

    getProducts() {
        const productsData = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(productsData);
    }

    getProductById(productId) {
        const products = this.getProducts();
        const product = products.find(p => p.id === productId);
        if (product) {
            return product;
        } else {
            console.log("Product not found.");
            return null;
        }
    }

    updateProduct(productId, updatedFields) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === productId);

        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            this.saveProducts(products);
            console.log(`Product with ID ${productId} updated successfully.`);
        } else {
            console.log("Product not found.");
        }
    }

    deleteProduct(productId) {
        const products = this.getProducts();
        const updatedProducts = products.filter(p => p.id !== productId);
        if (updatedProducts.length < products.length) {
            this.saveProducts(updatedProducts);
            console.log(`Product with ID ${productId} deleted successfully.`);
        } else {
            console.log("Product not found.");
        }
    }

    generateProductId() {
        const products = this.getProducts();
        if (products.length === 0) {
            return 1;
        }
        return Math.max(...products.map(p => p.id)) + 1;
    }

    saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;


