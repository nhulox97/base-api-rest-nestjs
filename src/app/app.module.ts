import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from '../accounts/accounts.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [TypeOrmModule.forRoot(), AccountsModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
