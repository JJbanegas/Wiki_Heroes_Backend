const express = require('express')
//const Joi = require('joi')
//const validator = require('express-joi-validation').createValidator()
//const validatorModels = require('../validators/validators.js')


const heroesController = require('../controllers/heroController')
const routes = (Hero) => {

  const heroRouter = express.Router()
  const controller = heroesController(Hero)

  heroRouter.route('/heroes')
    .get(controller.getHeroes)
    .post(controller.postHero)

  heroRouter.route('/heroes/:heroId')//querystrinng validacion necesaria
    .get( controller.getHeroById)
    .put( controller.updateHero)//body y queryString validacion necesaria
    .delete(controller.deleteHero)

  return heroRouter
}

module.exports = routes