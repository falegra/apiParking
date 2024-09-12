import { Injectable } from '@nestjs/common';
import { PlaceModel } from './model/place.model';
import { CreatePlaceDto } from './dto/createPlace.dto';
import { Response } from 'express';
import { Place } from './entities/place.entity';

@Injectable()
export class PlaceService {
    constructor(
        private readonly placeModel: PlaceModel
    ) {}

    async createPlace(
        {description}: CreatePlaceDto,
        res: Response
    ) {
        try {
            const savedPlace: Place = await this.placeModel.createPlace({
                description
            });

            return res.status(225).json({place: savedPlace});
        } catch (error) {
            this.handleLog('createPlace', error);
            return res.sendStatus(432);
        }
    }

    async getAll(
        res: Response
    ) {
        try {
            const placesDb: Place[] = await this.placeModel.getAllPlaces();

            return res.status(226).json({places: placesDb});
        } catch (error) {
            this.handleLog('getAll', error);
            return res.sendStatus(433);
        }
    }

    async getOne(
        id: number,
        res: Response
    ) {
        try {
            const placeDb: Place = await this.placeModel.getOneBy(id);

            if(!placeDb) {
                return res.sendStatus(435);
            }

            return res.status(227).json({place: placeDb});
        } catch (error) {
            this.handleLog('getOne', error);
            return res.sendStatus(434);
        }
    }

    async deletePlace(
        id: number,
        res: Response
    ) {
        try {
            let placeDb: Place = await this.placeModel.getOneBy(id);

            if(!placeDb) {
                return res.sendStatus(435);
            }

            await this.placeModel.deletePlace(id);

            return res.sendStatus(228);
        } catch (error) {
            this.handleLog('deletePlace', error);
            return res.sendStatus(436);
        }
    }








    handleLog(
        description: string,
        error: any
    ){
        console.log(`[ERROR] - ${description} - place.service.ts`);
        console.log(error.message);
    }
}
