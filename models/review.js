import mongoose from 'mongoose'
const { Schema } = mongoose

const ReviewSchema = new Schema({
    body: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
})


export default mongoose.model('Review', ReviewSchema)
