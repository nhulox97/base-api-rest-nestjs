import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { RoleRepository } from './repositories/role.repository';
import { GuestRepository } from './repositories/guest.repository';
import { AuthModule } from '../auth/auth.module';
import { UserMapper } from './mappers/user.mapper';
import { GuestService } from './services/guest.service';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository, GuestRepository]),
    AuthModule,
  ],
  providers: [UserService, UserMapper, GuestService],
  controllers: [AccountsController],
  exports: [UserService],
})
export class AccountsModule {}
