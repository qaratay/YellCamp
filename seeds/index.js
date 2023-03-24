const mongoose = require('mongoose')
const campground = require('../models/campground')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelpcamp')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
    console.log('Database connected.')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const rand = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        await new Campground({
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quasi et doloribus pariatur distinctio reiciendis quas, eum vero maiores nobis vel officia odio eaque suscipit architecto minus. Reiciendis, excepturi. Ducimus.',
            price: price
        }).save()
    }
}

console.log('Seeding started.')
seedDB().then(() => {
    mongoose.connection.close()
    console.log('Seeding finished. \nConnection closed.')
})