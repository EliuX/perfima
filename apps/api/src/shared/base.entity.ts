import { ObjectId } from 'mongodb';
import { Column, ObjectIdColumn } from 'typeorm';
import { convertObjectIdToString } from './entityUtils';

export abstract class BaseEntity {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column({ insert: true })
  createdAt = new Date();

  @Column({ update: true })
  updatedAt = new Date();

  get uid(): string {
    return convertObjectIdToString(this.id);
  }
}
