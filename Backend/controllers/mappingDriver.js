const Driver = require("../models/driver.model");
const getAvailableDrivers = async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;
    if (!lat || !lng) return res.status(400).json({ success: false, message: "Latitude and longitude are required" });
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    if (isNaN(latitude) || isNaN(longitude)) return res.status(400).json({ success: false, message: "Invalid coordinates" });
    const drivers = await Driver.find({
      isAvailable: true,
      location: {
        $nearSphere: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: parseInt(radius),
        },
      },
    }).select("firstname email phone vehicle location");
    res.status(200).json({
      success: true,
      message: "Available drivers retrieved successfully",
      data: drivers,
    });
  } catch (err) {
    console.error("Error finding available drivers:", err);
    res.status(500).json({ success: false, message: "Failed to retrieve drivers" });
  }
};
const updateDriverLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user;
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) return res.status(400).json({ success: false, message: "Latitude and longitude are required" });
    if (role !== "driver") return res.status(403).json({ success: false, message: "Only drivers can update location" });
    if (id !== userId) return res.status(403).json({ success: false, message: "Unauthorized to update this driver" });
    const driver = await Driver.findById(id);
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });
    driver.location = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };
    await driver.save();
    res.status(200).json({
      success: true,
      message: "Driver location updated successfully",
      data: { location: driver.location },
    });
  } catch (err) {
    console.error("Error updating driver location:", err);
    res.status(500).json({ success: false, message: "Failed to update location" });
  }
};

module.exports = { getAvailableDrivers, updateDriverLocation };