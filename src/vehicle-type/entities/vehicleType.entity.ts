import { Booking } from "src/booking/entities/booking.entity";
import { VehicleTypeEnum } from "src/common/enum/vehicleType.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehicleType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'enum', enum: VehicleTypeEnum, nullable: false, default: VehicleTypeEnum.CAR})
    type: string;

    @OneToMany(() => Booking, (booking) => booking.vehicleType)
    bookings: Booking[];
}