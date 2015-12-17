/**@flow*/
import Client from 'socket.io-client'

export class ClientManager {
  connections:Map<string, Client>;

  constructor() {
    this.connections = new Map()
  }

  getClient(url:string):Client {
    if (!this.connections.has(url)) {
      this.connections.set(url, Client(url))
    }
    return this.connections.get(url)
  }
}

const clientManager = new ClientManager

export function getClient(url:string):Client {
  return clientManager.getClient(url)
}
