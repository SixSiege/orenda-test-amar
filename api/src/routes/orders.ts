import express from "express";
import OrdersController from "../controllers/orders.controller";
const router = express.Router();

const controller = new OrdersController();

router.get("/", controller.getOrders);

// GET single order by ID
router.get("/:id", controller.getOrdersById);

// POST create a new order
router.post("/", controller.createOrder);

// PUT update an existing order by ID
router.put("/:id", controller.updateOrder);

// DELETE an order by ID
router.delete("/:id", controller.deleteOrder);

module.exports = router;