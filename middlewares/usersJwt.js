const jwt = require("jsonwebtoken")
const User = require("../Models/userModel")
const Role = require("../Models/roleModel")

const verifyToken = async (req, res, next) =>{
  try{
    const token = req.headers.authorization
    console.log("token", token)

    if(!token) return res.status(403).json({message: "no token provided"})

    const decoded = jwt.verify(token, 'secret')
    req.userId = decoded.id

    const user = await User.findById(req.userId, {password: 0})

    if(!user) return res.status(404).json({message: "no user found"})

    next()
  } catch(err) {
    return res.status(401).json({message: "unauthorized"})
  }
}

const isModerator = async (req, res, next) =>{
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})
  console.log("IS MODERATOR ----------------------", roles[0])

    if(roles[0].name === "moderator"){
      next()
      return
    } 

  return res.status(403).json({messagge: "require moderator rol"})
}

const isAdmin = async (req, res, next) =>{
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})
  console.log("IS ADMIN ----------------------", roles[0])

    if(roles[0].name === "admin"){
      next()
      return
    }
  

  return res.status(403).json({messagge: "require admin rol"})
}

const isModeratorOrAdmin = async (req, res, next) =>{
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})
  console.log("IS ADMIN ----------------------", roles[0])

    if(roles[0].name === "admin" || roles[0].name === "moderator"){
      next()
      return
    }
  

  return res.status(403).json({messagge: "require rol"})
}

module.exports = {verifyToken, isModerator, isAdmin, isModeratorOrAdmin}