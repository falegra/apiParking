import { Module } from '@nestjs/common';
import { VehicleTypeController } from './vehicle-type.controller';
import { VehicleTypeService } from './vehicle-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleType } from './entities/vehicleType.entity';
import { UserModule } from 'src/user/user.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { VehicleTypeModel } from './model/vehicleType.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleType]),
    UserModule,
    HelpersModule
  ],
  controllers: [VehicleTypeController],
  providers: [
    VehicleTypeService,
    VehicleTypeModel
  ],
  exports: [VehicleTypeModel]
})
export class VehicleTypeModule {}
