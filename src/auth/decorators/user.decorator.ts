import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  }
);
