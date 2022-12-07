mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: campground.geometry.coordinates,
    zoom: 5
})

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<p>${campground.title}</p>
                <p>${campground.location}</p>
                `
            )
    )
    .addTo(map)