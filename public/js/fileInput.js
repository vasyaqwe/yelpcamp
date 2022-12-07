const fileInput = document.querySelector('input[type=file]')
const form = document.querySelector('form')
const fileInputLabel = document.querySelector('.file-input')

fileInput.addEventListener('change', (e) => {
    const files = [...e.target.files].map(file => file.name)
    fileInputLabel.setAttribute('data-content', files.join(', '))
    fileInputLabel.innerText = 'File(s) chosen:'
    fileInputLabel.classList.remove('error')
    fileInputLabel.classList.add('valid')

})
fileInput.addEventListener('invalid', (e) => {
    fileInputLabel.classList.add('error')
})
