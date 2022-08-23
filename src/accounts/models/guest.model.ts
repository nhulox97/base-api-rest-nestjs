import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseProfileModel } from './base-profile.model';

export class GuestModel extends BaseProfileModel {
  @Expose()
  @ApiProperty()
  authenticationCounter?: number;

  @Expose()
  @ApiProperty()
  familySize: number;
}
