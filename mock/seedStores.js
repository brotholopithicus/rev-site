const fs = require('fs');
const mongoose = require('mongoose');
const Store = require('../models/Store');

mongoose.connect('mongodb://localhost/revelry');

fs.readFile(__dirname + '/formatted.json', 'utf8', (err, file) => {
    if (err) throw err;
    let stores = JSON.parse(file);
    stores.forEach(store => {
        let newStore = new Store(store);
        newStore.save(err => {
            if (err) throw err;
            console.log('saved!');
        });
    });
});
