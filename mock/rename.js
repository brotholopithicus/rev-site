const fs = require('fs');

fs.readdir(__dirname + '/img/escort', (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (file.split('').includes('-')) {
            let newFile = file.replace('-', '_');
            fs.rename(__dirname + '/img/escort/' + file, __dirname + '/img/escort/' + newFile, err => {
                if (err) throw err;
                console.log('done');
            });
        }
    });
});
