import { Injectable } from '@nestjs/common';
import { LogsModel } from './model/logs.model';
import { Response } from 'express';

@Injectable()
export class LogsService {
    constructor(
        private readonly logsModel: LogsModel
    ) {}

    async getAll(
        res: Response
    ) {
        try {
            const logs = await this.logsModel.getAll();
            return res.status(200).json({logs});
        } catch (error) {
            this.handleLog('getAll', res);
            return res.sendStatus(444);
        }
    }



    private handleLog(
        description: string,
        error: any
    ){
        console.log(`[ERROR] - ${description} - logs.service.ts`);
        console.log(error.message);
    }
}
