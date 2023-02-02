import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashedRefreshToken } from './entities/refreshTokens.entity';
import { HashedRefreshTokensDAO } from './dao/hashedRefreshTokensDAO';
import { User } from '../user/entities/users.entity';
import { UsersModule } from '../user/users.module';
import { UsersDAO } from '../user/dao/usersDAO';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UsersDAO,
    HashedRefreshTokensDAO,
    User,
  ],
  imports: [
    TypeOrmModule.forFeature([User, HashedRefreshToken]),
    UsersModule,
    JwtModule.register({}),
  ],
})
export class AuthModule {}
