import { createParamDecorator, ExecutionContext } from '@nestjs/common';
const relationsToArray = (relations?: string | string[]) =>
  !relations ? [] : typeof relations === 'string' ? [relations] : relations;

export const TransformRelationsQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return relationsToArray(request?.query?.relations);
  },
);
