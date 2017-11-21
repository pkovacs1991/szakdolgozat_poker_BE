import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from 'typeorm';
import {User} from "./User";

@Entity()
export class PokerTable {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    minBid: number;

    @Column()
    maxBid: number;

    @OneToMany(type => User, user => user.pokerTable)
    users: User[];


}
