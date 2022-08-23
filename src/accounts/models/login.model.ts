import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { GuestModel } from './guest.model';
import { UserModel } from './user.model';

export class LoginModel {
  @Expose()
  @ApiProperty()
  accessToken: string;
}
export class UserLoginModel extends LoginModel {
  @Expose()
  @ApiProperty()
  @Type(() => UserModel)
  user?: UserModel;
}

export class GuestLoginModel extends LoginModel {
  @Expose()
  @ApiProperty()
  @Type(() => GuestModel)
  user?: GuestModel;
}
