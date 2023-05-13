const User = require("../models/User");

module.exports = {
  isAdmin: async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. You are not an admin." });
    }
    next();
  },
};
