const { Router } = require("express");
const router = Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  const { ids } = req.query;
  if (ids) {
    const idsArray = ids.split(",");
    res.json(
      await Product.find({
        _id: { $in: idsArray },
      }).exec()
    );
  } else {
    const allProducts = await Product.find();
    res.json(allProducts);
  }
});

module.exports = router;
