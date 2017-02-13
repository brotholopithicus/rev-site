const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (err, contents) => {
    contents.forEach(item => {
        let itemPath = path.resolve(__dirname, item);
        fs.stat(itemPath, (err, stats) => {
            if (stats.isDirectory()) {
                fs.readdir(itemPath, (err, contents) => {
                    contents.forEach(item => {
                        let a = item.match(/([A-Z])\w+/g);
                        if (a && a[0].slice(0, 1) === 'L') {
                            let color = a[0].slice(a[0].length - 2);
                            let newPath = `${itemPath}/${getColorName(color)}.jpeg`;
                            fs.rename(path.resolve(itemPath, item), newPath, () => {
                              console.log('old: ', itemPath + '/' + item);
                              console.log('new: ', newPath);
                            });
                        }
                    });
                })
            }
        });
    });
});

function getColorName(color) {
    switch (color) {
        case 'BK':
            return 'black';
            break;
        case 'GB':
            return 'light-grey';
            break;
        case 'GR':
            return 'green';
            break;
        case 'HG':
            return 'crosshatch-grey';
            break;
        case 'NB':
            return 'navy-blue';
            break;
        case 'SB':
            return 'striped-grey';
            break;
        default:
            console.log('hwat?>>?');
            break;
    }
}
