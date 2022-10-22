function getShopLatitudeAndLongitude(){
    let article = document.getElementById('coffee-shop')
    return {
        "latitude": article.getAttribute('latitude'),
        "longitude": article.getAttribute('longitude')
    }
}

const latAndLon = getShopLatitudeAndLongitude()

window.addEventListener('map:init', function (e) {
    var detail = e.detail;
    L.marker([latAndLon.latitude, latAndLon.longitude]).addTo(detail.map);
}, false);