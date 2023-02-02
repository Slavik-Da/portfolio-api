import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { type TokensType } from './types';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from './decorators/user.decorator';
import { RefreshTokenFromHeaders } from './decorators/refresh-token.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userData: CreateUserDto): Promise<TokensType> {
    return await this.authService.login(userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @UserDecorator() user,
    @RefreshTokenFromHeaders() refreshToken
  ): Promise<void> {
    await this.authService.logout(user.sub, refreshToken);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @UserDecorator() user,
    @RefreshTokenFromHeaders() refreshToken
  ): Promise<TokensType> {
    return await this.authService.refresh(user.sub, refreshToken);
  }
}
