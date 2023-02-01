import { Entity, ManyToOne, Column } from 'typeorm';
import { BaseEntity } from '../../common/entity/baseEntity';
import { User } from '../../user/entities/users.entity';

@Entity()
export class HashedRefreshToken extends BaseEntity {
  @Column()
  token: string;

  @ManyToOne(() => User, (user) => user.hashedRefreshToken)
  user: User;
}
