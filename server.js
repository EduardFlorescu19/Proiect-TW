const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
// const Sequelize = require('sequelize')

// const sequelize = new Sequelize('task_management_db', 'user', 'parola', {

//     host: 'localhost',
   
//     dialect: 'mysql'
   
//    })

//    equelize.authenticate()

//    .then(() => {
  
//       console.log('Conexiunea la baza de date a reușit!')
  
//    })
  
//    .catch(err => {
  
//       console.error('Conexiunea la baza de date a eșuat:', err)
  
//    })

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/',indexRouter)

app.listen(process.env.PORT || 3000)
