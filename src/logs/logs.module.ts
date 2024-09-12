import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, LogsSchema } from './entities/logs.entity';
import { LogsModel } from './model/logs.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Logs.name,
      schema: LogsSchema
    }])
  ],
  controllers: [LogsController],
  providers: [
    LogsService,
    LogsModel
  ],
  exports: [LogsModel]
})
export class LogsModule {}
