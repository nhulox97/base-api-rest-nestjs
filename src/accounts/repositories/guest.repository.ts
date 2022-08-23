import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Guest } from '../entities/guest.entity';

@EntityRepository(Guest)
export class GuestRepository extends Repository<Guest> {
  findByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  async emailOrPhoneNumberExists(email?: string, phoneNumber?: string): Promise<void> {
    const user = await this.findOne({ where: [{ email }, { phoneNumber }] });

    if (!user) return;

    if (user.email === email) throw new BadRequestException('Sorry, this email already exists');

    if (user.phoneNumber === phoneNumber)
      throw new BadRequestException('Sorry, this phone number already exists');
  }
}
