const os = require('os');
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

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

function getSystemInfo() {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    release: os.release(),
    arch: os.arch(),
    osVersion: os.version(),  // Adicionado para pegar a versão do SO
    uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
    totalMemory: formatBytes(os.totalmem()),
    freeMemory: formatBytes(os.freemem()),
    cpus: os.cpus().map(cpu => cpu.model)
  };
}

(async () => {
  try {
    const ip = await getExternalIP();
    const systemInfo = getSystemInfo();
    console.log('Endereço IP externo:', ip);
    console.log('Informações do Sistema:', systemInfo);
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
