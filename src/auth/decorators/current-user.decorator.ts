import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { GuestTokenDto } from '../dto/guest-token.dto';
import { UserTokenDto } from '../dto/user-token.dto';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Partial<UserTokenDto | GuestTokenDto> => {
    const req = ctx.switchToHttp().getRequest();
    if (!req?.user) throw new ForbiddenException();

    return req.user;
  },
);
