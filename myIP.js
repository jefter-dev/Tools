const axios = require('axios');

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

async function getExternalIP() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    if (response.status !== 200) {
      throw new APIError('Erro ao obter IP externo da API', response.status);
    }
    return response.data.ip;
  } catch (error) {
    if (error.response) {
      throw new APIError(`Erro na resposta da API: ${error.message}`, error.response.status);
    } else if (error.request) {
      throw new NetworkError('Erro de rede ao tentar conectar à API');
    } else {
      throw new Error(`Erro inesperado: ${error.message}`);
    }
  }
}

(async () => {
  try {
    const ip = await getExternalIP();
    console.log('Endereço IP externo:', ip);
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error('Erro de Rede:', error.message);
    } else if (error instanceof APIError) {
      console.error(`Erro da API (status ${error.status}):`, error.message);
    } else {
      console.error('Erro:', error.message);
    }
  }
})();
