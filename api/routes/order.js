const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middleware/verifyToken");
const User = require("../models/User");
const Order = require("../models/Order");

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "orders",
      populate: {
        path: "items.product",
        select: "name price",
      },
    });

    res.json(user.orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const cart = user.cart;

    if (cart.items.length === 0) {
      res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      user: req.user._id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      address: {
        houseNo: req.body.houseNo,
        roadName: req.body.roadName,
        area: req.body.area,
        city: req.body.city,
      },
      status: "Order Received",
      orderedOn: new Date(),
    });

    await order.save();

    user.orders.push(order._id);

    user.cart.items = [];

    await user.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
