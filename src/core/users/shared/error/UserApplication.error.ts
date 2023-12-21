export class UserApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, UserApplicationError.prototype);
  }
}
