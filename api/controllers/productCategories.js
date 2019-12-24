const database = require("../../config/database");
const Category = database.import("../models/productCategories");

// Get all categories
const getCategories = (req, res) => {
    const categories = Category.findAll().then(category => {
        console.log("All product categories: ", JSON.stringify(category, null, 4));
        res.status(200).json({
            category,
            message: "Handling GET Request to /categories"
        });
    });
};

// Get category by id
const getCategoryById = (req, res) => {
    const id = req.body.id;
    if (!id) {
        res.status(401).json({
            message: "Invalid id"
        });
    } else {
        const category = Category.findAll({ where: { CategoryId: id } }).then(
            product => {
                console.log("Category: ", JSON.stringify(cat, null, 4));
                res.status(200).json({
                    category: cat,
                    message: "Handling GET request to /ProductCategories/ " + id
                });
            }
        );
    }
};

// Create category
const createCategory = (req, res) => {
    const category = {
        name: req.body.description
    };

    res.status(201).json({
        message: "Handling POST request to /ProductCategories",
        createdProduct: category
    });
};

// Update category
const updateCategory = (req, res) => {
    res.status(200).json({
        message: "Handling PATCH request to /ProductCategories"
    });
};

// Delete category
const deleteCategory = (req, res) => {
    res.status(200).json({
        message: "Handling DELETE request to /ProductCategories"
    });
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};