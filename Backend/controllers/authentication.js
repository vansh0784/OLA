const Driver = require("../models/driver.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role, vehiclePlate, vehicleColor, vehicleType, capacity } = req.body;

    // Log request body for debugging
    console.log("Request body:", req.body);

    // Validate required fields
    if (!firstname || !lastname || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "Complete all required fields" });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Validate role
    if (!["user", "driver"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role. Must be 'user' or 'driver'" });
    }

    if (role === "driver") {
      // Validate driver-specific fields
      if (!vehiclePlate || !vehicleColor || !vehicleType || !capacity) {
        console.log("Missing vehicle fields:", { vehiclePlate, vehicleColor, vehicleType, capacity });
        return res.status(400).json({ success: false, message: "Vehicle details missing" });
      }

      // Validate field types (schema expects strings)
      if (
        typeof vehiclePlate !== "string" ||
        typeof vehicleColor !== "string" ||
        typeof vehicleType !== "string" ||
        typeof capacity !== "string"
      ) {
        return res.status(400).json({ success: false, message: "All vehicle fields must be strings" });
      }

      const driverDetail = await Driver.create({
        firstname,
        lastname,
        email,
        password, // Will be hashed by pre-save middleware
        role,
        vehicle: {
          vehiclePlate,
          vehicleColor,
          vehicleCapacity: capacity, // Map capacity to vehicleCapacity
          vehicleType,
        },
      });

      console.log("Driver created:", driverDetail);
      return res.status(201).json({
        success: true,
        message: "Driver registered successfully",
        data: {
          id: driverDetail._id,
          firstname: driverDetail.firstname,
          lastname: driverDetail.lastname,
          email: driverDetail.email,
          role: driverDetail.role,
          vehicle: driverDetail.vehicle,
        },
      });
    } else {
      const userDetail = await User.create({
        firstname,
        lastname,
        email,
        password, // Will be hashed by pre-save middleware
        role,
      });

      console.log("User created:", userDetail);
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          id: userDetail._id,
          firstname: userDetail.firstname,
          lastname: userDetail.lastname,
          email: userDetail.email,
          role: userDetail.role,
        },
      });
    }
  } catch (err) {
    console.error("Registration error:", err);
    console.error("Error stack:", err.stack);
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role)
      return res.status(400).send("All fields are required");
    if (role === "driver") {
      const driverDetails = await driver.findOne({ email });
      if (!driverDetails) {
        return res.status(400).send("Invalid email");
      }
      const verifyPassword = await bcrypt.compare(
        password,
        driverDetails?.password
      );
      if (!verifyPassword) {
        return res.status(400).send("Password is Wrong");
      }
      const payload = {
        id: driverDetails?._id,
        email: driverDetails?.email,
        role: driverDetails?.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      if (!token) {
        return res.status(500).send("token is not generated");
      }
      res.cookie("token", token);
      res.status(200).json({
        success: true,
        message: "login Successful",
      });
    } else {
      const userDetails = await user.findOne({ email });
      if (!userDetails) {
        return res.status(400).send("Invalid email");
      }
      const verifyPassword = await bcrypt.compare(
        password,
        userDetails?.password
      );
      if (!verifyPassword) {
        return res.status(400).send("Password is Wrong");
      }
      const payload = {
        id: userDetails?._id,
        email: userDetails?.email,
        role: userDetails?.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      if (!token) {
        return res.status(500).send("token is not generated");
      }
      res.cookie("token", token);
      res.status(200).json({
        success: true,
        message: "login Successful",
        token,
      });
    }
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Logout successfully");
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err,
    });
  }
};
module.exports = { register, login, logout };
