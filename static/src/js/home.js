import 'vite/modulepreload-polyfill'

window.addEventListener("map:init", function (e) {
    var detail = e.detail;
    let map = detail.map
    L.control.scale().addTo(map);
    // Detect first interaction
    let firstClick = true
    let currentPosition
    let location
    // keep a record of fetched data
    let items = []
    // keep a record of map's markers
    let markers = []
    let distanceInput = document.getElementById('distance')
    let distanceValue = document.getElementById('distanceValue')
    distanceInput.addEventListener('change', handleDistanceValue)

    function handleDistanceValue(event) {
        distanceValue.innerText = distanceInput.value
    }

    function generateFontAwesomestars(rating) {
        const fullStars = `<i class="fa-solid fa-star"></i>`.repeat(~~rating)
        const halfStars = rating % 1 === 0.5 ? `<i class="fa-solid fa-star-half-stroke"></i>` : ''
        return fullStars + halfStars
    }

    function renderMarkers() {
        items.forEach((item, i) => {
            var LamMarker = new L.marker([items[i].lat, items[i].lng], {
                icon: new L.DivIcon({
                    className: 'marker-icon',
                    html: `<img src="static/leaflet/images/marker-icon.png" class="leaflet-marker-icon" alt="" tabindex="0" style="margin-left:-12px; margin-top:-41px; width:25px; height:41px; z-index:318;" >` +
                        `<a class="link" href="/shops/${items[i].id}"><span class="shop-tag">${items[i].name}
                            ${items[i].address ? `</br><small>${items[i].address}</small>` : ""}
                            ${items[i].rating !== 0 ? `</br><small>${generateFontAwesomestars(items[i].rating)}</small>` : ""}
                        </span></a>`
                })
            });
            markers.push(LamMarker);
            map.addLayer(markers[i]);
        })
    }

    function removeMarkersFromMap() {
        markers.forEach((marker, i) => {
            map.removeLayer(markers[i]);
        })
    }

    function fetchDataAndRender() {
        // Return click event listener
        setTimeout(function () {
            map.on('click', listenToClickOnMap);
        }, 10);
        const LatLng = location.getLatLng()

        fetch(`shops/@${LatLng.lat},${LatLng.lng},${distanceInput.value}/`).then(response => response
            .json()).then(response => {
            removeMarkersFromMap()
            markers = []
            items = response.features.map(function (item) {
                return {
                    "id": item.properties.pk,
                    "name": item.properties.name,
                    "address": item.properties.address,
                    "rating": parseFloat(item.properties.rating),
                    "lat": item.geometry.coordinates[1],
                    "lng": item.geometry.coordinates[0],
                }
            })
            renderMarkers()
            map.flyTo([LatLng.lat, LatLng.lng], 15)
        })
    }


    function setClickedLocation(latlng) {
        removeMarkersFromMap()
        location = new L.Marker(latlng, {
            draggable: true
        });
        map.addLayer(location);
        fetchDataAndRender()
        location.bindPopup("<b>Your location</b><br />Drag me").openPopup();
        location.addEventListener('dragstart', function (e) {
            // Remove click event listener when drag start
            map.off('click', listenToClickOnMap);
        });
        location.addEventListener('dragend', fetchDataAndRender);
        location.addTo(map);
    }

    function setUserGeolocation(pos) {
        let crd = pos.coords
        // changeCurrentPosition to user location
        currentPosition = {
            "lat": crd.latitude,
            "lng": crd.longitude
        }
        setClickedLocation(currentPosition)
    }

    function listenToClickOnMap(e) {
        // default current position is where clicked was captured
        if (firstClick) {
            navigator.geolocation.getCurrentPosition(setUserGeolocation, function () {
                setClickedLocation(e.latlng)
            })
            firstClick = false
            return
        }
        if (location) {
            // guarantees that only one marker exists at a time
            map.removeLayer(location)
        }
        setClickedLocation(e.latlng)
    }
    map.on("click", listenToClickOnMap);
}, false);