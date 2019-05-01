require('dotenv').config()
const express= require('express')
const app= express()
const port= process.env.PORT
const mongoose= require('mongoose')
const methodOverride = require('method-override')

const companyRoutes= require('./routes/company')
const driverRoutes= require('./routes/driver')
const carRoutes= require('./routes/car')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use('/companies', companyRoutes)
app.use('/drivers', driverRoutes)
app.use('/cars', carRoutes)

mongoose.connect('mongodb://localhost:27017/driver_management', {useNewUrlParser: true}).then(() => {
    console.log('mongodb running');
}, (err) => console.log(err))

app.listen(port, () => {
    console.log(`listening on port ${port}`); 
})

