import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ADMIN_USER } from '../contants/admin.contants';
// 参数装饰器
export const Visitor = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const visitor = request[ADMIN_USER];
    return data ? visitor?.[data] : visitor;
  },
);
