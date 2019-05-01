const router= require('express').Router()
const Car= require('../models/car')

//--cars
//index
router.get('/', (req, res) => {
    Car.find().then((cars) => {
        res.render('cars/index', {cars})    
    })
})

//new
router.get('/new', (req, res) => {
    res.render('cars/new')
})

//post
router.post('/', (req, res) => {
    let car= new Car(req.body)
    car.save()
    .then(() => {
        res.redirect('/cars')
    })
})

//show
router.get('/:id', (req, res) => {
    Car.findById(req.params.id).then((car) => {
        res.render('cars/show', {car})
    }).catch((err) => {
        console.log(err); 
    })
})

//edit
router.get('/:id/edit', (req, res) => {
    Car.findByIdAndUpdate(req.params.id)
    .then((car) => {
        res.render('cars/edit', {car})
    })
})

//update
router.put('/:id', (req, res) => {
    console.log(req.body);
    
    Car.findByIdAndUpdate(req.params.id, req.body)
    .then((car) => {
        res.redirect(`/cars/${car._id}`)
    })
})

//delete
router.delete('/:id', (req, res) => {
    Car.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/cars')
    })
})

module.exports= router