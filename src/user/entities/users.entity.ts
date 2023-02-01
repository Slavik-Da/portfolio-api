import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entity/baseEntity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  hashedPassword: string;
}
