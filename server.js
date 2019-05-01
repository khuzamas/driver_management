require('dotenv').config()
const express= require('express')
const app= express()
const port= process.env.PORT
const mongoose= require('mongoose')
const Company= require('./models/company')
const Driver= require('./models/driver')
const Car= require('./models/car')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://localhost:27017/driver_management', {useNewUrlParser: true}).then(() => {
    console.log('mongodb running');
}, (err) => console.log(err))

//---companies
//index
app.get('/companies', (req, res) => {
    Company.find().then((companies) => {
        res.render('companies/index', {companies})
    }).catch((err) => {
        console.log(err);
    })
})

//new
app.get('/companies/new', (req, res) => {
    Driver.find().then((drivers) => {
       res.render('companies/new', {drivers}) 
    })
})

//post
app.post('/companies', (req, res) => {

    let company= new Company(req.body)

    if (Array.isArray(req.body.arrayOfDrivers)) {
        req.body.arrayOfDrivers.forEach((driverId) => {
            company.drivers.push(driverId)
        })
    } else {
        company.drivers.push(req.body.arrayOfDrivers)
    }

    company.save().then(() => {
        res.redirect('/companies')
    }).catch((err) => {
        console.log(err);   
    })
})

//show
app.get('/companies/:id', (req, res) => {
    Company.findById(req.params.id).populate('drivers')
    .then((company) => {
        console.log(company);
        
        res.render('companies/show', {company})
    }).catch((err) => {
        console.log(err);
    })
})

//---drivers
//index
app.get('/drivers', (req, res) => {
    Driver.find().then((drivers) => {
        res.render('drivers/index', {drivers})
    })
})

//new
app.get('/drivers/new', (req, res) => {
    Car.find().then((cars) => {
       res.render('drivers/new', {cars}) 
    })
})

//post
app.post('/drivers', (req, res) => {
    console.log(req.body);
    
    let driver= new Driver(req.body)

    if (Array.isArray(req.body.arrayOfCars)) {
        req.body.arrayOfCars.forEach((carId) => {
            driver.cars.push(carId)
        })
    } else {
        driver.cars.push(req.body.arrayOfCars)
    }

    driver.save()
    .then(() => {
        res.redirect('/drivers')
    })
})

//show
app.get('/drivers/:id', (req, res) => {
    Driver.findById(req.params.id).populate('cars')
    .then((driver) => {
        res.render('drivers/show', {driver})
    }).catch((err) => {
        console.log(err);
    })
})

//--cars
//index
app.get('/cars', (req, res) => {
    Car.find().then((cars) => {
        res.render('cars/index', {cars})    
    })
})

//new
app.get('/cars/new', (req, res) => {
    res.render('cars/new')
})

//post
app.post('/cars', (req, res) => {
    let car= new Car(req.body)
    car.save()
    .then(() => {
        res.redirect('/cars')
    })
})

//show
app.get('/cars/:id', (req, res) => {
    Car.findById(req.params.id).then((car) => {
        res.render('cars/show', {car})
    }).catch((err) => {
        console.log(err); 
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`); 
})

