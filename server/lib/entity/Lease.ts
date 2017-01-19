import {Table, PrimaryGeneratedColumn, Column} from "typeorm";

@Table()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}