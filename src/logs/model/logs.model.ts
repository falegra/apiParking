import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Logs } from "../entities/logs.entity";
import { Model } from "mongoose";
import { CreateLogDto } from "../dto/createLog.dto";

@Injectable()
export class LogsModel {
    constructor(
        @InjectModel(Logs.name) private readonly logsModel: Model<Logs>
    ) {}

    async create(
        createLog: CreateLogDto
    ) {
        try {
            const log = await this.logsModel.create(createLog);
            return log;
        } catch (error) {
            this.handleLog('create', error);
            throw new Error(error.message);
        }
    }








    private handleLog(
        description: string,
        error: any
    ) {
        console.log(`[ERROR] - ${description} - logs.model.ts`);
        console.log(error.message);
    }
}