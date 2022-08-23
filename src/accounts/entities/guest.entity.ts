import { Column, Entity } from 'typeorm';
import { BaseUserEntity } from './base-user.entity';

@Entity()
export class Guest extends BaseUserEntity {
  @Column({ type: 'int', name: 'authentication_counter', nullable: true })
  authenticationCounter?: number;

  @Column({ type: 'int', name: 'family_size', default: 1 })
  familySize: number;
}
