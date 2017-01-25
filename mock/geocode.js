const fs = require('fs');
const NodeGeocoder = require('node-geocoder');
const geocoder = require('geocoder');

const options = {
    provider: 'google'
}

// const geocoder = NodeGeocoder(options);

fs.readFile('mock/stores.json', 'utf8', (err, file) => {
    if (err) throw err;
    let parsed = JSON.parse(file);
    let result = parsed.map(location => {
        geocoder.geocode(location.address, (err, res) => {
            if (err) throw err;
            console.log(res);
            return {
                name: location.name,
                address: location.address,
                coords: {
                    lat: top.latitude,
                    lon: top.longitude
                }
            }
        });
    });
});
