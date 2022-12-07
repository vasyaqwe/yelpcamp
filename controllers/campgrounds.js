import Campground from '../models/campground.js'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js'
import { cloudinary } from '../cloudinary/index.js'
import { escapeRegex } from '../utilities/escapeRegex.js'
const mbxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({ accessToken: mbxToken })

export const paginate = async (req, res) => {
    const perPage = 6
    const page = req.params.page
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi')
        const campgrounds = await Campground.find({ title: regex })
        res.render('campgrounds/index', { campgrounds, hasPages: false })
    } else {
        Campground.find({})
            .skip(perPage * page)
            .limit(perPage)
            .exec((err, campgrounds) => {
                if (err) return next(err.message)
                Campground.count().exec((err, count) => {
                    if (err) return next(err.message)
                    res.render('campgrounds/index', { campgrounds, pages: count / perPage, currentPage: req.params.page, hasPages: true })
                })
            })
    }
}
export const renderNewCampgroundForm = async (req, res) => {
    res.render('campgrounds/new')
}

export const createCampground = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    // handle errors, flash a message maybe
    const campground = new Campground(req.body.campground)
    campground.geometry = geoData.body.features[0].geometry
    campground.images = req.files.map(file => ({ url: file.path, filename: file.filename }))
    campground.author = req.user._id
    await campground.save()
    req.flash('success', 'Successfully added a new campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}
export const renderDetails = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: { path: 'author' }
    }).populate('author')
    if (!campground) {
        req.flash('error', 'Cannot find that campground:(')
        return res.redirect('/campgrounds/page/1')
    }
    res.render('campgrounds/details', { campground })
}
export const renderEditForm = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground:(')
        return res.redirect('/campgrounds/page/1')
    }
    res.render('campgrounds/edit', { campground })
}
export const editCampground = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) await cloudinary.uploader.destroy(filename)
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    campground.images.push(...req.files.map(file => ({ url: file.path, filename: file.filename })))
    await campground.save()
    req.flash('success', 'Successfully updated campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}
export const deleteCampground = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted campground!')
    res.redirect('/campgrounds/page/1')
}