const mongoose= require('mongoose')
const Schema= mongoose.Schema

const companySchema= new Schema({
    name: {type: String, required: true},
    logo: String,
    address: {type: String, required: true},
    city: {type: String, required: true},
    telephone: {type: Number, required: true},
    drivers: [{type: Schema.Types.ObjectId, ref: 'Driver'}],
    cars: [{type: Schema.Types.ObjectId, ref: 'Car'}]
}, {timestamps: true})

const Compnay= mongoose.model('Company', companySchema)
module.exports= Compnay
// module.exports.companySchema= companySchema

// {
//     name: {type: String, required: true},
//     age: {type: Number, required: true},
//     image: String
// }

// {
//     name: {type: String, required: true},
//     model: {type: String, required: true},
//     year: {type: Number, required: true},
//     image: String
// }