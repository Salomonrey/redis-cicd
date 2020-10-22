const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  time_open: {
    type: String,
    required: true
  },
  tel_number: {
    type: String,
    required: true
  },
});

const Hospital = mongoose.model("Hospital", HospitalSchema);


