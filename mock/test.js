const fs = require('fs');
let cart = fs.readFileSync(__dirname + '/cart.json', 'utf8');
cart = JSON.parse(cart);
const product = { name: 'confidant', color: 'magenta', quantity: 4 };

function updateQuantity(query, arr) {
    let filteredCart = arr.filter(item => item.name === query.name && item.color === query.color);
    if (filteredCart.length > 0) {
        parseInt(arr[arr.indexOf(filteredCart[0])].quantity) += parseInt(query.quantity);
    } else {
        arr.push(query);
    }
    return arr;
}

let res = updateQuantity(product, cart);
console.log(res);
