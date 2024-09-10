import { VehicleTypeEnum } from "src/common/enum/vehicleType.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehicleType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'enum', enum: VehicleTypeEnum, nullable: false, default: VehicleTypeEnum.CAR})
    type: string;
}