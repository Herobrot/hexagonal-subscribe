import { WebSocket } from 'ws';
import signale from "signale";

interface WebSocketConfig {
  wsUrl: string;
}

class WebSocketService {
  private client: WebSocket | null = null;
  private config: WebSocketConfig;

  constructor(config: WebSocketConfig) {
    this.config = config;
  }

  connect(user ?: any) {
    this.client = new WebSocket(this.config.wsUrl);

    this.client.on('open', () => {
      signale.success('Conectado a WebSocket');
      signale.info('Enviando:', JSON.stringify(user));
      this.sendMessage(JSON.stringify(user));
      
    });

    this.client.on('message', (data) => {
      signale.success('Recibido de WebSocket:', data.toString());
    });

    this.client.on('close', () => {
      signale.warn('Desconectado de WebSocket, reintentando...');
    });

    this.client.on('error', (err) => {
      signale.fatal(new Error('Error en WebSocket'), err);

    });
  }

  sendMessage(message: string) {
    if (this.client && this.client.readyState === WebSocket.OPEN) {
      this.client.send(message);
    }
  }
}

export default WebSocketService;
