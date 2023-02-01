import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entity/baseEntity';

@Entity()
export class HashedRefreshToken extends BaseEntity {
  @Column()
  token: string;
}
