import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth/services/auth.service';
import { hashPassword, validatePassword } from '../../utils/bcrypt.utils';
import { CreateGuestDto, PatchGuestDto } from '../dto/guest.dto';
import { LoginDto } from '../dto/login.dto';
import { UserMapper } from '../mappers/user.mapper';
import { GuestModel } from '../models/guest.model';
import { GuestRepository } from '../repositories/guest.repository';

@Injectable()
export class GuestService {
  constructor(
    private readonly userMapper: UserMapper,
    private readonly authService: AuthService,
    private readonly guestRepository: GuestRepository,
  ) {}

  /**
   * This functions saves a new guest
   *
   * @param guestDto - Create guest params
   * @returns Login model
   */
  async saveGuest({ password, ...guestDto }: CreateGuestDto) {
    await this.guestRepository.emailOrPhoneNumberExists(guestDto.email, guestDto.phoneNumber);

    const guest = this.guestRepository.create(guestDto);
    // hashing password
    guest.password = await hashPassword(password);
    const savedGuest = await this.guestRepository.save(guest);

    // build token
    const accessToken = this.authService.generateAccessToken(savedGuest.id, guest.email);

    return this.userMapper.toLoginModel(accessToken, savedGuest);
  }

  /**
   * Autenticate guest by using email and password
   *
   * @param login - Loding dto (email and password)
   * @returns Login model
   */
  async authenticateUser({ email, password, isUserRequired }: LoginDto) {
    const guest = await this.guestRepository.findByEmail(email);
    if (!guest) throw new NotFoundException('This guest does not exists, please sign in');

    if (!(await validatePassword(password, guest?.password)))
      throw new UnauthorizedException('Invalid password');

    const accessToken = this.authService.generateAccessToken(guest.id, guest.email);

    const loginModel = isUserRequired
      ? this.userMapper.toLoginModel(accessToken, guest)
      : this.userMapper.toLoginModel(accessToken);

    return loginModel;
  }

  /**
   * Updates guest personal info
   * @param guestDto - Guest patch dto
   */
  async updateGuest(guestDto: PatchGuestDto, guestId: number): Promise<boolean> {
    // validate if guest exist
    const guest = await this.guestRepository.findOne(guestId);
    if (!guest) throw new NotFoundException('This guest does not exists, please sign in');

    // Validate if phone number alread exist
    await this.guestRepository.emailOrPhoneNumberExists(undefined, guestDto?.phoneNumber);

    const guestEntity = this.guestRepository.create({ ...guest, ...guestDto });

    return !!(await this.guestRepository.save(guestEntity));
  }

  async getGuestProfile(userId: number): Promise<GuestModel> {
    // Validate if user exist
    const guest = await this.guestRepository.findOne(userId);
    if (!guest) throw new NotFoundException('This guest does not exist');

    return this.userMapper.toGuestModel(guest);
  }
}
