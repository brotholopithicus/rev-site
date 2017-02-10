const locationList = document.querySelector('.location-list');

navigator.geolocation.getCurrentPosition(success, error);

function success(pos) {
    let userCoords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
    }
    let homeIcon = L.icon({
        iconUrl: '../img/house.png',
        iconSize: [24, 24],
        iconAnchor: [12, 0]
    });

    let userLocation = L.marker([userCoords.latitude, userCoords.longitude], { icon: homeIcon }).addTo(map).bindPopup('<h6>Current Location</h6>');

    sortLocationsByProximity(userCoords)
        .then(
            (response) => {
                updateLocationListView(response);
            },
            (error) => {
                console.log(error);
            });

}

function error(err) {

}

function updateLocationListView(stores) {
    let spinner = document.querySelector('div.fading-circle');
    locationList.removeChild(spinner);
    let storeIcon = L.icon({
        iconUrl: '../img/logo.svg',
        iconSize: [24, 24],
        iconAnchor: [12, 0]
    });

    stores.forEach(store => {
        let url = `https://www.google.com/maps/dir//${encodeURIComponent(store.address)}`;
        let storeMarker = L.marker([store.coords.latitude, store.coords.longitude], { icon: storeIcon })
            .addTo(map)
            .bindPopup(
                `<b>${store.name.toUpperCase()}</b><br />
              ${store.address}<br />
              ${store.distance} miles<br />
              <a href='${url}'>Directions</a>`
            );
        let el = document.createElement('li');
        el.classList.add('storeLocation');
        el.innerHTML = `<div><span class='name'>${store.name}</span><br />${store.address}<br />${parseFloat(store.distance).toFixed(1)} miles<br /></div><div><a class='directions' href='${url}'>Directions</a></div>`;

        el.addEventListener('click', locationClickHandler.bind(storeMarker));
        locationList.appendChild(el);
    });
}

const map = L.map('map').setView([39, -98], 4);
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJvdGhvbG9waXRoaWN1cyIsImEiOiJjaXVoM293am8wMHQ0M3BxZm1lMDV6cWN4In0.akjY7P_g6dfE8UZiZoK9Ag').addTo(map);

function sortLocationsByProximity(coords) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', '/api/locations');
        request.setRequestHeader('Content-Type', 'application/json');
        request.responseType = 'json';
        request.onload = () => {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(Error(`Location Data Didn't Load Correctly. Code: ${request.statusText}`));
            }
        }
        request.onerror = () => reject(Error('Network Error'));
        request.send(JSON.stringify(coords));
    });
}

function locationClickHandler(e) {
    if (e.target.tagName === 'A') return;
    map.setView([this._latlng.lat, this._latlng.lng], 4, { animate: true, duration: 0.4 });
    this.openPopup();
}
