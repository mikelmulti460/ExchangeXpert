import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../../auth/services/auth.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'The user is logged in successfully.',
    type: String,
  })
  @ApiBadRequestResponse({
    description: 'The user could not be logged in.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
