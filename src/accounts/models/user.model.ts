import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseProfileModel } from './base-profile.model';
import { RoleModel } from './role.model';

export class UserModel extends BaseProfileModel {
  @ApiProperty()
  @Expose()
  about: string;

  @ApiProperty()
  @Expose()
  @Type(() => RoleModel)
  role: RoleModel;
}
