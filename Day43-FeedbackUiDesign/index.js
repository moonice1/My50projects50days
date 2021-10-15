const ratings = document.querySelectorAll('.rating')
const ratingsContainer = document.querySelector('.ratings-container')
const sendBtn = document.querySelector('#send')
const panel = document.querySelector('#panel')
let selectedRating = 'Satisfied'

// ratingsContainer.addEventListener('click', (e) => {
//     if (e.target.parentNode.classList.contains('rating')) {
//         removeActive()
//         e.target.parentNode.classList.add('active')
//         selectedRating = e.target.nextElementSibling.innerHTML
//     }
// })


// 解决原来的仅在点击表情图片时正确反馈的问题
ratings.forEach(rating => {
    rating.addEventListener('click', () => {
        removeActive()
        rating.classList.add('active')
        selectedRating = rating.children[1].innerHTML
    })
})

sendBtn.addEventListener('click', (e) => {
    panel.innerHTML = `
        <i class="fas fa-heart"></i>
        <strong>Thank You!</strong>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <p>We'll use your feedback to improve our customer support</p>
    `
})

function removeActive() {
    for (let i = 0; i < ratings.length; i++) {
        ratings[i].classList.remove('active')
    }
}