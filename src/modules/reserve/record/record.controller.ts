import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Authorize } from '../../../common/decorators/authorize.decorator';
import { Visitor } from '../../../common/decorators/visitor.decorator';
import {
  CreateRecordDTO,
  EditRecordDTO,
  SearchRecordDTO,
} from '../dto/record.dto';
import { IVisitor } from '../interface/visitor.interface';
import { RecordService } from './record.service';
import { ApiTransformInterceptor } from '../../../common/interceptors/api-transform.interceptor';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}
  /**
   * 提交预约
   * @param body
   * @returns
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  @ApiOperation({ summary: '提交预约' })
  @ApiOkResponse({ description: '提交预约成功' })
  @Post('commit')
  @Authorize()
  @UseInterceptors(ApiTransformInterceptor)
  async commit(
    @Body() body: CreateRecordDTO,
    @Visitor() visitor: IVisitor,
  ): Promise<any> {
    const userId = visitor.uid;
    return await this.recordService.commit(body, userId);
  }
  /**
   * 变更预约信息
   * @param body
   * @returns
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  @ApiOperation({ summary: '变更预约信息' })
  @ApiOkResponse({ description: '变更预约信息成功' })
  @Post('update')
  @Authorize()
  @UseInterceptors(ApiTransformInterceptor)
  async update(
    @Body() body: EditRecordDTO,
    @Visitor() visitor: IVisitor,
  ): Promise<any> {
    const userId = visitor.uid;
    return await this.recordService.update(body, userId);
  }
  /**
   * 获取预约信息详情
   * @param params
   * @returns
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  @ApiOperation({ summary: '获取预约信息详情' })
  @ApiOkResponse({ description: '获取预约信息详情成功' })
  @Get(':id')
  @Authorize()
  @UseInterceptors(ApiTransformInterceptor)
  async getReserveRecordById(@Visitor() visitor: IVisitor, @Param() params) {
    const userId = visitor.uid;
    console.log('params', params);
    return await this.recordService.getReserveRecordById(userId, params.id);
  }

  /**
   * 获取预约信息
   * @param params
   * @returns
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  @ApiOperation({ summary: '获取预约信息' })
  @ApiOkResponse({ description: '获取预约信息成功' })
  @Post('getReserveRecords')
  @Authorize()
  @UseInterceptors(ApiTransformInterceptor)
  async getReserveRecords(
    @Visitor() visitor: IVisitor,
    @Body() body: SearchRecordDTO,
  ) {
    const userId = visitor.uid;
    return await this.recordService.getReserveRecords(
      userId,
      body.status,
      body.beginDate,
      body.endDate,
    );
  }
}
