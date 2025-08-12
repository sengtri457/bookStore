const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");
const { authenticateToken } = require("./userAuth");

// Place order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const id = req.user.id;   // get user id from token
    const { order } = req.body;

    if (!order || !Array.isArray(order) || order.length === 0) {
      return res.status(400).json({ message: "Missing or invalid order data" });
    }

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });
    }

    // Clear cart after order
    await User.findByIdAndUpdate(id, { $set: { cart: [] } });

    return res.json({
      status: "success",
      message: "Order placed successfully, cart cleared.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get order history for user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const id = req.user.id;   // get user id from token

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book", model: "books" },  // Specify model as "books"
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const ordersData = [...userData.orders].reverse();

    return res.json({
      status: "success",
      data: ordersData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all orders -- admin only
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const allOrders = await Order.find()
      .populate({ path: "book", model: "books" })   // Specify model as "books"
      .populate("user")
      .sort({ createdAt: -1 });

    return res.json({
      status: "success",
      data: allOrders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update order status -- admin only
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const orderId = req.params.id;
    const { status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });

    return res.json({
      status: "success",
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
