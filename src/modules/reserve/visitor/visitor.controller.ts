import { Controller, Body, Post, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { CreateVisitorDTO, LoginDTO } from '../dto/visitor.dto';
import { VisitorService } from './visitor.service';
import { ApiTransformInterceptor } from '../../../common/interceptors/api-transform.interceptor';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Post('register')
  @UseInterceptors(ApiTransformInterceptor)
  @ApiOperation({ summary: '注册' })
  @ApiOkResponse({ description: '注册成功' })
  async register(@Body() body: CreateVisitorDTO): Promise<any> {
    return await this.visitorService.register(body);
  }
  @Post('login')
  @UseInterceptors(ApiTransformInterceptor)
  @ApiOperation({ summary: '登录' })
  @ApiOkResponse({ description: '登录成功' })
  async login(@Body() body: LoginDTO): Promise<any> {
    return await this.visitorService.login(body);
  }
}
