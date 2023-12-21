import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { AppResponse } from '../model/app.response';

export function ApiSuccessResponse(description: string) {
  return applyDecorators(
    ApiCreatedResponse({ description, type: AppResponse }),
  );
}

export function ApiErrorResponse(description: string) {
  return applyDecorators(
    ApiResponse({ status: 400, description, type: AppResponse }),
    ApiBadRequestResponse({ description }),
    ApiInternalServerErrorResponse({ description: 'Internal server error' }),
  );
}
