const fs = require('fs');
fs.readFile(__dirname + '/formatted.json', 'utf8', (err, file) => {
  if(err) throw err;
  let stores = JSON.parse(file);
  console.log(stores.length);
})
