import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class BaseUserProfileDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  @Length(8)
  phoneNumber: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4)
  password?: string;
}
