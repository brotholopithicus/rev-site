navigator.geolocation.getCurrentPosition(success, error);
const locationList = document.querySelector('.location-list');
const map = L.map('map').setView([39, -98], 4);
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJvdGhvbG9waXRoaWN1cyIsImEiOiJjaXVoM293am8wMHQ0M3BxZm1lMDV6cWN4In0.akjY7P_g6dfE8UZiZoK9Ag').addTo(map);

function success(pos) {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    getSortedLocations({ latitude, longitude });
    localStorage.setItem('location', JSON.stringify({ latitude, longitude }));
    map.panTo([latitude, longitude]);
    let homeIcon = L.icon({
        iconUrl: '../img/house.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [-1, -16]
    })
    let currentLocation = L.marker([latitude, longitude], { icon: homeIcon }).addTo(map).bindPopup('<b>Current Location</b>').openPopup();
}

function storeController(stores) {
    stores = stores || JSON.parse(localStorage.getItem('stores'));
    stores.forEach(store => {
        let url = `https://www.google.com/maps/dir//${encodeURIComponent(store.address)}`
        let storeMarker = L
            .marker([store.coords.latitude, store.coords.longitude])
            .addTo(map)
            .bindPopup(`<b>${store.name.toUpperCase()}</b><br />${store.address}<br />${store.distance} miles<br /><a href='${url}'>Directions</a>`);
        let data = { store, storeMarker };
        storeMarker.addEventListener('click', storeClickHandler.bind(data));
        let el = document.createElement('li');
        el.classList.add('storeLocation');
        el.dataset.latitude = store.coords.latitude;
        el.dataset.longitude = store.coords.longitude;
        el.innerHTML = `<div><span class='name'>${store.name}</span><br />${store.address}<br />${parseFloat(store.distance).toFixed(1)} miles<br /></div><div><a class='directions' href='${url}'>Directions</a></div>`;
        el.addEventListener('click', storeClickHandler.bind(data));
        locationList.appendChild(el);
    });
}

let polyline;

function storeClickHandler(e) {
    if (e.target.tagName === 'A') return;
    let userCoords = JSON.parse(localStorage.getItem('location'));
    let arr = [
        [userCoords.latitude, userCoords.longitude],
        [this.store.coords.latitude, this.store.coords.longitude]
    ];
    if (polyline) {
        polyline.removeFrom(map);
    }
    polyline = L.polyline(arr, { color: 'red' }).addTo(map);
    this.storeMarker.openPopup();
    map.fitBounds(polyline.getBounds());
}

function error() {
    console.log('error');
}

function getSortedLocations(coords) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/locations');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            storeController(data);
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(coords));
}
