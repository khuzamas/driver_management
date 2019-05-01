const router= require('express').Router()
const Driver= require('../models/driver')
const Car= require('../models/car')

//---drivers
//index
router.get('/', (req, res) => {
    Driver.find().then((drivers) => {
        res.render('drivers/index', {drivers})
    })
})

//new
router.get('/new', (req, res) => {
    Car.find().then((cars) => {
       res.render('drivers/new', {cars}) 
    })
})

//post
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
    Driver.findById(req.params.id).populate('cars')
    .then((driver) => {
        res.render('drivers/show', {driver})
    }).catch((err) => {
        console.log(err);
    })
})

//delete
router.delete('/:id', (req, res) => {
    Driver.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/drivers')
    })
})

module.exports= router