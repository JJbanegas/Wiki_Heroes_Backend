const mongoose = require("mongoose")
const { Schema } = mongoose

const userModel = new Schema(
  {
    userName: {
      type: String,
      unique: true
    },
    firstName: {type: String },
    lastName: {type: String },
    password: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    phone: {type: String},
    address: {type: String},
    dateBirth: {type: Date},
    photo: {
      data: Buffer,
      contentType: String
    },
    roles: {
      ref: "role",
      type: Schema.Types.ObjectId
    }
  },
  {
    collection: 'users',
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model("user", userModel)