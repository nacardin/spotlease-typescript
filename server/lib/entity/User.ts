import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserClient } from './UserClient';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  givenName: string;

  @Column()
  familyName: string;

  @Column()
  superAdmin: boolean;

  @OneToMany(type => UserClient, userClient => userClient.user)
  clients: UserClient[];

}
