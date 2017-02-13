module.exports = function(data) {
    let binaryData = '';
    let bytes = Uint8Array.from(data);
    for (let i = 0; i < bytes.byteLength; i++) {
        binaryData += String.fromCharCode(bytes[i]);
    }
    return binaryData;
}
