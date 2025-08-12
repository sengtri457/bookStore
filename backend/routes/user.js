const router = require("express").Router();
const User = require("../models/user");
const bcrpte = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
// Sign up route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Username validation
    if (username.length < 4) {
      return res
        .status(400)
        .json({ error: "Username must be at least 4 characters long" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Password validation
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    const hashPass = await bcrpte.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      address: address,
    });

    await newUser.save();
    return res.status(200).json({ message: "Sign up successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//sign in
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Fix: use await instead of callback
    const isPasswordCorrect = await bcrpte.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const authClaims = {
      id: existingUser._id,
      username: existingUser.username,
      role: existingUser.role,
    };

    const token = jwt.sign(authClaims, "bookStore123", {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: "Login successful",
      id: existingUser._id,
      role: existingUser.role,
      token: token,
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user info route
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id);
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//update address

router.put("/update-address", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const { address } = req.body;
  
      if (!address) {
        return res.status(400).json({ message: "Address is required" });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { address: address },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({
        message: "Address updated successfully",
        address: updatedUser.address,
      });
    } catch (error) {
      console.error("Address Update Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
