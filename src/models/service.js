const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  costs: [{
    name:{
      type: String,
      required: true
    },
    cost:{
      type: String,
      required: true
    }}]
});

const Service = mongoose.model("Service", ServiceSchema);


