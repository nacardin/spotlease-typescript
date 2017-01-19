import {Table, PrimaryColumn, Column} from "typeorm";

@Table()
export class Community {

    @PrimaryColumn("int", { generated: true })
    id: number;

    @Column()
    name: string;

}
