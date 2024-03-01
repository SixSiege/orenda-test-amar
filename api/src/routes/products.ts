import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prod_name, prod_unit, prod_price } = req.body;
    const product = await prisma.products.create({
      data: {
        prod_name,
        prod_unit,
        prod_price,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
});

// Read all products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving products" });
  }
});

// Read a single product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.products.findUnique({
      where: {
        id_product: parseInt(id),
      },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving product" });
  }
});

// Update a product by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { prod_name, prod_unit, prod_price } = req.body;
  try {
    const updatedProduct = await prisma.products.update({
      where: {
        id_product: parseInt(id),
      },
      data: {
        prod_name,
        prod_unit,
        prod_price,
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.products.delete({
      where: {
        id_product: parseInt(id),
      },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
