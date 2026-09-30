const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/orders
// @desc get all order (Admin only)
// @access Private/Admin
router.get("/orders", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ meesage: "Server Error!" });
  }
});

// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private/Admin
router.put("/orders/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not Found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error!");
  }
});

// @route DELETE /api/admin/orders/:id
// @desc delete and error
// @access Private/Admin
router.delete("/orders/:id", protect, admin, async (req, res) => {
  try {
    const order = Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "Order removed" });
    } else {
      res.status(404).json({ message: "Order not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error!");
  }
});

module.exports = router;
