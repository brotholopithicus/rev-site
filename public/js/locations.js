const locationList = document.querySelector('.location-list');
fetch('/api/locations').then(res => {
    res.json().then(locations => {
        locations.forEach(location => {
            let el = document.createElement('li');
            el.textContent = location.name;
            locationList.appendChild(el);
        });
    });
});

function initializeMap() {
    var uluru = { lat: -25.363, lng: 131.044 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
