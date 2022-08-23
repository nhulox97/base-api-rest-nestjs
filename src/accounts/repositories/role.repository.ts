import { EntityRepository, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { UserRole } from '../enums/user-role.enum';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  findByName(name: UserRole): Promise<Role> {
    return this.findOne({ where: { name }, relations: ['permissions'] });
  }
}
