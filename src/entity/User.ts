import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity} from 'typeorm';
import {PokerTable} from "./PokerTable";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({unique: true})
    email: string;

    @Column()
    balance: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isAdmin: boolean;

    @ManyToOne(type => PokerTable, pokerTable => pokerTable.users)
    pokerTable: PokerTable;

}
