const { Schema, model } = require("mongoose");

/*
    cart -> items -> item -> number
*/
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = model("User", userSchema);
