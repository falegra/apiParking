// import { Actions } from "src/common/enum/actions.enum";
import { Actions } from "../../common/enum/actions.enum";
// import { Place } from "src/place/entities/place.entity";
import { Place } from "../../place/entities/place.entity";
// import { User } from "src/user/entities/user.entity";
import { User } from "../../user/entities/user.entity";
// import { VehicleType } from "src/vehicle-type/entities/vehicleType.entity";
import { VehicleType } from "../../vehicle-type/entities/vehicleType.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false, unique: true})
    vehicleRegistration: string;

    @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.bookings, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'vehicleType'})
    vehicleType: VehicleType;

    @Column({type: 'varchar', nullable: false})
    startDate: string;

    @Column({type: 'varchar', nullable: false})
    startHour: string;

    @Column({type: 'varchar', nullable: false})
    endDate: string;

    @Column({type: 'varchar', nullable: false})
    endHour: string;

    @Column({type: 'varchar', nullable: false})
    startTime: string;

    @Column({type: 'varchar', nullable: false})
    endTime: string;

    @Column({type: 'enum', enum: Actions, nullable: false})
    status: string;

    @ManyToOne(() => Place, (place) => place.bookings, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'place'})
    place: Place;

    @ManyToOne(() => User, (user) => user.bookings, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'user'})
    user: User;
}