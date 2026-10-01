const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const CheckoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const orderAdminRoutes = require("./routes/orderAdminRoutes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

const port = process.env.PORT || 8800;

// MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello And Welcome");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", CheckoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscriberRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", productAdminRoutes);
app.use("/api/admin", orderAdminRoutes);

// Local development only
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
  });
}

// Vercel
module.exports = app;
