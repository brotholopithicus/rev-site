function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.387, lng: 150.644 },
        zoom: 6
    });
    let infoWindow = new google.maps.InfoWindow({ map });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                let coords = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
                let icon = setIcon('../img/house.png');
                let marker = addMarker({ position: coords, icon }, map);
                infoWindow.setPosition(coords);
                infoWindow.setContent('Location Found');
                map.setCenter(coords);
            },
            () => {
                errorHandler(true, infoWindow, map.getCenter())
            });
    } else {
        errorHandler(false, infoWindow, map.getCenter());
    }

}

function setIcon(path) {
    return {
        url: path,
        scaledSize: new google.maps.Size(28, 28),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(14, 14)
    }
}

function addMarker(feature, map) {
    return new google.maps.Marker({
        position: feature.position,
        icon: feature.icon,
        map
    });
}

function errorHandler(geolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(geolocation ?
        'Error: Geolocation Failed' :
        'Error: Geolocation Not Supported');
}
