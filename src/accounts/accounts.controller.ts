import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalJwtAuthGuard } from '../auth/guards/local-jwt.auth.guard';
import { LoginDto } from '../accounts/dto/login.dto';
import { CreateUserDto, PatchUserDto } from './dto/user.dto';
import { GuestLoginModel, LoginModel, UserLoginModel } from './models/login.model';
import { UserService } from './services/user.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserTokenDto } from '../auth/dto/user-token.dto';
import { UserModel } from './models/user.model';
import { GuestService } from './services/guest.service';
import { CreateGuestDto, PatchGuestDto } from './dto/guest.dto';
import { GuestTokenDto } from '../auth/dto/guest-token.dto';
import { GuestModel } from './models/guest.model';
import { AuthService } from '../auth/services/auth.service';

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(
    private readonly userService: UserService,
    private readonly guestService: GuestService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({ status: 201, type: UserLoginModel, description: 'Signs in host and admin users' })
  @Post('user/signin')
  signInUser(@Body() userDto: CreateUserDto) {
    return this.userService.saveUser(userDto);
  }

  @ApiResponse({ status: 201, type: GuestLoginModel, description: 'Signs in guests' })
  @Post('guest/signin')
  signInGuest(@Body() userDto: CreateGuestDto) {
    return this.guestService.saveGuest(userDto);
  }

  @ApiResponse({ status: 201, type: UserLoginModel, description: 'Logs in host and admin users' })
  @Post('user/login')
  login(@Body() input: LoginDto) {
    return this.userService.authenticateUser(input);
  }

  @ApiResponse({ status: 201, type: GuestLoginModel, description: 'Logs in guest users' })
  @Post('guest/login')
  loginGuest(@Body() input: LoginDto) {
    return this.guestService.authenticateUser(input);
  }

  @ApiBearerAuth('token')
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(LocalJwtAuthGuard)
  @Patch('user/update-my-profile')
  updateMyProfile(@Body() userDto: PatchUserDto, @CurrentUser() user: UserTokenDto) {
    return this.userService.updateUser(userDto, user);
  }

  @ApiBearerAuth('token')
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(LocalJwtAuthGuard)
  @Patch('guest/update-my-profile')
  updateMyProfileGuest(@Body() userDto: PatchGuestDto, @CurrentUser() { guestId }: GuestTokenDto) {
    return this.guestService.updateGuest(userDto, guestId);
  }

  @ApiBearerAuth('token')
  @ApiResponse({ status: 200, type: UserModel })
  @UseGuards(LocalJwtAuthGuard)
  @Get('user/get-my-profile')
  getMyProfile(@CurrentUser() { userId }: UserTokenDto) {
    return this.userService.getUserProfile(userId);
  }

  @ApiBearerAuth('token')
  @ApiResponse({ status: 200, type: GuestModel })
  @UseGuards(LocalJwtAuthGuard)
  @Get('guest/get-my-profile')
  getMyProfileGuest(@CurrentUser() { guestId }: GuestTokenDto) {
    return this.guestService.getGuestProfile(guestId);
  }

  @ApiBearerAuth('token')
  @ApiResponse({ status: 201, type: LoginModel })
  @UseGuards(LocalJwtAuthGuard)
  @Post('refresh-token')
  refreshToken(@CurrentUser() user: GuestTokenDto | UserTokenDto): LoginModel {
    let accessToken: string;
    if (user instanceof GuestTokenDto) {
      accessToken = this.authService.generateAccessToken(user.guestId, user.email);
    }
    if (user instanceof UserTokenDto) {
      accessToken = this.authService.generateAccessToken(
        user.userId,
        user.email,
        user?.roles,
        user?.permissions,
      );
    }

    return { accessToken };
  }
}
