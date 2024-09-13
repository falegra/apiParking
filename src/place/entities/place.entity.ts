import { Booking } from "../../booking/entities/booking.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: true})
    description: string;

    @OneToMany(() => Booking, (booking) => booking.place)
    bookings: Booking[];
}