const mongoose = require('mongoose')

const {Schema} = mongoose

const heroModel = Schema(
  {
    heroName: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    birthDate: {type: Date}, //Interpreta la forma americana de poner la fecha?, que es el agregado que le pone a la fecha en el Bson?.
    universe: {type: String},
    firstAppearance: {type: String},
    age: {type: String},
    powers: {type: String},
    achievments: {type:String}
  },
  {
    collection: 'heroes'
  }
)

module.exports = mongoose.model('hero', heroModel)