import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { User } from './User';

@Entity()
export class UserClient {

  @PrimaryColumn()
  publicKeyHash: string;

  @ManyToOne(type => User, user => user.clients, { cascadeAll: true })
  user: User;

}
