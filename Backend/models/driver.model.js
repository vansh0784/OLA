const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const driverSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role:{
      type:String,
      required:true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    vehicle: {
      vehiclePlate:{
        type:String,
        required:true,
      },
      vehicleColor:{
        type:String,
        required:true,
      },
      vehicleCapacity:{
        type:String,
        required:true,
      },
      vehicleType:{
        type:String,
        required:true,
      }
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],

      },
    },
  },
  {
    timestamps: true,
  }
);

driverSchema.index(
  { location: "2dsphere" },
  { partialFilterExpression: { "location.coordinates": { $exists: true, $ne: [] } } }
);

driverSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
module.exports = mongoose.model("Driver", driverSchema);
