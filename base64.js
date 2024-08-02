const encodeBase64 = (input) => {
    return Buffer.from(input).toString('base64');
};

const decodeBase64 = (input) => {
    return Buffer.from(input, 'base64').toString('utf-8');
};

const input = 'Olá, mundo!';
const encoded = encodeBase64(input);
console.log(`Encoded: ${encoded}`);

const decoded = decodeBase64(encoded);
console.log(`Decoded: ${decoded}`);
