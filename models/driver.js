const mongoose= require('mongoose')
const Schema= mongoose.Schema

const driverSchema= new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    image: String,
    cars: [{type: Schema.Types.ObjectId, ref: 'Car'}]
}, {timestamps: true})

const Driver= mongoose.model('Driver', driverSchema)
module.exports= Driver

