const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/products
// @desc Create a new Poroduct
// access Private/Admin

router.post("/", protect, admin, async (req, res) => {
  console.log("Hello product");
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, //Reference to the admin user who created it
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/products/:id
// @desc Update a product
// @access Private/Admin

// router.put("/:id", protect, admin, async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       discountPrice,
//       countInStock,
//       category,
//       brand,
//       sizes,
//       colors,
//       collections,
//       material,
//       gender,
//       images,
//       isFeatured,
//       isPublished,
//       tags,
//       dimensions,
//       weight,
//       sku,
//     } = req.body;

//     // Find product by ID
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     // Update product fields
//     product.name = name || product.name;
//     product.description = description || product.description;
//     product.price = price ?? product.price;
//     product.discountPrice = discountPrice ?? product.discountPrice;
//     product.countInStock = countInStock ?? product.countInStock;
//     product.category = category || product.category;
//     product.brand = brand || product.brand;
//     product.sizes = sizes || product.sizes;
//     product.colors = colors || product.colors;
//     product.collections = collections || product.collections;
//     product.material = material || product.material;
//     product.gender = gender || product.gender;
//     product.images = images || product.images;

//     product.isFeatured =
//       isFeatured !== undefined ? isFeatured : product.isFeatured;

//     product.isPublished =
//       isPublished !== undefined ? isPublished : product.isPublished;

//     product.tags = tags || product.tags;
//     product.dimensions = dimensions || product.dimensions;
//     product.weight = weight ?? product.weight;
//     product.sku = sku || product.sku;

//     // Save updated product
//     const updatedProduct = await product.save();

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// });

//Short Version
// router.put("/:id", protect, async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// });

router.put("/:id", protect, admin, async (req, res) => {
  try {
    console.log("UPDATE PRODUCT ID:", req.params.id);
    console.log("UPDATE PRODUCT DATA:", req.body);

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

// @delete product by id
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product Removed" });
    } else {
      res.status(400).json({ message: "Product not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// route get /api/products
// @desc get all products with optional query filters
// @access Public

router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // Filter logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: color.split(",") };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    // Sort Logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // Fetch products and apply sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// @route GET /api/products/best-seller
// @desc Retrive the product with highest rating
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
});

// @route GET /api/products/new-arrivals
// @route Retieve latest 8 products - Creation date
// @access Public

router.get("/new-arrivals", async (req, res) => {
  console.log("new-arrivals");
  try {
    // Fetch latest 8 products
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
});

// @route /api/products/:id
// @desc Get a single product by ID
// @access Public

router.get("/:id", async (req, res) => {
  try {
    // const product = await Product.find({ user: req.params.id });
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(400).json({ message: "Product Not Found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
});

// @route GET /api/products/similar/:id
// @desc Retrive similar products based on the current products gender and category
// @access Public

router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Id==========================================>:", id);
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the same product ID
      gender: product.gender,
      category: product.category,
    }).limit(4);
    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
