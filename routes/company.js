const router= require('express').Router()
const Company= require('../models/company')
const Driver= require('../models/driver')

//---companies
//index
router.get('/', (req, res) => {
    Company.find().then((companies) => {
        res.render('companies/index', {companies})
    }).catch((err) => {
        console.log(err);
    })
})

//new
router.get('/new', (req, res) => {
    Driver.find().then((drivers) => {
       res.render('companies/new', {drivers}) 
    })
})

//post
router.post('/', (req, res) => {

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
router.get('/:id', (req, res) => {
    Company.findById(req.params.id).populate('drivers')
    .then((company) => {
        console.log(company);
        
        res.render('companies/show', {company})
    }).catch((err) => {
        console.log(err);
    })
})

//edit
router.get('/:id/edit', (req, res) => {
    Company.findById(req.params.id).populate('drivers')
    .then((company) => {
        Driver.find().then((drivers) => {
            res.render('companies/edit', {company, drivers})
        })
    })
})

//update
router.put('/:id', (req, res) => {
    let data= {
        name: req.body.name, 
        logo: req.body.logo,
        address: req.body.address,
        city: req.body.city,
        telephone: req.body.telephone,
        drivers: req.body.arrayOfDrivers
    }

    Company.findByIdAndUpdate(req.params.id, {$set: data})
    .then((company) => {
        res.redirect(`/companies/${company._id}`)
    })
})

//delete
router.delete('/:id', (req, res) => {
    Company.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/companies')
    })
})

module.exports= router