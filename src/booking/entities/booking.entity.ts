import { Place } from "src/place/entities/place.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    startTime: string;

    @Column({type: 'varchar', nullable: false})
    endTime: string;

    @Column({type: 'varchar', nullable: false})
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