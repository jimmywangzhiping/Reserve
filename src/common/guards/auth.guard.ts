import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { AUTHORIZE_KEY_METADATA, ADMIN_USER } from '../contants/admin.contants';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authorize = this.reflector.get<boolean>(
      AUTHORIZE_KEY_METADATA,
      context.getHandler(),
    );
    // 检测是否是开放类型，如果接口不需要校验，则自动放过，如果有@Authorize 需要检测
    if (!authorize) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'] as string;
    if (isEmpty(token)) {
      throw new Error('authorization token is Empty');
    }
    try {
      request[ADMIN_USER] = this.jwtService.verify(token);
    } catch (error) {
      throw new Error('authorization token verify error');
    }
    return true;
  }
}
