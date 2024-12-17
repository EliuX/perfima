import { Entity, Column } from 'typeorm';
import {BaseEntity} from "../shared/base.entity";

@Entity('users')
export class User extends BaseEntity {

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor() {
    super();
  }
}
