import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HelpersModule } from 'src/helpers/helpers.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    HelpersModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
