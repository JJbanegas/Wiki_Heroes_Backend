const { Mongoose } = require("mongoose")

const heroesController = (Hero) => {
    const getHeroes = async (req, res) => {
      try {const { query } = req
        const response = await Hero.find(query)
  
        return res.json(response)
      } catch (error) {
        throw error
      }
    }
  
    const postHero = async(req,res) => {
      try {
        const hero = new Hero(req.body)
        console.log ("body: ", req.body)
        await hero.save()
    
        return res.status(201).json(hero)
      }catch (error) {
        throw error
      }
    }
    const getHeroById = async (req,res) => {
      try {
        console.log('Llamó a la funcion correcta')
        const { params } = req
        const response = await Hero.findById(params.heroId)
  
        res.json(response)
      }catch (error){
        throw error
      }
    }
    const updateHero = async(req,res) => {
      try{
        const { params, body } = req
        const response = await Hero.updateOne({
          _id: params.heroId
          }, {
           $set: {
            heroName: body.heroName,
            firstName: body.firstName,
            lastName: body.lastName,
            birthDate: body.birthDate,
            universe: body.universe,
            firstAppearance: body.firstAppearance,
            age: body.age,
            powers: body.powers,
            achievments: body.achievments,
            side: body.side,
            Image: body.Image
          }
        }) 
      return res.status(202).json(response)
    } catch (error) {
      throw error
    }
      
    }
    const deleteHero = async(req,res) => {
      try{
        const{ params } = req
      console.log (params)
      await Hero.findByIdAndDelete(params.heroId)
      return res.status(202).json({message:"The hero has been succesfully deleted"})
      } catch (error) {
        throw error
      }
      
    }
    return {getHeroes, postHero, getHeroById, updateHero, deleteHero}
  }
  
  module.exports = heroesController