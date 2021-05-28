const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var fs = require('fs');
var path = require('path');
const Role = require('../Models/roleModel')

const userController = (User) =>{

  const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }
  
  const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
  }

  const getUsers = async (req, res) =>{
    try{
      const { query } = req
      const response = await User.find(query).populate('roles')
      console.log(response)
      return res.json(response) 
    } catch(error){
      throw error
    }
  }

  const postUser = async (req, res) => {
    const { body } = req
    const saltingNumber = 10
    const pss = await bcrypt.hash(body.password, saltingNumber)
    try{
      const user = new User({
        ...body,
        password: pss,
        photo: {
          data: fs.readFileSync(path.join(__dirname, + './Storage/Images' + req.file.filename)),
          contentType: 'image/png'
        }
      })
      await user.save()

      return res.status(201).json(user)
    } catch(error){
      throw error
    }
  }

  const getUserById = async (req, res) =>{
    try{
      const{ params } = req
      const response = await User.findById(params.userId)

      return res.json(response)
    } catch(error){
      throw error
    }
  }

  const putUserById = async (req, res) =>{
    try{    
      const { params, body } = req
      const response = await User.findByIdAndUpdate(
        {_id: params.userId}, {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            userName: (() => {
              if(body.lastName && body.firstName){
                return (body.firstName + "." + body.lastName)
              }
              else{
                return body.firstName ? body.firstName : body.lastName
              }
              })(),
            password: body.password,
            email: body.email,
            address: body.address,
            phone: body.phone}
          }, {new: true}) //que hace esta linea?  
      return res.status(202).json(response)
    } catch(error){
      throw error
    }
  }

  const deleteUserById = async(req, res) =>{
    try{
      const { params } = req
      await User.findByIdAndDelete(params.userId)
      return res.status(202).json({message: "El usuario fue eliminado con exito"})
    } catch(error){
      throw error
    }
  }

  const postUserLogIn = async(req, res) =>{
    try{
        const { body } = req
        const response = await User.findOne({userName: body.userName}, function(err,obj) {console.log(obj)})
        
        //console.log("body.password: ", body.password , "response.password: ")
        const isPasswordCorrect = await bcrypt.compare(body.password, response.password)
        if(response != null && isPasswordCorrect){
          const tokenUser = {
            firstName: response.firstName,
            lastName: response.lastName,
            userName: response.userName
          }
          const token = jwt.sign(tokenUser, 'secret')
          return res.status(202).json({message: 'Bienvenido usuario: ' + response.userName, token: token})
        }
        else{
          return res.status(202).json({message: 'Datos invalidos'})
        } 
    } catch(error){
      throw error
    }
  }

  const postUserSingnUp = async (req, res) => {

    console.log("saved user")
    const { body } = req
    const pss = await encryptPassword(body.password)
    
    const newUser = new User({
      ...body,
      password: pss
    })

    if(body.roles){
      const foundRoles = await Role.find({name: {$in: body.roles}})
      newUser.roles = foundRoles.map(role => role._id)
    } else{
      const role = await Role.findOne({name: "user"})
      newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()
    console.log("saved user", savedUser)

    const token = jwt.sign({id: savedUser.id, role: savedUser.roles}, 'secret', {expiresIn: 86400})
    res.status(200).json({token})
  }

  const postUserSingnIn = async (req, res) => {

    const { body } = req
    const userFound = await User.findOne({userName: body.userName}).populate("roles")

    if(!userFound) return res.status(400).json({message: "user not found"})
    console.log ("userfound", userFound)

    const matchPassword = await comparePassword(body.password, userFound.password)

    if(!matchPassword) return res.status(400).json({token: null, message: "invalid password"})
    console.log(userFound)

    const token = jwt.sign({id: userFound._id, role: userFound.roles}, 'secret', {expiresIn: 86400})

    res.json({token: token})
  }


  const GetUserByUserName = async(req, res) =>{
    try{
      const{ params } = req
      const response = await User.find({userName: params.userName})

      return res.json(response)
    } catch(error){
      throw error
    }
  }

  return {getUsers, postUser, getUserById, putUserById, deleteUserById, postUserLogIn, GetUserByUserName, postUserSingnUp, postUserSingnIn}
}

module.exports = userController