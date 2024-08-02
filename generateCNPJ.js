class InvalidCNPJLengthError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidCNPJLengthError";
    }
}

class InvalidCNPJFormatError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidCNPJFormatError";
    }
}

class CNPJAllDigitsSameError extends Error {
    constructor(message) {
        super(message);
        this.name = "CNPJAllDigitsSameError";
    }
}

function generateCNPJ() {
    function generateDigit(partialCnpj) {
        let sum = 0;
        let weight = partialCnpj.length - 7;
        const weightSequence = [6, 5, 4, 3, 2, 9, 8, 7];

        for (let i = 0; i < partialCnpj.length; i++) {
            sum += partialCnpj[i] * weight--;
            if (weight < 2) weight = 9;
        }

        let remainder = sum % 11;
        return (remainder < 2) ? 0 : 11 - remainder;
    }

    let cnpj = '';
    for (let i = 0; i < 12; i++) {
        cnpj += Math.floor(Math.random() * 10);
    }

    let digit1 = generateDigit(cnpj);
    cnpj += digit1;
    let digit2 = generateDigit(cnpj);
    cnpj += digit2;

    return cnpj;
}

function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, ''); // Remove all non-numeric characters

    if (cnpj.length !== 14) {
        throw new InvalidCNPJLengthError('CNPJ length is not 14 digits');
    }

    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cnpj)) {
        throw new CNPJAllDigitsSameError('CNPJ has all digits the same');
    }

    function calculateDigit(partialCnpj) {
        let sum = 0;
        let weight = partialCnpj.length - 7;
        const weightSequence = [6, 5, 4, 3, 2, 9, 8, 7];

        for (let i = 0; i < partialCnpj.length; i++) {
            sum += partialCnpj[i] * weight--;
            if (weight < 2) weight = 9;
        }

        let remainder = sum % 11;
        return (remainder < 2) ? 0 : 11 - remainder;
    }

    const partialCnpj = cnpj.slice(0, 12);
    const digit1 = calculateDigit(partialCnpj);
    const digit2 = calculateDigit(partialCnpj + digit1);

    return cnpj === partialCnpj + digit1 + digit2;
}

function formatCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, ''); // Remove all non-numeric characters

    if (cnpj.length !== 14) {
        throw new InvalidCNPJFormatError('Invalid CNPJ');
    }

    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

try {
    const cnpj = generateCNPJ();
    const formattedCnpj = formatCNPJ(cnpj);
    
    console.log("CNPJ: ", cnpj);
    console.log("Formatted CNPJ: ", formattedCnpj);
    console.log("Valid: ", validateCNPJ(cnpj));
} catch (error) {
    if (error instanceof InvalidCNPJLengthError) {
        console.error("Length Error: ", error.message);
    } else if (error instanceof InvalidCNPJFormatError) {
        console.error("Format Error: ", error.message);
    } else if (error instanceof CNPJAllDigitsSameError) {
        console.error("Same Digits Error: ", error.message);
    } else {
        console.error("Unknown Error: ", error);
    }
}
