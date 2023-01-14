import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../auth/auth_users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local/local.strategy';
import { SessionSerializer } from './session/session.serializer';

/**
 * This module provides authentication handling by using 'passport-local' strategy.
 */
@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule { }
