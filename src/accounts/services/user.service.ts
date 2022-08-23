import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../auth/services/auth.service';
import { hashPassword, validatePassword } from '../../utils/bcrypt.utils';
import { CreateUserDto, PatchUserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';
import { UserMapper } from '../mappers/user.mapper';
import { RoleRepository } from '../repositories/role.repository';
import { UserRepository } from '../repositories/user.repository';
import { UserTokenDto } from '../../auth/dto/user-token.dto';
import { UserModel } from '../models/user.model';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly authService: AuthService,
    private readonly userMapper: UserMapper,
  ) {}

  /**
   * This functions saves a new user, by deafult it role will be Host
   *
   * @param userDto - Create user params
   * @returns Login model
   */
  async saveUser({ role, password, ...userDto }: CreateUserDto) {
    await this.userRepository.emailOrPhoneNumberExists(userDto.email, userDto.phoneNumber);

    const currentRole = await this.roleRepository.findByName(role);
    if (!currentRole) throw new BadRequestException('Please provide a valid role');

    const user = this.userRepository.create(userDto);
    user.role = currentRole;
    // hashing password
    user.password = await hashPassword(password);
    const savedUser = await this.userRepository.save(user);

    // build token
    const permissions = currentRole.permissions.map((permission) => permission.name);
    const accessToken = this.authService.generateAccessToken(
      savedUser.id,
      savedUser.email,
      [user.role.name],
      permissions,
    );

    return this.userMapper.toLoginModel(accessToken, savedUser);
  }

  /**
   * Autenticate users by using email and password
   *
   * @param login - Loding dto (email and password)
   * @returns Login model
   */
  async authenticateUser({ email, password, isUserRequired }: LoginDto) {
    const user = await this.userRepository.findByEmail(email, ['role', 'role.permissions']);

    if (!user) throw new NotFoundException('This user does not exist, please sign in');

    if (!(await validatePassword(password, user.password)))
      throw new UnauthorizedException('Invalid password');

    const permissions = user.role.permissions.map((permission) => permission.name);
    const accessToken = this.authService.generateAccessToken(
      user.id,
      user.email,
      [user.role.name],
      permissions,
    );

    const loginModel = isUserRequired
      ? this.userMapper.toLoginModel(accessToken, user)
      : this.userMapper.toLoginModel(accessToken);

    return loginModel;
  }

  async updateUser(userDto: PatchUserDto, user: UserTokenDto): Promise<boolean> {
    // Validate if user exist
    const currentUser = await this.userRepository.findOne(user.userId);
    if (!currentUser) throw new NotFoundException('This user does not exist');

    // Validate if phone number alread exist
    await this.userRepository.emailOrPhoneNumberExists(undefined, userDto?.phoneNumber);

    const userEntity = this.userRepository.create({ ...currentUser, ...userDto });

    return !!(await this.userRepository.save(userEntity));
  }

  async getUserProfile(userId: number): Promise<UserModel> {
    // Validate if user exist
    const currentUser = await this.userRepository.findOne(userId);
    if (!currentUser) throw new NotFoundException('This user does not exist');

    return this.userMapper.toUserModel(currentUser);
  }

  async findById(userId: number): Promise<User> {
    const currentUser = await this.userRepository.findOne(userId);
    if (!currentUser) throw new NotFoundException('This user does not exist');

    return currentUser;
  }
}
