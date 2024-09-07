import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './model/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HelpersModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserModel
  ],
  exports: [
    UserModel
  ]
})
export class UserModule {}
