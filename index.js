const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('express-jwt')
const cors = require('cors')

const initSetUp = require('./Libs/initialSetUp')
const User = require('./Models/userModel')
const userRouter = require('./Routes/userRouter')(User)
const Hero = require('./Models/heroModel')
const heroRouter = require('./Routes/heroRouter')(Hero)

const app = express()
initSetUp()

const conectDb = async () =>{
  try{
    await mongoose.connect("mongodb://localhost/wiki_heroes_db", {useNewUrlParser: true})
  }
  catch(error){
    throw error
  }
}
conectDb()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
//app.all('/api/*', jwt({secret: 'secret', algorithms: ['HS256']}).unless({path: ['/api/users/login']}))
app.use('/api', userRouter)
app.use('/api', heroRouter)

const port = 8080
app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
