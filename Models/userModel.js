const mongoose = require("mongoose")

const { Schema } = mongoose

const userModel = new Schema(
  {
    userName: {type: String},
    firstName: {type: String },
    lastName: {type: String },
    userName: {type: String },
    password: {type: String },
    email: {type: String},
    phone: {type: String},
    address: {type: String},
    dateBirth: {type: Date},
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  {
    collection: 'Users'
  }
)

module.exports = mongoose.model("User", userModel)