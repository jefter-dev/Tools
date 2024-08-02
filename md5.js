const crypto = require('crypto');

const hashMD5 = (input) => {
    try {
        if (typeof input !== 'string') {
            throw new TypeError('Input must be a string');
        }
        return crypto.createHash('md5').update(input).digest('hex');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error; // Re-throw the error after logging it
    }
};

const input = 'Olá, mundo!';
try {
    const hashed = hashMD5(input);
    console.log(`Hashed: ${hashed}`);
} catch (error) {
    console.error(`Failed to hash input: ${error.message}`);
}
