import { Query, Resolver } from '@nestjs/graphql';
import { Record } from '../model/record';
import { RecordService } from '../record/record.service';
@Resolver((of) => Record)
export class RecordResolver {
  constructor(private readonly recordService: RecordService) {}
  @Query('getReserveRecordAll')
  async getReserveRecordAll(): Promise<Record[]> {
    return await this.recordService.getReserveRecordAll();
  }
}
