import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { PlaceModel } from './model/place.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { UserModule } from 'src/user/user.module';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    UserModule,
    HelpersModule
  ],
  controllers: [PlaceController],
  providers: [
    PlaceService,
    PlaceModel
  ],
  exports: [PlaceModel]
})
export class PlaceModule {}
