const { Router } = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const router = Router();
const User = require("../models/User");

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const cart = user.cart;

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    const { product, quantity } = req.body;

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const cartItems = user.cart.items;

    const itemExists = cartItems.findIndex((cp) => {
      return cp.product.toString() === product.toString();
    });

    let newQuantity = quantity;
    const newCartItems = [...cartItems];

    if (itemExists >= 0) {
      newQuantity = cartItems[itemExists].quantity + quantity;
      newCartItems[itemExists].quantity = newQuantity;
    } else {
      newCartItems.push({
        product: product,
        quantity: newQuantity,
      });
    }

    const newCart = {
      items: newCartItems,
    };

    user.cart = newCart;
    user.save();
    res
      .status(200)
      .json({ cart: newCart, msg: "Item Successfully added to cart!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    const { product: productId } = req.body;

    const productIndex = user.cart.items.findIndex(
      (product) => product.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ msg: "Product not found in cart" });
    }

    if (user.cart.items[productIndex].quantity > 1) {
      user.cart.items[productIndex].quantity--;
    } else {
      user.cart.items.splice(productIndex, 1);
    }

    await user.save();

    res.json({ cart: user.cart, msg: "Item Removed Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to remove item from cart" });
  }
});

module.exports = router;
