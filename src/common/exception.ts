export default class HttpException extends Error {
  status_code?: number;
  status?: number;
  message: string;
  error: string | null;

  constructor(status_code: number, message: string, error?: string) {
    super(message);

    this.status_code = status_code;
    this.message = message;
    this.error = error || null;
  }
}
