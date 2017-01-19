import {Table, PrimaryColumn, Column} from "typeorm";

@Table()
export class Spot {

    @PrimaryColumn("int", { generated: true })
    id: number;

    @Column()
    name: string;

}