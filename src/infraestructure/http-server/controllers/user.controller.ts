import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

import { USER_APPLICATION } from '../../../core/core.module';
import { UserApplication } from '../../../core/users/application/UserApplication';
import { AppResponse } from '../model/app.response';
import { CreateUserRequest } from '../model/create-user.request';
import { UserAppFilter, UserServiceFilter } from '../exceptions/user.exception';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseFilters(UserAppFilter)
@UseFilters(UserServiceFilter)
@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(
    @Inject(USER_APPLICATION)
    private userApplication: UserApplication,
  ) {}

  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: AppResponse,
  })
  @ApiBadRequestResponse({
    description: 'The user could not be created.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @HttpCode(201)
  @Post()
  async createUser(@Body() request: CreateUserRequest): Promise<AppResponse> {
    await this.userApplication.createUser(request);
    return {
      status: 201,
      message: 'User created successfully',
    };
  }

  @ApiCreatedResponse({
    description: 'The user has been successfully retrieved.',
    type: AppResponse,
  })
  @ApiBadRequestResponse({
    description: 'The user could not be retrieved.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUser(@Request() req): Promise<AppResponse> {
    const loggedUser = req.user;
    const user = await this.userApplication.findUser(loggedUser.username);
    return {
      status: 200,
      message: 'User retrieved successfully',
      data: user,
    };
  }
}
