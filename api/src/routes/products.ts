import express from "express";
import ProductsController from "../controllers/products.controller";

const router = express.Router();
const controller = new ProductsController();

router.post("/", controller.createProduct);

// Read all products
router.get("/", controller.getProduct);

// Read a single product by ID
router.get("/:id", controller.getProductById);

// Update a product by ID
router.put("/:id", controller.updateProduct);

// Delete a product by ID
router.delete("/:id", controller.deleteProduct);

module.exports = router;
