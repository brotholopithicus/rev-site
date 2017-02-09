navigator.geolocation.getCurrentPosition(success, error);
const locationList = document.querySelector('.location-list');
const map = L.map('map').setView([39, -98], 4);
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJvdGhvbG9waXRoaWN1cyIsImEiOiJjaXVoM293am8wMHQ0M3BxZm1lMDV6cWN4In0.akjY7P_g6dfE8UZiZoK9Ag').addTo(map);

if (localStorage.stores) {
    storeController();
} else {
    fetch('/api/locations').then(res => {
        res.json().then(stores => {
            localStorage.setItem('stores', JSON.stringify(stores));
            storeController();
        });
    });
}
function success(pos) {
    map.panTo([pos.coords.latitude, pos.coords.longitude]);
    let currentLocation = L.circle([pos.coords.latitude, pos.coords.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map).bindPopup('<b>Current Location</b>').openPopup();
}

function storeController() {
    let stores = JSON.parse(localStorage.getItem('stores'));
    stores.forEach(store => {
        let url = `https://www.google.com/maps/dir//${encodeURIComponent(store.address)}`
        let storeMarker = L
            .marker([store.coords.latitude, store.coords.longitude])
            .addTo(map)
            .bindPopup(`<b>${store.name.toUpperCase()}</b><br />${store.address}<br /><a href='${url}'>Directions</a>`);
        let el = document.createElement('li');
        el.classList.add('storeLocation');
        el.dataset.coords = JSON.stringify(store.coords);
        el.innerHTML = `<div><span class='name'>${store.name}</span><br />${store.address}<br /></div><div><a class='directions' href='${url}'>Directions</a></div>`;
        el.addEventListener('click', storeClickHandler.bind(storeMarker));
        locationList.appendChild(el);
    });
}

function storeClickHandler(e) {
    if (e.target.tagName === 'A') return;
    this.openPopup();
    map.setView([this._latlng.lat, this._latlng.lng], 10);
}

function error() {
    console.log('error');
}
