import mongoose from 'mongoose'
import Review from './review.js'
const { Schema } = mongoose

const ImageSchema = new Schema({
    url: String, filename: String
})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_250')
})
const options = { toJSON: { virtuals: true } }
const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    createdAt: { type: Date, default: Date.now },
    description: String,
    location: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    reviews: [{ type: Schema.Types.ObjectID, ref: "Review" }]
}, options)
CampgroundSchema.virtual('properties.popupContent').get(function () {
    return `<a href="/campgrounds/${this._id}">${this.title}</a>`
})
CampgroundSchema.post('findOneAndDelete', async (campground) => {
    if (campground) {
        await Review.remove({ _id: { $in: campground.review } })
    }
})

export default mongoose.model('Campground', CampgroundSchema)