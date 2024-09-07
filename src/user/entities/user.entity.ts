import { Role } from "src/common/enum/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({type: 'varchar', nullable: false})
    lastName: string;

    @Column({type: 'varchar', nullable: false})
    username: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    email: string;

    @Column({type: 'text', nullable: false})
    password: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    phone: string;

    @Column({type: 'enum', enum: Role, default: Role.CLIENTE, nullable: false})
    role: string;

    @Column({type: 'varchar', nullable: true, length: 6})
    verificationCode: string;

    @Column({type: 'boolean', default: false, nullable: false})
    isActive: boolean;

    @Column({type: 'varchar', nullable: false})
    createdAt: string;
}