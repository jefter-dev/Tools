class InvalidCEPLengthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCEPLengthError';
    }
}

class InvalidCEPCharacterError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCEPCharacterError';
    }
}

class InvalidCEPError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCEPError';
    }
}

function generateCEP() {
    let cep = '';
    for (let i = 0; i < 8; i++) {
        cep += Math.floor(Math.random() * 10);
    }
    return cep;
}

function validateCEP(cep) {
    cep = cep.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos

    if (cep.length !== 8) {
        throw new InvalidCEPLengthError('CEP deve ter 8 dígitos');
    }

    // Aqui você pode adicionar outras validações, se necessário

    return true;
}

function formatCEP(cep) {
    cep = cep.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos

    if (cep.length !== 8) {
        throw new InvalidCEPLengthError('Comprimento de CEP inválido');
    }

    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

try {
    const cep = generateCEP();
    const formattedCep = formatCEP(cep);

    console.log("CEP: ", cep);
    console.log("Formatted CEP: ", formattedCep);
    console.log("Valid: ", validateCEP(cep));
} catch (error) {
    if (error instanceof InvalidCEPLengthError) {
        console.error('CEP Length Error: ', error.message);
    } else if (error instanceof InvalidCEPCharacterError) {
        console.error('CEP Character Error: ', error.message);
    } else if (error instanceof InvalidCEPError) {
        console.error('Invalid CEP Error: ', error.message);
    } else {
        console.error('An unknown error occurred: ', error.message);
    }
}
