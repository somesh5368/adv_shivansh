export class ApiError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static badRequest(message = 'Bad Request', details?: any) {
    return new ApiError(400, message, details);
  }

  static unauthorized(message = 'Unauthorized', details?: any) {
    return new ApiError(401, message, details);
  }

  static forbidden(message = 'Forbidden', details?: any) {
    return new ApiError(403, message, details);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  static conflict(message = 'Resource conflict', details?: any) {
    return new ApiError(409, message, details);
  }

  static tooManyRequests(message = 'Too many requests, please try again later.') {
    return new ApiError(429, message);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message);
  }
}

