module.exports = function(coordOne, coordTwo, radius = 6371) {
    let deltalatitude = toRad(coordTwo.latitude - coordOne.latitude);
    let deltalongitude = toRad(coordTwo.longitude - coordOne.longitude);
    let a = Math.pow(Math.sin(deltalatitude / 2), 2) +
        Math.cos(toRad(coordOne.latitude)) *
        Math.cos(toRad(coordTwo.latitude)) *
        Math.pow(Math.sin(deltalongitude / 2), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let kilometersPerMile = 0.621371192;
    return radius * c * kilometersPerMile;
}

function toRad(num) {
    return num * Math.PI / 180;
}
