const Booking = require("../models/booking.model");
const Driver = require("../models/driver.model");

const acceptRide = async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    const driverId = req.user.id;
    if (!bookingId) return res.status(400).json({ success: false, message: "Booking ID is required" });
    if (!driverId) return res.status(401).json({ success: false, message: "Authentication failed" });
    if (req.user.role !== "driver") return res.status(403).json({ success: false, message: "Only drivers can accept rides" });
    const driverDetails = await Driver.findById(driverId);
    if (!driverDetails) return res.status(404).json({ success: false, message: "Driver not found" });
    if (!driverDetails.isAvailable) return res.status(400).json({ success: false, message: "Driver is not available" });
    const bookingDetails = await Booking.findById(bookingId);
    if (!bookingDetails) return res.status(404).json({ success: false, message: "Booking not found" });
    if (bookingDetails.status !== "requested") return res.status(400).json({ success: false, message: "Booking cannot be accepted" });
    if (bookingDetails.driverId) return res.status(400).json({ success: false, message: "Booking already assigned" });
    bookingDetails.status = "accepted";
    bookingDetails.driverId = driverId;
    driverDetails.isAvailable = false;
    await bookingDetails.save();
    await driverDetails.save();
    res.status(200).json({
      success: true,
      message: "Ride accepted successfully",
      data: bookingDetails,
    });
  } catch (err) {
    console.error("Error accepting ride:", err);
    res.status(500).json({ success: false, message: "Failed to accept ride" });
  }
};

const rejectRide = async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    const driverId = req.user.id;
    if (!bookingId) return res.status(400).json({ success: false, message: "Booking ID is required" });
    if (!driverId) return res.status(401).json({ success: false, message: "Authentication failed" });
    if (req.user.role !== "driver") return res.status(403).json({ success: false, message: "Only drivers can reject rides" });
    const driverDetail = await Driver.findById(driverId);
    if (!driverDetail) return res.status(404).json({ success: false, message: "Driver not found" });
    const bookingDetails = await Booking.findById(bookingId);
    if (!bookingDetails) return res.status(404).json({ success: false, message: "Booking not found" });
    if (!["requested"].includes(bookingDetails.status)) return res.status(400).json({ success: false, message: "Booking cannot be rejected" });
    bookingDetails.status = "rejected";
    await bookingDetails.save();
    res.status(200).json({
      success: true,
      message: "Ride rejected successfully",
      data: bookingDetails,
    });
  } catch (err) {
    console.error("Error rejecting ride:", err);
    res.status(500).json({ success: false, message: "Failed to reject ride" });
  }
};

module.exports = { acceptRide, rejectRide };