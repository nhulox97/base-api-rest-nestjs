import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseUserEntity } from './base-user.entity';
import { Role } from './role.entity';

@Entity()
export class User extends BaseUserEntity {
  @Column({ type: 'text' })
  about: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
