const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var fs = require('fs');
var path = require('path');

const userController = (User) =>{
  const getUsers = async (req, res) =>{
    try{
      const { query } = req
      const response = await User.find(query)
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
<<<<<<< HEAD
        password: pss,
        photo: {
          data: fs.readFileSync(path.join(__dirname, + './Storage/Images' + req.file.filename)),
          contentType: 'image/png'
        }
=======
        /*firstName: body.firstName,
        lastName: body.lastName,*/
        password: pss,
        /*phone: body.phone.toString(),
        email: body.email,
        address: body.address,
        phone: body.phone,*/
        userName:(() => {
          if(body.lastName && body.firstName){
            return (body.firstName + "." + body.lastName)
          }
          else{
            return body.firstName ? body.firstName : body.lastName
          }
          })(),
>>>>>>> a82bcae9953a600bd167e16b842045c65d2267cb
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
        
        console.log("body.password: ", body.password , "response.password: ")
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

  const GetUserByUserName = async(req, res) =>{
    try{
      const{ params } = req
      const response = await User.find({userName: params.userName})

      return res.json(response)
    } catch(error){
      throw error
    }
  }

  return {getUsers, postUser, getUserById, putUserById, deleteUserById, postUserLogIn, GetUserByUserName}
}

module.exports = userController