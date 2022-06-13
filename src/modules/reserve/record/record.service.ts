import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record } from '../interface/record.interface';
import { CreateRecordDTO, EditRecordDTO } from '../dto/record.dto';
import { ApiException } from '../../../common/exceptions/api.exception';
import { VisitorService } from '../visitor/visitor.service';
import { ReservationStatus, VisitorRole } from '../schemas/types';

@Injectable()
export class RecordService {
  // 构造函数
  constructor(
    @InjectModel('Record') private readonly recordModel: Model<Record>,
    private visitorService: VisitorService,
  ) {}
  // 查找用户记录(状态)
  async find(userId: string, status: string): Promise<Record[]> {
    return await this.recordModel.find({
      userId,
      status,
    });
  }
  /**
   * 查询预约
   * @param status
   * @param beginDate
   * @param endDate
   * @returns
   */
  async getReserveRecords(
    userId: string,
    status: string,
    beginDate: Date,
    endDate: Date,
  ): Promise<any> {
    const user = await this.visitorService.findById(userId);
    if (!user) return new ApiException().errorMsg(10001);
    const conditon = {};
    if (status) {
      conditon['status'] = ReservationStatus[status];
    }
    if (beginDate && endDate) {
      conditon['createdAt'] = { $gt: beginDate, $lt: endDate };
    }
    if (conditon) {
      return await this.recordModel.find(conditon);
    }
    return await this.recordModel.find();
  }

  /**
   * 查询所有预约
   */
  async getReserveRecordAll(): Promise<Record[]> {
    return await this.recordModel.find();
  }

  // 查找记录
  async findOneById(_id: string): Promise<Record> {
    return await this.recordModel.findById(_id);
  }
  // 添加记录
  async addOne(body: CreateRecordDTO): Promise<any> {
    return await this.recordModel.create(body);
  }
  /**
   * employees 查询预约信息
   * @param userId
   * @param _id
   * @returns
   */
  async getReserveRecordById(userId: string, _id: string): Promise<any> {
    const user = await this.visitorService.findById(userId);
    if (!user) return new ApiException().errorMsg(10001);
    if (user.role !== VisitorRole.ADMIN) {
      return new ApiException().errorMsg(30001);
    }
    try {
      return await this.findOneById(_id);
    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * 提交预约
   * @param body
   */
  async commit(body: CreateRecordDTO, userId: string): Promise<any> {
    const user = await this.visitorService.findById(userId);
    if (!user) return new ApiException().errorMsg(10001);
    if (user.role === VisitorRole.ADMIN || user.role === VisitorRole.GUEST) {
      const record = await this.find(userId, 'active');
      if (record && record.length > 0)
        return new ApiException().errorMsg(20001);
      const result = await this.addOne(body);
      return { _id: result._id };
    } else {
      return new ApiException().errorMsg(30001);
    }
  }
  /**
   * 更改预约信息
   * @param body
   */
  async update(body: EditRecordDTO, userId: string): Promise<any> {
    const user = await this.visitorService.findById(userId);
    if (!user) return new ApiException().errorMsg(10001);
    const record = await this.findOneById(body._id);
    if (!record) return new ApiException().errorMsg(20000);
    record.updatedAt = new Date();
    record.tableSize = body.tableSize;
    record.status = ReservationStatus[body.status];
    record.isDel = body.isDel;
    // 管理员可以更新预约信息 完成 取消
    if (user.role === VisitorRole.ADMIN) {
      const result = await record.updateOne(record);
      return result && result.modifiedCount === 1 ? true : false;
    } else {
      if (record.userId.toString() === user._id) {
        if (body.status && body.status === ReservationStatus.COMPLETE)
          return new ApiException().errorMsg(30001);
        const result = await record.updateOne(record);
        return result && result.modifiedCount === 1 ? true : false;
      } else {
        return new ApiException().errorMsg(30001);
      }
    }
  }
}
