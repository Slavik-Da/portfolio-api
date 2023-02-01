import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const RefreshTokenFromHeaders = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['refresh-token'];
  }
);
