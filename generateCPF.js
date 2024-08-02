class InvalidCPFLengthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCPFLengthError';
    }
}

class InvalidCPFCharacterError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCPFCharacterError';
    }
}

class InvalidCPFError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCPFError';
    }
}

function generateCPF() {
    function generateDigit(partialCpf) {
        let sum = 0;
        let weight = partialCpf.length + 1;

        for (let i = 0; i < partialCpf.length; i++) {
            sum += partialCpf[i] * weight--;
        }

        let remainder = sum % 11;
        return (remainder < 2) ? 0 : 11 - remainder;
    }

    let cpf = '';
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10);
    }

    let digit1 = generateDigit(cpf);
    cpf += digit1;
    let digit2 = generateDigit(cpf);
    cpf += digit2;

    return cpf;
}

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove all non-numeric characters

    if (cpf.length !== 11) {
        throw new InvalidCPFLengthError('CPF must be 11 digits long');
    }

    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cpf)) {
        throw new InvalidCPFCharacterError('CPF cannot have all identical digits');
    }

    function calculateDigit(partialCpf) {
        let sum = 0;
        let weight = partialCpf.length + 1;

        for (let i = 0; i < partialCpf.length; i++) {
            sum += partialCpf[i] * weight--;
        }

        let remainder = sum % 11;
        return (remainder < 2) ? 0 : 11 - remainder;
    }

    const partialCpf = cpf.slice(0, 9);
    const digit1 = calculateDigit(partialCpf);
    const digit2 = calculateDigit(partialCpf + digit1);

    if (cpf !== partialCpf + digit1 + digit2) {
        throw new InvalidCPFError('Invalid CPF');
    }

    return true;
}

function formatCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove all non-numeric characters

    if (cpf.length !== 11) {
        throw new InvalidCPFLengthError('Invalid CPF length');
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

try {
    const cpf = generateCPF();
    const formattedCpf = formatCPF(cpf);

    console.log("CPF: ", cpf);
    console.log("Formatted CPF: ", formattedCpf);
    console.log("Valid: ", validateCPF(cpf));
} catch (error) {
    if (error instanceof InvalidCPFLengthError) {
        console.error('CPF Length Error: ', error.message);
    } else if (error instanceof InvalidCPFCharacterError) {
        console.error('CPF Character Error: ', error.message);
    } else if (error instanceof InvalidCPFError) {
        console.error('Invalid CPF Error: ', error.message);
    } else {
        console.error('An unknown error occurred: ', error.message);
    }
}
