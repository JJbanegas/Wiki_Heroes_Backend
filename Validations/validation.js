const joi = require('joi')

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
  usserName: joi.string().required().min(3).max(30),
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

module.exports = {valPostUser, /*valQueryString,*/ valUserLogin, valUsserPut, valPostBook, valPutBook}