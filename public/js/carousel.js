const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')
const carouselItems = [...document.querySelectorAll('.carousel-item')]
let currentImgIndex = 0

if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
        currentImgIndex === 0 ? currentImgIndex = carouselItems.length - 1 : currentImgIndex -= 1
        carouselItems.forEach(item => item.setAttribute('data-active', false))
        carouselItems.find(item => parseFloat(item.dataset.index) === currentImgIndex).setAttribute('data-active', true)
    })
    btnNext.addEventListener('click', () => {
        currentImgIndex === carouselItems.length - 1 ? currentImgIndex = 0 : currentImgIndex += 1
        carouselItems.forEach(item => item.setAttribute('data-active', false))
        carouselItems.find(item => parseFloat(item.dataset.index) === currentImgIndex).setAttribute('data-active', true)
    })
}