import connectDB from '../db.js'
import cities from './cities.js'
import Campground from '../models/campground.js'
import { places, descriptors } from './seedHelpers.js'
import { shuffleArray } from '../utilities/shuffleArray.js'
import mongoose from 'mongoose'
connectDB()

const randItem = arr => arr[Math.floor(Math.random() * arr.length)]
const images = [{
    url: 'https://res.cloudinary.com/ded46afxw/image/upload/v1670349141/YelpCamp/Calagus_Islands_geczdt.jpg',
    filename: 'YelpCamp/Calagus_Islands_geczdt'
},
{
    url: 'https://res.cloudinary.com/ded46afxw/image/upload/v1670349136/YelpCamp/Buloy_Springs_pavd2s.jpg',
    filename: 'YelpCamp/Buloy_Springs_pavd2s'
},
{
    url: 'https://res.cloudinary.com/ded46afxw/image/upload/v1670349134/YelpCamp/Onay_Beach_uyxpeo.jpg',
    filename: 'YelpCamp/Onay_Beach_uyxpeo'
}]

const seedDB = async () => {
    await Campground.deleteMany({})

    const campgrounds = [...Array(15)].map((num, i) => {
        const randNum = Math.floor(Math.random() * 1000)
        return {
            author: "63906ce8a3b6fba8b565cc46",
            location: `${cities[randNum].city}, ${cities[randNum].state}`,
            title: `${randItem(descriptors)} ${randItem(places)}`,
            geometry: { type: "Point", coordinates: [cities[randNum].longitude, cities[randNum].latitude] },
            images: shuffleArray(images),
            price: 9.99,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, sapiente exercitationem error distinctio quae labore perferendis perspiciatis at doloribus possimus cupiditate optio ullam ut suscipit! Eius cumque harum obcaecati dicta.'
        }
    })
    await Campground.insertMany(campgrounds).then(res => console.log(res))
}

seedDB().then(() => mongoose.connection.close())