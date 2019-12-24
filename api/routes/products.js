const express = require("express");
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/products");

const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.post("/", createProduct);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;