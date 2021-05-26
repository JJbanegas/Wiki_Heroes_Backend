const express = require('express')
//const Joi = require('joi')
//const validator = require('express-joi-validation').createValidator()
//const validatorModels = require('../validators/validators.js')
const {verifyJwt} = require('../middlewares/content')
const heroesController = require('../controllers/heroController')

const routes = (Hero) => {

  const { verifyToken, isModerator, isAdmin } = verifyJwt
  const heroRouter = express.Router()
  const controller = heroesController(Hero)

  heroRouter.route('/heroes')
    .get(controller.getHeroes)
    .post([verifyToken, (isModerator || isAdmin)], controller.postHero)

  heroRouter.route('/heroes/:heroId')//querystrinng validacion necesaria
    .get( controller.getHeroById)
    .put(verifyToken, controller.updateHero)//body y queryString validacion necesaria
    .delete(verifyToken, controller.deleteHero)

  return heroRouter
}

module.exports = routes