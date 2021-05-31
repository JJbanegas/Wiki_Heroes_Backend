const roles = ["admin", "moderator", "user"]
const User = require('../Models/userModel')

const checkRoles = (req, res, next) =>{
  if(req.body.roles){
    for(let i = 0; i < req.body.roles.length; i++){
      if(!roles.includes(req.body.roles[i])){
        return res.status(400).json({message: `Role ${req.body.roles[i]} does not exists`})
      }
    }
  }
  next()
}

const checkDuplicatedUserOrEmail = async (req, res, next) => {

  const user = await User.findOne({userName: req.body.userName})
  if(user) return res.status(400).json({message: 'the user already exists'})

  const email = await User.findOne({email: req.body.email})
  if(email) return res.status(400).json({message: 'the email already exists'})

  next()
}

module.exports = {checkRoles, checkDuplicatedUserOrEmail}