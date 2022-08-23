import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';
import { BaseUserProfileDto } from './base-user-profile.dto';

export class CreateGuestDto extends BaseUserProfileDto {
  @ApiProperty({ default: 1, required: false })
  @IsInt()
  @IsPositive()
  familySize = 1;
}

class GuestWithOmittedFields extends OmitType(CreateGuestDto, ['email', 'password']) {}

export class PatchGuestDto extends PartialType(GuestWithOmittedFields) {}
