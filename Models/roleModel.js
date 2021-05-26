const mongoose = require("mongoose")

const { Schema } = mongoose

const roleModel = new Schema({
  name: String
}, 
{
  collection: "roles",
  versionKey: false //preguntar
})

module.exports = mongoose.model("role", roleModel)