// const fs = require('fs');
// fs.readFile(__dirname + '/img/continental/black.jpg', (err, file) => {
//     fs.writeFile('./image_orig.jpg', file, (err) => {
//         if (err) throw err;
//         console.log('saved!');
//     });
//     let base64Image = file.toString('base64');
//     console.log(base64Image);
//     let decodedImage = new Buffer(base64Image, 'base64');
//     fs.writeFile('./image_decoded.jpg', decodedImage, (err) => {
//         if (err) throw err;
//         console.log('saved!');
//     });
// });

function err(error) {
    console.log(error);
}
let a = !true;
err(a ? a : new Error('askdjaslk'));
