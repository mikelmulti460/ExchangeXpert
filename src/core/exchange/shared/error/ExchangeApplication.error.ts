export class ExchangeApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, ExchangeApplicationError.prototype);
  }
}
