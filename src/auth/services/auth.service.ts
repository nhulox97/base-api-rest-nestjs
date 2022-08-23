import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Build jwt token
   *
   * @param sub - User | Guest id
   * @param roles
   * @param permissions
   */
  generateAccessToken(
    sub: number,
    email: string,
    roles?: string[],
    permissions?: string[],
  ): string {
    const tokenPayload: TokenPayload = { sub, roles, permissions, email };
    return this.jwtService.sign(tokenPayload);
  }
}
