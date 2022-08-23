import { Injectable } from '@nestjs/common';
import { plainToModel } from '../../utils/plain-to-model.utils';
import { Guest } from '../entities/guest.entity';
import { User } from '../entities/user.entity';
import { GuestModel } from '../models/guest.model';
import { GuestLoginModel, UserLoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserMapper {
  toLoginModel(accessToken: string, user?: User | Guest) {
    if (user instanceof User) return plainToModel(UserLoginModel, { accessToken, user });

    return plainToModel(GuestLoginModel, { accessToken, user });
  }

  toUserModel(user: User) {
    return plainToModel(UserModel, user);
  }

  toGuestModel(guest: Guest) {
    return plainToModel(GuestModel, guest);
  }
}
