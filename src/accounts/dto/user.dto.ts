import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { BaseUserProfileDto } from './base-user-profile.dto';

export class CreateUserDto extends BaseUserProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  about: string;

  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
    default: UserRole.HOST,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole = UserRole.HOST;
}

class UserWithOmittedFields extends OmitType(CreateUserDto, ['email', 'password', 'role']) {}

export class PatchUserDto extends PartialType(UserWithOmittedFields) {}
