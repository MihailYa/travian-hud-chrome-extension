export class ParametrizedEvent {
  listeners = []
  addEventListener(listener) {
    this.listeners.push(listener)
  }
  broadcast(params) {
    this.listeners.forEach(listener => listener(params))
  }
}