import { Expose } from 'class-transformer';
import { BaseTokenDto } from './base-token.dto';

export class UserTokenDto extends BaseTokenDto {
  @Expose({ name: 'sub' }) userId: number;
  @Expose() permissions?: string[];
  @Expose() roles?: string[];
}
