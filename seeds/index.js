const mongoose = require('mongoose')
const campground = require('../models/campground')
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelpcamp')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
    console.log('Database connected.')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)] 

const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i = 0; i < 50; i++) {
        const rand = Math.floor(Math.random() * 1000)
        await new Campground({
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        }).save()
    }
}

console.log('Seeding started.')
seedDB().then(() => {
    mongoose.connection.close()
    console.log('Seeding finished. \nConnection closed.')
})