import express from 'express'
const router = express.Router({ mergeParams: true })
import catchAsync from '../utilities/catchAsync.js'
import { validateReview, isLoggedIn, isReviewAuthor } from '../middleware.js'
import { renderNewForm, createReview, deleteReview } from '../controllers/reviews.js'

router.get('/new', isLoggedIn, catchAsync(renderNewForm))
router.post('/', isLoggedIn, validateReview, catchAsync(createReview))

router.route('/:reviewId')
    .delete(isLoggedIn, isReviewAuthor, catchAsync(deleteReview))

export default router