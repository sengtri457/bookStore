const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

const app = express();
app.use(cors());
app.use(express.json());

const User = require("./routes/user");
const Books = require("./routes/book");
const Favorite = require("./routes/favorite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favorite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on ${process.env.PORT}`);
});
