const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/isAdmin");
const Order = require("../models/Order");

router.get("/orders", verifyToken, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;

    const orders = await Order.find()
      .populate({
        path: "items.product",
        select: "name price",
      })
      .populate({
        path: "user",
        select: "name email",
      })
      .skip(startIndex)
      .limit(limit);

    const totalOrders = await Order.countDocuments();

    res.json({
      orders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/orders/:id/status", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(id, status);
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
