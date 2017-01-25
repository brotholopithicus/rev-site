const fs = require('fs');
const mongoose = require('mongoose');
const Location = require('../models/Store');

mongoose.connect('mongodb://localhost/revelry');

function readWrite() {
    fs.readFile('mock/locations.txt', 'utf8', (err, file) => {
        let locations = file.split('Directions');
        locations = locations.map(location => {
            return location.split('\n');
        });
        locations = locations.map(location => {
            return location.filter((l, i) => l.length > 0);
        });
        locations = locations.map(location => {
            return location.splice(0, location.length - 1);
        });
        locations = locations.map(location => {
            return {
                name: location.slice(0, 1).join(),
                address: location.slice(1, location.length).join(' ')
            }
        });
        fs.writeFile('mock/locations.json', JSON.stringify(locations), (err) => {
            if (err) throw err;
            console.log('done');
        });
    });
}


function seed() {
    fs.readFile('mock/stores.json', 'utf8', (err, file) => {
        if (err) throw err;
        file = JSON.parse(file);
        file.forEach(location => {
            let locObj = {
                name: location.name,
                address: location.address
            }
            let loc = new Location(locObj);
            loc.save();
        });
    });
}

seed();
