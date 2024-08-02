const crypto = require('crypto');

const hashSHA1 = (input) => {
    return crypto.createHash('sha1').update(input).digest('hex');
};

const input = 'Olá, mundo!';
const hashed = hashSHA1(input);
console.log(`Hashed: ${hashed}`);
