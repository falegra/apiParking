import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogsService } from './logs.service';
import { AdminGuard } from 'src/auth/admin.guard';
import { Response } from 'express';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
    constructor(
        private readonly logsService: LogsService
    ) {}

    @Get()
    @UseGuards(AdminGuard)
    getAll(
        @Res() res: Response
    ) {
        return this.logsService.getAll(res);
    }
}
