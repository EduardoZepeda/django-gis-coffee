import 'vite/modulepreload-polyfill'

function getShopLatitudeAndLongitude(){
    let article = document.getElementById('coffee-shop')
    return {
        "latitude": article.getAttribute('latitude'),
        "longitude": article.getAttribute('longitude')
    }
}

function getLikedValue() {
    let liked = document.getElementById('liked').getAttribute('liked')
    return liked === 'true' ? true : false
}

function getShopId() {
    let id = document.getElementById('liked').getAttribute('shop-id')
    return parseInt(id)
}

function setLikedValue(value) {
    document.getElementById('liked').setAttribute('liked', value)
}

function toggleHeartIcon() {
    // Toggles the solid color and the empty color heart version 
    document.getElementById('like-icon').setAttribute('data-prefix', getLikedValue() ? 'fas' : 'far')
}

function increaseOrDecreaseCounter(liked) {
    let likesCounter = document.getElementById('likes-count')
    let numberOfLikes = parseInt(likesCounter.textContent)
    likesCounter.textContent = numberOfLikes + (liked ? 1 : -1)
}

// csrf is provided by Django backend
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
const latAndLon = getShopLatitudeAndLongitude()

window.addEventListener('map:init', function (e) {
    var detail = e.detail;
    L.marker([latAndLon.latitude, latAndLon.longitude]).addTo(detail.map);
}, false);
// Url is generated using django template system
let url = '/shops/like/'

let waitingResponse = false

document.addEventListener("DOMContentLoaded", function(event) {
    liked.onclick = async () => {
        if (waitingResponse) {
            return
        }
        waitingResponse = true
        let setLike = getLikedValue()
        let shopId = getShopId()
        let request = new Request(
            url,
            {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                    // Backend requires the HTTP request to be made asynchronously
                    'X-Requested-With': 'XMLHttpRequest',
                },
                mode: 'same-origin',
                body: JSON.stringify({ liked: setLike, id: shopId })
            }
        )
        try {
            const response = await fetch(request)
            const data = await response.json()
            setLikedValue(data.liked)
            toggleHeartIcon()
            increaseOrDecreaseCounter(data.liked)
            waitingResponse = false
        } catch (err) {
            console.error(err)
            waitingResponse = false
        }
    }
})
