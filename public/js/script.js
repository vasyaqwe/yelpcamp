const inputs = document.querySelectorAll('.validation-input')
const navToggle = document.querySelector('.nav-toggle')
const nav = document.querySelector('.primary-nav')

inputs.forEach(input => {
    input.addEventListener('invalid', e => {
        input.classList.add('error')
    })
})
const numberInputs = document.querySelectorAll('.input-price')
numberInputs.forEach(input => input.addEventListener('input', (e) => {
    if (e.target.value < 1) {
        e.target.classList.remove('valid')
        e.target.classList.add('error')
    } else if ((e.target.value >= 1)) {
        e.target.classList.remove('error')
        e.target.classList.add('valid')
    }
}))

navToggle.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', !nav.hasAttribute('data-visible'))
    nav.toggleAttribute('data-visible')
})

