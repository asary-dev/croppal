import { Request, Response, NextFunction } from "express";

function ErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(err.staus).json({ message: err.message });
}

class NotFound extends Error {
  public status;
  constructor(message?: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = 404;
  }

  statusCode() {
    return this.status;
  }
}

class InternalServerError extends Error {
  public status;
  constructor(message?: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = 500;
  }

  statusCode() {
    return this.status;
  }
}

class UnprocessableContent extends Error {
  public status;
  constructor(message?: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = 422;
  }

  statusCode() {
    return this.status;
  }
}

export default {
  ErrorHandler,
  NotFound,
  InternalServerError,
  UnprocessableContent,
};
