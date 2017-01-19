import {Table, PrimaryGeneratedColumn, Column} from "typeorm";

@Table()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}