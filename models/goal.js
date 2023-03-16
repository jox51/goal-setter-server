//import mongoose
const mongoose = require("mongoose")

// define schema which will then be used to interact with db
const goalSchema = new mongoose.Schema({
  targetGoal: {
    type: String,
    required: [true, "Goal Must Be Provided"]
  },
  targetDate: {
    type: Date,
    required: [true, "Date must be provided"]
  },
  createdBy: {
    type: String
  },
  name: {
    type: String
  },
  // startDate: {
  //   type: Date,
  //   required: [true, "Start date must be provided"]
  // },
  // endDate: {
  //   type: Date,
  //   required: [true, "End date must be provided"]
  // },
  // location: {
  //   type: String,
  //   required: [true, "End date must be provided"]
  // },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

// export schema, name in string will be used to access the object
module.exports = mongoose.model("Goal", goalSchema)
