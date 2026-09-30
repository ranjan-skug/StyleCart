const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //@ Create default a admin user

    const createdUser = await User.create({
      name: "Ranjan Admin",
      email: "admin123@gmail.com",
      password: "123456",
      role: "admin",
    });

    // @Assigning the default user ID to each products
    const userID = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });
    // @insert the products into the database
    await Product.insertMany(sampleProducts);
    console.log("Product data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("error seeding the data", error);
    process.exit(1);
  }
};

seedData();
