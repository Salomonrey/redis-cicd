const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  FIO: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  hospital: {type: mongoose.Schema.ObjectId, ref: 'Hospital'}
});

const Doctor = mongoose.model("Doctor", DoctorSchema);


