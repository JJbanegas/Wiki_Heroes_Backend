const express = require('express')
const userController = require('../Controllers/userController')
const validator = require('express-joi-validation').createValidator()
const validations = require('../Validations/validation')
const { verifySingnUp } = require('../middlewares/content')


const routes = (User) => {
  const {checkRoles, checkDuplicatedUserOrEmail} = verifySingnUp
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

  userRouter.route('/users/singnup')
    .post([checkDuplicatedUserOrEmail, checkRoles], controller.postUserSingnUp)

  userRouter.route('/users/singnin')
    .post(controller.postUserSingnIn)

  userRouter.route('/users/userName/:userName')
    .get(controller.GetUserByUserName)

  return userRouter
}

module.exports = routes