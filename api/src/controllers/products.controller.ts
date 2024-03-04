import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class ProductsController {
  async createProduct(req: Request, res: Response) {
    try {
      const { productName, productUnit, productPrice } = req.body;
      const product = await prisma.products.create({
        data: { productName, productUnit, productPrice },
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error creating product" });
    }
  }

  async getProduct(req: Request, res: Response) {
    try {
      const products = await prisma.products.findMany();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving products" });
    }
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await prisma.products.findUnique({
        where: {
          productId: parseInt(id),
        },
      });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving product" });
    }
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { productName, productUnit, productPrice } = req.body;
    try {
      const updatedProduct = await prisma.products.update({
        where: {
          productId: parseInt(id),
        },
        data: {
          productName,
          productUnit,
          productPrice,
        },
      });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Error updating product" });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.products.delete({
        where: {
          productId: parseInt(id),
        },
      });
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting product" });
    }
  }
}
