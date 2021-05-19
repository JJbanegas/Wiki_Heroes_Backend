const express = require('express')
const userController = require('../Controllers/userController')
const validator = require('express-joi-validation').createValidator()
const validations = require('../Validations/validation')


const routes = (User) => {
  const userRouter = express.Router()
  const controller = userController(User)

  userRouter.route('/users')
    .get(controller.getUsers)
    .post(validator.body(validations.valPostUser),
      controller.postUser)

  userRouter.route('/users/:userId')
    .get(controller.getUserById)

    .put(validator.body(validations.valUserPut),
      controller.putUserById)

    .delete(controller.deleteUserById)

  userRouter.route('/users/login')
    .post(validator.body(validations.valUserLogin),
      controller.postUserLogIn)

  userRouter.route('/users/userName/:userName')
    .get(controller.GetUserByUserName)

  return userRouter
}

module.exports = routes