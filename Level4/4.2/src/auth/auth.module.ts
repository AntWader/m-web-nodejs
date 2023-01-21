import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from './auth_users/users.service';
import { LocalStrategy } from './local/local.strategy';
import { SessionSerializer } from './session/session.serializer';

/**
 * This module provides authentication handling by using 'passport-local' strategy.
 */
@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, UsersService],
})
export class AuthModule { }
