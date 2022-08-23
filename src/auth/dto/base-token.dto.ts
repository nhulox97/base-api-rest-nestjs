import { Expose } from 'class-transformer';

export class BaseTokenDto {
  @Expose() exp: number;
  @Expose() iat: number;
  @Expose() email: string;
}
