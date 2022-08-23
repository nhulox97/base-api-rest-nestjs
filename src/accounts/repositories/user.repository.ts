import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string, relations?: string[]) {
    return this.findOne({ where: { email }, relations });
  }

  async emailOrPhoneNumberExists(email?: string, phoneNumber?: string): Promise<void> {
    const user = await this.findOne({ where: [{ email }, { phoneNumber }] });

    if (!user) return;

    if (user.email === email) throw new BadRequestException('Sorry, this email already exists');

    if (user.phoneNumber === phoneNumber)
      throw new BadRequestException('Sorry, this phone number already exists');
  }
}
