const joi = require('joi')

// Hay que corroborar que se validen todos los datos de los nuevos modelos

const valPostUser = joi.object({
  firstName: joi.string().required().min(3).max(30),
  lastName: joi.string().required().min(3).max(30),
  password: joi.string().required().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: joi.string().required().min(3).max(30),
  address: joi.string().required().min(3).max(30),
  phone: joi.string().required().min(3).max(30)
})

// eslint-disable-next-line no-invalid-regexp
/*const valQueryString = joi.required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))*/

const valUserLogin = joi.object({
  userName: joi.string().required().min(3).max(30),
  password: joi.string().required().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

const valUsserPut = joi.object({
  firstName: joi.string().min(3).max(30),
  lastName: joi.string().min(3).max(30),
  password: joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: joi.string().min(3).max(30),
  address: joi.string().min(3).max(30),
  phone: joi.number().min(3).max(30)
})

const valPostBook = joi.object({
  title: joi.string().required().min(3).max(30),
  author: joi.string().required().min(3).max(30),
  genre: joi.string().required().min(3).max(30),
  read: joi.boolean().required()
})

const valPutBook = joi.object({
  title: joi.string().min(3).max(30),
  author: joi.string().min(3).max(30),
  genre: joi.string().min(3).max(30),
  read: joi.boolean()
})

/*
const valPosthero = joi.object({
  heroName: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    birthDate: joi.date().required(), //Interpreta la forma americana de poner la fecha?, que es el agregado que le pone a la fecha en el Bson?.
    universe: joi.string().required(),
    firstAppearance: joi.string().required(),
    age: joi.string().required(),
    powers: joi.string().required(),
    achievments: joi.string().required()
})*/



module.exports = {valPostUser, /*valQueryString,*/ valUserLogin, valUsserPut, valPostBook, valPutBook, /*valPostHero*/}