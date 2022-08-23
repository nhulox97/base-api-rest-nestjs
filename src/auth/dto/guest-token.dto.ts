import { Expose } from 'class-transformer';
import { BaseTokenDto } from './base-token.dto';

export class GuestTokenDto extends BaseTokenDto {
  @Expose({ name: 'sub' }) guestId: number;
}
