import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class OrdersController {
  async getOrders(req: Request, res: Response) {
    try {
      const orders = await prisma.orders.findMany();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Error fetching orders" });
    }
  }

  async getOrdersById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const order = await prisma.orders.findUnique({
        where: { ordersId: parseInt(id) },
      });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Error fetching order" });
    }
  }

  async createOrder(req: Request, res: Response) {
    const { createdAt, updatedAt, orderDiscount, totalPrice, customerId } =
      req.body;
    try {
      const order = await prisma.orders.create({
        data: {
          createdAt,
          updatedAt,
          orderDiscount,
          totalPrice,
          customerId,
        },
      });
      res.json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Error creating order" });
    }
  }

  async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const { createdAt, updatedAt, orderDiscount, totalPrice, customerId } =
      req.body;
    try {
      const updatedOrder = await prisma.orders.update({
        where: { ordersId: parseInt(id) },
        data: {
          createdAt,
          updatedAt,
          orderDiscount,
          totalPrice,
          customerId,
        },
      });
      res.json(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Error updating order" });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.orders.delete({
        where: { ordersId: parseInt(id) },
      });
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Error deleting order" });
    }
  }
}
