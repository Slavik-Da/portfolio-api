import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entity/baseEntity';
import { HashedRefreshToken } from '../../auth/entities/refreshTokens.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  hashedPassword: string;

  @OneToMany(
    () => HashedRefreshToken,
    (hashedRefreshToken) => hashedRefreshToken.user,
    { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  hashedRefreshToken: HashedRefreshToken[];
}
