const Booking = require("../models/booking.model");
const validator = require("validator");
const Driver = require("../models/driver.model");

const isValidGeoJSONPoint = (point, fieldName) => {
  if (!point || typeof point !== "object") {
    return `${fieldName} is required`;
  }
  if (point.type !== "Point") {
    return `${fieldName} must have type "Point"`;
  }
  if (!Array.isArray(point.coordinates) || point.coordinates.length !== 2) {
    return `${fieldName} coordinates must be an array of [longitude, latitude]`;
  }
  const [longitude, latitude] = point.coordinates;
  if (
    !validator.isFloat(String(longitude), { min: -180, max: 180 }) ||
    !validator.isFloat(String(latitude), { min: -90, max: 90 })
  ) {
    return `${fieldName} coordinates must be valid numbers (longitude: -180 to 180, latitude: -90 to 90)`;
  }
  return null;
};
const calculateDistance = (start, end) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const R = 6371;
  const [startLng, startLat] = start.coordinates;
  const [endLng, endLat] = end.coordinates;

  const dLat = toRadians(endLat - startLat);
  const dLng = toRadians(endLng - startLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(startLat)) *
      Math.cos(toRadians(endLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const bookRide = async (req, res) => {
  try {
    const { pickup, dropoff } = req.body;
    const pickupError = isValidGeoJSONPoint(pickup, "Pickup location");
    const dropoffError = isValidGeoJSONPoint(dropoff, "Dropoff location");
    if (pickupError || dropoffError) {
      return res.status(400).json({
        success: false,
        message: pickupError || dropoffError,
      });
    }
    const userData = req.user;
    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    const { id, email, role } = userData;
    if (!id || !email) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }
    if (role === "driver") {
      return res.status(403).json({
        success: false,
        message: "Drivers cannot create bookings",
      });
    }
    const distance = calculateDistance(pickup, dropoff);
    const cost = distance * 2;
    const bookingDetails = await Booking.create({
      userId: id,
      driverId: null,
      pickUp: pickup,
      dropOff: dropoff,
      status: "requested",
      distance: distance.toFixed(2),
      cost: cost.toFixed(2),
    });
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: bookingDetails,
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

const allBookings = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    const { id, role } = userData;
    if (!id || !role) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }
    if (role === "driver") {
      return res.status(403).json({
        success: false,
        message: "Drivers cannot view bookings",
      });
    }
    const allUserRides = await Booking.find({ userId: id })
      .select("pickUp dropOff status distance cost driverId createdAt")
      .populate("driverId", "firstname email phone vehicle")
      .sort({ createdAt: -1 });
    if (allUserRides.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No rides yet!",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: allUserRides,
    });
  } catch (err) {
    console.error("Error retrieving bookings:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
    });
  }
};

const cancelRide = async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    const userData = req.user;
    if (!userData || !userData.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    const { id: userId, role } = userData;
    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }
    if (role === "driver") {
      return res.status(403).json({
        success: false,
        message: "Drivers cannot cancel bookings",
      });
    }
    const bookingDetails = await Booking.findById(bookingId);
    if (!bookingDetails) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    if (bookingDetails.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to cancel this booking",
      });
    }
    if (!["accepted", "requested"].includes(bookingDetails.status)) {
      return res.status(400).json({
        success: false,
        message: "This booking cannot be cancelled",
      });
    }
    bookingDetails.status = "cancelled";
    await bookingDetails.save();
    if (bookingDetails.driverId) {
      const driverDetail = await Driver.findById(bookingDetails.driverId);
      if (!driverDetail) {
        return res.status(404).json({
          success: false,
          message: "Driver not found",
        });
      }
      driverDetail.isAvailable = true;
      await driverDetail.save();
    }
    res.status(200).json({
      success: true,
      message: "Ride cancelled successfully",
      data: bookingDetails,
    });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
    });
  }
};
const rideCompleted = async (req, res) => {
  try {
    const { id: rideId } = req.params;
    const { id: driverId, role } = req.user;
    if (!rideId)
      return res
        .status(400)
        .json({ success: false, message: "Booking ID is required" });
    if (!driverId || !role)
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    if (role !== "driver")
      return res
        .status(403)
        .json({
          success: false,
          message: "Only drivers can mark ride completion",
        });
    const driverDetail = await Driver.findById(driverId);
    if (!driverDetail)
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
    const bookingDetail = await Booking.findById(rideId);
    if (!bookingDetail)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    if (!["accepted"].includes(bookingDetail.status))
      return res
        .status(400)
        .json({ success: false, message: "Booking cannot be completed" });
    if (bookingDetail.driverId.toString() !== driverId)
      return res
        .status(403)
        .json({
          success: false,
          message: "Unauthorized to complete this booking",
        });
    bookingDetail.status = "completed";
    await bookingDetail.save();
    driverDetail.isAvailable = true;
    await driverDetail.save();
    res.status(200).json({
      success: true,
      message: "Ride completed successfully",
      data: bookingDetail,
    });
  } catch (err) {
    console.error("Error completing ride:", err);
    res.status(500).json({
      success: false,
      message: "Failed to complete ride",
    });
  }
};
module.exports = { bookRide, cancelRide, allBookings, rideCompleted };
