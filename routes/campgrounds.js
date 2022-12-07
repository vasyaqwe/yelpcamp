import express from 'express'
const router = express.Router()
import catchAsync from '../utilities/catchAsync.js'
import { validateCampground, isLoggedIn, isCampgroundAuthor } from '../middleware.js'
import { paginate, renderNewCampgroundForm, createCampground, renderDetails, renderEditForm, editCampground, deleteCampground } from '../controllers/campgrounds.js'
import multer from 'multer'
import { storage } from '../cloudinary/index.js'
const upload = multer({ storage })

router.route('/')
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(createCampground))

router.get('/page/:page', catchAsync(paginate))

router.get('/new', isLoggedIn, catchAsync(renderNewCampgroundForm))

router.route('/:id')
    .get(catchAsync(renderDetails))
    .put(isLoggedIn, isCampgroundAuthor, upload.array('image'), validateCampground, catchAsync(editCampground))
    .delete(isLoggedIn, isCampgroundAuthor, catchAsync(deleteCampground))

router.get('/:id/edit', isLoggedIn, isCampgroundAuthor, catchAsync(renderEditForm))

export default router