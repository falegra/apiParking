import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Place } from "../entities/place.entity";
import { Repository } from "typeorm";
import { CreatePlaceDto } from "../dto/createPlace.dto";

@Injectable()
export class PlaceModel {
    constructor(
        @InjectRepository(Place) private readonly placeRepository: Repository<Place>
    ) {}

    async createPlace(
        {description}: CreatePlaceDto
    ) {
        try {
            const savedPlace: Place = await this.placeRepository.save(this.placeRepository.create({
                description
            }));

            return savedPlace;
        } catch (error) {
            this.handleLog('createPlace', error);
            throw new Error(error.message);
        }
    }

    async getAllPlaces() {
        try {
            const placesDb: Place[] = await this.placeRepository.find();
            return placesDb;
        } catch (error) {
            this.handleLog('getAllPlaces', error);
            throw new Error(error.message);
        }
    }

    async getOneBy(
        id: number
    ) {
        try {
            const placeDb: Place = await this.placeRepository.findOne({
                where: {
                    id
                }
            });
            return placeDb;
        } catch (error) {
            this.handleLog('getOne', error);
            throw new Error(error.message);
        }
    }

    async deletePlace(
        id: number
    ) {
        try {
            await this.placeRepository.delete(id);
            return true;
        } catch (error) {
            this.handleLog('deletePlace', error);
            throw new Error(error.message);
        }
    }




    private handleLog(
        description: string,
        error: any
    ) {
        console.log(`[ERROR] - ${description} - parking.model.ts`);
        console.log(error.message);
    }
}