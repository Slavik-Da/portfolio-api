import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entity/baseEntity';
import { HashedRefreshToken } from '../../auth/entities/refreshTokens.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  hashedPassword: string;

  @OneToMany(
    () => HashedRefreshToken,
    (hashedRefreshToken) => hashedRefreshToken.user,
    { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @Exclude()
  hashedRefreshToken: HashedRefreshToken[];
}
