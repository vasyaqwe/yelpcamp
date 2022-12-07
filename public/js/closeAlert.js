const closeBtn = document.querySelector('.close-btn')

if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
        e.target.parentElement.style.display = 'none'
    })
}