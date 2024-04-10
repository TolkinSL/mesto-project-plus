export default class PermissionError extends Error {
  public statusCode: number;

  constructor(message?: string) {
    super(message);
    this.statusCode = 403;
  }
}
