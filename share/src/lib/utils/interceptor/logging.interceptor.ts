import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

type RequestHandlerPayload = {
  request: Request;
  logger: Logger;
  correlationId: string;
};
type ResponseHandlerPayload = {
  response: Response;
  responseBody: unknown;
} & RequestHandlerPayload;
type ErrorHandlerPayload = { error: Error } & RequestHandlerPayload;

type RequestHandler = (payload: RequestHandlerPayload) => void;
type ResponseHandler = (payload: ResponseHandlerPayload) => void;
type ErrorHandler = (payload: ErrorHandlerPayload) => void;

type LoggingInterceptorConfig = {
  requestHandler: RequestHandler;
  responseHandler: ResponseHandler;
  errorHandler: ErrorHandler;
  context: string;
};

const httpRequestHandler: RequestHandler = (payload: RequestHandlerPayload) => {
  const { correlationId, logger, request } = payload;
  const { method, url, headers, body, query, ip } = request;
  const filteredBody = body?.password ? { ...body, password: '******' } : body;

  const message = `REQUEST - correlationId: ${correlationId} | method: ${method} | url: ${url} | ip: ${ip} | user-agent: ${
    headers['user-agent']
  } | body: ${JSON.stringify(filteredBody)} | query: ${JSON.stringify(query)}`;

  logger.log(message);
};

const httpResponseHandler: ResponseHandler = (
  payload: ResponseHandlerPayload
) => {
  const { correlationId, logger, request, response, responseBody } = payload;
  const { method, url } = request;
  const { statusCode } = response;

  const message = `RESPONSE: correlationId: ${correlationId} | statusCode: ${statusCode} | method: ${method} | url: ${url} | body: ${JSON.stringify(
    responseBody
  )}`;

  logger.log(message);
};

const httpErrorHandler: ErrorHandler = (payload: ErrorHandlerPayload) => {
  const { correlationId, logger, request, error } = payload;
  const { method, url } = request;
  const { message, name, stack } = error;
  const statusCode =
    error instanceof HttpException
      ? error.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

  const errorMessage = `ERROR: correlationId: ${correlationId} | method: ${method} | url: ${url} statusCode: ${statusCode} | name: ${name} | message: ${message} | stack: ${JSON.stringify(
    stack
  )}`;

  logger.error(errorMessage);
};

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger;
  private readonly config: LoggingInterceptorConfig;

  constructor() {
    this.config = {
      requestHandler: httpRequestHandler,
      responseHandler: httpResponseHandler,
      errorHandler: httpErrorHandler,
      context: 'HTTP',
    };

    this.logger = new Logger(this.config.context);
  }

  public intercept(
    context: ExecutionContext,
    callHandler: CallHandler
  ): Observable<unknown> {
    const correlationId = uuid();
    const request = context.switchToHttp().getRequest();
    this.config.requestHandler({ request, logger: this.logger, correlationId });

    return callHandler.handle().pipe(
      tap({
        next: (value: unknown): void => {
          this.logNext(value, context, correlationId);
        },
        error: (err: Error): void => {
          this.logError(err, context, correlationId);
        },
      })
    );
  }

  private logNext(
    responseBody: unknown,
    context: ExecutionContext,
    correlationId: string
  ): void {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    this.config.responseHandler({
      request,
      response,
      logger: this.logger,
      correlationId,
      responseBody,
    });
  }

  private logError(
    error: Error,
    context: ExecutionContext,
    correlationId: string
  ): void {
    const request = context.switchToHttp().getRequest<Request>();

    this.config.errorHandler({
      request,
      error,
      logger: this.logger,
      correlationId,
    });
  }
}
