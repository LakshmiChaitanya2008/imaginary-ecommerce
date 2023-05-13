const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  address: {
    houseNo: String,
    roadName: String,
    area: String,
    city: String,
  },
  status: String,
  orderedOn: Schema.Types.Date,
});

module.exports = model("Order", orderSchema);
