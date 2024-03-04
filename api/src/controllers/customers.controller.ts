import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CustomersController {
  async createCustomer(req: Request, res: Response) {
    try {
      const { customerName, customerPhone, customerEmail, customerAddress } = req.body;
      const customer = await prisma.customers.create({
        data: { customerName, customerPhone, customerEmail, customerAddress },
      });
      res.status(200).json(customer);
    } catch (err) {
      res.status(500).json({ err: "Error creating customer" });
    }
  }

  async getCustomer(req: Request, res: Response) {
    try {
      const customers = await prisma.customers.findMany();
      res.status(200).json(customers);
    } catch (err) {
      res.status(500).json({ err: "Error creating customer" });
    }
  }

  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const customer = await prisma.customers.findUnique({
        where: {
          customerId: parseInt(id),
        },
      });
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ err: "Customer not found" });
      }
    } catch (err) {
      res.status(500).json({ err: "Error fetching customer" });
    }
  }

  async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    const { customerName, customerPhone, customerEmail, customerAddress } = req.body;
    try {
      const updatedCustomer = await prisma.customers.update({
        where: {
            customerId: parseInt(id),
        },
        data: { customerName, customerPhone, customerEmail, customerAddress },
      });
      res.status(200).json(updatedCustomer);
    } catch (err) {
      res.status(500).json({ error: "Error updating customer" });
    }
  }

  async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.customers.delete({
        where: {
          customerId: parseInt(id),
        },
      });
      res.status(200).json("Customer deleted successfully");
    } catch (err) {
      res.status(500).json({ error: "Error deleting customer" });
    }
  }
}