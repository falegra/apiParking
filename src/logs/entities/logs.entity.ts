import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Logs extends Document {
    @Prop({required: true})
    action: string;

    @Prop({
        required: true,
        type: {
            id: {type: Number, required: true},
            name: {type: String, required: true},
            lastName: {type: String, required: true},
            username: {type: String, required: true},
            email: {type: String, required: true},
            phone: {type: String, required: true},
            role: {type: String, required: true},
        }
    })
    user: {
        id: number,
        name: string,
        lastName: string,
        username: string
        email: string,
        phone: string,
        role: string
    };

    @Prop({
        required: true,
        type: {
            id: {type: Number, required: true},
            startTime: {type: String, required: true},
            endTime: {type: String, required: true},
            place: {type: Number, required: true},
            vehicleRegistration: {type: String, required: true},
            vehicleType: {type: Number, required: true},
            startDate: {type: String, required: true},
            startHours: {type: String, required: true},
            endDate: {type: String, required: true},
            endHours: {type: String, required: true},
        }
    })
    booking: {
        id: number,
        startTime: string,
        endTime: string,
        place: number,
        vehicleRegistration: string,
        vehicleType: number,
        startDate: string,
        startHours: string,
        endDate: string,
        endHours: string
    }

    @Prop({required: true})
    createdAt: string;
}

export const LogsSchema = SchemaFactory.createForClass(Logs);