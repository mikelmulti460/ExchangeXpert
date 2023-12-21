import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserApplicationError } from '../../../core/users/shared/error/UserApplication.error';
import { UserServiceError } from '../../../core/users/shared/error/UserService.error';

@Catch(UserApplicationError)
export class UserAppFilter implements ExceptionFilter {
  catch(exception: UserApplicationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    Logger.error(
      `UserController (${request.method}) at {${request.path}} error: ${exception.message}`,
    );

    response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}

@Catch(UserServiceError)
export class UserServiceFilter implements ExceptionFilter {
  catch(exception: UserServiceError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    Logger.error(
      `UserController (${request.method}) at {${request.path}} error: ${exception.message}`,
    );

    response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
