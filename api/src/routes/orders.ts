import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await prisma.orders.findMany();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
});

// GET single order by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.orders.findUnique({
      where: { id_orders: parseInt(id) },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Error fetching order" });
  }
});

// POST create a new order
router.post("/", async (req, res) => {
  const { createdAt, updatedAt, discount, totalPrice, id_cust } = req.body;
  try {
    const order = await prisma.orders.create({
      data: {
        createdAt,
        updatedAt,
        discount,
        totalPrice,
        id_cust,
      },
    });
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
});

// PUT update an existing order by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { createdAt, updatedAt, discount, totalPrice, id_cust } = req.body;
  try {
    const updatedOrder = await prisma.orders.update({
      where: { id_orders: parseInt(id) },
      data: {
        createdAt,
        updatedAt,
        discount,
        totalPrice,
        id_cust,
      },
    });
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Error updating order" });
  }
});

// DELETE an order by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.orders.delete({
      where: { id_orders: parseInt(id) },
    });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Error deleting order" });
  }
});
