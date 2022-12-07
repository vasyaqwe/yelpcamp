import Review from '../models/review.js'
import Campground from '../models/campground.js'

export const renderNewForm = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', "This campground doesn't exist.")
        return res.redirect('/campgrounds/page/1')
    }
    res.render('reviews/new', { campground })
}
export const createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user._id
    campground.reviews = [...campground.reviews, review]
    await review.save()
    await campground.save()
    req.flash('success', 'Created a new review!')
    res.redirect(`/campgrounds/${req.params.id}`)
}

export const deleteReview = async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted a review!')
    res.redirect(`/campgrounds/${id}`)
}