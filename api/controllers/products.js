const database = require("../../config/database");
const Product = database.import("../models/products");

// Get all products
const getProducts = (req, res) => {
    const products = Product.findAll().then(product => {
        console.log("All products: ", JSON.stringify(product, null, 4));
        res.status(200).json({
            product,
            message: "Handling GET request to /products"
        });
    });
};

// Get product by id
const getProductById = (req, res) => {
    const id = req.body.id;
    if (!id) {
        res.status(401).json({
            message: "Invalid id"
        });
    } else {
        const product = Product.findAll({ where: { ProductId: id } }).then(
            product => {
                console.log("Product: ", JSON.stringify(product, null, 4));
                res.status(200).json({
                    product,
                    message: "Handling GET request to /products/id " + id
                });
            }
        );
    }
};

// Create product
const createProduct = (req, res) => {
    const product = {
        name: req.body.name
    };

    res.status(201).json({
        message: "Handling POST request to /products",
        createdProduct: product
    });
};

// Update product
const updateProduct = (req, res) => {
    res.status(200).json({
        message: "Handling PATCH request to /products"
    });
};

// Delete product
const deleteProduct = (req, res) => {
    res.status(200).json({
        message: "Handling DELETE request to /products"
    });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};