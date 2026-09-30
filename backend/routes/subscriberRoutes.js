const express = require("express");
const Subscriber = require("../models/Subscriber");

const router = express.Router();

// @route POST /api/subscribe
// @Handel newsletter subscription
// @access public
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is Required!" });
  }
  try {
    //   check the if email already subscribed
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ message: "email is already subscribed!" });
    }
    //   Create a new Subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();
    res
      .status(201)
      .json({ message: "Successfully subscribe to the newsletter" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
});

module.exports = router;
