import { UserRole } from '../../accounts/enums/user-role.enum';
import { TokenPayload } from '../interfaces/token-payload.interface';

export const mockTokenPayload: TokenPayload = {
  sub: 1,
  roles: [UserRole.ADMIN],
  email: 'email@email.com',
};
